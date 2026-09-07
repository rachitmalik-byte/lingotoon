import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Star, Award, X } from 'lucide-react';
import Confetti from '../decorative/Confetti';
import { sounds } from '../../utils/soundEffects';

const EasterEggModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-16 sm:pt-20 bg-black/75 backdrop-blur-md select-none overflow-y-auto">
        <Confetti active={true} duration={4000} />

        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative w-full max-w-md bg-gradient-to-b from-white via-[#FFFDF5] to-[#FFF9E6] rounded-[3rem] p-8 text-center border-4 border-amber-300 shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => { sounds.playPop(); onClose(); }}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Golden Badge Icon */}
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FFE885] to-[#F59E0B] p-1.5 shadow-xl flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl shadow-inner">
              🦉✨
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-display font-black mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Secret Easter Egg Unlocked!
          </div>

          <h3 className="font-display font-black text-2xl sm:text-3xl text-neutral-900 mb-2">
            Master Detective Owl Badge!
          </h3>

          <p className="font-body text-sm sm:text-base text-neutral-600 mb-6 leading-relaxed">
            Woo-hoo! You discovered the secret 5-tap Lingo Toon Easter egg! You have earned <strong className="text-amber-600">+100 Super Explorer XP</strong>!
          </p>

          <button
            onClick={() => { sounds.playCorrect(); onClose(); }}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-display font-black text-base shadow-lg hover:shadow-xl transition-all transform hover:scale-102 active:scale-98"
          >
            Claim 100 XP & Celebrate! 🌟
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EasterEggModal;
