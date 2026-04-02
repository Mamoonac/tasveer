import React from 'react';
import { motion } from 'framer-motion';

const AdminDashboard = ({ photographers = [], bookings = [] }) => {

  // ✅ Dynamic Stats
  const stats = [
    { 
      label: "Total Photographers", 
      value: photographers.length, 
      trend: "+5%" 
    },
    { 
      label: "Active Artists", 
      value: photographers.filter(p => p.active).length || photographers.length, 
      trend: "+5%" 
    },
    { 
      label: "Pending Bookings", 
      value: bookings.filter(b => !b.confirmed).length, 
      trend: "-2%" 
    },
    { 
      label: "Revenue", 
      value: `Rs. ${bookings.reduce((sum, b) => sum + (b.price || 0), 0)}`, 
      trend: "+12%" 
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <header className="mb-12">
        <h1 className="text-5xl font-display text-[#D4AF37] mb-2">
          Platform Overview
        </h1>
        <p className="text-white/30 uppercase tracking-[0.4em] text-[10px] font-bold">
          Administrative Dashboard
        </p>
      </header>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="glass-panel p-8 rounded-[2.5rem]"
          >
            <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold mb-4">
              {stat.label}
            </p>

            <div className="flex justify-between items-end">
              <h2 className="text-3xl font-display text-white">
                {stat.value}
              </h2>

              <span className={`text-[10px] font-bold ${
                stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LIST OF PHOTOGRAPHERS */}
      <div className="glass-panel p-10 rounded-[3rem]">
        <h3 className="text-xl font-display text-white mb-6">
          Registered Photographers
        </h3>

        <div className="space-y-4">
          {photographers.length > 0 ? (
            photographers.map((p) => (
              <div
                key={p.id}
                className="p-5 bg-white/5 rounded-xl border border-white/5 text-sm text-white/70"
              >
                {p.name} — {p.specialty} ({p.location})
              </div>
            ))
          ) : (
            <p className="text-white/30 text-sm">No photographers available</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;