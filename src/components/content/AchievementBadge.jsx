import React, { useState } from 'react';
import { Lock, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import ProgressBar from '../ui/ProgressBar';
import AchievementModal from '../modals/AchievementModal';
import { sounds } from '../../utils/soundEffects';

const AchievementBadge = ({ achievement, size = 'md' }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const isUnlocked = achievement.unlocked;

  const handleClick = () => {
    sounds.playPop();
    setModalOpen(true);
  };

  return (
    <>
      <AchievementModal 
        achievement={achievement} 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />

      <div 
        onClick={handleClick}
        className="flex flex-col items-center gap-2.5 group cursor-pointer select-none"
      >
        <motion.div 
          whileHover={{ scale: 1.1, rotate: [0, 4, -4, 0] }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 350, damping: 18 }}
          className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
            isUnlocked 
              ? 'bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-400 border-4 border-white shadow-xl group-hover:shadow-amber-400/40' 
              : 'bg-neutral-100 border-4 border-neutral-200/80 opacity-70 group-hover:opacity-100'
          }`}
        >
          {isUnlocked ? (
            <>
              <span className="text-3xl sm:text-4xl filter drop-shadow-sm select-none">
                {achievement.icon || '🌟'}
              </span>
              {/* Shimmer light sweep */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Lock className="w-7 h-7 text-neutral-400" />
            </div>
          )}
        </motion.div>

        <div className="text-center w-full max-w-[120px]">
          <h4 className={`text-xs sm:text-sm font-display font-extrabold leading-tight ${isUnlocked ? 'text-neutral-900 group-hover:text-brand-purple' : 'text-neutral-400'}`}>
            {achievement.title}
          </h4>
          
          {isUnlocked ? (
            <span className="text-[10px] font-display font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full mt-1 inline-block">
              ✨ Unlocked!
            </span>
          ) : (
            <span className="text-[10px] font-display font-semibold text-neutral-400 mt-0.5 block">
              Tap to preview
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default AchievementBadge;
