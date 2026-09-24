import { useMemo } from "react";
import "./GameLevelSelect.css";
import LevelCard from "../LevelCard/LevelCard";
import { getGameLevels } from "../../data/gameLevels";
import { getProgress } from "../../data/rewards";

function GameLevelSelect({ game, onBack, onSelectLevel }) {
  const levels = getGameLevels(game.id);
  const progress = useMemo(() => getProgress(), []);
  const completed = progress.gameProgress?.[game.id]?.completedLevels || [];
  const percent = levels.length ? Math.round((completed.length / levels.length) * 100) : 0;

  return (
    <main className="game-level-select-page">
      <button type="button" className="game-level-back" onClick={onBack}>← Games</button>
      <header className="game-level-hero">
        <div className="game-level-icon">{game.icon}</div>
        <div>
          <span>{game.category}</span>
          <h1>{game.title}</h1>
          <p>{game.description}</p>
        </div>
      </header>
      <section className="game-level-progress">
        <div className="game-level-progress-top"><strong>Your Progress</strong><span>{completed.length} / {levels.length}</span></div>
        <div className="game-level-track"><div style={{ width: `${percent}%` }} /></div>
      </section>
      <section className="game-level-section">
        <div className="game-level-heading"><h2>Choose a Level</h2><span>⭐ Earn stars</span></div>
        <div className="game-level-list">
          {levels.map((level, index) => {
            const unlocked = index === 0 || completed.includes(levels[index - 1].id);
            return <LevelCard key={level.id} level={level} locked={!unlocked} completed={completed.includes(level.id)} onSelect={onSelectLevel} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default GameLevelSelect;
