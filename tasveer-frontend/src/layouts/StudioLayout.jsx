import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const StudioLayout = ({
  sidebarLinks,
  sidebarTitle = "STUDIO",
  contentClass = ""
}) => {

  return (
    <div className="flex min-h-screen bg-[#1A0A0A]">

      {/* SIDEBAR */}
      <div className="w-64 fixed inset-y-0 left-0 z-50">
        <Sidebar 
          linksData={sidebarLinks}
          title={sidebarTitle}
        />
      </div>

      {/* MAIN CONTENT */}
      <main className={`flex-1 ml-64 p-8 md:p-12 ${contentClass}`}>

        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>

      </main>

    </div>
  );
};

export default StudioLayout;