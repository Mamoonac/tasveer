import React from 'react';

const BookingRequests = ({ bookingsData = [], onUpdateBooking }) => {

  // ✅ ONLY PENDING REQUESTS
  const requests = bookingsData.filter(b => b.status === "Pending");

  // ✅ HANDLE ACTION
  const handleAction = (id, newStatus) => {

    if (onUpdateBooking) {
      onUpdateBooking(id, newStatus);
    }

    alert(`Request ${newStatus}`);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">

      <h1 className="text-4xl font-display text-[#D4AF37] mb-10">
        Booking Inquiries
      </h1>

      <div className="space-y-6">

        {requests.length === 0 ? (
          <p className="text-white/40">No pending requests</p>
        ) : (

          requests.map((req) => (

            <div 
              key={req.id} 
              className="glass-panel p-8 rounded-[2.5rem] border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >

              {/* INFO */}
              <div>
                <h4 className="text-xl font-display text-white">
                  {req.artist || "Client"}
                </h4>

                <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold">
                  {req.eventType} • {req.date}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4">

                <button 
                  onClick={() => handleAction(req.id, 'Rejected')}
                  className="text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-red-500 transition-colors"
                >
                  Decline
                </button>

                <button 
                  onClick={() => handleAction(req.id, 'Confirmed')}
                  className="tasveer-btn-primary px-8 py-3"
                >
                  Accept Request
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default BookingRequests;