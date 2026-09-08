import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Gamepad2, Star, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { sounds } from '../../utils/soundEffects';

const gameColorThemes = {
  purple: {
    badge: 'text-brand-purple bg-brand-purple-light',
    btn: 'bg-brand-purple hover:bg-brand-purple-dark text-white shadow-btn',
    border: 'hover:border-brand-purple/40',
  },
  blue: {
    badge: 'text-brand-blue bg-brand-blue-light',
    btn: 'bg-brand-blue hover:bg-blue-600 text-white shadow-md',
    border: 'hover:border-brand-blue/40',
  },
  orange: {
    badge: 'text-brand-orange bg-brand-orange-light',
    btn: 'bg-brand-orange hover:bg-orange-600 text-white shadow-md',
    border: 'hover:border-brand-orange/40',
  },
  green: {
    badge: 'text-brand-green bg-brand-green-light',
    btn: 'bg-brand-green hover:bg-emerald-600 text-white shadow-md',
    border: 'hover:border-brand-green/40',
  },
};

const GameTile = ({ game, className = '' }) => {
  if (!game) return null;
  const linkTo = game.playable ? `/game/play/${game.id}` : `/game/play/word-builder`;
  const theme = gameColorThemes[game.color] || gameColorThemes.orange;

  return (
    <div className={`select-none ${className || 'w-full'}`}>
      <motion.div 
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
        className={`rounded-[2.4rem] p-4 sm:p-5 relative overflow-hidden transition-all duration-300 hover:shadow-2xl border-2 border-neutral-100 ${theme.border} flex flex-col justify-between h-full bg-white shadow-card`}
      >
        {/* Top 3D Artwork Frame */}
        {game.image ? (
          <div className="relative aspect-[16/10] rounded-[1.8rem] overflow-hidden mb-3.5 shadow-sm bg-neutral-900 group">
            <img 
              src={game.image} 
              alt={game.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-13 h-13 bg-white/95 text-brand-purple rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 ml-0.5 fill-current" />
              </div>
            </div>

            {/* Clay Difficulty Badge */}
            <div className="absolute top-2.5 left-2.5">
              <span className="clay-pill text-neutral-800 font-display font-extrabold text-[11px] px-3 py-1 flex items-center gap-1.5 shadow-sm">
                <Star className="w-3 h-3 text-amber-500 fill-current" />
                <span>{game.difficulty || 'Easy'}</span>
              </span>
            </div>

            {/* Clay Duration Tag */}
            <div className="absolute bottom-2.5 right-2.5 bg-neutral-900/90 text-white font-display font-bold text-[11px] px-3 py-0.5 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_1px_1px_2px_rgba(255,255,255,0.25)] border border-white/20 flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-brand-yellow" />
              <span>{game.playTime || '5 min'}</span>
            </div>
          </div>
        ) : (
          <div 
            className="rounded-[1.8rem] p-6 mb-3.5 relative overflow-hidden flex items-center justify-center text-4xl shadow-inner bg-amber-50"
          >
            <Gamepad2 className="w-12 h-12 text-brand-orange" />
          </div>
        )}

        {/* Game Title & Description */}
        <div className="relative z-10 px-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className={`text-[11px] font-display font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${theme.badge}`}>
              {game.subject}
            </span>
            <span className="text-xs font-display font-black text-amber-600 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-500 fill-current" />
              +40 XP
            </span>
          </div>
          
          <h3 className="font-display font-black text-xl text-neutral-900 mb-1 hover:text-brand-purple transition-colors leading-snug">
            {game.title}
          </h3>
          
          <p className="text-xs sm:text-sm text-neutral-500 line-clamp-2 mb-4 font-body leading-relaxed font-medium">
            {game.description}
          </p>
        </div>

        {/* Tactile Play Action */}
        <div className="relative z-10 pt-1 mt-auto px-1">
          <Link 
            to={linkTo} 
            onClick={() => sounds.playCorrect()}
            className="block w-full"
          >
            <motion.button
              whileTap={{ scale: 0.96 }}
              className={`w-full py-3 ${theme.btn} font-display font-black text-sm rounded-full transition-all flex items-center justify-center gap-2`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Play Now</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default GameTile;
