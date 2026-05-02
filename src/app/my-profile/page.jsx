// src/app/my-profile/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!user) {
    return <div className="text-center py-20">Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
        <img src='./pic.jpg'
          // src={user.image || "https://via.placeholder.com/150"} 
          alt="Profile" 
          className="w-40 h-40 rounded-full mx-auto border-4 border-emerald-200 mb-8 object-cover"
        />
        
        <h1 className="text-4xl font-bold mb-3">{user.name}</h1>
        <p className="text-gray-600 text-xl mb-12">{user.email}</p>

        <Link 
          href="/my-profile/update"
          className="inline-block bg-emerald-700 hover:bg-emerald-800 text-white px-12 py-4 rounded-2xl text-lg font-semibold transition"
        >
          Update Profile
        </Link>
      </div>
    </div>
  );
}