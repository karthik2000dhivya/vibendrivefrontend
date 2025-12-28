import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import apiClient from '../api/client';

const Settings = () => {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    profilePic: user?.profilePic || ''
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call to your backend team's update endpoint
      const response = await apiClient.put('/user/update', formData);
      
      // Update global context so Navbar and other pages see changes
      login(response.data.user, localStorage.getItem('token'));
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed", err);
      // Mock update for demo if API isn't ready
      login(formData, localStorage.getItem('token'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* <Navbar /> */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gray-900 h-32 relative">
             <div className="absolute -bottom-12 left-8">
                <div className="relative group">
                  <img 
                    src={formData.profilePic || 'https://via.placeholder.com/150'} 
                    className="w-32 h-32 rounded-3xl border-4 border-white object-cover bg-gray-200"
                    alt="Profile"
                  />
                  <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                    <span className="text-white text-xs font-bold uppercase">Change</span>
                    <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                  </label>
                </div>
             </div>
          </div>

          <div className="pt-20 p-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Account Settings</h2>
            <p className="text-gray-400 text-sm mb-8">Update your personal details and how others see you.</p>

            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-red-600 outline-none font-bold"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  disabled
                  className="p-4 bg-gray-100 text-gray-400 rounded-xl border-none outline-none font-bold cursor-not-allowed"
                />
              </div>
              
              <div className="md:col-span-2 pt-6">
                <button 
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 text-white font-black py-4 px-12 rounded-2xl uppercase tracking-widest text-xs transition-all shadow-lg shadow-red-100 active:scale-95"
                >
                  {loading ? 'Saving Changes...' : 'Save Settings'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;