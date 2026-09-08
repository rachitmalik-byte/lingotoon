import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Music, Gamepad2, Award, ArrowRight, ChevronLeft, ChevronRight, 
  Volume2, CheckCircle2, Star, Flame, Trophy, RefreshCw, Zap
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { Link } from 'react-router-dom';

const PinnedLearningJourney = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  // Interactive Mini-Game State for Stage 2 (Word Snap)
  const [placedLetters, setPlacedLetters] = useState([]);
  const [hasSolvedWord, setHasSolvedWord] = useState(false);
  const targetWord = ['C', 'A', 'T'];

  // Handle letter click in Stage 2
  const handleLetterClick = (letter) => {
    if (hasSolvedWord) return;
    sounds.playPop();
    const nextPlaced = [...placedLetters, letter];
    setPlacedLetters(nextPlaced);

    if (nextPlaced.length === targetWord.length) {
      if (nextPlaced.join('') === 'CAT') {
        sounds.playCorrect();
        setHasSolvedWord(true);
      } else {
        sounds.playWrong();
        setTimeout(() => setPlacedLetters([]), 600);
      }
    }
  };

  const resetWordGame = () => {
    sounds.playPop();
    setPlacedLetters([]);
    setHasSolvedWord(false);
  };

  // Play Musical Phonics Chord in Stage 1
  const playMusicalChime = () => {
    sounds.playFanfare();
  };

  const steps = [
    {
      id: 0,
      badge: 'PHASE 01 • THE PHONICS BEAT',
      title: 'Sing & Spark',
      headline: 'Catchy Melodies & Singing Letter Friends',
      hook: 'Children absorb letter sounds and vocabulary naturally through animated musical episodes and singing characters.',
      bgGradient: 'from-[#1E0B4B] via-[#3B0764] to-[#4C1D95]',
      accentColor: '#A855F7',
      tabActive: 'bg-white text-purple-950 font-black shadow-lg shadow-purple-500/30 scale-105',
      tabInactive: 'bg-white/10 text-purple-200 hover:bg-white/20 border border-white/10',
      badgeStyle: 'bg-purple-500/20 text-purple-200 border-purple-400/30',
      perks: [
        { icon: Music, title: 'Catchy Rhyme Earworms', desc: 'Musical tunes turn vowel and consonant sounds into songs kids sing by heart.' },
        { icon: Sparkles, title: 'Living 3D Letters', desc: 'Animated character letters dance and visually connect shapes to phonetic sounds.' },
        { icon: Volume2, title: 'Vocal Confidence', desc: 'Sing-along repetition trains clear, natural pronunciation without drills.' }
      ],
      mascotTip: '“Tap the bouncy letter friends on the right to hear their phonics chord!”',
      link: '/videos',
      cta: 'Explore Video Songs'
    },
    {
      id: 1,
      badge: 'PHASE 02 • TACTILE TOYBOX ARCADE',
      title: 'Tap & Spell',
      headline: 'Drag, Drop & Spell Living Words',
      hook: 'Learning is active, not passive. Kids piece together letter tiles, hear instant audio chimes, and build real spelling triumph.',
      bgGradient: 'from-[#431407] via-[#9A3412] to-[#C2410C]',
      accentColor: '#FB923C',
      tabActive: 'bg-white text-orange-950 font-black shadow-lg shadow-orange-500/30 scale-105',
      tabInactive: 'bg-white/10 text-orange-200 hover:bg-white/20 border border-white/10',
      badgeStyle: 'bg-orange-500/20 text-orange-200 border-orange-400/30',
      perks: [
        { icon: Gamepad2, title: 'Hands-On Tile Arranging', desc: 'Chunky, tactile letter blocks make spelling words as intuitive as building blocks.' },
        { icon: Zap, title: 'Instant Sound Feedback', desc: 'Every placed tile speaks its phonetic sound in real time with delightful chimes.' },
        { icon: Star, title: 'Zero Frustration Fun', desc: 'Gentle hints, celebratory mascot pops, and rewarding feedback keep motivation sky-high.' }
      ],
      mascotTip: '“Try it right now! Tap the letter blocks C, A, and T to solve the puzzle!”',
      link: '/games',
      cta: 'Play Mini-Games'
    },
    {
      id: 2,
      badge: 'PHASE 03 • ADVENTURE CELEBRATION',
      title: 'Trophy Vault',
      headline: 'Collect Shiny Badges & Superpower Streaks',
      hook: 'Short daily micro-adventures foster a lifelong love of learning. Kids celebrate real milestones and build unstoppable confidence.',
      bgGradient: 'from-[#022C22] via-[#065F46] to-[#0D9488]',
      accentColor: '#34D399',
      tabActive: 'bg-white text-emerald-950 font-black shadow-lg shadow-emerald-500/30 scale-105',
      tabInactive: 'bg-white/10 text-emerald-200 hover:bg-white/20 border border-white/10',
      badgeStyle: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30',
      perks: [
        { icon: Trophy, title: '24 Explorer Badges', desc: 'Unlock vibrant collectible badges from Phonics Pioneer to Word Wizard.' },
        { icon: Flame, title: 'Daily Habit Streaks', desc: 'A friendly flame counter encourages just 10 joyful minutes of practice each day.' },
        { icon: Award, title: 'Parent Transparency', desc: 'Clear visibility into vocabulary milestones without ads, tracking, or stress.' }
      ],
      mascotTip: '“Tap any trophy medal on the right to trigger the champion fanfare!”',
      link: '/progress',
      cta: 'View Learning Badges'
    }
  ];

  // Stop-scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollableDistance = rect.height - windowHeight;
      if (scrollableDistance <= 0) return;
      
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
      
      if (scrollProgress < 0.33) {
        setActiveStep(0);
      } else if (scrollProgress < 0.67) {
        setActiveStep(1);
      } else {
        setActiveStep(2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const current = steps[activeStep];

  const goToNext = () => {
    sounds.playPop();
    setActiveStep(s => (s + 1) % steps.length);
  };

  const goToPrev = () => {
    sounds.playPop();
    setActiveStep(s => (s - 1 + steps.length) % steps.length);
  };

  return (
    <section 
      id="stop-scroll-section"
      ref={containerRef} 
      className="relative h-[250vh] transition-colors duration-700 select-none"
    >
      {/* 
        SET IT FREE: FULL-BLEED STICKY VIEWPORT CANVAS WITH DYNAMIC GRADIENTS
        No confining card box! The entire canvas breathes with vivid, dynamic theme colors.
      */}
      <div 
        className={`sticky top-0 min-h-screen w-full flex flex-col justify-between overflow-hidden bg-gradient-to-br ${current.bgGradient} transition-all duration-700 px-4 sm:px-8 pt-24 sm:pt-28 pb-8 z-20`}
      >
        {/* Dynamic Background Atmosphere Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-black/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        {/* Ambient Particle Drift depending on Phase */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {activeStep === 0 && (
            <>
              <motion.span animate={{ y: [-10, 20, -10], x: [0, 10, 0], rotate: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute top-24 left-[10%] text-3xl opacity-30">🎵</motion.span>
              <motion.span animate={{ y: [20, -15, 20], x: [0, -15, 0], rotate: [0, -25, 0] }} transition={{ repeat: Infinity, duration: 7 }} className="absolute top-44 right-[15%] text-4xl opacity-30">🎶</motion.span>
              <motion.span animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.5, 0.2] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute bottom-28 left-[25%] text-2xl text-yellow-300">✨</motion.span>
            </>
          )}
          {activeStep === 1 && (
            <>
              <motion.span animate={{ y: [-15, 15, -15], rotate: [0, 45, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute top-28 left-[12%] text-3xl opacity-30">🧩</motion.span>
              <motion.span animate={{ y: [15, -20, 15], rotate: [0, -30, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute bottom-32 right-[18%] text-3xl opacity-30">✏️</motion.span>
              <motion.span animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 3.5 }} className="absolute top-40 right-[30%] text-2xl text-amber-300">⭐</motion.span>
            </>
          )}
          {activeStep === 2 && (
            <>
              <motion.span animate={{ y: [-20, 10, -20], rotate: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute top-32 left-[15%] text-4xl opacity-35">🏆</motion.span>
              <motion.span animate={{ y: [10, -25, 10], rotate: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 6.5 }} className="absolute bottom-36 right-[12%] text-3xl opacity-30">👑</motion.span>
              <motion.span animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-44 right-[25%] text-2xl text-yellow-300">🌟</motion.span>
            </>
          )}
        </div>

        {/* TOP FLOATING NAVIGATION HUD (SET FREE) */}
        <div className="w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 relative z-10">
          
          {/* Brand/Machine Label */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-lg text-white">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-display font-black tracking-widest text-white/80 uppercase">
                <span>Dynamic 3-Step Stop-Scroll</span>
              </div>
              <h3 className="font-display font-black text-base sm:text-lg text-white leading-tight drop-shadow-sm">
                From First Sounds to Confident Readers
              </h3>
            </div>
          </div>

          {/* Interactive Phase Selector Pills */}
          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md p-1.5 rounded-full border border-white/15 shadow-xl">
            {steps.map((step, idx) => {
              const isCurrent = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => { sounds.playPop(); setActiveStep(idx); }}
                  className={`px-4 py-1.5 rounded-full font-display font-bold text-xs flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                    isCurrent ? step.tabActive : step.tabInactive
                  }`}
                >
                  <span>{step.title}</span>
                  {isCurrent && <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping" />}
                </button>
              );
            })}
          </div>

        </div>

        {/* MAIN SPACIOUS STAGE (FREE-FLOWING DUAL COLUMN) */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center my-auto relative z-10 py-4">
          
          {/* LEFT COLUMN: NARRATIVE & 3 STORY FOCUS POINTS */}
          <div className="lg:col-span-6 space-y-4 text-white">
            
            {/* Phase Badge & Step Count */}
            <div className="flex items-center gap-3">
              <span className={`text-xs font-display font-black tracking-wider px-3.5 py-1 rounded-full border shadow-sm backdrop-blur-md ${current.badgeStyle}`}>
                {current.badge}
              </span>
              <span className="text-xs font-display font-bold px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white/90">
                Step {current.id + 1} of 3
              </span>
            </div>

            {/* Headline & Story Hook */}
            <div>
              <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white leading-tight drop-shadow-md">
                {current.headline}
              </h2>
              <p className="font-body text-sm sm:text-base text-white/85 font-medium mt-2 leading-relaxed max-w-xl">
                {current.hook}
              </p>
            </div>

            {/* 3 Translucent Story Feature Cards */}
            <div className="space-y-2.5 pt-1">
              {current.perks.map((perk, pIdx) => {
                const Icon = perk.icon;
                return (
                  <div 
                    key={pIdx} 
                    className="p-3 sm:p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 shadow-md transition-all flex items-start gap-3.5 group transform hover:translate-x-1 duration-200"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 text-white flex items-center justify-center shrink-0 group-hover:scale-110 shadow-sm transition-transform">
                      <Icon className="w-4 h-4 text-yellow-300" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">
                        {perk.title}
                      </h4>
                      <p className="font-body text-xs text-white/80 leading-snug mt-0.5">
                        {perk.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mascot Tip Speech Balloon */}
            <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-body flex items-center gap-3 shadow-md">
              <span className="font-display font-black text-xs shrink-0 px-2.5 py-1 rounded-lg bg-yellow-400 text-neutral-900 shadow-sm">
                🦉 Lingo Mascot
              </span>
              <span className="font-semibold text-white/95">{current.mascotTip}</span>
            </div>

            {/* CTA & Next/Prev Controls */}
            <div className="pt-2 flex items-center justify-between gap-4">
              <Link to={current.link} onClick={() => sounds.playPop()}>
                <button className="px-7 py-3 rounded-full bg-white hover:bg-yellow-300 text-neutral-900 font-display font-black text-sm shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0.5 flex items-center gap-2.5 cursor-pointer">
                  <span>{current.cta}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-900 stroke-[3]" />
                </button>
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={goToPrev}
                  className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all cursor-pointer shadow-md active:scale-95"
                  title="Previous Step"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNext}
                  className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all cursor-pointer shadow-md active:scale-95"
                  title="Next Step"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: PLAYABLE FREE-FLOATING INTERACTION DECK */}
          <div className="lg:col-span-6 flex justify-center">
            
            {/* ================= STAGE 0: SING & SPARK (MUSICAL JAM) ================= */}
            {activeStep === 0 && (
              <motion.div 
                key="stage-sing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="w-full max-w-lg text-center text-white relative py-2"
              >
                <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-yellow-300 font-display font-black text-xs mb-4 shadow-lg">
                  🎹 Interactive Phonics Stage
                </div>

                <h4 className="font-display font-black text-white text-xl sm:text-2xl mb-1 drop-shadow-md">
                  Tap Letters to Hear Them Sing!
                </h4>
                <p className="font-body text-xs sm:text-sm text-white/85 mb-6 font-medium">
                  Click each character letter friend to hear pleasant melodic tones:
                </p>

                {/* 3 Interactive Bouncing Character Letter Cards */}
                <div className="flex justify-center gap-3 sm:gap-5 mb-6">
                  {[
                    { letter: 'A', label: 'Apple 🍎', freq: 440, bg: 'bg-red-500 hover:bg-red-600' },
                    { letter: 'B', label: 'Bear 🐻', freq: 523.25, bg: 'bg-blue-500 hover:bg-blue-600' },
                    { letter: 'C', label: 'Cat 🐱', freq: 659.25, bg: 'bg-amber-500 hover:bg-amber-600' }
                  ].map((item, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.14, rotate: i % 2 === 0 ? 6 : -6, y: -6 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => sounds.playTone(item.freq, 0.35)}
                      className={`w-24 sm:w-28 h-30 sm:h-34 rounded-3xl ${item.bg} text-white shadow-[0_15px_35px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-transform border-4 border-white select-none`}
                    >
                      <span className="font-display font-black text-4xl sm:text-5xl leading-none drop-shadow-md">
                        {item.letter}
                      </span>
                      <span className="text-[11px] font-display font-bold bg-white/25 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                        {item.label}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Play Catchy Chime Button */}
                <button
                  onClick={playMusicalChime}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-neutral-900 font-display font-black text-xs sm:text-sm shadow-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-purple-900 stroke-[3]" />
                  <span>Play Catchy Chime 🎶</span>
                </button>
              </motion.div>
            )}

            {/* ================= STAGE 1: TAP & SPELL (PLAYABLE WORD SNAP) ================= */}
            {activeStep === 1 && (
              <motion.div 
                key="stage-spell"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="w-full max-w-lg text-center text-white relative py-2"
              >
                <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-yellow-300 font-display font-black text-xs mb-4 shadow-lg">
                  🎮 Playable Word Builder
                </div>

                <h4 className="font-display font-black text-white text-xl sm:text-2xl mb-1 drop-shadow-md">
                  Spell the Word: CAT 🐱
                </h4>
                <p className="font-body text-xs sm:text-sm text-white/85 mb-5 font-medium">
                  Tap the letter blocks below in order to complete the word:
                </p>

                {/* Word Slot Holders */}
                <div className="flex justify-center gap-3 sm:gap-4 mb-6">
                  {targetWord.map((letter, idx) => {
                    const isPlaced = placedLetters[idx];
                    return (
                      <div
                        key={idx}
                        className={`w-20 h-22 sm:w-24 sm:h-26 rounded-3xl flex items-center justify-center font-display font-black text-3xl sm:text-4xl border-4 transition-all ${
                          isPlaced
                            ? 'bg-yellow-400 text-neutral-900 border-white shadow-2xl scale-105'
                            : 'bg-white/10 border-dashed border-white/40 text-white/30 shadow-inner'
                        }`}
                      >
                        {isPlaced || '?'}
                      </div>
                    );
                  })}
                </div>

                {/* Feedback & Actions */}
                {hasSolvedWord ? (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="space-y-3 mb-2"
                  >
                    <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-green-500 text-white font-display font-black text-xs sm:text-sm shadow-xl">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>PURR-FECT! +20 XP EARNED! 🐾</span>
                    </div>
                    <div>
                      <button
                        onClick={resetWordGame}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-display font-bold text-yellow-300 hover:text-white underline cursor-pointer"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Play Again</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Available Clickable Letters */
                  <div className="flex justify-center gap-3 sm:gap-4">
                    {['C', 'A', 'T'].map((letter, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.15, y: -6 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleLetterClick(letter)}
                        className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white hover:bg-yellow-300 border-3 border-white text-neutral-900 font-display font-black text-2xl sm:text-3xl shadow-xl flex items-center justify-center cursor-pointer transition-colors"
                      >
                        {letter}
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ================= STAGE 2: TROPHY VAULT (COLLECTIBLE BADGES) ================= */}
            {activeStep === 2 && (
              <motion.div 
                key="stage-trophy"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="w-full max-w-lg text-center text-white relative py-2"
              >
                <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-yellow-300 font-display font-black text-xs mb-4 shadow-lg">
                  🏆 Explorer Trophy Vault
                </div>

                <h4 className="font-display font-black text-white text-xl sm:text-2xl mb-1 drop-shadow-md">
                  Tap Badges to Celebrate Triumphs!
                </h4>
                <p className="font-body text-xs sm:text-sm text-white/85 mb-5 font-medium">
                  Click any award to hear your victory fanfare:
                </p>

                {/* 3 Collectible Badges */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { icon: Star, title: 'Phonics Star', desc: 'First 10 Songs', color: 'bg-yellow-400 text-neutral-900' },
                    { icon: Flame, title: '7-Day Streak', desc: 'Daily Explorer', color: 'bg-orange-500 text-white' },
                    { icon: Trophy, title: 'Word Wizard', desc: '50 Words Built', color: 'bg-purple-500 text-white' }
                  ].map((b, i) => {
                    const BIcon = b.icon;
                    return (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.12, y: -6 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => sounds.playFanfare()}
                        className="p-4 rounded-3xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 shadow-xl flex flex-col items-center justify-center gap-2 cursor-pointer select-none group transition-all"
                      >
                        <div className={`w-13 h-13 rounded-2xl ${b.color} flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform`}>
                          <BIcon className="w-7 h-7" />
                        </div>
                        <span className="font-display font-black text-xs text-white">
                          {b.title}
                        </span>
                        <span className="text-[10px] text-white/80 font-medium">
                          {b.desc}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-between text-xs font-display font-bold text-white">
                  <span>Explorer Rank: <strong className="text-yellow-300">Level 4 Master</strong></span>
                  <span className="text-emerald-300">100% Kid Safe & Ad-Free</span>
                </div>
              </motion.div>
            )}

          </div>

        </div>

        {/* BOTTOM HUD: SMOOTH SCROLL PROGRESS METER */}
        <div className="w-full max-w-6xl mx-auto pt-2 pb-1 relative z-10 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-display font-bold text-white/80">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive Journey Stop-Scroll:</span>
            <span className="px-3 py-0.5 bg-white/20 rounded-full text-white font-black border border-white/30">
              {activeStep === 0 ? 'Phase 1: Sing' : activeStep === 1 ? 'Phase 2: Spell' : 'Phase 3: Celebrate! 🎉'}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-72">
            <div className="relative w-full h-3 bg-white/20 rounded-full overflow-hidden border border-white/25">
              <motion.div 
                className="h-full bg-gradient-to-r from-yellow-300 via-orange-400 to-emerald-300 rounded-full"
                style={{ 
                  width: `${Math.max(15, Math.min(100, (activeStep + 1) * 33.3))}%` 
                }}
                transition={{ duration: 0.35 }}
              />
            </div>
            <span className="text-xs font-mono font-black text-white shrink-0">
              {Math.round(((activeStep + 1) / 3) * 100)}%
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PinnedLearningJourney;
