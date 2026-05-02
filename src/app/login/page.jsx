
// src/app/login/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from 'react-hot-toast';

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const loadingToast = toast.loading("Logging in...");

    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({
        name: "Salma Khandoker",
        email: formData.email,
        image: "https://via.placeholder.com/150"
      }));

      toast.success("Login Successful! 🎉", { id: loadingToast });
      router.push("/");
    }, 800);

    setLoading(false);
  };

  const handleGoogleLogin = () => {
    const loadingToast = toast.loading("Redirecting to Google...");
    
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({
        name: "Salma Khandoker",
        email: "salma@gmail.com",
        image: "https://via.placeholder.com/150"
      }));

      toast.success("Google Login Successful! 🎉", { id: loadingToast });
      router.push("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Login to QurbaniHat</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-600"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-600"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-4 rounded-2xl text-lg transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-4 rounded-2xl font-medium transition"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <div className="text-center mt-6 text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-emerald-700 font-medium hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}