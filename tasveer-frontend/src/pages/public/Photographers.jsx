import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhotographerCard from "../../components/PhotographerCard";

const Photographers = () => {
  const navigate = useNavigate();
  const [photographers, setPhotographers] = useState([]);

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/api/photographers")
      .then(res => res.json())
      .then(data => setPhotographers(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-10 max-w-7xl mx-auto">

      <h2 className="text-5xl font-display text-[#D4AF37] mb-10">
        All Photographers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {photographers.length === 0 ? (
          <p className="text-white/40">No photographers found</p>
        ) : (
          photographers.map((p) => (
            <div 
              key={p.id}
              onClick={() => navigate(`/photographer/${p.id}`)}
              className="cursor-pointer"
            >
              <PhotographerCard artist={p} />
            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default Photographers;