import React from 'react';
import { motion } from 'framer-motion';

const LingoCharacter = ({ pose = 'wave', size = 'md', className = '' }) => {
  const sizes = { sm: 56, md: 96, lg: 140, xl: 200 };
  const s = sizes[size] || 96;

  return (
    <motion.div 
      animate={{ 
        y: [0, -6, 0],
        rotate: pose === 'celebrate' ? [0, 4, -4, 0] : [0, 1, -1, 0]
      }}
      transition={{ 
        duration: pose === 'celebrate' ? 2 : 4, 
        repeat: Infinity, 
        ease: 'easeInOut' 
      }}
      style={{ width: s, height: s }}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
    >
      <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg border-2 border-white bg-gradient-to-tr from-brand-purple to-brand-purple-light p-0.5">
        <img 
          src="/images/mascot_lingo_hero.jpg" 
          alt="Lingo 3D Mascot" 
          className="w-full h-full object-cover rounded-[1.4rem]"
        />
      </div>
      {pose === 'celebrate' && (
        <motion.span 
          animate={{ scale: [1, 1.3, 1], rotate: [0, 20, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -top-2 -right-2 text-xl filter drop-shadow-md"
        >
          🌟
        </motion.span>
      )}
      {pose === 'encourage' && (
        <span className="absolute -bottom-1 -right-1 text-base bg-white rounded-full p-1 shadow-sm">
          👍
        </span>
      )}
      {pose === 'think' && (
        <span className="absolute -top-1 -right-1 text-base bg-white rounded-full p-1 shadow-sm">
          💡
        </span>
      )}
    </motion.div>
  );
};

export default LingoCharacter;
