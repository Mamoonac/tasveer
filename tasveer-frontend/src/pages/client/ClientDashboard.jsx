import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ClientDashboard = ({ user, bookingsData = [], actionsData }) => {

  const navigate = useNavigate();

  // ✅ Latest booking from props
  const latestBooking = bookingsData.length > 0 
    ? bookingsData[bookingsData.length - 1] 
    : null;

  // ✅ Dynamic actions (fallback safe)
  const actions = actionsData || [
    { 
      title: "My Bookings", 
      desc: "Track and manage your sessions", 
      icon: "📅", 
      path: "/account/bookings" 
    },
    { 
      title: "Inbox", 
      desc: "Chat with your photographers", 
      icon: "💬", 
      path: "/account/messages" 
    },
    { 
      title: "Find Artists", 
      desc: "Explore the collective", 
      icon: "🔍", 
      path: "/photographers" 
    }
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fadeIn">

      {/* HEADER */}
      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-display text-[#D4AF37] mb-2">
          Welcome, {user?.name || "Client"}
        </h1>

        <p className="text-white/30 uppercase tracking-[0.4em] text-[10px] font-bold">
          Your Visual Journey at a Glance
        </p>
      </header>

      {/* ACTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

        {actions.map((item, i) => (

          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            onClick={() => navigate(item.path)}
            className="glass-panel p-8 md:p-10 rounded-[3rem] border-white/5 cursor-pointer hover:border-[#D4AF37]/30 transition-all group"
          >

            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>

            <h3 className="text-xl md:text-2xl font-display text-white mb-2">
              {item.title}
            </h3>

            <p className="text-xs text-white/40 leading-relaxed">
              {item.desc}
            </p>

          </motion.div>

        ))}

      </div>

      {/* UPCOMING SESSION */}
      <div className="glass-panel p-8 md:p-10 rounded-[3rem] border-[#D4AF37]/10 bg-gradient-to-br from-[#D4AF37]/5 to-transparent flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

        <div>
          <h4 className="text-[#D4AF37] font-display text-xl mb-1">
            Upcoming Session
          </h4>

          {latestBooking ? (
            <p className="text-white/60 text-sm italic">
              {latestBooking.eventType} with {latestBooking.artist} — {latestBooking.date}
            </p>
          ) : (
            <p className="text-white/40 text-sm italic">
              No upcoming bookings
            </p>
          )}
        </div>

        <button 
          onClick={() => navigate("/account/bookings")}
          className="tasveer-btn-primary px-10 py-4 text-[10px]"
        >
          View Details
        </button>

      </div>

    </div>
  );
};

export default ClientDashboard;