import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Gamepad2, Volume2, VolumeX, RotateCcw, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDeveloper } from '../../context/DeveloperContext';

const HeroBanner = () => {
  const { heroMediaType } = useDeveloper();
  const trackRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  const hasStartedRef = useRef(false);
  const isEndedRef = useRef(false);

  // Initialize and preload video
  useEffect(() => {
    if (heroMediaType !== 'video') return;
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.muted = isMuted;
    video.playsInline = true;

    const handleEnded = () => {
      setIsPlaying(false);
      setIsEnded(true);
      isEndedRef.current = true;
      document.body.style.overflow = '';
      
      // Gentle auto-scroll to courses section once video finishes
      setTimeout(() => {
        const el = document.getElementById('explore-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 700);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [heroMediaType, isMuted]);

  // Stop-scroll lock: locks page scrolling while video is playing, re-enables only when ended
  useEffect(() => {
    if (heroMediaType !== 'video' || !isPlaying || isEnded) {
      document.body.style.overflow = '';
      return;
    }

    // Keep top of page aligned during playback
    if (window.scrollY > 0 && window.scrollY < window.innerHeight * 0.8) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    const preventScroll = (e) => {
      // Intercept mouse wheel and touch gestures while video is playing
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const preventKeys = (e) => {
      // Prevent keyboard navigation keys from scrolling away
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeys, { passive: false });

    // Lock body overflow
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeys);
      document.body.style.overflow = originalOverflow;
    };
  }, [heroMediaType, isPlaying, isEnded]);

  // Smooth single-scroll play trigger
  const startPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!hasStartedRef.current || video.ended) {
      video.currentTime = 0;
    }
    hasStartedRef.current = true;
    setHasStarted(true);
    setIsEnded(false);
    isEndedRef.current = false;

    video.muted = isMuted;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        });
    }
  };

  // Replay animation
  const replayAnimation = (e) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    video.currentTime = 0;
    video.play().then(() => {
      setIsPlaying(true);
      setIsEnded(false);
      isEndedRef.current = false;
    }).catch(() => {});
  };

  // Toggle Sound
  const toggleMute = (e) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMute = !isMuted;
    video.muted = nextMute;
    setIsMuted(nextMute);
  };

  // Single-scroll listener: activates on first wheel, touch, or scroll
  useEffect(() => {
    if (heroMediaType !== 'video') return;

    const handleWheel = (e) => {
      if (e.deltaY > 0 && !hasStartedRef.current && window.scrollY < 80) {
        startPlayback();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      const deltaY = touchStartY - e.touches[0].clientY;
      if (deltaY > 15 && !hasStartedRef.current && window.scrollY < 80) {
        startPlayback();
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 15 && !hasStartedRef.current) {
        startPlayback();
      }
      if (window.scrollY === 0 && isEndedRef.current) {
        hasStartedRef.current = false;
        setHasStarted(false);
        setIsEnded(false);
        isEndedRef.current = false;
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [heroMediaType, isMuted]);

  const scrollToContent = () => {
    // Release scroll lock immediately if video was still running
    if (videoRef.current && !videoRef.current.ended) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    setIsEnded(true);
    isEndedRef.current = true;
    document.body.style.overflow = '';

    const el = document.getElementById('explore-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full select-none bg-[#591ac0]">
      {/* ================= CONDITIONAL HERO HEADER: IMAGE (NO STOPSCROLL) vs VIDEO (STOPSCROLL) ================= */}
      {heroMediaType === 'image' ? (
        /* STATIC IMAGE HERO SECTION (100% Free Scroll, ZERO Stop-Scroll Pinning, Edge-to-Edge Full Layout) */
        <div className="relative w-full h-screen min-h-[600px] flex flex-col justify-between items-center overflow-hidden bg-[#591ac0]">
          
          {/* Edge-to-Edge Hero Artwork Image (Fills the entire purple layout, NO inner box) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center pointer-events-none">
            <img
              src="/images/lingo_hero_exact.jpg"
              alt="Lingo Toon - Learn. Play. Explore."
              className="w-full h-full object-contain md:object-cover object-center select-none pointer-events-none"
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="px-6 py-2.5 clay-pill text-brand-purple font-display font-bold text-sm sm:text-base flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer pointer-events-auto"
            >
              <span>Explore Courses</span>
              <ArrowDown className="w-4 h-4 text-brand-orange" />
            </motion.button>
          </div>

          {/* Seamless Organic Wave Divider Over Image (Curvey Smooth Pattern Flow) */}
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
      ) : (
        /* ================= SINGLE-SCROLL 60FPS VIDEO ANIMATION SECTION ================= */
        <div 
          ref={trackRef} 
          onClick={!isPlaying ? startPlayback : undefined}
          className="relative w-full h-screen min-h-[600px] flex flex-col justify-between items-center overflow-hidden bg-[#591ac0] cursor-pointer"
        >
          
          {/* Hardware-Accelerated 60FPS Native Video (Optimized WebM + Fastdecode MP4 for Lite Devices) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center pointer-events-none">
            <video
              ref={videoRef}
              playsInline
              muted={isMuted}
              preload="auto"
              disablePictureInPicture
              disableRemotePlayback
              className="w-full h-full object-contain md:object-cover object-center transform-gpu will-change-transform"
              style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
            >
              <source src="/videos/lingotoon_animated_logo.webm" type="video/webm" />
              <source src="/videos/lingotoon_animated_logo.mp4" type="video/mp4" />
            </video>
            {/* Ambient Lighting Vignette */}
            <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/15 pointer-events-none" />
          </div>

          {/* Floating Twinkling Star Sparkles (Paused during playback to maximize GPU decoder performance on lite devices) */}
          {!isPlaying && (
            <>
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
            </>
          )}

          {/* Top Spacer for floating transparent navbar */}
          <div className="w-full h-20 relative z-10 pointer-events-none" />

          {/* Center Interactive Anchor / Play Indicator */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center pointer-events-none">
            {!hasStarted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: [0.98, 1.02, 0.98] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="px-5 py-2.5 rounded-full bg-black/45 backdrop-blur-md border border-white/30 text-white font-display font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-xl pointer-events-auto cursor-pointer transition-transform hover:scale-105"
                onClick={startPlayback}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span>Scroll or click to play intro</span>
                <Play className="w-4 h-4 fill-amber-300 text-amber-300 ml-0.5" />
              </motion.div>
            )}

            {isPlaying && !isEnded && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-2 rounded-full bg-black/45 backdrop-blur-md border border-white/30 text-white font-display font-medium text-xs sm:text-sm flex items-center gap-2 shadow-lg pointer-events-none"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Playing intro... (scroll unlocks when finished)</span>
              </motion.div>
            )}
          </div>

          {/* Bottom Controls Bar: Audio Mute, Replay, and Explore Button */}
          <div className="relative z-30 pb-7 sm:pb-9 flex flex-col items-center gap-3 w-full px-4">
            
            {/* Utility Row: Sound toggle & Replay */}
            <div className="flex items-center gap-2.5 pointer-events-auto">
              {/* Sound Toggle Button */}
              <button 
                onClick={toggleMute}
                className="px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/25 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                title={isMuted ? "Unmute audio" : "Mute audio"}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-neutral-300" />
                    <span>Muted</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                    <span className="text-amber-200">Sound On</span>
                  </>
                )}
              </button>

              {/* Replay Button */}
              {isEnded && (
                <motion.button
                  onClick={replayAnimation}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/35 text-white font-display font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 text-amber-300" />
                  <span>Replay</span>
                </motion.button>
              )}
            </div>

            {/* Explore Button */}
            <motion.button
              onClick={scrollToContent}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
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
      )}

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
