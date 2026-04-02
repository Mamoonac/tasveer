import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({
  showNavbar = true,
  showFooter = true,
  navLinks,
  footerData,
  user
}) => {

  return (
    <div className="flex flex-col min-h-screen bg-tasveer-maroon-bg">

      {/* NAVBAR */}
      {showNavbar && (
        <Navbar 
          navLinks={navLinks}
          user={user}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-grow pt-6 pb-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* FOOTER */}
      {showFooter && (
        <Footer 
          linksData={footerData?.links}
          socialLinks={footerData?.socials}
          contactEmail={footerData?.email}
        />
      )}

    </div>
  );
};

export default MainLayout;