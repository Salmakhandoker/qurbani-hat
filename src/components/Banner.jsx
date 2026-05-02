
"use client";

import Link from "next/link";

export default function Banner() {
  return (
    <div className="bg-green-100 py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Content */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700">
            Find Perfect Qurbani Animals 🐄
          </h1>

          <p className="mt-4 text-gray-600">
            সহজে গরু, ছাগল বুক করুন আপনার কুরবানির জন্য।  
            Trusted sellers, healthy animals, best price.
          </p>

          <Link href="/animals">
            <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Browse Animals
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="mt-8 md:mt-0">
          <img
            src="https://i.ibb.co/6bQp6wT/cow.jpg"
            alt="cow"
            className="w-[300px] rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}