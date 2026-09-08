import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  const scrollToContent = () => {
    const el = document.getElementById('explore-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full select-none bg-[#591ac0]">
      {/* ================= HERO BANNER (100% MATCHING MOCKUP & RESPONSIVE) ================= */}
      <div className="relative w-full h-[66vh] min-h-[480px] sm:h-[72vh] sm:min-h-[560px] md:h-screen md:min-h-[640px] max-h-[1080px] flex flex-col justify-between items-center overflow-hidden">
        
        {/* Responsive Exact 3D Artwork Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
          <img 
            src="/images/lingo_hero_exact.jpg" 
            alt="LiNGO TOON Learning Adventure" 
            loading="eager"
            fetchpriority="high"
            decoding="async"
            className="w-[125%] sm:w-full h-full object-contain md:object-cover object-center max-w-none md:max-w-none"
          />
          {/* Subtle vignette/glow overlay */}
          <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/10 pointer-events-none" />
        </div>

        {/* Floating Twinkling Star Sparkles */}
        <motion.div 
          animate={{ scale: [0.8, 1.25, 0.8], rotate: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 left-[28%] text-brand-yellow font-black text-2xl select-none pointer-events-none z-10 hidden md:block"
        >
          ✦
        </motion.div>
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -20, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-20 right-[28%] text-brand-yellow font-black text-3xl select-none pointer-events-none z-10 hidden md:block"
        >
          ✦
        </motion.div>
        <motion.div 
          animate={{ scale: [0.7, 1.15, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-28 left-[24%] text-brand-yellow font-black text-xl select-none pointer-events-none z-10 hidden md:block"
        >
          ✦
        </motion.div>
        <motion.div 
          animate={{ scale: [0.9, 1.25, 0.9] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-24 right-[25%] text-brand-yellow font-black text-2xl select-none pointer-events-none z-10 hidden md:block"
        >
          ✦
        </motion.div>

        {/* Top Spacer for transparent navbar */}
        <div className="w-full h-20 relative z-10"></div>

        {/* Center Interactive Anchor */}
        <div className="relative z-10 flex-1 flex items-center justify-center pointer-events-none">
          {/* Transparent click target / invisible trigger if needed */}
        </div>

        {/* Bottom Gentle Scroll Button */}
        <div className="relative z-20 pb-6">
          <motion.button
            onClick={scrollToContent}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, 6, 0] }}
            transition={{ 
              opacity: { delay: 0.6, duration: 0.5 },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="px-6 py-2.5 clay-pill text-brand-purple font-display font-bold text-sm sm:text-base flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
          >
            <span>Explore Courses</span>
            <ArrowDown className="w-4 h-4 text-brand-orange" />
          </motion.button>
        </div>

        {/* Seamless Organic Wave Divider to prevent ANY harsh cut */}
        <div className="absolute bottom-0 left-0 w-full leading-none z-10 pointer-events-none">
          <svg 
            viewBox="0 0 1440 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-full h-10 sm:h-14 md:h-18 block"
            preserveAspectRatio="none"
          >
            <path 
              d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,53.3C840,43,960,21,1080,21.3C1200,21,1320,43,1380,53.3L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z" 
              fill="#FAF9F6"
            />
          </svg>
        </div>
      </div>

      {/* ================= HEADLINE & PRIMARY CTA SECTION (Seamless in #FAF9F6) ================= */}
      <div id="explore-section" className="bg-[#FAF9F6] pt-6 sm:pt-8 pb-14 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-neutral-900 leading-tight tracking-tight">
            Unlock the Power of Language, <br className="hidden sm:inline" />
            <span className="text-brand-purple">One Toon at a Time!</span>
          </h1>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/learn">
              <button className="px-8 sm:px-10 py-3.5 sm:py-4 bg-[#1877F2] hover:bg-[#1466D2] text-white font-display font-bold text-lg sm:text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2">
                <span>Explore Our Courses</span>
                <span className="text-xl">→</span>
              </button>
            </Link>
            <Link to="/games">
              <button className="px-7 py-3.5 sm:py-4 bg-white hover:bg-neutral-50 text-brand-purple font-display font-bold text-lg sm:text-xl rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-brand-purple/20 flex items-center justify-center gap-2">
                <Gamepad2 className="w-5 h-5 text-brand-purple" />
                <span>Play Arcade Games</span>
              </button>
            </Link>
          </div>

          {/* Tagline with centered dots matching laptop mockup */}
          <p className="font-display font-semibold text-sm sm:text-base text-neutral-500 pt-2 tracking-wide">
            Language <span className="text-brand-yellow font-black mx-1.5">•</span> Learning <span className="text-brand-blue font-black mx-1.5">•</span> Fun
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
