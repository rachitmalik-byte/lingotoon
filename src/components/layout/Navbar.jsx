import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldAlert, X, Sparkles, Menu, Compass, Lock } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Logo from '../ui/Logo';
import { useUser } from '../../context/UserContext';
import { sounds } from '../../utils/soundEffects';
import AuthModal from '../modals/AuthModal';
import SearchModal from '../modals/SearchModal';

const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('kid');
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Learning', path: '/learn' },
    { name: 'Videos', path: '/videos' },
    { name: 'Games', path: '/games' },
    { name: 'Progress', path: '/progress' },
  ];

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

      {/* FIXED NAVIGATION CONTAINER */}
      <header className="fixed top-0 left-0 w-full z-50 pointer-events-none transition-all duration-300">
        <div className="w-full px-3 sm:px-6 pt-2 sm:pt-3">
          
          {/* DESKTOP & TABLET NAVBAR */}
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className={`pointer-events-auto transition-all duration-300 mx-auto ${
              isTransparent
                ? 'w-full max-w-7xl px-4 sm:px-8 py-2.5 bg-transparent'
                : 'max-w-5xl rounded-full px-5 sm:px-7 py-2 bg-white/65 backdrop-blur-xl border border-white/60 shadow-[0_12px_40px_rgba(80,24,176,0.14)]'
            }`}
          >
            <div className="flex items-center justify-between">
              
              {/* LOGO (Playfully pops beyond capsule boundary when scrolled!) */}
              <Link 
                to="/" 
                onClick={() => sounds.playPop()}
                className="flex items-center group relative z-10"
              >
                <div 
                  className={`transition-all duration-300 transform ${
                    scrolled 
                      ? '-my-3 sm:-my-4 scale-110 sm:scale-120 drop-shadow-md group-hover:scale-125 group-hover:rotate-1' 
                      : 'scale-100 group-hover:scale-105'
                  }`}
                >
                  <Logo size={scrolled ? 'sm' : 'md'} />
                </div>
              </Link>

              {/* CENTER NAVIGATION LINKS */}
              <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => sounds.playPop()}
                    className={({ isActive }) =>
                      `font-display font-semibold text-sm sm:text-base relative transition-all flex flex-col items-center py-1 ${
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
                            className={`w-5 sm:w-6 h-1 rounded-full mt-0.5 ${
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
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Search Button */}
                <button 
                  onClick={openSearch}
                  className={`p-2 rounded-full transition-all active:scale-95 ${
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

                {/* Sign up / Join free pill button */}
                <button 
                  onClick={openSignUp}
                  className="px-3.5 sm:px-5 py-1.5 sm:py-2 bg-[#FFD53D] hover:bg-yellow-400 text-neutral-900 font-display font-black text-xs sm:text-sm rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-neutral-800" />
                  <span>Join Club</span>
                </button>

                {/* Child Avatar Badge */}
                <Link 
                  to="/progress" 
                  onClick={() => sounds.playPop()}
                  className="flex items-center gap-1.5 group ml-0.5"
                  title="My Progress"
                >
                  <Avatar name={user?.name} level={user?.level} size="sm" />
                </Link>
              </div>

            </div>
          </motion.div>

        </div>
      </header>
    </>
  );
};

export default Navbar;
