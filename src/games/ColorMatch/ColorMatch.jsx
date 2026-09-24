import { useState } from "react";

import "./ColorMatch.css";

import RewardPopup from "../../components/RewardPopup/RewardPopup";

import {
  recordGameCompleted,
} from "../../data/rewards";

const colors = [
  {
    name: "Red",
    value: "#ef4444",
    options: [
      {
        name: "Red",
        value: "#ef4444",
      },
      {
        name: "Blue",
        value: "#3b82f6",
      },
      {
        name: "Green",
        value: "#22c55e",
      },
    ],
  },
  {
    name: "Blue",
    value: "#3b82f6",
    options: [
      {
        name: "Yellow",
        value: "#eab308",
      },
      {
        name: "Blue",
        value: "#3b82f6",
      },
      {
        name: "Red",
        value: "#ef4444",
      },
    ],
  },
  {
    name: "Green",
    value: "#22c55e",
    options: [
      {
        name: "Purple",
        value: "#a855f7",
      },
      {
        name: "Orange",
        value: "#f97316",
      },
      {
        name: "Green",
        value: "#22c55e",
      },
    ],
  },
];

function ColorMatch({ onBack }) {
  const [round, setRound] = useState(0);

  const [message, setMessage] =
    useState("");

  const [rewardVisible, setRewardVisible] =
    useState(false);

  const current = colors[round];

  const handleColor = (color) => {
    if (color.name === current.name) {
      setMessage("🎨 Perfect match!");

      setTimeout(() => {
        if (round < colors.length - 1) {
          setRound(
            (previous) => previous + 1
          );

          setMessage("");
        } else {
          setMessage(
            "🏆 Color game complete!"
          );

          const result =
            recordGameCompleted(
              "color-match",
              10
            );

          if (result.awarded) {
            setRewardVisible(true);
          }
        }
      }, 700);
    } else {
      setMessage("💭 Try another color!");
    }
  };

  return (
    <main className="color-match-page">
      <button
        type="button"
        className="color-match-back"
        onClick={onBack}
      >
        ← Games
      </button>

      <header className="color-match-header">
        <span>🎨 COLORS</span>

        <h1>Color Match</h1>

        <p>Find the matching color!</p>
      </header>

      <section className="color-match-card">
        <div
          className="color-target"
          style={{
            backgroundColor: current.value,
          }}
        />

        <h2>Which color is this?</h2>

        <div className="color-options">
          {current.options.map(
            (color) => (
              <button
                key={color.name}
                type="button"
                onClick={() =>
                  handleColor(color)
                }
              >
                <span
                  className="color-option-circle"
                  style={{
                    backgroundColor:
                      color.value,
                  }}
                />

                {color.name}
              </button>
            )
          )}
        </div>

        {message && (
          <div className="color-match-message">
            {message}
          </div>
        )}
      </section>

      <RewardPopup
        isVisible={rewardVisible}
        stars={10}
        message="Color Champion!"
        onClose={() =>
          setRewardVisible(false)
        }
      />
    </main>
  );
}

export default ColorMatch;