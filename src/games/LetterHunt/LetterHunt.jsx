import { useState } from "react";

import "./LetterHunt.css";

import RewardPopup from "../../components/RewardPopup/RewardPopup";

import {
  recordGameCompleted,
} from "../../data/rewards";

const rounds = [
  {
    target: "A",
    options: ["A", "B", "D", "C"],
  },
  {
    target: "M",
    options: ["N", "M", "W", "P"],
  },
  {
    target: "S",
    options: ["C", "S", "Z", "F"],
  },
];

function LetterHunt({ onBack }) {
  const [round, setRound] = useState(0);

  const [message, setMessage] =
    useState("");

  const [rewardVisible, setRewardVisible] =
    useState(false);

  const current = rounds[round];

  const handleLetter = (letter) => {
    if (letter === current.target) {
      setMessage("🎉 You found it!");

      setTimeout(() => {
        if (round < rounds.length - 1) {
          setRound(
            (previous) => previous + 1
          );

          setMessage("");
        } else {
          setMessage(
            "🏆 Letter Hunt complete!"
          );

          const result =
            recordGameCompleted(
              "letter-hunt",
              10
            );

          if (result.awarded) {
            setRewardVisible(true);
          }
        }
      }, 700);
    } else {
      setMessage("💭 Look carefully!");
    }
  };

  return (
    <main className="letter-hunt-page">
      <button
        type="button"
        className="letter-hunt-back"
        onClick={onBack}
      >
        ← Games
      </button>

      <header className="letter-hunt-header">
        <span>🔤 ALPHABET GAME</span>

        <h1>Letter Hunt</h1>

        <p>Find the correct letter!</p>
      </header>

      <section className="letter-hunt-card">
        <div className="letter-hunt-target">
          {current.target}
        </div>

        <h2>Find this letter</h2>

        <div className="letter-hunt-options">
          {current.options.map(
            (letter) => (
              <button
                key={letter}
                type="button"
                onClick={() =>
                  handleLetter(letter)
                }
              >
                {letter}
              </button>
            )
          )}
        </div>

        {message && (
          <div className="letter-hunt-message">
            {message}
          </div>
        )}
      </section>

      <RewardPopup
        isVisible={rewardVisible}
        stars={10}
        message="Great Job!"
        onClose={() =>
          setRewardVisible(false)
        }
      />
    </main>
  );
}

export default LetterHunt;