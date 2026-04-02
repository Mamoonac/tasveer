import React from "react";
import PhotographerCard from "../../components/PhotographerCard";

const Studios = ({ photographersData = [] }) => {

  const studios = photographersData.filter(p => p.type === "studio");

  return (
    <div className="p-10 max-w-7xl mx-auto">

      <h2 className="text-4xl text-[#D4AF37] mb-10">
        Studios
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {studios.length > 0 ? (
          studios.map(p => <PhotographerCard key={p.id} artist={p} />)
        ) : (
          <p className="text-white/30 col-span-3 text-center">
            No studios available
          </p>
        )}

      </div>

    </div>
  );
};

export default Studios;