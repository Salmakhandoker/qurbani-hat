
// src/app/api/login/route.js
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const connection = await connectDB();
    const db = connection.connection.db("qurbanihat");

    const user = await db.collection("users").findOne({ 
      email: email.toLowerCase().trim() 
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const { password: _, ...userData } = user;

    return Response.json({ 
      success: true, 
      message: "Login successful", 
      user: userData 
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}