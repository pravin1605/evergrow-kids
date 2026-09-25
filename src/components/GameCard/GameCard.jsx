import "./GameCard.css";

const palette = [
  { bg: "#ffe066", shadow: "#f1b900", chip: "#fff6d0" },
  { bg: "#8fc5ff", shadow: "#4d8cff", chip: "#e5f1ff" },
  { bg: "#ff9ec4", shadow: "#e0568f", chip: "#ffe6f0" },
  { bg: "#9de8a5", shadow: "#4dbb5c", chip: "#e8fbe9" },
  { bg: "#ffb08a", shadow: "#ee7c45", chip: "#ffe9dc" },
  { bg: "#b794ff", shadow: "#6f5bd0", chip: "#efe8ff" },
];

const difficultyMeter = {
  easy: 1,
  beginner: 1,
  medium: 2,
  intermediate: 2,
  hard: 3,
  advanced: 3,
};

function pickPalette(seed = "") {
  const total = seed
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return palette[total % palette.length];
}

function GameCard({ game, onPlay }) {
  const colors = pickPalette(game.id || game.title);
  const level = difficultyMeter[String(game.difficulty).toLowerCase()] || 1;

  return (
    <article
      className="game-card"
      style={{
        "--card-bg": colors.bg,
        "--card-shadow": colors.shadow,
        "--card-chip": colors.chip,
      }}
    >
      <span className="game-card-spark" aria-hidden="true">✨</span>

      <div className="game-card-icon">{game.icon}</div>

      <div className="game-card-content">
        <div className="game-card-top">
          <span className="game-card-category">{game.category}</span>

          <span className="game-card-stars">
            {game.stars} <span aria-hidden="true">⭐</span>
          </span>
        </div>

        <h3>{game.title}</h3>

        <p>{game.description}</p>

        <div className="game-card-bottom">
          <span className="game-card-difficulty" title={game.difficulty}>
            {"🟢".repeat(level)}
            <span className="difficulty-label">{game.difficulty}</span>
          </span>

          <button
            type="button"
            className="game-card-play"
            onClick={() => onPlay(game)}
            aria-label={`Play ${game.title}`}
          >
            Play
            <span aria-hidden="true">▶</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default GameCard;