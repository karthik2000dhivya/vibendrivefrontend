import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Get data passed from Checkout page
  const { car, bookingId, totalPaid } = location.state || {};

  // Handle window resizing for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Redirect if accessed without booking data
  useEffect(() => {
    if (!car) {
      const timer = setTimeout(() => navigate('/booking'), 3000);
      return () => clearTimeout(timer);
    }
  }, [car, navigate]);

  if (!car) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-500 font-bold">No booking data found. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* <Navbar /> */}
      
      {/* Celebration Layer */}
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={300}
        colors={['#dc2626', '#000000', '#f87171', '#ffffff']}
      />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full">
          
          {/* --- SUCCESS HEADER --- */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <span className="text-4xl">✅</span>
            </div>
            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">
              Booking Confirmed!
            </h1>
            <p className="text-gray-500 mt-2">
              Your ride is reserved. A confirmation email has been sent to your inbox.
            </p>
          </div>

          {/* --- MAIN RECEIPT CARD --- */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Red accent bar */}
            <div className="h-2 bg-red-600 w-full"></div>
            
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b pb-8">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-2">
                    <img src={car.image} alt={car.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">{car.name}</h2>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{car.transmission} • {car.fuelType}</p>
                    <div className="mt-2 inline-block bg-red-50 text-red-600 text-[10px] font-black px-2 py-1 rounded">
                      ID: {bookingId || 'VND-78921'}
                    </div>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase">Status</p>
                  <span className="text-green-600 font-bold uppercase text-sm italic">Payment Successful</span>
                </div>
              </div>

              {/* DETAILS GRID */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Pickup Date</p>
                  <p className="font-bold text-gray-800">Aug 15, 2024</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Return Date</p>
                  <p className="font-bold text-gray-800">Aug 18, 2024</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Rental Period</p>
                  <p className="font-bold text-gray-800">3 Days</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Payment Mode</p>
                  <p className="font-bold text-gray-800">Credit Card</p>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Total Paid</p>
                  <p className="text-2xl font-black text-red-600">₹{totalPaid || '10,950'}</p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => navigate('/booking')}
                  className="flex-1 bg-black text-white font-black py-4 rounded-2xl hover:bg-gray-800 transition-all uppercase tracking-widest text-xs"
                >
                  Book Another Ride
                </button>
                <button 
                  className="flex-1 border-2 border-gray-100 font-black py-4 rounded-2xl hover:bg-gray-50 transition-all uppercase tracking-widest text-xs"
                >
                  Download Invoice
                </button>
              </div>
            </div>

            {/* Support footer */}
            <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
              <p className="text-xs text-gray-400 font-medium">
                Questions? Call our 24/7 helpline at <span className="text-red-600 font-bold">+91 98765 43210</span>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingSuccess;