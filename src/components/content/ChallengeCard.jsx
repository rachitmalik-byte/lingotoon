import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Star, Gift, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProgressBar from '../ui/ProgressBar';
import { sounds } from '../../utils/soundEffects';

const ChallengeCard = ({ challenge }) => {
  if (!challenge) return null;

  const progressPercent = ((challenge.wordsFound || challenge.progress || 0) / (challenge.totalWords || challenge.total || 1)) * 100;

  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-[3rem] p-1 shadow-2xl relative overflow-hidden select-none"
    >
      <div className="bg-white rounded-[2.9rem] p-6 sm:p-10 relative overflow-hidden">
        
        {/* Radiant Corner Background Blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
          
          {/* Mascot Trophy Display */}
          <div className="w-36 h-36 sm:w-44 sm:h-44 flex-shrink-0 relative">
            <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-gradient-to-tr from-amber-200 to-yellow-100 p-1.5 shadow-xl border-4 border-white transform hover:rotate-3 transition-transform">
              <img 
                src="/images/mascot_lingo_hero.jpg" 
                alt="Lingo Mascot" 
                className="w-full h-full object-cover rounded-[2.2rem]" 
              />
            </div>
            <motion.div 
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-3 -right-3 w-11 h-11 rounded-full bg-amber-400 text-neutral-900 flex items-center justify-center text-xl shadow-lg border-2 border-white"
            >
              👑
            </motion.div>
          </div>

          {/* Content & Interactive Challenge Details */}
          <div className="flex-1 w-full text-center lg:text-left space-y-4">
            <div>
              <span className="inline-flex items-center gap-1.5 font-display text-xs font-black uppercase tracking-wider text-orange-600 bg-orange-100 px-3.5 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Daily Golden Quest
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-neutral-900 leading-tight">
                {challenge.title}
              </h3>
              <p className="font-body text-sm sm:text-base text-neutral-600 mt-1 max-w-lg">
                {challenge.description}
              </p>
            </div>

            {/* Word Chips & Progress Capsule */}
            <div className="bg-amber-50/80 backdrop-blur-sm rounded-2xl p-4 border border-amber-200/70 max-w-lg">
              <div className="flex justify-between items-center mb-2 font-display font-bold text-xs sm:text-sm">
                <span className="text-neutral-700">Vocabulary Words Found</span>
                <span className="text-brand-orange font-black">
                  {challenge.wordsFound || challenge.progress || 0} / {challenge.totalWords || challenge.total || 5} Words
                </span>
              </div>
              <ProgressBar value={progressPercent} color="orange" size="md" />
            </div>

            {/* Interactive Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
              <Link 
                to="/game/play/word-builder" 
                onClick={() => sounds.playCorrect()}
                className="w-full sm:w-auto"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-display font-black text-base rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>ACCEPT QUEST ⚡</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              
              <div className="bg-yellow-100 text-yellow-800 font-display font-black text-xs sm:text-sm px-4 py-3 rounded-full inline-flex items-center gap-2 border border-yellow-300 shadow-xs">
                <Gift className="w-4 h-4 text-orange-600" />
                <span>Reward: {challenge.reward || '50 XP + Mystery Trophy'}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeCard;
