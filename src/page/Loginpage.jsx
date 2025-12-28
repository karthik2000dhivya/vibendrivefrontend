// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const Login = () => {
//   // const [username, setUsername] = useState('emilys'); // Pre-filled for testing
//   // const [password, setPassword] = useState('emilyspass');
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   //backend
//   // const handleLogin = async (e) => {
//   //   e.preventDefault();
//   //   setError('');
//   //   try {
//   //     // Connecting to your backend team's API
//   //     const response = await axios.post('https://api.viben-drive.com/login', credentials);
//   //     localStorage.setItem('token', response.data.token);
//   //     navigate('/booking'); 
//   //   } catch (err) {
//   //     setError('Invalid username or password. Please try again.');
//   //   }
//   // };

//   //dummhy
//   // const handleLogin = async (e) => {
//   //   e.preventDefault();
//   //   setError('');

//   //   try {
//   //     const response = await fetch('https://dummyjson.com/auth/login', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify({
//   //         username: 'emilys',
//   //         password: 'emilyspass',
//   //         expiresInMins: 30,
//   //       }),
//   //     });

//   //     const data = await response.json();

//   //     if (response.ok) {
//   //       console.log('Login Success:', data);
//   //        navigate('/list')
//   //       // setUser(data); // data contains token, firstName, lastName, etc.
//   //       // // Usually, you would save data.token to localStorage here
//   //       // navigate('/booking')
//   //     } else {
//   //       setError(data.message || 'Invalid credentials');
//   //     }
//   //   } catch (err) {
//   //     setError('An error occurred. Please try again.');
//   //   }
//   // };

//   const handleLogin = async (e) => {
//   e.preventDefault();
//   setError('');

//   try {
//     const response = await fetch('http://127.0.0.1:8000/api/login/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         username: credentials.username,
//         password: credentials.password,
//       }),
//     });

//     const data = await response.json();

//     // if (response.ok) {
//     //   // Check for both 'token' and 'accessToken' just in case
//     //   const authToken = data.accessToken || data.token;

//     //   if (authToken) {
//     //     localStorage.setItem('token', authToken); 
//     //     navigate('/list');
//     //   } else {
//     //     console.error("Token missing in response:", data);
//     //     setError("Login successful, but no token received.");
//     //   }
//     // } else {
//     //   setError(data.message || 'Invalid credentials');
//     // }
//   //   if (response.ok) {
//   // const authToken = data.access;   // ✅ SimpleJWT key

//   // if (authToken) {
//   //   localStorage.setItem("access", authToken);
//   //   localStorage.setItem("refresh", data.refresh); // optional but recommended
//   //   navigate("/list");
//   // }
  
//   if (response.ok) {
//   const authToken = data.access;

//   if (authToken) {
//     localStorage.setItem("access", authToken);
//     localStorage.setItem("refresh", data.refresh);
//     navigate("/list");
//   }
// else {
//     console.error("Token missing in response:", data);
//     setError("Login successful, but no token received.");
//   }
// } else {
//   setError(data.detail || data.message || "Invalid credentials");
// }

//   } catch (err) {
//     setError('An error occurred.');
//   }
// };
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* <Navbar /> */}
      
//       {/* Background Section */}
//       <main className="flex-grow relative flex items-center justify-center py-20">
//         <div className="absolute inset-0 z-0">
//           <img 
//             src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920" 
//             className="w-full h-full object-cover" 
//             alt="Login Background" 
//           />
//           <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
//         </div>

//         {/* Login Card */}
//         <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col md:flex-row bg-white/95 rounded-xl shadow-2xl overflow-hidden">
          
//           {/* Left Side: Login Form */}
//           <div className="w-full md:w-1/2 p-8 md:p-12">
//             <h2 className="text-2xl font-bold text-gray-800 uppercase mb-8">Log in to your account</h2>
            
//             {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//             <form onSubmit={handleLogin} className="space-y-6">
//               <div className="relative">
//                 <span className="absolute left-3 top-3 text-gray-400">👤</span>
//                 <input
//                   type="text"
//                   name="username"
//                   placeholder="Username"
//                   className="w-full pl-10 pr-4 py-3 border-b-2 border-gray-200 focus:border-red-600 outline-none transition-colors"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="relative">
//                 <span className="absolute left-3 top-3 text-gray-400">🔒</span>
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   className="w-full pl-10 pr-4 py-3 border-b-2 border-gray-200 focus:border-red-600 outline-none transition-colors"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="flex justify-between items-center text-sm">
//                 <a href="#" className="text-gray-500 hover:text-red-600">Forgot password?</a>
//               </div>

//               <button 
//                 type="submit"
//                 className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded shadow-lg transition-transform active:scale-95"
//               >
//                 Login
//               </button>
//             </form>
//           </div>

//           {/* Right Side: Register Prompt */}
//           <div className="w-full md:w-1/2 bg-gray-100 p-8 md:p-12 flex flex-col justify-center border-l border-gray-200">
//             <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase">New Here?</h3>
//             <p className="text-gray-600 mb-8 leading-relaxed">
//               Join Vibe N Drive today for exclusive travel experiences and premium rentals.
//             </p>
//             <button 
//               onClick={() => navigate('/register')}
//               className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold py-3 px-8 rounded transition-all uppercase text-sm tracking-wide"
//             >
//               Create Account
//             </button>
//           </div>

//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/login/',
        credentials,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        const { access, refresh } = response.data;

        if (access) {
          localStorage.setItem('access', access);
          localStorage.setItem('refresh', refresh);

          // Update parent state
          if (onLogin) onLogin();

          // Redirect to protected page
          navigate('/list');
        } else {
          setError('Login successful, but no token received.');
          console.error('Token missing in response:', response.data);
        }
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.detail || err.response.data.message || 'Invalid credentials');
      } else {
        setError('An error occurred. Please try again.');
        console.error(err);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar/> */}
      <main className="flex-grow relative flex items-center justify-center py-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920"
            className="w-full h-full object-cover"
            alt="Login Background"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col md:flex-row bg-white/95 rounded-xl shadow-2xl overflow-hidden">
          {/* Login Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 uppercase mb-8">Log in to your account</h2>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">👤</span>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full pl-10 pr-4 py-3 border-b-2 border-gray-200 focus:border-red-600 outline-none transition-colors"
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
                  className="w-full pl-10 pr-4 py-3 border-b-2 border-gray-200 focus:border-red-600 outline-none transition-colors"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <a href="#" className="text-gray-500 hover:text-red-600">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded shadow-lg transition-transform active:scale-95"
              >
                Login
              </button>
            </form>
          </div>

          {/* Register Prompt */}
          <div className="w-full md:w-1/2 bg-gray-100 p-8 md:p-12 flex flex-col justify-center border-l border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase">New Here?</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Join Vibe N Drive today for exclusive travel experiences and premium rentals.
            </p>
            <button
              onClick={() => navigate('/register')}
              className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold py-3 px-8 rounded transition-all uppercase text-sm tracking-wide"
            >
              Create Account
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
