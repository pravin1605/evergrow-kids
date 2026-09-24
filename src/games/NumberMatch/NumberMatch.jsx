import { useState } from "react";

import "./NumberMatch.css";

import RewardPopup from "../../components/RewardPopup/RewardPopup";

import {
  recordGameCompleted,
} from "../../data/rewards";

const questions = [
  {
    number: 2,
    emoji: "🍎",
    options: [2, 4, 5],
  },
  {
    number: 4,
    emoji: "⭐",
    options: [3, 4, 6],
  },
  {
    number: 5,
    emoji: "🎈",
    options: [2, 5, 7],
  },
];

function NumberMatch({ onBack }) {
  const [questionIndex, setQuestionIndex] =
    useState(0);

  const [message, setMessage] =
    useState("");

  const [rewardVisible, setRewardVisible] =
    useState(false);

  const question =
    questions[questionIndex];

  const handleAnswer = (answer) => {
    if (answer === question.number) {
      setMessage("🎉 Correct!");

      setTimeout(() => {
        if (
          questionIndex <
          questions.length - 1
        ) {
          setQuestionIndex(
            (previous) => previous + 1
          );

          setMessage("");
        } else {
          setMessage(
            "🏆 Amazing! You completed the game!"
          );

          const result =
            recordGameCompleted(
              "number-match",
              10
            );

          if (result.awarded) {
            setRewardVisible(true);
          }
        }
      }, 700);
    } else {
      setMessage("💭 Try again!");
    }
  };

  return (
    <main className="number-match-page">
      <button
        type="button"
        className="number-match-back"
        onClick={onBack}
      >
        ← Games
      </button>

      <header className="number-match-header">
        <span>🔢 NUMBER GAME</span>

        <h1>Number Match</h1>

        <p>
          Match the number with the objects.
        </p>
      </header>

      <section className="number-match-card">
        <div className="number-match-objects">
          {Array.from(
            { length: question.number },
            (_, index) => (
              <span key={index}>
                {question.emoji}
              </span>
            )
          )}
        </div>

        <h2>How many?</h2>

        <div className="number-match-options">
          {question.options.map(
            (option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  handleAnswer(option)
                }
              >
                {option}
              </button>
            )
          )}
        </div>

        {message && (
          <div className="number-match-message">
            {message}
          </div>
        )}
      </section>

      <RewardPopup
        isVisible={rewardVisible}
        stars={10}
        message="Game Complete!"
        onClose={() =>
          setRewardVisible(false)
        }
      />
    </main>
  );
}

export default NumberMatch;