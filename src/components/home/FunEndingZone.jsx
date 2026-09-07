import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Flame, Trophy, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Confetti from '../decorative/Confetti';
import { sounds } from '../../utils/soundEffects';

const FunEndingZone = () => {
  const [highFiveCount, setHighFiveCount] = useState(1428);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isHighFived, setIsHighFived] = useState(false);

  const handleHighFive = () => {
    sounds.playCorrect();
    setHighFiveCount(prev => prev + 1);
    setShowConfetti(true);
    setIsHighFived(true);
    setTimeout(() => {
      setShowConfetti(false);
      setIsHighFived(false);
    }, 2500);
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden z-10 select-none">
      {/* Confetti Burst */}
      <Confetti active={showConfetti} duration={2500} />

      <div className="container-app relative z-10">
        <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-b from-[#581CB8] to-[#4A149E] text-white p-8 sm:p-12 md:p-16 shadow-2xl border-4 border-white/20">
          
          {/* Fluid Corner Blob Accents inside card */}
          <div className="absolute -top-16 -left-16 w-60 h-60 bg-[#FFD233] rounded-full opacity-80 pointer-events-none blur-xs" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#32B4FA] rounded-full opacity-80 pointer-events-none blur-xs" />

          {/* Floating Sparkles */}
          <motion.div 
            animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute top-8 right-12 text-[#FFD233] text-3xl font-black hidden md:block"
          >
            ✦
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.3, 1], rotate: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-10 left-16 text-[#FFD233] text-2xl font-black hidden md:block"
          >
            ✦
          </motion.div>

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-7">
            
            {/* 3D Mascot Avatar + High Five Badge */}
            <div className="flex flex-col items-center justify-center">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white/20 p-1 mb-3 cursor-pointer"
                onClick={handleHighFive}
              >
                <img 
                  src="/images/mascot_lingo_hero.jpg" 
                  alt="Lingo Mascot" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </motion.div>

              {/* Interactive High Five Button */}
              <motion.button
                onClick={handleHighFive}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className={`px-6 py-2.5 rounded-full font-display font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-lg transition-all ${
                  isHighFived 
                    ? 'bg-brand-green text-white ring-4 ring-green-300' 
                    : 'bg-[#FFD53D] hover:bg-yellow-400 text-neutral-900 ring-2 ring-yellow-200'
                }`}
              >
                <span className="text-xl">✋</span>
                <span>{isHighFived ? "High-Fived! 🎉" : "High-Five Lingo!"}</span>
                <span className="text-xs font-black bg-black/10 px-2 py-0.5 rounded-full ml-1">
                  {highFiveCount}
                </span>
              </motion.button>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
                Ready to Start Your Child’s <br className="hidden sm:inline" />
                <span className="text-[#FFD53D]">Language Adventure?</span>
              </h2>
              <p className="font-body text-base sm:text-lg text-white/90 font-medium max-w-xl mx-auto leading-relaxed">
                Join over 50,000 happy kids discovering words, songs, and games every day. Free to start, 100% kid-safe.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link to="/learn" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-9 py-4 bg-[#FFD53D] hover:bg-yellow-400 text-neutral-900 font-display font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                  <span>Start Learning Free</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to="/games" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-display font-bold text-lg rounded-full border border-white/40 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                  <span>Play Arcade Games 🎮</span>
                </button>
              </Link>
            </div>

            {/* Safety & Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-display font-semibold text-white/80 border-t border-white/15">
              <span className="flex items-center gap-1.5">
                <span>🛡️</span> 100% Kid-Safe & COPPA Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <span>🚫</span> Zero External Ads
              </span>
              <span className="flex items-center gap-1.5">
                <span>⭐</span> Rated 4.9/5 by Parents
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FunEndingZone;
