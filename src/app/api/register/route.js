
// src/app/api/register/route.js
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, photo } = await req.json();

    // Validation
    if (!name || !email || !password) {
      return Response.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("qurbanihat");   // Fixed database name

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ 
      email: cleanEmail 
    });

    if (existingUser) {
      return Response.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user
    const result = await db.collection("users").insertOne({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      photo: photo || null,
      createdAt: new Date(),
      role: "user"
    });

    return Response.json({
      success: true,
      message: "User registered successfully",
      userId: result.insertedId,
    });

  } catch (error) {
    console.error("Registration error:", error);
    return Response.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}