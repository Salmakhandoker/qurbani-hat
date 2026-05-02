
// src/app/my-profile/update/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function UpdateProfile() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      const u = JSON.parse(saved);
      setName(u.name || '');
      setImage(u.image || '');
    }
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const updatedUser = { ...currentUser, name, image };

    localStorage.setItem('user', JSON.stringify(updatedUser));

    toast.success("Profile Updated Successfully!");
    router.push('/my-profile');
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Update Profile</h1>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Photo URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl"
              placeholder="./pic.jpg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-4 rounded-2xl font-semibold text-lg"
          >
            Update Information
          </button>
        </form>
      </div>
    </div>
  );
}