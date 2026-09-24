import { useEffect, useState } from "react";

import "./Learn.css";

import learningCategories from "../../data/learn";

import RewardPopup from "../../components/RewardPopup/RewardPopup";

import {
  speak,
  stopSpeaking,
  isSpeechSupported,
} from "../../utils/speech";

import {
  getProgress,
  recordLessonCompleted,
} from "../../data/rewards";

function Learn() {
  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const [selectedLesson, setSelectedLesson] =
    useState(null);

  const [isSpeaking, setIsSpeaking] =
    useState(false);

    const [showRewardPopup, setShowRewardPopup] =
  useState(false);

  const [learningProgress, setLearningProgress] =
    useState(getProgress());

  /*
   * =========================================
   * CHECK LESSON COMPLETION
   * =========================================
   */

  const isLessonCompleted = (lessonId) => {
    return learningProgress.completedLessons.includes(
      lessonId
    );
  };

  /*
   * =========================================
   * CATEGORY PROGRESS
   * =========================================
   */

  const getCategoryProgress = (category) => {
    if (
      !category ||
      !Array.isArray(category.lessons) ||
      category.lessons.length === 0
    ) {
      return 0;
    }

    const completedCount =
      category.lessons.filter((lesson) =>
        learningProgress.completedLessons.includes(
          lesson.id
        )
      ).length;

    return Math.round(
      (completedCount /
        category.lessons.length) *
        100
    );
  };

  /*
   * =========================================
   * MARK LESSON AS LEARNED
   * =========================================
   */

 const handleCompleteLesson = () => {
  if (!selectedLesson || !selectedCategory) {
    return;
  }

  /*
   * Already completed?
   * Never award stars twice.
   */

  if (
    learningProgress.completedLessons.includes(
      selectedLesson.id
    )
  ) {
    return;
  }

  const result = recordLessonCompleted(
    selectedCategory.id,
    selectedLesson.id
  );

  if (result && result.progress) {
    setLearningProgress(result.progress);
  } else {
    setLearningProgress(getProgress());
  }

  /*
   * Show celebration only when
   * a NEW lesson was actually completed.
   */

  if (result && result.awarded) {
    setShowRewardPopup(true);
  }
};

  /*
   * =========================================
   * CLEAN UP SPEECH
   * =========================================
   */

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  /*
   * =========================================
   * CATEGORY
   * =========================================
   */

  const handleCategory = (category) => {
    stopSpeaking();

    setSelectedCategory(category);
    setSelectedLesson(null);
    setIsSpeaking(false);

    /*
     * Refresh progress when entering a category.
     */
    setLearningProgress(getProgress());
  };

  /*
   * =========================================
   * LESSON
   * =========================================
   */

  const handleLesson = (lesson) => {
    stopSpeaking();

    setSelectedLesson(lesson);
    setIsSpeaking(false);

    /*
     * Refresh progress before opening lesson.
     */
    setLearningProgress(getProgress());
  };

  /*
   * =========================================
   * BACK TO CATEGORIES
   * =========================================
   */

  const handleBackToCategories = () => {
    stopSpeaking();

    setSelectedCategory(null);
    setSelectedLesson(null);
    setIsSpeaking(false);

    setLearningProgress(getProgress());
  };

  /*
   * =========================================
   * BACK TO LESSONS
   * =========================================
   */

  const handleBackToLessons = () => {
    stopSpeaking();

    setSelectedLesson(null);
    setIsSpeaking(false);

    setLearningProgress(getProgress());
  };

  /*
   * =========================================
   * SPEECH TEXT
   * =========================================
   */

  const getSpeechText = (lesson) => {
    return `${lesson.title}. ${lesson.explanation}. ${lesson.example}.`;
  };

  /*
   * =========================================
   * LISTEN & LEARN
   * =========================================
   */

  const handleListen = () => {
    if (!selectedLesson) {
      return;
    }

    if (!isSpeechSupported()) {
      alert(
        "Sorry! Voice learning is not supported on this device."
      );

      return;
    }

    /*
     * Stop current speech.
     */
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);

      return;
    }

    const started = speak(
      getSpeechText(selectedLesson),
      {
        rate: 0.75,
        pitch: 1.2,
        volume: 1,
        lang: "en-IN",

        onStart: () => {
          setIsSpeaking(true);
        },

        onEnd: () => {
          setIsSpeaking(false);
        },
      }
    );

    if (!started) {
      setIsSpeaking(false);
    }
  };

  /*
   * =========================================
   * LESSON DETAIL
   * =========================================
   */

  if (selectedLesson) {
    const lessonCompleted =
      isLessonCompleted(selectedLesson.id);

    return (
      <main className="learn-page">
        {/* BACK BUTTON */}

        <button
          type="button"
          className="learn-back-button"
          onClick={handleBackToLessons}
        >
          ← Lessons
        </button>

        <section className="lesson-detail">
          {/* LABEL */}

          <span className="lesson-detail-label">
            LEARN
          </span>

          {/* SYMBOL */}

          <div
            className={`lesson-symbol ${
              isSpeaking ? "speaking" : ""
            }`}
          >
            {selectedLesson.symbol}
          </div>

          {/* TITLE */}

          <h1>{selectedLesson.title}</h1>

          {/* IMAGE */}

          <div className="lesson-image">
            {selectedLesson.image}
          </div>

          {/* EXPLANATION */}

          <p className="lesson-explanation">
            {selectedLesson.explanation}
          </p>

          {/* EXAMPLE */}

          <div className="lesson-example">
            <span>💡</span>

            <strong>
              {selectedLesson.example}
            </strong>
          </div>

          {/* =================================
              LISTEN & LEARN
          ================================= */}

          <button
            type="button"
            className={`lesson-listen-button ${
              isSpeaking ? "speaking" : ""
            }`}
            onClick={handleListen}
          >
            <span className="lesson-listen-icon">
              {isSpeaking ? "⏹️" : "🔊"}
            </span>

            <span>
              {isSpeaking
                ? "Speaking..."
                : "Listen & Learn"}
            </span>
          </button>

          {/* SPEAKING MESSAGE */}

          {isSpeaking && (
            <div className="lesson-speaking-indicator">
              <span>🔊</span>

              <span>
                Listen carefully!
              </span>

              <span className="speaking-dots">
                •••
              </span>
            </div>
          )}

          {/* =================================
              MARK AS LEARNED
          ================================= */}

          <div className="lesson-complete-area">
            <button
              type="button"
              className={
                lessonCompleted
                  ? "lesson-complete-button completed"
                  : "lesson-complete-button"
              }
              onClick={handleCompleteLesson}
              disabled={lessonCompleted}
            >
              {lessonCompleted
                ? "✅ Learned"
                : "⭐ Mark as Learned"}
            </button>

            {/* REWARD */}

            {lessonCompleted && (
              <div className="lesson-earned-message">
                ⭐ +5 Stars earned!
              </div>
            )}
          </div>
        </section>
      </main>
    );
  }

  /*
   * =========================================
   * LESSON LIST
   * =========================================
   */

  if (selectedCategory) {
    const categoryProgress =
      getCategoryProgress(selectedCategory);

    return (
      <main className="learn-page">
        {/* BACK */}

        <header className="learn-subheader">
          <button
            type="button"
            className="learn-back-button"
            onClick={handleBackToCategories}
          >
            ← Learn
          </button>

          {/* CATEGORY HEADER */}

          <div
            className="learn-category-heading"
            style={{
              backgroundColor:
                selectedCategory.color,
            }}
          >
            <span>
              {selectedCategory.icon}
            </span>

            <div>
              <h1>
                {selectedCategory.title}
              </h1>

              <p>
                {selectedCategory.description}
              </p>

              {/* CATEGORY PROGRESS */}

              <div className="learn-category-progress">
                <div className="learn-category-progress-top">
                  <span>Progress</span>

                  <strong>
                    {categoryProgress}%
                  </strong>
                </div>

                <div className="learn-category-progress-track">
                  <div
                    className="learn-category-progress-fill"
                    style={{
                      width: `${categoryProgress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* LESSONS */}

        <section className="lesson-list-section">
          <div className="learn-section-heading">
            <h2>Choose a Lesson</h2>

            <span>
              {selectedCategory.lessons.length} lessons
            </span>
          </div>

          <div className="lesson-list">
            {selectedCategory.lessons.map(
              (lesson, index) => {
                const completed =
                  isLessonCompleted(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    type="button"
                    className={`lesson-card ${
                      completed ? "learned" : ""
                    }`}
                    onClick={() =>
                      handleLesson(lesson)
                    }
                  >
                    {/* NUMBER */}

                    <div className="lesson-card-number">
                      {completed
                        ? "✓"
                        : index + 1}
                    </div>

                    {/* IMAGE */}

                    <div className="lesson-card-image">
                      {lesson.image}
                    </div>

                    {/* CONTENT */}

                    <div className="lesson-card-content">
                      <strong>
                        {lesson.title}
                      </strong>

                      <span>
                        {lesson.example}
                      </span>
                    </div>

                    {/* LEARNED */}

                    {completed && (
                      <span className="lesson-card-learned">
                        ⭐
                      </span>
                    )}

                    {/* ARROW */}

                    <span className="lesson-card-arrow">
                      ▶
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </section>
      </main>
    );
  }

  /*
   * =========================================
   * LEARN HOME
   * =========================================
   */

  return (
    <main className="learn-page">
      {/* HEADER */}

      <header className="learn-header">
        <div>
          <span className="learn-eyebrow">
            DISCOVER & LEARN
          </span>

          <h1>📚 Learn</h1>

          <p>
            Explore new things every day!
          </p>
        </div>

        <div
          className="learn-header-icon"
          aria-hidden="true"
        >
          💡
        </div>
      </header>

      {/* WELCOME */}

      <section className="learn-welcome">
        <div className="learn-welcome-icon">
          🐻
        </div>

        <div>
          <h2>What shall we learn?</h2>

          <p>
            Pick a topic and start exploring.
          </p>
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="learn-category-section">
        <div className="learn-section-heading">
          <h2>Learning Topics</h2>

          <span>
            {learningCategories.length} topics
          </span>
        </div>

        <div className="learn-category-grid">
          {learningCategories.map((category) => {
            const categoryProgress =
              getCategoryProgress(category);

            return (
              <button
                key={category.id}
                type="button"
                className="learn-category-card"
                style={{
                  backgroundColor:
                    category.color,
                }}
                onClick={() =>
                  handleCategory(category)
                }
              >
                {/* ICON */}

                <div className="learn-category-icon">
                  {category.icon}
                </div>

                {/* TITLE */}

                <strong>
                  {category.title}
                </strong>

                {/* DESCRIPTION */}

                <span>
                  {category.description}
                </span>

                {/* PROGRESS */}

                <div className="learn-category-card-progress">
                  <div className="learn-category-card-progress-top">
                    <span>Progress</span>

                    <strong>
                      {categoryProgress}%
                    </strong>
                  </div>

                  <div className="learn-category-card-progress-track">
                    <div
                      className="learn-category-card-progress-fill"
                      style={{
                        width: `${categoryProgress}%`,
                      }}
                    />
                  </div>
                </div>

                {/* ARROW */}

                <div className="learn-category-arrow">
                  →
                </div>
              </button>
            );
          })}
        </div>
      </section>


<RewardPopup
  isVisible={showRewardPopup}
  stars={5}
  message="Great Job!"
  onClose={() => setShowRewardPopup(false)}
/>

    </main>
  );
}

export default Learn;