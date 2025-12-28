import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in whenever the component loads
  useEffect(() => {
    const token = localStorage.getItem('access');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    setIsLoggedIn(false);
    navigate('/login');
  };

  // Helper for navigation + closing mobile menu
  const navTo = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white py-4 px-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-black text-red-600 flex items-center gap-2 cursor-pointer" onClick={() => navTo('/')}>
          <span className="bg-black text-white px-2 py-1 rounded">VD</span>
          <span className="hidden sm:inline text-black">VIBE-N-DRIVE</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 font-bold text-sm uppercase items-center">
          <button onClick={() => navTo('/')} className="hover:text-red-600 transition-colors">Home</button>
          <button onClick={() => navTo('/services')} className="hover:text-red-600 transition-colors">Services</button>
          <button onClick={() => navTo('/about')} className="hover:text-red-600 transition-colors">About</button>
          
          {isLoggedIn ? (
            <>
              <button onClick={() => navTo('/list')} className="hover:text-red-600 transition-colors">My Bookings</button>
              <button onClick={handleLogout} className="bg-black text-white px-4 py-2 rounded text-xs">Logout</button>

            </>
          ) : (
            <>
              <button onClick={() => navTo('/login')} className="hover:text-red-600 transition-colors">Login</button>
              <button onClick={() => navTo('/register')} className="hover:text-red-600 transition-colors">Register</button>
              <button onClick={() => navTo('/login')} className="bg-red-600 text-white px-4 py-2 rounded text-xs">BOOK NOW</button>

            </>
          )}
          
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl">
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 bg-gray-50 p-4 border-t uppercase text-sm font-bold">
          <button onClick={() => navTo('/')} className="text-left">Home</button>
          {isLoggedIn ? (
            <>
              <button onClick={() => navTo('/list')} className="text-left">My Bookings</button>
              <button onClick={handleLogout} className="text-left text-red-600">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navTo('/login')} className="text-left">Login</button>
              <button onClick={() => navTo('/register')} className="text-left">Register</button>
            </>
          )}
          <button onClick={() => navTo('/list')} className="bg-red-600 text-white px-4 py-2 rounded">BOOK NOW</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;