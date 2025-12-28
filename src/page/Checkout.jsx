import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Data passed from BookingList
  const car = location.state?.selectedCar;
  const details = location.state?.dates;

  // States
  const [showSuccess, setShowSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', cardNumber: '', expiry: '', cvv: ''
  });

  // Calculate Duration and Price
  const calculateDuration = () => {
    if (!details?.pickupDate || !details?.dropDate) return { days: 1, totalHours: 24 };

    const start = new Date(`${details.pickupDate}T${details.pickupTime || '00:00'}`);
    const end = new Date(`${details.dropDate}T${details.dropTime || '00:00'}`);

    const diffInMs = end - start;
    const totalHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const totalDays = Math.ceil(totalHours / 24); 
    
    return {
      days: totalDays > 0 ? totalDays : 1,
      totalHours: totalHours > 0 ? totalHours : 0
    };
  };

  const { days, totalHours } = calculateDuration();
  const subtotal = car ? car.price * days : 0;
  const tax = 450;

  // Promo Logic
  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'VIBE20') {
      setDiscount(subtotal * 0.20);
      setPromoError('');
    } else {
      setDiscount(0);
      setPromoError('Invalid Code');
    }
  };

  const grandTotal = subtotal + tax - discount;

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  if (!car) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-xl font-bold mb-4">No car selected!</h2>
        <button onClick={() => navigate('/list')} className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold">Return to Fleet</button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <form onSubmit={handleConfirmPayment} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: FORMS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Schedule Summary */}
            <div className="bg-white p-6 rounded-3xl border shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
               <div className="text-center md:text-left">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pickup</p>
                  <p className="font-black">{details?.pickupDate} <span className="text-red-600">@</span> {details?.pickupTime}</p>
               </div>
               <div className="h-px w-full md:w-px md:h-10 bg-gray-100"></div>
               <div className="text-center md:text-left">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Drop-off</p>
                  <p className="font-black">{details?.dropDate} <span className="text-red-600">@</span> {details?.dropTime}</p>
               </div>
               <div className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold uppercase">
                  {totalHours} Total Hours
               </div>
            </div>

            {/* Billing Form */}
            <div className="bg-white p-8 rounded-3xl border shadow-sm">
              <h3 className="text-xl font-black mb-6 uppercase tracking-tighter">Billing Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" placeholder="Full Name" className="border p-4 rounded-xl focus:ring-2 focus:ring-red-600 outline-none" />
                <input required type="tel" placeholder="Phone Number" className="border p-4 rounded-xl focus:ring-2 focus:ring-red-600 outline-none" />
                <input required type="email" placeholder="Email Address" className="border p-4 rounded-xl focus:ring-2 focus:ring-red-600 outline-none md:col-span-2" />
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white p-8 rounded-3xl border shadow-sm">
              <h3 className="text-xl font-black mb-6 uppercase tracking-tighter">Payment Details</h3>
              <div className="space-y-4">
                <input required type="text" placeholder="Card Number" className="w-full border p-4 rounded-xl focus:ring-2 focus:ring-red-600 outline-none" />
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="MM/YY" className="border p-4 rounded-xl outline-none" />
                  <input required type="password" placeholder="CVV" className="border p-4 rounded-xl outline-none" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <aside className="lg:col-span-1">
            <div className="bg-slate-900 text-white p-8 rounded-3xl sticky top-24 shadow-2xl">
              <h3 className="text-lg font-black text-red-500 mb-6 uppercase tracking-widest">Summary</h3>
              
              <div className="flex gap-4 mb-8 border-b border-white/10 pb-6">
                <img src={car.image} className="w-20 h-14 object-contain bg-white/5 rounded-lg" alt="" />
                <div>
                  <h4 className="font-black uppercase">{car.name}</h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{car.transmission} • {car.fuelType}</p>
                </div>
              </div>

              {/* Promo Section */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input 
                    type="text" placeholder="VIBE20" value={promoCode}
                    onChange={(e)=>setPromoCode(e.target.value)}
                    className="bg-white/5 border border-white/10 p-3 rounded-xl text-sm w-full outline-none focus:border-red-500" 
                  />
                  <button type="button" onClick={applyPromo} className="bg-white text-black px-4 rounded-xl font-black text-xs uppercase hover:bg-red-600 hover:text-white transition-all">Apply</button>
                </div>
                {promoError && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase">{promoError}</p>}
              </div>

              {/* Price Table */}
              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between text-gray-400">
                  <span>Rental ({days} Days)</span>
                  <span className="text-white">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount (20%)</span>
                    <span>- ₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-400">
                  <span>Fees & Taxes</span>
                  <span className="text-white">₹{tax}</span>
                </div>
                <div className="flex justify-between text-3xl font-black pt-6 border-t border-white/10 mt-6">
                  <span>TOTAL</span>
                  <span className="text-red-600">₹{grandTotal}</span>
                </div>
              </div>

              <button type="submit" className="w-full bg-red-600 py-5 rounded-2xl mt-10 font-black uppercase hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95">
                Confirm & Pay
              </button>
            </div>
          </aside>
        </form>
      </main>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-white rounded-[40px] p-10 max-w-sm w-full text-center shadow-2xl scale-in-center">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Ride Secured!</h2>
            <p className="text-gray-500 text-sm mb-10 font-medium">Your {car.name} is booked for {days} days. Get ready to vibe.</p>
            <div className="space-y-3">
              <button onClick={() => navigate('/mybooking')} className="w-full bg-black text-white font-black py-4 rounded-2xl uppercase text-xs tracking-widest">My Bookings</button>
              <button onClick={() => navigate('/')} className="w-full bg-gray-100 text-gray-500 font-black py-4 rounded-2xl uppercase text-xs tracking-widest">Home</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Checkout;