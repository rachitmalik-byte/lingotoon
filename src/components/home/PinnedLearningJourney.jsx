import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Music, Volume2, Sparkles, Trophy, Star, ArrowRight, 
  ChevronLeft, ChevronRight, CheckCircle2, Play, 
  Smile, RefreshCw, Award, BookOpen, Crown, Zap, Flame, Heart
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import LingoCharacter from '../decorative/LingoCharacter';

const PinnedLearningJourney = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  // Playable state for Phase 2: Spelling game
  const [placedLetters, setPlacedLetters] = useState([]);
  const targetWord = ['C', 'A', 'T'];
  const hasSolvedWord = placedLetters.join('') === targetWord.join('');

  // 3 Dynamic Stop-Scroll Realms with rich, saturated, vibrant gradients
  const steps = [
    {
      id: 0,
      badge: "PHASE 01 • THE PHONICS BEAT",
      badgeStyle: "bg-white/20 text-purple-200 border-2 border-purple-300/60 shadow-md",
      title: "Sing & Spark",
      headline: "Sing Along with Living 3D Letter Friends",
      hook: "Children unlock phonics and vowels effortlessly through animated musical rhymes and joyful singing cartoon characters.",
      bgGradient: "from-[#2E1065] via-[#581C87] to-[#7E22CE]",
      accentColor: "#C084FC",
      tabActive: "bg-white text-purple-950 font-black shadow-xl scale-105 border-2 border-white",
      tabInactive: "text-white/80 hover:text-white hover:bg-white/15",
      cta: "Explore Video Songs",
      link: "/videos",
      mascotTip: "Tap the colorful piano letter keys to hear each animal friend sing!",
      perks: [
        { icon: Music, title: "Catchy Musical Earworms", desc: "Melodies turn abstract vowel & consonant sounds into songs kids sing by heart." },
        { icon: Sparkles, title: "Dancing 3D Letters", desc: "Animated letter friends jump and dance to physically connect visual shapes to sound." }
      ]
    },
    {
      id: 1,
      badge: "PHASE 02 • THE WORD WORKSHOP",
      badgeStyle: "bg-white/20 text-amber-200 border-2 border-amber-300/60 shadow-md",
      title: "Tap & Spell",
      headline: "Tactile Word Puzzles & Letter Snapping",
      hook: "Active problem-solving turns abstract letters into satisfying, hands-on spelling victories with instant positive feedback.",
      bgGradient: "from-[#7C2D12] via-[#C2410C] to-[#EA580C]",
      accentColor: "#FDBA74",
      tabActive: "bg-white text-orange-950 font-black shadow-xl scale-105 border-2 border-white",
      tabInactive: "text-white/80 hover:text-white hover:bg-white/15",
      cta: "Play Word Arcade",
      link: "/games",
      mascotTip: "Tap the chunky letter blocks below in order to complete the word CAT!",
      perks: [
        { icon: Zap, title: "Physical Clay Letter Blocks", desc: "Chunky tactile letter tiles snap into word slots with satisfying haptic feedback." },
        { icon: Award, title: "Instant XP & Star Confetti", desc: "Every solved word sparkles with animated stars, cheering praise, and level points." }
      ]
    },
    {
      id: 2,
      badge: "PHASE 03 • THE HERO REWARD",
      badgeStyle: "bg-white/20 text-emerald-200 border-2 border-emerald-300/60 shadow-md",
      title: "Trophy Vault",
      headline: "Celebrate Milestones in the Golden Vault",
      hook: "Every chapter conquered rewards children with collectible trophies, celebratory fanfare, and printable achievement diplomas.",
      bgGradient: "from-[#064E3B] via-[#047857] to-[#059669]",
      accentColor: "#6EE7B7",
      tabActive: "bg-white text-emerald-950 font-black shadow-xl scale-105 border-2 border-white",
      tabInactive: "text-white/80 hover:text-white hover:bg-white/15",
      cta: "View My Badges",
      link: "/progress",
      mascotTip: "Tap any golden milestone trophy to trigger celebratory triumph fanfares!",
      perks: [
        { icon: Trophy, title: "24 Collectible Royal Badges", desc: "Earn gleaming gold medals, weekly flame crowns, and secret explorer badges." },
        { icon: Crown, title: "Daily Quest Streaks on Fire", desc: "Build consistent learning habits with playful daily 5-minute adventure quests." }
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
      {/* 
        PERFECT RATIO STICKY VIEWPORT CANVAS
        Vibrant, rich, high-contrast, magical stop-scroll journey with mascot presence
      */}
      <div 
        className={`sticky top-0 h-screen max-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-gradient-to-br ${current.bgGradient} transition-all duration-700 px-4 sm:px-6 md:px-10 pt-16 sm:pt-20 pb-3 z-20`}
      >
        {/* Dynamic Background Atmosphere Orbs & Twinkling Stars */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/15 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-black/25 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />

        {/* Floating Twinkling Stars */}
        <div className="absolute top-24 left-[10%] text-yellow-200/60 font-black text-2xl pointer-events-none select-none drop-shadow">✦</div>
        <div className="absolute top-36 right-[8%] text-amber-200/50 font-black text-xl pointer-events-none select-none drop-shadow">★</div>
        <div className="absolute bottom-24 left-[5%] text-yellow-300/50 font-black text-lg pointer-events-none select-none drop-shadow">✦</div>
        <div className="absolute bottom-28 right-[12%] text-white/40 font-black text-xl pointer-events-none select-none drop-shadow">★</div>

        {/* TOP COMPACT HUD (CLEARS NAVBAR PERFECTLY) */}
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-3 relative z-10 shrink-0 mb-2">
          
          {/* Left: Clean Brand & Phase indicator */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-display font-black tracking-wider uppercase px-3 py-1 rounded-full bg-black/30 text-white border border-white/30 shadow-xs">
                Phase {current.id + 1} of 3
              </span>
              <h3 className="font-display font-black text-sm sm:text-base text-white hidden sm:inline-block drop-shadow-sm">
                {current.title}
              </h3>
            </div>
          </div>

          {/* Right: Phase selector pills */}
          <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-full border border-white/25 shadow-lg">
            {steps.map((step, idx) => {
              const isCurrent = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => { sounds.playPop(); setActiveStep(idx); }}
                  className={`px-3 sm:px-4 py-1 rounded-full font-display font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                    isCurrent ? step.tabActive : step.tabInactive
                  }`}
                >
                  <span>{step.title}</span>
                  {isCurrent && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
                </button>
              );
            })}
          </div>

        </div>

        {/* MAIN BALANCED STAGE (2-COLUMN ON TABLET & DESKTOP: md:grid-cols-12) */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10 flex-1 min-h-0 my-auto py-2 overflow-hidden">
          
          {/* LEFT COLUMN: NARRATIVE, 2 STORY FOCUS POINTS & ACTION ROW */}
          <div className="md:col-span-6 flex flex-col justify-center space-y-3 sm:space-y-4 text-white">
            
            {/* Phase Tag */}
            <div>
              <span className={`text-xs font-display font-black tracking-wider px-3.5 py-1 rounded-full ${current.badgeStyle}`}>
                {current.badge}
              </span>
            </div>

            {/* Headline & Story Hook */}
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.35)]">
                {current.headline}
              </h2>
              <p className="font-body text-sm sm:text-base text-white/95 font-medium leading-relaxed drop-shadow-sm mt-1 max-w-lg">
                {current.hook}
              </p>
            </div>

            {/* 2 Tactile Vibrant Feature Cards */}
            <div className="space-y-2 py-0.5">
              {current.perks.slice(0, 2).map((perk, pIdx) => {
                const Icon = perk.icon;
                return (
                  <div 
                    key={pIdx} 
                    className="p-3 sm:p-3.5 rounded-2xl bg-white text-neutral-900 hover:bg-amber-50/90 border-2 border-amber-300 shadow-xl flex items-center gap-3.5 transition-all group backdrop-blur-md"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-amber-950 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-amber-950 fill-current" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-display font-black text-sm sm:text-base text-neutral-900 leading-tight">
                        {perk.title}
                      </h4>
                      <p className="font-body text-xs sm:text-sm text-neutral-600 font-bold leading-snug mt-0.5">
                        {perk.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA & Next/Prev Controls - 100% IN-VIEW ACTION ROW */}
            <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <Link to={current.link} onClick={() => sounds.playPop()}>
                  <button className="px-7 py-3 rounded-full bg-white hover:bg-amber-300 text-neutral-950 font-display font-black text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer border-2 border-white">
                    <span>{current.cta}</span>
                    <ArrowRight className="w-4 h-4 text-neutral-950 stroke-[3]" />
                  </button>
                </Link>
                <div className="hidden lg:flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-white/20 border border-white/35 text-xs text-white">
                  <span className="font-black text-yellow-300">🦉 Tip:</span>
                  <span className="truncate max-w-[200px]">{current.mascotTip}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={goToPrev}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/35 border-2 border-white/40 flex items-center justify-center text-white transition-all cursor-pointer shadow-md active:scale-95"
                  title="Previous Step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goToNext}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/35 border-2 border-white/40 flex items-center justify-center text-white transition-all cursor-pointer shadow-md active:scale-95"
                  title="Next Step"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: RICH PLAYABLE SHOWCASE DECK WITH MASCOT */}
          <div className="md:col-span-6 flex flex-col items-center justify-center my-auto">
            
            {/* ================= STAGE 0: SING & SPARK ================= */}
            {activeStep === 0 && (
              <motion.div 
                key="stage-sing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-lg bg-white/15 backdrop-blur-xl border-3 border-white/40 rounded-[2.8rem] p-5 sm:p-7 text-center text-white shadow-2xl relative overflow-hidden"
              >
                {/* Floating Mascot Companion */}
                <div className="absolute -top-2 -right-2 transform scale-75 sm:scale-85 pointer-events-none drop-shadow-xl">
                  <LingoCharacter pose="celebrate" size="sm" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-yellow-400 text-neutral-900 font-display font-black text-xs shadow-md border-2 border-white mb-2">
                  <Music className="w-3.5 h-3.5 fill-current" />
                  <span>Interactive Phonics Chimes</span>
                </div>

                <h4 className="font-display font-black text-white text-lg sm:text-xl mb-1 drop-shadow-md">
                  Tap Letter Friends to Hear Them Sing!
                </h4>
                <p className="font-body text-xs sm:text-sm text-white/90 mb-3.5 font-medium">
                  Each animal buddy sings a harmonious phonics tone:
                </p>

                {/* 4 Interactive Bouncing Letter Friends */}
                <div className="grid grid-cols-4 gap-2 sm:gap-2.5 mb-3.5">
                  {[
                    { letter: 'A', label: 'Apple 🍎', freq: 440, bg: 'bg-gradient-to-br from-rose-500 to-red-600' },
                    { letter: 'B', label: 'Bear 🐻', freq: 523.25, bg: 'bg-gradient-to-br from-blue-500 to-indigo-600' },
                    { letter: 'C', label: 'Cat 🐱', freq: 659.25, bg: 'bg-gradient-to-br from-amber-400 to-orange-500' },
                    { letter: 'D', label: 'Dolphin 🐬', freq: 783.99, bg: 'bg-gradient-to-br from-teal-400 to-emerald-600' }
                  ].map((item, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.08, rotate: i % 2 === 0 ? 4 : -4, y: -2 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => sounds.playTone(item.freq, 0.35)}
                      className={`h-22 sm:h-24 rounded-2xl ${item.bg} text-white shadow-lg flex flex-col items-center justify-center gap-1 cursor-pointer transition-transform border-2 border-white select-none`}
                    >
                      <span className="font-display font-black text-2xl sm:text-3xl leading-none drop-shadow-md">
                        {item.letter}
                      </span>
                      <span className="text-[10px] font-display font-bold bg-black/25 px-1.5 py-0.5 rounded-full shadow-inner">
                        {item.label}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Sound Visualizer Wave & Play Catchy Chime Button */}
                <div className="flex items-center justify-center gap-3 pt-1">
                  <button
                    onClick={playMusicalChime}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-neutral-900 font-display font-black text-xs sm:text-sm shadow-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer border-2 border-white"
                  >
                    <Volume2 className="w-4 h-4 text-purple-950 stroke-[3]" />
                    <span>Play Melodic Chime 🎶</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ================= STAGE 1: TAP & SPELL ================= */}
            {activeStep === 1 && (
              <motion.div 
                key="stage-spell"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-lg bg-white/15 backdrop-blur-xl border-3 border-white/40 rounded-[2.8rem] p-5 sm:p-7 text-center text-white shadow-2xl relative overflow-hidden"
              >
                {/* Floating Mascot Companion */}
                <div className="absolute -top-2 -right-2 transform scale-75 sm:scale-85 pointer-events-none drop-shadow-xl">
                  <LingoCharacter pose="think" size="sm" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-yellow-400 text-neutral-900 font-display font-black text-xs shadow-md border-2 border-white mb-2">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Playable Word Workbench</span>
                </div>

                <h4 className="font-display font-black text-white text-lg sm:text-xl mb-1 drop-shadow-md">
                  Spell the Word: C - A - T 🐱
                </h4>
                <p className="font-body text-xs sm:text-sm text-white/90 mb-3 font-medium">
                  Tap the chunky letter blocks in order to complete the word:
                </p>

                {/* Word Slot Holders */}
                <div className="flex justify-center gap-3 mb-3.5">
                  {targetWord.map((letter, idx) => {
                    const isPlaced = placedLetters[idx];
                    return (
                      <div
                        key={idx}
                        className={`w-16 h-18 sm:w-18 sm:h-20 rounded-2xl flex items-center justify-center font-display font-black text-2xl sm:text-3xl border-3 transition-all ${
                          isPlaced
                            ? 'bg-yellow-400 text-neutral-900 border-white shadow-xl scale-105'
                            : 'bg-white/15 border-dashed border-white/50 text-white/30 shadow-inner'
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
                    className="space-y-2 py-1"
                  >
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500 text-white font-display font-black text-sm shadow-lg border-2 border-white">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>PURR-FECT! +20 XP EARNED! 🐾</span>
                    </div>
                    <div>
                      <button
                        onClick={resetWordGame}
                        className="inline-flex items-center gap-1.5 text-xs font-display font-black text-yellow-300 hover:text-white underline cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Spell Again</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Available Clickable Letters */
                  <div className="flex justify-center gap-3">
                    {['C', 'A', 'T', 'S'].map((letter, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => handleLetterClick(letter)}
                        className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white hover:bg-yellow-300 border-2 border-white text-neutral-900 font-display font-black text-xl sm:text-2xl shadow-xl flex items-center justify-center cursor-pointer transition-colors"
                      >
                        {letter}
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ================= STAGE 2: TROPHY VAULT (VIBRANT ROYAL CHAMPIONS DECK) ================= */}
            {activeStep === 2 && (
              <motion.div 
                key="stage-vault"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-lg bg-gradient-to-br from-white/25 via-white/15 to-emerald-950/40 backdrop-blur-xl border-3 border-amber-300 rounded-[2.8rem] p-5 sm:p-7 text-center text-white shadow-[0_20px_55px_rgba(0,0,0,0.35)] relative overflow-hidden"
              >
                {/* Floating Mascot Companion */}
                <div className="absolute -top-2 -right-2 transform scale-75 sm:scale-85 pointer-events-none drop-shadow-xl">
                  <LingoCharacter pose="celebrate" size="sm" />
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400 text-neutral-950 font-display font-black text-xs shadow-lg border-2 border-white mb-2">
                  <Crown className="w-3.5 h-3.5 text-amber-950 fill-current" />
                  <span>Grand Champions Trophy Vault</span>
                </div>

                <h4 className="font-display font-black text-white text-lg sm:text-2xl mb-1 drop-shadow-md">
                  Collect Glowing Milestone Badges!
                </h4>
                <p className="font-body text-xs sm:text-sm text-emerald-100 mb-3 font-medium">
                  Tap each golden trophy to trigger triumphant celebration fanfare:
                </p>

                {/* 4 Rich, Tactile, Vibrant Milestone Trophy Cards */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3">
                  {[
                    { icon: '🎓', title: 'Phonics Prodigy', desc: 'Mastered 10 songs', xp: '+500 XP' },
                    { icon: '🔥', title: '7-Day Streak', desc: 'Active all week long', xp: '+350 XP' },
                    { icon: '⭐', title: 'Word Wizard', desc: 'Spelled 50 words', xp: '+400 XP' },
                    { icon: '👑', title: 'Lingo Master', desc: 'Level 5 Achieved', xp: '+250 XP' }
                  ].map((trophy, tIdx) => (
                    <motion.div
                      key={tIdx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { sounds.playFanfare(); }}
                      className="p-2.5 sm:p-3 rounded-2xl bg-white hover:bg-amber-50 border-2 border-amber-300 shadow-xl flex items-center gap-2.5 cursor-pointer select-none transition-all group"
                    >
                      <span className="text-2xl sm:text-3xl filter drop-shadow group-hover:scale-110 transition-transform">{trophy.icon}</span>
                      <div className="text-left min-w-0">
                        <div className="font-display font-black text-xs sm:text-sm text-neutral-900 leading-tight truncate">{trophy.title}</div>
                        <div className="text-[10px] text-neutral-600 font-bold leading-tight truncate">{trophy.desc}</div>
                        <div className="text-[10px] font-display font-black text-amber-600 mt-0.5">{trophy.xp}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* XP Claim Bar */}
                <div className="inline-flex items-center justify-center gap-2 py-1.5 px-4 rounded-full bg-amber-400 text-neutral-950 font-display font-black text-xs sm:text-sm shadow-xl border-2 border-white">
                  <Sparkles className="w-3.5 h-3.5 fill-current text-amber-900" />
                  <span>Total XP Available:</span>
                  <span className="text-purple-950 font-black">+1,500 XP</span>
                </div>
              </motion.div>
            )}

          </div>

        </div>

        {/* BOTTOM HUD: COMPACT PROGRESS METER - FULL WIDTH WITH ZERO CLIPPING */}
        <div className="w-full max-w-6xl mx-auto py-1.5 relative z-10 border-t border-white/25 flex items-center justify-between gap-3 text-xs font-display font-bold text-white/90 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-pulse" />
            <span className="hidden sm:inline">Interactive Stop-Scroll Journey:</span>
            <span className="px-2.5 py-0.5 bg-white/20 rounded-full text-white font-black border border-white/40 text-[11px]">
              {activeStep === 0 ? 'Phase 1: Sing & Spark' : activeStep === 1 ? 'Phase 2: Tap & Spell' : 'Phase 3: Trophy Vault 🏆'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-40 sm:w-60">
            <div className="relative w-full h-2.5 bg-black/30 rounded-full overflow-hidden border border-white/30">
              <motion.div 
                className="h-full bg-gradient-to-r from-yellow-300 via-orange-400 to-emerald-300 rounded-full shadow-sm"
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
