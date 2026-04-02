import React, { useMemo } from 'react';

const PhotographerDashboard = ({ bookingsData = [] }) => {

  // ✅ STATS
  const stats = useMemo(() => {

    const totalBookings = bookingsData.length;
    const pending = bookingsData.filter(b => b.status === "Pending").length;

    return [
      { label: "Total Bookings", value: totalBookings, icon: "📸" },
      { label: "New Requests", value: pending, icon: "📩" },
      { label: "Confirmed Jobs", value: bookingsData.filter(b => b.status === "Confirmed").length, icon: "✅" }
    ];

  }, [bookingsData]);

  // ✅ RECENT ACTIVITY
  const activities = useMemo(() => {

    const recent = bookingsData.slice(-3).map((b) => {

      if (b.status === "Confirmed") {
        return `Booking with ${b.artist} confirmed`;
      }

      if (b.status === "Pending") {
        return `New request from ${b.artist}`;
      }

      if (b.status === "Rejected") {
        return `Request declined for ${b.artist}`;
      }

      return "Activity updated";
    });

    return recent.length > 0 ? recent.reverse() : ["No recent activity"];

  }, [bookingsData]);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-display text-[#D4AF37] mb-2">
          Artist Studio
        </h1>

        <p className="text-white/30 uppercase tracking-[0.4em] text-[10px] font-bold">
          Performance & Overview
        </p>
      </header>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        {stats.map((stat, i) => (

          <div 
            key={i} 
            className="glass-panel p-6 md:p-8 rounded-[2.5rem] border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent"
          >

            <div className="text-2xl mb-4">{stat.icon}</div>

            <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold mb-1">
              {stat.label}
            </p>

            <h2 className="text-2xl md:text-3xl font-display text-white">
              {stat.value}
            </h2>

          </div>

        ))}

      </div>

      {/* ACTIVITY */}
      <div className="glass-panel p-8 md:p-10 rounded-[3rem] border-[#D4AF37]/10">

        <h3 className="text-xl font-display text-white mb-6">
          Recent Activity
        </h3>

        <div className="space-y-4">

          {activities.map((act, i) => (

            <div 
              key={i}
              className="p-4 bg-white/5 rounded-xl border border-white/5 text-xs text-white/60"
            >
              {act}
            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default PhotographerDashboard;