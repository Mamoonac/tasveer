import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudioSetup = () => {

  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) setCoverImage(URL.createObjectURL(file));
  };

  const handleSubmit = () => {

    const newStudio = {
      id: Date.now(), // ✅ IMPORTANT
      name: "My Studio",
      type: "studio",
      profilePic,
      coverImage,
      location: "Pakistan",
      description: "",
      portfolio: [],
      packages: []
    };

    // ✅ SAVE IN MAIN LIST
    const existing = JSON.parse(localStorage.getItem("photographers")) || [];
    existing.push(newStudio);
    localStorage.setItem("photographers", JSON.stringify(existing));

    alert("Studio created!");

    navigate(`/studio/${newStudio.id}`); // 🔥 go to profile
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">

      <h1 className="text-4xl text-[#D4AF37] text-center mb-10">
        Studio Setup
      </h1>

      <div className="glass-panel p-10 rounded-[3rem] space-y-6">

        <input type="file" onChange={handleProfileUpload} />
        {profilePic && <img src={profilePic} className="h-24 rounded-xl" />}

        <input type="file" onChange={handleCoverUpload} />
        {coverImage && <img src={coverImage} className="h-40 rounded-xl" />}

        <button 
          onClick={handleSubmit}
          className="tasveer-btn-primary w-full py-4"
        >
          Complete Setup
        </button>

      </div>

    </div>
  );
};

export default StudioSetup;