import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Star, Sparkles, Compass, Search, Filter, Flame, Trophy, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { subjects } from '../data/subjects';
import { lessons } from '../data/lessons';
import LessonCard from '../components/content/LessonCard';
import { sounds } from '../utils/soundEffects';

const subjectClayThemes = {
  all: {
    name: 'All Quests',
    gradient: 'from-purple-600 to-indigo-700',
    shadow: 'rgba(109, 40, 217, 0.35)',
    iconColor: '#FFFFFF',
  },
  english: {
    name: 'English',
    gradient: 'from-[#7C3AED] to-[#581CB8]',
    shadow: 'rgba(88, 28, 184, 0.45)',
    accent: '#FFD233',
  },
  math: {
    name: 'Math',
    gradient: 'from-[#F59E0B] to-[#EA580C]',
    shadow: 'rgba(234, 88, 12, 0.45)',
    accent: '#FFFFFF',
  },
  science: {
    name: 'Science',
    gradient: 'from-[#10B981] to-[#059669]',
    shadow: 'rgba(5, 150, 105, 0.45)',
    accent: '#A7F3D0',
  },
  general: {
    name: 'World',
    gradient: 'from-[#0284C7] to-[#0369A1]',
    shadow: 'rgba(2, 132, 199, 0.45)',
    accent: '#BAE6FD',
  },
  vocabulary: {
    name: 'Vocabulary',
    gradient: 'from-[#E11D48] to-[#BE123C]',
    shadow: 'rgba(225, 29, 72, 0.45)',
    accent: '#FECDD3',
  },
  reading: {
    name: 'Reading',
    gradient: 'from-[#4F46E5] to-[#3730A3]',
    shadow: 'rgba(79, 70, 229, 0.45)',
    accent: '#C7D2FE',
  },
};

const SubjectClayIcon = ({ id }) => {
  switch (id) {
    case 'english':
      return (
        <span className="font-display font-black text-lg text-white">Aa</span>
      );
    case 'math':
      return (
        <span className="font-display font-black text-lg text-white">123</span>
      );
    case 'science':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M10 2v5L4.5 17.5A2 2 0 006.3 21h11.4a2 2 0 001.8-3.5L14 7V2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 14h7" strokeLinecap="round" />
        </svg>
      );
    case 'general':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
          <path d="M3 12h18" />
        </svg>
      );
    case 'vocabulary':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'reading':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return <Sparkles className="w-5 h-5 text-white" />;
  }
};

const LearnPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const subjectParam = searchParams.get('subject') || 'all';
  const [activeSubject, setActiveSubject] = useState(subjectParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  // Sync state if URL param updates
  useEffect(() => {
    if (subjectParam) {
      setActiveSubject(subjectParam.toLowerCase());
    }
  }, [subjectParam]);

  const handleSubjectSelect = (id) => {
    sounds.playPop();
    setActiveSubject(id);
    if (id === 'all') {
      searchParams.delete('subject');
    } else {
      searchParams.set('subject', id);
    }
    setSearchParams(searchParams);
  };

  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchSubject =
        activeSubject === 'all' ||
        lesson.subject.toLowerCase() === activeSubject.toLowerCase();

      const matchSearch =
        !searchQuery.trim() ||
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.subject.toLowerCase().includes(searchQuery.toLowerCase());

      const matchDifficulty =
        difficultyFilter === 'all' ||
        (difficultyFilter === 'beginner' && (lesson.progress >= 50 || lesson.totalSteps <= 4)) ||
        (difficultyFilter === 'explorer' && lesson.totalSteps > 4);

      return matchSubject && matchSearch && matchDifficulty;
    });
  }, [activeSubject, searchQuery, difficultyFilter]);

  const currentSubjectInfo = subjects.find(
    (s) => s.id.toLowerCase() === activeSubject.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24 relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-brand-yellow/15 rounded-full blur-3xl pointer-events-none -translate-x-1/3" />

      <div className="container-app pt-8 md:pt-12 relative z-10">
        {/* Header Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-xs border border-neutral-200/80">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            <span className="text-xs font-display font-black text-neutral-800 uppercase tracking-wider">
              Interactive Learning Hub
            </span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-neutral-900 tracking-tight leading-tight">
            Explore & <span className="text-brand-purple">Level Up!</span>
          </h1>

          <p className="font-body text-base sm:text-lg text-neutral-600 font-medium max-w-xl mx-auto">
            Choose a subject island, complete fun quest steps, earn golden stars, and collect XP badges!
          </p>
        </div>

        {/* Quest Journey Status Bar (XP, Streak, Level) */}
        <div className="bg-white rounded-[2.2rem] p-5 sm:p-6 mb-10 shadow-card border-2 border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Explorer Level */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-brand-yellow flex items-center justify-center text-white shadow-md flex-shrink-0">
              <Trophy className="w-7 h-7 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-lg text-neutral-900">Level 3 Explorer</span>
                <span className="bg-amber-100 text-amber-800 font-display font-black text-[11px] px-2 py-0.5 rounded-full">
                  Gold Rank
                </span>
              </div>
              <p className="text-xs font-body text-neutral-500 font-medium">Next Reward: Diamond Owl Mascot</p>
            </div>
          </div>

          {/* XP Progress Slider */}
          <div className="w-full md:w-80">
            <div className="flex justify-between text-xs font-display font-black text-neutral-600 mb-1.5">
              <span>380 XP Earned</span>
              <span className="text-brand-purple">500 XP Goal</span>
            </div>
            <div className="w-full h-3.5 bg-neutral-100 rounded-full overflow-hidden p-0.5 border border-neutral-200/60">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-brand-purple via-indigo-500 to-brand-blue transition-all duration-700"
                style={{ width: '76%' }}
              />
            </div>
          </div>

          {/* Streak Counter */}
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200/80 px-4 py-2.5 rounded-2xl w-full md:w-auto justify-center">
            <Flame className="w-5 h-5 text-brand-orange fill-current animate-bounce" />
            <div>
              <div className="font-display font-black text-sm text-neutral-900">5-Day Quest Streak</div>
              <div className="text-[11px] font-body text-amber-700 font-bold">+50 Bonus XP active!</div>
            </div>
          </div>
        </div>

        {/* CLAYMORPHIC SUBJECT ISLAND SWITCHER */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="font-display font-black text-sm sm:text-base text-neutral-800 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-brand-purple" />
              <span>Select Subject Island</span>
            </span>
            <span className="text-xs font-display font-bold text-neutral-500">
              Showing {filteredLessons.length} Activities
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {/* 'All' Island */}
            <motion.button
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleSubjectSelect('all')}
              style={{
                boxShadow: activeSubject === 'all'
                  ? '0 14px 24px -6px rgba(109, 40, 217, 0.4), inset 0 3px 6px 0 rgba(255,255,255,0.45), inset 0 -3px 6px 0 rgba(0,0,0,0.2)'
                  : '0 4px 10px -2px rgba(0,0,0,0.05)',
              }}
              className={`rounded-3xl p-3.5 sm:p-4 text-left flex flex-col justify-between h-[115px] transition-all relative overflow-hidden border ${
                activeSubject === 'all'
                  ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white border-white/30'
                  : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200/80'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-xs ${activeSubject === 'all' ? 'bg-white/20 text-white' : 'bg-brand-purple/10 text-brand-purple'}`}>
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className={`text-[11px] font-display font-black px-2 py-0.5 rounded-full ${activeSubject === 'all' ? 'bg-white/25 text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                  {lessons.length}
                </span>
              </div>
              <span className="font-display font-black text-sm leading-tight truncate">All Quests</span>
            </motion.button>

            {/* Individual Subjects */}
            {subjects.map((sub) => {
              const isSelected = activeSubject === sub.id.toLowerCase();
              const theme = subjectClayThemes[sub.id] || subjectClayThemes.english;

              return (
                <motion.button
                  key={sub.id}
                  whileHover={{ y: -4, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleSubjectSelect(sub.id)}
                  style={{
                    boxShadow: isSelected
                      ? `0 14px 24px -6px ${theme.shadow}, inset 0 3px 6px 0 rgba(255,255,255,0.45), inset 0 -3px 6px 0 rgba(0,0,0,0.2)`
                      : '0 4px 10px -2px rgba(0,0,0,0.05)',
                  }}
                  className={`rounded-3xl p-3.5 sm:p-4 text-left flex flex-col justify-between h-[115px] transition-all relative overflow-hidden border ${
                    isSelected
                      ? `bg-gradient-to-br ${theme.gradient} text-white border-white/30`
                      : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200/80'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-xs ${isSelected ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-800'}`}>
                      <SubjectClayIcon id={sub.id} />
                    </div>
                    <span className={`text-[11px] font-display font-black px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/25 text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                      {sub.lessonCount}
                    </span>
                  </div>
                  <span className="font-display font-black text-sm leading-tight truncate">
                    {sub.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* SEARCH & DIFFICULTY FILTER CONTROLS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Instant Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search quests or topics..."
              className="w-full pl-10 pr-9 py-2.5 bg-white rounded-full border border-neutral-200/90 text-sm font-body focus:outline-hidden focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Difficulty Chips */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 hide-scrollbar">
            <span className="text-xs font-display font-bold text-neutral-500 flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Level:
            </span>
            {[
              { id: 'all', label: 'All Levels' },
              { id: 'beginner', label: 'Beginner' },
              { id: 'explorer', label: 'Explorer' },
            ].map((diff) => (
              <button
                key={diff.id}
                onClick={() => { sounds.playPop(); setDifficultyFilter(diff.id); }}
                className={`px-3.5 py-1.5 rounded-full font-display font-black text-xs transition-all whitespace-nowrap ${
                  difficultyFilter === diff.id
                    ? 'bg-brand-purple text-white shadow-xs'
                    : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200/80'
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE SUBJECT HERO BANNER IF SPECIFIC SUBJECT SELECTED */}
        {currentSubjectInfo && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2.4rem] p-6 sm:p-8 mb-8 relative overflow-hidden bg-white shadow-card border-2 border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="relative z-10 text-center sm:text-left">
              <span className="text-xs font-display font-black uppercase tracking-wider text-brand-purple bg-brand-purple-light px-3 py-1 rounded-full mb-2 inline-block">
                Island Roadmap
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-neutral-900 mb-1.5">
                {currentSubjectInfo.name} Curriculum Path
              </h2>
              <p className="font-body text-sm text-neutral-600 max-w-xl leading-relaxed font-medium">
                {currentSubjectInfo.description}. Complete each step along the pathway to master this topic and earn the {currentSubjectInfo.name} Master Badge!
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-3">
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl px-4 py-3 text-center">
                <span className="block text-[11px] font-display font-black text-amber-700 uppercase tracking-wider">Estimated</span>
                <span className="font-display font-black text-base text-neutral-900">~15 Min / Step</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* QUEST CARDS GRID */}
        {filteredLessons.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-12 text-center border-2 border-neutral-100 shadow-card max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-brand-purple/10 text-brand-purple flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-display font-black text-2xl text-neutral-900 mb-2">No Quests Found</h3>
            <p className="font-body text-sm text-neutral-500 mb-6 font-medium">
              We couldn't find any activities matching your filter. Try picking another subject or clearing your search.
            </p>
            <button 
              onClick={() => { handleSubjectSelect('all'); setSearchQuery(''); setDifficultyFilter('all'); }}
              className="px-6 py-2.5 bg-brand-purple text-white font-display font-black rounded-full text-xs shadow-btn hover:bg-brand-purple-dark transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredLessons.map((lesson) => (
                <motion.div 
                  key={lesson.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                >
                  <LessonCard lesson={lesson} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LearnPage;
