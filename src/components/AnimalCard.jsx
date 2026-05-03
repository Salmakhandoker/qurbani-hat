
// src/components/AnimalCard.jsx
import Link from 'next/link';

export default function AnimalCard({ animal }) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={animal.image} 
          alt={animal.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-white px-4 py-1 text-xs font-medium rounded-full shadow-sm">
          {animal.category}
        </div>
      </div>
      {/* animation */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden 
  transform transition duration-300 ease-in-out 
  hover:scale-105 hover:shadow-xl">

  </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-1 line-clamp-2">{animal.name}</h3>
        <p className="text-gray-500 text-sm">{animal.breed}</p>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-emerald-700">৳{animal.price.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">{animal.location}</p>
          </div>

          <Link 
          
            href={`/animals/details/${animal.id}`}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-7 py-3 rounded-2xl text-sm font-medium transition-all"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}