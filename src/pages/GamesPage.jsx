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
      {/* Hero Spotlight */}
      {featuredGame && (
        <motion.div 
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="mb-14 bg-gradient-to-r from-brand-orange-light via-orange-50 to-white rounded-[2.5rem] p-8 md:p-12 shadow-game relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-brand-orange/15"
        >
          {/* Decorative Background Glows */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-brand-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          
          <div className="flex-1 relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-brand-orange text-white text-xs font-display font-bold px-3.5 py-1 rounded-full mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> Featured Game
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-neutral-900 font-bold mb-3">
              {featuredGame.title}
            </h1>
            <p className="font-body text-lg md:text-xl text-neutral-600 mb-6 max-w-lg leading-relaxed">
              {featuredGame.description}
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 mb-8 font-body font-semibold text-neutral-600 text-sm">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-xs">
                <Star className="w-4 h-4 text-brand-yellow fill-current" />
                <span>{featuredGame.difficulty || 'Medium'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-xs">
                <Clock className="w-4 h-4 text-brand-orange" />
                <span>{featuredGame.playTime || '8 min'}</span>
              </div>
            </div>

            <Link to="/game/play/g2">
              <Button variant="game" size="lg" className="shadow-btn-hover group text-lg px-8">
                <Play className="w-5 h-5 fill-current mr-2 group-hover:scale-110 transition-transform" />
                PLAY WORD BUILDER
              </Button>
            </Link>
          </div>

          <div className="relative z-10 w-44 md:w-64 shrink-0 flex items-center justify-center">
            <LingoCharacter pose="encourage" size="lg" className="drop-shadow-xl" />
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
