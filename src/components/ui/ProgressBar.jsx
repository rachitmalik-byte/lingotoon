import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({
  value,
  progress,
  color = 'purple',
  size = 'md',
  height,
  showLabel = false,
  animated = true,
  className = ''
}) => {
  // Accept both 'value' and 'progress' props
  const rawValue = value ?? progress ?? 0;
  const safeValue = Math.min(Math.max(rawValue, 0), 100);
  
  const sizes = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4"
  };

  const sizeClass = height || sizes[size] || sizes.md;

  // Map color strings, hex values, and bg-brand-* classes to actual colors
  const resolveColor = (c) => {
    if (!c) return '#7C3AED';
    // Direct hex
    if (c.startsWith('#')) return c;
    // bg-brand-* class format
    const brandMap = {
      'bg-brand-purple': '#7C3AED',
      'bg-brand-blue': '#3B82F6',
      'bg-brand-green': '#22C55E',
      'bg-brand-orange': '#F97316',
      'bg-brand-yellow': '#FACC15',
      'bg-neutral-300': '#D4D4D4',
    };
    if (brandMap[c]) return brandMap[c];
    // Simple name
    const nameMap = {
      purple: '#7C3AED',
      blue: '#3B82F6',
      green: '#22C55E',
      orange: '#F97316',
      yellow: '#FACC15',
    };
    return nameMap[c] || '#7C3AED';
  };

  const fillColor = resolveColor(color);

  return (
    <div className={`flex items-center w-full ${className}`}>
      <div className={`w-full bg-neutral-100 rounded-full overflow-hidden ${sizeClass}`}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: fillColor }}
          initial={animated ? { width: 0 } : { width: `${safeValue}%` }}
          animate={{ width: `${safeValue}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      {showLabel && (
        <span className="ml-3 text-sm font-semibold text-gray-600 font-body min-w-[3ch]">
          {Math.round(safeValue)}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
