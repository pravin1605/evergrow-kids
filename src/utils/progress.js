
const STORAGE_KEY = "evergrow-kids-progress";

const DEFAULT_PROGRESS = {
  childName: "Aarav",
  avatar: "🐻",

  stars: 125,
  streak: 5,
  level: 2,

  gamesPlayed: 0,
  lessonsCompleted: 0,

  completedLessons: [],
  completedGames: [],

  badges: [
    "first-lesson",
  ],
};

function readProgress() {
  try {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return {
        ...DEFAULT_PROGRESS,
      };
    }

    const parsed = JSON.parse(stored);

    return {
      ...DEFAULT_PROGRESS,
      ...parsed,

      completedLessons:
        Array.isArray(
          parsed.completedLessons
        )
          ? parsed.completedLessons
          : [],

      completedGames:
        Array.isArray(
          parsed.completedGames
        )
          ? parsed.completedGames
          : [],

      badges:
        Array.isArray(parsed.badges)
          ? parsed.badges
          : [],
    };
  } catch (error) {
    console.warn(
      "Unable to read progress:",
      error
    );

    return {
      ...DEFAULT_PROGRESS,
    };
  }
}

function writeProgress(progress) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(progress)
    );
  } catch (error) {
    console.warn(
      "Unable to save progress:",
      error
    );
  }
}

export function getProgress() {
  return readProgress();
}

export function saveProgress(progress) {
  writeProgress(progress);

  return progress;
}

export function completeLearningLesson(
  lessonId
) {
  const progress = readProgress();

  /*
   * Prevent duplicate rewards.
   */
  if (
    progress.completedLessons.includes(
      lessonId
    )
  ) {
    return {
      completed: false,
      starsAdded: 0,
      progress,
    };
  }

  const updatedProgress = {
    ...progress,

    stars:
      progress.stars + 5,

    lessonsCompleted:
      progress.lessonsCompleted + 1,

    completedLessons: [
      ...progress.completedLessons,
      lessonId,
    ],
  };

  /*
   * First lesson badge.
   */
  if (
    updatedProgress.lessonsCompleted >= 1 &&
    !updatedProgress.badges.includes(
      "first-lesson"
    )
  ) {
    updatedProgress.badges = [
      ...updatedProgress.badges,
      "first-lesson",
    ];
  }

  /*
   * Super Learner badge.
   */
  if (
    updatedProgress.lessonsCompleted >= 10 &&
    !updatedProgress.badges.includes(
      "super-learner"
    )
  ) {
    updatedProgress.badges = [
      ...updatedProgress.badges,
      "super-learner",
    ];
  }

  writeProgress(updatedProgress);

  return {
    completed: true,
    starsAdded: 5,
    progress: updatedProgress,
  };
}

export function isLessonCompleted(
  lessonId
) {
  const progress = readProgress();

  return progress.completedLessons.includes(
    lessonId
  );
}

export function getCategoryProgress(
  category
) {
  if (
    !category ||
    !Array.isArray(category.lessons) ||
    category.lessons.length === 0
  ) {
    return 0;
  }

  const progress = readProgress();

  const completed =
    category.lessons.filter((lesson) =>
      progress.completedLessons.includes(
        lesson.id
      )
    ).length;

  return Math.round(
    (completed /
      category.lessons.length) *
      100
  );
}

export function resetProgress() {
  try {
    localStorage.removeItem(
      STORAGE_KEY
    );
  } catch (error) {
    console.warn(
      "Unable to reset progress:",
      error
    );
  }
}
