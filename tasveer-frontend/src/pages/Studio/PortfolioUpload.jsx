import React, { useState } from 'react';

const PortfolioUpload = ({ portfolio = [], onUpdatePortfolio }) => {

  const [files, setFiles] = useState(portfolio);

  // ✅ HANDLE UPLOAD
  const handleUpload = (e) => {

    const uploaded = Array.from(e.target.files).map(file => {
      return URL.createObjectURL(file);
    });

    const updated = [...files, ...uploaded];

    setFiles(updated);

    // ✅ SEND TO APP
    if (onUpdatePortfolio) {
      onUpdatePortfolio(updated);
    }
  };

  // ✅ REMOVE IMAGE
  const handleRemove = (index) => {

    const updated = files.filter((_, i) => i !== index);

    setFiles(updated);

    if (onUpdatePortfolio) {
      onUpdatePortfolio(updated);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-12">

        <h1 className="text-4xl font-display text-[#D4AF37]">
          Portfolio
        </h1>

        <label className="tasveer-btn-primary px-8 py-3 cursor-pointer">
          Upload New
          <input 
            type="file" 
            multiple 
            className="hidden" 
            onChange={handleUpload} 
          />
        </label>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {files.length > 0 ? (

          files.map((src, i) => (

            <div 
              key={i} 
              className="aspect-square rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden relative group"
            >

              <img 
                src={src} 
                alt="Upload" 
                className="w-full h-full object-cover" 
              />

              {/* REMOVE */}
              <button 
                onClick={() => handleRemove(i)}
                className="absolute inset-0 bg-[#2A1515]/80 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase font-bold text-red-500"
              >
                Remove
              </button>

            </div>

          ))

        ) : (

          <div className="col-span-full h-64 border-2 border-dashed border-white/5 rounded-[3rem] flex items-center justify-center text-white/20 uppercase tracking-widest text-xs font-bold">
            No items in portfolio
          </div>

        )}

      </div>

    </div>
  );
};

export default PortfolioUpload;