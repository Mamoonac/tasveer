import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StudioLayout from './layouts/StudioLayout';

// Public Pages
import Home from './pages/public/Home';
import Photographers from './pages/public/Photographers';
import PhotographerProfile from './pages/public/PhotographerProfile';
import Login from './pages/public/Login';
import Signup from './pages/public/Signup';
import Feedback from './pages/public/Feedback';

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard';
import BookingHistory from './pages/client/BookingHistory';
import Messages from './pages/client/Messages';

// Photographer Pages
import PhotographerDashboard from './pages/studio/PhotographerDashboard';
import BookingRequests from './pages/studio/BookingRequests';
import Earning from './pages/studio/Earning';
import PortfolioUpload from './pages/studio/PortfolioUpload';
import PhotographerSetup from './pages/studio/PhotographerSetup';
import AddPackages from './pages/studio/AddPackages';
import Studios from "./pages/public/Studios";
import StudioProfile from "./pages/public/StudioProfile";

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import Reports from './pages/admin/Reports';

const App = () => {

  // ================= GLOBAL STATE =================

  const [users, setUsers] = useState([
    { id: 1, name: "Admin", email: "admin@tasveer.com", role: "Admin" },
    { id: 2, name: "Client User", email: "client@tasveer.com", role: "Client" }
  ]);

  const [currentUser, setCurrentUser] = useState(null);

  const [photographers, setPhotographers] = useState([]);

  const [bookings, setBookings] = useState([]);

  const [conversations, setConversations] = useState([
    {
      name: "Support",
      time: "now",
      messages: [
        { text: "Welcome to Tasveer!", sender: "other" }
      ]
    }
  ]);

  // ================= HANDLERS =================

  const handleSignup = (newUser) => {
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleSetupProfile = (profile) => {
    setPhotographers(prev => [...prev, profile]);
  };

  const handleBooking = (booking) => {
    const newBooking = {
      id: Date.now(),
      ...booking,
      status: "Pending"
    };

    setBookings(prev => [...prev, newBooking]);
  };

  const updateBookingStatus = (id, status) => {
    setBookings(prev =>
      prev.map(b => b.id === id ? { ...b, status } : b)
    );
  };

  const updatePortfolio = (updatedPortfolio) => {

    if (!currentUser) return;

    setPhotographers(prev =>
      prev.map(p =>
        p.id === currentUser.id
          ? { ...p, portfolio: updatedPortfolio }
          : p
      )
    );
  };
  const updatePackages = (updatedPackages) => {

  if (!currentUser) return;

  setPhotographers(prev =>
    prev.map(p =>
      p.id === currentUser.id
        ? { ...p, packages: updatedPackages }
        : p
    )
  );
};

  // ================= ROUTES =================

  return (
    <Router>

      <div className="flex flex-col min-h-screen">

        <Navbar />

        <main className="flex-grow">

          <Routes>

            {/* PUBLIC */}
            <Route path="/" element={<Home photographersData={photographers} />} />

            <Route path="/photographers" element={
              <Photographers photographersData={photographers} />
            } />

            <Route path="/photographer/:id" element={
              <PhotographerProfile 
                photographersData={photographers}
                onBookingConfirm={handleBooking}
              />
            } />

            <Route path="/feedback" element={<Feedback />} />

            <Route path="/login" element={
              <Login usersData={users} onLogin={handleLogin} />
            } />

            <Route path="/signup" element={
              <Signup onSignup={handleSignup} />
            } />

            {/* CLIENT */}
            <Route path="/client/dashboard" element={
              <ClientDashboard 
                user={currentUser}
                bookingsData={bookings}
              />
            } />

            <Route path="/account/bookings" element={
              <BookingHistory bookingsData={bookings} />
            } />

            <Route path="/account/messages" element={
              <Messages conversationsData={conversations} />
            } />

            {/* ADMIN */}
            <Route path="/admin/dashboard" element={
              <AdminDashboard photographers={photographers} bookings={bookings} />
            } />

            <Route path="/admin/users" element={<ManageUsers />} />

            <Route path="/admin/reports" element={
              <Reports 
                photographers={photographers}
                bookings={bookings}
              />
            } />

            {/* STUDIO */}
            <Route path="/studio" element={<StudioLayout />}>

              <Route path="dashboard" element={
                <PhotographerDashboard bookingsData={bookings} />
              } />

              <Route path="requests" element={
                <BookingRequests 
                  bookingsData={bookings}
                  onUpdateBooking={updateBookingStatus}
                />
              } />

              <Route path="earnings" element={
                <Earning bookingsData={bookings} />
              } />

              <Route path="upload" element={
                <PortfolioUpload 
                  portfolio={
                    photographers.find(p => p.id === currentUser?.id)?.portfolio || []
                  }
                  onUpdatePortfolio={updatePortfolio}
                />
              } />
              <Route path="packages" element={
              <AddPackages 
                packages={
                 photographers.find(p => p.id === currentUser?.id)?.packages || []
                }
                 onUpdatePackages={updatePackages}
                />
              } />
              <Route 
               path="/studio/:id" 
                 element={<StudioProfile photographersData={photographers} />} 
              />

            </Route>

            {/* SETUP */}
            <Route path="/photographer/setup" element={
              <PhotographerSetup 
                onSetupProfile={handleSetupProfile}
                currentUser={currentUser}
              />
            } />
            <Route path="/studios" element={
             <Studios photographersData={photographers} />
            } />

          </Routes>

        </main>

        <Footer />

      </div>

    </Router>
  );
};

export default App;