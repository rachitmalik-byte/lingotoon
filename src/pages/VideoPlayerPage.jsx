import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Star, HelpCircle } from 'lucide-react';
import { videos } from '../data/videos';
import VideoPlayer from '../components/interactive/VideoPlayer';
import QuizOverlay from '../components/interactive/QuizOverlay';
import VideoCard from '../components/content/VideoCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import LingoCharacter from '../components/decorative/LingoCharacter';

const VideoPlayerPage = () => {
  const { id } = useParams();
  const [showQuiz, setShowQuiz] = useState(false);
  
  const video = videos.find(v => v.id === id) || videos[0];
  
  if (!video) {
    return (
      <div className="container-app py-20 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <LingoCharacter pose="think" size="lg" className="mb-8" />
        <h1 className="font-display text-4xl text-brand-purple-dark mb-4">Video Not Found!</h1>
        <p className="font-body text-xl text-neutral-600 mb-8 max-w-md">We couldn't find the video you were looking for. Let's head back to the watch gallery!</p>
        <Link to="/videos">
          <Button variant="primary" size="lg">Browse All Videos</Button>
        </Link>
      </div>
    );
  }

  // Tailored quiz data based on video subject
  const quizData = {
    question: video.subject === 'English' 
      ? `What sound does the letter "${video.title.slice(0, 1)}" make?`
      : video.subject === 'Math'
      ? 'What comes right after the number 9 when counting?'
      : 'What is the most colorful thing you saw in this lesson?',
    options: video.subject === 'English'
      ? ['A cheerful phonics sound', 'A barking sound', 'A silent whistle', 'A loud trumpet']
      : video.subject === 'Math'
      ? ['10', '8', '12', '7']
      : ['A bright rainbow', 'A dark rock', 'A plain brick', 'A foggy cloud'],
    correctAnswer: 0
  };

  const nextVideo = videos.find(v => v.id !== video.id) || videos[1];
  const relatedVideos = videos.filter(v => v.subject === video.subject && v.id !== video.id).slice(0, 3);

  return (
    <div className="container-app py-6 md:py-10">
      {/* Top Navigation */}
      <Link 
        to="/videos" 
        className="inline-flex items-center gap-2 text-brand-purple hover:text-brand-purple-dark font-body font-bold text-sm mb-6 transition-colors bg-brand-lavender/60 hover:bg-brand-lavender px-4 py-2 rounded-full"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Watch Gallery
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
        {/* Main Player Column */}
        <div className="flex-1 lg:max-w-[860px]">
          <div className="rounded-3xl overflow-hidden shadow-2xl mb-6 bg-black">
            <VideoPlayer video={video} />
          </div>
          
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
              {video.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 mb-5 font-body text-neutral-600 font-semibold text-sm">
              <Badge variant="soft" className="bg-brand-purple-light text-brand-purple text-xs">
                {video.subject}
              </Badge>
              <div className="flex items-center gap-1.5 text-neutral-500">
                <Clock className="w-4 h-4 text-neutral-400" />
                <span>{video.duration || '4:00'}</span>
              </div>
              {video.progress > 0 && (
                <div className="flex items-center gap-1.5 bg-brand-green-light px-3 py-1 rounded-full text-brand-green text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {video.progress}% Watched
                </div>
              )}
            </div>
            
            <p className="font-body text-base md:text-lg text-neutral-600 leading-relaxed mb-8">
              {video.description}
            </p>

            {/* Quick Quiz Callout */}
            <div className="bg-gradient-to-r from-brand-lavender to-white border border-brand-purple/10 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm relative overflow-hidden">
              <div className="relative z-10 flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-brand-purple font-display font-bold text-xs uppercase tracking-wider mb-2 bg-white px-3 py-1 rounded-full shadow-xs">
                  <HelpCircle className="w-3.5 h-3.5" /> Interactive Learning
                </div>
                <h3 className="font-display text-2xl font-bold text-neutral-900 mb-2">
                  Test What You Learned!
                </h3>
                <p className="font-body text-neutral-600 text-sm mb-5 max-w-md">
                  Answer a quick question about this video to earn 50 bonus stars for your profile!
                </p>
                <Button 
                  variant="primary" 
                  size="md" 
                  onClick={() => setShowQuiz(true)}
                  className="shadow-btn hover:shadow-btn-hover"
                >
                  Take Quick Question &rarr;
                </Button>
              </div>
              
              <div className="relative z-10 flex-shrink-0">
                <LingoCharacter pose="encourage" size="md" />
              </div>
              
              {/* Background decorative blob */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple-light/40 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:w-[340px] shrink-0 space-y-8">
          {/* Up Next Card */}
          {nextVideo && (
            <div className="bg-white p-5 rounded-3xl border border-neutral-100 shadow-card">
              <h3 className="font-display font-bold text-xl text-neutral-900 mb-4 flex items-center justify-between">
                <span>Up Next</span>
                <span className="text-xs font-body font-semibold text-brand-purple">Auto-play ready</span>
              </h3>
              <VideoCard video={nextVideo} compact />
            </div>
          )}

          {/* More Like This */}
          {relatedVideos.length > 0 && (
            <div className="bg-white p-5 rounded-3xl border border-neutral-100 shadow-card">
              <h3 className="font-display font-bold text-xl text-neutral-900 mb-4">
                More in {video.subject}
              </h3>
              <div className="space-y-2">
                {relatedVideos.map(v => (
                  <VideoCard key={v.id} video={v} compact />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Overlay Modal */}
      {showQuiz && (
        <QuizOverlay 
          quiz={quizData} 
          onClose={() => setShowQuiz(false)} 
          onComplete={() => {
            setTimeout(() => setShowQuiz(false), 2200);
          }}
        />
      )}
    </div>
  );
};

export default VideoPlayerPage;
