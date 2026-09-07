import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Confetti = ({ active, duration = 2000, colors = ['#7C3AED', '#FACC15', '#3B82F6', '#F97316', '#22C55E'] }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (active) {
      const newParticles = Array.from({ length: 30 }).map((_, i) => ({
        id: Date.now() + i,
        color: colors[i % colors.length],
        x: Math.random() * 100, // percentage string
        angle: -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.5, // angle pointing upwards
        speed: 10 + Math.random() * 20,
        size: 5 + Math.random() * 10,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 720
      }));
      
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [active, duration, colors]);

  if (!active && particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              x: `${p.x}vw`, 
              y: '100vh',
              rotate: p.rotation,
              scale: 0
            }}
            animate={{
              y: ['100vh', `${50 - Math.random() * 30}vh`, '120vh'], // up then down
              x: `${p.x + (Math.random() - 0.5) * 20}vw`,
              rotate: p.rotation + p.rotSpeed,
              scale: [0, 1, 1, 0.5]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: duration / 1000,
              ease: "easeInOut",
              times: [0, 0.2, 0.8, 1]
            }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.size % 2 === 0 ? '50%' : '2px',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Confetti;
