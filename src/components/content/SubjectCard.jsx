import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

const SubjectVectorEmblem = ({ subjectId }) => {
  switch (subjectId) {
    case 'english':
      return (
        <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none">
          <rect x="6" y="8" width="52" height="48" rx="16" fill="url(#clay-eng)" />
          <rect x="8" y="10" width="48" height="24" rx="12" fill="white" fillOpacity="0.25" />
          <text x="32" y="41" textAnchor="middle" fill="#FFFFFF" fontFamily="Fredoka, sans-serif" fontWeight="900" fontSize="26" letterSpacing="0.5">Aa</text>
          <circle cx="16" cy="18" r="3.5" fill="#FFFFFF" fillOpacity="0.5" />
          <defs>
            <linearGradient id="clay-eng" x1="6" y1="8" x2="58" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9061F9" />
              <stop offset="1" stopColor="#6C2BD9" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'math':
      return (
        <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none">
          <rect x="6" y="8" width="52" height="48" rx="16" fill="url(#clay-math)" />
          <rect x="8" y="10" width="48" height="24" rx="12" fill="white" fillOpacity="0.25" />
          <text x="32" y="40" textAnchor="middle" fill="#FFFFFF" fontFamily="Fredoka, sans-serif" fontWeight="900" fontSize="22">123</text>
          <path d="M44 18V26M40 22H48" stroke="#FFE066" strokeWidth="3" strokeLinecap="round" />
          <circle cx="16" cy="18" r="3.5" fill="#FFFFFF" fillOpacity="0.5" />
          <defs>
            <linearGradient id="clay-math" x1="6" y1="8" x2="58" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FBBF24" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'science':
      return (
        <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none">
          <rect x="6" y="8" width="52" height="48" rx="16" fill="url(#clay-sci)" />
          <rect x="8" y="10" width="48" height="24" rx="12" fill="white" fillOpacity="0.25" />
          {/* Beaker / Flask */}
          <path d="M28 20V27L20 42C19 44 20.5 46 23 46H41C43.5 46 45 44 44 42L36 27V20H28Z" fill="#34D399" fillOpacity="0.4" stroke="#FFFFFF" strokeWidth="2.8" strokeLinejoin="round" />
          <circle cx="32" cy="38" r="3" fill="#FFFFFF" />
          <circle cx="37" cy="34" r="2" fill="#FFFFFF" />
          <circle cx="16" cy="18" r="3.5" fill="#FFFFFF" fillOpacity="0.5" />
          <defs>
            <linearGradient id="clay-sci" x1="6" y1="8" x2="58" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#34D399" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'general':
      return (
        <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none">
          <rect x="6" y="8" width="52" height="48" rx="16" fill="url(#clay-gen)" />
          <rect x="8" y="10" width="48" height="24" rx="12" fill="white" fillOpacity="0.25" />
          {/* Globe */}
          <circle cx="32" cy="32" r="14" stroke="#FFFFFF" strokeWidth="2.8" />
          <ellipse cx="32" cy="32" rx="6" ry="14" stroke="#FFFFFF" strokeWidth="2.2" />
          <path d="M18 32H46" stroke="#FFFFFF" strokeWidth="2.2" />
          <circle cx="16" cy="18" r="3.5" fill="#FFFFFF" fillOpacity="0.5" />
          <defs>
            <linearGradient id="clay-gen" x1="6" y1="8" x2="58" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#0284C7" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'vocabulary':
      return (
        <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none">
          <rect x="6" y="8" width="52" height="48" rx="16" fill="url(#clay-voc)" />
          <rect x="8" y="10" width="48" height="24" rx="12" fill="white" fillOpacity="0.25" />
          {/* Speech bubble */}
          <path d="M20 23C20 20.8 21.8 19 24 19H40C42.2 19 44 20.8 44 23V35C44 37.2 42.2 39 40 39H30L22 45V39H24C21.8 39 20 37.2 20 35V23Z" fill="#FFFFFF" fillOpacity="0.3" stroke="#FFFFFF" strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M27 29H37M27 34H33" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="16" cy="18" r="3.5" fill="#FFFFFF" fillOpacity="0.5" />
          <defs>
            <linearGradient id="clay-voc" x1="6" y1="8" x2="58" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FB7185" />
              <stop offset="1" stopColor="#E11D48" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'reading':
    default:
      return (
        <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none">
          <rect x="6" y="8" width="52" height="48" rx="16" fill="url(#clay-read)" />
          <rect x="8" y="10" width="48" height="24" rx="12" fill="white" fillOpacity="0.25" />
          {/* Open Book */}
          <path d="M32 26V43M32 26C28 23 21 23 17 25V42C21 40 28 40 32 43M32 26C36 23 43 23 47 25V42C43 40 36 40 32 43" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16" cy="18" r="3.5" fill="#FFFFFF" fillOpacity="0.5" />
          <defs>
            <linearGradient id="clay-read" x1="6" y1="8" x2="58" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#818CF8" />
              <stop offset="1" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
        </svg>
      );
  }
};

const clayThemes = {
  english: {
    gradient: 'from-[#7C3AED] to-[#581CB8]',
    shadowColor: 'rgba(88, 28, 184, 0.45)',
    accentPill: 'bg-amber-300 text-neutral-900',
    count: '14 Quests',
  },
  math: {
    gradient: 'from-[#F59E0B] to-[#EA580C]',
    shadowColor: 'rgba(234, 88, 12, 0.45)',
    accentPill: 'bg-white text-neutral-900',
    count: '18 Quests',
  },
  science: {
    gradient: 'from-[#10B981] to-[#059669]',
    shadowColor: 'rgba(5, 150, 105, 0.45)',
    accentPill: 'bg-emerald-100 text-emerald-950',
    count: '12 Quests',
  },
  general: {
    gradient: 'from-[#0284C7] to-[#0369A1]',
    shadowColor: 'rgba(2, 132, 199, 0.45)',
    accentPill: 'bg-sky-100 text-sky-950',
    count: '10 Quests',
  },
  vocabulary: {
    gradient: 'from-[#E11D48] to-[#BE123C]',
    shadowColor: 'rgba(225, 29, 72, 0.45)',
    accentPill: 'bg-rose-100 text-rose-950',
    count: '16 Quests',
  },
  reading: {
    gradient: 'from-[#4F46E5] to-[#3730A3]',
    shadowColor: 'rgba(79, 70, 229, 0.45)',
    accentPill: 'bg-indigo-100 text-indigo-950',
    count: '15 Quests',
  },
};

const SubjectCard = ({ subject }) => {
  if (!subject) return null;
  const theme = clayThemes[subject.id] || clayThemes.english;

  return (
    <Link 
      to={`/learn?subject=${subject.id}`} 
      onClick={() => sounds.playPop()}
      className="block group select-none"
    >
      <motion.div 
        whileHover={{ y: -8, scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
        style={{
          boxShadow: `0 18px 32px -8px ${theme.shadowColor}, inset 0 3px 6px 0 rgba(255,255,255,0.45), inset 0 -4px 8px 0 rgba(0,0,0,0.22)`
        }}
        className={`rounded-[2.6rem] p-6 h-[225px] flex flex-col justify-between relative overflow-hidden bg-gradient-to-br ${theme.gradient} text-white transition-all duration-300 border-t border-white/40 border-l border-white/25`}
      >
        {/* Soft Decorative Fluid Highlight */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none -translate-y-1/3 translate-x-1/3" />

        {/* Top Emblem & Quests Pill */}
        <div className="flex justify-between items-start relative z-10">
          <div className="transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
            <SubjectVectorEmblem subjectId={subject.id} />
          </div>

          <span className="font-display font-black text-xs px-3.5 py-1.5 rounded-full bg-black/20 backdrop-blur-md text-white border border-white/20 shadow-xs">
            {theme.count}
          </span>
        </div>

        {/* Bottom Content */}
        <div className="relative z-10">
          <h3 className="font-display font-black text-2xl mb-1 text-white tracking-tight drop-shadow-sm">
            {subject.name}
          </h3>
          
          <p className="font-body text-xs text-white/85 line-clamp-1 mb-3 font-medium">
            {subject.description || 'Explore fascinating lessons and games.'}
          </p>

          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-neutral-900 font-display font-black text-xs shadow-md group-hover:bg-amber-300 transition-colors">
              <span>Explore Island</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <Sparkles className="w-4 h-4 text-white/60 group-hover:text-amber-300 transition-colors" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default SubjectCard;
