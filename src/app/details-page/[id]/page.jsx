// src/app/details-page/[id]/page.jsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import animalsData from "@/data/animals.json";
import toast from 'react-hot-toast';
import { authClient } from "@/lib/auth-client";
import Lottie from "lottie-react";
import loadingAnimation from "@/data/loading.json";

export default function AnimalDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending: sessionPending } = authClient.useSession();
  
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auth Redirect Guard
  useEffect(() => {
    if (!sessionPending && !session) {
      toast.error("Please login to view details and book animals!");
      router.push("/login?redirect=" + encodeURIComponent(`/details-page/${id}`));
    }
  }, [session, sessionPending, router, id]);

  useEffect(() => {
    if (!id) return;
    const found = animalsData.find((a) => a.id.toString() === id.toString());
    setAnimal(found);
    setLoading(false);
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      animalId: animal.id,
      animalName: animal.name
    };

    const loadingToast = toast.loading("Processing your booking request...");

    try {
      // Simulate API call to the mock endpoint /api/booking
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.success) {
        toast.success(data.message || "Booking Confirmed Successfully! 🎉", {
          id: loadingToast,
          duration: 4000,
        });
        form.reset();
      } else {
        toast.error(data.message || "Booking failed", { id: loadingToast });
      }
    } catch (err) {
      toast.error("An error occurred during booking. Please try again.", { id: loadingToast });
    }
  };

  // Enforce session pending state
  if (sessionPending || loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 space-y-4">
        <div className="w-36 h-36">
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
        <p className="text-slate-500 font-bold text-sm">Loading details...</p>
      </div>
    );
  }

  // If session is missing, render nothing (guard will redirect)
  if (!session) {
    return null;
  }

  // Not Found State
  if (!animal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="text-center bg-white p-12 rounded-3xl border border-slate-100 shadow-xl max-w-md w-full space-y-6">
          <h2 className="text-6xl font-black text-slate-800">404</h2>
          <h3 className="text-xl font-bold text-slate-700">Animal Not Found</h3>
          <p className="text-slate-500 text-sm">
            The livestock you are looking for might have been sold or removed.
          </p>
          <button 
            onClick={() => router.push('/animals')}
            className="btn btn-emerald bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl w-full border-none font-bold"
          >
            ← Back to All Animals
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => router.push('/animals')}
          className="btn btn-ghost hover:bg-slate-200 rounded-xl mb-8 font-bold text-emerald-800 flex items-center gap-2"
        >
          ← Back to All Animals
        </button>

        <div className="grid md:grid-cols-2 gap-10">
          
          {/* Left Column: Image and Specs */}
          <div className="space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-video sm:aspect-square bg-white border border-slate-100">
              <img
                src={animal.image}
                alt={animal.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=600";
                }}
              />
              <div className="absolute top-6 right-6 bg-emerald-600 text-white px-4 py-2 rounded-2xl text-xs font-extrabold shadow-lg">
                {animal.category}
              </div>
            </div>

            {/* Spec Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <span className="text-3xl">⚖️</span>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Weight</p>
                  <p className="font-extrabold text-slate-800 text-lg">{animal.weight} kg</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <span className="text-3xl">🎂</span>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Age</p>
                  <p className="font-extrabold text-slate-800 text-lg">{animal.age} years</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <span className="text-3xl">📍</span>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Location</p>
                  <p className="font-extrabold text-slate-800 text-lg">{animal.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <span className="text-3xl">🧬</span>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Breed</p>
                  <p className="font-extrabold text-slate-800 text-lg">{animal.breed}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Details, and Booking Form */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <span className="badge badge-emerald py-3 px-4 font-semibold text-xs text-white uppercase tracking-wider">{animal.type}</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">{animal.name}</h1>
              
              <div className="pt-2 border-t border-slate-100 flex items-baseline gap-2">
                <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Price:</p>
                <p className="text-4xl font-black text-emerald-700">৳{animal.price?.toLocaleString()}</p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider mb-2">Description</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{animal.description}</p>
              </div>
            </div>

            {/* Booking Form Card */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Book This Livestock</h2>
                <p className="text-xs text-slate-400 mt-1">Provide your details to initiate the booking process.</p>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                <div className="form-control">
                  <input
                    name="name"
                    type="text"
                    required
                    defaultValue={session.user.name || ""}
                    placeholder="Your Full Name"
                    className="input input-bordered w-full rounded-2xl border-slate-200 focus:outline-emerald-600 text-sm h-12"
                  />
                </div>

                <div className="form-control">
                  <input
                    name="email"
                    type="email"
                    required
                    defaultValue={session.user.email || ""}
                    placeholder="Email Address"
                    className="input input-bordered w-full rounded-2xl border-slate-200 focus:outline-emerald-600 text-sm h-12"
                  />
                </div>

                <div className="form-control">
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="Phone Number"
                    className="input input-bordered w-full rounded-2xl border-slate-200 focus:outline-emerald-600 text-sm h-12"
                  />
                </div>

                <div className="form-control">
                  <textarea
                    name="address"
                    required
                    rows={3}
                    placeholder="Full Delivery Address"
                    className="textarea textarea-bordered w-full rounded-2xl border-slate-200 focus:outline-emerald-600 text-sm resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-emerald bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl w-full border-none h-14 font-bold text-base shadow-lg shadow-emerald-700/10 hover:shadow-emerald-800/20 transition-all duration-300 mt-6"
                >
                  Confirm Livestock Booking
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
