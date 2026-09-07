import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, BookOpen, PlayCircle, Gamepad2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sounds } from '../../utils/soundEffects';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const quickTopics = [
    { label: '🔤 Phonics & ABCs', link: '/learn?subject=english' },
    { label: '🦁 Animal Safari', link: '/videos' },
    { label: '🧩 Word Builder Game', link: '/game/play/word-builder' },
    { label: '🔢 Math Match', link: '/game/play/math-match' },
    { label: '🌍 World Explorer', link: '/learn?subject=vocabulary' },
    { label: '🌈 Rainbow Colors', link: '/videos' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      sounds.playCorrect();
      navigate(`/learn?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleQuickClick = (link) => {
    sounds.playPop();
    navigate(link);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl border-4 border-white overflow-hidden p-6 space-y-6"
        >
          {/* Search Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔍</span>
              <h3 className="font-display font-extrabold text-xl text-neutral-800">
                Search Lingo Toon
              </h3>
            </div>
            <button
              onClick={() => { sounds.playPop(); onClose(); }}
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Input Form */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Type lessons, songs, math games, animals..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full px-5 py-4 pl-12 rounded-2xl bg-neutral-100 focus:bg-white border-2 border-transparent focus:border-brand-purple outline-none font-display font-bold text-base text-neutral-900 transition-all shadow-inner"
            />
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 px-4 py-2 bg-brand-purple text-white font-display font-bold text-xs rounded-xl shadow-sm hover:bg-brand-purple-dark transition-colors"
            >
              Search
            </button>
          </form>

          {/* Quick Shortcuts */}
          <div>
            <span className="text-xs font-display font-bold uppercase tracking-wider text-neutral-400 block mb-3">
              ⚡ Popular Topics for Kids:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickTopics.map((topic, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickClick(topic.link)}
                  className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-brand-purple-light text-brand-purple font-display font-semibold text-xs transition-all border border-purple-100 hover:border-brand-purple/30 active:scale-95 flex items-center gap-1.5"
                >
                  <span>{topic.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchModal;
