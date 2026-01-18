import React, { useState } from 'react';

interface HUDProps {
  onEnter: () => void;
  isEntering: boolean;
}

const HUD: React.FC<HUDProps> = ({ onEnter, isEntering }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={`relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] transition-all duration-1000 ${isEntering ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}>
      
      {/* Outer Ring - Dashed */}
      <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-spin-slow"></div>
      <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="none" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="10 20" opacity="0.5" />
      </svg>

      {/* Middle Ring - Ticks */}
      <svg className="absolute inset-[5%] w-[90%] h-[90%] animate-spin-reverse-slow" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#bc13fe" strokeWidth="1" strokeDasharray="1 4" opacity="0.6" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="#bc13fe" strokeWidth="0.2" opacity="0.4" />
      </svg>

      {/* Inner Rotating Elements */}
      <div className="absolute inset-[15%] w-[70%] h-[70%] rounded-full border border-cyan-400/20 animate-spin-medium">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-cyan-500 box-shadow-glow"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-cyan-500 box-shadow-glow"></div>
      </div>

      {/* Decorative Arcs */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
         {/* Top Arc */}
         <path d="M 30 10 A 40 40 0 0 1 70 10" fill="none" stroke="#00f0ff" strokeWidth="1" strokeLinecap="round" className="animate-pulse" />
         {/* Bottom Structure */}
         <path d="M 20 85 L 30 90 L 70 90 L 80 85" fill="none" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />
      </svg>

      {/* Central Interactive Button */}
      <div 
        className="absolute inset-[30%] w-[40%] h-[40%] flex items-center justify-center cursor-pointer z-10 group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onEnter}
      >
        {/* Hover Glow Background */}
        <div className={`absolute inset-0 bg-cyan-500/10 rounded-full blur-xl transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}></div>
        
        {/* Button Ring */}
        <div className={`absolute inset-0 border-2 ${hovered ? 'border-cyan-400' : 'border-cyan-800'} rounded-full transition-colors duration-300`}></div>
        
        {/* Inner Spinner on Hover */}
        <div className={`absolute inset-1 border-t-2 border-cyan-400 rounded-full ${hovered ? 'animate-spin-fast' : 'opacity-0'} transition-opacity`}></div>

        <span className={`text-lg md:text-xl tracking-[0.2em] font-bold text-cyan-100 transition-all duration-300 ${hovered ? 'scale-110 text-white text-shadow-neon' : ''}`}>
          ENTER
        </span>
      </div>

      {/* Decorative Particles in Background of HUD */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-1 h-1 bg-white rounded-full absolute top-[20%] left-[20%] animate-ping"></div>
        <div className="w-1 h-1 bg-purple-500 rounded-full absolute bottom-[20%] right-[20%] animate-ping animation-delay-500"></div>
      </div>

      {/* Base Platform Graphic (2D representation of 3D base) */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[80%] h-12">
        <svg viewBox="0 0 200 60" className="w-full h-full opacity-60">
           <path d="M 40 10 L 160 10 L 180 30 L 20 30 Z" fill="none" stroke="#00f0ff" strokeWidth="1" />
           <path d="M 60 40 L 140 40 L 150 50 L 50 50 Z" fill="none" stroke="#bc13fe" strokeWidth="1" />
           <line x1="100" y1="10" x2="100" y2="50" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>
      </div>

    </div>
  );
};

export default HUD;