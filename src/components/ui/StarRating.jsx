import React from 'react';
import { motion } from 'framer-motion';

const StarRating = ({
  rating = 0,
  size = 'md',
  color = '#FACC15',
  className = ''
}) => {
  const sizes = {
    sm: { width: 16, height: 16 },
    md: { width: 24, height: 24 },
    lg: { width: 32, height: 32 }
  };

  const { width, height } = sizes[size];
  const maxStars = 5;

  const Star = ({ fillPercentage }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" className="inline-block mx-0.5">
      <defs>
        <linearGradient id={`starGrad-${fillPercentage}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset={`${fillPercentage * 100}%`} stopColor={color} />
          <stop offset={`${fillPercentage * 100}%`} stopColor="#E5E7EB" />
        </linearGradient>
      </defs>
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={`url(#starGrad-${fillPercentage})`}
        stroke={fillPercentage > 0 ? color : "#D1D5DB"}
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(maxStars)].map((_, i) => {
        const starRating = i + 1;
        let fillPercentage = 0;
        
        if (rating >= starRating) {
          fillPercentage = 1;
        } else if (rating > starRating - 1) {
          fillPercentage = rating - (starRating - 1);
        }

        return (
          <motion.div
            key={i}
            initial={fillPercentage === 1 ? { scale: 0.8, rotate: -10 } : {}}
            animate={fillPercentage === 1 ? { scale: 1, rotate: 0 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 10, delay: i * 0.1 }}
          >
            <Star fillPercentage={fillPercentage} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default StarRating;
