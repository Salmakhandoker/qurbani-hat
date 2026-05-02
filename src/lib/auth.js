
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectDB } from "./mongodb"; // ✅ correct import

export const auth = betterAuth({
  database: mongodbAdapter(async () => {
    const conn = await connectDB();
    return conn.connection.db; // ✅ mongoose → native db
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

  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});