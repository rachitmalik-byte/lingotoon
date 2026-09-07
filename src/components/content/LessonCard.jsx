import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Star, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import { lessonThumbnailColors } from '../../data/lessons';
import { sounds } from '../../utils/soundEffects';

const LessonVectorEmblem = ({ type }) => {
  switch (type) {
    case 'letters':
      return (
        <svg viewBox="0 0 44 44" className="w-11 h-11" fill="none">
          <rect x="4" y="5" width="36" height="34" rx="10" fill="#7C3AED" />
          <rect x="6" y="7" width="32" height="30" rx="8" fill="#6D28D9" />
          <text x="22" y="27" textAnchor="middle" fill="#FFFFFF" fontFamily="Fredoka, sans-serif" fontWeight="900" fontSize="17" letterSpacing="0.5">Aa</text>
          <circle cx="11" cy="12" r="2.5" fill="#FFFFFF" fillOpacity="0.4" />
        </svg>
      );
    case 'numbers':
      return (
        <svg viewBox="0 0 44 44" className="w-11 h-11" fill="none">
          <rect x="4" y="5" width="36" height="34" rx="10" fill="#F59E0B" />
          <rect x="6" y="7" width="32" height="30" rx="8" fill="#D97706" />
          <text x="22" y="27" textAnchor="middle" fill="#FFFFFF" fontFamily="Fredoka, sans-serif" fontWeight="900" fontSize="16">123</text>
          <circle cx="11" cy="12" r="2.5" fill="#FFFFFF" fillOpacity="0.4" />
        </svg>
      );
    case 'plant':
      return (
        <svg viewBox="0 0 44 44" className="w-11 h-11" fill="none">
          <rect x="4" y="5" width="36" height="34" rx="10" fill="#10B981" />
          <rect x="6" y="7" width="32" height="30" rx="8" fill="#059669" />
          <path d="M22 30V19M22 19C17 19 14 14 14 14C14 14 19 13 22 19ZM22 19C27 19 30 14 30 14C30 14 25 13 22 19Z" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="22" cy="30" rx="5.5" ry="2.2" fill="#34D399" />
          <circle cx="11" cy="12" r="2.5" fill="#FFFFFF" fillOpacity="0.4" />
        </svg>
      );
    case 'rhyming':
      return (
        <svg viewBox="0 0 44 44" className="w-11 h-11" fill="none">
          <rect x="4" y="5" width="36" height="34" rx="10" fill="#EC4899" />
          <rect x="6" y="7" width="32" height="30" rx="8" fill="#DB2777" />
          <path d="M17 28V17L28 14V25M17 28A3.5 3.5 0 1113.5 24.5A3.5 3.5 0 0117 28ZM28 25A3.5 3.5 0 1124.5 21.5A3.5 3.5 0 0128 25Z" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="11" cy="12" r="2.5" fill="#FFFFFF" fillOpacity="0.4" />
        </svg>
      );
    case 'addition':
      return (
        <svg viewBox="0 0 44 44" className="w-11 h-11" fill="none">
          <rect x="4" y="5" width="36" height="34" rx="10" fill="#EA580C" />
          <rect x="6" y="7" width="32" height="30" rx="8" fill="#C2410C" />
          <path d="M22 14V30M14 22H30" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="11" cy="12" r="2.5" fill="#FFFFFF" fillOpacity="0.4" />
        </svg>
      );
    case 'senses':
    default:
      return (
        <svg viewBox="0 0 44 44" className="w-11 h-11" fill="none">
          <rect x="4" y="5" width="36" height="34" rx="10" fill="#0284C7" />
          <rect x="6" y="7" width="32" height="30" rx="8" fill="#0369A1" />
          <path d="M13 22C13 22 16.5 15 22 15C27.5 15 31 22 31 22C31 22 27.5 29 22 29C16.5 29 13 22 13 22Z" stroke="#FFFFFF" strokeWidth="2.4" />
          <circle cx="22" cy="22" r="3.5" fill="#FFFFFF" />
          <circle cx="11" cy="12" r="2.5" fill="#FFFFFF" fillOpacity="0.4" />
        </svg>
      );
  }
};

const LessonCard = ({ lesson }) => {
  if (!lesson) return null;

  const isCompleted = lesson.progress === 100;
  const colors = lessonThumbnailColors[lesson.thumbnail] || { bg: '#7C3AED', accent: '#FACC15' };

  return (
    <Link 
      to={`/learn?subject=${lesson.subject.toLowerCase()}`} 
      onClick={() => sounds.playPop()}
      className="block group w-full min-w-[310px] max-w-[400px] select-none"
    >
      <motion.div 
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
        className="bg-white rounded-[2.2rem] p-4 sm:p-5 shadow-card hover:shadow-xl border-2 border-neutral-100 hover:border-brand-purple/30 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
      >
        {/* Background Soft Glow */}
        <div 
          className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-15 pointer-events-none"
          style={{ backgroundColor: colors.bg }}
        />

        {/* Card Header: Subject Pill + XP Reward */}
        <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
          <Badge variant="soft" className="font-display font-black text-xs px-3 py-1">
            {lesson.subject}
          </Badge>
          <span className="flex items-center gap-1 font-display font-black text-xs text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full shadow-xs">
            <Star className="w-3 h-3 text-amber-500 fill-current" />
            +30 XP
          </span>
        </div>

        {/* Card Body: Thumbnail & Details */}
        <div className="flex items-center gap-3.5 mb-3.5 relative z-10">
          {/* Vector 3D Emblem Container */}
          <div className="flex-shrink-0 transform group-hover:scale-105 transition-transform duration-300 drop-shadow-md">
            <LessonVectorEmblem type={lesson.thumbnail} />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-display font-black text-base sm:text-lg text-neutral-900 leading-snug truncate group-hover:text-brand-purple transition-colors">
              {lesson.title}
            </h3>
            <p className="font-body text-xs text-neutral-500 mt-1 flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>{lesson.duration}</span>
              <span>•</span>
              <span>Step {lesson.completedSteps || 0} of {lesson.totalSteps || 3}</span>
            </p>
          </div>
        </div>

        {/* Progress Bar & Action Button */}
        <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between gap-3 relative z-10">
          <div className="flex-1">
            <div className="flex justify-between text-[11px] font-display font-extrabold text-neutral-500 mb-1">
              <span>Quest Progress</span>
              <span className="text-brand-purple font-black">{lesson.progress || 0}%</span>
            </div>
            <ProgressBar 
              value={lesson.progress || 0} 
              size="sm" 
              color={isCompleted ? 'green' : 'purple'} 
            />
          </div>

          {/* Action Trigger */}
          <div className="flex-shrink-0">
            {isCompleted ? (
              <div className="w-9 h-9 rounded-full bg-brand-green text-white flex items-center justify-center shadow-md">
                <CheckCircle className="w-4 h-4" />
              </div>
            ) : (
              <div className="px-3.5 py-1.5 rounded-full bg-brand-purple-light group-hover:bg-brand-purple text-brand-purple group-hover:text-white font-display font-black text-xs flex items-center gap-1 transition-all shadow-xs group-hover:shadow-btn">
                <span>Resume</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        </div>

      </motion.div>
    </Link>
  );
};

export default LessonCard;
