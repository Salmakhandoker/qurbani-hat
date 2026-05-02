"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UpdateProfile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const photo = e.target.photo.value;

    const res = await fetch("/api/auth/update", {
      method: "PUT",
      body: JSON.stringify({
        email: user.email,
        name,
        photo,
      }),
    });

    if (res.ok) {
      const updatedUser = await res.json();

      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Profile Updated ✅");
      router.push("/my-profile");
    } else {
      alert("Update Failed ❌");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-8 rounded shadow w-96"
      >
        <h2 className="text-xl font-bold mb-4">Update Profile</h2>

        <input
          name="name"
          defaultValue={user.name}
          className="w-full p-2 border mb-4"
        />

        <input
          name="photo"
          defaultValue={user.photo}
          className="w-full p-2 border mb-4"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Update Information
        </button>
      </form>
    </div>
  );
}