import { useState } from "react";

import "./Counting.css";

import countingLevels from "../../data/levels";
import LevelCard from "../../components/LevelCard/LevelCard";

import {
  getProgress,
  recordLevelCompleted,
} from "../../data/rewards";

function Counting() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [progress, setProgress] = useState(getProgress());
  const [message, setMessage] = useState("");

  const completedLevels =
    progress.gameProgress?.counting?.completedLevels || [];

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
    setMessage("");
  };

  const handleAnswer = (answer) => {
    if (!selectedLevel) {
      return;
    }

    if (answer === selectedLevel.count) {
      setMessage("🎉 Correct! Great job!");

      const alreadyCompleted = completedLevels.includes(
        selectedLevel.id
      );

      if (!alreadyCompleted) {
        const result = recordLevelCompleted(
          "counting",
          selectedLevel.id,
          selectedLevel.stars || 5
        );

        if (result?.progress) {
          setProgress(result.progress);
        } else {
          setProgress(getProgress());
        }
      }
    } else {
      setMessage("💭 Try again!");
    }
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
    setMessage("");
    setProgress(getProgress());
  };

  /*
   * =========================================
   * PLAY LEVEL
   * =========================================
   */

  if (selectedLevel) {
    const objects = Array.from(
      { length: selectedLevel.count },
      (_, index) => index
    );

    const levelCompleted =
      completedLevels.includes(selectedLevel.id);

    return (
      <main className="counting-page">
        <div className="counting-game-header">
          <button
            type="button"
            className="counting-back-button"
            onClick={handleBackToLevels}
          >
            ← Levels
          </button>

          <span>
            Level {selectedLevel.id}
          </span>
        </div>

        <section className="counting-question">
          <span className="counting-question-label">
            COUNT CAREFULLY
          </span>

          <h1>
            {selectedLevel.question}
          </h1>

          <p>
            Tap the correct number.
          </p>
        </section>

        <section className="counting-objects">
          {objects.map((object) => (
            <span
              key={object}
              className="counting-object"
              aria-hidden="true"
            >
              {selectedLevel.emoji}
            </span>
          ))}
        </section>

        <section className="counting-options">
          {selectedLevel.options.map((option) => (
            <button
              key={option}
              type="button"
              className="counting-option"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </section>

        {message && (
          <div
            className={`counting-message ${
              message.includes("Correct")
                ? "success"
                : "try-again"
            }`}
          >
            {message}
          </div>
        )}

        {levelCompleted && (
          <button
            type="button"
            className="counting-next-button"
            onClick={handleBackToLevels}
          >
            ⭐ Back to Levels
          </button>
        )}
      </main>
    );
  }

  /*
   * =========================================
   * LEVEL LIST
   * =========================================
   */

  const progressPercentage =
    countingLevels.length > 0
      ? (completedLevels.length /
          countingLevels.length) *
        100
      : 0;

  return (
    <main className="counting-page">
      <header className="counting-header">
        <div className="counting-title-icon">
          🔢
        </div>

        <div>
          <span className="counting-eyebrow">
            NUMBER GAME
          </span>

          <h1>
            Count Objects
          </h1>

          <p>
            Count the objects and choose the right number!
          </p>
        </div>
      </header>

      <section className="counting-progress-card">
        <div className="counting-progress-top">
          <strong>
            Your Progress
          </strong>

          <span>
            {completedLevels.length} /{" "}
            {countingLevels.length}
          </span>
        </div>

        <div className="counting-progress-track">
          <div
            className="counting-progress-fill"
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>
      </section>

      <section className="counting-level-section">
        <div className="counting-section-heading">
          <h2>
            Choose a Level
          </h2>

          <span>
            ⭐ Earn stars
          </span>
        </div>

        <div className="counting-level-list">
          {countingLevels.map(
            (level, index) => {
              const previousLevelCompleted =
                index === 0 ||
                completedLevels.includes(
                  countingLevels[index - 1].id
                );

              const locked =
                !previousLevelCompleted;

              const completed =
                completedLevels.includes(
                  level.id
                );

              return (
                <LevelCard
                  key={level.id}
                  level={level}
                  locked={locked}
                  completed={completed}
                  onSelect={handleSelectLevel}
                />
              );
            }
          )}
        </div>
      </section>
    </main>
  );
}

export default Counting;