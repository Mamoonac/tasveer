import React, { useState } from 'react';

const BookingConfirmation = ({ isOpen, onClose, artistName, onBookingConfirm }) => {

  const [date, setDate] = useState("");
  const [eventType, setEventType] = useState("Wedding Event");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {

    if (!date) {
      alert("Please select a date");
      return;
    }

    const bookingData = {
      id: Date.now(),
      artist: artistName,
      date,
      eventType,
      notes
    };

    // ✅ If parent handler exists, send data
    if (onBookingConfirm) {
      onBookingConfirm(bookingData);
    } else {
      // fallback (temporary)
      console.log("Booking Confirmed:", bookingData);
    }

    // reset
    setDate("");
    setEventType("Wedding Event");
    setNotes("");

    onClose();

    alert("Booking request sent successfully!");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#2A1515]/80 backdrop-blur-md">

      <div className="glass-panel w-full max-w-lg p-12 rounded-[3.5rem] border-[#D4AF37]/20 relative animate-slideUp">

        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 text-white/20 hover:text-white text-2xl"
        >
          ×
        </button>

        {/* TITLE */}
        <h2 className="text-3xl font-display text-[#D4AF37] mb-2 text-center">
          Book {artistName}
        </h2>

        <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-bold text-center mb-10">
          Secure your session
        </p>

        {/* FORM */}
        <form className="space-y-6">

          {/* DATE */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-[#D4AF37] text-white"
          />

          {/* EVENT TYPE */}
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-[#D4AF37] text-white"
          >
            <option>Wedding Event</option>
            <option>Fashion Editorial</option>
            <option>Personal Portrait</option>
          </select>

          {/* NOTES */}
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Special instructions..."
            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-[#D4AF37] text-white h-32"
          />

          {/* SUBMIT */}
          <button 
            type="button" 
            onClick={handleSubmit}
            className="tasveer-btn-primary w-full py-5"
          >
            Confirm Request
          </button>

        </form>

      </div>

    </div>
  );
};

export default BookingConfirmation;