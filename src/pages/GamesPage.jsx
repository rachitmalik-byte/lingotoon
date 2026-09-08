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
      {/* Hero Spotlight: Premium Modern Smooth Claymorphism */}
      {featuredGame && (
        <motion.div 
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="mb-14 clay-card-orange p-8 sm:p-10 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 select-none"
        >
          {/* Subtle Ambient Clay Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex-1 relative z-10 text-center md:text-left space-y-4">
            {/* Clay Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-orange to-amber-500 text-white text-xs font-display font-black tracking-wider uppercase shadow-[0_4px_12px_rgba(249,115,22,0.35),inset_1.5px_1.5px_3px_rgba(255,255,255,0.4),inset_-1.5px_-1.5px_3px_rgba(0,0,0,0.15)]">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Featured Game</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-neutral-900 tracking-tight leading-tight">
              {featuredGame.title}
            </h1>

            <p className="font-body text-base sm:text-lg text-neutral-600 font-medium max-w-lg leading-relaxed">
              {featuredGame.description}
            </p>
            
            {/* Clay Stat Pills */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1 pb-2">
              <div className="clay-pill px-4 py-1.5 flex items-center gap-2 text-xs sm:text-sm font-display font-bold text-neutral-800">
                <Star className="w-4 h-4 text-brand-yellow fill-current" />
                <span>{featuredGame.difficulty || 'Medium'}</span>
              </div>
              <div className="clay-pill px-4 py-1.5 flex items-center gap-2 text-xs sm:text-sm font-display font-bold text-neutral-800">
                <Clock className="w-4 h-4 text-brand-orange" />
                <span>{featuredGame.playTime || '5 min'}</span>
              </div>
            </div>

            {/* Tactile 3D Clay CTA Button */}
            <div className="pt-2">
              <Link to="/game/play/g2" className="inline-block">
                <button className="clay-btn-orange px-8 py-4 text-white font-display font-black text-base sm:text-lg flex items-center gap-3 cursor-pointer group">
                  <Play className="w-5 h-5 fill-current group-hover:scale-115 transition-transform" />
                  <span>PLAY WORD BUILDER</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Mascot with Clay Pedestal Frame */}
          <div className="relative z-10 shrink-0 flex items-center justify-center">
            <div className="clay-frame p-6 sm:p-7 relative group transform hover:scale-105 transition-transform duration-300">
              <LingoCharacter pose="encourage" size="lg" className="drop-shadow-lg" />
              {/* Little Thumbs-up Clay Accent Pebble */}
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white shadow-[0_6px_16px_rgba(0,0,0,0.12),inset_2px_2px_4px_rgba(255,255,255,0.95)] flex items-center justify-center text-lg border-2 border-orange-100">
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
