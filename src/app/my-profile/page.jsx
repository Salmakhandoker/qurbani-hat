// src/app/my-profile/page.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function MyProfile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please login to view your profile!");
      router.push("/login?redirect=/my-profile");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 space-y-4">
        <span className="loading loading-spinner loading-lg text-emerald-600"></span>
        <p className="text-slate-500 font-medium text-sm">Loading your profile...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const { name, email, image } = session.user;

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-12 text-center space-y-6">
        <div className="relative w-40 h-40 mx-auto">
          <img 
            src={image || "/pic.jpg"}
            alt="Profile Avatar" 
            className="w-40 h-40 rounded-full border-4 border-emerald-100 object-cover shadow-md"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=250";
            }}
          />
        </div>
        
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900">{name}</h1>
          <p className="text-slate-500 text-lg font-medium">{email}</p>
        </div>

        <div className="divider"></div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Link 
            href="/update-profile"
            className="btn btn-emerald bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl px-10 h-14 font-bold border-none shadow-md shadow-emerald-700/10 transition-all duration-300"
          >
            Update Profile Information
          </Link>
          <Link 
            href="/animals"
            className="btn btn-outline border-slate-200 hover:bg-slate-50 text-slate-600 rounded-2xl px-10 h-14 font-bold transition-all duration-300"
          >
            Browse Animals
          </Link>
        </div>
      </div>
    </div>
  );
}