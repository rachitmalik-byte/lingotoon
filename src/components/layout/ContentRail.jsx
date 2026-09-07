import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ContentRail = ({ title, subtitle, children, viewAllLink, viewAllText = 'View All' }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, [children]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full">
      <div className="container-app mb-4 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-neutral-900">{title}</h2>
          {subtitle && <p className="text-neutral-500 font-body text-sm mt-0.5 font-medium">{subtitle}</p>}
        </div>
        {viewAllLink && (
          <Link 
            to={viewAllLink} 
            onClick={() => sounds.playPop()}
            className="text-brand-purple font-display font-extrabold hover:text-brand-purple-dark text-sm transition-colors flex items-center gap-1 group bg-brand-purple/10 hover:bg-brand-purple/15 px-3.5 py-1.5 rounded-full"
          >
            <span>{viewAllText}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        )}
      </div>

      <div className="relative group">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => { sounds.playPop(); scroll('left'); }}
            className="hidden md:flex absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/95 backdrop-blur-md rounded-full items-center justify-center shadow-xl border border-neutral-200/80 text-neutral-700 hover:text-brand-purple hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
        )}

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="content-rail px-4 sm:px-6 lg:px-8 py-2 flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        >
          {children}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => { sounds.playPop(); scroll('right'); }}
            className="hidden md:flex absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/95 backdrop-blur-md rounded-full items-center justify-center shadow-xl border border-neutral-200/80 text-neutral-700 hover:text-brand-purple hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ContentRail;
