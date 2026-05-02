
// src/app/animals/details/[id]/page.jsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import animalsData from "@/data/animals.json";
import toast from 'react-hot-toast';

export default function AnimalDetails() {
  const { id } = useParams();
  const router = useRouter();
  
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Safety check - wait until id is available
    if (!id) {
      setLoading(false);
      return;
    }

    const found = animalsData.find((a) => 
      a.id.toString() === id.toString()
    );

    setAnimal(found);
    setLoading(false);
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    
    const loadingToast = toast.loading("Processing your booking...");

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));

    toast.success("Booking Confirmed Successfully! 🎉", {
      id: loadingToast,
      duration: 4000,
    });

    e.target.reset();
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600">Loading animal details...</p>
      </div>
    );
  }

  // Not Found State
  if (!animal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">404</h2>
          <p className="text-xl text-gray-600 mb-8">Animal not found</p>
          <button 
            onClick={() => router.push('/animals')}
            className="bg-emerald-700 text-white px-8 py-3 rounded-2xl hover:bg-emerald-800 transition"
          >
            ← Back to All Animals
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <button 
          onClick={() => router.push('/animals')}
          className="mb-8 flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium"
        >
          ← Back to All Animals
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square">
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 right-6 bg-white px-5 py-2 rounded-2xl text-sm font-semibold shadow">
              {animal.category || "Animal"}
            </div>
          </div>

          {/* Details + Booking */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{animal.name}</h1>
              <p className="text-2xl text-gray-600 mt-1">{animal.breed}</p>
            </div>

            <div className="grid grid-cols-2 gap-y-6">
              <div>
                <p className="text-gray-500 text-sm">Price</p>
                <p className="text-3xl font-bold text-emerald-700">৳{animal.price?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Location</p>
                <p className="font-semibold text-lg">{animal.location}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Weight</p>
                <p className="font-semibold text-lg">{animal.weight} kg</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Age</p>
                <p className="font-semibold text-lg">{animal.age} years</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{animal.description}</p>
            </div>

            {/* Booking Form */}
            <div className="bg-white p-8 rounded-3xl shadow">
              <h2 className="text-2xl font-bold mb-6">Book This Animal</h2>
              
              <form onSubmit={handleBooking} className="space-y-5">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your Full Name"
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-600"
                />

                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-600"
                />

                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="Phone Number"
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-600"
                />

                <textarea
                  name="address"
                  required
                  rows={3}
                  placeholder="Full Delivery Address"
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-600 resize-y"
                />

                <button
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-4 rounded-2xl text-lg transition-all mt-2"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}