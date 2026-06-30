// src/app/page.js
'use client';

import Link from 'next/link';
import AnimalCard from '@/components/AnimalCard';
import animalsData from '@/data/animals.json';
import { useEffect, useState } from 'react';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    // Get first 4 animals as featured
    setFeatured(animalsData.slice(0, 4));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      
      {/* 🌟 PREMIUM HERO BANNER */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-950">
        {/* Background Image and Pattern Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-10000 ease-out hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=2000')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-955 via-slate-900/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[length:24px_24px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md px-5 py-2.5 rounded-full text-emerald-400 font-semibold text-sm animate-pulse">
              🕌 Qurbani 2026 Season Booking Open
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
              Select Your Sacred <br />
              <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-400 bg-clip-text text-transparent">
                Qurbani Animal
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed">
              Book healthy, farm-fresh cows and goats easily and securely. Verified weight, veterinarian checks, and transparent pricing in Bangladesh.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/animals"
                className="btn btn-emerald bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 h-auto min-h-0 rounded-2xl text-lg shadow-lg shadow-emerald-600/30 transition-all duration-300 border-none flex items-center justify-center gap-2"
              >
                Browse All Animals
                <span>→</span>
              </Link>
              <a 
                href="#featured"
                className="btn btn-outline border-white/40 hover:border-white hover:bg-white/10 text-white font-semibold px-8 py-4 h-auto min-h-0 rounded-2xl text-lg transition-all duration-300"
              >
                Featured Stock
              </a>
            </div>
          </div>

          {/* Banner Graphic Info Card */}
          <div className="hidden md:block bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-3xl space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
              <span>📊</span> Live Hat Statistics
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs text-slate-400 uppercase tracking-wider">Cows Registered</p>
                <p className="text-3xl font-extrabold text-amber-400">450+</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400 uppercase tracking-wider">Goats Registered</p>
                <p className="text-3xl font-extrabold text-emerald-400">320+</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400 uppercase tracking-wider">Verified Farms</p>
                <p className="text-3xl font-extrabold text-blue-400">32</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400 uppercase tracking-wider">Deliveries Done</p>
                <p className="text-3xl font-extrabold text-pink-400">1,200+</p>
              </div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl text-emerald-400 text-sm flex items-center gap-3">
              <span>🛡️</span> Vet-certified medical reports provided with every single booking!
            </div>
          </div>
        </div>
      </section>


      {/* 🐄 FEATURED ANIMALS SECTION */}
      <section id="featured" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full uppercase">
              Selected Collection
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-2">
              Featured Animals
            </h2>
            <p className="text-slate-600 max-w-lg mx-auto text-lg">
              Check out some of our prime, high-demand cows and goats available for booking right now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((animal, index) => (
              <div
                key={animal.id}
                className="opacity-0 animate-fadeUp"
                style={{
                  animationDelay: `${index * 0.15}s`,
                  animationFillMode: 'forwards',
                }}
              >
                <AnimalCard animal={animal} />
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/animals"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-emerald-700 text-white font-bold px-10 py-4.5 rounded-2xl text-lg shadow-xl shadow-slate-900/10 hover:shadow-emerald-700/20 transition-all duration-300"
            >
              Explore All Animals
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>


      {/* 🩺 QURBANI TIPS SECTION */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full uppercase">
              Essential Guide
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">
              Qurbani Guide & Tips
            </h2>
            <p className="text-slate-600 max-w-lg mx-auto text-lg">
              Everything you need to know about selecting, verifying, and caring for your sacrificial animal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl font-bold">
                🦷
              </div>
              <h3 className="text-xl font-bold text-slate-900">Checking the Age</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Cows must be at least 2 years old and goats 1 year. Confirm by checking their front teeth—two permanent incisors must have fully erupted.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-bold">
                🩺
              </div>
              <h3 className="text-xl font-bold text-slate-900">Physical Health</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                The animal must be active, alert, free from physical disabilities, blindness, or limping. Skin should be shiny and eyes clear.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-bold">
                🌾
              </div>
              <h3 className="text-xl font-bold text-slate-900">Diet & Upbringing</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ask about the feed. Naturally fed livestock (grass, straw, grain husk) yield better health and meat compared to chemically fattened animals.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-2xl font-bold">
                ❤️
              </div>
              <h3 className="text-xl font-bold text-slate-900">Ethical Treatment</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Provide comfortable lodging, clean water, and fresh fodder after delivery. Keep them stress-free as it is highly recommended.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 🏆 TOP BREEDS SHOWCASE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full uppercase">
              Popular Choice
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">
              Top Livestock Breeds
            </h2>
            <p className="text-slate-600 max-w-lg mx-auto text-lg">
              Explore the most renowned and sought-after breeds for Qurbani in Bangladesh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Breed 1 */}
            <div className="flex flex-col sm:flex-row gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-md transition-all">
              <img 
                src="/image/download1.jpg" 
                alt="Sahiwal Breed" 
                className="w-full sm:w-44 h-44 object-cover rounded-2xl shadow-sm"
              />
              <div className="space-y-2 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-extrabold text-slate-900">Sahiwal Cow</h3>
                  <span className="badge badge-emerald py-3 px-4 font-semibold text-xs text-white">Premium Cow</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Originating from the Sahiwal district, this breed is famous for its massive humps, gentle behavior, premium marbling, and high weight yield.
                </p>
                <div className="flex gap-4 text-xs font-semibold text-slate-500 pt-2">
                  <span>⚖️ Typical Weight: 300 - 800 kg</span>
                  <span>📍 Origin: Sahiwal region</span>
                </div>
              </div>
            </div>

            {/* Breed 2 */}
            <div className="flex flex-col sm:flex-row gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-md transition-all">
              <img 
                src="/image/images3.jpg" 
                alt="Red Chittagong Breed" 
                className="w-full sm:w-44 h-44 object-cover rounded-2xl shadow-sm"
              />
              <div className="space-y-2 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-extrabold text-slate-900">Red Chittagong</h3>
                  <span className="badge badge-warning py-3 px-4 font-semibold text-xs text-white">Local Classic</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  A high-demand local breed from the Chittagong hilly tracts, recognizable by its rich red coat. Known for compact build and extremely tasty meat.
                </p>
                <div className="flex gap-4 text-xs font-semibold text-slate-500 pt-2">
                  <span>⚖️ Typical Weight: 200 - 450 kg</span>
                  <span>📍 Origin: Chittagong, BD</span>
                </div>
              </div>
            </div>

            {/* Breed 3 */}
            <div className="flex flex-col sm:flex-row gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-md transition-all">
              <img 
                src="/image/download6.jpg" 
                alt="Black Bengal Breed" 
                className="w-full sm:w-44 h-44 object-cover rounded-2xl shadow-sm"
              />
              <div className="space-y-2 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-extrabold text-slate-900">Black Bengal</h3>
                  <span className="badge badge-accent py-3 px-4 font-semibold text-xs text-white font-bold">Famous Goat</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Globally acclaimed goat breed, renowned for high fertility, shiny black skin, and super tender meat structure. Perfect choice for small budgets.
                </p>
                <div className="flex gap-4 text-xs font-semibold text-slate-500 pt-2">
                  <span>⚖️ Typical Weight: 20 - 45 kg</span>
                  <span>📍 Origin: Bengal region</span>
                </div>
              </div>
            </div>

            {/* Breed 4 */}
            <div className="flex flex-col sm:flex-row gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-md transition-all">
              <img 
                src="/image/images7.jpg" 
                alt="Jamunapari Breed" 
                className="w-full sm:w-44 h-44 object-cover rounded-2xl shadow-sm"
              />
              <div className="space-y-2 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-extrabold text-slate-900">Jamunapari Goat</h3>
                  <span className="badge badge-info py-3 px-4 font-semibold text-xs text-white">Large Goat</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Known for its signature long hanging ears, convex nose bridge, and high legs, Jamunapari is a majestic goat that yields premium meat quantities.
                </p>
                <div className="flex gap-4 text-xs font-semibold text-slate-500 pt-2">
                  <span>⚖️ Typical Weight: 40 - 90 kg</span>
                  <span>📍 Origin: Yamuna River basin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 🛡️ DIRECT FARM ADVANTAGE (EXTRA SECTION) */}
      <section className="py-24 bg-gradient-to-br from-emerald-900 to-teal-950 text-white relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute top-1/2 -right-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full uppercase">
              Our Core Promises
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Why Buy From QurbaniHat?
            </h2>
            <p className="text-slate-300 max-w-lg mx-auto text-lg">
              We redefine livestock sourcing by giving you convenience, health guarantees, and total peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4 hover:bg-white/10 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-2xl">
                🧑‍🌾
              </div>
              <h3 className="text-2xl font-bold">100% Direct From Farms</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                We eliminate the middleman completely. Every animal on our portal belongs directly to our partner cattle farms in North and South Bengal, supporting local agricultural workers.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4 hover:bg-white/10 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-2xl">
                🩺
              </div>
              <h3 className="text-2xl font-bold">Veterinary Checked</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                All livestock undergoes a strict medical assessment by certified vets. We check for healthy internal organs, zero growth hormone injections, and active immune systems.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4 hover:bg-white/10 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-2xl">
                🚚
              </div>
              <h3 className="text-2xl font-bold">Safe, Ventilated Transit</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Specialized transportation trucks transport booked animals with care. We deliver right to your designated spots in Dhaka and surrounding cities under safe physical conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}