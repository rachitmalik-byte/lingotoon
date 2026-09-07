import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Film } from 'lucide-react';
import { Link } from 'react-router-dom';
import { videos, videoThumbnailColors } from '../data/videos';
import VideoCard from '../components/content/VideoCard';
import Badge from '../components/ui/Badge';
import { staggerContainer, staggerItem, fadeIn } from '../hooks/useAnimation';

const VideosPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'English', 'Math', 'Science', 'General Knowledge'];

  const featuredVideo = videos.find(v => v.featured) || videos[0];
  const featuredColor = videoThumbnailColors[featuredVideo?.thumbnail] || { bg: '#7C3AED', icon: '🎬' };

  const filteredVideos = activeCategory === 'All' 
    ? videos 
    : videos.filter(v => v.subject === activeCategory);

  return (
    <div className="container-app py-8 md:py-12">
      {/* Featured Video Spotlight */}
      {featuredVideo && (
        <motion.div 
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="mb-14 rounded-[2.5rem] overflow-hidden shadow-2xl relative group"
        >
          <div 
            className="min-h-[380px] md:min-h-[440px] flex flex-col justify-end p-8 md:p-14 text-white relative overflow-hidden"
            style={{ backgroundColor: featuredColor.bg }}
          >
            {featuredVideo?.image && (
              <img
                src={featuredVideo.image}
                alt={featuredVideo.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
              />
            )}

            {/* Ambient Background Glows */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none"></div>
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/20 blur-3xl pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 bg-brand-yellow text-brand-purple-dark text-xs font-display font-bold px-3.5 py-1 rounded-full mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" /> Featured Learning Video
              </div>
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold mb-3 drop-shadow-md leading-tight">
                {featuredVideo.title}
              </h1>
              <p className="font-body text-base sm:text-xl text-white/90 mb-8 line-clamp-2 leading-relaxed">
                {featuredVideo.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  to={`/video/${featuredVideo.id}`} 
                  className="inline-flex items-center gap-2.5 bg-brand-yellow text-brand-purple-dark hover:bg-brand-yellow-light font-display font-bold px-8 py-4 rounded-full text-lg transition-transform hover:scale-105 active:scale-95 shadow-btn-hover"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Watch Now</span>
                </Link>

                <a
                  href="https://youtube.com/@lingotoon-x2m"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-display font-bold px-6 py-4 rounded-full text-base transition-transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  <span>YouTube: @lingotoon-x2m</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Category Filter Tabs */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand-purple-light flex items-center justify-center text-brand-purple">
              <Film className="w-5 h-5" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900">
              Watch & Learn Library
            </h2>
          </div>
          <span className="text-neutral-500 font-body font-semibold text-sm">
            {filteredVideos.length} episodes
          </span>
        </div>

        <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
          <div className="flex gap-2.5 min-w-max">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full font-display font-bold text-sm transition-all duration-200 ${
                    isSelected 
                      ? 'bg-brand-purple text-white shadow-btn scale-105' 
                      : 'bg-neutral-100 hover:bg-neutral-200/80 text-neutral-600'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Video Cards Grid */}
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        key={activeCategory}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredVideos.map((video) => (
            <motion.div key={video.id} variants={staggerItem} layout className="flex justify-center">
              <VideoCard video={video} className="w-full max-w-[340px]" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default VideosPage;
