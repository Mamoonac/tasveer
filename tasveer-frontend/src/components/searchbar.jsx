import React, { useState } from 'react';

const Searchbar = ({
  onSearch,
  locations = [],
  eventTypes = [],
  budgets = []
}) => {

  const [location, setLocation] = useState("");
  const [eventType, setEventType] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = () => {

    const filters = {
      location,
      eventType,
      budget
    };

    if (onSearch) {
      onSearch(filters);
    } else {
      console.log("Search Filters:", filters);
    }
  };

  return (
    <div className="relative z-20 -mt-20 max-w-5xl mx-auto px-4 w-full">

      <div className="bg-tasveer-maroon-card/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-6 items-end">

        {/* LOCATION */}
        <div className="flex flex-col gap-2">
          <label className="text-tasveer-gold text-[10px] uppercase font-bold tracking-widest">
            Location
          </label>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent text-tasveer-ivory border-b border-white/10 py-2 focus:outline-none focus:border-tasveer-gold transition-colors cursor-pointer"
          >
            <option value="">Select Location</option>

            {locations.map((loc, index) => (
              <option key={index} value={loc} className="bg-tasveer-maroon-bg">
                {loc}
              </option>
            ))}
          </select>
        </div>
        
        {/* EVENT TYPE */}
        <div className="flex flex-col gap-2">
          <label className="text-tasveer-gold text-[10px] uppercase font-bold tracking-widest">
            Event Type
          </label>

          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="bg-transparent text-tasveer-ivory border-b border-white/10 py-2 focus:outline-none focus:border-tasveer-gold transition-colors cursor-pointer"
          >
            <option value="">Select Event</option>

            {eventTypes.map((type, index) => (
              <option key={index} value={type} className="bg-tasveer-maroon-bg">
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* BUDGET */}
        <div className="flex flex-col gap-2">
          <label className="text-tasveer-gold text-[10px] uppercase font-bold tracking-widest">
            Budget
          </label>

          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="bg-transparent text-tasveer-ivory border-b border-white/10 py-2 focus:outline-none focus:border-tasveer-gold transition-colors cursor-pointer"
          >
            <option value="">Select Budget</option>

            {budgets.map((b, index) => (
              <option key={index} value={b} className="bg-tasveer-maroon-bg">
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* BUTTON */}
        <button 
          onClick={handleSearch}
          className="bg-tasveer-gold text-tasveer-maroon-bg font-bold py-4 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-tasveer-gold/20"
        >
          Find Photographer
        </button>

      </div>

    </div>
  );
};

export default Searchbar;