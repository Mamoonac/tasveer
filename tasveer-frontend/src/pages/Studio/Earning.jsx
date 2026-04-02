import React, { useMemo, useState } from 'react';

const Earning = ({ bookingsData = [] }) => {

  const [withdrawn, setWithdrawn] = useState(false);

  // ✅ CONFIRMED BOOKINGS
  const confirmed = useMemo(() => {
    return bookingsData.filter(b => b.status === "Confirmed");
  }, [bookingsData]);

  // ✅ TOTAL BALANCE
  const balance = useMemo(() => {
    return confirmed.reduce((sum, b) => {
      return sum + parseInt(b.price || 0);
    }, 0);
  }, [confirmed]);

  // ✅ MONTHLY DATA (REAL)
  const monthlyData = useMemo(() => {

    const months = Array(12).fill(0);

    confirmed.forEach((b) => {
      if (!b.date) return;

      const month = new Date(b.date).getMonth(); // 0–11
      months[month] += parseInt(b.price || 0);
    });

    return months;

  }, [confirmed]);

  // ✅ WITHDRAW
  const handleWithdraw = () => {

    if (balance === 0) {
      alert("No funds available");
      return;
    }

    setWithdrawn(true);
    alert(`Withdrawn Rs. ${balance}`);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">

      <h1 className="text-4xl md:text-5xl font-display text-[#D4AF37] mb-12">
        Earnings
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

        {/* BALANCE */}
        <div className="glass-panel p-8 md:p-10 rounded-[3rem] border-[#D4AF37]/20">

          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">
            Current Balance
          </p>

          <h2 className="text-4xl md:text-5xl font-display text-white">
            Rs. {withdrawn ? 0 : balance.toLocaleString()}
          </h2>

          <button 
            onClick={handleWithdraw}
            className="tasveer-btn-primary mt-8 px-10 py-4"
          >
            Withdraw Funds
          </button>

        </div>
        
        {/* GRAPH */}
        <div className="glass-panel p-8 md:p-10 rounded-[3rem] border-white/5 bg-white/[0.02]">

          <h3 className="text-lg font-display mb-6">
            Monthly Growth
          </h3>

          <div className="h-32 flex items-end gap-2">

            {monthlyData.map((value, i) => (

              <div 
                key={i}
                style={{ height: `${value / 1000}%` }} // scaled
                className="flex-1 bg-[#D4AF37]/20 border-t-2 border-[#D4AF37] rounded-t-lg"
              />

            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Earning;