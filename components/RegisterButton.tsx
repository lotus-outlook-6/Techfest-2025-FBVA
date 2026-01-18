
import React, { useState, useEffect, useRef } from 'react';

interface RegisterButtonProps {
  className?: string;
  size?: 'sm' | 'lg';
  onClick?: () => void;
  isRegistered?: boolean;
  registeredUser?: {
    username: string;
    firstName: string;
    lastName: string;
    photoURL?: string;
  } | null;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({
  className = "",
  size = "sm",
  onClick,
  isRegistered = false,
  registeredUser = null
}) => {
  const isLarge = size === 'lg';
  const [isHovered, setIsHovered] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchTimeoutRef = useRef<number | null>(null);

  // Profile mode triggers when we have registered data and aren't actively in the expanded signup view
  const showProfile = !!registeredUser && !isRegistered;

  const handleMouseEnter = () => {
    if (isRegistered) return;
    setIsHovered(true);
    if (!showProfile) {
      setIsGlitching(true);
      if (glitchTimeoutRef.current) window.clearTimeout(glitchTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsGlitching(false);
    if (glitchTimeoutRef.current) window.clearTimeout(glitchTimeoutRef.current);
  };

  const UserIcon = () => (
    <svg className="w-5 h-5 md:w-8 md:h-8 text-fuchsia-500 drop-shadow-[0_0_10px_#d946ef]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`group relative outline-none transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] flex items-center justify-center overflow-hidden
        w-[160px] md:w-[205px] h-[46px] md:h-[58px]
        ${className}`}
    >

      {/* BACKGROUND GLOW */}
      <div className={`absolute inset-0 bg-fuchsia-600/5 blur-2xl rounded-full transition-opacity duration-700 ${isHovered && !isRegistered ? 'opacity-100' : 'opacity-0'}`}></div>

      {/* CHASSIS */}
      <div
        className={`
          absolute inset-0 bg-[#0c0c0c] border border-fuchsia-500/30 transition-all duration-700 cubic-bezier(0.19, 1, 0.22, 1)
          ${!isRegistered ? 'group-hover:border-fuchsia-500' : 'border-fuchsia-500/10'}
          ${showProfile ? 'shadow-[0_0_35px_rgba(217,70,239,0.15)]' : 'shadow-[inset_0_0_10px_rgba(217,70,239,0.1)]'}
        `}
        style={{
          clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)'
        }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#d946ef_1px,transparent_1px)] bg-[size:5px_5px]"></div>

        {/* SIDE GAUGE */}
        <div className="absolute left-2 top-3 bottom-3 w-[1.5px] bg-fuchsia-950/40 rounded-full overflow-hidden">
          <div className={`absolute bottom-0 left-0 w-full bg-fuchsia-500 transition-all duration-1000 ${isHovered ? 'h-full shadow-[0_0_6px_#d946ef]' : 'h-[15%]'}`}></div>
        </div>

        {/* SCANNER */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-fuchsia-400/40 blur-[0.5px] animate-[scan_2.5s_linear_infinite]"></div>
        </div>
      </div>

      {/* CONTENT LAYER */}
      {!showProfile ? (
        <div className={`relative z-10 flex flex-col items-center transition-all duration-700 ${isRegistered ? 'opacity-0 scale-90' : 'opacity-100'}`}>
          <span className={`text-white font-anton tracking-[0.12em] transition-all duration-500 ${isGlitching ? 'animate-[glitch-shadow_0.2s_infinite]' : ''} text-xl md:text-2xl`}>
            REGISTER
          </span>
        </div>
      ) : (
        <div className="relative z-10 flex flex-row items-center gap-2.5 md:gap-3.5 w-full h-full px-4 md:px-6 justify-start">

          {/* IMAGE CLONE: Increased PFP size on the Left */}
          <div className="w-9 h-9 md:w-11 md:h-11 rounded-full border border-fuchsia-500/25 flex items-center justify-center bg-fuchsia-500/10 shrink-0 shadow-[0_0_12px_rgba(217,70,239,0.2)] overflow-hidden">
            {registeredUser.photoURL ? (
              <img src={registeredUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <UserIcon />
            )}
          </div>

          {/* IMAGE CLONE: Stacked text to the right - COMPACT HANDLE */}
          <div className="flex flex-col items-start min-w-0 flex-1 justify-center py-1">
            {/* Username Line */}
            <span className="text-white font-anton text-[10px] md:text-[11px] tracking-wider leading-none drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] whitespace-nowrap overflow-hidden text-ellipsis w-full">
              {registeredUser.username.startsWith('@') ? registeredUser.username : `@${registeredUser.username}`}
            </span>

            {/* Name Line */}
            <span className="text-gray-400/80 font-space text-[10px] md:text-[11px] tracking-[0.05em] font-bold whitespace-nowrap overflow-hidden text-ellipsis w-full mt-0.5">
              {registeredUser.firstName} {registeredUser.lastName}
            </span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scan { 0% { transform: translateY(0); opacity: 0; } 15% { opacity: 0.6; } 85% { opacity: 0.6; } 100% { transform: translateY(100%); opacity: 0; } }
        @keyframes glitch-shadow { 0% { text-shadow: 2.5px 0 #ff00ff, -2.5px 0 #00ffff; } 50% { text-shadow: -2.5px 0 #ff00ff, 2.5px 0 #00ffff; } 100% { text-shadow: 0 0 #ff00ff, 0 0 #00ffff; } }
      `}</style>
    </button>
  );
};

export default RegisterButton;
