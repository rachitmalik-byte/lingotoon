import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { videoThumbnailColors } from '../../data/videos';
import Logo from '../ui/Logo';

const VideoPlayer = ({ video, onProgress, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(video?.progress || 0); // 0 to 100
  const [currentTime, setCurrentTime] = useState(0); // in seconds
  const [isMuted, setIsMuted] = useState(false);

  // Duration in seconds
  const duration = video?.durationSeconds || 225;
  const colorConfig = videoThumbnailColors[video?.thumbnail] || { bg: '#7C3AED', accent: '#FACC15', icon: '🎬' };

  useEffect(() => {
    let interval;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const step = (1 / duration) * 100;
          const next = Math.min(prev + step, 100);
          if (next >= 100) {
            setIsPlaying(false);
            if (onComplete) onComplete();
            return 100;
          }
          // trigger progress callbacks roughly at 30%, 60%, 90%
          if (Math.floor(prev) < 30 && Math.floor(next) >= 30) {
            if (onProgress) onProgress(30);
          } else if (Math.floor(prev) < 60 && Math.floor(next) >= 60) {
            if (onProgress) onProgress(60);
          }
          return next;
        });
        setCurrentTime(prev => {
          const next = prev + 1;
          return next > duration ? duration : next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress, duration, onComplete, onProgress]);

  const togglePlay = () => {
    if (progress >= 100) {
      setProgress(0);
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setProgress(percentage);
    setCurrentTime(Math.floor((percentage / 100) * duration));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div 
      className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl group select-none bg-neutral-900"
      style={{ backgroundColor: colorConfig.bg }}
    >
      {/* Background Poster Image */}
      {video?.image && (
        <img 
          src={video.image} 
          alt={video.title} 
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'scale-105 opacity-90' : 'opacity-85'}`}
        />
      )}

      {/* Visual background elements / overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 pointer-events-none"></div>
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/15 blur-3xl pointer-events-none"></div>

      {/* Watermark */}
      <div className="absolute top-5 right-5 z-20 pointer-events-none opacity-80 transition-opacity">
        <Logo size="sm" variant="light" />
      </div>

      {/* Subject Badge top-left */}
      <div className="absolute top-5 left-5 z-20 pointer-events-none">
        <span className="bg-white/90 text-brand-purple-dark text-xs font-display font-bold px-3 py-1 rounded-full shadow-sm">
          {video?.subject || 'Learning'}
        </span>
      </div>

      {/* Center Character/Play Area */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-6 text-center">
        <motion.div 
          animate={{ scale: isPlaying ? [1, 1.06, 1] : 1 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="mb-4"
        >
          {isPlaying ? (
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl animate-pulse shadow-lg">
              {colorConfig.icon}
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-brand-yellow flex items-center justify-center shadow-btn-hover transform hover:scale-105 transition-transform cursor-pointer">
              <Play className="w-12 h-12 text-brand-purple-dark ml-1.5" fill="currentColor" />
            </div>
          )}
        </motion.div>

        <h2 className="font-display text-white text-2xl sm:text-4xl font-bold drop-shadow-md max-w-xl leading-tight">
          {video?.title || "Educational Lesson"}
        </h2>

        {isPlaying ? (
          <p className="font-body text-brand-yellow font-bold mt-2 text-sm sm:text-base tracking-wide flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping"></span>
            Now Playing • Learn with Lingo!
          </p>
        ) : (
          <p className="font-body text-white/80 font-semibold mt-2 text-sm sm:text-base">
            Tap anywhere to watch
          </p>
        )}
      </div>

      {/* Clickable overlay to toggle play/pause */}
      <button 
        type="button" 
        className="absolute inset-0 z-10 cursor-pointer w-full h-full bg-transparent border-none outline-none"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      />

      {/* Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 pt-16 pb-4 px-6 bg-gradient-to-t from-black/85 via-black/50 to-transparent flex flex-col justify-end z-20 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        
        {/* Progress Slider */}
        <div 
          className="w-full h-2.5 bg-white/30 rounded-full mb-3 cursor-pointer relative"
          onClick={handleSeek}
        >
          <div 
            className="absolute top-0 left-0 h-full bg-brand-yellow rounded-full transition-all duration-200 ease-linear"
            style={{ width: `${progress}%` }}
          />
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-200 ease-linear hover:scale-125"
            style={{ left: `calc(${progress}% - 8px)` }}
          />
        </div>

        {/* Buttons and Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={togglePlay}
              className="text-white hover:text-brand-yellow transition-colors focus:outline-none p-1"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {progress >= 100 ? (
                <RotateCcw className="w-6 h-6" />
              ) : isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current" />
              )}
            </button>
            <div className="text-white/90 font-body text-xs sm:text-sm font-bold tracking-wider">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:text-brand-yellow transition-colors focus:outline-none p-1"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button 
              className="text-white hover:text-brand-yellow transition-colors focus:outline-none p-1"
              aria-label="Fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
