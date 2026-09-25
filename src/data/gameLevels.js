const makeLevels = (items, defaultStars = 5) =>
  items.map((item, index) => ({
    id: index + 1,
    title: `Level ${index + 1}`,
    stars: item.stars || defaultStars,
    ...item,
  }));

export const gameLevelSets = {
  "letter-hunt": makeLevels([
    { task: "Find A", target: "A", options: ["A", "B", "C", "D"] },
    { task: "Find B", target: "B", options: ["A", "B", "D", "E"] },
    { task: "Find C", target: "C", options: ["C", "A", "F", "G"] },
    { task: "Find D", target: "D", options: ["B", "D", "E", "F"] },
    { task: "Find E", target: "E", options: ["C", "E", "G", "H"] },
    { task: "Find M", target: "M", options: ["M", "N", "W", "P"] },
    { task: "Find P", target: "P", options: ["Q", "P", "R", "B"] },
    { task: "Find R", target: "R", options: ["S", "R", "P", "T"] },
    { task: "Find S", target: "S", options: ["C", "S", "Z", "F"] },
    // harder: bigger option sets and look-alike letters
    { task: "Find b (lowercase)", target: "b", options: ["b", "d", "p", "q", "b"] },
    { task: "Find d (lowercase)", target: "d", options: ["b", "d", "p", "q", "d"] },
    { task: "Find q (lowercase)", target: "q", options: ["p", "q", "g", "b", "q"] },
    { task: "Find N among lookalikes", target: "N", options: ["M", "N", "W", "H", "N"] },
    { task: "Find G among lookalikes", target: "G", options: ["C", "G", "O", "Q", "G"] },
    { task: "Find Z — final challenge!", target: "Z", options: ["X", "Y", "Z", "W", "N", "M"], stars: 15 },
  ]),

  "count-objects": makeLevels([
    { question: "How many apples?", emoji: "🍎", count: 3, options: [2, 3, 4] },
    { question: "How many stars?", emoji: "⭐", count: 5, options: [4, 5, 6] },
    { question: "How many balloons?", emoji: "🎈", count: 4, options: [3, 4, 5] },
    { question: "How many flowers?", emoji: "🌸", count: 6, options: [5, 6, 7] },
    { question: "How many bananas?", emoji: "🍌", count: 7, options: [6, 7, 8] },
    { question: "How many cars?", emoji: "🚗", count: 8, options: [7, 8, 9] },
    { question: "How many hearts?", emoji: "❤️", count: 9, options: [8, 9, 10] },
    { question: "How many moons?", emoji: "🌙", count: 10, options: [9, 10, 11] },
    { question: "How many suns?", emoji: "☀️", count: 6, options: [5, 6, 7] },
    // harder: bigger counts, closer answer options
    { question: "How many butterflies?", emoji: "🦋", count: 11, options: [10, 11, 12, 13] },
    { question: "How many fish?", emoji: "🐟", count: 12, options: [11, 12, 13, 14] },
    { question: "How many gift boxes?", emoji: "🎁", count: 13, options: [12, 13, 14, 15] },
    { question: "How many candies?", emoji: "🍬", count: 14, options: [12, 13, 14, 15] },
    { question: "How many kites?", emoji: "🪁", count: 15, options: [13, 14, 15, 16] },
    { question: "How many mixed stars? (final challenge)", emoji: "⭐", count: 16, options: [14, 15, 16, 17], stars: 15 },
  ]),

  "number-match": makeLevels([
    { number: 2, emoji: "🍎", options: [2, 4, 5] },
    { number: 3, emoji: "⭐", options: [2, 3, 5] },
    { number: 4, emoji: "🎈", options: [3, 4, 6] },
    { number: 5, emoji: "🍌", options: [4, 5, 7] },
    { number: 6, emoji: "🌸", options: [5, 6, 8] },
    { number: 7, emoji: "🚗", options: [6, 7, 9] },
    { number: 8, emoji: "❤️", options: [7, 8, 10] },
    { number: 9, emoji: "🐟", options: [8, 9, 10] },
    { number: 10, emoji: "🌟", options: [8, 9, 10] },
    // harder: closer distractor numbers, bigger numbers
    { number: 11, emoji: "🎁", options: [10, 11, 12, 13] },
    { number: 12, emoji: "🦋", options: [11, 12, 13, 14] },
    { number: 13, emoji: "🍬", options: [12, 13, 14, 15] },
    { number: 14, emoji: "🪁", options: [13, 14, 15, 16] },
    { number: 15, emoji: "🎈", options: [14, 15, 16, 17] },
    { number: 20, emoji: "🌟", options: [18, 19, 20, 21], stars: 15 },
  ]),

  "color-match": makeLevels([
    { color: "Red", emoji: "🍎", options: ["Red", "Blue", "Green"] },
    { color: "Blue", emoji: "🫐", options: ["Yellow", "Blue", "Red"] },
    { color: "Green", emoji: "🍏", options: ["Green", "Purple", "Orange"] },
    { color: "Yellow", emoji: "🌟", options: ["Blue", "Yellow", "Pink"] },
    { color: "Orange", emoji: "🍊", options: ["Orange", "Green", "Red"] },
    { color: "Purple", emoji: "🍇", options: ["Purple", "Blue", "Yellow"] },
    { color: "Pink", emoji: "🌸", options: ["Pink", "Green", "Orange"] },
    { color: "Brown", emoji: "🐻", options: ["Brown", "Black", "Blue"] },
    { color: "Black", emoji: "🖤", options: ["White", "Black", "Red"] },
    { color: "White", emoji: "☁️", options: ["White", "Purple", "Green"] },
    // harder: four+ close options, trickier items
    { color: "Gray", emoji: "🐘", options: ["Gray", "Brown", "Black", "White"] },
    { color: "Teal", emoji: "🦚", options: ["Blue", "Green", "Teal", "Purple"] },
    { color: "Maroon", emoji: "🍷", options: ["Red", "Maroon", "Brown", "Purple"] },
    { color: "Gold", emoji: "🏅", options: ["Yellow", "Gold", "Orange", "Brown"] },
    { color: "Turquoise", emoji: "💎", options: ["Blue", "Green", "Turquoise", "Teal"], stars: 15 },
  ]),

  "shape-hunt": makeLevels([
    { shape: "Circle", icon: "●", options: ["●", "▲", "■"] },
    { shape: "Triangle", icon: "▲", options: ["■", "▲", "◆"] },
    { shape: "Square", icon: "■", options: ["●", "■", "▲"] },
    { shape: "Diamond", icon: "◆", options: ["◆", "●", "■"] },
    { shape: "Star", icon: "★", options: ["★", "▲", "◆"] },
    { shape: "Heart", icon: "♥", options: ["●", "♥", "■"] },
    { shape: "Oval", icon: "⬭", options: ["⬭", "▲", "★"] },
    { shape: "Hexagon", icon: "⬡", options: ["⬡", "●", "◆"] },
    { shape: "Arrow", icon: "➜", options: ["➜", "★", "■"] },
    { shape: "Crescent", icon: "☾", options: ["☾", "◆", "▲"] },
    // harder: more options, similar-looking shapes together
    { shape: "Pentagon", icon: "⬠", options: ["⬠", "⬡", "◆", "■"] },
    { shape: "Rectangle", icon: "▭", options: ["■", "▭", "◆", "●"] },
    { shape: "Trapezoid", icon: "⏢", options: ["⏢", "▲", "▭", "⬠"] },
    { shape: "Parallelogram", icon: "▱", options: ["▭", "▱", "■", "◆"] },
    { shape: "Octagon (final)", icon: "⯃", options: ["⬡", "⬠", "⯃", "●"], stars: 15 },
  ]),

  "animal-sounds": makeLevels([
    { animal: "Dog", sound: "Woof!", icon: "🐶", options: ["🐶", "🐱", "🐮"] },
    { animal: "Cat", sound: "Meow!", icon: "🐱", options: ["🐶", "🐱", "🐭"] },
    { animal: "Cow", sound: "Moo!", icon: "🐮", options: ["🐮", "🐷", "🐔"] },
    { animal: "Duck", sound: "Quack!", icon: "🦆", options: ["🐸", "🦆", "🐶"] },
    { animal: "Lion", sound: "Roar!", icon: "🦁", options: ["🐯", "🦁", "🐻"] },
    { animal: "Pig", sound: "Oink!", icon: "🐷", options: ["🐷", "🐮", "🐑"] },
    { animal: "Sheep", sound: "Baa!", icon: "🐑", options: ["🐐", "🐑", "🐴"] },
    { animal: "Horse", sound: "Neigh!", icon: "🐴", options: ["🐴", "🐶", "🐱"] },
    { animal: "Frog", sound: "Ribbit!", icon: "🐸", options: ["🐸", "🦆", "🐍"] },
    { animal: "Monkey", sound: "Oo-oo!", icon: "🐵", options: ["🐵", "🦁", "🐘"] },
    // harder: more lookalike animal options
    { animal: "Owl", sound: "Hoot!", icon: "🦉", options: ["🦅", "🦉", "🐦", "🦆"] },
    { animal: "Rooster", sound: "Cock-a-doodle-doo!", icon: "🐓", options: ["🐔", "🐓", "🦃", "🐦"] },
    { animal: "Bee", sound: "Buzz!", icon: "🐝", options: ["🦋", "🐝", "🐞", "🪰"] },
    { animal: "Snake", sound: "Hiss!", icon: "🐍", options: ["🐍", "🐛", "🦎", "🐊"] },
    { animal: "Wolf (final)", sound: "Howl!", icon: "🐺", options: ["🐶", "🦊", "🐺", "🐕"], stars: 15 },
  ]),

  memory: makeLevels([
    { pairs: 2, difficulty: "Tiny memory" },
    { pairs: 2, difficulty: "Warm up" },
    { pairs: 3, difficulty: "Little memory" },
    { pairs: 3, difficulty: "Good memory" },
    { pairs: 4, difficulty: "Memory star" },
    { pairs: 4, difficulty: "Brain boost" },
    { pairs: 5, difficulty: "Super memory" },
    { pairs: 5, difficulty: "Memory master" },
    { pairs: 6, difficulty: "Big challenge" },
    { pairs: 6, difficulty: "Memory champion" },
    // harder: bigger boards
    { pairs: 7, difficulty: "Sharp mind" },
    { pairs: 7, difficulty: "Focus master" },
    { pairs: 8, difficulty: "Grand memory" },
    { pairs: 8, difficulty: "Genius mode" },
    { pairs: 9, difficulty: "Memory legend", stars: 15 },
  ]),

  coloring: makeLevels([
    { picture: "Sun", icon: "☀️" },
    { picture: "Flower", icon: "🌸" },
    { picture: "Tree", icon: "🌳" },
    { picture: "House", icon: "🏠" },
    { picture: "Car", icon: "🚗" },
    { picture: "Butterfly", icon: "🦋" },
    { picture: "Rainbow", icon: "🌈" },
    { picture: "Fish", icon: "🐟" },
    { picture: "Rocket", icon: "🚀" },
    { picture: "Happy World", icon: "🌍" },
    // harder: more detailed pictures with more regions to color
    { picture: "Castle", icon: "🏰" },
    { picture: "Peacock", icon: "🦚" },
    { picture: "Dinosaur", icon: "🦕" },
    { picture: "Under the Sea", icon: "🐠" },
    { picture: "Fireworks Night (final)", icon: "🎆", stars: 15 },
  ]),

  "word-match": makeLevels([
    { word: "CAT", icon: "🐱", options: ["CAT", "DOG", "COW"] },
    { word: "DOG", icon: "🐶", options: ["DOG", "CAT", "PIG"] },
    { word: "SUN", icon: "☀️", options: ["MOON", "SUN", "STAR"] },
    { word: "CAR", icon: "🚗", options: ["BUS", "CAR", "BIKE"] },
    { word: "FISH", icon: "🐟", options: ["BIRD", "FISH", "FROG"] },
    { word: "APPLE", icon: "🍎", options: ["APPLE", "MANGO", "PEAR"] },
    { word: "TREE", icon: "🌳", options: ["TREE", "FLOWER", "GRASS"] },
    { word: "BIRD", icon: "🐦", options: ["BIRD", "DUCK", "CAT"] },
    { word: "MOON", icon: "🌙", options: ["SUN", "MOON", "STAR"] },
    { word: "STAR", icon: "⭐", options: ["MOON", "STAR", "CLOUD"] },
    // harder: longer words, closer-looking wrong answers, 4 options
    { word: "ELEPHANT", icon: "🐘", options: ["ELEPHANT", "ELEVATOR", "ELEGANT", "ENVELOPE"] },
    { word: "BUTTERFLY", icon: "🦋", options: ["BUTTERFLY", "BUTTERCUP", "DRAGONFLY", "BEETLE"] },
    { word: "RAINBOW", icon: "🌈", options: ["RAINBOW", "RAINCOAT", "RAINDROP", "MEADOW"] },
    { word: "PENGUIN", icon: "🐧", options: ["PELICAN", "PENGUIN", "PIGEON", "PUFFIN"] },
    { word: "DINOSAUR", icon: "🦕", options: ["DINOSAUR", "DOLPHIN", "DRAGON", "DINNER"], stars: 15 },
  ]),

  "odd-one-out": makeLevels([
    { odd: "🍌", items: ["🍎", "🍎", "🍎", "🍌"] },
    { odd: "🔵", items: ["🔴", "🔴", "🔵", "🔴"] },
    { odd: "▲", items: ["●", "●", "▲", "●"] },
    { odd: "🐱", items: ["🐶", "🐶", "🐱", "🐶"] },
    { odd: "⭐", items: ["❤️", "❤️", "⭐", "❤️"] },
    { odd: "🍊", items: ["🍎", "🍎", "🍊", "🍎"] },
    { odd: "■", items: ["●", "●", "■", "●"] },
    { odd: "🐸", items: ["🐶", "🐱", "🐶", "🐸"] },
    { odd: "🌙", items: ["☀️", "☀️", "🌙", "☀️"] },
    { odd: "🟩", items: ["🟦", "🟦", "🟩", "🟦"] },
    // harder: bigger grids, subtler odd items
    { odd: "🐺", items: ["🐶", "🐶", "🐶", "🐺", "🐶", "🐶"] },
    { odd: "🍏", items: ["🍎", "🍎", "🍎", "🍎", "🍏", "🍎"] },
    { odd: "🦄", items: ["🐴", "🐴", "🐴", "🦄", "🐴", "🐴"] },
    { odd: "🟪", items: ["🟦", "🟦", "🟪", "🟦", "🟦", "🟦"] },
    { odd: "🐬", items: ["🐳", "🐳", "🐬", "🐳", "🐳", "🐳"], stars: 15 },
  ]),
};

export function getGameLevels(gameId) {
  return gameLevelSets[gameId] || [];
}

export default gameLevelSets;