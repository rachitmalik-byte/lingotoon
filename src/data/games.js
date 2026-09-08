export const games = [
  {
    id: 'word-builder',
    aliasId: 'g2',
    title: 'Word Builder Quest',
    description: 'Tap & place letter blocks into slots to spell exciting words and level up!',
    subject: 'English',
    difficulty: 'Medium',
    playTime: '5 min',
    color: 'blue',
    bgColor: '#DBEAFE',
    accentColor: '#3B82F6',
    image: '/images/game_word_builder.jpg',
    featured: true,
    playable: true,
  },
  {
    id: 'math-match',
    aliasId: 'g3',
    title: 'Math Match Arcade',
    description: 'Match equation tiles with their correct answers before the clock ticks down!',
    subject: 'Math',
    difficulty: 'Easy',
    playTime: '4 min',
    color: 'orange',
    bgColor: '#FFF7ED',
    accentColor: '#F97316',
    image: '/images/game_math_match.jpg',
    featured: true,
    playable: true,
  },
  {
    id: 'phonics-pop',
    aliasId: 'g4',
    title: 'Phonics Bubble Pop',
    description: 'Float and pop colorful sound bubbles matching the target letter sounds!',
    subject: 'English',
    difficulty: 'Easy',
    playTime: '3 min',
    color: 'purple',
    bgColor: '#F5F3FF',
    accentColor: '#8B5CF6',
    image: '/images/game_alphabet_adventure.jpg',
    featured: true,
    playable: true,
  },
  {
    id: 'memory-quest',
    aliasId: 'g5',
    title: 'Animal Memory Quest',
    description: 'Flip cards to discover cute matching animal pairs and train your visual memory.',
    subject: 'General Knowledge',
    difficulty: 'Easy',
    playTime: '5 min',
    color: 'green',
    bgColor: '#DCFCE7',
    accentColor: '#22C55E',
    image: '/images/game_alphabet_adventure.jpg',
    featured: false,
    playable: true,
  },
  {
    id: 'pattern-quest',
    aliasId: 'g6',
    title: 'Color Rhythm Quest',
    description: 'Watch the glowing musical stones play a melody, then tap the rhythm back in order!',
    subject: 'Music & Logic',
    difficulty: 'Medium',
    playTime: '4 min',
    color: 'yellow',
    bgColor: '#FEF9C3',
    accentColor: '#EAB308',
    image: '/images/game_word_builder.jpg',
    featured: false,
    playable: true,
  },
  {
    id: 'alphabet-adventure',
    aliasId: 'g1',
    title: 'Alphabet Stepping Stones',
    description: 'Hop across river stepping stones in ABC order to help Lingo cross the magical river!',
    subject: 'English',
    difficulty: 'Easy',
    playTime: '5 min',
    color: 'purple',
    bgColor: '#EDE9FE',
    accentColor: '#7C3AED',
    image: '/images/game_alphabet_adventure.jpg',
    featured: true,
    playable: true,
  },
  {
    id: 'missing-letter',
    aliasId: 'g7',
    title: 'Missing Letter Safari',
    description: 'Fill in the missing letter in the animal & object words to complete the safari album!',
    subject: 'English',
    difficulty: 'Easy',
    playTime: '3 min',
    color: 'emerald',
    bgColor: '#D1FAE5',
    accentColor: '#10B981',
    image: '/images/game_word_builder.jpg',
    featured: false,
    playable: true,
  },
  {
    id: 'rhyme-match',
    aliasId: 'g8',
    title: 'Rhyme Time Magic',
    description: 'Discover and match delightful rhyming word pairs to unlock secret wizard spells!',
    subject: 'English & Phonics',
    difficulty: 'Medium',
    playTime: '4 min',
    color: 'pink',
    bgColor: '#FCE7F3',
    accentColor: '#EC4899',
    image: '/images/game_math_match.jpg',
    featured: false,
    playable: true,
  },
];

// 1. Word Builder Levels
export const wordBuilderLevels = [
  { word: 'CAT', hint: 'A furry friendly pet that says meow', letters: ['C', 'A', 'T', 'D', 'O'] },
  { word: 'SUN', hint: 'It shines bright and warm in the daytime sky', letters: ['S', 'U', 'N', 'M', 'A'] },
  { word: 'STAR', hint: 'It twinkles at night high above in space', letters: ['S', 'T', 'A', 'R', 'E', 'L'] },
  { word: 'FISH', hint: 'It swims happily through clear blue water', letters: ['F', 'I', 'S', 'H', 'B', 'K'] },
  { word: 'BIRD', hint: 'It has colorful feathers and sings morning songs', letters: ['B', 'I', 'R', 'D', 'G', 'L'] },
  { word: 'TREE', hint: 'It grows in the green woods with leafy branches', letters: ['T', 'R', 'E', 'E', 'S', 'P'] },
];

// 2. Math Match Equations
export const mathMatchPairs = [
  { id: 1, matchId: 'm1', label: '2 + 3', type: 'equation' },
  { id: 2, matchId: 'm1', label: '5', type: 'answer' },
  { id: 3, matchId: 'm2', label: '4 + 4', type: 'equation' },
  { id: 4, matchId: 'm2', label: '8', type: 'answer' },
  { id: 5, matchId: 'm3', label: '10 - 3', type: 'equation' },
  { id: 6, matchId: 'm3', label: '7', type: 'answer' },
  { id: 7, matchId: 'm4', label: '6 + 3', type: 'equation' },
  { id: 8, matchId: 'm4', label: '9', type: 'answer' },
  { id: 9, matchId: 'm5', label: '1 + 5', type: 'equation' },
  { id: 10, matchId: 'm5', label: '6', type: 'answer' },
  { id: 11, matchId: 'm6', label: '7 - 3', type: 'equation' },
  { id: 12, matchId: 'm6', label: '4', type: 'answer' },
];

// 3. Phonics Bubble Pop Rounds
export const phonicsRounds = [
  { targetLetter: 'A', soundPrompt: "Pop the bubble with letter 'A' as in Apple!", bubbles: ['A', 'B', 'D', 'C', 'E', 'A'] },
  { targetLetter: 'B', soundPrompt: "Pop the bubble with letter 'B' as in Butterfly!", bubbles: ['B', 'P', 'D', 'R', 'B', 'T'] },
  { targetLetter: 'S', soundPrompt: "Pop the bubble with letter 'S' as in Sunshine!", bubbles: ['S', 'C', 'Z', 'S', 'O', 'K'] },
  { targetLetter: 'M', soundPrompt: "Pop the bubble with letter 'M' as in Monkey!", bubbles: ['M', 'W', 'N', 'M', 'V', 'U'] },
  { targetLetter: 'T', soundPrompt: "Pop the bubble with letter 'T' as in Tiger!", bubbles: ['T', 'F', 'I', 'T', 'L', 'J'] },
];

// 4. Animal Memory Match Cards
export const memoryAnimals = [
  { id: 'a1', name: 'Owl', iconName: 'Owl', color: '#7C3AED', bg: '#EDE9FE' },
  { id: 'a2', name: 'Fox', iconName: 'Fox', color: '#EA580C', bg: '#FFEDD5' },
  { id: 'a3', name: 'Lion', iconName: 'Lion', color: '#D97706', bg: '#FEF3C7' },
  { id: 'a4', name: 'Bunny', iconName: 'Bunny', color: '#059669', bg: '#D1FAE5' },
  { id: 'a5', name: 'Dolphin', iconName: 'Dolphin', color: '#0284C7', bg: '#E0F2FE' },
  { id: 'a6', name: 'Panda', iconName: 'Panda', color: '#4B5563', bg: '#F3F4F6' },
];

// 5. Color Rhythm Pattern Stones
export const patternColors = [
  { id: 'purple', name: 'Purple Star', note: 'Do', freq: 261.63, bg: 'bg-[#7C3AED]', activeBg: 'bg-[#A855F7]', border: 'border-purple-300' },
  { id: 'yellow', name: 'Golden Sun', note: 'Mi', freq: 329.63, bg: 'bg-[#EAB308]', activeBg: 'bg-[#FDE047]', border: 'border-yellow-300' },
  { id: 'teal', name: 'Ocean Wave', note: 'Sol', freq: 392.00, bg: 'bg-[#06B6D4]', activeBg: 'bg-[#67E8F9]', border: 'border-cyan-300' },
  { id: 'coral', name: 'Sweet Orange', note: 'La', freq: 440.00, bg: 'bg-[#F97316]', activeBg: 'bg-[#FB923C]', border: 'border-orange-300' },
];

// 6. Alphabet Stepping Stones
export const alphabetPath = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

// 7. Missing Letter Safari Levels
export const missingLetterLevels = [
  { word: 'L_ON', target: 'I', fullWord: 'LION', hint: 'The roaring king of the safari', choices: ['I', 'O', 'E', 'A'] },
  { word: 'A_PLE', target: 'P', fullWord: 'APPLE', hint: 'A sweet crunchy red fruit', choices: ['P', 'B', 'D', 'T'] },
  { word: 'R_CKET', target: 'O', fullWord: 'ROCKET', hint: 'Zooms high up into outer space', choices: ['O', 'U', 'A', 'E'] },
  { word: 'D_CK', target: 'U', fullWord: 'DUCK', hint: 'Swims on the lake and says quack', choices: ['U', 'O', 'A', 'I'] },
  { word: 'Z_BRA', target: 'E', fullWord: 'ZEBRA', hint: 'Gallops across plains in black & white stripes', choices: ['E', 'A', 'O', 'I'] },
];

// 8. Rhyme Time Magic Pairs
export const rhymePairs = [
  { id: 1, pairId: 'r1', word: 'CAT', rhyme: 'HAT', category: 'at' },
  { id: 2, pairId: 'r1', word: 'HAT', rhyme: 'CAT', category: 'at' },
  { id: 3, pairId: 'r2', word: 'FROG', rhyme: 'LOG', category: 'og' },
  { id: 4, pairId: 'r2', word: 'LOG', rhyme: 'FROG', category: 'og' },
  { id: 5, pairId: 'r3', word: 'STAR', rhyme: 'CAR', category: 'ar' },
  { id: 6, pairId: 'r3', word: 'CAR', rhyme: 'STAR', category: 'ar' },
  { id: 7, pairId: 'r4', word: 'SUN', rhyme: 'RUN', category: 'un' },
  { id: 8, pairId: 'r4', word: 'RUN', rhyme: 'SUN', category: 'un' },
];
