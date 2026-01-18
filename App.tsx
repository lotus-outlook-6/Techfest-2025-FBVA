
import React, { useState, useEffect, useRef } from 'react';
import Terminal from './components/Terminal';
import Countdown from './components/Countdown';
import Background from './components/Background';
import MatrixRain from './components/MatrixRain';
import InteractiveText from './components/InteractiveText';
import MusicPlayer from './components/MusicPlayer';
import Home from './components/Home';
import LoadingScreen from './components/LoadingScreen';
import SocialButtons from './components/SocialButtons';
import NavbarSlider from './components/NavbarSlider';
import RegisterButton from './components/RegisterButton';
import Gallery from './components/Gallery';
import Modules from './components/Modules';
import Events from './components/Events';
import Team from './components/Team';
import UserSignup from './userSignup';
import UserDashboard from './userDashboard';

export interface UserData {
  username: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  college: string;
  otherCollege?: string;
  phone: string;
  regId?: string;
  registeredEvents?: string[]; // Track events the user has filled forms for
}

// --- PROFILE CARD COMPONENT ---
const ProfileCard: React.FC<{ 
  user: UserData, 
  isClosing: boolean,
  onClose: () => void,
  onSignOut: () => void,
  onDashboardClick: () => void
}> = ({ user, isClosing, onClose, onSignOut, onDashboardClick }) => {
  return (
    <div className="fixed inset-0 z-[2500] pointer-events-none">
      <div 
        className="absolute inset-0 pointer-events-auto bg-transparent" 
        onClick={onClose}
      ></div>
      
      <div 
        className={`absolute right-4 md:right-12 w-[160px] md:w-[205px] pointer-events-auto bg-[#0c0c0c] border border-fuchsia-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col items-center
          ${isClosing ? 'profile-sweep-out' : 'profile-sweep-in'}
        `}
        style={{
          top: '80px', 
          marginTop: '4px',
          clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)'
        }}
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#d946ef_1px,transparent_1px)] bg-[size:8px_8px]"></div>

        <button onClick={onClose} className="absolute top-2 right-2 text-white hover:text-fuchsia-400 transition-all p-1.5 bg-white/5 hover:bg-white/10 rounded-md z-20 drop-shadow-[0_0_12px_rgba(217,70,239,0.6)]">
           <svg className="w-5 h-5 md:w-5.5 md:h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="absolute left-2 top-6 bottom-6 w-[1px] bg-fuchsia-500/10">
          <div className="absolute top-0 left-0 w-full h-1/4 bg-fuchsia-500 shadow-[0_0_8px_#d946ef]"></div>
        </div>

        <div className="text-center w-full mb-6 mt-4 px-3 relative z-10 flex flex-col items-center overflow-hidden">
           <p className="text-white font-space text-[9px] md:text-[10px] tracking-widest mb-6 truncate w-full flex items-center justify-center font-bold">
             <span className="text-base md:text-lg font-space font-light opacity-60 mr-0.5 translate-y-[-0.5px]">@</span>
             <span className="truncate">{user.username.replace('@', '')}</span>
           </p>
           
           <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-fuchsia-500/5 border border-fuchsia-500/20 flex items-center justify-center mb-5 relative group overflow-hidden shadow-[0_0_35px_rgba(217,70,239,0.15)] shrink-0">
              <svg className="w-12 h-12 md:w-14 md:h-14 text-fuchsia-500/80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <div className="absolute inset-0 pointer-events-none">
                 <div className="absolute top-0 left-0 w-full h-[2px] bg-fuchsia-400/40 animate-[profile-scan_4s_linear_infinite]"></div>
              </div>
           </div>

           <h3 className="text-white font-unbounded text-xl md:text-2xl font-black tracking-tighter leading-none truncate w-full px-1 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
             Hi, {user.firstName}!
           </h3>
        </div>

        <div className="w-full flex flex-col gap-1.5 px-3 pb-3 relative z-10">
          <button onClick={onDashboardClick} className="w-full h-11 bg-fuchsia-500/5 hover:bg-fuchsia-500/10 border border-fuchsia-500/20 hover:border-fuchsia-500/50 text-white font-unbounded text-[9px] md:text-[10px] font-black tracking-[0.1em] uppercase transition-all duration-300 rounded-lg">
             DASHBOARDS
          </button>
          
          <button onClick={onSignOut} className="w-full h-11 bg-white/5 hover:bg-red-500/10 text-gray-500 hover:text-red-400 border border-transparent hover:border-red-500/30 font-unbounded text-[9px] md:text-[10px] font-black tracking-[0.05em] uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-lg">
             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
             Sign out
          </button>
        </div>
      </div>
      <style>{`
        .profile-sweep-in { animation: sweep-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .profile-sweep-out { animation: sweep-out 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes sweep-in { 0% { clip-path: inset(0 0 100% 0); transform: translateY(-10px); } 100% { clip-path: inset(0 0 0 0); transform: translateY(0); } }
        @keyframes sweep-out { 0% { clip-path: inset(0 0 0 0); transform: translateY(0); } 100% { clip-path: inset(0 0 100% 0); transform: translateY(-10px); } }
        @keyframes profile-scan { 0% { transform: translateY(0); opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { transform: translateY(120px); opacity: 0; } }
      `}</style>
    </div>
  );
};

// Generic View for Sub-Sections
const SectionView: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => (
  <div className="w-screen h-full flex flex-col items-center justify-start shrink-0 relative overflow-hidden select-none">
    {children ? children : (
      <div className="relative z-10 flex flex-col items-center pt-40">
        <h1 className="text-6xl md:text-9xl font-mono font-bold tracking-[0.3em] text-white uppercase drop-shadow-[0_0_40px_rgba(217,70,239,0.4)]">
          {title}
        </h1>
        <div className="h-1 w-48 bg-fuchsia-500 mt-8 blur-sm animate-pulse"></div>
      </div>
    )}
  </div>
);

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [showMain, setShowMain] = useState(false);
  const [staggerState, setStaggerState] = useState({
    background: false,
    header: false,
    timer: false
  });

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showMainLayout, setShowMainLayout] = useState(false);
  const [currentSection, setCurrentSection] = useState('HOME');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showTransitionLoader, setShowTransitionLoader] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [isLayoutExpanded, setIsLayoutExpanded] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [bgBurst, setBgBurst] = useState(0);

  // Registration & Dashboard Sequence State
  const [registrationPhase, setRegistrationPhase] = useState<'IDLE' | 'EXPANDED'>('IDLE');
  const [dashboardPhase, setDashboardPhase] = useState<'IDLE' | 'EXPANDED'>('IDLE');
  
  // Sign-in Blur Sequence State
  const [signInPhase, setSignInPhase] = useState<'IDLE' | 'BLURRING'>('IDLE');

  const [registeredUser, setRegisteredUser] = useState<UserData | null>(null);
  const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);
  const [isProfileClosing, setIsProfileClosing] = useState(false);

  // Easter Egg & Persistence Logic
  const [isTerminalUnlocked, setIsTerminalUnlocked] = useState(false);
  const [easterEggTarget, setEasterEggTarget] = useState(3);
  const [clickCount, setClickCount] = useState(0);
  const clickTimerRef = useRef<number | null>(null);

  const SECTIONS = ['HOME', 'GALLERY', 'MODULES', 'EVENTS', 'TEAM'];
  const activeSectionIndex = SECTIONS.indexOf(currentSection);

  // Initial Boot Sequence
  useEffect(() => {
    const targets = [3, 5, 7];
    setEasterEggTarget(targets[Math.floor(Math.random() * targets.length)]);

    const loadTimer = setTimeout(() => {
      setIsAppLoading(false);
      setShowMain(true);
      setTimeout(() => setStaggerState(prev => ({ ...prev, background: true })), 100);
      setTimeout(() => setStaggerState(prev => ({ ...prev, header: true })), 1000);
      setTimeout(() => setStaggerState(prev => ({ ...prev, timer: true })), 1800);
    }, 3000);
    return () => clearTimeout(loadTimer);
  }, []);

  const triggerEntryTransition = () => {
    setIsTransitioning(true);
    setTimeout(() => {
        setShowTransitionLoader(true);
    }, 800);

    setTimeout(() => {
        setShowMainLayout(true);
        setCurrentSection('HOME');
        setClickCount(0);
    }, 5500);

    setTimeout(() => {
        setShowTransitionLoader(false);
        setIsTransitioning(false);
    }, 6500);
  };

  const handleRegisterClick = () => {
    // ALWAYS close mobile menu when clicking register action
    setIsMobileMenuOpen(false);

    if (registeredUser) {
        setIsProfileCardOpen(true);
        setIsProfileClosing(false);
    } else {
        // --- START CLEAN BLUR SEQUENCE ---
        setSignInPhase('BLURRING');

        // Create a backend log similar to userSignup.tsx submission
        console.log('✅ [LOG] Sign-in Done!');
        
        // After initial blur onset, move to the registration view
        setTimeout(() => {
          setSignInPhase('IDLE');
          setRegistrationPhase('EXPANDED');
        }, 1200);
    }
  };

  const handleCloseProfile = () => {
    setIsProfileClosing(true);
    setTimeout(() => {
      setIsProfileCardOpen(false);
      setIsProfileClosing(false);
    }, 600); 
  };

  const handleSignOut = () => {
    setIsProfileClosing(true);
    setTimeout(() => {
      setIsTransitioning(true);
      setIsProfileCardOpen(false);
      setIsProfileClosing(false);
      
      setTimeout(() => {
          setRegisteredUser(null);
          setRegistrationPhase('IDLE');
          setDashboardPhase('IDLE');
      }, 500);

      setTimeout(() => {
          setIsTransitioning(false);
      }, 1200);
    }, 600);
  };

  const handleDashboardClick = () => {
    handleCloseProfile();
    setDashboardPhase('EXPANDED');
  };

  const handleRegistrationSuccess = (userData: UserData) => {
    setRegisteredUser({ ...userData, registeredEvents: [] });
    setTimeout(() => {
      setRegistrationPhase('IDLE');
    }, 2500);
  };

  // Logic to handle module form clicks
  const handleModuleJoin = (moduleName: string) => {
    if (!registeredUser) return;
    
    setRegisteredUser(prev => {
      if (!prev) return null;
      const currentEvents = prev.registeredEvents || [];
      if (currentEvents.includes(moduleName)) return prev;
      
      console.log(`✅ [LOG] Event Registration Tracked: ${moduleName} for user ${prev.username}`);
      return {
        ...prev,
        registeredEvents: [...currentEvents, moduleName]
      };
    });
  };

  const handleHomeBack = () => {
      if (registrationPhase === 'EXPANDED') {
          setRegistrationPhase('IDLE');
          return;
      }
      if (dashboardPhase === 'EXPANDED') {
          setDashboardPhase('IDLE');
          return;
      }
      setIsTransitioning(true);
      setTimeout(() => {
          setShowMainLayout(false);
          setCurrentSection('HOME');
      }, 500);
      setTimeout(() => {
          setIsTransitioning(false);
      }, 1200);
  };

  const handleSectionSelect = (section: string) => {
      if (section !== currentSection) {
          setCurrentSection(section);
      }
      setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (isTerminalUnlocked) {
      if (isMinimized) {
        setIsMinimized(false);
      }
      setShowTerminal(true);
      setIsLayoutExpanded(true);
      return;
    }

    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (clickTimerRef.current) window.clearTimeout(clickTimerRef.current);
    clickTimerRef.current = window.setTimeout(() => setClickCount(0), 2000);

    if (newCount >= easterEggTarget) {
      setIsTerminalUnlocked(true); 
      if (!showTerminal) {
        setIsLayoutExpanded(true);
        setTimeout(() => {
            setIsMinimized(false);
            setShowTerminal(true);
        }, 500);
      }
      setClickCount(0);
    } else {
      setBgBurst(prev => prev + 1);
    }
  };

  const handleTerminalClose = () => {
      setShowTerminal(false);
      setIsMinimized(false);
      setIsLayoutExpanded(false);
  };

  const toggleMobileMenu = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const vibrantRingGradient = `conic-gradient(from 0deg, #facc15, #f97316, #ef4444, #ec4899, #d946ef, #3b82f6, #1e3a8a, #facc15)`;

  return (
    <div className={`min-h-screen w-full text-white flex flex-col items-center justify-center relative overflow-hidden font-sans bg-[#050505] transition-[filter] duration-700 ${signInPhase !== 'IDLE' ? 'heavy-blur' : ''}`}>
      
      {/* SIGN-IN TRANSITION OVERLAY - PURE BLUR ONLY */}
      {signInPhase !== 'IDLE' && (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center backdrop-blur-2xl transition-all duration-700 bg-black/20">
          {/* Content stripped as per request: no text written behind the blur */}
        </div>
      )}

      <div 
        className={`fixed inset-0 z-0 transition-opacity duration-1000 ${showMainLayout ? 'opacity-40' : 'opacity-100'}`}
        style={{
          background: 'radial-gradient(circle at 50% 100%, rgba(20, 5, 25, 1) 0%, rgba(5, 5, 5, 1) 100%)'
        }}
      >
        {staggerState.background && (
          <Background burstTrigger={bgBurst} />
        )}
        <MatrixRain active={isMusicPlaying} />
      </div>

      <MusicPlayer 
        onPlayChange={setIsMusicPlaying} 
        hideButton={showMainLayout || !showMain || isTransitioning} 
      />
      
      {isAppLoading && <LoadingScreen />}
      {showTransitionLoader && <LoadingScreen isTransition={true} />}

      <div className={`fixed inset-0 z-[400] bg-black transition-opacity duration-1000 ${isTransitioning ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>

      {isProfileCardOpen && registeredUser && (
        <ProfileCard 
          user={registeredUser} 
          isClosing={isProfileClosing}
          onClose={handleCloseProfile} 
          onSignOut={handleSignOut}
          onDashboardClick={handleDashboardClick}
        />
      )}

      {/* LANDING PAGE CONTAINER */}
      <div className={`
        fixed inset-0 flex flex-col items-center justify-center transition-all duration-[1200ms] ease-in-out z-[200]
        ${showMainLayout ? 'opacity-0 pointer-events-none invisible' : 'opacity-100 pointer-events-auto visible'}
        ${!showMain ? 'opacity-0' : ''} 
        ${isTransitioning ? 'blur-[50px] scale-[0.8]' : 'blur-0 scale-100'}
      `}>
        {showTerminal && (
          <div className="fixed inset-0 flex items-center justify-center z-[5000] pointer-events-none">
            <div className="pointer-events-auto">
              <Terminal 
                onEnter={triggerEntryTransition} 
                isMinimized={isMinimized}
                onMinimize={() => setIsMinimized(true)}
                onClose={handleTerminalClose}
              />
            </div>
          </div>
        )}

        <SocialButtons />
        
        <div className="relative z-20 flex flex-col items-center justify-between w-full h-[85vh] max-w-5xl px-4 pointer-events-none">
          {staggerState.header && (
            <div className={`relative z-[150] transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] animate-fade-in w-full text-center translate-y-16 md:translate-y-4`}>
              <div className="flex items-center justify-center pointer-events-auto">
                 <InteractiveText onLogoClick={handleLogoClick} />
              </div>
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent mt-4 opacity-70 animate-line"></div>
            </div>
          )}

          <div className="relative flex-1 w-full flex items-center justify-center z-10">
            {!showTerminal && staggerState.timer && (
              <div className="pointer-events-auto group relative animate-fade-in z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280%] h-[280%] rounded-full opacity-15 md:opacity-30 blur-[110px] pointer-events-none overflow-hidden">
                    <div className="absolute inset-[-50%]">
                        <div className="w-full h-full animate-spin-slow" style={{ background: vibrantRingGradient, animationDuration: '4s' }}></div>
                    </div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] rounded-full opacity-20 md:opacity-40 blur-[60px] pointer-events-none overflow-hidden">
                    <div className="absolute inset-[-50%]">
                        <div className="w-full h-full animate-spin-slow" style={{ background: vibrantRingGradient, animationDuration: '4s' }}></div>
                    </div>
                </div>

                <div className="absolute -inset-[4px] rounded-[38%] overflow-hidden pointer-events-none opacity-100 z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%]">
                        <div className="w-full h-full animate-spin-slow" style={{ background: vibrantRingGradient, animationDuration: '4s' }}></div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%] opacity-60 blur-md mix-blend-screen">
                        <div className="w-full h-full animate-spin-slow" style={{ background: vibrantRingGradient, animationDuration: '4s' }}></div>
                    </div>
                </div>

                <button 
                  onClick={triggerEntryTransition}
                  className="relative w-36 h-36 md:w-44 md:h-44 bg-gradient-to-b from-[#121212] to-[#080808] border border-white/5 rounded-[38%] flex items-center justify-center transition-all duration-300 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-12px_24px_rgba(0,0,0,0.8),0_20px_40px_-10px_rgba(0,0,0,0.8)] active:translate-y-1 active:shadow-[inset_0_4px_12px_rgba(0,0,0,0.9),inset_0_-1px_1px_rgba(255,255,255,0.05),0_5px_15px_rgba(0,0,0,0.4)] group z-20"
                >
                  <div className="flex flex-col items-center gap-1 transition-transform group-hover:scale-105 active:scale-95">
                     <span className="text-white font-anton text-2xl md:text-4xl tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">ENTER</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {staggerState.timer && (
            <div className={`relative transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] origin-bottom pb-16 md:pb-8 translate-y-0 opacity-100 blur-0 scale-100 z-[150]`}>
               <Countdown />
            </div>
          )}
        </div>
      </div>

      {showMainLayout && (
        <div className="fixed inset-0 z-[800] flex flex-col pointer-events-auto">
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`fixed inset-0 z-[2900] bg-[#050505]/95 backdrop-blur-[60px] transition-all duration-700 flex flex-col items-center justify-center ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-110'}`}
          >
             <nav onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-10 md:gap-14">
                <div className={`transition-all duration-700 ${isMobileMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'}`} style={{ transitionDelay: '50ms' }}>
                   <RegisterButton 
                     onClick={handleRegisterClick} 
                     size="lg" 
                     className="mb-10" 
                     isRegistered={registrationPhase === 'EXPANDED'} 
                     registeredUser={registeredUser} 
                   />
                </div>
                {SECTIONS.map((section, idx) => (
                    <button key={section} onClick={() => handleSectionSelect(section)} className={`text-4xl md:text-7xl font-anton tracking-widest transition-all duration-500 hover:scale-110 active:scale-95 ${currentSection === section ? 'text-fuchsia-500 drop-shadow-[0_0_20px_rgba(217,70,239,0.6)]' : 'text-white/60 hover:text-white'}`} style={{ transitionDelay: isMobileMenuOpen ? `${(idx + 2) * 100}ms` : '0ms' }}>
                        {section}
                    </button>
                ))}
             </nav>
          </div>

          <header className="fixed top-0 left-0 w-full h-20 md:h-24 flex items-center justify-between px-4 md:px-12 z-[3000] bg-black/60 backdrop-blur-xl backdrop-saturate-[1.8] border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 pointer-events-auto">
            <div className="flex items-center gap-3 md:gap-5 group select-none shrink-0 cursor-pointer transition-transform hover:scale-[0.98]" onClick={handleHomeBack}>
              <div className="w-8 h-8 md:w-12 md:h-12 bg-[#1e1e1e] border border-gray-700 rounded-md flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.25)] group-hover:border-fuchsia-500 transition-all duration-300">
                <span className="text-fuchsia-500 font-bold text-lg md:text-2xl font-mono flex pointer-events-none"><span>&gt;</span><span>_</span></span>
              </div>
              <span className="text-lg md:text-3xl font-anton tracking-[0.08em] text-white group-hover:text-fuchsia-400 transition-colors uppercase">YANTRAKSH</span>
            </div>
            
            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              <NavbarSlider 
                initialSection={currentSection} 
                onSelect={handleSectionSelect} 
                registrationPhase={registrationPhase}
                dashboardPhase={dashboardPhase}
              />
            </div>

            <div className="flex items-center gap-2 md:gap-6 shrink-0 relative z-[3100]">
                <div className="hidden lg:block transition-transform">
                  <RegisterButton 
                    onClick={handleRegisterClick} 
                    size="sm" 
                    isRegistered={registrationPhase === 'EXPANDED'} 
                    registeredUser={registeredUser}
                  />
                </div>
                <button onClick={toggleMobileMenu} className="lg:hidden w-14 h-14 flex flex-col items-center justify-center gap-1.5 focus:outline-none hover:bg-white/5 rounded-full transition-all active:scale-90 relative z-[3500]" aria-label="Toggle Menu">
                    <div className={`w-7 h-1 bg-white rounded-full transition-all duration-300 transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></div>
                    <div className={`w-7 h-1 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`}></div>
                    <div className={`w-7 h-1 bg-white rounded-full transition-all duration-300 transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></div>
                </button>
            </div>
          </header>

          <div className="flex-1 w-full relative overflow-hidden mt-20 md:mt-24">
            {registrationPhase === 'EXPANDED' ? (
              <UserSignup onSuccess={handleRegistrationSuccess} />
            ) : dashboardPhase === 'EXPANDED' ? (
              <UserDashboard 
                user={registeredUser} 
                onSignOut={handleSignOut}
                onNavigateToModules={() => {
                  setDashboardPhase('IDLE');
                  setCurrentSection('MODULES');
                }}
              />
            ) : (
              <div className="flex w-full h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]" style={{ transform: `translateX(-${activeSectionIndex * 100}vw)` }}>
                <SectionView title="HOME"><Home onBack={handleHomeBack} onSectionChange={handleSectionSelect} initialSection={currentSection} hideNavbar={true} /></SectionView>
                <SectionView title="GALLERY"><Gallery /></SectionView>
                <SectionView title="MODULES"><Modules onJoin={handleModuleJoin} /></SectionView>
                <SectionView title="EVENTS"><Events /></SectionView>
                <SectionView title="TEAM"><Team /></SectionView>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,20,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[600] bg-[length:100%_2px,3px_100%] opacity-20"></div>
    </div>
  );
}

export default App;
