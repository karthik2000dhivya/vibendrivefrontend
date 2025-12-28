import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white py-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Column 1: Logo & Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
             <div className="bg-red-600 p-1 rounded">
                <span className="text-white font-bold text-xl">VD</span>
             </div>
             <div className="flex flex-col leading-tight">
                <span className="text-xl font-black tracking-tighter">VIBE-N-DRIVE</span>
                <span className="text-[10px] text-gray-400">TRAVELS & RENTAL PRIVATE LIMITED</span>
             </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            © 2024 Vibe N Drive. <br /> All car registered.
          </p>
        </div>

        {/* Column 2: Contact/Car Types */}
        <div>
          <h4 className="font-bold text-lg mb-6 border-b border-gray-700 pb-2 inline-block">CONTACT CAR TYPES</h4>
          <ul className="text-gray-400 text-sm space-y-3">
            <li className="hover:text-red-500 cursor-pointer transition-colors">Company</li>
            <li className="hover:text-red-500 cursor-pointer transition-colors">About</li>
            <li className="hover:text-red-500 cursor-pointer transition-colors">Our Fleets</li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h4 className="font-bold text-lg mb-6 border-b border-gray-700 pb-2 inline-block">SUPPORT</h4>
          <ul className="text-gray-400 text-sm space-y-3">
            <li className="hover:text-red-500 cursor-pointer transition-colors">FAQ</li>
            <li className="hover:text-red-500 cursor-pointer transition-colors">Contact</li>
            <li className="hover:text-red-500 cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-4">
          <h4 className="font-bold text-lg mb-2">Subscribe to our newsletter</h4>
          <div className="flex flex-col space-y-3">
            <div className="flex overflow-hidden rounded">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white text-black p-3 text-sm w-full outline-none"
              />
              <button className="bg-red-600 hover:bg-red-700 px-4 py-3 text-sm font-bold transition-colors">
                Subscribe
              </button>
            </div>
            
            {/* Social Icons (Placeholders) */}
            <div className="flex gap-4 pt-4">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-red-600 cursor-pointer transition-all">
                <span className="text-xs">f</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-red-600 cursor-pointer transition-all">
                <span className="text-xs">in</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-red-600 cursor-pointer transition-all">
                <span className="text-xs">ig</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-red-600 cursor-pointer transition-all">
                <span className="text-xs">𝕏</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;