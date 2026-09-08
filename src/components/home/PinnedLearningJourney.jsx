import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Music, Gamepad2, Award, ArrowRight, ChevronLeft, ChevronRight, 
  Volume2, CheckCircle2, Star, Flame, Trophy, Play, RefreshCw, Zap, Bookmark
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
      accent: '#7C3AED',
      badgeBg: 'bg-purple-100 text-brand-purple border-purple-200',
      tabActive: 'bg-brand-purple text-white shadow-md scale-105',
      tabInactive: 'bg-white text-neutral-600 hover:bg-purple-50 border-neutral-200',
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
      accent: '#F97316',
      badgeBg: 'bg-orange-100 text-brand-orange border-orange-200',
      tabActive: 'bg-brand-orange text-white shadow-md scale-105',
      tabInactive: 'bg-white text-neutral-600 hover:bg-orange-50 border-neutral-200',
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
      accent: '#F59E0B',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
      tabActive: 'bg-amber-500 text-white shadow-md scale-105',
      tabInactive: 'bg-white text-neutral-600 hover:bg-amber-50 border-neutral-200',
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
      className="relative h-[200vh] bg-gradient-to-b from-[#FAF9F6] via-[#F5F3FF] to-[#FAF9F6] border-b border-purple-100/60"
    >
      {/* 
        STICKY PINNED STAGE:
        Pins cleanly below the floating navbar and smoothly unpins at the end of the 200vh track.
      */}
      <div className="sticky top-20 sm:top-24 md:top-26 flex flex-col justify-start z-20 px-3 sm:px-6">
        <div className="container-app w-full max-w-5xl mx-auto">
          
          {/* THE PLAYFUL ADVENTURE WONDER CAROUSEL CARD */}
          <div className="relative rounded-[2.2rem] sm:rounded-[2.8rem] bg-white border-4 border-purple-100/80 shadow-[0_20px_60px_rgba(124,58,237,0.12)] overflow-hidden transition-all">
            
            {/* TOP INTERACTIVE ADVENTURE DECK HEADER */}
            <div className="bg-gradient-to-r from-purple-50/90 via-white to-amber-50/90 border-b-2 border-purple-100/60 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 relative select-none">
              
              {/* Left Identity */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-9 h-9 rounded-2xl bg-brand-purple text-white flex items-center justify-center shadow-md transform -rotate-3 hover:rotate-0 transition-transform">
                  <Sparkles className="w-5 h-5 text-brand-yellow" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-display font-black text-brand-purple">
                    <span>THE 3-STEP ADVENTURE MACHINE</span>
                  </div>
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-neutral-800">
                    How Kids Go From First Sounds to Confident Readers
                  </h3>
                </div>
              </div>

              {/* Center/Right: Interactive Stage Tabs */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {steps.map((step, idx) => {
                  const isCurrent = activeStep === idx;
                  return (
                    <button
                      key={step.id}
                      onClick={() => { sounds.playPop(); setActiveStep(idx); }}
                      className={`px-3.5 py-1.5 rounded-full font-display font-bold text-xs flex items-center gap-1.5 transition-all duration-300 cursor-pointer border ${
                        isCurrent ? step.tabActive : step.tabInactive
                      }`}
                    >
                      <span>{step.title}</span>
                      {isCurrent && <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MAIN ADVENTURE STAGE INTERIOR */}
            <div className="p-4 sm:p-6 lg:p-7 relative bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                
                {/* LEFT PANEL: NARRATIVE & 3 STORY FOCUS POINTS */}
                <div className="lg:col-span-6 space-y-3.5">
                  
                  {/* Phase Pill Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-display font-black tracking-wider px-3.5 py-1 rounded-full border shadow-xs ${current.badgeBg}`}>
                      {current.badge}
                    </span>
                    <span className="text-[11px] font-display font-bold px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                      Step {current.id + 1} of 3
                    </span>
                  </div>

                  {/* Headline & Hook */}
                  <div>
                    <h2 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-neutral-900 leading-tight">
                      {current.headline}
                    </h2>
                    <p className="font-body text-xs sm:text-sm text-neutral-600 font-medium mt-1">
                      {current.hook}
                    </p>
                  </div>

                  {/* 3 Sequential Focus Points */}
                  <div className="space-y-2 pt-0.5">
                    {current.perks.map((perk, pIdx) => {
                      const Icon = perk.icon;
                      return (
                        <div 
                          key={pIdx} 
                          className="p-2.5 sm:p-3 rounded-2xl bg-neutral-50 hover:bg-purple-50/50 border border-neutral-200/70 hover:border-brand-purple/30 shadow-2xs transition-all flex items-start gap-3 group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-white border border-purple-100 text-brand-purple flex items-center justify-center shrink-0 group-hover:scale-110 shadow-xs transition-transform">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-display font-bold text-xs sm:text-sm text-neutral-900">
                              {perk.title}
                            </h4>
                            <p className="font-body text-[11px] sm:text-xs text-neutral-600 leading-snug">
                              {perk.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* MASCOT SPEECH BALLOON TIP */}
                  <div className="p-2.5 rounded-2xl bg-purple-50/90 border border-purple-200/80 text-brand-purple-dark text-xs font-body flex items-center gap-2 shadow-xs">
                    <span className="font-display font-black text-xs shrink-0 px-2 py-0.5 rounded-lg bg-white border border-purple-200 text-brand-purple">
                      🦉 Lingo
                    </span>
                    <span className="font-semibold">{current.mascotTip}</span>
                  </div>

                  {/* CTA & Controls */}
                  <div className="pt-1 flex items-center justify-between gap-3">
                    <Link to={current.link} onClick={() => sounds.playPop()}>
                      <button className="px-6 py-2.5 rounded-full bg-brand-purple hover:bg-brand-purple-dark text-white font-display font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0.5 flex items-center gap-2 cursor-pointer">
                        <span>{current.cta}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-brand-yellow stroke-[3]" />
                      </button>
                    </Link>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={goToPrev}
                        className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 flex items-center justify-center text-neutral-700 transition-colors cursor-pointer"
                        title="Previous Step"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={goToNext}
                        className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 flex items-center justify-center text-neutral-700 transition-colors cursor-pointer"
                        title="Next Step"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>

                {/* RIGHT PANEL: PLAYABLE INTERACTIVE EXPERIENCES PER STAGE */}
                <div className="lg:col-span-6">
                  
                  {/* ================= STAGE 0: SING & SPARK (MUSICAL JAM) ================= */}
                  {activeStep === 0 && (
                    <motion.div 
                      key="stage-sing"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="relative rounded-3xl p-5 bg-gradient-to-br from-purple-100 via-indigo-50 to-pink-50 border-3 border-purple-200 shadow-lg text-center overflow-hidden"
                    >
                      {/* Floating Musical Notes */}
                      <motion.span 
                        animate={{ y: [-4, 6, -4], rotate: [0, 15, -15, 0] }} 
                        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                        className="absolute top-4 left-5 text-2xl filter drop-shadow select-none"
                      >
                        🎵
                      </motion.span>
                      <motion.span 
                        animate={{ y: [6, -6, 6], rotate: [0, -20, 20, 0] }} 
                        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                        className="absolute top-6 right-6 text-2xl filter drop-shadow select-none"
                      >
                        🎶
                      </motion.span>

                      <div className="inline-block px-3 py-1 rounded-full bg-white/90 border border-purple-200 text-brand-purple font-display font-bold text-xs mb-3 shadow-xs">
                        🎹 Interactive Phonics Stage
                      </div>

                      <h4 className="font-display font-extrabold text-neutral-900 text-base sm:text-lg mb-1">
                        Tap Letters to Hear Them Sing!
                      </h4>
                      <p className="font-body text-xs text-neutral-600 mb-4 font-medium">
                        Click each letter friend to hear pleasant melodic tones:
                      </p>

                      {/* 3 Interactive Bouncing Character Letter Cards */}
                      <div className="flex justify-center gap-3 sm:gap-4 mb-4">
                        {[
                          { letter: 'A', label: 'Apple 🍎', freq: 440, color: 'bg-red-500 hover:bg-red-600' },
                          { letter: 'B', label: 'Bear 🐻', freq: 523.25, color: 'bg-blue-500 hover:bg-blue-600' },
                          { letter: 'C', label: 'Cat 🐱', freq: 659.25, color: 'bg-amber-500 hover:bg-amber-600' }
                        ].map((item, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.12, rotate: i % 2 === 0 ? 5 : -5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => sounds.playTone(item.freq, 0.35)}
                            className={`w-20 sm:w-24 h-24 sm:h-28 rounded-2xl ${item.color} text-white shadow-lg flex flex-col items-center justify-center gap-1 cursor-pointer transition-transform border-3 border-white select-none`}
                          >
                            <span className="font-display font-black text-3xl sm:text-4xl leading-none">
                              {item.letter}
                            </span>
                            <span className="text-[10px] font-display font-bold bg-white/20 px-2 py-0.5 rounded-full">
                              {item.label}
                            </span>
                          </motion.button>
                        ))}
                      </div>

                      {/* Sing Phonics Chords Button */}
                      <button
                        onClick={playMusicalChime}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-purple hover:bg-brand-purple-dark text-white font-display font-bold text-xs shadow-md transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4 text-brand-yellow" />
                        <span>Play Catchy Chime 🎶</span>
                      </button>
                    </motion.div>
                  )}

                  {/* ================= STAGE 1: TAP & SPELL (PLAYABLE MINI-GAME) ================= */}
                  {activeStep === 1 && (
                    <motion.div 
                      key="stage-spell"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="relative rounded-3xl p-5 bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-50 border-3 border-orange-200 shadow-lg text-center overflow-hidden"
                    >
                      <div className="inline-block px-3 py-1 rounded-full bg-white/90 border border-orange-200 text-brand-orange font-display font-bold text-xs mb-3 shadow-xs">
                        🎮 Playable Word Builder
                      </div>

                      <h4 className="font-display font-extrabold text-neutral-900 text-base sm:text-lg mb-1">
                        Spell the Word: CAT 🐱
                      </h4>
                      <p className="font-body text-xs text-neutral-600 mb-3 font-medium">
                        Tap the letter blocks below in order to complete the word:
                      </p>

                      {/* Word Slot Holders */}
                      <div className="flex justify-center gap-3 mb-4">
                        {targetWord.map((letter, idx) => {
                          const isPlaced = placedLetters[idx];
                          return (
                            <div
                              key={idx}
                              className={`w-16 h-18 sm:w-20 sm:h-22 rounded-2xl flex items-center justify-center font-display font-black text-3xl sm:text-4xl border-3 transition-all ${
                                isPlaced
                                  ? 'bg-brand-orange text-white border-white shadow-md scale-105'
                                  : 'bg-white/80 border-dashed border-orange-300 text-orange-200'
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
                          className="space-y-2 mb-2"
                        >
                          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-green text-white font-display font-extrabold text-xs shadow-md">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>PURR-FECT! +20 XP EARNED! 🐾</span>
                          </div>
                          <div>
                            <button
                              onClick={resetWordGame}
                              className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-brand-orange hover:text-orange-700 underline cursor-pointer"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              <span>Play Again</span>
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        /* Available Clickable Letters */
                        <div className="flex justify-center gap-2 sm:gap-3">
                          {['C', 'A', 'T'].map((letter, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleLetterClick(letter)}
                              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white hover:bg-orange-50 border-2 border-orange-300 text-neutral-900 font-display font-black text-2xl shadow-sm flex items-center justify-center cursor-pointer transition-transform"
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
                      transition={{ duration: 0.3 }}
                      className="relative rounded-3xl p-5 bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-50 border-3 border-amber-200 shadow-lg text-center overflow-hidden"
                    >
                      <div className="inline-block px-3 py-1 rounded-full bg-white/90 border border-amber-200 text-amber-800 font-display font-bold text-xs mb-3 shadow-xs">
                        🏆 Explorer Trophy Vault
                      </div>

                      <h4 className="font-display font-extrabold text-neutral-900 text-base sm:text-lg mb-1">
                        Tap Badges to Celebrate Triumphs!
                      </h4>
                      <p className="font-body text-xs text-neutral-600 mb-4 font-medium">
                        Click any award to hear your victory fanfare:
                      </p>

                      {/* 3 Collectible Badges */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                        {[
                          { icon: Star, title: 'Phonics Star', desc: 'First 10 Songs', color: 'bg-brand-yellow text-neutral-900' },
                          { icon: Flame, title: '7-Day Streak', desc: 'Daily Explorer', color: 'bg-brand-orange text-white' },
                          { icon: Trophy, title: 'Word Wizard', desc: '50 Words Built', color: 'bg-brand-purple text-white' }
                        ].map((b, i) => {
                          const BIcon = b.icon;
                          return (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.08, y: -4 }}
                              whileTap={{ scale: 0.92 }}
                              onClick={() => sounds.playFanfare()}
                              className="p-3 rounded-2xl bg-white border-2 border-amber-200/80 shadow-md flex flex-col items-center justify-center gap-1.5 cursor-pointer select-none group"
                            >
                              <div className={`w-11 h-11 rounded-xl ${b.color} flex items-center justify-center shadow-xs group-hover:rotate-6 transition-transform`}>
                                <BIcon className="w-6 h-6" />
                              </div>
                              <span className="font-display font-extrabold text-xs text-neutral-900">
                                {b.title}
                              </span>
                              <span className="text-[10px] text-neutral-500 font-medium">
                                {b.desc}
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>

                      <div className="p-2.5 rounded-2xl bg-white/80 border border-amber-200 flex items-center justify-between text-xs font-display font-bold text-neutral-700">
                        <span>Explorer Rank: <strong className="text-brand-purple">Level 4 Master</strong></span>
                        <span className="text-brand-green">100% Kid Safe & Ad-Free</span>
                      </div>
                    </motion.div>
                  )}

                </div>

              </div>

              {/* BOTTOM SMOOTH SCROLL PROGRESS METER */}
              <div className="mt-4 pt-3 border-t-2 border-dashed border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-display font-bold text-neutral-600">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse" />
                  <span>Adventure Stop-Scroll Ride:</span>
                  <span className="px-2.5 py-0.5 bg-purple-100 border border-purple-200 rounded-lg text-brand-purple font-black">
                    {activeStep === 0 ? 'Step 1: Sing' : activeStep === 1 ? 'Step 2: Spell' : 'Step 3: Celebrate! 🎉'}
                  </span>
                </div>

                {/* Animated Interactive Progress Bar with Mascot Tracker */}
                <div className="flex items-center gap-3 w-full sm:w-64">
                  <div className="relative w-full h-3 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-brand-purple via-brand-orange to-brand-yellow rounded-full"
                      style={{ 
                        width: `${Math.max(15, Math.min(100, (activeStep + 1) * 33.3))}%` 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-brand-purple shrink-0">
                    {Math.round(((activeStep + 1) / 3) * 100)}%
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PinnedLearningJourney;
