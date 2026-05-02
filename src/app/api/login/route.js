
// src/app/api/login/route.js
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ error: "Email and password are required" }, { status: 400 });
    }

    const connection = await connectDB();
    const db = connection.connection.db("qurbanihat");

    const cleanEmail = email.toLowerCase().trim();

    const user = await db.collection("users").findOne({ email: cleanEmail });

    if (!user) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const { password: _, ...userData } = user;

    return Response.json({
      success: true,
      message: "Login successful",
      user: userData
    });

  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}