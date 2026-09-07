import React from 'react';
import { ArrowLeft, Star, Clock, Trophy } from 'lucide-react';

const GameContainer = ({ game, score = 0, maxScore = 100, timeLeft = null, level = 1, onBack, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-purple-dark to-[#31106a] flex flex-col relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stars" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#FFFFFF" />
              <circle cx="80" cy="50" r="1.5" fill="#FFFFFF" />
              <circle cx="40" cy="80" r="2.5" fill="#FFFFFF" />
              <path d="M70,20 l2,-5 l2,5 l5,2 l-5,2 l-2,5 l-2,-5 l-5,-2 z" fill="#FFFFFF" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#stars)" />
        </svg>
      </div>

      {/* Top Bar */}
      <header className="w-full px-4 sm:px-6 py-4 flex items-center justify-between bg-black/20 backdrop-blur-md z-10 border-b border-white/10">
        <div className="flex items-center space-x-4 w-1/3">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Back to games"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="hidden sm:flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
            <Trophy className="w-4 h-4 text-brand-yellow" />
            <span className="font-display text-white text-sm font-bold uppercase tracking-wide">
              Level {level}
            </span>
          </div>
        </div>

        <div className="w-1/3 text-center">
          <h1 className="font-display text-xl sm:text-2xl text-white font-bold drop-shadow-sm truncate">
            {game?.title || "Game Title"}
          </h1>
        </div>

        <div className="w-1/3 flex items-center justify-end space-x-2 sm:space-x-4">
          {timeLeft !== null && (
            <div className="flex items-center space-x-1.5 bg-black/30 px-3 py-1.5 rounded-full border border-brand-orange/30">
              <Clock className={`w-4 h-4 ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-brand-orange'}`} />
              <span className={`font-display font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          )}

          <div className="flex items-center space-x-1.5 bg-black/30 px-3 py-1.5 rounded-full border border-brand-yellow/30">
            <Star className="w-5 h-5 text-brand-yellow fill-brand-yellow" />
            <span className="font-display font-bold text-white text-lg">
              {score}<span className="text-white/50 text-sm hidden sm:inline">/{maxScore}</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Game Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10 flex flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default GameContainer;
