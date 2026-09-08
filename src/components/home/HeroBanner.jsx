import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  const trackRef = useRef(null);
  const videoRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0);

  // Initialize and pause the video so scroll exclusively drives progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setVideoDuration(video.duration);
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    if (video.readyState >= 1 && video.duration) {
      setVideoDuration(video.duration);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Frame-by-frame scrub tied directly to scroll progress
  useEffect(() => {
    const track = trackRef.current;
    const video = videoRef.current;
    if (!track || !video) return;

    let rafId = null;

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const rect = track.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        if (totalScrollable <= 0) return;

        // Progress from 0.0 (top) to 1.0 (end of video scroll track)
        const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);

        const duration = video.duration || videoDuration;
        if (duration && isFinite(duration)) {
          const targetTime = progress * duration;
          // Apply currentTime smoothly without jitter
          if (Math.abs(video.currentTime - targetTime) > 0.02) {
            video.currentTime = targetTime;
          }
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [videoDuration]);

  const scrollToContent = () => {
    const el = document.getElementById('explore-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full select-none bg-[#591ac0]">
      {/* ================= STOP-SCROLL VIDEO SCRUB TRACK (220vh) ================= */}
      <div ref={trackRef} className="relative w-full h-[220vh]">
        {/* Sticky Fullscreen Frame pinned while scrolling through track */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center overflow-hidden bg-[#591ac0]">
          
          {/* Scroll-Scrubbed Animated Video */}
          <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center pointer-events-none">
            <video
              ref={videoRef}
              src="/videos/lingotoon_animated_logo.mp4"
              poster="/images/lingo_hero_exact.jpg"
              playsInline
              muted
              preload="auto"
              className="w-full h-full object-contain md:object-cover object-center"
            />
            {/* Subtle ambient lighting vignette */}
            <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/15 pointer-events-none" />
          </div>

          {/* Floating Twinkling Star Sparkles */}
          <motion.div 
            animate={{ scale: [0.8, 1.25, 0.8], rotate: [0, 15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-24 left-[28%] text-brand-yellow font-black text-2xl select-none pointer-events-none z-10 hidden md:block drop-shadow"
          >
            ✦
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.3, 1], rotate: [0, -20, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-20 right-[28%] text-brand-yellow font-black text-3xl select-none pointer-events-none z-10 hidden md:block drop-shadow"
          >
            ✦
          </motion.div>
          <motion.div 
            animate={{ scale: [0.7, 1.15, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-28 left-[24%] text-brand-yellow font-black text-xl select-none pointer-events-none z-10 hidden md:block drop-shadow"
          >
            ✦
          </motion.div>
          <motion.div 
            animate={{ scale: [0.9, 1.25, 0.9] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-24 right-[25%] text-brand-yellow font-black text-2xl select-none pointer-events-none z-10 hidden md:block drop-shadow"
          >
            ✦
          </motion.div>

          {/* Top Spacer for floating transparent navbar */}
          <div className="w-full h-20 relative z-10 pointer-events-none" />

          {/* Center Interactive Anchor */}
          <div className="relative z-10 flex-1 flex items-center justify-center pointer-events-none" />

          {/* Bottom Gentle Explore Button */}
          <div className="relative z-30 pb-7 sm:pb-9 flex flex-col items-center gap-2">
            <motion.button
              onClick={scrollToContent}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [0, 6, 0] }}
              transition={{ 
                opacity: { delay: 0.4, duration: 0.5 },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="px-6 py-2.5 clay-pill text-brand-purple font-display font-bold text-sm sm:text-base flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer pointer-events-auto"
            >
              <span>Explore Courses</span>
              <ArrowDown className="w-4 h-4 text-brand-orange" />
            </motion.button>
          </div>

          {/* Seamless Organic Wave Divider Over Video (Curvey Smooth Pattern Flow) */}
          <div className="absolute bottom-0 left-0 w-full leading-none z-20 pointer-events-none">
            <svg 
              viewBox="0 0 1440 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-full h-12 sm:h-16 md:h-20 block"
              preserveAspectRatio="none"
            >
              <path 
                d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,53.3C840,43,960,21,1080,21.3C1200,21,1320,43,1380,53.3L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z" 
                fill="#FAF9F6"
              />
            </svg>
          </div>

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
