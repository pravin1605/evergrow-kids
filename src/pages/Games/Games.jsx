import { useState } from "react";

import "./Games.css";

import games from "../../data/games";

import GameCard from "../../components/GameCard/GameCard";

import Counting from "../../games/Counting/Counting";
import NumberMatch from "../../games/NumberMatch/NumberMatch";
import LetterHunt from "../../games/LetterHunt/LetterHunt";
import ColorMatch from "../../games/ColorMatch/ColorMatch";
import ShapeHunt from "../../games/ShapeHunt/ShapeHunt";
import AnimalSounds from "../../games/AnimalSounds/AnimalSounds";
import Memory from "../../games/Memory/Memory";
import Coloring from "../../games/Coloring/Coloring";

function Games() {
  const [selectedGame, setSelectedGame] = useState(null);

  const handlePlay = (game) => {
    setSelectedGame(game.id);
  };

  const handleBack = () => {
    setSelectedGame(null);
  };

  switch (selectedGame) {
    case "count-objects":
      return <Counting />;

    case "number-match":
      return <NumberMatch onBack={handleBack} />;

    case "letter-hunt":
      return <LetterHunt onBack={handleBack} />;

    case "color-match":
      return <ColorMatch onBack={handleBack} />;

    case "shape-hunt":
      return <ShapeHunt onBack={handleBack} />;

    case "animal-sounds":
      return <AnimalSounds onBack={handleBack} />;

    case "memory":
      return <Memory onBack={handleBack} />;

    case "coloring":
      return <Coloring onBack={handleBack} />;

    default:
      break;
  }

  return (
    <main className="games-page">
      <header className="games-header">
        <div>
          <span className="games-eyebrow">
            LEARN THROUGH PLAY
          </span>

          <h1>🎮 Games</h1>

          <p>
            Pick a game and have some fun!
          </p>
        </div>

        <div
          className="games-header-icon"
          aria-hidden="true"
        >
          🎯
        </div>
      </header>

      <section className="games-intro">
        <div className="games-intro-icon">
          🌟
        </div>

        <div>
          <h2>Ready to play?</h2>

          <p>
            Learn new things while playing fun games.
          </p>
        </div>
      </section>

      <section className="games-list-section">
        <div className="games-section-heading">
          <h2>All Games</h2>

          <span>{games.length} games</span>
        </div>

        <div className="games-list">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onPlay={handlePlay}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Games;