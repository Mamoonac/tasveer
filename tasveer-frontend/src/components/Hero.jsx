import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = ({
  title = "Elegance",
  highlight = "Defined.",
  subtitle = "Premium Photography Marketplace",
  description = "Connecting visionaries with the world's most elite photographers. Experience a curated collective where every frame tells a masterpiece.",
  explorePath = "/photographers",
  storyPath // optional
}) => {

  const navigate = useNavigate();

  const handleExplore = () => {
    navigate(explorePath);
  };

  const handleStory = () => {
    if (storyPath) {
      navigate(storyPath);
    } else {
      console.log("Story page not connected yet");
      alert("Story page coming soon");
    }
  };

  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden bg-[#2A1515]">

      {/* Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[120%] bg-[#D4AF37]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[100%] bg-[#D4AF37]/5 blur-[100px] rounded-full" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-center px-6 max-w-5xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <span className="text-[10px] uppercase tracking-[0.6em] text-[#D4AF37] font-bold mb-8 block">
            {subtitle}
          </span>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display text-white mb-10 tracking-tighter leading-none">
            {title} <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#f3d98a] to-[#D4AF37]">
              {highlight}
            </span>
          </h1>

          <p className="text-white/40 text-sm md:text-base max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            {description}
          </p>
          
          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">

            {/* MAIN CTA */}
            <button 
              onClick={handleExplore}
              className="tasveer-btn-primary px-12 py-5 text-[10px] w-full sm:w-auto"
            >
              VIEW COLLECTIVE
            </button>

            {/* SECONDARY CTA */}
            <button 
              onClick={handleStory}
              className="text-white/60 hover:text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold transition-colors"
            >
              Our Story —
            </button>

          </div>

        </motion.div>

      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
      </div>

    </section>
  );
};

export default Hero;