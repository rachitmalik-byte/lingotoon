import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Video, Gamepad2, Plus, Trash2, Edit3, Eye, CheckCircle2, 
  ExternalLink, Sparkles, Youtube, ArrowLeft, Shield, AlertCircle, Save, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { sounds } from '../utils/soundEffects';

const SemiAdminPage = () => {
  const { 
    blogs, addBlog, deleteBlog, 
    videos, addVideo, deleteVideo, toggleFeaturedVideo,
    wordPuzzles, addWordPuzzle, deleteWordPuzzle 
  } = useContent();

  const [activeTab, setActiveTab] = useState('blogs'); // 'blogs' | 'videos' | 'puzzles'
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // --- BLOG FORM STATE ---
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('Early Phonics');
  const [blogAuthor, setBlogAuthor] = useState('LingoToon Editorial Team');
  const [blogReadTime, setBlogReadTime] = useState('4 min read');
  const [blogImage, setBlogImage] = useState('/images/hero_learning_scene.jpg');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogSections, setBlogSections] = useState([
    { heading: 'Key Insights & Strategies', body: 'Discover playful, research-backed learning activities that spark curiosity.' }
  ]);

  const handleAddSection = () => {
    sounds.playPop();
    setBlogSections(prev => [...prev, { heading: 'New Key Point', body: '' }]);
  };

  const handleSectionChange = (idx, field, value) => {
    setBlogSections(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  const handleRemoveSection = (idx) => {
    sounds.playPop();
    setBlogSections(prev => prev.filter((_, i) => i !== idx));
  };

  const handlePublishBlog = (e) => {
    e.preventDefault();
    if (!blogTitle.trim()) return;

    sounds.playCorrect();
    const newPost = addBlog({
      title: blogTitle.trim(),
      category: blogCategory,
      author: blogAuthor.trim(),
      readTime: blogReadTime,
      image: blogImage,
      excerpt: blogExcerpt.trim() || 'A fresh early childhood development article from the LingoToon creator studio.',
      content: blogSections.filter(s => s.heading || s.body)
    });

    triggerToast(`🎉 Published: "${newPost.title}"!`);
    // Reset form
    setBlogTitle('');
    setBlogExcerpt('');
    setBlogSections([{ heading: 'Key Insights & Strategies', body: '' }]);
  };

  // --- VIDEO FORM STATE ---
  const [vidTitle, setVidTitle] = useState('');
  const [vidUrl, setVidUrl] = useState('');
  const [vidCategory, setVidCategory] = useState('Healthy Habits');
  const [vidSubject, setVidSubject] = useState('English');
  const [vidDuration, setVidDuration] = useState('3:15');
  const [vidDescription, setVidDescription] = useState('');
  const [vidFeatured, setVidFeatured] = useState(false);

  // Extracted YouTube preview
  const ytMatch = vidUrl ? vidUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/) : null;
  const extractedYtId = ytMatch ? ytMatch[1] : '';

  const handleAddVideo = (e) => {
    e.preventDefault();
    if (!vidTitle.trim()) return;

    sounds.playCorrect();
    const newVid = addVideo({
      title: vidTitle.trim(),
      youtubeUrl: vidUrl.trim(),
      youtubeId: extractedYtId,
      category: vidCategory,
      subject: vidSubject,
      duration: vidDuration,
      description: vidDescription.trim() || 'Exciting learning video from LingoToon.',
      featured: vidFeatured
    });

    triggerToast(`🎬 Video Added: "${newVid.title}"!`);
    setVidTitle('');
    setVidUrl('');
    setVidDescription('');
    setVidFeatured(false);
  };

  // --- PUZZLE FORM STATE ---
  const [puzzleWord, setPuzzleWord] = useState('');
  const [puzzleHint, setPuzzleHint] = useState('');
  const [puzzleEmoji, setPuzzleEmoji] = useState('🌟');
  const [puzzleCategory, setPuzzleCategory] = useState('Animals');

  const handleAddPuzzle = (e) => {
    e.preventDefault();
    if (!puzzleWord.trim()) return;

    sounds.playCorrect();
    addWordPuzzle({
      word: puzzleWord.trim(),
      hint: puzzleHint.trim(),
      emoji: puzzleEmoji.trim() || '🌟',
      category: puzzleCategory
    });

    triggerToast(`🧩 Puzzle Added: "${puzzleWord.toUpperCase()}"!`);
    setPuzzleWord('');
    setPuzzleHint('');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 pb-20 font-body">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl bg-neutral-900 text-white shadow-2xl flex items-center gap-3 border border-neutral-700 font-display text-sm font-bold"
          >
            <CheckCircle2 className="w-5 h-5 text-brand-green" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP STUDIO NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200 shadow-xs px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/" onClick={() => sounds.playPop()} className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-lg text-brand-purple">LingoToon</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-display font-black text-xs uppercase tracking-wider">
                Semi-Admin Studio
              </span>
            </div>
            <p className="text-xs text-neutral-500 font-medium">
              Publish blog articles, manage YouTube video episodes, and create puzzle words
            </p>
          </div>
        </div>

        {/* Quick Links & Switchers */}
        <div className="flex items-center gap-2.5 text-xs font-display font-bold">
          <Link 
            to="/" 
            className="px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </Link>
          <Link 
            to="/admin" 
            className="px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Shield className="w-3.5 h-3.5 text-brand-yellow" />
            <span>Master Admin →</span>
          </Link>
        </div>
      </header>

      {/* STUDIO MAIN WORKSPACE CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-display font-bold text-neutral-500 uppercase tracking-wider">Active Articles</span>
              <div className="font-display font-black text-3xl text-brand-purple mt-1">{blogs.length}</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-brand-purple flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-red-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-display font-bold text-neutral-500 uppercase tracking-wider">Active Videos</span>
              <div className="font-display font-black text-3xl text-red-600 mt-1">{videos.length}</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-amber-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-display font-bold text-neutral-500 uppercase tracking-wider">Playable Puzzles</span>
              <div className="font-display font-black text-3xl text-amber-600 mt-1">{wordPuzzles.length}</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Gamepad2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* WORKSPACE TAB SWITCHER */}
        <div className="flex items-center gap-2 mb-6 border-b border-neutral-200 pb-3">
          {[
            { id: 'blogs', label: 'Write & Post Blogs', icon: FileText, count: blogs.length },
            { id: 'videos', label: 'Manage Videos & YouTube', icon: Video, count: videos.length },
            { id: 'puzzles', label: 'Create Word Puzzles', icon: Gamepad2, count: wordPuzzles.length }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { sounds.playPop(); setActiveTab(tab.id); }}
                className={`px-5 py-2.5 rounded-full font-display font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
                  active 
                    ? 'bg-neutral-900 text-white shadow-md' 
                    : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ================= TAB 1: BLOG PUBLISHER ================= */}
        {activeTab === 'blogs' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Blog Creator Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <div>
                  <h3 className="font-display font-black text-xl text-neutral-900">Compose New Blog Post</h3>
                  <p className="text-xs text-neutral-500 font-medium">Articles automatically publish to /blog and update the live feed</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-50 text-brand-purple font-display font-bold text-xs">
                  SEO & Parents Lab
                </span>
              </div>

              <form onSubmit={handlePublishBlog} className="space-y-4">
                <div>
                  <label className="block font-display font-bold text-xs text-neutral-700 mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={blogTitle}
                    onChange={e => setBlogTitle(e.target.value)}
                    placeholder="e.g. 7 Creative Ways to Practice Phonics While Cooking Dinner"
                    className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-purple text-sm font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display font-bold text-xs text-neutral-700 mb-1">Category</label>
                    <select
                      value={blogCategory}
                      onChange={e => setBlogCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-purple text-sm font-medium bg-white"
                    >
                      <option>Early Phonics</option>
                      <option>Healthy Habits</option>
                      <option>Math & STEM</option>
                      <option>Parenting</option>
                      <option>Vocabulary</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-display font-bold text-xs text-neutral-700 mb-1">Estimated Read Time</label>
                    <input
                      type="text"
                      value={blogReadTime}
                      onChange={e => setBlogReadTime(e.target.value)}
                      placeholder="e.g. 4 min read"
                      className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-purple text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display font-bold text-xs text-neutral-700 mb-1">Author Name & Title</label>
                    <input
                      type="text"
                      value={blogAuthor}
                      onChange={e => setBlogAuthor(e.target.value)}
                      placeholder="e.g. Dr. Emily Watson (Specialist)"
                      className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-purple text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-display font-bold text-xs text-neutral-700 mb-1">Cover Image URL</label>
                    <select
                      value={blogImage}
                      onChange={e => setBlogImage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-purple text-sm font-medium bg-white"
                    >
                      <option value="/images/hero_learning_scene.jpg">Hero Learning Scene (Colorful 3D)</option>
                      <option value="/images/learn_on_the_go_mockup.jpg">Learn on the Go (Tablet)</option>
                      <option value="/images/video_alphabet_song.jpg">Alphabet Song Scene</option>
                      <option value="/images/video_counting_numbers.jpg">Counting Numbers Scene</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-display font-bold text-xs text-neutral-700 mb-1">Short Excerpt / SEO Description</label>
                  <textarea
                    rows={2}
                    value={blogExcerpt}
                    onChange={e => setBlogExcerpt(e.target.value)}
                    placeholder="Brief 1-2 sentence hook for search engines and article cards..."
                    className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-purple text-sm font-medium"
                  />
                </div>

                {/* Article Section Paragraphs */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="font-display font-bold text-xs text-neutral-700">Article Content Sections ({blogSections.length})</label>
                    <button
                      type="button"
                      onClick={handleAddSection}
                      className="text-xs font-display font-bold text-brand-purple hover:text-brand-purple-dark flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Section</span>
                    </button>
                  </div>

                  {blogSections.map((sec, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2 relative group">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={sec.heading}
                          onChange={e => handleSectionChange(i, 'heading', e.target.value)}
                          placeholder="Section Subheading"
                          className="font-display font-bold text-xs text-neutral-800 bg-transparent border-b border-transparent focus:border-neutral-400 focus:outline-none w-full"
                        />
                        {blogSections.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSection(i)}
                            className="text-neutral-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <textarea
                        rows={3}
                        value={sec.body}
                        onChange={e => handleSectionChange(i, 'body', e.target.value)}
                        placeholder="Write detailed advice, science-backed guidance, or practice tips here..."
                        className="w-full p-2 rounded-xl bg-white border border-neutral-200 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-brand-purple"
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-brand-purple hover:bg-brand-purple-dark text-white font-display font-black text-sm shadow-md hover:shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4 text-brand-yellow" />
                    <span>Publish Blog Post to Live Site</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Live Preview & Manage Articles */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Live Preview Card */}
              <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-6 space-y-3">
                <span className="text-[11px] font-display font-bold uppercase tracking-wider text-neutral-400">Live Preview Card</span>
                <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-xs bg-white">
                  <div className="aspect-video w-full relative bg-neutral-900 overflow-hidden">
                    <img src={blogImage} alt="Preview" className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 bg-brand-purple text-white px-2.5 py-0.5 rounded-full text-[10px] font-display font-bold">
                      {blogCategory}
                    </span>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <div className="text-[10px] text-neutral-400 font-bold flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{blogReadTime}</span>
                    </div>
                    <h4 className="font-display font-bold text-sm text-neutral-900 leading-snug">
                      {blogTitle || 'Your Post Title Will Appear Here'}
                    </h4>
                    <p className="text-xs text-neutral-500 line-clamp-2">
                      {blogExcerpt || 'Brief excerpt description previewing the content of the article...'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Published Articles List */}
              <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-sm text-neutral-900">Published Posts ({blogs.length})</h4>
                  <Link to="/blog" className="text-xs font-display font-bold text-brand-purple hover:underline flex items-center gap-1">
                    <span>View /blog</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {blogs.map(post => (
                    <div key={post.id} className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200/70 flex items-center justify-between gap-3 group">
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-brand-purple">{post.category}</span>
                        <h5 className="font-display font-bold text-xs text-neutral-900 truncate">{post.title}</h5>
                        <span className="text-[10px] text-neutral-400">{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => { sounds.playPop(); deleteBlog(post.id); triggerToast('Article removed'); }}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================= TAB 2: VIDEO & YOUTUBE MANAGER ================= */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Add Video Form */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-neutral-200 shadow-sm p-6 sm:p-8 space-y-5">
              <div className="border-b border-neutral-100 pb-4">
                <h3 className="font-display font-black text-xl text-neutral-900">Add Video Episode</h3>
                <p className="text-xs text-neutral-500 font-medium">Link official YouTube animations or custom video lessons</p>
              </div>

              <form onSubmit={handleAddVideo} className="space-y-4">
                <div>
                  <label className="block font-display font-bold text-xs text-neutral-700 mb-1">YouTube Video URL or ID</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={vidUrl}
                      onChange={e => setVidUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=nBy5TBWLook or nBy5TBWLook"
                      className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium"
                    />
                    <Youtube className="w-5 h-5 text-red-500 absolute right-3.5 top-3 pointer-events-none" />
                  </div>
                  {extractedYtId && (
                    <div className="mt-2 text-xs font-bold text-brand-green flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Detected YouTube ID: {extractedYtId}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-display font-bold text-xs text-neutral-700 mb-1">Video Title *</label>
                  <input
                    type="text"
                    required
                    value={vidTitle}
                    onChange={e => setVidTitle(e.target.value)}
                    placeholder="e.g. Healthy Habits with Kids | Lingo Toon"
                    className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-purple text-sm font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display font-bold text-xs text-neutral-700 mb-1">Subject</label>
                    <select
                      value={vidSubject}
                      onChange={e => setVidSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-purple text-sm font-medium bg-white"
                    >
                      <option>English</option>
                      <option>Math</option>
                      <option>Science</option>
                      <option>General Knowledge</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-display font-bold text-xs text-neutral-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={vidDuration}
                      onChange={e => setVidDuration(e.target.value)}
                      placeholder="e.g. 2:45"
                      className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-purple text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-display font-bold text-xs text-neutral-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={vidDescription}
                    onChange={e => setVidDescription(e.target.value)}
                    placeholder="Short summary of what children will learn in this episode..."
                    className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-purple text-sm font-medium"
                  />
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <input
                    type="checkbox"
                    id="featToggle"
                    checked={vidFeatured}
                    onChange={e => setVidFeatured(e.target.checked)}
                    className="w-4 h-4 accent-brand-purple rounded"
                  />
                  <label htmlFor="featToggle" className="font-display font-bold text-xs text-neutral-800 cursor-pointer">
                    Feature on Home Page Video Spotlight
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-display font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-white" />
                  <span>Add Video to Active Catalog</span>
                </button>
              </form>
            </div>

            {/* Right: Active Videos List */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-6 space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <h4 className="font-display font-bold text-sm text-neutral-900">Active Video Library ({videos.length})</h4>
                  <Link to="/videos" className="text-xs font-display font-bold text-brand-purple hover:underline flex items-center gap-1">
                    <span>View /videos</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {videos.map(v => (
                    <div key={v.id} className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200/70 flex items-center gap-3">
                      <div className="w-20 aspect-video rounded-xl overflow-hidden bg-neutral-900 shrink-0 relative">
                        <img src={v.image} alt={v.title} className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1 rounded font-mono">
                          {v.duration}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-brand-purple">{v.subject}</span>
                          {v.featured && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 text-[9px] font-bold">
                              Featured
                            </span>
                          )}
                        </div>
                        <h5 className="font-display font-bold text-xs text-neutral-900 truncate">{v.title}</h5>
                        <p className="text-[10px] text-neutral-400 truncate">{v.description}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => { sounds.playPop(); toggleFeaturedVideo(v.id); triggerToast('Featured status updated'); }}
                          className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${v.featured ? 'text-amber-600 bg-amber-50' : 'text-neutral-400 hover:text-neutral-700'}`}
                          title="Toggle Spotlight Feature"
                        >
                          <Sparkles className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { sounds.playPop(); deleteVideo(v.id); triggerToast('Video removed'); }}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 transition-colors"
                          title="Delete Video"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 3: WORD PUZZLE MAKER ================= */}
        {activeTab === 'puzzles' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-5 bg-white rounded-3xl border border-neutral-200 shadow-sm p-6 sm:p-8 space-y-4">
              <div className="border-b border-neutral-100 pb-3">
                <h3 className="font-display font-black text-xl text-neutral-900">Add Word Builder Puzzle</h3>
                <p className="text-xs text-neutral-500 font-medium">New words appear instantly in the interactive game arcade</p>
              </div>

              <form onSubmit={handleAddPuzzle} className="space-y-4">
                <div>
                  <label className="block font-display font-bold text-xs text-neutral-700 mb-1">Target Word *</label>
                  <input
                    type="text"
                    required
                    maxLength={7}
                    value={puzzleWord}
                    onChange={e => setPuzzleWord(e.target.value.toUpperCase())}
                    placeholder="e.g. BEAR"
                    className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-display font-black text-lg tracking-widest uppercase"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display font-bold text-xs text-neutral-700 mb-1">Emoji Icon</label>
                    <input
                      type="text"
                      value={puzzleEmoji}
                      onChange={e => setPuzzleEmoji(e.target.value)}
                      placeholder="🐻"
                      className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 text-center text-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-display font-bold text-xs text-neutral-700 mb-1">Category</label>
                    <select
                      value={puzzleCategory}
                      onChange={e => setPuzzleCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 text-xs font-medium bg-white"
                    >
                      <option>Animals</option>
                      <option>Nature</option>
                      <option>Food</option>
                      <option>School</option>
                      <option>Sight Words</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-display font-bold text-xs text-neutral-700 mb-1">Hint Clue</label>
                  <input
                    type="text"
                    value={puzzleHint}
                    onChange={e => setPuzzleHint(e.target.value)}
                    placeholder="e.g. Big friendly animal that loves honey!"
                    className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 text-xs font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-display font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Word to Game Arcade</span>
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-6 space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <h4 className="font-display font-bold text-sm text-neutral-900">Active Game Puzzles ({wordPuzzles.length})</h4>
                  <Link to="/game/play/word-builder" className="text-xs font-display font-bold text-brand-purple hover:underline flex items-center gap-1">
                    <span>Test in Arcade →</span>
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[460px] overflow-y-auto pr-1">
                  {wordPuzzles.map(p => (
                    <div key={p.id} className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{p.emoji}</span>
                        <button
                          onClick={() => { sounds.playPop(); deleteWordPuzzle(p.id); triggerToast('Puzzle removed'); }}
                          className="text-neutral-400 hover:text-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="mt-2">
                        <div className="font-display font-black text-base text-neutral-900 tracking-wider">{p.word}</div>
                        <p className="text-[10px] text-neutral-500 truncate">{p.hint}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default SemiAdminPage;