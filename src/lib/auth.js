
// src/lib/auth.js
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectDB } from "./mongodb.js";
import { google } from "better-auth/social-providers";

export const auth = betterAuth({
  database: mongodbAdapter(async () => {
    const conn = await connectDB();
    return conn.connection.db;
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});