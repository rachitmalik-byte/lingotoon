import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Trophy, Star, ShieldCheck } from 'lucide-react';
import Confetti from '../decorative/Confetti';
import { sounds } from '../../utils/soundEffects';

const AchievementModal = ({ achievement, isOpen, onClose }) => {
  if (!isOpen || !achievement) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm select-none">
        <Confetti active={achievement.unlocked} duration={3000} />
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative w-full max-w-sm bg-gradient-to-b from-white via-amber-50/40 to-white rounded-[3rem] shadow-2xl border-4 border-amber-200/80 p-6 text-center space-y-5 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => { sounds.playPop(); onClose(); }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* 3D Medal Pedestal Display */}
          <div className="pt-4 flex justify-center">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 p-1.5 shadow-2xl flex items-center justify-center border-4 border-white animate-bounce-slow">
                <div className="w-full h-full rounded-full bg-amber-100/70 flex items-center justify-center text-5xl">
                  {achievement.icon || '🏆'}
                </div>
              </div>
              <span className="absolute -top-2 -right-2 text-2xl">✨</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-display font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full inline-block mb-1.5">
              {achievement.unlocked ? '🎉 Trophy Unlocked!' : '🔒 In Progress'}
            </span>
            <h3 className="font-display font-extrabold text-2xl text-neutral-900">
              {achievement.title}
            </h3>
            <p className="font-body text-sm text-neutral-600 mt-1">
              {achievement.description || 'Awarded for completing language quests and word games.'}
            </p>
          </div>

          {/* XP Reward Chip */}
          <div className="bg-amber-500/10 border border-amber-300 rounded-2xl p-3.5 flex items-center justify-center gap-3">
            <Star className="w-6 h-6 text-amber-500 fill-current" />
            <span className="font-display font-black text-xl text-amber-700">
              +{achievement.xp || 50} Learning XP
            </span>
          </div>

          <button
            onClick={() => { sounds.playFanfare(); onClose(); }}
            className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-900 font-display font-extrabold text-base rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-102 active:scale-98"
          >
            Awesome! 🌟
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AchievementModal;
