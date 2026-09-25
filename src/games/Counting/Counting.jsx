import { useEffect, useState } from "react";

import "./Counting.css";

import { getGameLevels } from "../../data/gameLevels";
import LevelCard from "../../components/LevelCard/LevelCard";

import {
  getProgress,
  recordLevelCompleted,
} from "../../data/rewards";

const floaters = ["🔢", "⭐", "🎈", "✨", "🍎", "⭐"];

function Counting({ levelId = null, onBack }) {
  const [selectedLevel, setSelectedLevel] = useState(null);

  useEffect(() => {
    if (!levelId) return;
    const level = countingLevels.find((item) => item.id === Number(levelId));
    if (level) {
      setSelectedLevel(level);
      setMessage("");
    }
  }, [levelId]);
  const [progress, setProgress] = useState(getProgress());
  const [message, setMessage] = useState("");
  const [shake, setShake] = useState(false);
  const countingLevels = getGameLevels("count-objects");

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
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
    setMessage("");
    setProgress(getProgress());
    if (onBack) onBack();
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

    const isCorrect = message.includes("Correct");

    return (
      <main className="counting-page">
        <div className="counting-floaters" aria-hidden="true">
          {floaters.map((f, i) => (
            <span key={i} style={{ "--i": i }}>{f}</span>
          ))}
        </div>

        <div className="counting-game-header">
          <button
            type="button"
            className="counting-back-button"
            onClick={handleBackToLevels}
          >
            ← Levels
          </button>

          <span className="counting-level-pill">Level {selectedLevel.id}</span>
        </div>

        <section className="counting-question c-animate">
          <span className="counting-question-label">🔍 Count carefully</span>

          <h1>{selectedLevel.question}</h1>

          <p>Tap the correct number.</p>
        </section>

        <section className={`counting-objects ${isCorrect ? "celebrate" : ""} ${shake ? "shake" : ""}`}>
          {objects.map((object, index) => (
            <span
              key={object}
              className="counting-object"
              style={{ "--i": index }}
              aria-hidden="true"
            >
              {selectedLevel.emoji}
            </span>
          ))}
        </section>

        <section
          className="counting-options"
          style={{ "--option-count": selectedLevel.options.length }}
        >
          {selectedLevel.options.map((option, index) => (
            <button
              key={option}
              type="button"
              className="counting-option"
              style={{ "--i": index }}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </section>

        {message && (
          <div
            className={`counting-message ${isCorrect ? "success" : "try-again"}`}
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
      <div className="counting-floaters" aria-hidden="true">
        {floaters.map((f, i) => (
          <span key={i} style={{ "--i": i }}>{f}</span>
        ))}
      </div>

      <header className="counting-header c-animate">
        <div className="counting-title-icon">🔢</div>

        <div>
          <span className="counting-eyebrow">🎯 Number game</span>

          <h1>Count Objects</h1>

          <p>Count the objects and choose the right number!</p>
        </div>
      </header>

      <section className="counting-progress-card c-animate delay-1">
        <div className="counting-progress-top">
          <strong>🌟 Your Progress</strong>

          <span>
            {completedLevels.length} / {countingLevels.length}
          </span>
        </div>

        <div className="counting-progress-track">
          <div
            className="counting-progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </section>

      <section className="counting-level-section c-animate delay-2">
        <div className="counting-section-heading">
          <h2>Choose a Level</h2>

          <span>⭐ Earn stars</span>
        </div>

        <div className="counting-level-list">
          {countingLevels.map((level, index) => {
            const previousLevelCompleted =
              index === 0 ||
              completedLevels.includes(countingLevels[index - 1].id);

            const locked = !previousLevelCompleted;
            const completed = completedLevels.includes(level.id);

            return (
              <div className="counting-level-slot" style={{ "--i": index }} key={level.id}>
                <LevelCard
                  level={level}
                  locked={locked}
                  completed={completed}
                  onSelect={handleSelectLevel}
                />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Counting;