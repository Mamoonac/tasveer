import React from 'react';
import { useNavigate } from 'react-router-dom';

const PhotographerCard = ({ artist }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    if (artist?.id) {
      navigate(`/photographer/${artist.id}`);
    } else {
      console.warn("Missing artist ID:", artist);
    }
  };

  // ❌ Remove fake fallback data
  if (!artist) return null;

  return (
    <div 
      onClick={handleClick}
      className="glass-panel p-6 rounded-[2.5rem] border-white/5 hover:border-[#D4AF37]/20 transition-all group cursor-pointer"
    >

      {/* IMAGE */}
      <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-6 bg-white/5">

        {artist.image ? (
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">
            No Image
          </div>
        )}

      </div>

      {/* NAME */}
      <h4 className="text-xl font-display text-white">
        {artist.name}
      </h4>

      {/* SPECIALTY */}
      <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold mt-1">
        {artist.specialty}
      </p>

      {/* DESCRIPTION (NEW) */}
      {artist.description && (
        <p className="text-white/30 text-xs mt-3 line-clamp-2">
          {artist.description}
        </p>
      )}

      {/* PACKAGES (NEW 🔥) */}
      {artist.packages && artist.packages.length > 0 && (
        <div className="mt-4 text-[10px] text-[#D4AF37] font-bold">
          Starting from Rs. {artist.packages[0].price}
        </div>
      )}

    </div>
  );
};

export default PhotographerCard;