import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Youtube, ExternalLink, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

const YoutubeSpotlight = () => {
  const [isPlayingEmbed, setIsPlayingEmbed] = useState(false);

  const videoId = 'nBy5TBWLook';
  const channelUrl = 'https://youtube.com/@lingotoon-x2m';
  const videoTitle = 'Healthy Habits with Kids | English Learning | Lingo Toons';

  return (
    <section className="py-12 md:py-18 relative z-10 overflow-hidden bg-gradient-to-b from-white via-red-50/20 to-white border-b border-red-100/40">
      {/* Ambient Halos */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      <div className="container-app relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 border border-red-200 text-red-600 shadow-xs">
            <Youtube className="w-4 h-4 fill-current" />
            <span className="font-display font-bold text-xs uppercase tracking-wider">
              Official YouTube Channel
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-neutral-900 tracking-tight">
            Watch on <span className="text-red-600">YouTube</span> & Sing Along!
          </h2>

          <p className="font-body text-base sm:text-lg text-neutral-600 font-medium leading-relaxed">
            Catch our full-length animated episodes, catchy rhymes, and learning tunes directly on our official YouTube channel.
          </p>
        </div>

        {/* Spotlight Video Showcase Card */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-white via-[#FFF8F8] to-[#FFF1F1] rounded-[3.2rem] border-2 border-red-100/90 shadow-2xl p-6 sm:p-8 lg:p-10 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left/Main: Video Player or Real YouTube Thumbnail Frame */}
            <div className="lg:col-span-7">
              <div className="relative aspect-video rounded-[2.2rem] overflow-hidden shadow-xl bg-neutral-950 group border-2 border-white">
                {isPlayingEmbed ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={videoTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <>
                    <img
                      src="https://i.ytimg.com/vi/nBy5TBWLook/maxresdefault.jpg"
                      alt={videoTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />

                    {/* Official Channel Badge */}
                    <div className="absolute top-4 left-4 bg-red-600 text-white font-display font-bold text-xs px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
                      <Youtube className="w-3.5 h-3.5 fill-current" />
                      <span>Official Release</span>
                    </div>

                    {/* Big Center Interactive Play Button */}
                    <button
                      onClick={() => { sounds.playFanfare(); setIsPlayingEmbed(true); }}
                      className="absolute inset-0 m-auto w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-2xl transform group-hover:scale-115 active:scale-95 transition-all duration-300 cursor-pointer"
                      aria-label="Play YouTube Video"
                    >
                      <Play className="w-8 sm:w-10 h-8 sm:h-10 ml-1 fill-current" />
                    </button>

                    {/* Duration Badge */}
                    <div className="absolute bottom-4 right-4 clay-pill-dark text-white font-display font-bold text-xs px-3 py-1">
                      Featured Episode
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right: Channel Details & Subscribe Actions */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/80 text-red-600 text-xs font-display font-bold">
                  <Play className="w-3 h-3 fill-current" />
                  <span>Now Streaming Free</span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-neutral-900 leading-tight">
                  Healthy Habits & Fun Nursery Rhymes for Kids!
                </h3>
                <p className="font-body text-sm sm:text-base text-neutral-600 font-medium leading-relaxed">
                  Join our animated buddies in a fun musical lesson about washing hands, eating colorful veggies, sleeping well, and staying energetic every day!
                </p>
              </div>

              {/* Channel Stats / Trust Seal */}
              <div className="clay-card-white p-4 rounded-2xl border border-red-100/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-display font-bold text-neutral-800">
                  <Award className="w-4 h-4 text-brand-yellow" />
                  <span>Verified Creator Channel: @lingotoon-x2m</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                  <span>100% Family Safe • Ad-Free Kids Content</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playPop()}
                  className="flex-1 py-3.5 px-6 rounded-full bg-red-600 hover:bg-red-700 text-white font-display font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Youtube className="w-4 h-4 fill-current" />
                  <span>Subscribe on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>

                {!isPlayingEmbed && (
                  <button
                    onClick={() => { sounds.playFanfare(); setIsPlayingEmbed(true); }}
                    className="py-3.5 px-6 rounded-full bg-white hover:bg-neutral-50 text-neutral-800 font-display font-bold text-sm border-2 border-neutral-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current text-red-600" />
                    <span>Watch Here</span>
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default YoutubeSpotlight;
