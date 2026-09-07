import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';
import LingoCharacter from '../decorative/LingoCharacter';

const QuizOverlay = ({ 
  question, 
  options, 
  correctIndex, 
  onAnswer, 
  onDismiss,
  quiz,
  onClose,
  onComplete
}) => {
  // Support both object and direct props
  const currentQuestion = question || quiz?.question || "What was the most exciting thing you learned?";
  const currentOptions = options || quiz?.options || ['Exploring new ideas', 'Practicing phonics', 'Counting numbers', 'Having fun!'];
  const correctIdx = correctIndex ?? quiz?.correctAnswer ?? 0;
  const handleClose = onDismiss || onClose;

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSelect = (index) => {
    if (isAnswered) return;
    setSelectedIndex(index);
    
    if (index === correctIdx) {
      setIsCorrect(true);
      setIsAnswered(true);
      if (onAnswer) onAnswer(true);
      if (onComplete) onComplete(true);
    } else {
      setIsCorrect(false);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => {
        setIsAnswered(true);
        if (onAnswer) onAnswer(false);
      }, 800);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ scale: 0.85, y: 20 }}
        animate={shake ? { x: [-12, 12, -8, 8, 0] } : { scale: 1, y: 0 }}
        transition={{ duration: shake ? 0.4 : 0.3, type: shake ? "tween" : "spring" }}
        className="relative w-full max-w-lg bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border-4 border-white/20 overflow-hidden text-white"
      >
        {/* Glow circle in background */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-yellow/15 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          aria-label="Close quiz"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 -mt-2">
             <LingoCharacter pose={isAnswered ? (isCorrect ? 'celebrate' : 'think') : 'think'} size="sm" />
          </div>
          <div className="flex-1 pr-6">
            <span className="inline-flex items-center gap-1 font-display text-brand-yellow text-xs sm:text-sm font-bold tracking-wider uppercase bg-brand-yellow/20 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Quick Question
            </span>
            <h3 className="font-display text-white text-xl sm:text-2xl font-bold leading-snug">
              {currentQuestion}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {currentOptions.map((opt, idx) => {
            const isSelected = selectedIndex === idx;
            const isCorrectOption = idx === correctIdx;
            
            let btnClass = "bg-white/10 hover:bg-white/20 text-white border-2 border-white/10";
            let statusText = "";
            
            if (isAnswered) {
              if (isCorrectOption) {
                btnClass = "bg-brand-green text-white font-bold ring-4 ring-brand-green-light border-white scale-102";
                if (isSelected) statusText = "Great job! ⭐";
              } else if (isSelected && !isCorrectOption) {
                btnClass = "bg-red-500/90 text-white border-red-300";
                statusText = "Almost! Keep going";
              } else {
                btnClass = "bg-white/5 text-white/40 border-transparent cursor-not-allowed";
              }
            } else if (isSelected) {
               btnClass = "bg-white/30 text-white border-white";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                className={`relative px-4 py-3.5 rounded-2xl font-body text-base font-semibold text-center transition-all duration-200 shadow-sm ${btnClass}`}
              >
                <span>{opt}</span>
                {isAnswered && isCorrectOption && (
                  <div className="absolute -right-1.5 -top-1.5 w-6 h-6 bg-brand-yellow rounded-full flex items-center justify-center shadow-md">
                    <Check className="w-3.5 h-3.5 text-brand-purple-dark stroke-[3]" />
                  </div>
                )}
                {statusText && (
                  <span className="block text-xs font-bold mt-1 text-brand-yellow">{statusText}</span>
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mt-2"
            >
              <button
                onClick={handleClose}
                className="px-8 py-3 bg-brand-yellow hover:bg-brand-yellow-light text-brand-purple-dark font-display text-lg font-bold rounded-full shadow-btn hover:shadow-btn-hover transition-all transform hover:scale-105 active:scale-95"
              >
                Continue Watching &rarr;
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default QuizOverlay;
