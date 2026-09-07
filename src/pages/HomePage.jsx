import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Trophy, PlayCircle, BookOpen, Gamepad2, ArrowRight } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { staggerContainer, staggerItem } from '../hooks/useAnimation';
import { sounds } from '../utils/soundEffects';

// Data
import { videos } from '../data/videos';
import { games } from '../data/games';
import { lessons } from '../data/lessons';
import { subjects } from '../data/subjects';
import { achievements } from '../data/achievements';
import { userProgress } from '../data/userProgress';

// Decorative & Branding Elements
import FluidSideAccents from '../components/decorative/FluidSideAccents';

// Layout & Home Components
import HeroBanner from '../components/home/HeroBanner';
import FeaturePillars from '../components/home/FeaturePillars';
import PinnedLearningJourney from '../components/home/PinnedLearningJourney';
import CuratedCoursesGrid from '../components/home/CuratedCoursesGrid';
import YoutubeSpotlight from '../components/home/YoutubeSpotlight';
import PhysicalAndMobileShowcase from '../components/home/PhysicalAndMobileShowcase';
import FunEndingZone from '../components/home/FunEndingZone';

import ContentRail from '../components/layout/ContentRail';
import LessonCard from '../components/content/LessonCard';
import VideoCard from '../components/content/VideoCard';
import GameTile from '../components/content/GameTile';
import SubjectCard from '../components/content/SubjectCard';
import ChallengeCard from '../components/content/ChallengeCard';
import AchievementBadge from '../components/content/AchievementBadge';

const HomePage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const inProgressLessons = useMemo(() => {
    if (!user) return [];
    return lessons.filter(lesson => lesson.progress > 0 && lesson.progress < 100);
  }, [user]);

  const featuredVideos = useMemo(() => {
    return videos.filter(v => v.featured).concat(videos.filter(v => !v.featured)).slice(0, 6);
  }, []);

  return (
    <div className="w-full pb-20 bg-[#FAF9F6] relative">
      {/* PERSISTENT FLUID WAVY SIDE ACCENTS MATCHING REFERENCE DESIGN */}
      <FluidSideAccents />

      {/* 1. BRAND HERO BANNER WITH INTERACTIVE 3D LOGO & TRACKING EYES */}
      <HeroBanner />

      {/* 2. THREE PILLAR FEATURE CARDS (Interactive Lessons, Adventure Games, Progress Tracker) */}
      <FeaturePillars />

      {/* 3. PINNED STOP-SCROLL INTERACTIVE SHOWCASE (3-Step Learning Odyssey) */}
      <PinnedLearningJourney />

      {/* 4. CURATED COURSE PACKS (Fun with ABCs, Bear's Grammar Safari, Globe Trotter, Taste & Learn) */}
      <CuratedCoursesGrid />

      {/* 5. OFFICIAL YOUTUBE SPOTLIGHT (Healthy Habits with Kids Episode & Subscribe Link) */}
      <YoutubeSpotlight />

      {/* 6. PHYSICAL & MOBILE SHOWCASE (Activity Notebook & Smartphone App) */}
      <PhysicalAndMobileShowcase />

      {/* 5. CONTINUE LEARNING (ADVENTURE MISSION PODS - Logged in explorers only) */}
      {user && inProgressLessons.length > 0 && (
        <section className="py-12 md:py-16 bg-gradient-to-b from-white via-purple-50/20 to-white relative z-10 border-b border-purple-100/40 overflow-hidden">
          {/* Subtle Ambient Fluid Blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

          <div className="container-app relative z-10">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
              <div>
                <span className="text-xs font-display font-black uppercase tracking-wider text-brand-purple bg-brand-purple-light px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-2.5 shadow-xs">
                  <BookOpen className="w-3.5 h-3.5" /> Active Missions
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                  Continue Your Learning Quest
                </h2>
                <p className="text-neutral-600 mt-1 font-medium text-sm sm:text-base">
                  Jump back into your active quests to earn stars, collect XP, and level up!
                </p>
              </div>
              <Link 
                to="/learn"
                onClick={() => sounds.playPop()}
                className="inline-flex items-center gap-2 font-display font-black text-sm text-brand-purple hover:text-white bg-brand-purple-light hover:bg-brand-purple px-5 py-2.5 rounded-full transition-all duration-300 shadow-xs hover:shadow-md transform hover:scale-105"
              >
                <span>View All Quests</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Responsive 3-Column Quest Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressLessons.map((lesson) => (
                <div key={lesson.id} className="h-full">
                  <LessonCard lesson={lesson} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. WATCH & LEARN (TOON CINEMA CARDS) */}
      <section className="py-10 md:py-14 bg-white/80 backdrop-blur-xs relative z-10 border-b border-neutral-100/70">
        <div className="container-app mb-3">
          <span className="text-xs font-display font-black uppercase tracking-wider text-brand-blue bg-brand-blue-light px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 shadow-xs">
            <PlayCircle className="w-3.5 h-3.5" /> Toon Cinema
          </span>
        </div>
        <ContentRail 
          title="Watch & Learn" 
          subtitle="Captivating animated stories and sing-along phonics songs"
          viewAllLink="/videos"
        >
          {featuredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ContentRail>
      </section>

      {/* 7. PLAY & LEARN ARCADE GALAXY (Curated 3 Featured Games) */}
      <section id="arcade-section" className="py-12 md:py-16 bg-gradient-to-b from-brand-orange-light/20 via-amber-50/40 to-transparent relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="container-app relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <span className="text-xs font-display font-black uppercase tracking-wider text-brand-orange bg-brand-orange-light px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 mb-2 shadow-xs">
                <Gamepad2 className="w-3.5 h-3.5" /> Playable Arcade
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-black text-neutral-800">Play & Learn</h2>
              <p className="text-neutral-600 mt-1 font-medium text-sm sm:text-base">Interactive arcade games that make spelling, phonics, and math super fun!</p>
            </div>
            <Link 
              to="/games" 
              onClick={() => sounds.playPop()}
              className="text-brand-orange font-display font-extrabold hover:text-orange-600 transition-colors whitespace-nowrap inline-flex items-center gap-1.5 bg-brand-orange/10 hover:bg-brand-orange/20 px-4 py-2 rounded-full"
            >
              <span>Explore All Games</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.slice(0, 3).map((game) => (
              <GameTile key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. EXPLORE SUBJECTS (CLAYMORPHIC WORLD ISLANDS) */}
      <section className="py-12 md:py-16 bg-white/90 backdrop-blur-xs relative z-10">
        <div className="container-app">
          <div className="mb-8">
            <span className="text-xs font-display font-black uppercase tracking-wider text-brand-purple bg-brand-purple-light px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 mb-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" /> Discover Topics
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-neutral-800">Explore Subjects</h2>
            <p className="text-neutral-600 mt-1 font-medium text-sm sm:text-base">Choose a topic island and set sail on a joyful learning expedition</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. TODAY'S CHALLENGE (DAILY GOLDEN MYSTERY QUEST) */}
      <section className="py-10 md:py-14 bg-white/80 backdrop-blur-xs relative z-10">
        <div className="container-app flex justify-center">
          <div className="w-full max-w-3xl">
            <ChallengeCard challenge={userProgress.dailyChallenge} />
          </div>
        </div>
      </section>

      {/* 10. ACHIEVEMENTS (HALL OF TROPHIES) */}
      <section className="py-14 md:py-20 bg-gradient-to-b from-brand-lavender/40 to-white relative z-10">
        <div className="container-app">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <span className="text-xs font-display font-black uppercase tracking-wider text-amber-600 bg-amber-100 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
                <Trophy className="w-3.5 h-3.5" /> Trophy Showcase
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-black text-neutral-800">Recent Achievements</h2>
              <p className="text-neutral-600 mt-1 font-medium text-sm sm:text-base">Tap any medal to inspect rewards and XP gems</p>
            </div>
            <Link 
              to="/progress" 
              onClick={() => sounds.playPop()}
              className="text-brand-purple font-display font-extrabold hover:text-brand-purple-dark transition-colors whitespace-nowrap inline-flex items-center gap-1.5"
            >
              <span>View Full Trophy Vault</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex flex-nowrap overflow-x-auto pb-4 gap-6 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {achievements.slice(0, 6).map((achievement) => (
              <div key={achievement.id} className="flex-shrink-0">
                <AchievementBadge achievement={achievement} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. PLAYFUL HIGH-FIVE CELEBRATION & BOTTOM CALL-TO-ACTION ZONE */}
      <FunEndingZone />
    </div>
  );
};

export default HomePage;
