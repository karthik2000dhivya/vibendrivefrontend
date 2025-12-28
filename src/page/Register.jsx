import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    console.log(formData.password);
    console.log(formData.confirmPassword);
    
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Endpoint for your backend team
       console.log(formData);
      
      const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);
      console.log('Registration Successful', response.data);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}

      {/* Main Content with Background */}
      <main className="flex-grow relative flex items-center justify-center py-12 px-4">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920" 
            className="w-full h-full object-cover" 
            alt="Car Interior Background" 
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>

        {/* Dual-Column Card */}
        <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Left Column: Register Form */}
          <div className="w-full md:w-[60%] p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 uppercase mb-8">Create Your Account</h2>
            
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">👤</span>
                <input
                  type="text"
                  name="username"
                  placeholder="Name"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">📧</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">📞</span>
                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  onChange={handleChange}
                  required
                />
              </div>

               <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">🔒</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">🔒</span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  onChange={handleChange}
                  required
                />
              </div>

              <button 
                type="submit"
                className="bg-[#D32F2F] hover:bg-red-700 text-white font-bold py-3 px-8 rounded shadow-md mt-4 transition-all uppercase tracking-wide"
              >
                Register
              </button>
            </form>
          </div>

          {/* Right Column: Redirect to Login */}
          <div className="w-full md:w-[40%] bg-gray-50 p-8 md:p-12 flex flex-col justify-center items-center text-center border-l border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-2 uppercase">Already Have Account?</h3>
            <p className="text-sm text-gray-500 mb-6 italic">Found your account?</p>
            <button 
              onClick={() => navigate('/login')}
              className="bg-[#D32F2F] hover:bg-red-700 text-white font-bold py-2 px-8 rounded transition-all uppercase text-sm"
            >
              Login Here
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;