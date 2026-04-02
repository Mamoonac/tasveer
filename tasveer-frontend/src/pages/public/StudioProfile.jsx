import React from "react";
import { useParams } from "react-router-dom";

const StudioProfile = ({ photographersData = [] }) => {

  const { id } = useParams();

  // ✅ FIXED ID MATCH
  const studio = photographersData.find(
    (p) => String(p.id) === id && p.type === "studio"
  );

  if (!studio) {
    return <div className="text-white p-10">Studio not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#2A1515]">

      {/* COVER */}
      <div className="h-[50vh] relative">
        <img
          src={
            studio.coverImage ||
            "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
          }
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2A1515]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10">

        <div className="flex flex-col md:flex-row gap-10">

          {/* LEFT */}
          <div className="w-full md:w-1/3">

            <div className="glass-panel p-8 rounded-[3rem]">

              <img
                src={studio.profilePic || "https://via.placeholder.com/150"}
                className="w-24 h-24 rounded-full mb-6 object-cover"
              />

              <h1 className="text-3xl text-white mb-2">
                {studio.name || "Studio Name"}
              </h1>

              <p className="text-[#D4AF37] text-xs uppercase mb-4">
                Studio
              </p>

              <p className="text-white/40 text-sm mb-6">
                {studio.description || "No description added"}
              </p>

              <p className="text-white/30 text-xs">
                📍 {studio.location || "Pakistan"}
              </p>

            </div>

            {/* PACKAGES */}
            <div className="glass-panel p-6 rounded-[2rem] mt-6">

              <h3 className="text-[#D4AF37] mb-4">Packages</h3>

              {studio.packages?.length > 0 ? (
                studio.packages.map((pkg, i) => (
                  <div key={i} className="mb-3 p-4 bg-white/5 rounded-xl">
                    <h4 className="text-white">{pkg.title}</h4>
                    <p className="text-white/40 text-xs">{pkg.details}</p>
                    <p className="text-[#D4AF37]">Rs. {pkg.price}</p>
                  </div>
                ))
              ) : (
                <p className="text-white/30 text-xs">No packages</p>
              )}

            </div>

          </div>

          {/* PORTFOLIO */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6">

            {studio.portfolio?.length > 0 ? (
              studio.portfolio.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="rounded-2xl object-cover h-60 w-full"
                />
              ))
            ) : (
              <p className="text-white/30 col-span-3 text-center">
                No portfolio images
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default StudioProfile;