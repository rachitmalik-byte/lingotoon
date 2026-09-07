import React from 'react';
import { motion } from 'framer-motion';

const StreakCounter = ({ currentStreak = 0, longestStreak = 0 }) => {
  const hasStreak = currentStreak > 0;
  const isHighStreak = currentStreak >= 7;

  return (
    <div className="flex flex-col items-center bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-shadow border border-neutral-100 min-w-[140px]">
      <div className="flex items-center space-x-3 mb-1">
        <motion.div 
          className="relative"
          animate={hasStreak ? { rotate: [-5, 5, -5] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Custom Fire SVG */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={!hasStreak ? "opacity-30 grayscale" : ""}>
            <path d="M16 29C22.6274 29 28 23.6274 28 17C28 12 24 8 24 8C24 8 25.5 13 22 17C20.4079 18.8197 19 19 19 19C19 19 20 15 17 9C16.1493 7.29853 14 3 14 3C14 3 13 7.5 9 12C5.97538 15.4026 4 17 4 17C4 23.6274 9.37258 29 16 29Z" fill={hasStreak ? "#F97316" : "#9CA3AF"} />
            <path d="M16.5 28C20.6421 28 24 24.6421 24 20.5C24 17 22 14 22 14C22 14 22.5 17.5 20.5 19.5C19.1672 20.8328 18 21 18 21C18 21 19 18.5 17 14.5C16 12 15 9 15 9C15 9 14 12.5 11.5 15.5C9.72895 17.6256 9 19 9 19C9 24.6421 12.3579 28 16.5 28Z" fill={hasStreak ? "#FACC15" : "#D1D5DB"} />
          </svg>
          
          {/* Sparkles for high streak */}
          {isHighStreak && (
            <motion.div 
              className="absolute -top-2 -right-2 text-brand-yellow"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </motion.div>
          )}
        </motion.div>

        <div className="flex flex-col items-start leading-none">
          <span className={`font-display text-3xl font-bold ${hasStreak ? 'text-brand-orange' : 'text-neutral-400'}`}>
            {currentStreak}
          </span>
          <span className="font-body text-xs font-semibold text-neutral-500 uppercase tracking-wide mt-0.5">
            Day Streak
          </span>
        </div>
      </div>

      <div className="w-full mt-2 pt-2 border-t border-neutral-100 text-center">
        <span className="font-body text-xs text-neutral-400">
          Best: <strong className="text-neutral-600">{longestStreak}</strong>
        </span>
      </div>
    </div>
  );
};

export default StreakCounter;
