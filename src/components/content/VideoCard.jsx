import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { videoThumbnailColors } from '../../data/videos';
import { sounds } from '../../utils/soundEffects';

const VideoCard = ({ video, compact = false, className = '' }) => {
  if (!video) return null;

  const colorConfig = videoThumbnailColors[video.thumbnail] || {
    bg: '#7C3AED',
    accent: '#FACC15'
  };

  return (
    <Link 
      to={`/video/${video.id}`} 
      onClick={() => sounds.playPop()}
      className={`block w-[280px] sm:w-[300px] flex-shrink-0 group snap-start select-none ${className}`}
    >
      <motion.div 
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
        className="bg-white rounded-[2.2rem] p-3.5 shadow-card hover:shadow-2xl border-2 border-neutral-100 hover:border-brand-blue/40 transition-all duration-300 relative overflow-hidden"
      >
        {/* 16:9 Video Cinema Canvas */}
        <div className="relative aspect-video rounded-[1.6rem] overflow-hidden mb-3 shadow-sm bg-neutral-900">
          {video.image ? (
            <div className="w-full h-full relative overflow-hidden">
              <img 
                src={video.image} 
                alt={video.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </div>
          ) : (
            <div 
              className="w-full h-full flex items-center justify-center relative overflow-hidden"
              style={{ backgroundColor: colorConfig.bg }}
            >
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-white/20 blur-xl" />
              <Play className="w-12 h-12 text-white/70" />
            </div>
          )}

          {/* Interactive Play Button with Clay 3D styling */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-13 h-13 bg-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.25),inset_2px_2px_4px_rgba(255,255,255,0.95),inset_-2px_-2px_4px_rgba(0,0,0,0.12)] border-2 border-white transform scale-95 group-hover:scale-115 transition-transform duration-300 relative">
              <span className="absolute inset-0 rounded-full bg-brand-yellow/40 animate-ping opacity-0 group-hover:opacity-100" />
              <Play className="w-5 h-5 text-brand-purple ml-0.5 fill-current" />
            </div>
          </div>

          {/* Clay Duration Chip */}
          <div className="absolute bottom-2.5 right-2.5 bg-neutral-900/90 text-white font-display font-black text-[11px] px-3 py-0.5 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_1px_1px_2px_rgba(255,255,255,0.25)] border border-white/20 flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-brand-yellow" />
            <span>{video.duration}</span>
          </div>

          {/* Featured Clay Indicator */}
          {video.featured && (
            <div className="absolute top-2.5 left-2.5 bg-brand-purple text-white font-display font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-[0_4px_10px_rgba(124,58,237,0.35),inset_1px_1px_2px_rgba(255,255,255,0.3)] border border-white/30 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-brand-yellow fill-current" />
              <span>Featured</span>
            </div>
          )}
        </div>

        {/* Video Info - Clean & Uncluttered */}
        <div className="space-y-1 px-1">
          <span className="text-[11px] font-display font-extrabold uppercase tracking-wider text-brand-blue">
            {video.subject}
          </span>
          
          <h4 className="font-display font-black text-base text-neutral-900 truncate group-hover:text-brand-purple transition-colors leading-snug">
            {video.title}
          </h4>

          <p className="font-body text-xs text-neutral-500 line-clamp-1 leading-relaxed font-medium">
            {video.description}
          </p>
        </div>

      </motion.div>
    </Link>
  );
};

export default VideoCard;
