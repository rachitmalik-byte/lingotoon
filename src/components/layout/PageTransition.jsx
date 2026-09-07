import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../../hooks/useAnimation';

const PageTransition = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
