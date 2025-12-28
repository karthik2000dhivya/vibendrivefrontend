import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Load bookings from local storage
    const savedBookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
    setBookings(savedBookings);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter">My Bookings</h1>
          <p className="text-gray-500 font-medium">Manage your current and past rides.</p>
        </div>

        {bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-3xl p-6 border shadow-sm flex flex-col md:flex-row items-center gap-8">
                {/* Car Image */}
                <div className="w-full md:w-48 h-32 bg-gray-50 rounded-2xl flex items-center justify-center p-4">
                  <img src={booking.carImage} alt={booking.carName} className="w-full h-full object-contain" />
                </div>

                {/* Info */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Vehicle</p>
                    <h3 className="font-black text-lg uppercase">{booking.carName}</h3>
                    <p className="text-xs text-red-600 font-bold">ID: {booking.id}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Schedule</p>
                    <p className="text-sm font-bold text-gray-700">From: {booking.pickup}</p>
                    <p className="text-sm font-bold text-gray-700">To: {booking.drop}</p>
                  </div>

                  <div className="md:text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Paid</p>
                    <p className="text-2xl font-black text-black">₹{booking.total}</p>
                    <span className="inline-block bg-green-100 text-green-700 text-[10px] font-black px-3 py-1 rounded-full uppercase mt-2">
                      {booking.status}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-8">
                  <button className="flex-1 bg-black text-white text-[10px] font-bold py-3 px-6 rounded-xl uppercase hover:bg-red-600 transition-colors">
                    Help
                  </button>
                  <button 
                    onClick={() => {
                      const updated = bookings.filter(b => b.id !== booking.id);
                      localStorage.setItem('myBookings', JSON.stringify(updated));
                      setBookings(updated);
                    }}
                    className="flex-1 bg-gray-100 text-gray-400 text-[10px] font-bold py-3 px-6 rounded-xl uppercase hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-gray-300">
            <div className="text-5xl mb-4">🚗</div>
            <h2 className="text-xl font-bold text-gray-400 uppercase">No active bookings found</h2>
            <button 
              onClick={() => navigate('/list')}
              className="mt-6 bg-red-600 text-white px-8 py-3 rounded-2xl font-bold uppercase text-xs"
            >
              Start Booking
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyBookings;