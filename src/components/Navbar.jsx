
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="font-bold text-xl">QurbaniHat</h1>

      <div className="flex gap-6 items-center">
        <Link href="/">Home</Link>
        <Link href="/animals">All Animals</Link>

        {user ? (
          <>
            {/* Avatar */}
            <img
              src={user.photo || "/avatar.png"}
              className="w-10 h-10 rounded-full border"
              alt="user"
            />

            <Link href="/my-profile">Profile</Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="bg-gray-800 text-white px-4 py-2 rounded">
                Login
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}