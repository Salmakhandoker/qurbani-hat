// src/app/animals/page.jsx
"use client";

import { useEffect, useState } from "react";
import animalsData from "@/data/animals.json";
import AnimalCard from "@/components/AnimalCard";

export default function AllAnimals() {
  const [animals, setAnimals] = useState([]);
  const [sortOrder, setSortOrder] = useState("low");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setAnimals(animalsData);
  }, []);

  // Sort & Filter Logic
  const filteredAndSortedAnimals = [...animals]
    .filter((animal) =>
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      return sortOrder === "low" ? a.price - b.price : b.price - a.price;
    });

  const handleSort = (order) => {
    setSortOrder(order);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">All Animals</h1>
          <p className="text-gray-600 text-lg">
            Browse our collection of healthy cows and goats for Qurbani
          </p>
        </div>

        {/* Search + Sort Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search by name, breed or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 pl-12 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-500 transition"
            />
            <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
          </div>

          {/* Sort Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => handleSort("low")}
              className={`px-6 py-3 rounded-2xl font-medium transition-all ${
                sortOrder === "low"
                  ? "bg-emerald-700 text-white shadow-md"
                  : "bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Price: Low → High
            </button>

            <button
              onClick={() => handleSort("high")}
              className={`px-6 py-3 rounded-2xl font-medium transition-all ${
                sortOrder === "high"
                  ? "bg-emerald-700 text-white shadow-md"
                  : "bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Price: High → Low
            </button>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-500 mb-6">
          Showing {filteredAndSortedAnimals.length} animals
        </p>

        {/* Animal Grid */}
        {filteredAndSortedAnimals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAndSortedAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No animals found 😕</p>
          </div>
        )}
      </div>
    </div>
  );
}