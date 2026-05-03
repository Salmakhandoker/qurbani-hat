
// src/app/page.jsx
'use client';

import Link from 'next/link';
import AnimalCard from '@/components/AnimalCard';
import Lottie from "lottie-react";
import loadingAnimation from "@/data/loading.json";

<Lottie animationData={loadingAnimation} loop />

const featuredAnimals = [
  {
    id: 1,
    name: "Deshi Shahi Cow",
    breed: "Local Deshi",
    price: 125000,
    location: "Bogura",
    image: "./image/download2.jpg",
    category: "Large Animal"
  },
  {
    id: 2,
    name: "Jamunapari Goat",
    breed: "Jamunapari",
    price: 28500,
    location: "Sirajganj",
    image: "./image/download6.jpg",
    category: "Small Animal"
  },
  {
    id: 3,
    name: "Red Chittagong Cow",
    breed: "Red Chittagong",
    price: 98000,
    location: "Comilla",
    image: "./image/images3.jpg",
    category: "Large Animal"
  },
  {
    id: 4,
    name: "Black Bengal Goat",
    breed: "Black Bengal",
    price: 19500,
    location: "Comilla",
    image: "./image/download6.jpg",
    category: "Small Animal"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      
      {/* Professional Hero Banner */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.68), rgba(0, 0, 0, 0.72)), 
                             url('https://images.unsplash.com/photo-1587502536900-baf0c55a17c9?q=80&w=2000')`
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[length:50px_50px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-white mb-6 border border-white/20">
              🕌 Qurbani 2026 Season
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight mb-6">
              Find Your Perfect<br />
              <span className="text-amber-300">Qurbani Animal</span>
            </h1>

            <p className="text-xl text-gray-200 mb-10">
             Book cows and goats easily and reliably.<br />
              Trusted farmers • Healthy animals • Best price in Bangladesh
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/animals"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-10 py-4 rounded-2xl text-lg transition-all flex items-center justify-center gap-2"
              >
                Browse All Animals →
                
              </Link>
              <Link 
                href="#featured"
                className="border border-white/70 hover:bg-white/10 text-white font-medium px-8 py-4 rounded-2xl text-lg transition-all"
              >
                See Featured
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Animals Section - Fixed & Smooth */}
      <section id="featured" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-emerald-600 font-medium tracking-widest text-sm">HANDPICKED FOR YOU</p>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">Featured This Season</h2>
            <p className="text-gray-600 mt-4 max-w-md mx-auto">
              Premium quality animals carefully selected from trusted farms
            </p>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {featuredAnimals.map((animal, index) => (
    <div
      key={animal.id}
      className="opacity-0 animate-fadeUp"
      style={{
        animationDelay: `${index * 0.15}s`,
        animationFillMode: "forwards",
      }}
    >
      <AnimalCard animal={animal} />
    </div>
  ))}
</div>

          <div className="text-center mt-16">
            <Link 
              href="/animals"
              className="inline-flex items-center gap-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-10 py-4 rounded-2xl text-lg transition-all duration-300"
            >
              View All Animals 
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}