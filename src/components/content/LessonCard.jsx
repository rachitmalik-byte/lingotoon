import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Star, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { sounds } from '../../utils/soundEffects';

// Bespoke 3D Vector Emblems with glossy clay highlights and zero emojis
const Lesson3DEmblem = ({ type, accentColor }) => {
  switch (type) {
    case 'letters':
      return (
        <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16" fill="none">
          <defs>
            <linearGradient id="emblem-grad-letters" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333EA" />
              <stop offset="100%" stopColor="#6B21A8" />
            </linearGradient>
            <filter id="shadow-letters" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#581C87" floodOpacity="0.4" />
            </filter>
          </defs>
          <rect x="6" y="8" width="52" height="48" rx="16" fill="url(#emblem-grad-letters)" filter="url(#shadow-letters)" />
          {/* Clay Inner Highlight */}
          <rect x="8" y="10" width="48" height="22" rx="14" fill="#FFFFFF" fillOpacity="0.18" />
          <text x="32" y="39" textAnchor="middle" fill="#FFFFFF" fontFamily="Fredoka, sans-serif" fontWeight="900" fontSize="24" letterSpacing="0.5">Aa</text>
          {/* Sparkle dot */}
          <circle cx="16" cy="18" r="3" fill="#FDE047" />
          <circle cx="48" cy="46" r="2" fill="#FFFFFF" fillOpacity="0.6" />
        </svg>
      );
    case 'numbers':
      return (
        <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16" fill="none">
          <defs>
            <linearGradient id="emblem-grad-numbers" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <filter id="shadow-numbers" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#B45309" floodOpacity="0.4" />
            </filter>
          </defs>
          <rect x="6" y="8" width="52" height="48" rx="16" fill="url(#emblem-grad-numbers)" filter="url(#shadow-numbers)" />
          <rect x="8" y="10" width="48" height="22" rx="14" fill="#FFFFFF" fillOpacity="0.22" />
          <text x="32" y="39" textAnchor="middle" fill="#FFFFFF" fontFamily="Fredoka, sans-serif" fontWeight="900" fontSize="21" letterSpacing="-0.5">123</text>
          <circle cx="16" cy="18" r="3" fill="#FEF08A" />
          <circle cx="48" cy="46" r="2" fill="#FFFFFF" fillOpacity="0.6" />
        </svg>
      );
    case 'plant':
      return (
        <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16" fill="none">
          <defs>
            <linearGradient id="emblem-grad-plant" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <filter id="shadow-plant" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#064E3B" floodOpacity="0.4" />
            </filter>
          </defs>
          <rect x="6" y="8" width="52" height="48" rx="16" fill="url(#emblem-grad-plant)" filter="url(#shadow-plant)" />
          <rect x="8" y="10" width="48" height="22" rx="14" fill="#FFFFFF" fillOpacity="0.2" />
          <path d="M32 44V26M32 26C24 26 20 18 20 18C20 18 28 17 32 26ZM32 26C40 26 44 18 44 18C44 18 36 17 32 26Z" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="32" cy="44" rx="8" ry="3" fill="#6EE7B7" />
          <circle cx="16" cy="18" r="3" fill="#A7F3D0" />
        </svg>
      );
    case 'addition':
      return (
        <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16" fill="none">
          <defs>
            <linearGradient id="emblem-grad-addition" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#C2410C" />
            </linearGradient>
            <filter id="shadow-addition" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#9A3412" floodOpacity="0.4" />
            </filter>
          </defs>
          <rect x="6" y="8" width="52" height="48" rx="16" fill="url(#emblem-grad-addition)" filter="url(#shadow-addition)" />
          <rect x="8" y="10" width="48" height="22" rx="14" fill="#FFFFFF" fillOpacity="0.22" />
          <path d="M32 18V44M19 31H45" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          <circle cx="16" cy="18" r="3" fill="#FED7AA" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16" fill="none">
          <defs>
            <linearGradient id="emblem-grad-default" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
            <filter id="shadow-default" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#075985" floodOpacity="0.4" />
            </filter>
          </defs>
          <rect x="6" y="8" width="52" height="48" rx="16" fill="url(#emblem-grad-default)" filter="url(#shadow-default)" />
          <rect x="8" y="10" width="48" height="22" rx="14" fill="#FFFFFF" fillOpacity="0.2" />
          <circle cx="32" cy="32" r="11" stroke="#FFFFFF" strokeWidth="3" />
          <path d="M26 32H38M32 26V38" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
  }
};

// Subject theme configurations
const subjectStyles = {
  English: {
    cardBg: 'from-purple-500/8 via-white to-purple-50/40',
    borderColor: 'border-purple-200/70 hover:border-purple-400',
    shadow: 'hover:shadow-[0_20px_45px_rgba(124,58,237,0.16)]',
    badgeBg: 'bg-purple-100 text-purple-700',
    btnBg: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white',
    accentHex: '#7C3AED',
  },
  Math: {
    cardBg: 'from-amber-500/8 via-white to-orange-50/40',
    borderColor: 'border-amber-200/70 hover:border-amber-400',
    shadow: 'hover:shadow-[0_20px_45px_rgba(245,158,11,0.16)]',
    badgeBg: 'bg-amber-100 text-amber-800',
    btnBg: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white',
    accentHex: '#F59E0B',
  },
  Science: {
    cardBg: 'from-emerald-500/8 via-white to-emerald-50/40',
    borderColor: 'border-emerald-200/70 hover:border-emerald-400',
    shadow: 'hover:shadow-[0_20px_45px_rgba(16,185,129,0.16)]',
    badgeBg: 'bg-emerald-100 text-emerald-800',
    btnBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white',
    accentHex: '#10B981',
  },
};

const LessonCard = ({ lesson }) => {
  if (!lesson) return null;

  const isCompleted = lesson.progress === 100;
  const theme = subjectStyles[lesson.subject] || subjectStyles.English;

  return (
    <Link 
      to={`/learn?subject=${lesson.subject.toLowerCase()}`} 
      onClick={() => sounds.playPop()}
      className="block group select-none h-full"
    >
      <motion.div 
        whileHover={{ y: -8, scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
        className={`h-full bg-gradient-to-br ${theme.cardBg} rounded-[2.6rem] p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] ${theme.shadow} border-2 ${theme.borderColor} transition-all duration-300 relative overflow-hidden flex flex-col justify-between`}
      >
        {/* Background Ambient Fluid Waves */}
        <div 
          className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: theme.accentHex }}
        />
        <div 
          className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl opacity-15 pointer-events-none"
          style={{ backgroundColor: theme.accentHex }}
        />

        <div>
          {/* Card Top: Subject Chip + Golden Star XP Tag (Zero Emoji) */}
          <div className="flex items-center justify-between gap-2 mb-5 relative z-10">
            <span className={`font-display font-black text-xs px-3.5 py-1 rounded-full shadow-xs ${theme.badgeBg}`}>
              {lesson.subject}
            </span>
            <span className="flex items-center gap-1.5 font-display font-black text-xs text-amber-800 bg-amber-50 border border-amber-200/90 px-3 py-1 rounded-full shadow-xs">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
              <span>+30 XP</span>
            </span>
          </div>

          {/* Visual Showcase: 3D Emblem with Radiant Halo */}
          <div className="flex items-center gap-4 mb-5 relative z-10">
            <div className="relative flex-shrink-0">
              <div 
                className="absolute inset-0 rounded-2xl blur-md opacity-35 transform scale-110"
                style={{ backgroundColor: theme.accentHex }}
              />
              <div className="relative transform group-hover:scale-105 group-hover:rotate-2 transition-transform duration-300">
                <Lesson3DEmblem type={lesson.thumbnail} accentColor={theme.accentHex} />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-display font-black text-xl sm:text-2xl text-neutral-900 leading-snug group-hover:text-brand-purple transition-colors line-clamp-1">
                {lesson.title}
              </h3>
              <p className="font-body text-xs sm:text-sm text-neutral-500 mt-1 flex items-center gap-2 font-semibold">
                <Clock className="w-4 h-4 text-neutral-400" />
                <span>{lesson.duration}</span>
                <span className="text-neutral-300">•</span>
                <span className="text-neutral-600 font-bold">Step {lesson.completedSteps || 0} of {lesson.totalSteps || 3}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Fluid Quest Progress & Tactile Button */}
        <div className="pt-4 border-t border-neutral-100/90 relative z-10 space-y-4">
          <div>
            <div className="flex justify-between items-center text-xs font-display font-bold text-neutral-600 mb-1.5">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-brand-purple" />
                <span>Quest Progress</span>
              </span>
              <span className="font-black text-sm" style={{ color: theme.accentHex }}>
                {lesson.progress || 0}%
              </span>
            </div>
            
            <div className="w-full bg-neutral-100 rounded-full h-3 p-0.5 overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${lesson.progress || 0}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full shadow-xs"
                style={{ backgroundColor: theme.accentHex }}
              />
            </div>
          </div>

          {/* Large Tactile Action Button */}
          <div 
            className={`w-full py-3 sm:py-3.5 px-5 rounded-full font-display font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform group-hover:scale-[1.02] active:scale-95 ${
              isCompleted 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                : theme.btnBg
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Review Quest</span>
              </>
            ) : (
              <>
                <span>Resume Quest</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </div>
        </div>

      </motion.div>
    </Link>
  );
};

export default LessonCard;
