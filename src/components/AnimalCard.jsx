
// src/components/AnimalCard.jsx
import Link from 'next/link';

export default function AnimalCard({ animal }) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-350 border border-gray-100 flex flex-col justify-between h-full">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={animal.image} 
          alt={animal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=600";
          }}
        />
        <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
          {animal.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-extrabold text-xl text-slate-800 line-clamp-1">{animal.name}</h3>
            <span className="badge badge-outline border-slate-200 text-slate-500 text-xs px-2 py-1 h-auto shrink-0 font-medium">
              {animal.breed}
            </span>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <span>📍</span> {animal.location}
          </p>
          <div className="flex gap-4 text-xs font-medium text-slate-500 pt-1">
            <span>⚖️ {animal.weight} kg</span>
            <span>🎂 {animal.age} yrs</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Price</p>
            <p className="text-2xl font-black text-emerald-700">৳{animal.price.toLocaleString()}</p>
          </div>

          <Link 
            href={`/details-page/${animal.id}`}
            className="btn btn-emerald bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold transition-all px-5 min-h-0 h-10 border-none shadow-sm hover:shadow-emerald-700/20"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}