import "./LevelCard.css";

function LevelCard({ level, locked, completed, onSelect }) {
  return (
    <button
      type="button"
      className={`level-card ${locked ? "locked" : ""} ${
        completed ? "completed" : ""
      }`}
      disabled={locked}
      onClick={() => onSelect(level)}
    >
      <div className="level-number">
        {locked ? "🔒" : level.id}
      </div>

      <div className="level-info">
        <strong>{level.title}</strong>

        <span>
          {completed
            ? "Completed!"
            : locked
              ? "Complete the previous level"
              : `⭐ ${level.stars} stars`}
        </span>
      </div>

      <div className="level-arrow">
        {completed ? "✓" : locked ? "🔒" : "▶"}
      </div>
    </button>
  );
}

export default LevelCard;