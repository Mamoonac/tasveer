import React from 'react';

const BookingHistory = ({ bookingsData = [] }) => {

  return (
    <div className="p-8 max-w-6xl mx-auto">

      <div className="mb-12">
        <h1 className="text-5xl font-display text-[#D4AF37]">
          Booking History
        </h1>

        <p className="text-white/30 uppercase tracking-[0.4em] text-[10px] font-bold mt-2">
          Past & Present Reservations
        </p>
      </div>

      <div className="space-y-6">

        {bookingsData.length > 0 ? (

          bookingsData.map((booking) => (

            <div 
              key={booking.id} 
              className="glass-panel p-8 rounded-[2.5rem] border-white/5 flex flex-wrap justify-between items-center group hover:border-white/10 transition-all"
            >

              <div className="flex gap-8 items-center">

                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center font-display text-[#D4AF37]">
                  {booking.artist?.charAt(0)}
                </div>

                <div>
                  <h4 className="text-xl font-display text-white">
                    {booking.artist}
                  </h4>

                  <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">
                    {booking.eventType || booking.type} • {booking.date}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-12 mt-4 md:mt-0">

                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-widest text-white/20 font-bold mb-1">
                    Amount Paid
                  </p>

                  <p className="text-white font-mono">
                    Rs. {booking.price || "N/A"}
                  </p>
                </div>

                <div className={`px-4 py-2 rounded-full text-[9px] uppercase font-bold tracking-widest border ${
                  booking.status === 'Confirmed' 
                    ? 'border-green-500/30 text-green-500' 
                    : booking.status === 'Pending' 
                    ? 'border-[#D4AF37]/30 text-[#D4AF37]' 
                    : 'border-white/10 text-white/30'
                }`}>
                  {booking.status || "Pending"}
                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="text-center text-white/30 py-20 text-sm">
            No bookings yet
          </div>

        )}

      </div>

    </div>
  );
};

export default BookingHistory;