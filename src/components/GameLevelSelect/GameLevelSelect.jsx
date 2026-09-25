import { useMemo } from "react";
import "./GameLevelSelect.css";
import LevelCard from "../LevelCard/LevelCard";
import { getGameLevels } from "../../data/gameLevels";
import { getProgress } from "../../data/rewards";

const floaters = ["⭐", "🎈", "✨", "🎯", "🌈", "⭐"];

function GameLevelSelect({ game, onBack, onSelectLevel }) {
  const levels = getGameLevels(game.id);
  const progress = useMemo(() => getProgress(), []);
  const completed = progress.gameProgress?.[game.id]?.completedLevels || [];
  const percent = levels.length ? Math.round((completed.length / levels.length) * 100) : 0;

  return (
    <main className="game-level-select-page">
      <div className="gls-floaters" aria-hidden="true">
        {floaters.map((f, i) => (
          <span key={i} style={{ "--i": i }}>{f}</span>
        ))}
      </div>

      <button type="button" className="game-level-back" onClick={onBack}>
        ← Games
      </button>

      <header className="game-level-hero gls-animate">
        <div className="game-level-icon">{game.icon}</div>
        <div>
          <span className="game-level-category">{game.category}</span>
          <h1>{game.title}</h1>
          <p>{game.description}</p>
        </div>
      </header>

      <section className="game-level-progress gls-animate delay-1">
        <div className="game-level-progress-top">
          <strong>🌟 Your Progress</strong>
          <span>{completed.length} / {levels.length}</span>
        </div>
        <div className="game-level-track">
          <div style={{ width: `${percent}%` }} />
        </div>
      </section>

      <section className="game-level-section gls-animate delay-2">
        <div className="game-level-heading">
          <h2>Choose a Level</h2>
          <span>⭐ Earn stars</span>
        </div>

        <div className="game-level-list">
          {levels.map((level, index) => {
            const unlocked = index === 0 || completed.includes(levels[index - 1].id);
            return (
              <div className="level-slot" style={{ "--i": index }} key={level.id}>
                <LevelCard
                  level={level}
                  locked={!unlocked}
                  completed={completed.includes(level.id)}
                  onSelect={onSelectLevel}
                />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default GameLevelSelect;