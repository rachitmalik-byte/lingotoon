import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, RefreshCw, Trophy, ArrowRight, Volume2, VolumeX, Lightbulb, CheckCircle2, Sparkles } from 'lucide-react';
import { wordBuilderLevels } from '../data/games';
import GameContainer from '../components/interactive/GameContainer';
import Confetti from '../components/decorative/Confetti';
import Button from '../components/ui/Button';
import { useUser } from '../context/UserContext';
import { sounds } from '../utils/soundEffects';

// ================= MATH MATCH DATA =================
const mathPairs = [
  { id: 1, matchId: 'p1', label: '2 + 3', type: 'equation' },
  { id: 2, matchId: 'p1', label: '5', type: 'answer' },
  { id: 3, matchId: 'p2', label: '4 + 4', type: 'equation' },
  { id: 4, matchId: 'p2', label: '8', type: 'answer' },
  { id: 5, matchId: 'p3', label: '10 - 3', type: 'equation' },
  { id: 6, matchId: 'p3', label: '7', type: 'answer' },
  { id: 7, matchId: 'p4', label: '6 + 4', type: 'equation' },
  { id: 8, matchId: 'p4', label: '10', type: 'answer' },
  { id: 9, matchId: 'p5', label: '3 + 3', type: 'equation' },
  { id: 10, matchId: 'p5', label: '6', type: 'answer' },
  { id: 11, matchId: 'p6', label: '9 - 5', type: 'equation' },
  { id: 12, matchId: 'p6', label: '4', type: 'answer' },
];

const GamePlayPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateGameScore } = useUser();
  const isMathMatch = id === 'math-match' || id === 'g3';

  // Audio mute state
  const [soundEnabled, setSoundEnabled] = useState(true);
  const toggleSound = () => {
    const next = sounds.toggle();
    setSoundEnabled(next);
  };

  // ================= WORD BUILDER STATE =================
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [availableLetters, setAvailableLetters] = useState([]);
  const [placedLetters, setPlacedLetters] = useState([]);
  const [isWrong, setIsWrong] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [hintShown, setHintShown] = useState(false);

  // ================= MATH MATCH STATE =================
  const [mathCards, setMathCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [mathMoves, setMathMoves] = useState(0);
  const [mathComplete, setMathComplete] = useState(false);

  // Initialize Math Match
  useEffect(() => {
    if (isMathMatch) {
      const shuffled = [...mathPairs].sort(() => Math.random() - 0.5);
      setMathCards(shuffled);
      setFlippedCards([]);
      setMatchedIds([]);
      setMathMoves(0);
      setMathComplete(false);
      setScore(0);
    }
  }, [isMathMatch]);

  // Load Word Builder Level Data
  const levelData = wordBuilderLevels?.[currentLevelIndex] || {
    word: "CAT",
    hint: "A furry pet that meows",
    letters: ["C", "A", "T", "D", "O"]
  };
  const targetWord = levelData.word.toUpperCase();

  // Initialize Word Builder Level
  useEffect(() => {
    if (isMathMatch || gameComplete) return;
    
    const rawLetters = levelData.letters || targetWord.split('');
    const letters = [...rawLetters].sort(() => Math.random() - 0.5).map((char, index) => ({
      id: `avail-${index}-${char}-${Math.random()}`,
      char,
      originalIndex: index
    }));
    
    setAvailableLetters(letters);
    setPlacedLetters(Array(targetWord.length).fill(null));
    setIsWrong(false);
    setIsLevelComplete(false);
    setHintShown(false);
  }, [currentLevelIndex, isMathMatch, gameComplete]);

  // Handle Math Match Card Flip
  const handleCardClick = (card) => {
    if (flippedCards.length >= 2 || flippedCards.includes(card.id) || matchedIds.includes(card.matchId) || mathComplete) {
      return;
    }

    sounds.playPop();
    const newFlipped = [...flippedCards, card.id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMathMoves(m => m + 1);
      const firstCard = mathCards.find(c => c.id === newFlipped[0]);
      const secondCard = mathCards.find(c => c.id === newFlipped[1]);

      if (firstCard.matchId === secondCard.matchId) {
        sounds.playCorrect();
        setMatchedIds(prev => {
          const updated = [...prev, firstCard.matchId];
          setScore(s => s + 25);
          if (updated.length === mathPairs.length / 2) {
            sounds.playFanfare();
            setMathComplete(true);
            updateGameScore('math-match', 150);
          }
          return updated;
        });
        setFlippedCards([]);
      } else {
        sounds.playWrong();
        setTimeout(() => {
          setFlippedCards([]);
        }, 900);
      }
    }
  };

  // Handle Letter Placement (Word Builder)
  const handlePlaceLetter = (letter) => {
    if (isLevelComplete || isWrong) return;
    sounds.playPop();
    
    const firstEmptySlot = placedLetters.findIndex(slot => slot === null);
    if (firstEmptySlot === -1) return;

    const newPlaced = [...placedLetters];
    newPlaced[firstEmptySlot] = letter;
    setPlacedLetters(newPlaced);
    setAvailableLetters(availableLetters.filter(l => l.id !== letter.id));
  };

  // Handle Letter Removal (Word Builder)
  const handleRemoveLetter = (letter, index) => {
    if (isLevelComplete || isWrong || !letter) return;
    sounds.playPop();
    
    const newPlaced = [...placedLetters];
    newPlaced[index] = null;
    setPlacedLetters(newPlaced);
    setAvailableLetters(prev => [...prev, letter]);
  };

  // Check Word Builder Answer
  useEffect(() => {
    if (isMathMatch || isLevelComplete || isWrong || gameComplete) return;

    const isFilled = placedLetters.every(slot => slot !== null);
    if (!isFilled) return;

    const constructedWord = placedLetters.map(l => l.char).join('').toUpperCase();

    if (constructedWord === targetWord) {
      sounds.playCorrect();
      setIsLevelComplete(true);
      const newScore = score + 20;
      setScore(newScore);

      setTimeout(() => {
        if (currentLevelIndex < (wordBuilderLevels?.length || 5) - 1) {
          setCurrentLevelIndex(prev => prev + 1);
        } else {
          sounds.playFanfare();
          setGameComplete(true);
          updateGameScore('word-builder', newScore);
        }
      }, 1600);
    } else {
      sounds.playWrong();
      setIsWrong(true);
      setTimeout(() => {
        setIsWrong(false);
        const returningLetters = placedLetters.filter(l => l !== null);
        setAvailableLetters(prev => [...prev, ...returningLetters]);
        setPlacedLetters(Array(targetWord.length).fill(null));
      }, 900);
    }
  }, [placedLetters, isMathMatch]);

  const handleUseHint = () => {
    if (hintShown || isLevelComplete || isWrong) return;
    sounds.playPop();
    const firstChar = targetWord[0];
    const letterToPlace = availableLetters.find(l => l.char === firstChar);
    if (letterToPlace) {
      handlePlaceLetter(letterToPlace);
      setHintShown(true);
    }
  };

  return (
    <GameContainer
      game={{
        title: isMathMatch ? "Math Match Puzzle" : "Word Builder Quest",
        icon: isMathMatch ? "🔢" : "🔤"
      }}
      score={score}
      level={isMathMatch ? 1 : currentLevelIndex + 1}
      onBack={() => navigate('/games')}
    >
      <Confetti active={isMathMatch ? mathComplete : gameComplete} duration={3500} />

      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-4 sm:p-6 min-h-[75vh]">
        
        {/* Top Sound & Controls Bar */}
        <div className="w-full flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-display font-bold text-white flex items-center gap-1.5 border border-white/10">
              <Star className="w-3.5 h-3.5 text-brand-yellow fill-current" />
              <span>Score: {score} XP</span>
            </span>
            {isMathMatch && (
              <span className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-display font-bold text-white/90 border border-white/10">
                Moves: {mathMoves}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
              title={soundEnabled ? "Mute Sounds" : "Unmute Sounds"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-300" />}
            </button>
          </div>
        </div>

        {/* MATH MATCH GAME VIEW */}
        {isMathMatch && !mathComplete && (
          <div className="w-full flex flex-col items-center space-y-6">
            <div className="text-center space-y-1">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Match the Math Pairs! 🎯
              </h2>
              <p className="font-body text-sm sm:text-base text-white/80">
                Tap two cards to match an equation with its correct answer!
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-2xl">
              {mathCards.map((card) => {
                const isFlipped = flippedCards.includes(card.id) || matchedIds.includes(card.matchId);
                const isMatched = matchedIds.includes(card.matchId);

                return (
                  <motion.div
                    key={card.id}
                    whileHover={{ scale: isMatched ? 1 : 1.05 }}
                    whileTap={{ scale: isMatched ? 1 : 0.95 }}
                    onClick={() => handleCardClick(card)}
                    className="aspect-square cursor-pointer select-none"
                  >
                    <motion.div 
                      className="w-full h-full rounded-2xl flex items-center justify-center font-display font-bold text-xl sm:text-2xl transition-all duration-300 shadow-lg border-2 border-white/20"
                      style={{
                        background: isMatched
                          ? 'rgba(34, 197, 94, 0.85)'
                          : isFlipped
                          ? '#FFFFFF'
                          : 'linear-gradient(135deg, #7C3AED, #4F46E5)',
                        color: isMatched ? '#FFFFFF' : isFlipped ? '#1E1B4B' : '#FFFFFF'
                      }}
                    >
                      {isFlipped || isMatched ? (
                        <span>{card.label}</span>
                      ) : (
                        <span className="text-3xl opacity-60">❓</span>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* MATH MATCH VICTORY VIEW */}
        {isMathMatch && mathComplete && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-3xl p-8 text-center shadow-2xl space-y-6"
          >
            <div className="text-5xl">🏆</div>
            <div>
              <h2 className="font-display font-bold text-3xl text-neutral-900">Awesome Job!</h2>
              <p className="font-body text-neutral-600 mt-1">You solved all math pairs in {mathMoves} moves!</p>
            </div>
            <div className="bg-brand-yellow-light p-4 rounded-2xl flex justify-around">
              <div>
                <span className="text-xs font-bold text-neutral-500 uppercase block">Total Score</span>
                <span className="font-display font-black text-2xl text-brand-orange">+{score} XP</span>
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-500 uppercase block">Accuracy</span>
                <span className="font-display font-black text-2xl text-brand-green">100% ⭐</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="game" 
                size="lg" 
                className="w-full"
                onClick={() => {
                  const shuffled = [...mathPairs].sort(() => Math.random() - 0.5);
                  setMathCards(shuffled);
                  setFlippedCards([]);
                  setMatchedIds([]);
                  setMathMoves(0);
                  setMathComplete(false);
                  setScore(0);
                }}
              >
                Play Again
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full"
                onClick={() => navigate('/games')}
              >
                All Games
              </Button>
            </div>
          </motion.div>
        )}

        {/* WORD BUILDER GAME VIEW */}
        {!isMathMatch && !gameComplete && (
          <div className="w-full flex flex-col items-center space-y-6">
            <div className="w-full flex items-center justify-between max-w-lg">
              <span className="font-display font-bold text-sm text-brand-yellow uppercase tracking-wider">
                Level {currentLevelIndex + 1} of {wordBuilderLevels?.length || 5}
              </span>
              <button
                onClick={handleUseHint}
                disabled={hintShown}
                className={`flex items-center gap-1.5 text-xs font-display font-bold px-3.5 py-1.5 rounded-full transition-all ${
                  hintShown
                    ? 'bg-white/10 text-white/40 cursor-not-allowed'
                    : 'bg-brand-yellow/20 hover:bg-brand-yellow/30 text-brand-yellow border border-brand-yellow/40'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{hintShown ? "Hint Used" : "Get Hint"}</span>
              </button>
            </div>

            <div className="bg-white/15 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 text-center max-w-lg">
              <p className="font-body text-base sm:text-lg text-white font-medium">
                💡 Clue: <span className="font-bold text-brand-yellow">{levelData.hint}</span>
              </p>
            </div>

            <motion.div 
              animate={isWrong ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 sm:gap-3 py-4"
            >
              {placedLetters.map((letter, idx) => (
                <motion.div
                  key={idx}
                  onClick={() => handleRemoveLetter(letter, idx)}
                  whileHover={{ scale: letter ? 1.05 : 1 }}
                  whileTap={{ scale: letter ? 0.95 : 1 }}
                  className={`w-14 h-16 sm:w-18 sm:h-20 md:w-20 md:h-24 rounded-2xl flex items-center justify-center font-display font-bold text-2xl sm:text-4xl shadow-md transition-all cursor-pointer ${
                    letter 
                      ? isLevelComplete
                        ? 'bg-brand-green text-white border-4 border-green-300 shadow-lg'
                        : isWrong
                        ? 'bg-red-400 text-white border-4 border-red-300'
                        : 'bg-white text-neutral-900 border-4 border-brand-purple shadow-lg'
                      : 'border-3 border-dashed border-white/40 bg-white/10'
                  }`}
                >
                  {letter ? letter.char : ''}
                </motion.div>
              ))}
            </motion.div>

            <div className="pt-2">
              <p className="text-center text-xs font-display font-bold uppercase tracking-wider text-white/70 mb-3">
                Tap letters to spell the word:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {availableLetters.map((letter) => (
                  <motion.button
                    key={letter.id}
                    onClick={() => handlePlaceLetter(letter)}
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-13 h-15 sm:w-16 sm:h-18 rounded-2xl bg-gradient-to-b from-white to-neutral-100 text-neutral-900 font-display font-extrabold text-2xl sm:text-3xl shadow-lg border-2 border-white hover:border-brand-yellow transition-all"
                  >
                    {letter.char}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* WORD BUILDER VICTORY VIEW */}
        {!isMathMatch && gameComplete && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-3xl p-8 text-center shadow-2xl space-y-6"
          >
            <div className="text-5xl">🎉</div>
            <div>
              <h2 className="font-display font-bold text-3xl text-neutral-900">Word Master!</h2>
              <p className="font-body text-neutral-600 mt-1">You spelled all words correctly!</p>
            </div>
            <div className="bg-brand-yellow-light p-4 rounded-2xl flex justify-around">
              <div>
                <span className="text-xs font-bold text-neutral-500 uppercase block">Total Score</span>
                <span className="font-display font-black text-2xl text-brand-orange">+{score} XP</span>
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-500 uppercase block">Badge Earned</span>
                <span className="font-display font-black text-2xl text-brand-purple">Word Wizard 🧙</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="game" 
                size="lg" 
                className="w-full"
                onClick={() => {
                  setCurrentLevelIndex(0);
                  setScore(0);
                  setGameComplete(false);
                }}
              >
                Play Again
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full"
                onClick={() => navigate('/games')}
              >
                All Games
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </GameContainer>
  );
};

export default GamePlayPage;
