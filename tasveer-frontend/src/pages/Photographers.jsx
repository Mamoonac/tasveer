import React from "react";
import PhotographerCard from "../components/PhotographerCard";

function Photographers({ photographersData = [] }) {

  return (
    <div className="p-10 max-w-7xl mx-auto">

      <h2 className="text-4xl font-display text-[#D4AF37] mb-10">
        All Photographers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {photographersData.length > 0 ? (

          photographersData.map((p) => (
            <PhotographerCard 
              key={p.id}
              artist={p}
            />
          ))

        ) : (

          <p className="text-white/30 text-center col-span-3">
            No photographers available
          </p>

        )}

      </div>

    </div>
  );
}

export default Photographers;