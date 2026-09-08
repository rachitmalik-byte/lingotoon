import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Award, ArrowRight, CheckCircle2, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProgressBar from '../ui/ProgressBar';
import { sounds } from '../../utils/soundEffects';
import { useUser } from '../../context/UserContext';

// Bespoke 3D Vector Golden Crown SVG with zero emojis
const GoldenCrownVector = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 drop-shadow-lg" fill="none">
    <defs>
      <linearGradient id="crown-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="45%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="crown-gem-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F43F5E" />
        <stop offset="100%" stopColor="#BE123C" />
      </linearGradient>
      <filter id="crown-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#B45309" floodOpacity="0.45" />
      </filter>
    </defs>
    {/* Base Arch */}
    <path 
      d="M7 36C7 34.5 8.5 33 10 33H38C39.5 33 41 34.5 41 36C41 37.5 39.5 39 38 39H10C8.5 39 7 37.5 7 36Z" 
      fill="url(#crown-gold-grad)" 
      filter="url(#crown-glow)"
    />
    <rect x="11" y="34.5" width="26" height="3" rx="1.5" fill="#FEF08A" fillOpacity="0.7" />
    {/* Crown Spikes */}
    <path 
      d="M7 33L10 16L18 26L24 10L30 26L38 16L41 33H7Z" 
      fill="url(#crown-gold-grad)" 
      filter="url(#crown-glow)"
    />
    {/* Highlight Facet */}
    <path 
      d="M24 12L28 25L24 32L20 25L24 12Z" 
      fill="#FEF08A" 
      fillOpacity="0.45"
    />
    {/* Royal Gems on Peaks */}
    <circle cx="24" cy="10" r="3.2" fill="url(#crown-gem-grad)" stroke="#FFFFFF" strokeWidth="1" />
    <circle cx="10" cy="16" r="2.6" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="0.8" />
    <circle cx="38" cy="16" r="2.6" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="0.8" />
    {/* Glimmer Sparkle */}
    <circle cx="22" cy="18" r="1.5" fill="#FFFFFF" />
  </svg>
);

const ChallengeCard = ({ challenge }) => {
  if (!challenge) return null;

  const { user } = useUser();
  const wordsFound = user ? (challenge.wordsFound || challenge.progress || 0) : 0;
  const totalWords = challenge.totalWords || challenge.total || 5;
  const progressPercent = (wordsFound / totalWords) * 100;

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 350, damping: 24 }}
      className="w-full bg-gradient-to-br from-[#FF9F0A] via-[#FF5E00] to-[#E02424] rounded-[3.2rem] p-7 sm:p-11 shadow-[0_24px_60px_rgba(255,94,0,0.38)] border-4 border-amber-300 relative overflow-hidden select-none"
    >
      {/* Radiant Fluid Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/25 rounded-full blur-2xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

      {/* Floating Sparkle Micro-accents */}
      <div className="absolute top-8 right-12 text-yellow-200 font-black text-2xl pointer-events-none drop-shadow">✦</div>
      <div className="absolute bottom-10 right-28 text-yellow-300/80 font-black text-lg pointer-events-none drop-shadow">✦</div>
      <div className="absolute top-1/2 left-8 text-amber-200/80 font-black text-xl pointer-events-none drop-shadow">✦</div>

      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
        
        {/* Mascot Golden Halo Display (Zero Emojis) */}
        <div className="w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0 relative">
          {/* Pulsing Ambient Halo */}
          <div className="absolute inset-0 rounded-[3rem] bg-yellow-300 blur-xl opacity-60 animate-pulse" />
          
          <div className="w-full h-full rounded-[2.8rem] overflow-hidden bg-white p-2.5 shadow-2xl border-4 border-amber-300 relative">
            <img 
              src="/images/mascot_lingo_hero.jpg" 
              alt="Lingo Quest Guide Mascot" 
              className="w-full h-full object-cover rounded-[2.3rem]" 
            />
          </div>

          {/* Bespoke 3D Vector Golden Crown (Replaced Emoji) */}
          <motion.div 
            animate={{ y: [0, -6, 0], rotate: [0, 4, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-white shadow-2xl border-3 border-amber-400 flex items-center justify-center p-1.5 z-20"
            title="Golden Explorer Crown"
          >
            <GoldenCrownVector />
          </motion.div>
        </div>

        {/* Challenge Content & Interactive Controls */}
        <div className="flex-1 w-full text-center lg:text-left space-y-5">
          <div>
            <div className="inline-flex items-center gap-2 font-display text-xs font-black uppercase tracking-wider text-amber-950 bg-amber-200 px-4 py-1.5 rounded-full mb-3 shadow-md border border-white/60">
              <Sparkles className="w-3.5 h-3.5 text-amber-700 fill-current" />
              <span>Daily Golden Quest</span>
            </div>
            
            <h3 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
              {challenge.title}
            </h3>
            
            <p className="font-body text-base sm:text-xl text-amber-100 mt-2 max-w-xl font-bold leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]">
              {challenge.description}
            </p>
          </div>

          {/* High-Contrast Milestone Tracker Capsule */}
          <div className="bg-white rounded-[2.2rem] p-5 sm:p-6 border-2 border-white shadow-[0_16px_36px_rgba(0,0,0,0.2)] max-w-xl">
            <div className="flex justify-between items-center mb-3 font-display font-black text-xs sm:text-sm">
              <span className="text-neutral-900 flex items-center gap-1.5 text-sm sm:text-base">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>Vocabulary Words Found</span>
              </span>
              <span className="text-[#FF5E00] font-black text-sm sm:text-base">
                {wordsFound} of {totalWords} Words
              </span>
            </div>
            
            <div className="w-full bg-amber-100 rounded-full h-4 p-0.5 overflow-hidden shadow-inner mb-3.5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 shadow-sm"
              />
            </div>

            {/* Word Discovery Step Chips */}
            <div className="flex items-center justify-between gap-2 pt-1">
              {[...Array(totalWords)].map((_, idx) => (
                <div 
                  key={idx}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-center font-display font-black text-xs transition-all flex items-center justify-center gap-1 ${
                    idx < wordsFound 
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md' 
                      : 'bg-amber-50 text-amber-800/80 border border-amber-200'
                  }`}
                >
                  {idx < wordsFound ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Found</span>
                    </>
                  ) : (
                    <span>Word {idx + 1}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link 
              to="/game/play/word-builder" 
              onClick={() => sounds.playCorrect()}
              className="w-full sm:w-auto"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-9 py-4 bg-white hover:bg-neutral-50 text-[#D84315] font-display font-black text-base sm:text-lg rounded-full shadow-[0_10px_28px_rgba(0,0,0,0.25)] flex items-center justify-center gap-2.5 cursor-pointer uppercase tracking-wider transition-all border-2 border-white"
              >
                <span>ACCEPT QUEST</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform stroke-[3]" />
              </motion.button>
            </Link>
            
            {/* Saturated Reward Badge */}
            <div className="bg-black/25 backdrop-blur-md text-white font-display font-black text-xs sm:text-sm px-5 py-3.5 rounded-full inline-flex items-center justify-center gap-2 border border-white/30 shadow-lg">
              <Award className="w-4 h-4 text-yellow-300" />
              <span>Reward: +50 XP & Golden Explorer Badge</span>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default ChallengeCard;
