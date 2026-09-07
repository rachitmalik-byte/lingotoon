import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, Calendar, User, ArrowRight, Sparkles, Tag, ChevronRight, Share2, Check, ExternalLink } from 'lucide-react';
import { blogPosts } from '../data/blogs';
import { sounds } from '../utils/soundEffects';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePost, setActivePost] = useState(null);
  const [copiedSlug, setCopiedSlug] = useState(null);

  const categories = ['All', 'Early Phonics', 'Healthy Habits', 'Math & STEM'];

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === selectedCategory);

  const handleCopyLink = (slug) => {
    sounds.playPop();
    navigator.clipboard?.writeText?.(window.location.origin + '/blog#' + slug);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="w-full bg-[#FAF9F6] pb-24 relative overflow-hidden">
      {/* Background Decorative Halos */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7C3AED]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#FFD233]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-app relative z-10 pt-8 sm:pt-12">
        
        {/* SEO Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple-light border border-brand-purple/20 shadow-xs">
            <Sparkles className="w-4 h-4 text-brand-purple" />
            <span className="font-display font-bold text-xs uppercase tracking-wider text-brand-purple">
              Learning Lab & Parent Insights
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-neutral-900 tracking-tight leading-tight">
            Nurturing Young Minds Through <span className="text-brand-purple">Playful Science</span>
          </h1>

          <p className="font-body text-base sm:text-lg text-neutral-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Practical advice, research-backed early literacy strategies, and screen-time tips crafted by child development specialists and educators.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { sounds.playPop(); setSelectedCategory(cat); }}
                className={`px-5 py-2 rounded-full font-display font-bold text-xs sm:text-sm transition-all transform active:scale-95 ${
                  selectedCategory === cat
                    ? 'bg-brand-purple text-white shadow-md scale-105'
                    : 'bg-white text-neutral-600 hover:text-brand-purple hover:bg-purple-50 border border-neutral-200/80 shadow-xs'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post Banner */}
        {filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[3rem] bg-white border-2 border-purple-100 shadow-xl overflow-hidden mb-16 grid grid-cols-1 lg:grid-cols-12 gap-0 group hover:shadow-2xl transition-shadow"
          >
            <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto overflow-hidden bg-neutral-900">
              <img
                src={filteredPosts[0].image}
                alt={filteredPosts[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-brand-yellow text-neutral-900 font-display font-black text-xs px-3.5 py-1.5 rounded-full shadow-md">
                Featured Article
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-semibold text-neutral-500">
                  <span className="bg-brand-purple/10 text-brand-purple px-3 py-1 rounded-full font-display font-bold">
                    {filteredPosts[0].category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    {filteredPosts[0].readTime}
                  </span>
                </div>

                <h2 className="font-display font-black text-2xl sm:text-3xl text-neutral-900 leading-snug group-hover:text-brand-purple transition-colors">
                  {filteredPosts[0].title}
                </h2>

                <p className="font-body text-base text-neutral-600 leading-relaxed line-clamp-3">
                  {filteredPosts[0].excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div className="text-xs text-neutral-500">
                  <p className="font-bold text-neutral-800">{filteredPosts[0].author}</p>
                  <p>{filteredPosts[0].date}</p>
                </div>

                <button
                  onClick={() => { sounds.playPop(); setActivePost(filteredPosts[0]); }}
                  className="px-5 py-2.5 rounded-full bg-brand-purple hover:bg-brand-purple-dark text-white font-display font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* All Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-[2.5rem] border-2 border-neutral-100/90 shadow-card hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-brand-purple font-display font-bold text-xs px-3 py-1 rounded-full shadow-sm">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-neutral-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-neutral-900 leading-snug group-hover:text-brand-purple transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="font-body text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {post.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[11px] font-bold text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-full">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0 border-t border-neutral-100 flex items-center justify-between mt-auto">
                <span className="text-xs font-bold text-neutral-700 truncate max-w-[150px]">
                  {post.author.split('(')[0]}
                </span>

                <button
                  onClick={() => { sounds.playPop(); setActivePost(post); }}
                  className="inline-flex items-center gap-1 text-xs font-display font-black text-brand-purple group-hover:text-brand-purple-dark hover:underline"
                >
                  <span>Read More</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Read Article Reader Modal */}
        <AnimatePresence>
          {activePost && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 pt-16 sm:pt-20 pb-12 bg-black/75 backdrop-blur-md overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                className="relative w-full max-w-3xl max-h-[86vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className="p-6 sm:p-8 bg-gradient-to-r from-[#7C3AED] to-[#591ac0] text-white relative shrink-0">
                  <button
                    onClick={() => { sounds.playPop(); setActivePost(null); }}
                    className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                  >
                    ✕
                  </button>

                  <span className="inline-block bg-brand-yellow text-neutral-900 text-xs font-display font-black px-3 py-1 rounded-full mb-3 shadow-sm">
                    {activePost.category}
                  </span>

                  <h2 className="font-display font-black text-2xl sm:text-3xl pr-8 leading-tight">
                    {activePost.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-purple-200">
                    <span>{activePost.author}</span>
                    <span>•</span>
                    <span>{activePost.date}</span>
                    <span>•</span>
                    <span>{activePost.readTime}</span>
                  </div>
                </div>

                {/* Modal Body / Article Content */}
                <div className="p-6 sm:p-10 overflow-y-auto space-y-6 font-body text-neutral-700 leading-relaxed">
                  <p className="text-lg font-medium text-neutral-800 bg-purple-50/60 p-4 rounded-2xl border border-purple-100">
                    {activePost.excerpt}
                  </p>

                  {activePost.content.map((sec, i) => (
                    <div key={i} className="space-y-2">
                      <h4 className="font-display font-bold text-xl text-neutral-900">
                        {sec.heading}
                      </h4>
                      <p className="text-base text-neutral-600 leading-relaxed">
                        {sec.body}
                      </p>
                    </div>
                  ))}

                  {/* Channel recommendation CTA */}
                  <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-red-50 via-amber-50 to-purple-50 border-2 border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="font-display font-bold text-base text-neutral-900">Watch the Animated Lesson Video</h4>
                      <p className="text-xs text-neutral-600">Catch "Healthy Habits with Kids" and fun phonics songs on our official YouTube channel.</p>
                    </div>
                    <a
                      href="https://youtube.com/@lingotoon-x2m"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-display font-bold text-xs whitespace-nowrap shadow-md hover:scale-105 transition-all"
                    >
                      Visit @lingotoon-x2m →
                    </a>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 sm:p-6 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between shrink-0">
                  <button
                    onClick={() => handleCopyLink(activePost.slug)}
                    className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-neutral-600 hover:text-brand-purple transition-colors"
                  >
                    {copiedSlug === activePost.slug ? <Check className="w-4 h-4 text-brand-green" /> : <Share2 className="w-4 h-4" />}
                    <span>{copiedSlug === activePost.slug ? 'Link Copied!' : 'Share Article'}</span>
                  </button>

                  <button
                    onClick={() => { sounds.playPop(); setActivePost(null); }}
                    className="px-6 py-2 rounded-full bg-neutral-200 hover:bg-neutral-300 font-display font-bold text-xs text-neutral-800 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default BlogPage;
