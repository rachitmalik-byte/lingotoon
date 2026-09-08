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
      className="w-full bg-gradient-to-br from-[#FFFDF9] via-[#FFF9EE] to-[#FFF2DA] rounded-[3.2rem] p-7 sm:p-11 shadow-[0_20px_55px_rgba(245,158,11,0.18)] border-2 border-amber-300/70 relative overflow-hidden select-none"
    >
      {/* Radiant Fluid Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-300/35 via-orange-200/25 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-yellow-300/25 via-amber-200/20 to-transparent rounded-full blur-2xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

      {/* Floating Sparkle Micro-accents */}
      <div className="absolute top-8 right-12 text-amber-400/60 font-black text-xl pointer-events-none">✦</div>
      <div className="absolute bottom-10 right-28 text-orange-400/50 font-black text-sm pointer-events-none">✦</div>
      <div className="absolute top-1/2 left-8 text-yellow-500/50 font-black text-base pointer-events-none">✦</div>

      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
        
        {/* Mascot Golden Halo Display (Zero Emojis) */}
        <div className="w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0 relative">
          {/* Pulsing Ambient Halo */}
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-amber-400 via-orange-400 to-yellow-300 blur-lg opacity-40 animate-pulse" />
          
          <div className="w-full h-full rounded-[2.8rem] overflow-hidden bg-gradient-to-tr from-amber-300 via-orange-300 to-yellow-200 p-2 shadow-xl border-4 border-white relative">
            <img 
              src="/images/mascot_lingo_hero.jpg" 
              alt="Lingo Quest Guide Mascot" 
              className="w-full h-full object-cover rounded-[2.3rem]" 
            />
          </div>

          {/* Bespoke 3D Vector Golden Crown (Replaced Emoji) */}
          <motion.div 
            animate={{ y: [0, -5, 0], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-3 -right-3 w-13 h-13 rounded-full bg-white shadow-lg border-2 border-amber-300 flex items-center justify-center p-1.5"
            title="Golden Explorer Crown"
          >
            <GoldenCrownVector />
          </motion.div>
        </div>

        {/* Challenge Content & Interactive Controls */}
        <div className="flex-1 w-full text-center lg:text-left space-y-5">
          <div>
            <div className="inline-flex items-center gap-2 font-display text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200/70 border border-amber-300/80 px-4 py-1.5 rounded-full mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-current" />
              <span>Daily Golden Quest</span>
            </div>
            
            <h3 className="font-display font-black text-3xl sm:text-4xl text-neutral-900 leading-tight tracking-tight">
              {challenge.title}
            </h3>
            
            <p className="font-body text-base sm:text-lg text-neutral-600 mt-1.5 max-w-xl font-medium">
              {challenge.description}
            </p>
          </div>

          {/* Clay Milestone Tracker Capsule */}
          <div className="bg-white rounded-[2rem] p-5 border-2 border-amber-200/80 shadow-[0_12px_28px_rgba(245,158,11,0.12),inset_3px_3px_6px_rgba(255,255,255,0.95),inset_-4px_-4px_8px_rgba(245,158,11,0.06)] max-w-xl">
            <div className="flex justify-between items-center mb-2.5 font-display font-black text-xs sm:text-sm">
              <span className="text-neutral-700 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Vocabulary Words Found</span>
              </span>
              <span className="text-brand-orange font-black text-sm">
                {wordsFound} of {totalWords} Words
              </span>
            </div>
            
            <div className="w-full bg-amber-100/70 rounded-full h-3.5 p-0.5 overflow-hidden shadow-inner mb-3">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 shadow-xs"
              />
            </div>

            {/* Word Discovery Step Chips */}
            <div className="flex items-center justify-between gap-1.5 pt-1">
              {[...Array(totalWords)].map((_, idx) => (
                <div 
                  key={idx}
                  className={`flex-1 py-1 px-2 rounded-lg text-center font-display font-extrabold text-[11px] transition-all flex items-center justify-center gap-1 ${
                    idx < wordsFound 
                      ? 'bg-amber-500 text-white shadow-xs' 
                      : 'bg-amber-100/60 text-amber-700/60 border border-amber-200/50'
                  }`}
                >
                  {idx < wordsFound ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" />
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
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
            <Link 
              to="/game/play/word-builder" 
              onClick={() => sounds.playCorrect()}
              className="w-full sm:w-auto"
            >
              <motion.button 
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="clay-btn-orange w-full sm:w-auto px-9 py-4 text-white font-display font-black text-base flex items-center justify-center gap-2.5 cursor-pointer uppercase tracking-wider"
              >
                <span>ACCEPT QUEST</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform stroke-[3]" />
              </motion.button>
            </Link>
            
            {/* Clay Reward Badge */}
            <div className="clay-pill text-amber-950 font-display font-black text-xs sm:text-sm px-5 py-3.5 inline-flex items-center justify-center gap-2 border-2 border-amber-200 shadow-[0_6px_16px_rgba(245,158,11,0.12),inset_2px_2px_4px_rgba(255,255,255,0.95)]">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Reward: +50 XP & Golden Explorer Badge</span>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default ChallengeCard;
