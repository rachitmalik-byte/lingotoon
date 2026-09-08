import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldAlert, X, Sparkles, Menu, Compass, Lock, User, Image, Video } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Logo from '../ui/Logo';
import { useUser } from '../../context/UserContext';
import { useDeveloper } from '../../context/DeveloperContext';
import { sounds } from '../../utils/soundEffects';
import AuthModal from '../modals/AuthModal';
import SearchModal from '../modals/SearchModal';
import EasterEggModal from '../interactive/EasterEggModal';

const Navbar = () => {
  const { user } = useUser();
  const { heroMediaType, setHeroMediaType } = useDeveloper();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('kid');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrolled(currentY > 35);
          // Keep navbar always visible so it never disappears on scroll down
          setNavVisible(true);

          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Learning', path: '/learn' },
    { name: 'Videos', path: '/videos' },
    { name: 'Games', path: '/games' },
    { name: 'Progress', path: '/progress' },
  ];

  const handleLogoClick = () => {
    sounds.playPop();
    setLogoClicks(c => {
      const count = c + 1;
      if (count >= 5) {
        sounds.playFanfare();
        setEasterEggOpen(true);
        return 0;
      }
      return count;
    });
  };

  const openParentLogin = (e) => {
    e.preventDefault();
    sounds.playPop();
    setAuthTab('parent');
    setAuthModalOpen(true);
  };

  const openSignUp = (e) => {
    e.preventDefault();
    sounds.playPop();
    setAuthTab('kid');
    setAuthModalOpen(true);
  };

  const openSearch = () => {
    sounds.playPop();
    setSearchModalOpen(true);
  };

  const isTransparent = isHome && !scrolled;

  return (
    <>
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        initialTab={authTab} 
      />
      <SearchModal 
        isOpen={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)} 
      />
      <EasterEggModal
        isOpen={easterEggOpen}
        onClose={() => setEasterEggOpen(false)}
      />

      {/* FIXED NAVIGATION CONTAINER (z-40 so modals at z-[100] sit safely above; hides on scroll down to never block elements) */}
      <header className={`fixed top-0 left-0 w-full z-40 pointer-events-none transition-transform duration-300 ease-out ${
        navVisible || authModalOpen || searchModalOpen || easterEggOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="w-full px-3 sm:px-6 pt-2 sm:pt-3">
          
          {/* DESKTOP & TABLET NAVBAR CAPSULE */}
          <motion.div
            layout
            transition={{
              layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            }}
            style={{
              backdropFilter: isTransparent ? 'blur(0px)' : 'blur(20px)',
              WebkitBackdropFilter: isTransparent ? 'blur(0px)' : 'blur(20px)',
            }}
            className={`mx-auto transition-[background-color,border-color,box-shadow,border-radius] duration-500 ease-out ${
              isTransparent
                ? 'w-full max-w-7xl px-3 sm:px-8 py-2 sm:py-3 bg-transparent border-transparent shadow-none rounded-[2rem] pointer-events-none'
                : 'max-w-5xl rounded-full px-3.5 sm:px-7 py-1.5 sm:py-2 bg-white/80 border border-white/60 shadow-[0_12px_40px_rgba(80,24,176,0.14)] pointer-events-auto'
            }`}
          >
            <div className="flex items-center justify-between pointer-events-auto">
              
              {/* LEFT: LOGO + HERO HEADER MEDIA TOGGLE (Top of page only) */}
              <div className="flex items-center gap-2 sm:gap-3.5">
                <Link 
                  to="/" 
                  onClick={handleLogoClick}
                  className="flex items-center group relative z-10 shrink-0 cursor-pointer"
                  title="LiNGO TOON (Tap 5 times for a surprise!)"
                >
                  <motion.div 
                    layout
                    transition={{ layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
                    className={`transform transition-transform duration-500 ease-out ${
                      scrolled 
                        ? '-my-1 sm:-my-3 scale-100 sm:scale-110 drop-shadow-md group-hover:scale-115 active:scale-90' 
                        : 'scale-100 group-hover:scale-105 active:scale-95'
                    }`}
                  >
                    <Logo size={scrolled ? 'sm' : 'md'} />
                  </motion.div>
                </Link>

                {/* Hero Header Mode Toggle: ONLY visible at top of page (when navbar is not compressed) */}
                <AnimatePresence>
                  {isTransparent && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, x: -10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.85, x: -10 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="flex items-center p-0.5 sm:p-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 shadow-sm"
                    >
                      <button
                        onClick={() => {
                          sounds.playPop();
                          setHeroMediaType('image');
                        }}
                        className={`px-2.5 sm:px-3 py-1 rounded-full font-display font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                          heroMediaType === 'image'
                            ? 'bg-white text-brand-purple shadow-sm'
                            : 'text-white/85 hover:text-white'
                        }`}
                        title="Image Header Mode (Clean, fast, no stop-scroll)"
                      >
                        <Image className="w-3.5 h-3.5" />
                        <span>Image</span>
                      </button>

                      <button
                        onClick={() => {
                          sounds.playPop();
                          setHeroMediaType('video');
                        }}
                        className={`px-2.5 sm:px-3 py-1 rounded-full font-display font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                          heroMediaType === 'video'
                            ? 'bg-white text-brand-purple shadow-sm'
                            : 'text-white/85 hover:text-white'
                        }`}
                        title="Video Header Mode (Interactive stop-scroll)"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Video</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CENTER NAVIGATION LINKS (Uncongested, breathable spacing) */}
              <nav className="hidden md:flex items-center gap-7 lg:gap-9">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => sounds.playPop()}
                    className={({ isActive }) =>
                      `font-display font-semibold text-sm sm:text-base relative transition-colors duration-400 ease-out flex flex-col items-center py-1 ${
                        isActive
                          ? isTransparent
                            ? 'text-white font-bold drop-shadow-sm'
                            : 'text-brand-purple font-extrabold'
                          : isTransparent
                          ? 'text-white/85 hover:text-white'
                          : 'text-neutral-700 hover:text-brand-purple'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{link.name}</span>
                        {isActive && (
                          <motion.span 
                            layoutId="activeNavIndicator"
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                            className={`w-5 sm:w-6 h-1 rounded-full mt-0.5 transition-colors duration-400 ${
                              isTransparent ? 'bg-[#FFD53D] shadow-sm' : 'bg-brand-purple'
                            }`}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>

              {/* RIGHT ACTIONS */}
              <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                {/* Search Button */}
                <button 
                  onClick={openSearch}
                  className={`p-1.5 sm:p-2 rounded-full transition-all active:scale-95 ${
                    isTransparent 
                      ? 'text-white hover:bg-white/15' 
                      : 'text-neutral-700 hover:text-brand-purple hover:bg-purple-100/60'
                  }`}
                  title="Search Topics"
                  aria-label="Search Topics"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Parent Log In Button */}
                <button 
                  onClick={openParentLogin}
                  className={`hidden sm:inline-flex items-center gap-1.5 font-display font-black text-xs sm:text-sm px-3 py-1.5 rounded-full transition-colors ${
                    isTransparent ? 'text-white hover:text-yellow-200' : 'text-neutral-700 hover:text-brand-purple'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Parent Mode</span>
                </button>

                {/* Sign In / Explorer Profile Button */}
                {user ? (
                  <button 
                    onClick={openSignUp}
                    className="flex items-center gap-2 group ml-0.5 cursor-pointer"
                    title={`Explorer: ${user.name} (Click to manage profile)`}
                  >
                    <Avatar name={user.name} level={user.level} size="sm" />
                    <span className={`hidden lg:inline text-xs font-display font-black ${isTransparent ? 'text-white' : 'text-neutral-800'}`}>
                      {user.name}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={openSignUp}
                    className={`font-display font-black text-xs sm:text-sm px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                      isTransparent ? 'text-white hover:text-yellow-200' : 'text-neutral-700 hover:text-brand-purple'
                    }`}
                  >
                    Create ID
                  </button>
                )}

                {/* Sign up / Join free pill button */}
                <button 
                  onClick={openSignUp}
                  className="px-2.5 sm:px-5 py-1.5 sm:py-2 bg-[#FFD53D] hover:bg-yellow-400 text-neutral-900 font-display font-black text-xs sm:text-sm rounded-full shadow-sm hover:shadow-md transition-all transform hover:scale-105 active:scale-95 flex items-center gap-1 sm:gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-neutral-800" />
                  <span>{user ? 'My Club' : 'Join Club'}</span>
                </button>
              </div>

            </div>
          </motion.div>

        </div>
      </header>
    </>
  );
};

export default Navbar;
