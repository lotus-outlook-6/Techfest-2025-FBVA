
import React, { useState, useRef, useEffect } from 'react';

const SECTIONS = ['HOME', 'GALLERY', 'MODULES', 'EVENTS', 'TEAM'];

interface NavbarSliderProps {
  onSelect?: (section: string) => void;
  initialSection?: string;
  registrationPhase?: 'IDLE' | 'EXPANDED';
  dashboardPhase?: 'IDLE' | 'EXPANDED';
}

const NavbarSlider: React.FC<NavbarSliderProps> = ({ 
  onSelect, 
  initialSection = 'HOME', 
  registrationPhase = 'IDLE',
  dashboardPhase = 'IDLE'
}) => {
  const initialIndex = SECTIONS.indexOf(initialSection);
  const [activeIndex, setActiveIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [hovering, setHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSticky, setIsSticky] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyTimerRef = useRef<number | null>(null);

  const [isExiting, setIsExiting] = useState(false);
  const prevPhaseRef = useRef(registrationPhase);
  const prevDashRef = useRef(dashboardPhase);

  const isExpandedRegistration = registrationPhase === 'EXPANDED';
  const isExpandedDashboard = dashboardPhase === 'EXPANDED';
  const isFullWidthMode = isExpandedRegistration || isExpandedDashboard;
  
  const isTransitioningBack = (prevPhaseRef.current === 'EXPANDED' && registrationPhase === 'IDLE') ||
                               (prevDashRef.current === 'EXPANDED' && dashboardPhase === 'IDLE');

  useEffect(() => {
    const idx = SECTIONS.indexOf(initialSection);
    if (idx >= 0 && idx !== activeIndex) {
      setActiveIndex(idx);
    }
  }, [initialSection]);

  useEffect(() => {
    if (isTransitioningBack) {
      setIsExiting(true);
      // Universal transition speed: 1 second
      const timer = setTimeout(() => {
        setIsExiting(false);
      }, 1000); 
      return () => clearTimeout(timer);
    }
    prevPhaseRef.current = registrationPhase;
    prevDashRef.current = dashboardPhase;
  }, [registrationPhase, dashboardPhase, isTransitioningBack]);

  useEffect(() => {
    startStickyTimer();
    return () => {
      if (stickyTimerRef.current) window.clearTimeout(stickyTimerRef.current);
    };
  }, []);

  const getPillPositionStyle = (): React.CSSProperties => {
    if (isFullWidthMode) {
      return {
        left: '1%',
        width: '98%',
        transform: 'none'
      };
    }
    
    return {
      left: `${activeIndex * 20}%`,
      width: '20%',
    };
  };

  const startStickyTimer = () => {
    if (stickyTimerRef.current) window.clearTimeout(stickyTimerRef.current);
    stickyTimerRef.current = window.setTimeout(() => {
      setIsSticky(false);
      stickyTimerRef.current = null;
    }, 300000); 
  };

  const notifyChange = (index: number) => {
    if (onSelect) {
      onSelect(SECTIONS[index]);
    }
    const audio = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_730b227c1d.mp3');
    audio.volume = 0.1;
    audio.play().catch(() => {});
  };

  const handleClick = (index: number) => {
    if (isFullWidthMode || isExiting || index === activeIndex) return;
    setActiveIndex(index);
    notifyChange(index);
    refreshExpansion();
  };

  const refreshExpansion = () => {
    setIsSticky(true);
    startStickyTimer();
  };

  const handleMouseEnter = () => {
    if (isFullWidthMode || isExiting) return;
    setHovering(true);
    refreshExpansion();
  };

  const handleMouseLeave = () => {
    if (isFullWidthMode || isExiting) return;
    setHovering(false);
    setIsDragging(false);
    startStickyTimer();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isFullWidthMode || isExiting || !isDragging || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    const index = Math.floor(Math.max(0, Math.min(99, percentage)) / 20);
    if (index !== activeIndex && index >= 0 && index < SECTIONS.length) {
        setActiveIndex(index);
        notifyChange(index);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const isActive = hovering || isDragging || isSticky || isFullWidthMode;
  const isNavLabelActive = isActive || isExiting;

  // Universal 1-second duration
  const activeDurationClass = 'duration-[1000ms]';

  // Standard smooth timing function
  const timingFunc = 'cubic-bezier(0.4, 0, 0.2, 1)';

  return (
    <div className={`relative flex flex-col items-center pointer-events-auto transition-all duration-300 w-auto`}>
        <div 
            ref={trackRef}
            className={`
                h-12 rounded-full border border-fuchsia-500/20 bg-[#080808] relative flex items-center 
                shadow-[0_0_25px_rgba(217,70,239,0.08)] group
                hover:border-fuchsia-500/40 cursor-pointer select-none w-[380px] md:w-[550px]
                transition-all ${activeDurationClass}
                ${isFullWidthMode ? 'border-fuchsia-500/50 shadow-[0_0_50px_rgba(217,70,239,0.3)]' : ''}
            `}
            style={{ transitionTimingFunction: timingFunc }}
            onMouseMove={handleMouseMove}
            onMouseDown={(e) => { 
                if (isFullWidthMode || isExiting) return;
                e.preventDefault(); 
                setIsDragging(true); 
                refreshExpansion(); 
            }}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
        >
            <div className={`absolute inset-0 flex justify-between px-[10%] items-center pointer-events-none transition-all ${isFullWidthMode ? 'opacity-0 duration-500' : 'opacity-100 duration-500 delay-[200ms]'}`}>
                {SECTIONS.map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-[500ms] ${i === activeIndex ? 'bg-fuchsia-500 shadow-[0_0_8px_#d946ef] scale-125' : 'bg-fuchsia-500/20'}`}
                    ></div>
                ))}
            </div>

            {!isFullWidthMode && !isExiting && SECTIONS.map((_, i) => (
                <div 
                    key={i} 
                    className="flex-1 h-full z-10" 
                    onClick={() => handleClick(i)}
                ></div>
            ))}

            <div 
                className={`absolute h-full flex items-center justify-center z-20 pointer-events-none transition-all 
                  ${activeDurationClass}`}
                style={{ ...getPillPositionStyle(), transitionTimingFunction: timingFunc }}
            >
                <div className={`
                    bg-fuchsia-500 rounded-full flex items-center justify-center relative overflow-hidden
                    shadow-[0_0_15px_rgba(217,70,239,0.6)] transition-all ${activeDurationClass}
                    ${isFullWidthMode 
                      ? 'w-full h-[80%]' 
                      : (isNavLabelActive ? 'w-[92%] h-[80%] shadow-[0_0_25px_rgba(217,70,239,0.9)]' : 'w-4 h-4 shadow-[0_0_10px_rgba(217,70,239,0.4)]')}
                `} style={{ transitionTimingFunction: timingFunc }}>
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite] transition-opacity duration-500 ${isNavLabelActive ? 'opacity-100' : 'opacity-0'}`}></div>
                    
                    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
                      <span className={`
                          absolute font-anton tracking-[0.05em] text-white uppercase 
                          drop-shadow-[0_0_3px_rgba(0,0,0,0.3)] leading-none transition-all
                          text-sm md:text-lg
                          ${!isFullWidthMode && isNavLabelActive 
                            ? `opacity-100 scale-100 translate-y-0 duration-[500ms] ${isExiting ? 'delay-[400ms]' : 'delay-0'}` 
                            : 'opacity-0 scale-50 translate-y-4 duration-[400ms]'}
                      `}>
                          {SECTIONS[activeIndex]}
                      </span>

                      <span className={`
                          absolute font-anton tracking-[0.05em] text-white uppercase 
                          drop-shadow-[0_0_3px_rgba(0,0,0,0.3)] leading-none transition-all
                          text-sm md:text-lg
                          ${isExpandedRegistration 
                              ? 'opacity-100 translate-y-0 duration-[700ms] delay-300 ease-out' 
                              : 'opacity-0 -translate-y-12 duration-[500ms] delay-0 ease-in'}
                      `}>
                          USER REGISTRATION
                      </span>

                      <span className={`
                          absolute font-anton tracking-[0.05em] text-white uppercase 
                          drop-shadow-[0_0_3px_rgba(0,0,0,0.3)] leading-none transition-all
                          text-sm md:text-lg
                          ${isExpandedDashboard 
                              ? 'opacity-100 translate-y-0 duration-[700ms] delay-300 ease-out' 
                              : 'opacity-0 -translate-y-12 duration-[500ms] delay-0 ease-in'}
                      `}>
                          USER DASHBOARD
                      </span>
                    </div>
                </div>
            </div>
        </div>

        <style>{`
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}</style>
    </div>
  );
};

export default NavbarSlider;
