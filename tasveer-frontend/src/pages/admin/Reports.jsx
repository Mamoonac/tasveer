import React, { useState } from 'react';

const Reports = ({ reportsData = [], photographers = [], bookings = [] }) => {

  const [selectedDate, setSelectedDate] = useState("");

  // ✅ FALLBACK (temporary if no data passed)
  const reports = reportsData.length > 0 ? reportsData : [
    {
      title: "Platform Summary",
      icon: "📊",
      date: new Date().toLocaleDateString(),
      size: `${photographers.length + bookings.length} entries`
    }
  ];

  // ✅ EXPORT FUNCTION (dynamic)
  const handleExport = (report) => {

    const content = `
Report: ${report.title}

Total Photographers: ${photographers.length}
Total Bookings: ${bookings.length}

Generated on: ${new Date().toLocaleString()}
`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.title}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  // ✅ GENERATE CUSTOM REPORT
  const handleGenerate = () => {

    if (!selectedDate) {
      alert("Please select a date");
      return;
    }

    const filteredBookings = bookings.filter(b => b.date === selectedDate);

    const content = `
Custom Report
Date: ${selectedDate}

Bookings on this date: ${filteredBookings.length}
Total Photographers: ${photographers.length}

Generated Successfully
`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Custom_Report_${selectedDate}.txt`;
    link.click();

    URL.revokeObjectURL(url);

    alert("Report generated!");
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">

      {/* HEADER */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-display text-[#D4AF37] mb-2">
          Analytics & Reports
        </h1>

        <p className="text-white/30 uppercase tracking-[0.4em] text-[10px] font-bold">
          Data-Driven Platform Insights
        </p>
      </header>

      {/* REPORT LIST */}
      <div className="grid gap-6">

        {reports.map((report, i) => (

          <div 
            key={i} 
            className="glass-panel p-6 md:p-8 rounded-[2.5rem] border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group hover:border-[#D4AF37]/20 transition-all"
          >

            <div className="flex items-center gap-6">

              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37] transition-all">
                {report.icon}
              </div>

              <div>
                <h4 className="text-white font-display text-lg">
                  {report.title}
                </h4>

                <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">
                  Generated: {report.date} • {report.size}
                </p>
              </div>

            </div>

            {/* EXPORT BUTTON */}
            <button 
              onClick={() => handleExport(report)}
              className="tasveer-btn-primary px-8 py-3 text-[10px] w-full md:w-auto"
            >
              Export Report
            </button>

          </div>

        ))}

      </div>

      {/* CUSTOM REPORT */}
      <div className="mt-12 glass-panel p-8 md:p-10 rounded-[3rem] border-[#D4AF37]/10 bg-gradient-to-br from-[#D4AF37]/5 to-transparent">

        <h3 className="text-[#D4AF37] font-display text-xl mb-4">
          Request Custom Report
        </h3>

        <p className="text-white/40 text-sm mb-8">
          Generate reports based on real platform data.
        </p>

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none flex-1"
          />

          <button 
            onClick={handleGenerate}
            className="tasveer-btn-primary px-10"
          >
            Generate
          </button>

        </div>

      </div>

    </div>
  );
};

export default Reports;