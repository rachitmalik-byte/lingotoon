import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements = ({ items = ['star', 'letter', 'number'], density = 'normal' }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'star':
        return <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FACC15" />;
      case 'letter':
        return <path d="M4 20L12 4L20 20M7 14H17" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />;
      case 'number':
        return <path d="M8 20L16 4M10 10H20M4 14H14" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />;
      case 'book':
        return <path d="M4 19.5V4.5C4 3.67157 4.67157 3 5.5 3H19C19.8284 3 20.5 3.67157 20.5 4.5V19.5M4 19.5C4 20.3284 4.67157 21 5.5 21H20.5M4 19.5H20.5" stroke="#F97316" strokeWidth="2" strokeLinecap="round" fill="none" />;
      case 'pencil':
        return <path d="M17 3L21 7L7 21H3V17L17 3Z" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" fill="none" />;
      default:
        return null;
    }
  };

  const count = density === 'sparse' ? 3 : 6;
  const elements = [];

  for (let i = 0; i < count; i++) {
    const type = items[i % items.length];
    // Randomize position and animation delay
    const top = `${Math.random() * 80 + 10}%`;
    const left = `${Math.random() * 80 + 10}%`;
    const delay = Math.random() * 2;
    const duration = 3 + Math.random() * 2;
    const size = 20 + Math.random() * 20;

    elements.push(
      <motion.div
        key={i}
        className="absolute opacity-20 pointer-events-none"
        style={{ top, left, width: size, height: size }}
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        }}
      >
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          {getIcon(type)}
        </svg>
      </motion.div>
    );
  }

  return <>{elements}</>;
};

export default FloatingElements;
