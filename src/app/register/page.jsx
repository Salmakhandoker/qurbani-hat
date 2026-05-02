
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔄 Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🚀 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loadingToast = toast.loading("Creating account...");

    try {
      const { name, email, password, photo } = formData;

      // ✅ Debug (optional)
      console.log({ name, email, password, photo });

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          photo,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Registration Successful 🎉", { id: loadingToast });

        setTimeout(() => {
          router.push("/login");
        }, 800);
      } else {
        toast.error(data.error || "Registration failed", {
          id: loadingToast,
        });
      }
    } catch (error) {
      toast.error("Something went wrong ❌", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create an Account
          </h1>
          <p className="text-gray-600 mt-2">
            Join QurbaniHat today 🐄
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* Photo */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Photo URL
            </label>
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="https://image-url.com"
              className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 text-sm">
            <input type="checkbox" required />
            <span>Accept Terms & Conditions</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white font-semibold py-4 rounded-2xl text-lg transition-all"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        {/* Login link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-emerald-700 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Google Login (Better Auth) */}
        <button
          onClick={() =>
            (window.location.href = "/api/auth/signin/google")
          }
          className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}