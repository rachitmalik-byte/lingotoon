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

          {/* Interactive Play Button with Pulse on Hover */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-110 transition-transform duration-300 relative">
              <span className="absolute inset-0 rounded-full bg-brand-yellow/40 animate-ping opacity-0 group-hover:opacity-100" />
              <Play className="w-5 h-5 text-brand-purple ml-0.5 fill-current" />
            </div>
          </div>

          {/* Clean Glass Duration Chip */}
          <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-md text-white font-display font-black text-[11px] px-2.5 py-0.5 rounded-lg shadow-sm border border-white/15 flex items-center gap-1">
            <Clock className="w-3 h-3 text-brand-yellow" />
            <span>{video.duration}</span>
          </div>

          {/* Optional Featured Indicator */}
          {video.featured && (
            <div className="absolute top-2.5 left-2.5 bg-brand-purple/90 backdrop-blur-md text-white font-display font-black text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm border border-white/20 flex items-center gap-1">
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
