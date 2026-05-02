
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) return <p className="text-center mt-10">Not Logged In</p>;

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-6 rounded shadow w-80 text-center">
        <img
          src={user.photo}
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />

        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>

        <button
          onClick={() => router.push("/update-profile")}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}