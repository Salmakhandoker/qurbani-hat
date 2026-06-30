// src/app/animals/page.jsx
"use client";

import { useEffect, useState } from "react";
import animalsData from "@/data/animals.json";
import AnimalCard from "@/components/AnimalCard";

export default function AllAnimals() {
  const [animals, setAnimals] = useState([]);
  const [sortOrder, setSortOrder] = useState("low");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state on fetch data
    const timer = setTimeout(() => {
      setAnimals(animalsData);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Sort & Filter Logic
  const filteredAndSortedAnimals = [...animals]
    .filter((animal) => {
      const matchesSearch = 
        animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        selectedType === "All" || 
        animal.type.toLowerCase() === selectedType.toLowerCase();

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      return sortOrder === "low" ? a.price - b.price : b.price - a.price;
    });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-bold tracking-widest text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full uppercase">
            Marketplace Directory
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900">Explore All Animals</h1>
          <p className="text-slate-600 max-w-md mx-auto text-sm md:text-base">
            Browse our verified collection of healthy cows and goats. Filter and sort to find your perfect match.
          </p>
        </div>

        {/* Search + Filter + Sort Controls */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8 space-y-4 md:space-y-0 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by name, breed, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-10 rounded-2xl border-slate-200 focus:outline-emerald-600 text-sm h-12"
            />
            <span className="absolute left-3.5 top-3.5 text-slate-400 text-sm">🔍</span>
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto items-center justify-end">
            {/* Category Filter */}
            <div className="join border border-slate-200 rounded-2xl overflow-hidden h-12">
              <button 
                onClick={() => setSelectedType("All")}
                className={`join-item px-5 text-xs font-bold transition-all ${selectedType === "All" ? "bg-slate-900 text-white" : "bg-white hover:bg-slate-50 text-slate-600"}`}
              >
                All
              </button>
              <button 
                onClick={() => setSelectedType("Cow")}
                className={`join-item px-5 text-xs font-bold transition-all ${selectedType === "Cow" ? "bg-slate-900 text-white" : "bg-white hover:bg-slate-50 text-slate-600"}`}
              >
                🐄 Cows
              </button>
              <button 
                onClick={() => setSelectedType("Goat")}
                className={`join-item px-5 text-xs font-bold transition-all ${selectedType === "Goat" ? "bg-slate-900 text-white" : "bg-white hover:bg-slate-50 text-slate-600"}`}
              >
                🐐 Goats
              </button>
            </div>

            {/* Price Sort Selection */}
            <div className="join border border-slate-200 rounded-2xl overflow-hidden h-12">
              <button
                onClick={() => setSortOrder("low")}
                className={`join-item px-4 text-xs font-bold transition-all ${sortOrder === "low" ? "bg-emerald-700 text-white" : "bg-white hover:bg-slate-50 text-slate-600"}`}
              >
                Price: Low-High
              </button>
              <button
                onClick={() => setSortOrder("high")}
                className={`join-item px-4 text-xs font-bold transition-all ${sortOrder === "high" ? "bg-emerald-700 text-white" : "bg-white hover:bg-slate-50 text-slate-600"}`}
              >
                Price: High-Low
              </button>
            </div>
          </div>

        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <span className="loading loading-spinner loading-lg text-emerald-600"></span>
            <p className="text-slate-500 font-medium text-sm">Fetching fresh livestock listings...</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-slate-500 text-sm font-semibold">
                Found {filteredAndSortedAnimals.length} animal{filteredAndSortedAnimals.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Animal Grid */}
            {filteredAndSortedAnimals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredAndSortedAnimals.map((animal) => (
                  <AnimalCard key={animal.id} animal={animal} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm max-w-md mx-auto mt-12 space-y-4">
                <span className="text-5xl">🔍</span>
                <h3 className="text-xl font-bold text-slate-800">No animals matches</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  We couldn't find any livestock matching "{searchTerm}" in the {selectedType} category. Try refining your keyword.
                </p>
                <button 
                  onClick={() => { setSearchTerm(""); setSelectedType("All"); }}
                  className="btn btn-emerald bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl btn-sm font-semibold border-none"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}