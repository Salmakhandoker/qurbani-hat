// src/app/login/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from 'react-hot-toast';
import { authClient } from "@/lib/auth-client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState("/");
  const router = useRouter();
  const { data: session, isPending: sessionPending } = authClient.useSession();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const redir = params.get("redirect");
      if (redir) {
        setRedirect(redir);
      }
    }
  }, []);

  useEffect(() => {
    if (!sessionPending && session) {
      router.push(redirect);
    }
  }, [session, sessionPending, router, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Verifying credentials...");

    try {
      const { error } = await authClient.signIn.email({
        email: email.toLowerCase().trim(),
        password: password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password", { id: loadingToast });
      } else {
        toast.success("Welcome back! 🎉", { id: loadingToast });
        router.push(redirect);
        // Delay page reload to allow router transition
        setTimeout(() => {
          router.refresh();
        }, 150);
      }
    } catch (err) {
      toast.error("Failed to authenticate. Please try again.", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const loadingToast = toast.loading("Redirecting to Google...");
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirect
      });
    } catch (err) {
      toast.error("Google Authentication failed", { id: loadingToast });
    }
  };

  if (sessionPending) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center bg-slate-50 space-y-4">
        <span className="loading loading-spinner text-emerald-600 w-12 h-12"></span>
        <p className="text-slate-500 font-bold text-sm">Verifying session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 space-y-6">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <span className="text-3xl">🔑</span>
          <h1 className="text-3xl font-black text-slate-900">Login to QurbaniHat</h1>
          <p className="text-slate-500 text-sm">Enter your details to access your dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-slate-600">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="input input-bordered w-full rounded-2xl border-slate-200 focus:outline-emerald-600 text-sm h-12"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-slate-600">Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="input input-bordered w-full rounded-2xl border-slate-200 focus:outline-emerald-600 text-sm h-12"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-emerald bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl w-full border-none h-12 font-bold text-sm shadow-md hover:shadow-emerald-700/10 transition-all duration-300 mt-6"
          >
            {loading ? <span className="loading loading-spinner"></span> : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-xs text-slate-400 font-semibold uppercase">Or continue with</div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="btn btn-outline border-slate-200 hover:bg-slate-50 text-slate-700 rounded-2xl w-full h-12 font-bold text-sm flex items-center justify-center gap-3 transition-all duration-300 hover:border-slate-350"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.37 3.65 1.42 7.5l3.79 2.94C6.11 7.35 8.82 5.04 12 5.04z"
            />
            <path
              fill="#4285F4"
              d="M23.45 12.3c0-.82-.07-1.6-.21-2.3H12v4.35h6.43c-.28 1.44-1.09 2.66-2.32 3.48l3.6 2.79c2.1-1.94 3.3-4.8 3.3-8.32z"
            />
            <path
              fill="#FBBC05"
              d="M5.21 10.44c-.23-.69-.36-1.42-.36-2.18s.13-1.49.36-2.18L1.42 3.14C.52 4.96 0 7.02 0 9.2s.52 4.24 1.42 6.06l3.79-2.82z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.6-2.79c-1-.67-2.28-1.07-3.96-1.07-3.18 0-5.89-2.31-6.85-5.4L1.76 13.6C3.71 17.5 7.69 20.12 12 20.12z"
            />
          </svg>
          Google Authentication
        </button>

        {/* Link to Register */}
        <div className="text-center text-xs text-slate-500 font-semibold pt-4">
          New to QurbaniHat?{" "}
          <Link href={`/register?redirect=${encodeURIComponent(redirect)}`} className="text-emerald-700 hover:underline font-bold">
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
}