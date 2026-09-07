import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, ExternalLink } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

const YoutubeSpotlight = () => {
  const channelUrl = 'https://youtube.com/@lingotoon-x2m';

  return (
    <section className="py-6 sm:py-8 relative z-10 bg-[#FAF9F6]">
      <div className="container-app flex justify-center">
        {/* Sleek Minimalist YouTube Capsule Button */}
        <motion.a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sounds.playPop()}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="group inline-flex items-center gap-3 sm:gap-4 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white hover:bg-red-50/60 border-2 border-red-100 hover:border-red-300 shadow-[0_8px_30px_rgba(220,38,38,0.08)] hover:shadow-[0_12px_36px_rgba(220,38,38,0.16)] transition-all duration-300 cursor-pointer select-none"
          title="Watch LiNGO TOON on YouTube (@lingotoon-x2m)"
        >
          {/* Official YouTube Logo Icon Capsule */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-red-600 group-hover:bg-red-700 text-white flex items-center justify-center shadow-md shrink-0 transition-transform group-hover:scale-110">
            <Youtube className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
          </div>

          {/* Clean Label */}
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-sm sm:text-base text-neutral-900 group-hover:text-red-600 transition-colors">
                Watch on YouTube
              </span>
              <span className="text-[11px] font-display font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 hidden sm:inline-block">
                @lingotoon-x2m
              </span>
            </div>
            <p className="font-body text-xs text-neutral-500 font-medium">
              Animated songs, stories & phonics tunes
            </p>
          </div>

          {/* Outward Arrow */}
          <div className="w-7 h-7 rounded-full bg-neutral-100 group-hover:bg-red-100 flex items-center justify-center text-neutral-400 group-hover:text-red-600 transition-colors shrink-0 ml-1">
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </motion.a>
      </div>
    </section>
  );
};

export default YoutubeSpotlight;
