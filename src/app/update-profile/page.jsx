// src/app/update-profile/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Lottie from "lottie-react";
import loadingAnimation from "@/data/loading.json";

export default function UpdateProfile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [updating, setUpdating] = useState(false);

  // Auth Redirect Guard
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please login to update your profile!");
      router.push("/login?redirect=/update-profile");
    } else if (session) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session, isPending, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const loadingToast = toast.loading("Updating your profile details...");

    try {
      const { data, error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim(),
      });

      if (error) {
        toast.error(error.message || "Failed to update profile", { id: loadingToast });
      } else {
        toast.success("Profile updated successfully! 🎉", { id: loadingToast });
        router.push("/my-profile");
        // Force router refresh so Navbar and Profile pages show updated session info
        setTimeout(() => {
          router.refresh();
        }, 150);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.", { id: loadingToast });
    } finally {
      setUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 space-y-4">
        <div className="w-36 h-36">
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
        <p className="text-slate-500 font-bold text-sm">Loading details...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-3xl">👤</span>
          <h1 className="text-3xl font-black text-slate-900">Update Profile</h1>
          <p className="text-slate-500 text-sm">Change your profile name or avatar picture</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-slate-600">Display Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={updating}
              placeholder="Your Name"
              className="input input-bordered w-full rounded-2xl border-slate-200 focus:outline-emerald-600 text-sm h-12"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-slate-600">Avatar Image URL</span>
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              disabled={updating}
              placeholder="https://domain.com/avatar.jpg"
              className="input input-bordered w-full rounded-2xl border-slate-200 focus:outline-emerald-600 text-sm h-12"
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="btn btn-emerald bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl w-full border-none h-12 font-bold text-sm shadow-md hover:shadow-emerald-700/10 transition-all duration-300 mt-6"
          >
            {updating ? <span className="loading loading-spinner"></span> : "Update Information"}
          </button>
        </form>
      </div>
    </div>
  );
}