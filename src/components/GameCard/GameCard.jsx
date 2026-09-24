import "./GameCard.css";

function GameCard({ game, onPlay }) {
  return (
    <article className="game-card">
      <div className="game-card-icon">
        {game.icon}
      </div>

      <div className="game-card-content">
        <div className="game-card-top">
          <span className="game-card-category">
            {game.category}
          </span>

          <span className="game-card-stars">
            ⭐ {game.stars}
          </span>
        </div>

        <h3>{game.title}</h3>

        <p>{game.description}</p>

        <div className="game-card-bottom">
          <span className="game-card-difficulty">
            {game.difficulty}
          </span>

          <button
            type="button"
            className="game-card-play"
            onClick={() => onPlay(game)}
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