
// src/app/api/register/route.js
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, photo } = await req.json();

    if (!name || !email || !password) {
      return Response.json({ error: "Name, email and password are required" }, { status: 400 });
    }

    const connection = await connectDB();
    const db = connection.connection.db("qurbanihat");

    const cleanEmail = email.toLowerCase().trim();

    const existing = await db.collection("users").findOne({ email: cleanEmail });
    if (existing) {
      return Response.json({ error: "User already exists" }, { status: 409 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db.collection("users").insertOne({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      photo: photo || null,
      createdAt: new Date(),
    });

    return Response.json({
      success: true,
      message: "Registration successful",
    });

  } catch (error) {
    console.error("Register error:", error);
    return Response.json({ error: "Registration failed" }, { status: 500 });
  }
}