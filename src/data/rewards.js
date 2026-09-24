import learningCategories from "./learn";

const STORAGE_KEY = "evergrow-kids-progress";

const defaultProgress = {
  childName: "Aarav",
  avatar: "🐻",

  stars: 125,
  streak: 5,

  level: 2,
  gamesPlayed: 3,
  lessonsCompleted: 4,

  badges: [
    "first-game",
    "first-lesson",
  ],

  completedGames: [],

  gameProgress: {},

  completedLessons: [],

  categoryProgress: {
    alphabet: 70,
    numbers: 45,
    colors: 60,
    shapes: 35,
    animals: 50,
    fruits: 30,
    vegetables: 20,
    "body-parts": 25,
  },
};

export const badges = [
  {
    id: "first-game",
    title: "First Game",
    icon: "🎮",
    description: "Complete your first game.",
  },
  {
    id: "first-lesson",
    title: "Little Learner",
    icon: "📚",
    description: "Complete your first lesson.",
  },
  {
    id: "five-games",
    title: "Game Explorer",
    icon: "🌟",
    description: "Play 5 games.",
  },
  {
    id: "ten-games",
    title: "Super Player",
    icon: "🏅",
    description: "Play 10 games.",
  },
  {
    id: "seven-streak",
    title: "7 Day Star",
    icon: "🔥",
    description: "Reach a 7 day streak.",
  },
  {
    id: "super-learner",
    title: "Super Learner",
    icon: "🧠",
    description: "Complete 10 lessons.",
  },
];

export const unlockables = [
  {
    id: "rainbow-avatar",
    title: "Rainbow Friend",
    icon: "🌈",
    requirement: 100,
    type: "stars",
  },
  {
    id: "magic-star",
    title: "Magic Star",
    icon: "⭐",
    requirement: 200,
    type: "stars",
  },
  {
    id: "super-bear",
    title: "Super Bear",
    icon: "🦸",
    requirement: 300,
    type: "stars",
  },
];

/*
 * =========================================
 * NORMALIZE PROGRESS
 * =========================================
 */

function normalizeProgress(progress) {
  return {
    ...defaultProgress,
    ...progress,

    badges: Array.isArray(progress?.badges)
      ? progress.badges
      : [...defaultProgress.badges],

    completedGames: Array.isArray(
      progress?.completedGames
    )
      ? progress.completedGames
      : [],

    gameProgress:
      progress?.gameProgress &&
      typeof progress.gameProgress === "object"
        ? progress.gameProgress
        : {},

    completedLessons: Array.isArray(
      progress?.completedLessons
    )
      ? progress.completedLessons
      : [],

    categoryProgress: {
      ...defaultProgress.categoryProgress,
      ...(progress?.categoryProgress || {}),
    },
  };
}

/*
 * =========================================
 * GET PROGRESS
 * =========================================
 */

export function getProgress() {
  try {
    const storedProgress =
      localStorage.getItem(STORAGE_KEY);

    if (!storedProgress) {
      const initialProgress =
        normalizeProgress(defaultProgress);

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(initialProgress)
      );

      return initialProgress;
    }

    return normalizeProgress(
      JSON.parse(storedProgress)
    );
  } catch (error) {
    console.error(
      "Unable to load EverGrow Kids progress:",
      error
    );

    return normalizeProgress(defaultProgress);
  }
}

/*
 * =========================================
 * SAVE PROGRESS
 * =========================================
 */

export function saveProgress(progress) {
  try {
    const normalizedProgress =
      normalizeProgress(progress);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(normalizedProgress)
    );

    return normalizedProgress;
  } catch (error) {
    console.error(
      "Unable to save EverGrow Kids progress:",
      error
    );

    return progress;
  }
}

/*
 * =========================================
 * ADD STARS
 * =========================================
 */

export function addStars(amount) {
  const progress = getProgress();

  progress.stars += amount;

  return saveProgress(progress);
}

/*
 * =========================================
 * RECORD GAME LEVEL
 * =========================================
 */

export function recordLevelCompleted(
  gameId,
  levelId,
  stars = 5
) {
  const progress = getProgress();

  if (!gameId || levelId === undefined) {
    return {
      progress,
      awarded: false,
    };
  }

  if (!progress.gameProgress[gameId]) {
    progress.gameProgress[gameId] = {
      completedLevels: [],
    };
  }

  const completedLevels =
    progress.gameProgress[gameId]
      .completedLevels || [];

  if (completedLevels.includes(levelId)) {
    return {
      progress,
      awarded: false,
    };
  }

  progress.gameProgress[gameId].completedLevels = [
    ...completedLevels,
    levelId,
  ];

  progress.stars += stars;

  const savedProgress = saveProgress(progress);

  return {
    progress: savedProgress,
    awarded: true,
  };
}

/*
 * =========================================
 * RECORD GAME COMPLETED
 * =========================================
 */

export function recordGameCompleted(
  gameId,
  stars = 10
) {
  const progress = getProgress();

  if (!gameId) {
    return {
      progress,
      awarded: false,
    };
  }

  if (progress.completedGames.includes(gameId)) {
    return {
      progress,
      awarded: false,
    };
  }

  progress.completedGames.push(gameId);

  progress.gamesPlayed += 1;

  progress.stars += stars;

  /*
   * FIRST GAME BADGE
   */

  if (
    !progress.badges.includes("first-game")
  ) {
    progress.badges.push("first-game");
  }

  /*
   * FIVE GAMES BADGE
   */

  if (
    progress.gamesPlayed >= 5 &&
    !progress.badges.includes("five-games")
  ) {
    progress.badges.push("five-games");
  }

  /*
   * TEN GAMES BADGE
   */

  if (
    progress.gamesPlayed >= 10 &&
    !progress.badges.includes("ten-games")
  ) {
    progress.badges.push("ten-games");
  }

  const savedProgress = saveProgress(progress);

  return {
    progress: savedProgress,
    awarded: true,
  };
}

/*
 * =========================================
 * CALCULATE CATEGORY PROGRESS
 * =========================================
 *
 * Progress is based on the actual lessons
 * completed by the child.
 */

function calculateCategoryProgress(
  categoryId,
  completedLessons
) {
  const category = learningCategories.find(
    (item) => item.id === categoryId
  );

  if (
    !category ||
    !Array.isArray(category.lessons) ||
    category.lessons.length === 0
  ) {
    return 0;
  }

  const completedCount =
    category.lessons.filter((lesson) =>
      completedLessons.includes(lesson.id)
    ).length;

  return Math.round(
    (completedCount /
      category.lessons.length) *
      100
  );
}

/*
 * =========================================
 * RECORD LESSON COMPLETED
 * =========================================
 */

export function recordLessonCompleted(
  categoryId,
  lessonId
) {
  const progress = getProgress();

  /*
   * Invalid lesson
   */

  if (!lessonId) {
    return {
      progress,
      awarded: false,
    };
  }

  /*
   * Already completed
   *
   * IMPORTANT:
   * Do not give stars twice.
   */

  if (
    progress.completedLessons.includes(
      lessonId
    )
  ) {
    return {
      progress,
      awarded: false,
    };
  }

  /*
   * Add lesson
   */

  progress.completedLessons = [
    ...progress.completedLessons,
    lessonId,
  ];

  /*
   * Add lesson count
   */

  progress.lessonsCompleted += 1;

  /*
   * Add exactly 5 stars
   */

  progress.stars += 5;

  /*
   * Update real category progress
   */

  if (categoryId) {
    progress.categoryProgress[categoryId] =
      calculateCategoryProgress(
        categoryId,
        progress.completedLessons
      );
  }

  /*
   * FIRST LESSON BADGE
   */

  if (
    !progress.badges.includes("first-lesson")
  ) {
    progress.badges.push("first-lesson");
  }

  /*
   * SUPER LEARNER BADGE
   */

  if (
    progress.lessonsCompleted >= 10 &&
    !progress.badges.includes("super-learner")
  ) {
    progress.badges.push("super-learner");
  }

  /*
   * SAVE EVERYTHING
   */

  const savedProgress = saveProgress(progress);

  return {
    progress: savedProgress,
    awarded: true,
  };
}

/*
 * =========================================
 * UPDATE STREAK
 * =========================================
 */

export function updateStreak() {
  const progress = getProgress();

  progress.streak += 1;

  if (
    progress.streak >= 7 &&
    !progress.badges.includes("seven-streak")
  ) {
    progress.badges.push("seven-streak");
  }

  return saveProgress(progress);
}

/*
 * =========================================
 * RESET PROGRESS
 * =========================================
 */

export function resetProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error(
      "Unable to reset EverGrow Kids progress:",
      error
    );
  }

  return getProgress();
}

export default defaultProgress;