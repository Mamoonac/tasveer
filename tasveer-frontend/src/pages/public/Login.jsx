import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {

  const navigate = useNavigate();

  const [role, setRole] = useState("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const user = { email, role };

    if (onLogin) onLogin(user);

    // ✅ REDIRECT
    if (role === "studio" || role === "photographer") {
      navigate("/studio/dashboard");
    } else {
      navigate("/client/dashboard");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-6 bg-[#2A1515]">

      <div className="glass-panel w-full max-w-md p-12 rounded-[3.5rem] border-white/5 text-center">

        <h2 className="text-4xl font-display text-[#D4AF37] mb-2">
          Welcome Back
        </h2>

        <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-bold mb-10">
          Sign in to your account
        </p>

        {/* 🔥 ROLE SELECT */}
        <div className="flex gap-3 mb-6">

          {["client", "photographer", "studio"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 py-3 rounded-xl text-[10px] font-bold border transition-all ${
                role === r
                  ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5"
                  : "border-white/10 text-white/40 hover:text-white"
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}

        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-6">

          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-white placeholder:text-white/30 transition-all"
          />

          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-white placeholder:text-white/30 transition-all"
          />

          <button type="submit" className="tasveer-btn-primary w-full py-5">
            Sign In
          </button>

        </form>

        {/* 🔥 NEW: STUDIO JOIN CTA */}
        <div className="mt-8">

          <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold mb-4">
            Want to join as a studio?
          </p>

          <button
            onClick={() => navigate("/studio/setup")}
            className="w-full border border-[#D4AF37]/30 text-[#D4AF37] py-4 rounded-xl text-[10px] font-bold tracking-widest hover:bg-[#D4AF37]/10 transition-all"
          >
            CREATE STUDIO PROFILE
          </button>

        </div>

        {/* FOOTER */}
        <p className="mt-8 text-[10px] text-white/20 uppercase tracking-widest font-bold">
          New here?{" "}
          <Link to="/signup" className="text-[#D4AF37] hover:underline">
            Create Account
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;