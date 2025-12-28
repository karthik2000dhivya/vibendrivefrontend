import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { mockVehicles } from '../data/vehicle';

const BookingList = () => {
  const navigate = useNavigate();
  const [vehicles] = useState(mockVehicles);
  const [filteredVehicles, setFilteredVehicles] = useState(mockVehicles);
  
  const [searchDetails, setSearchDetails] = useState({
    pickupDate: '',
    pickupTime: '10:00',
    dropDate: '',
    dropTime: '18:00'
  });

  const [filters, setFilters] = useState({ fuelType: [], maxPrice: 6000 });

  const handleSearchChange = (e) => {
    setSearchDetails({ ...searchDetails, [e.target.name]: e.target.value });
  };

  const handleSearchFleet = () => {
    const { pickupDate, pickupTime, dropDate, dropTime } = searchDetails;
    
    if (!pickupDate || !dropDate) {
      alert("Please select both Pickup and Drop-off dates.");
      return;
    }

    // Convert user choice to Timestamp
    const userStart = new Date(`${pickupDate}T${pickupTime}`).getTime();
    const userEnd = new Date(`${dropDate}T${dropTime}`).getTime();

    // Validations
    if (isNaN(userStart) || isNaN(userEnd)) {
        alert("Invalid Date or Time format.");
        return;
    }

    const diffHours = (userEnd - userStart) / (1000 * 60 * 60);
    if (userEnd <= userStart) return alert("Drop-off must be after Pickup!");
    if (diffHours < 4) return alert("Minimum booking is 4 hours!");

    // Main Filtering Logic
    const available = vehicles.filter(car => {
      // 1. Fuel Filter
      const fuelMatch = filters.fuelType.length === 0 || filters.fuelType.includes(car.fuelType);
      
      // 2. Price Filter
      const priceMatch = Number(car.price) <= Number(filters.maxPrice);

      // 3. Availability/Overlap Logic
      const hasConflict = car.bookedSlots?.some(slot => {
        const slotStart = new Date(slot.from).getTime();
        const slotEnd = new Date(slot.to).getTime();
        
        // Conflict if: User Trip starts before a slot ends AND User Trip ends after a slot starts
        return (userStart < slotEnd && userEnd > slotStart);
      });

      return fuelMatch && priceMatch && !hasConflict;
    });

    setFilteredVehicles(available);
    
    // Smooth scroll to the results grid
    setTimeout(() => {
      document.getElementById('results-grid')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* <Navbar /> */}

      {/* HERO SEARCH SECTION */}
      <div className="bg-slate-900 py-12 px-4">
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-[2rem] shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
            
            <div className="lg:col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Pickup Date & Time</label>
              <div className="flex gap-2">
                <input type="date" name="pickupDate" onChange={handleSearchChange} className="border-2 border-gray-50 p-3 rounded-xl w-full text-sm font-bold outline-red-600" />
                <input type="time" name="pickupTime" value={searchDetails.pickupTime} onChange={handleSearchChange} className="border-2 border-gray-50 p-3 rounded-xl w-32 text-sm font-bold outline-red-600" />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Drop-off Date & Time</label>
              <div className="flex gap-2">
                <input type="date" name="dropDate" onChange={handleSearchChange} className="border-2 border-gray-50 p-3 rounded-xl w-full text-sm font-bold outline-red-600" />
                <input type="time" name="dropTime" value={searchDetails.dropTime} onChange={handleSearchChange} className="border-2 border-gray-50 p-3 rounded-xl w-32 text-sm font-bold outline-red-600" />
              </div>
            </div>

            <button 
              onClick={handleSearchFleet}
              className="bg-red-600 text-white font-black h-[54px] rounded-xl hover:bg-black transition-all uppercase text-xs tracking-widest shadow-xl shadow-red-600/20 active:scale-95"
            >
              Search Fleet
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR FILTERS */}
        <aside className="w-full md:w-64">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-24">
            <h3 className="font-black text-sm mb-6 border-b pb-2 uppercase tracking-widest">Filters</h3>
            <div className="space-y-8">
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 mb-4 uppercase">Fuel Type</h4>
                {['Petrol', 'Diesel', 'Electric'].map(f => (
                  <label key={f} className="flex items-center gap-3 mb-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      onChange={() => {
                        const types = filters.fuelType.includes(f) ? filters.fuelType.filter(x => x !== f) : [...filters.fuelType, f];
                        setFilters({...filters, fuelType: types});
                      }} 
                      className="accent-red-600 w-4 h-4" 
                    />
                    <span className="text-sm font-bold text-gray-600 group-hover:text-black">{f}</span>
                  </label>
                ))}
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 mb-2 uppercase">Max Price: ₹{filters.maxPrice}</h4>
                <input 
                  type="range" min="1000" max="10000" step="500"
                  value={filters.maxPrice} 
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})} 
                  className="w-full accent-red-600 cursor-pointer" 
                />
              </div>
            </div>
          </div>
        </aside>

        {/* VEHICLE RESULTS */}
        <main id="results-grid" className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map(car => (
                <div key={car.id} className="bg-white p-5 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl transition-all group overflow-hidden">
                  <div className="bg-gray-50 rounded-[2rem] p-4 mb-4 flex items-center justify-center h-44">
                    <img src={car.image} alt={car.name} className="h-32 object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  <h3 className="font-black text-lg uppercase tracking-tight px-2">{car.name}</h3>
                  <div className="flex gap-2 px-2 mt-1 mb-4">
                    <span className="text-[9px] font-bold bg-gray-100 text-gray-400 px-2 py-1 rounded uppercase tracking-widest">{car.fuelType}</span>
                    <span className="text-[9px] font-bold bg-gray-100 text-gray-400 px-2 py-1 rounded uppercase tracking-widest">{car.transmission}</span>
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-50 pt-4 px-2">
                    <div>
                      <span className="text-2xl font-black text-red-600">₹{car.price}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase"> / Day</span>
                    </div>
                    <button 
                      onClick={() => navigate('/checkout', { state: { selectedCar: car, dates: searchDetails } })} 
                      className="bg-black text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase hover:bg-red-600 transition-all active:scale-95"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
                <div className="text-4xl mb-4">🚗💨</div>
                <h3 className="text-gray-800 font-black uppercase text-lg">No Cars Available</h3>
                <p className="text-gray-400 text-sm max-w-xs mx-auto mt-2">The selected vehicle is booked for this time slot. Please try another date or time.</p>
                <button 
                    onClick={() => setFilteredVehicles(vehicles)} 
                    className="mt-6 text-red-600 font-bold uppercase text-xs border-b-2 border-red-600"
                >
                    Show All Vehicles
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default BookingList;