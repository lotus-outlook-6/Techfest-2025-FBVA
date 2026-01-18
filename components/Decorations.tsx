import React from 'react';

const Decorations: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Grid Floor Effect - Perspective */}
      <div className="absolute bottom-0 w-full h-[30vh] perspective-container opacity-20">
         <div className="w-full h-full bg-[linear-gradient(0deg,transparent_24%,rgba(217,70,239,.3)_25%,rgba(217,70,239,.3)_26%,transparent_27%,transparent_74%,rgba(217,70,239,.3)_75%,rgba(217,70,239,.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(217,70,239,.3)_25%,rgba(217,70,239,.3)_26%,transparent_27%,transparent_74%,rgba(217,70,239,.3)_75%,rgba(217,70,239,.3)_76%,transparent_77%,transparent)] bg-[length:50px_50px] tilted-plane"></div>
      </div>

      {/* Side Brackets - Left */}
      <div className="absolute bottom-10 left-4 md:left-10 w-24 h-24 md:w-48 md:h-32 opacity-80">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_5px_rgba(217,70,239,0.8)]">
          <path d="M 0 100 L 20 80 L 80 80 L 100 60" fill="none" stroke="#d946ef" strokeWidth="2" />
          <path d="M 0 105 L 110 105" fill="none" stroke="#a21caf" strokeWidth="1" opacity="0.5" />
          <rect x="0" y="85" width="10" height="5" fill="#d946ef" />
          <rect x="15" y="85" width="10" height="5" fill="#d946ef" opacity="0.5" />
        </svg>
      </div>

      {/* Side Brackets - Right */}
      <div className="absolute bottom-10 right-4 md:right-10 w-24 h-24 md:w-48 md:h-32 opacity-80 transform scale-x-[-1]">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_5px_rgba(217,70,239,0.8)]">
          <path d="M 0 100 L 20 80 L 80 80 L 100 60" fill="none" stroke="#d946ef" strokeWidth="2" />
          <path d="M 0 105 L 110 105" fill="none" stroke="#a21caf" strokeWidth="1" opacity="0.5" />
          <rect x="0" y="85" width="10" height="5" fill="#d946ef" />
          <rect x="15" y="85" width="10" height="5" fill="#d946ef" opacity="0.5" />
        </svg>
      </div>
      
      {/* Target Marker */}
      <div className="absolute top-1/2 right-20 w-8 h-8 opacity-40 animate-pulse hidden md:block">
        <svg viewBox="0 0 40 40">
           <circle cx="20" cy="20" r="18" stroke="#d946ef" fill="none" strokeDasharray="4 4" />
           <circle cx="20" cy="20" r="2" fill="#d946ef" />
           <line x1="20" y1="0" x2="20" y2="40" stroke="#d946ef" strokeWidth="0.5" />
           <line x1="0" y1="20" x2="40" y2="20" stroke="#d946ef" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
};

export default Decorations;