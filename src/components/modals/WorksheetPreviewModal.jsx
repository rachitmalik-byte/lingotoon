import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, BookOpen, CheckCircle, Sparkles, Printer } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

const WorksheetPreviewModal = ({ isOpen, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    sounds.playCorrect();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-16 sm:pt-20 bg-black/75 backdrop-blur-md select-none overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl border-4 border-white overflow-hidden p-6 sm:p-8 space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-brand-orange">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-xl text-neutral-900">
                  Activity Workbook Sample
                </h3>
                <p className="text-xs text-neutral-500">
                  Screen-free phonics & word tracing sheets
                </p>
              </div>
            </div>
            <button
              onClick={() => { sounds.playPop(); onClose(); }}
              className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Worksheet Visual Preview */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-neutral-200 shadow-md aspect-[16/10] bg-amber-50">
            <img 
              src="/images/practice_notebook_merch.jpg" 
              alt="Workbook preview" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-bold bg-brand-orange px-2.5 py-1 rounded-full">
                Pack #1: Alphabet Safari & Tracing
              </span>
            </div>
          </div>

          <div className="space-y-2 text-neutral-600 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-brand-green shrink-0" />
              <span>Includes 12 wipe-clean reusable letter tracing sheets</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-brand-green shrink-0" />
              <span>Full sheet of colorful rewards and completion stars</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleDownload}
              className="flex-1 py-3.5 bg-brand-orange hover:bg-orange-600 text-white font-display font-bold text-sm rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{downloaded ? 'Sample Saved! 🎉' : 'Download Sample Sheet'}</span>
            </button>
            <button
              onClick={() => { sounds.playPop(); onClose(); }}
              className="py-3.5 px-6 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-display font-bold text-sm rounded-full transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WorksheetPreviewModal;
