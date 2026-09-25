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

const floaters = ["📚", "⭐", "✏️", "🎈", "✨", "🔤", "🌈", "⭐"];

function Learn({ initialCategoryId = null }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [learningProgress, setLearningProgress] = useState(getProgress());

  const isLessonCompleted = (lessonId) =>
    learningProgress.completedLessons.includes(lessonId);

  const getCategoryProgress = (category) => {
    if (!category || !Array.isArray(category.lessons) || category.lessons.length === 0) {
      return 0;
    }

    const completedCount = category.lessons.filter((lesson) =>
      learningProgress.completedLessons.includes(lesson.id)
    ).length;

    return Math.round((completedCount / category.lessons.length) * 100);
  };

  const handleCompleteLesson = () => {
    if (!selectedLesson || !selectedCategory) return;

    if (learningProgress.completedLessons.includes(selectedLesson.id)) return;

    const result = recordLessonCompleted(selectedCategory.id, selectedLesson.id);

    if (result && result.progress) {
      setLearningProgress(result.progress);
    } else {
      setLearningProgress(getProgress());
    }

    if (result && result.awarded) {
      setShowRewardPopup(true);
    }
  };

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  useEffect(() => {
    if (!initialCategoryId) return;

    const category = learningCategories.find((item) => item.id === initialCategoryId);
    if (!category) return;

    stopSpeaking();
    setSelectedCategory(category);
    setSelectedLesson(null);
    setIsSpeaking(false);
  }, [initialCategoryId]);

  const handleCategory = (category) => {
    stopSpeaking();
    setSelectedCategory(category);
    setSelectedLesson(null);
    setIsSpeaking(false);
    setLearningProgress(getProgress());
  };

  const handleLesson = (lesson) => {
    stopSpeaking();
    setSelectedLesson(lesson);
    setIsSpeaking(false);
    setLearningProgress(getProgress());
  };

  const handleBackToCategories = () => {
    stopSpeaking();
    setSelectedCategory(null);
    setSelectedLesson(null);
    setIsSpeaking(false);
    setLearningProgress(getProgress());
  };

  const handleBackToLessons = () => {
    stopSpeaking();
    setSelectedLesson(null);
    setIsSpeaking(false);
    setLearningProgress(getProgress());
  };

  const getSpeechText = (lesson) =>
    `${lesson.title}. ${lesson.explanation}. ${lesson.example}.`;

  const handleListen = () => {
    if (!selectedLesson) return;

    if (!isSpeechSupported()) {
      alert("Sorry! Voice learning is not supported on this device.");
      return;
    }

    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const started = speak(getSpeechText(selectedLesson), {
      rate: 0.75,
      pitch: 1.2,
      volume: 1,
      lang: "en-IN",
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
    });

    if (!started) {
      setIsSpeaking(false);
    }
  };

  const Floaters = () => (
    <div className="learn-floaters" aria-hidden="true">
      {floaters.map((f, i) => (
        <span key={i} style={{ "--i": i }}>{f}</span>
      ))}
    </div>
  );

  /* ---------- LESSON DETAIL ---------- */

  if (selectedLesson) {
    const lessonCompleted = isLessonCompleted(selectedLesson.id);

    return (
      <main className="learn-page">
        <Floaters />

        <button type="button" className="learn-back-button" onClick={handleBackToLessons}>
          ← Lessons
        </button>

        <section className="lesson-detail l-animate">
          <span className="lesson-detail-label">✨ Learn ✨</span>

          <div className={`lesson-symbol ${isSpeaking ? "speaking" : ""}`}>
            {selectedLesson.symbol}
          </div>

          <h1>{selectedLesson.title}</h1>

          <div className="lesson-image">{selectedLesson.image}</div>

          <p className="lesson-explanation">{selectedLesson.explanation}</p>

          <div className="lesson-example">
            <span>💡</span>
            <strong>{selectedLesson.example}</strong>
          </div>

          <button
            type="button"
            className={`lesson-listen-button ${isSpeaking ? "speaking" : ""}`}
            onClick={handleListen}
          >
            <span className="lesson-listen-icon">{isSpeaking ? "⏹️" : "🔊"}</span>
            <span>{isSpeaking ? "Speaking..." : "Listen & Learn"}</span>
          </button>

          {isSpeaking && (
            <div className="lesson-speaking-indicator">
              <span>🔊</span>
              <span>Listen carefully!</span>
              <span className="speaking-dots">•••</span>
            </div>
          )}

          <div className="lesson-complete-area">
            <button
              type="button"
              className={lessonCompleted ? "lesson-complete-button completed" : "lesson-complete-button"}
              onClick={handleCompleteLesson}
              disabled={lessonCompleted}
            >
              {lessonCompleted ? "✅ Learned" : "⭐ Mark as Learned"}
            </button>

            {lessonCompleted && (
              <div className="lesson-earned-message">🎉 +5 Stars earned!</div>
            )}
          </div>
        </section>
      </main>
    );
  }

  /* ---------- LESSON LIST ---------- */

  if (selectedCategory) {
    const categoryProgress = getCategoryProgress(selectedCategory);

    return (
      <main className="learn-page">
        <Floaters />

        <header className="learn-subheader">
          <button type="button" className="learn-back-button" onClick={handleBackToCategories}>
            ← Learn
          </button>

          <div
            className="learn-category-heading l-animate"
            style={{ backgroundColor: selectedCategory.color }}
          >
            <span>{selectedCategory.icon}</span>

            <div>
              <h1>{selectedCategory.title}</h1>
              <p>{selectedCategory.description}</p>

              <div className="learn-category-progress">
                <div className="learn-category-progress-top">
                  <span>Progress</span>
                  <strong>{categoryProgress}%</strong>
                </div>

                <div className="learn-category-progress-track">
                  <div
                    className="learn-category-progress-fill"
                    style={{ width: `${categoryProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="lesson-list-section l-animate delay-1">
          <div className="learn-section-heading">
            <h2>Choose a Lesson</h2>
            <span>{selectedCategory.lessons.length} lessons</span>
          </div>

          <div className="lesson-list">
            {selectedCategory.lessons.map((lesson, index) => {
              const completed = isLessonCompleted(lesson.id);

              return (
                <button
                  key={lesson.id}
                  type="button"
                  className={`lesson-card ${completed ? "learned" : ""}`}
                  style={{ "--i": index }}
                  onClick={() => handleLesson(lesson)}
                >
                  <div className="lesson-card-number">{completed ? "✓" : index + 1}</div>
                  <div className="lesson-card-image">{lesson.image}</div>

                  <div className="lesson-card-content">
                    <strong>{lesson.title}</strong>
                    <span>{lesson.example}</span>
                  </div>

                  {completed && <span className="lesson-card-learned">⭐</span>}
                  <span className="lesson-card-arrow">▶</span>
                </button>
              );
            })}
          </div>
        </section>
      </main>
    );
  }

  /* ---------- LEARN HOME ---------- */

  return (
    <main className="learn-page">
      <Floaters />

      <header className="learn-header l-animate">
        <div>
          <span className="learn-eyebrow">🔍 Discover & Learn</span>
          <h1>
            <span className="l-title-icon">📚</span> Learn
          </h1>
          <p>Explore new things every day!</p>
        </div>

        <div className="learn-header-icon" aria-hidden="true">💡</div>
      </header>

      <section className="learn-welcome l-animate delay-1">
        <div className="learn-welcome-icon">🐻</div>

        <div>
          <h2>What shall we learn?</h2>
          <p>Pick a topic and start exploring.</p>
        </div>
      </section>

      <section className="learn-category-section l-animate delay-2">
        <div className="learn-section-heading">
          <h2>Learning Topics</h2>
          <span>{learningCategories.length} topics</span>
        </div>

        <div className="learn-category-grid">
          {learningCategories.map((category, index) => {
            const categoryProgress = getCategoryProgress(category);

            return (
              <button
                key={category.id}
                type="button"
                className="learn-category-card"
                style={{ backgroundColor: category.color, "--i": index }}
                onClick={() => handleCategory(category)}
              >
                <div className="learn-category-icon">{category.icon}</div>

                <strong>{category.title}</strong>
                <span>{category.description}</span>

                <div className="learn-category-card-progress">
                  <div className="learn-category-card-progress-top">
                    <span>Progress</span>
                    <strong>{categoryProgress}%</strong>
                  </div>

                  <div className="learn-category-card-progress-track">
                    <div
                      className="learn-category-card-progress-fill"
                      style={{ width: `${categoryProgress}%` }}
                    />
                  </div>
                </div>

                <div className="learn-category-arrow">→</div>
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