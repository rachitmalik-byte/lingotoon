import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Music, Volume2, Sparkles, Trophy, Star, ArrowRight, 
  ChevronLeft, ChevronRight, CheckCircle2, Play, 
  Smile, RefreshCw, Award, BookOpen, Crown, Zap
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

const PinnedLearningJourney = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  // Playable state for Phase 2: Spelling game
  const [placedLetters, setPlacedLetters] = useState([]);
  const targetWord = ['C', 'A', 'T'];
  const hasSolvedWord = placedLetters.join('') === targetWord.join('');

  // 3 Dynamic Stop-Scroll Realms
  const steps = [
    {
      id: 0,
      badge: "PHASE 01 • THE PHONICS BEAT",
      badgeStyle: "bg-purple-900/60 text-purple-200 border border-purple-400/40 shadow-xs",
      title: "Sing & Spark",
      headline: "Catchy Melodies & Singing Letter Friends",
      hook: "Children absorb letter sounds and vocabulary naturally through animated musical episodes and singing characters.",
      bgGradient: "from-[#1E0B4B] via-[#3B0764] to-[#4C1D95]",
      accentColor: "#A855F7",
      tabActive: "bg-white text-purple-950 font-black shadow-md scale-105",
      tabInactive: "text-white/75 hover:text-white hover:bg-white/10",
      cta: "Explore Video Songs",
      link: "/videos",
      mascotTip: "Tap the bouncy letter friends on the right to hear their phonics chord!",
      perks: [
        { icon: Music, title: "Catchy Rhyme Earworms", desc: "Musical tunes turn vowel and consonant sounds into songs kids sing by heart." },
        { icon: Sparkles, title: "Living 3D Letters", desc: "Animated character letters dance and visually connect shapes to phonetic sounds." },
        { icon: Volume2, title: "Vocal Confidence", desc: "Sing-along repetition trains clear, natural pronunciation without drills." }
      ]
    },
    {
      id: 1,
      badge: "PHASE 02 • THE WORD WORKSHOP",
      badgeStyle: "bg-orange-950/60 text-orange-200 border border-orange-400/40 shadow-xs",
      title: "Tap & Spell",
      headline: "Tactile Word Puzzles & Letter Snapping",
      hook: "Active problem-solving turns abstract phonics into satisfying, hands-on spelling victories with instant positive feedback.",
      bgGradient: "from-[#431407] via-[#9A3412] to-[#C2410C]",
      accentColor: "#FB923C",
      tabActive: "bg-white text-orange-950 font-black shadow-md scale-105",
      tabInactive: "text-white/75 hover:text-white hover:bg-white/10",
      cta: "Play Word Arcade",
      link: "/games",
      mascotTip: "Tap the scrambled letters below in order to spell CAT!",
      perks: [
        { icon: Zap, title: "Physical Clay Blocks", desc: "Chunky letter tiles snap into word slots with satisfying tactile haptics." },
        { icon: Star, title: "Zero Stress Learning", desc: "Gentle audio hints guide kids without timers, pressure, or fail states." },
        { icon: Award, title: "Instant XP Rewards", desc: "Every solved word sparkles with animated stars and confidence-boosting praise." }
      ]
    },
    {
      id: 2,
      badge: "PHASE 03 • THE HERO REWARD",
      badgeStyle: "bg-emerald-950/60 text-emerald-200 border border-emerald-400/40 shadow-xs",
      title: "Trophy Vault",
      headline: "Celebrate Milestones & Glowing Badges",
      hook: "Every chapter conquered rewards children with collectible trophies, celebratory fanfare, and printable achievement certificates.",
      bgGradient: "from-[#022C22] via-[#065F46] to-[#0D9488]",
      accentColor: "#34D399",
      tabActive: "bg-white text-emerald-950 font-black shadow-md scale-105",
      tabInactive: "text-white/75 hover:text-white hover:bg-white/10",
      cta: "View My Badges",
      link: "/progress",
      mascotTip: "Hover or tap on each shiny trophy below to trigger victory fanfares!",
      perks: [
        { icon: Trophy, title: "24 Collectible Badges", desc: "Earn gleaming gold medals, streak crowns, and secret explorer pins." },
        { icon: Crown, title: "Learning Streaks on Fire", desc: "Keep the flame burning with daily 5-minute quests that build study habits." },
        { icon: BookOpen, title: "Story Certificate", desc: "Download & print tangible completion diplomas signed by Lingo Toon!" }
      ]
    }
  ];

  // Musical chime player for Phase 1
  const playMusicalChime = () => {
    sounds.playTone(523.25, 0.18);
    setTimeout(() => sounds.playTone(659.25, 0.18), 120);
    setTimeout(() => sounds.playTone(783.99, 0.28), 240);
  };

  // Letter tap handler for Phase 2 spelling
  const handleLetterClick = (letter) => {
    if (placedLetters.length < 3) {
      sounds.playPop();
      const updated = [...placedLetters, letter];
      setPlacedLetters(updated);
      if (updated.join('') === targetWord.join('')) {
        setTimeout(() => sounds.playFanfare(), 250);
      }
    }
  };

  const resetWordGame = () => {
    sounds.playPop();
    setPlacedLetters([]);
  };

  // Scroll listener for sticky pin phases
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
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
      className="relative h-[220vh] transition-colors duration-700 select-none"
    >
      {/* 
        PERFECT RATIO STICKY VIEWPORT CANVAS
        Calculated to fit 100% comfortably inside standard screens and short viewports (even 500px)
        Zero overflow, zero cutoff of cards or bottom progress bar!
      */}
      <div 
        className={`sticky top-0 h-screen max-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-gradient-to-br ${current.bgGradient} transition-all duration-700 px-4 sm:px-6 md:px-8 pt-18 sm:pt-20 pb-2 z-20`}
      >
        {/* Dynamic Background Atmosphere Orbs */}
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-black/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        {/* TOP COMPACT HUD (CLEARS NAVBAR PERFECTLY) */}
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-2 relative z-10 shrink-0 mb-1">
          
          {/* Left: Clean Brand & Phase indicator */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/20 border border-white/35 flex items-center justify-center text-white shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-display font-black tracking-wider uppercase px-2 py-0.5 rounded-md bg-black/25 text-white/90 border border-white/20">
                Phase {current.id + 1}/3
              </span>
              <h3 className="font-display font-black text-xs sm:text-sm text-white hidden sm:inline-block">
                {current.title}
              </h3>
            </div>
          </div>

          {/* Right: Phase selector pills */}
          <div className="flex items-center gap-1 bg-black/25 p-0.5 rounded-full border border-white/20 shadow-md">
            {steps.map((step, idx) => {
              const isCurrent = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => { sounds.playPop(); setActiveStep(idx); }}
                  className={`px-2.5 py-0.5 rounded-full font-display font-bold text-[11px] sm:text-xs flex items-center gap-1 transition-all duration-300 cursor-pointer ${
                    isCurrent ? step.tabActive : step.tabInactive
                  }`}
                >
                  <span>{step.title}</span>
                  {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-ping" />}
                </button>
              );
            })}
          </div>

        </div>

        {/* MAIN BALANCED STAGE (2-COLUMN ON TABLET & DESKTOP: md:grid-cols-12) */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8 items-center relative z-10 flex-1 min-h-0 my-auto py-1 overflow-hidden">
          
          {/* LEFT COLUMN: NARRATIVE, 2 STORY FOCUS POINTS & ACTION ROW */}
          <div className="md:col-span-6 flex flex-col justify-center space-y-1.5 sm:space-y-2 text-white">
            
            {/* Phase Tag */}
            <div>
              <span className={`text-[10px] font-display font-black tracking-wider px-2.5 py-0.5 rounded-full ${current.badgeStyle}`}>
                {current.badge}
              </span>
            </div>

            {/* Headline & Story Hook */}
            <div>
              <h2 className="font-display font-black text-lg sm:text-xl lg:text-2xl text-white leading-tight drop-shadow-md">
                {current.headline}
              </h2>
              <p className="font-body text-xs text-white/90 font-medium leading-snug line-clamp-1 sm:line-clamp-2 mt-0.5">
                {current.hook}
              </p>
            </div>

            {/* 2 Sleek Tactile Clay Story Feature Cards (Fits Comfortably in Viewport) */}
            <div className="space-y-1.5 py-0.5">
              {current.perks.slice(0, 2).map((perk, pIdx) => {
                const Icon = perk.icon;
                return (
                  <div 
                    key={pIdx} 
                    className="p-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 shadow-2xs transition-all flex items-center gap-2.5 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/25 border border-white/40 text-white flex items-center justify-center shrink-0 group-hover:scale-110 shadow-2xs transition-transform">
                      <Icon className="w-3.5 h-3.5 text-yellow-300" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-display font-bold text-xs text-white leading-tight">
                        {perk.title}
                      </h4>
                      <p className="font-body text-[11px] text-white/80 leading-tight truncate">
                        {perk.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA & Next/Prev Controls - 100% IN-VIEW ACTION ROW */}
            <div className="pt-1 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Link to={current.link} onClick={() => sounds.playPop()}>
                  <button className="px-5 py-2 rounded-full bg-white hover:bg-yellow-300 text-neutral-900 font-display font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0.5 flex items-center gap-1.5 cursor-pointer">
                    <span>{current.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-900 stroke-[3]" />
                  </button>
                </Link>
                <div className="hidden lg:flex items-center gap-1 py-1 px-2.5 rounded-full bg-white/15 border border-white/25 text-[11px] text-white/90">
                  <span className="font-bold text-yellow-300">🦉 Tip:</span>
                  <span className="truncate max-w-[180px]">{current.mascotTip}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={goToPrev}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 flex items-center justify-center text-white transition-all cursor-pointer shadow-xs active:scale-95"
                  title="Previous Step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goToNext}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 flex items-center justify-center text-white transition-all cursor-pointer shadow-xs active:scale-95"
                  title="Next Step"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: PLAYABLE INTERACTION DECK */}
          <div className="md:col-span-6 flex flex-col items-center justify-center my-auto">
            
            {/* ================= STAGE 0: SING & SPARK ================= */}
            {activeStep === 0 && (
              <motion.div 
                key="stage-sing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md text-center text-white relative py-1"
              >
                <div className="inline-block px-3 py-0.5 rounded-full bg-white/25 border border-white/40 text-yellow-300 font-display font-black text-[10px] mb-1.5 shadow-xs">
                  🎹 Interactive Phonics Stage
                </div>

                <h4 className="font-display font-black text-white text-base sm:text-lg mb-0.5 drop-shadow-md">
                  Tap Letters to Hear Them Sing!
                </h4>
                <p className="font-body text-[11px] sm:text-xs text-white/85 mb-2.5 font-medium">
                  Click each character letter to hear pleasant melodic tones:
                </p>

                {/* 3 Interactive Bouncing Letter Cards */}
                <div className="flex justify-center gap-2.5 sm:gap-3 mb-2.5">
                  {[
                    { letter: 'A', label: 'Apple 🍎', freq: 440, bg: 'bg-red-500 hover:bg-red-600' },
                    { letter: 'B', label: 'Bear 🐻', freq: 523.25, bg: 'bg-blue-500 hover:bg-blue-600' },
                    { letter: 'C', label: 'Cat 🐱', freq: 659.25, bg: 'bg-amber-500 hover:bg-amber-600' }
                  ].map((item, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.08, rotate: i % 2 === 0 ? 4 : -4, y: -2 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => sounds.playTone(item.freq, 0.3)}
                      className={`w-16 sm:w-18 md:w-20 h-20 sm:h-22 md:h-24 rounded-2xl ${item.bg} text-white shadow-md flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-transform border-2 border-white select-none`}
                    >
                      <span className="font-display font-black text-2xl sm:text-3xl leading-none drop-shadow-md">
                        {item.letter}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-display font-bold bg-white/30 px-1.5 py-0.5 rounded-full shadow-inner">
                        {item.label}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Play Catchy Chime Button */}
                <button
                  onClick={playMusicalChime}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-neutral-900 font-display font-black text-xs shadow-md transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-purple-900 stroke-[3]" />
                  <span>Play Catchy Chime 🎶</span>
                </button>
              </motion.div>
            )}

            {/* ================= STAGE 1: TAP & SPELL ================= */}
            {activeStep === 1 && (
              <motion.div 
                key="stage-spell"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md text-center text-white relative py-1"
              >
                <div className="inline-block px-3 py-0.5 rounded-full bg-white/25 border border-white/40 text-yellow-300 font-display font-black text-[10px] mb-1.5 shadow-xs">
                  🎮 Playable Word Builder
                </div>

                <h4 className="font-display font-black text-white text-base sm:text-lg mb-0.5 drop-shadow-md">
                  Spell the Word: CAT 🐱
                </h4>
                <p className="font-body text-[11px] sm:text-xs text-white/85 mb-2 font-medium">
                  Tap the letter blocks below in order to complete the word:
                </p>

                {/* Word Slot Holders */}
                <div className="flex justify-center gap-2.5 mb-2.5">
                  {targetWord.map((letter, idx) => {
                    const isPlaced = placedLetters[idx];
                    return (
                      <div
                        key={idx}
                        className={`w-14 h-16 sm:w-16 sm:h-18 rounded-xl flex items-center justify-center font-display font-black text-xl sm:text-2xl border-2 transition-all ${
                          isPlaced
                            ? 'bg-yellow-400 text-neutral-900 border-white shadow-md scale-105'
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
                    className="space-y-1.5"
                  >
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-green-500 text-white font-display font-black text-xs shadow-md">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>PURR-FECT! +20 XP EARNED! 🐾</span>
                    </div>
                    <div>
                      <button
                        onClick={resetWordGame}
                        className="inline-flex items-center gap-1 text-xs font-display font-bold text-yellow-300 hover:text-white underline cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Play Again</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Available Clickable Letters */
                  <div className="flex justify-center gap-2.5">
                    {['C', 'A', 'T'].map((letter, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => handleLetterClick(letter)}
                        className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl bg-white hover:bg-yellow-300 border-2 border-white text-neutral-900 font-display font-black text-lg sm:text-xl shadow-md flex items-center justify-center cursor-pointer transition-colors"
                      >
                        {letter}
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ================= STAGE 2: TROPHY VAULT ================= */}
            {activeStep === 2 && (
              <motion.div 
                key="stage-vault"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md text-center text-white relative py-1"
              >
                <div className="inline-block px-3 py-0.5 rounded-full bg-white/25 border border-white/40 text-yellow-300 font-display font-black text-[10px] mb-1.5 shadow-xs">
                  🏆 Explorer Achievements
                </div>

                <h4 className="font-display font-black text-white text-base sm:text-lg mb-0.5 drop-shadow-md">
                  Collect Glowing Badges!
                </h4>
                <p className="font-body text-[11px] sm:text-xs text-white/85 mb-2 font-medium">
                  Tap each milestone trophy to celebrate:
                </p>

                {/* 4 Interactive Milestone Badges Grid */}
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-2">
                  {[
                    { icon: '🎓', title: 'Phonics Prodigy', desc: 'Completed 10 songs' },
                    { icon: '🔥', title: '7-Day Streak', desc: 'Active all week' },
                    { icon: '⭐', title: 'Word Wizard', desc: 'Spelled 50 words' },
                    { icon: '👑', title: 'Lingo Master', desc: 'Level 5 Achieved' }
                  ].map((trophy, tIdx) => (
                    <motion.div
                      key={tIdx}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => sounds.playCorrect()}
                      className="p-1.5 sm:p-2 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 shadow-2xs flex items-center gap-2 cursor-pointer select-none transition-all"
                    >
                      <span className="text-xl filter drop-shadow-xs">{trophy.icon}</span>
                      <div className="text-left">
                        <div className="font-display font-black text-[11px] text-white leading-tight">{trophy.title}</div>
                        <div className="text-[9px] text-white/75 leading-tight">{trophy.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="inline-flex items-center gap-1.5 py-0.5 px-3 rounded-full bg-white/15 border border-white/20 text-[11px] font-display font-bold text-white">
                  <span>Total XP Available:</span>
                  <span className="text-yellow-300 font-black">+1,500 XP</span>
                </div>
              </motion.div>
            )}

          </div>

        </div>

        {/* BOTTOM HUD: COMPACT PROGRESS METER - ALWAYS VISIBLE WITH ZERO CLIPPING */}
        <div className="w-full max-w-6xl mx-auto py-1 relative z-10 border-t border-white/20 flex items-center justify-between gap-2 text-[11px] font-display font-bold text-white/80 shrink-0 pr-36 sm:pr-44 md:pr-48">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Interactive Stop-Scroll:</span>
            <span className="px-2 py-0.5 bg-white/20 rounded-full text-white font-black border border-white/30 text-[10px]">
              {activeStep === 0 ? 'Phase 1: Sing' : activeStep === 1 ? 'Phase 2: Spell' : 'Phase 3: Vault 🎉'}
            </span>
          </div>

          <div className="flex items-center gap-2 w-36 sm:w-52">
            <div className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden border border-white/30">
              <motion.div 
                className="h-full bg-gradient-to-r from-yellow-300 via-orange-400 to-emerald-300 rounded-full"
                style={{ 
                  width: `${Math.max(15, Math.min(100, (activeStep + 1) * 33.3))}%` 
                }}
                transition={{ duration: 0.35 }}
              />
            </div>
            <span className="text-[11px] font-mono font-black text-white shrink-0">
              {Math.round(((activeStep + 1) / 3) * 100)}%
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PinnedLearningJourney;
