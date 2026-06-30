
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully");
            router.push("/login");
          }
        }
      });
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="navbar bg-white/85 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100 px-4 md:px-8">
      {/* Brand Logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-1 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/animals">All Animals</Link></li>
            {session?.user && (
              <li><Link href="/my-profile">My Profile</Link></li>
            )}
          </ul>
        </div>
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight text-emerald-800 flex items-center gap-1">
          <span className="text-2xl md:text-3xl">🐄</span>
          <span className="bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">QurbaniHat</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium">
          <li><Link href="/" className="hover:text-emerald-700 hover:bg-emerald-50 rounded-xl px-4 py-2 transition-all">Home</Link></li>
          <li><Link href="/animals" className="hover:text-emerald-700 hover:bg-emerald-50 rounded-xl px-4 py-2 transition-all">All Animals</Link></li>
          {session?.user && (
            <li><Link href="/my-profile" className="hover:text-emerald-700 hover:bg-emerald-50 rounded-xl px-4 py-2 transition-all">My Profile</Link></li>
          )}
        </ul>
      </div>

      {/* Navbar End (Auth Buttons / Avatar) */}
      <div className="navbar-end gap-3">
        {session?.user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-emerald-500 hover:border-emerald-600 transition-all duration-300">
              <div className="w-10 rounded-full">
                <img 
                  alt="User Avatar" 
                  src={session.user.image || "/pic.jpg"}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150";
                  }}
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-base-100 rounded-2xl w-52 border border-gray-100 gap-1">
              <li className="px-3 py-2 border-b border-gray-100 mb-1">
                <p className="font-bold text-gray-800 truncate">{session.user.name}</p>
                <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
              </li>
              <li><Link href="/my-profile" className="hover:bg-emerald-50 rounded-xl">My Profile</Link></li>
              <li><Link href="/update-profile" className="hover:bg-emerald-50 rounded-xl">Update Profile</Link></li>
              <li>
                <button onClick={handleLogout} className="text-red-500 hover:bg-red-50 rounded-xl font-medium mt-1">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/login" className="btn btn-ghost text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-xl text-sm px-4 md:px-5 font-semibold">
              Login
            </Link>
            <Link href="/register" className="btn bg-emerald-700 hover:bg-emerald-800 text-white border-none shadow-md rounded-xl text-sm px-4 md:px-5 font-semibold transition-all duration-300">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}