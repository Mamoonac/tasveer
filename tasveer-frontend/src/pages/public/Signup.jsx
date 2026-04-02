import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ onSignup }) => {

  const navigate = useNavigate();

  const [role, setRole] = useState('Client');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role
    };

    // ✅ SEND TO PARENT (preferred)
    if (onSignup) {
      onSignup(newUser);
    } else {
      // fallback (temporary)
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(newUser));
    }

    // ✅ REDIRECT
    if (role === 'Photographer') {
      navigate('/photographer/setup');
    } else {
      navigate('/client/dashboard');
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-6">

      <div className="glass-panel w-full max-w-lg p-12 rounded-[3.5rem] border-white/5">

        {/* HEADER */}
        <div className="text-center mb-10">

          <h2 className="text-4xl font-display text-[#D4AF37] mb-2">
            Create Account
          </h2>

          <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-bold">
            Join the Tasveer Collective
          </p>

        </div>
        
        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-5">

          {/* ROLE */}
          <div className="flex gap-4 mb-4">

            <button 
              type="button"
              onClick={() => setRole('Client')}
              className={`flex-1 py-3 rounded-xl text-[10px] font-bold border ${
                role === 'Client' 
                  ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5' 
                  : 'border-white/10 text-white/40'
              }`}
            >
              I AM A CLIENT
            </button>

            <button 
              type="button"
              onClick={() => setRole('Photographer')}
              className={`flex-1 py-3 rounded-xl text-[10px] font-bold border ${
                role === 'Photographer' 
                  ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5' 
                  : 'border-white/10 text-white/40'
              }`}
            >
              I AM AN ARTIST
            </button>

          </div>

          {/* NAME */}
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-[#D4AF37] text-white text-sm"
          />

          {/* EMAIL */}
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-[#D4AF37] text-white text-sm"
          />

          {/* PASSWORD */}
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create Password"
            required
            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-[#D4AF37] text-white text-sm"
          />
          
          <button 
            type="submit"
            className="tasveer-btn-primary w-full py-5 mt-4"
          >
            Register Now
          </button>

        </form>

        {/* FOOTER */}
        <p className="mt-8 text-center text-[10px] text-white/20 uppercase tracking-widest font-bold">
          Already a member?{" "}
          <Link to="/login" className="text-[#D4AF37] hover:underline">
            Sign In
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Signup;