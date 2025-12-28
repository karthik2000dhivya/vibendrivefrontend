import React, { useState } from 'react';
import Navbar from '../components/Navbar'; // We'll create this below
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios



const Home = () => {
  const navigate = useNavigate();

  // const handleNavigate = () => {
  //   navigate('/login')
  // };

  const [formData, setFormData] = useState({
    location: '',
    pickupDate: '',
    returnDate: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload

    // 3. Validation Logic
    if (!formData.location || !formData.pickupDate || !formData.returnDate) {
      alert("Please fill in all fields (Location, Pickup Date, and Return Date)");
      return;
    }

    // 4. If valid, navigate to login
    navigate('/login');
  };

  // --- State for "Why Choose Us" Form ---
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // To show "Sending..." or "Success!"

  const handleContactChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!contactData.name || !contactData.email || !contactData.message) {
      alert("Please fill out the contact form.");
      return;
    }

    setStatus('sending');

    try {
      // Replace URL with your actual API endpoint
      const response = await axios.post('#', contactData);
      
      if (response.status === 200) {
        setStatus('success');
        setContactData({ name: '', email: '', message: '' }); // Clear form
        alert("Message sent successfully!");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus('error');
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="font-sans text-gray-900">
      {/* <Navbar /> */}

      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920"
            className="w-full h-full object-cover"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 uppercase tracking-tight">
            Your Journey, Your Vibe
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Explore the world with comfort and freedom.
          </p>
          <button onClick={() => navigate('/login')} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-bold transition-all">
            Book Now
          </button>
        </div>

        {/* --- FLOATING SEARCH BOX --- */}
       <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4">
          <form 
            onSubmit={handleSearch} 
            className="bg-white rounded-lg shadow-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end border border-gray-100"
          >
            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-500 mb-1 uppercase">Pickup Location</label>
              <input 
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                type="text" 
                placeholder="Enter City" 
                className="border p-2 rounded focus:outline-red-500 text-sm" 
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-500 mb-1 uppercase">Pickup Date</label>
              <input 
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleInputChange}
                type="date" 
                className="border p-2 rounded focus:outline-red-500 text-sm" 
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-500 mb-1 uppercase">Return Date</label>
              <input 
                name="returnDate"
                value={formData.returnDate}
                onChange={handleInputChange}
                type="date" 
                className="border p-2 rounded focus:outline-red-500 text-sm" 
              />
            </div>
            <button type="submit" className="bg-red-600 text-white h-[42px] rounded font-bold hover:bg-red-700 transition-colors">
              Find My Drive
            </button>
          </form>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard icon="🚗" title="Car Rentals" desc="Trusted & Reliable fleet for every journey." />
          <ServiceCard icon="📍" title="Guided Tours" desc="Quality vehicles and expert local guides." />
          <ServiceCard icon="🕒" title="24/7 Support" desc="Easy & Fast booking whenever you need." />
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 border-l-4 border-red-600 pl-3 uppercase">Why Choose Us</h2>
          
          <form className="space-y-4" onSubmit={handleContactSubmit}>
            <input 
              type="text" 
              name="name"
              value={contactData.name}
              onChange={handleContactChange}
              placeholder="Name" 
              className="w-full border p-3 rounded focus:outline-red-500" 
            />
            <input 
              type="email" 
              name="email"
              value={contactData.email}
              onChange={handleContactChange}
              placeholder="Email" 
              className="w-full border p-3 rounded focus:outline-red-500" 
            />
            <textarea 
              name="message"
              value={contactData.message}
              onChange={handleContactChange}
              placeholder="Message" 
              className="w-full border p-3 rounded h-32 focus:outline-red-500"
            ></textarea>
            
            <button 
              type="submit"
              disabled={status === 'sending'}
              className="bg-red-600 text-white px-6 py-3 rounded font-bold w-full md:w-auto hover:bg-red-700 disabled:bg-gray-400"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

          {/* Right: Fleet Preview */}
          <div>
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-red-600 pl-3 uppercase">Our Fleet</h2>
            <div className="grid grid-cols-2 gap-4">
              <FleetItem name="Sedan" img="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=400" />
              <FleetItem name="Electric" img="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=400" />
              <FleetItem name="Luxury" img="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=400" />
              <FleetItem name="SUV" img="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=400" />
            </div>
            <button className="mt-8 bg-black text-white px-6 py-2 rounded font-bold hover:bg-gray-800">
              View All Fleet
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// --- SUB-COMPONENTS (Can be moved to separate files later) ---

const ServiceCard = ({ icon, title, desc }) => (
  <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const FleetItem = ({ name, img }) => (
  <div className="bg-white p-2 rounded border border-gray-100">
    <img src={img} className="w-full h-24 object-cover rounded" alt={name} />
    <p className="text-center mt-2 font-bold text-sm uppercase">{name}</p>
  </div>
);

export default Home;