import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PhotographerSetup = ({ onSetupProfile, currentUser }) => {

  const navigate = useNavigate();

  const [specialty, setSpecialty] = useState("Wedding & Events");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("solo"); // ✅ NEW
  const [coverImage, setCoverImage] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {

    if (!price) {
      alert("Enter price");
      return;
    }

    const profileData = {
      id: currentUser?.id || Date.now(),
      name: currentUser?.name || "Artist",
      specialty,
      startingPrice: price,
      location: "Pakistan",
      description: "",
      portfolio: [],
      packages: [],
      coverImage,
      type // ✅ IMPORTANT
    };

    onSetupProfile(profileData);
    navigate("/studio/dashboard");
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">

      <h1 className="text-4xl text-[#D4AF37] mb-10 text-center">
        Profile Setup
      </h1>

      <div className="glass-panel p-10 rounded-[3rem] space-y-6">

        {/* TYPE */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-4 bg-white/5 text-white rounded-xl"
        >
          <option value="solo">Solo Photographer</option>
          <option value="studio">Studio</option>
        </select>

        {/* COVER */}
        <input type="file" onChange={handleImageUpload} />

        {/* PREVIEW */}
        {coverImage && (
          <img src={coverImage} className="h-40 w-full object-cover rounded-xl" />
        )}

        {/* SPECIALTY */}
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="w-full p-4 bg-white/5 text-white rounded-xl"
        >
          <option>Wedding & Events</option>
          <option>Fashion</option>
          <option>Commercial</option>
        </select>

        {/* PRICE */}
        <input
          type="number"
          placeholder="Starting Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-4 bg-white/5 text-white rounded-xl"
        />

        <button onClick={handleSubmit} className="tasveer-btn-primary w-full py-4">
          Complete Profile
        </button>

      </div>

    </div>
  );
};

export default PhotographerSetup;