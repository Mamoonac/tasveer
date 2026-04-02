import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ navLinks, showAuth = true, user }) => {

  // ✅ UPDATED LINKS
  const links = navLinks || [
    { label: "Solo Photographers", path: "/photographers" },
    { label: "Studios", path: "/studios" }, // ✅ FIXED
    { label: "Account", path: "/client/dashboard" },
    { label: "Join us", path: "/signup" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#2A1515]/95 backdrop-blur-sm border-b border-white/5 px-10 py-6 flex justify-between items-center">

      {/* LOGO */}
      <Link to="/" className="text-3xl font-display text-[#D4AF37] tracking-tighter">
        TASVEER
      </Link>
      
      {/* NAV LINKS */}
      <div className="hidden md:flex gap-10 items-center text-[10px] font-bold uppercase tracking-widest">

        {links.map((link, index) => (
          <NavLink 
            key={index}
            to={link.path}
            className={({ isActive }) => 
              isActive ? "text-[#D4AF37]" : "text-white/40 hover:text-white"
            }
          >
            {link.label}
          </NavLink>
        ))}

      </div>

      {/* AUTH */}
      {showAuth && (
        user ? (
          <span className="text-white/60 text-xs">
            Welcome, {user.name || "User"}
          </span>
        ) : (
          <Link to="/login" className="tasveer-btn-primary px-8 py-3 text-[10px]">
            Sign In
          </Link>
        )
      )}

    </nav>
  );
};

export default Navbar;