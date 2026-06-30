// src/app/not-found.js
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-xl space-y-6">
        <span className="text-7xl block animate-bounce">🐏</span>
        <h1 className="text-6xl font-black text-slate-800">404</h1>
        <h2 className="text-2xl font-bold text-slate-700">Lost in the pasture?</h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          The page you are looking for doesn't exist or has been moved to another location.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/"
            className="btn btn-emerald bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl flex-1 border-none font-bold text-sm h-12 flex items-center justify-center"
          >
            Go Back Home
          </Link>
          <button
            onClick={() => router.back()}
            className="btn btn-outline border-slate-200 hover:bg-slate-50 text-slate-600 rounded-2xl flex-1 font-bold text-sm h-12"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
