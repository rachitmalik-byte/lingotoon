import React, { createContext, useContext, useState, useEffect } from 'react';
import { blogPosts as seedBlogs } from '../data/blogs';
import { videos as seedVideos } from '../data/videos';
import { wordBuilderLevels as seedWordLevels } from '../data/games';

const ContentContext = createContext(null);
const STORAGE_KEY = 'lingotoon_dynamic_content_v1';

export const ContentProvider = ({ children }) => {
  const [blogs, setBlogs] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY + '_blogs');
      return stored ? JSON.parse(stored) : seedBlogs;
    } catch {
      return seedBlogs;
    }
  });

  const [videos, setVideos] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY + '_videos');
      return stored ? JSON.parse(stored) : seedVideos;
    } catch {
      return seedVideos;
    }
  });

  const [wordPuzzles, setWordPuzzles] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY + '_puzzles');
      return stored ? JSON.parse(stored) : seedWordLevels;
    } catch {
      return seedWordLevels;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_blogs', JSON.stringify(blogs));
    } catch (e) {
      console.error('Failed to save blogs to storage', e);
    }
  }, [blogs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_videos', JSON.stringify(videos));
    } catch (e) {
      console.error('Failed to save videos to storage', e);
    }
  }, [videos]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_puzzles', JSON.stringify(wordPuzzles));
    } catch (e) {
      console.error('Failed to save puzzles to storage', e);
    }
  }, [wordPuzzles]);

  // Blog Actions
  const addBlog = (post) => {
    const newPost = {
      ...post,
      id: 'post-' + Date.now(),
      slug: post.slug || (post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: post.readTime || '4 min read',
      author: post.author || 'LingoToon Editorial Team',
      tags: post.tags || ['Early Learning', 'Parenting'],
      image: post.image || '/images/hero_learning_scene.jpg',
      content: post.content && post.content.length > 0 ? post.content : [
        { heading: 'Overview', body: post.excerpt || 'Article summary and key takeaways.' }
      ]
    };
    setBlogs(prev => [newPost, ...prev]);
    return newPost;
  };

  const updateBlog = (id, updatedFields) => {
    setBlogs(prev => prev.map(b => b.id === id ? { ...b, ...updatedFields } : b));
  };

  const deleteBlog = (id) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
  };

  // Video Actions
  const addVideo = (videoData) => {
    // Extract YouTube ID if full URL provided
    let ytId = videoData.youtubeId || '';
    if (videoData.youtubeUrl) {
      const match = videoData.youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      if (match) ytId = match[1];
    }

    const newVideo = {
      id: 'vid-' + Date.now(),
      title: videoData.title || 'Untitled Learning Video',
      description: videoData.description || 'Fun educational video for kids.',
      subject: videoData.subject || 'English',
      category: videoData.category || 'Letters',
      duration: videoData.duration || '3:00',
      durationSeconds: videoData.durationSeconds || 180,
      youtubeId: ytId,
      youtubeUrl: ytId ? `https://www.youtube.com/watch?v=${ytId}` : (videoData.youtubeUrl || ''),
      image: ytId ? `https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg` : (videoData.image || '/images/video_alphabet_song.jpg'),
      isOfficialYoutube: Boolean(ytId),
      channelName: videoData.channelName || 'LingoToon',
      channelUrl: videoData.channelUrl || 'https://youtube.com/@lingotoon-x2m',
      progress: 0,
      featured: Boolean(videoData.featured)
    };

    setVideos(prev => [newVideo, ...prev]);
    return newVideo;
  };

  const updateVideo = (id, fields) => {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, ...fields } : v));
  };

  const deleteVideo = (id) => {
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  const toggleFeaturedVideo = (id) => {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, featured: !v.featured } : v));
  };

  // Word Game Actions
  const addWordPuzzle = (puzzle) => {
    const newPuzzle = {
      id: 'puzzle-' + Date.now(),
      word: puzzle.word.toUpperCase(),
      letters: puzzle.word.toUpperCase().split(''),
      hint: puzzle.hint || 'Can you spell this word?',
      emoji: puzzle.emoji || '🌟',
      category: puzzle.category || 'Sight Words',
      points: puzzle.points || 10
    };
    setWordPuzzles(prev => [...prev, newPuzzle]);
    return newPuzzle;
  };

  const deleteWordPuzzle = (id) => {
    setWordPuzzles(prev => prev.filter(p => p.id !== id));
  };

  const resetAllContent = () => {
    setBlogs(seedBlogs);
    setVideos(seedVideos);
    setWordPuzzles(seedWordLevels);
    localStorage.removeItem(STORAGE_KEY + '_blogs');
    localStorage.removeItem(STORAGE_KEY + '_videos');
    localStorage.removeItem(STORAGE_KEY + '_puzzles');
  };

  return (
    <ContentContext.Provider value={{
      blogs,
      videos,
      wordPuzzles,
      addBlog,
      updateBlog,
      deleteBlog,
      addVideo,
      updateVideo,
      deleteVideo,
      toggleFeaturedVideo,
      addWordPuzzle,
      deleteWordPuzzle,
      resetAllContent
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
