import React, { useState } from 'react';

const BookingModal = ({ isOpen, onClose, onBookingConfirm }) => {

  const [date, setDate] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date) {
      alert("Please select a date");
      return;
    }

    const bookingData = {
      id: Date.now(),   // ✅ unique id
      date
    };

    // ✅ Dynamic-ready (optional handler)
    if (onBookingConfirm) {
      onBookingConfirm(bookingData);
    } else {
      console.log("Booking Request:", bookingData);
    }

    setDate("");
    onClose();

    alert("Booking request submitted!");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-tasveer-maroon-bg/90 backdrop-blur-sm">

      <div className="bg-tasveer-maroon-card border border-white/10 rounded-[2.5rem] w-full max-w-lg p-10 relative">

        {/* CLOSE */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-tasveer-ivory/40 hover:text-tasveer-gold transition-colors text-2xl"
        >
          ×
        </button>

        {/* TITLE */}
        <h2 className="text-tasveer-ivory text-3xl font-display mb-2">
          Reserve Your Date
        </h2>

        <p className="text-tasveer-ivory/50 text-sm mb-8 font-body">
          Connect with the artist and secure your session.
        </p>
        
        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="flex flex-col gap-2 text-tasveer-ivory">

            <label className="text-xs text-tasveer-gold uppercase font-bold tracking-widest">
              Event Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-tasveer-gold"
            />

          </div>

          {/* BUTTON */}
          <button 
            type="submit"
            className="w-full bg-tasveer-gold text-tasveer-maroon-bg font-bold py-4 rounded-xl shadow-lg shadow-tasveer-gold/10 hover:scale-[1.02] transition"
          >
            Confirm Booking Request
          </button>

        </form>

      </div>

    </div>
  );
};

export default BookingModal;