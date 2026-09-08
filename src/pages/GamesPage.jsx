import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gamepad2, Clock, Star, Play, Sparkles } from 'lucide-react';
import { games } from '../data/games';
import GameTile from '../components/content/GameTile';
import Button from '../components/ui/Button';
import LingoCharacter from '../components/decorative/LingoCharacter';
import Badge from '../components/ui/Badge';
import { staggerContainer, staggerItem, fadeIn } from '../hooks/useAnimation';

const GamesPage = () => {
  // Use Word Builder as featured game
  const featuredGame = games.find(g => g.id === 'g2') || games[0];

  return (
    <div className="container-app py-8 md:py-12">
      {/* Hero Spotlight: Vibrant Deeply Saturated Sensation */}
      {featuredGame && (
        <motion.div 
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="mb-14 rounded-[3rem] bg-gradient-to-br from-[#FF6A00] via-[#FF3D00] to-[#E02424] p-8 sm:p-10 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 select-none border-4 border-amber-300 shadow-[0_25px_65px_rgba(255,61,0,0.38)]"
        >
          {/* Saturated Ambient Glow Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-600/35 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-6 right-20 text-yellow-200 font-black text-2xl pointer-events-none drop-shadow">✦</div>
          <div className="absolute bottom-6 left-12 text-yellow-300/70 font-black text-xl pointer-events-none drop-shadow">✦</div>
          
          <div className="flex-1 relative z-10 text-center md:text-left space-y-4">
            {/* Saturated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-orange-600 text-xs font-display font-black tracking-wider uppercase shadow-md border border-white">
              <Sparkles className="w-3.5 h-3.5 fill-current text-amber-500" />
              <span>Featured Game</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.3)]">
              {featuredGame.title}
            </h1>

            <p className="font-body text-base sm:text-xl text-orange-50 font-bold max-w-lg leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]">
              {featuredGame.description}
            </p>
            
            {/* Crisp Saturated Stat Pills */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1 pb-2">
              <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-xs sm:text-sm font-display font-black text-neutral-900 shadow-md border border-white/80">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{featuredGame.difficulty || 'Medium'}</span>
              </div>
              <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-xs sm:text-sm font-display font-black text-neutral-900 shadow-md border border-white/80">
                <Clock className="w-4 h-4 text-orange-600" />
                <span>{featuredGame.playTime || '5 min'}</span>
              </div>
            </div>

            {/* High-Contrast Vibrant CTA Button */}
            <div className="pt-2">
              <Link to="/game/play/word-builder" className="inline-block">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-9 py-4 bg-white hover:bg-neutral-50 text-[#D84315] font-display font-black text-base sm:text-lg rounded-full shadow-[0_10px_28px_rgba(0,0,0,0.25)] flex items-center gap-3 cursor-pointer group transition-all border-2 border-white"
                >
                  <Play className="w-5 h-5 fill-current group-hover:scale-115 transition-transform text-[#D84315]" />
                  <span>PLAY WORD BUILDER</span>
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Right Mascot with Vibrant Pedestal Frame */}
          <div className="relative z-10 shrink-0 flex items-center justify-center">
            <div className="bg-white/95 p-6 sm:p-8 rounded-[2.8rem] relative group shadow-2xl border-4 border-amber-300 transform hover:scale-105 transition-transform duration-300">
              <LingoCharacter pose="encourage" size="lg" className="drop-shadow-lg" />
              {/* Mascot Thumbs-Up Accent */}
              <div className="absolute -bottom-2 -right-2 w-11 h-11 rounded-full bg-amber-400 shadow-lg flex items-center justify-center text-xl border-2 border-white">
                👍
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* All Games Grid */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-brand-purple-light rounded-2xl flex items-center justify-center">
            <Gamepad2 className="w-6 h-6 text-brand-purple" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold text-neutral-900">Learning Game Arcade</h2>
            <p className="font-body text-neutral-500 text-sm">Tap any game tile to start playing and practicing!</p>
          </div>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {games.map((game) => (
            <motion.div key={game.id} variants={staggerItem}>
              <GameTile game={game} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default GamesPage;
