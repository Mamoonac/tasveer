import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Hero from '../../components/Hero';
import Searchbar from '../../components/Searchbar';
import PhotographerCard from '../../components/PhotographerCard';

const Home = ({ photographersData = [] }) => {

  const navigate = useNavigate();
  const [filtered, setFiltered] = useState(photographersData);

  // ✅ HANDLE SEARCH
  const handleSearch = (filters) => {

    let result = photographersData;

    if (filters.location) {
      result = result.filter(p => p.location === filters.location);
    }

    if (filters.eventType) {
      result = result.filter(p => p.specialty === filters.eventType);
    }

    if (filters.budget) {
      // simple example (can improve later)
      result = result.filter(p => p.packages?.length > 0);
    }

    setFiltered(result);
  };

  return (
    <div className="bg-tasveer-maroon-bg min-h-screen">

      {/* HERO */}
      <Hero />

      {/* SEARCH */}
      <Searchbar 
        onSearch={handleSearch}
        locations={[...new Set(photographersData.map(p => p.location))]}
        eventTypes={[...new Set(photographersData.map(p => p.specialty))]}
        budgets={["Premium", "Standard"]}
      />

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-24">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">

          <div>
            <h2 className="text-tasveer-gold text-xs uppercase font-bold tracking-[0.4em] mb-4">
              Curated Artists
            </h2>

            <h3 className="text-tasveer-ivory text-3xl md:text-4xl font-display">
              Elite Storytellers
            </h3>
          </div>

          <button 
            onClick={() => navigate('/photographers')}
            className="text-tasveer-gold text-xs uppercase font-bold tracking-widest border-b border-tasveer-gold/30 pb-2 hover:border-tasveer-gold transition-all"
          >
            View All Photographers
          </button>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">

          {(filtered.length > 0 ? filtered : photographersData)
            .slice(0, 3)
            .map((photographer) => (

              <PhotographerCard 
                key={photographer.id} 
                artist={photographer}
              />

          ))}

        </div>

      </section>

    </div>
  );
};

export default Home;