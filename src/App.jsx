import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css' // Make sure this file is empty or valid CSS
import React, { useState } from 'react';
import Home from './page/home';
import Login from './page/Loginpage';
import Register from './page/Register';
import BookingList from './page/BookingList';
import Checkout from './page/Checkout';
import BookingSuccess from './page/BookingSucess';
import MyBookings from './page/Mybooking';
import ReviewModal from './page/Reviewmodal';
import Settings from './page/Setting';
import ScrollToTop from './components/ScrollTop';
import Navbar from './components/Navbar';





function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="app-container">
        {/* Navbar component would go here */}
        <ScrollToTop />
        <Routes>

          <Route path="/" element={<Home></Home>} />
          <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/list" element={<BookingList />} /> */}
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/bookingconfirm" element={<BookingSuccess />} />
          <Route path="/mybooking" element={<MyBookings />} />
          <Route path="/rev" element={<ReviewModal />} />
          <Route path="/setting" element={<Settings />} />

          {/* Protected Booking Route */}
          <Route
            path="/list"
            element={
              <ProtectedRoute>
                <BookingList />
              </ProtectedRoute>
            }
          />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/mybooking" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
          <Route path="/setting" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

          {/* Extra logic: success pages and reviews usually follow a booking */}
          <Route path="/bookingconfirm" element={<ProtectedRoute><BookingSuccess /></ProtectedRoute>} />
          <Route path="/rev" element={<ProtectedRoute><ReviewModal /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;