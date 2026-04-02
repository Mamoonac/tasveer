import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingConfirmation from '../../components/BookingConfirmation';

const PhotographerProfile = ({ photographersData = [], onBookingConfirm }) => {

  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  const photographer = photographersData.find(
    (p) => p.id === parseInt(id)
  );

  if (!photographer) {
    return <div className="text-white p-10">Photographer not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#2A1515]">

      {/* COVER */}
      <div className="h-[50vh] relative overflow-hidden">

        <img
          src={
            photographer.coverImage ||
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          }
          alt="cover"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2A1515]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 -mt-32 relative z-10">

        <div className="flex flex-col md:flex-row gap-12 items-start">

          {/* PROFILE */}
          <div className="w-full md:w-1/3">

            <div className="glass-panel p-8 md:p-10 rounded-[3.5rem] border-white/10 mb-8">

              <h1 className="text-3xl md:text-4xl font-display text-white mb-2">
                {photographer.name}
              </h1>

              <p className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold mb-6">
                {photographer.specialty}
              </p>

              <p className="text-white/40 text-sm leading-relaxed mb-6">
                {photographer.description || "No description added yet"}
              </p>

              <p className="text-white/30 text-xs mb-8">
                📍 {photographer.location || "Location not specified"}
              </p>

              <button 
                onClick={() => setShowModal(true)}
                className="tasveer-btn-primary w-full py-5"
              >
                Request Booking
              </button>

            </div>

            {/* 🔥 PACKAGES */}
            <div className="glass-panel p-6 rounded-[2.5rem] border-white/10">

              <h3 className="text-[#D4AF37] font-display text-lg mb-6">
                Packages
              </h3>

              {photographer.packages?.length > 0 ? (

                photographer.packages.map((pkg) => (

                  <div 
                    key={pkg.id}
                    className="p-5 bg-white/5 rounded-2xl mb-4 border border-white/5 hover:border-[#D4AF37]/20 transition-all"
                  >

                    <div className="flex justify-between items-start mb-2">

                      <h4 className="text-white font-display text-lg">
                        {pkg.title}
                      </h4>

                      <span className="text-[#D4AF37] font-bold text-sm">
                        Rs. {pkg.price}
                      </span>

                    </div>

                    <p className="text-white/40 text-xs leading-relaxed">
                      {pkg.details || "No details provided"}
                    </p>

                  </div>

                ))

              ) : (

                <p className="text-white/30 text-xs text-center py-6">
                  No packages available
                </p>

              )}

            </div>

          </div>

          {/* PORTFOLIO */}
          <div className="flex-grow grid grid-cols-2 md:grid-cols-3 gap-6">

            {photographer.portfolio?.length > 0 ? (

              photographer.portfolio.map((img, i) => (

                <div 
                  key={i}
                  className="aspect-square rounded-[2.5rem] border border-white/5 overflow-hidden group"
                >

                  <img
                    src={img}
                    alt="portfolio"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                </div>

              ))

            ) : (

              <div className="col-span-full h-60 border-2 border-dashed border-white/5 rounded-[3rem] flex items-center justify-center text-white/20 text-xs uppercase tracking-widest">
                No portfolio images
              </div>

            )}

          </div>

        </div>

      </div>

      {/* BOOKING MODAL */}
      <BookingConfirmation
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        artistName={photographer.name}
        onBookingConfirm={onBookingConfirm}
      />

    </div>
  );
};

export default PhotographerProfile;