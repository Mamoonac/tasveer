import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ linksData, title = "STUDIO" }) => {

  // ✅ Default fallback (safe)
  const links = linksData || [
    { name: 'Dashboard', path: '/studio/dashboard' },
    { name: 'Booking Requests', path: '/studio/requests' },
    { name: 'Earnings', path: '/studio/earnings' },
    { name: 'Portfolio Upload', path: '/studio/upload' }
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#211111] border-r border-white/5 p-8 sticky top-0 flex flex-col">

      {/* TITLE */}
      <div className="mb-16 text-[#D4AF37] font-display text-xl tracking-widest">
        {title}
      </div>

      {/* LINKS */}
      <div className="flex flex-col gap-8 flex-1">

        {links.map((link, index) => (

          <NavLink 
            key={index}
            to={link.path}
            className={({ isActive }) => 
              `text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${
                isActive 
                  ? 'text-[#D4AF37] translate-x-1' 
                  : 'text-white/20 hover:text-white'
              }`
            }
          >
            {link.name}
          </NavLink>

        ))}

      </div>

    </aside>
  );
};

export default Sidebar;