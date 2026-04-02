import React, { useState } from 'react';

const AddPackages = ({ packages = [], onUpdatePackages }) => {

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = () => {

    if (!title || !price) {
      alert("Please fill required fields");
      return;
    }

    const newPackage = {
      id: Date.now(),
      title,
      details,
      price
    };

    const updated = [...packages, newPackage];
    onUpdatePackages(updated);

    setTitle("");
    setDetails("");
    setPrice("");
  };

  const handleDelete = (id) => {
    const updated = packages.filter(p => p.id !== id);
    onUpdatePackages(updated);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-5xl font-display text-[#D4AF37] mb-2">
          Packages
        </h1>
        <p className="text-white/30 text-xs uppercase tracking-widest font-bold">
          Define your creative offerings
        </p>
      </div>

      {/* ADD FORM */}
      <div className="glass-panel p-10 rounded-[3rem] border-[#D4AF37]/10 mb-12 space-y-6">

        <input
          type="text"
          placeholder="Package Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-[#D4AF37] text-white"
        />

        <textarea
          placeholder="Package Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-[#D4AF37] text-white h-28"
        />

        <input
          type="number"
          placeholder="Price (Rs.)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-[#D4AF37] text-white"
        />

        <button 
          onClick={handleAdd}
          className="tasveer-btn-primary w-full py-5"
        >
          Add Package
        </button>

      </div>

      {/* PACKAGE LIST */}
      <div className="grid md:grid-cols-2 gap-8">

        {packages.length > 0 ? (

          packages.map((pkg) => (

            <div 
              key={pkg.id} 
              className="glass-panel p-8 rounded-[2.5rem] border-white/5 hover:border-[#D4AF37]/20 transition-all"
            >

              <div className="flex justify-between items-start mb-4">

                <h3 className="text-xl font-display text-white">
                  {pkg.title}
                </h3>

                <button 
                  onClick={() => handleDelete(pkg.id)}
                  className="text-red-500 text-[10px] uppercase font-bold tracking-widest hover:text-red-400"
                >
                  Remove
                </button>

              </div>

              <p className="text-white/40 text-sm mb-6">
                {pkg.details || "No description provided"}
              </p>

              <p className="text-[#D4AF37] font-bold text-lg">
                Rs. {pkg.price}
              </p>

            </div>

          ))

        ) : (

          <div className="col-span-full text-center py-20 border border-white/5 rounded-[3rem] text-white/20 uppercase tracking-widest text-xs">
            No packages added yet
          </div>

        )}

      </div>

    </div>
  );
};

export default AddPackages;