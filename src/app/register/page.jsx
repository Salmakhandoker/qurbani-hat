
// src/app/register/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from 'react-hot-toast';
import { authClient } from "@/lib/auth-client";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: ""
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loadingToast = toast.loading("Creating account...");

    try {
      const result = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.photo || undefined,
      });

      if (result.error) {
        toast.error(result.error.message || "Registration failed", { id: loadingToast });
      } else {
        toast.success("Registration Successful! Please login.", { id: loadingToast });
        router.push("/login");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Join QurbaniHat today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-600"
              placeholder="Salma Khandoker"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL (Optional)</label>
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-600"
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-600"
              placeholder="salma2026@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-600"
              placeholder="Minimum 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-gray-400 text-white font-semibold py-4 rounded-2xl text-lg transition-all"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* Google Button */}
        <button
          onClick={handleGoogleRegister}
          className="w-full mt-4 flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-4 rounded-2xl font-medium transition"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <div className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-700 font-medium hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}