import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../../hooks/useAnimation';

const PageTransition = ({ children, className = '' }) => {
  useLayoutEffect(() => {
    // When the new page component mounts, immediately force viewport to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

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
