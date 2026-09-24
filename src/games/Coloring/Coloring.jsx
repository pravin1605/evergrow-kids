import { useState } from "react";

import "./Coloring.css";
import { getGameLevels } from "../../data/gameLevels";
import { recordLevelCompleted } from "../../data/rewards";
import RewardPopup from "../../components/RewardPopup/RewardPopup";

const colors = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#eab308",
  "#a855f7",
  "#f97316",
];

function Coloring({ onBack, levelId = 1 }) {
  const level = getGameLevels("coloring")[Number(levelId) - 1] || getGameLevels("coloring")[0];
  const [selectedColor, setSelectedColor] =
    useState(colors[0]);

  const [selectedPart, setSelectedPart] =
    useState(null);
  const [rewardVisible, setRewardVisible] = useState(false);

  return (
    <main className="coloring-page">
      <button
        type="button"
        className="coloring-back"
        onClick={onBack}
      >
        ← Levels
      </button>

      <header className="coloring-header">
        <span>🖍️ CREATIVITY</span>

        <h1>Coloring</h1>

        <p>Pick a color and color the picture!</p>
      </header>

      <section className="coloring-card">
        <div className="coloring-picture">
          <button
            type="button"
            className={`coloring-part sun ${
              selectedPart === "sun"
                ? "selected"
                : ""
            }`}
            style={{
              backgroundColor:
                selectedPart === "sun"
                  ? selectedColor
                  : "#ffe89a",
            }}
            onClick={() => setSelectedPart("sun")}
            aria-label="Color the sun"
          >
            ☀️
          </button>

          <button
            type="button"
            className={`coloring-part tree ${
              selectedPart === "tree"
                ? "selected"
                : ""
            }`}
            style={{
              backgroundColor:
                selectedPart === "tree"
                  ? selectedColor
                  : "#a8d5ba",
            }}
            onClick={() => setSelectedPart("tree")}
            aria-label="Color the tree"
          >
            🌳
          </button>

          <button
            type="button"
            className={`coloring-part flower ${
              selectedPart === "flower"
                ? "selected"
                : ""
            }`}
            style={{
              backgroundColor:
                selectedPart === "flower"
                  ? selectedColor
                  : "#ffd1dc",
            }}
            onClick={() =>
              setSelectedPart("flower")
            }
            aria-label="Color the flower"
          >
            🌸
          </button>
        </div>

        <div className="coloring-palette">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              className={`coloring-color ${
                selectedColor === color
                  ? "active"
                  : ""
              }`}
              style={{
                backgroundColor: color,
              }}
              onClick={() => setSelectedColor(color)}
              aria-label={`Choose color ${color}`}
            />
          ))}
        </div>

        <button type="button" className="coloring-complete-button" onClick={() => {
          const result = recordLevelCompleted("coloring", level.id, level.stars);
          if (result.awarded) setRewardVisible(true);
        }}>
          🎉 Finish Level
        </button>

        <p className="coloring-help">
          Choose a color, then tap a picture part.
        </p>
      </section>

      <RewardPopup isVisible={rewardVisible} stars={level.stars} message="Level Complete!" onClose={() => setRewardVisible(false)} />
    </main>
  );
}

export default Coloring;