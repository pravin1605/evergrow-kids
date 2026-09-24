
const STORAGE_KEY = "evergrow-kids-learning-progress";

const DEFAULT_PROGRESS = {
  completedLessons: [],
  starsEarned: 0,
};

function getStoredProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return DEFAULT_PROGRESS;
    }

    const parsed = JSON.parse(stored);

    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      completedLessons: Array.isArray(
        parsed.completedLessons
      )
        ? parsed.completedLessons
        : [],
    };
  } catch (error) {
    console.warn(
      "Unable to read learning progress:",
      error
    );

    return DEFAULT_PROGRESS;
  }
}

function saveStoredProgress(progress) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(progress)
    );
  } catch (error) {
    console.warn(
      "Unable to save learning progress:",
      error
    );
  }
}

export function getLearningProgress() {
  return getStoredProgress();
}

export function isLessonCompleted(lessonId) {
  const progress = getStoredProgress();

  return progress.completedLessons.includes(
    lessonId
  );
}

export function completeLesson(lessonId) {
  const progress = getStoredProgress();

  /*
   * Don't give stars twice for the same lesson.
   */
  if (
    progress.completedLessons.includes(lessonId)
  ) {
    return {
      completed: false,
      alreadyCompleted: true,
      starsAdded: 0,
      progress,
    };
  }

  const updatedProgress = {
    ...progress,

    completedLessons: [
      ...progress.completedLessons,
      lessonId,
    ],

    starsEarned:
      progress.starsEarned + 5,
  };

  saveStoredProgress(updatedProgress);

  return {
    completed: true,
    alreadyCompleted: false,
    starsAdded: 5,
    progress: updatedProgress,
  };
}

export function getCompletedLessonCount() {
  const progress = getStoredProgress();

  return progress.completedLessons.length;
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

  const completedCount =
    category.lessons.filter((lesson) =>
      isLessonCompleted(lesson.id)
    ).length;

  return Math.round(
    (completedCount /
      category.lessons.length) *
      100
  );
}

export function resetLearningProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn(
      "Unable to reset learning progress:",
      error
    );
  }
}
