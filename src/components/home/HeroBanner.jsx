import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDeveloper } from '../../context/DeveloperContext';

const HeroBanner = () => {
  const { heroMediaType } = useDeveloper();
  const trackRef = useRef(null);
  const videoRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const targetTimeRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize video and load metadata only when video mode is active
  useEffect(() => {
    if (heroMediaType !== 'video') return;
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.muted = true;
    video.playsInline = true;

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setVideoDuration(video.duration);
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleLoadedMetadata);

    if (video.readyState >= 1 && video.duration) {
      setVideoDuration(video.duration);
    } else {
      video.load();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleLoadedMetadata);
    };
  }, []);

  // Continuous Silky-Smooth Hardware-Accelerated Playback Engine
  useEffect(() => {
    if (heroMediaType !== 'video') return;
    const track = trackRef.current;
    const video = videoRef.current;
    if (!track || !video) return;

    let rafId = null;
    let isVisible = true;

    // Only run when hero is near or inside the viewport to conserve resources
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (!isVisible && !video.paused) {
          video.pause();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(track);

    // Scroll listener updates the target playback time with sub-pixel precision
    const onScroll = () => {
      const rect = track.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      setScrollProgress(progress);

      const duration = video.duration || videoDuration || 10;
      // Target time clamped just shy of end to avoid browser 'ended' event freeze
      targetTimeRef.current = progress * Math.max(0, duration - 0.05);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Continuous 60 FPS animation loop that uses native video.play() and adaptive playbackRate
    const renderLoop = () => {
      const hasMetadata = video && (video.readyState >= 1 || (video.duration && !isNaN(video.duration)));
      if (isVisible && hasMetadata) {
        const targetTime = targetTimeRef.current;
        const currentTime = video.currentTime;
        const diff = targetTime - currentTime;

        // SCENARIO 1: FORWARD SCROLL - Native 60 FPS Hardware Playback
        if (diff > 0.035) {
          if (diff > 1.8) {
            // Extreme scroll jumps (e.g. scrollbar drag or anchor click)
            video.currentTime = targetTime;
          } else {
            // Unpause and let the browser's hardware video decoder play sequentially
            if (video.paused) {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {});
              }
            }

            // Dynamically modulate playbackRate to smoothly track scroll velocity
            // Small delta: 0.8x-1.0x (gentle, natural); Large delta: up to 2.8x (smooth catch-up)
            const adaptiveRate = Math.min(Math.max(0.7 + diff * 1.6, 0.7), 2.8);
            video.playbackRate = adaptiveRate;
          }
        }
        // SCENARIO 2: BACKWARD SCROLL - Smooth Damped Step
        else if (diff < -0.055) {
          if (!video.paused) {
            video.pause();
          }

          if (!video.seeking) {
            if (diff < -1.8) {
              video.currentTime = targetTime;
            } else {
              // Smooth reverse ease without locking the decoder
              video.currentTime = Math.max(0, currentTime + diff * 0.35);
            }
          }
        }
        // SCENARIO 3: AT TARGET REST POSITION - Clean Settle
        else {
          if (!video.paused) {
            video.pause();
          }
        }
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [videoDuration, heroMediaType]);

  const scrollToContent = () => {
    const el = document.getElementById('explore-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full select-none bg-[#591ac0]">
      {/* ================= CONDITIONAL HERO HEADER: IMAGE (NO STOPSCROLL) vs VIDEO (STOPSCROLL) ================= */}
      {heroMediaType === 'image' ? (
        /* STATIC IMAGE HERO SECTION (100% Free Scroll, ZERO Stop-Scroll Pinning) */
        <div className="relative w-full min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex flex-col justify-between items-center overflow-hidden bg-[#591ac0]">
          
          {/* Top Spacer for floating transparent navbar */}
          <div className="w-full h-24 sm:h-28 relative z-10 pointer-events-none" />

          {/* Center Vibrant Hero Artwork Image */}
          <div className="relative z-10 w-full max-w-5xl px-4 flex items-center justify-center my-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative w-full flex items-center justify-center"
            >
              <img
                src="/images/lingo_hero_exact.jpg"
                alt="Lingo Toon - Learn. Play. Explore."
                className="w-full max-w-4xl max-h-[440px] sm:max-h-[500px] object-contain object-center drop-shadow-[0_20px_45px_rgba(0,0,0,0.35)] pointer-events-none select-none rounded-3xl"
              />
            </motion.div>
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
        /* ================= STOP-SCROLL VIDEO SCRUB TRACK (250vh) ================= */
        <div ref={trackRef} className="relative w-full h-[250vh]">
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
                disablePictureInPicture
                disableRemotePlayback
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

            {/* Bottom Gentle Explore Button & Interactive Scroll Indicator */}
            <div className="relative z-30 pb-7 sm:pb-9 flex flex-col items-center gap-2">
              {scrollProgress < 0.1 && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-white font-display font-bold text-xs flex items-center gap-2 shadow-lg mb-1 pointer-events-none"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>Scroll down to play animated intro</span>
                  <ArrowDown className="w-3.5 h-3.5 text-amber-300" />
                </motion.div>
              )}

              <motion.button
                onClick={scrollToContent}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
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
