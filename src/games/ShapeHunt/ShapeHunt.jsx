import { useState } from "react";

import "./ShapeHunt.css";

import RewardPopup from "../../components/RewardPopup/RewardPopup";

import {
  recordGameCompleted,
} from "../../data/rewards";

const shapes = [
  {
    target: "Circle",
    icon: "●",
    options: ["●", "■", "▲", "◆"],
  },
  {
    target: "Triangle",
    icon: "▲",
    options: ["◆", "▲", "●", "■"],
  },
  {
    target: "Square",
    icon: "■",
    options: ["▲", "●", "■", "◆"],
  },
];

const shapeNames = {
  "●": "Circle",
  "■": "Square",
  "▲": "Triangle",
  "◆": "Diamond",
};

function ShapeHunt({ onBack }) {
  const [round, setRound] = useState(0);

  const [message, setMessage] =
    useState("");

  const [rewardVisible, setRewardVisible] =
    useState(false);

  const current = shapes[round];

  const handleShape = (shape) => {
    if (
      shapeNames[shape] ===
      current.target
    ) {
      setMessage("🎉 Great shape!");

      setTimeout(() => {
        if (round < shapes.length - 1) {
          setRound(
            (previous) => previous + 1
          );

          setMessage("");
        } else {
          setMessage(
            "🏆 Shape Hunt complete!"
          );

          const result =
            recordGameCompleted(
              "shape-hunt",
              10
            );

          if (result.awarded) {
            setRewardVisible(true);
          }
        }
      }, 700);
    } else {
      setMessage("💭 Try another shape!");
    }
  };

  return (
    <main className="shape-hunt-page">
      <button
        type="button"
        className="shape-hunt-back"
        onClick={onBack}
      >
        ← Games
      </button>

      <header className="shape-hunt-header">
        <span>🔺 SHAPES</span>

        <h1>Shape Hunt</h1>

        <p>Find the correct shape!</p>
      </header>

      <section className="shape-hunt-card">
        <div className="shape-target">
          {current.icon}
        </div>

        <h2>
          Find the {current.target}
        </h2>

        <div className="shape-options">
          {current.options.map(
            (shape) => (
              <button
                key={shape}
                type="button"
                onClick={() =>
                  handleShape(shape)
                }
              >
                {shape}
              </button>
            )
          )}
        </div>

        {message && (
          <div className="shape-hunt-message">
            {message}
          </div>
        )}
      </section>

      <RewardPopup
        isVisible={rewardVisible}
        stars={10}
        message="Shape Star!"
        onClose={() =>
          setRewardVisible(false)
        }
      />
    </main>
  );
}

export default ShapeHunt;