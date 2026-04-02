import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = ({ photographersData = [] }) => {

  const navigate = useNavigate();

  return (
    <div className="bg-[#2A1515] text-white">

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 z-0 opacity-40">
          <div className="w-full h-full bg-gradient-to-b from-transparent to-[#2A1515]" />
        </div>

        <div className="relative z-10 text-center px-6">

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold mb-6"
          >
            The Art of Visual Storytelling
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-7xl md:text-9xl font-display mb-10 tracking-tighter"
          >
            TASVEER
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col md:flex-row gap-6 justify-center"
          >

            {/* ✅ FIXED ROUTE */}
            <button 
              onClick={() => navigate('/photographers')}
              className="tasveer-btn-primary px-12 py-5 text-[10px]"
            >
              Explore Artists
            </button>

            <button 
              onClick={() => navigate('/signup')}
              className="border border-white/20 px-12 py-5 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-[#2A1515] transition-all rounded-xl"
            >
              Join the Collective
            </button>

          </motion.div>

        </div>

      </section>

      {/* ✅ OPTIONAL FEATURED SECTION (Dynamic) */}
      {photographersData.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-20">

          <h2 className="text-[#D4AF37] text-xs uppercase tracking-[0.4em] mb-6">
            Featured Artists
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {photographersData.slice(0, 3).map((p) => (
              <div 
                key={p.id}
                onClick={() => navigate(`/photographer/${p.id}`)}
                className="cursor-pointer group"
              >

                <div className="aspect-[4/5] bg-white/5 rounded-[2rem] overflow-hidden mb-4">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">
                      No Image
                    </div>
                  )}
                </div>

                <h4 className="text-lg font-display">{p.name}</h4>
                <p className="text-xs text-white/40">{p.specialty}</p>

              </div>
            ))}

          </div>

        </section>
      )}

    </div>
  );
};

export default Home;