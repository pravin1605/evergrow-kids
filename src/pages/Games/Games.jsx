import { useEffect, useState } from "react";
import "./Games.css";
import games from "../../data/games";
import GameCard from "../../components/GameCard/GameCard";
import GameLevelSelect from "../../components/GameLevelSelect/GameLevelSelect";
import Counting from "../../games/Counting/Counting";
import NumberMatch from "../../games/NumberMatch/NumberMatch";
import LetterHunt from "../../games/LetterHunt/LetterHunt";
import ColorMatch from "../../games/ColorMatch/ColorMatch";
import ShapeHunt from "../../games/ShapeHunt/ShapeHunt";
import AnimalSounds from "../../games/AnimalSounds/AnimalSounds";
import Memory from "../../games/Memory/Memory";
import Coloring from "../../games/Coloring/Coloring";
import WordMatch from "../../games/WordMatch/WordMatch";
import OddOneOut from "../../games/OddOneOut/OddOneOut";

const floaters = ["🎈", "⭐", "🧩", "🎲", "✨", "🎯", "🎈", "⭐"];
const tips = [
  "Pick a game to start!",
  "Play every day to win stars ⭐",
  "Ready, set, play! 🎮",
];

function Games({ initialGameId = null, initialLevelId = null, onNavigate }) {
  const [selectedGame, setSelectedGame] = useState(initialGameId);
  const [selectedLevel, setSelectedLevel] = useState(initialLevelId);
  const [tipIndex, setTipIndex] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    setSelectedGame(initialGameId || null);
    setSelectedLevel(initialLevelId || null);
  }, [initialGameId, initialLevelId]);

  /* Bruno speaks in the intro card */
  const tip = tips[tipIndex % tips.length];
  const talking = typed.length < tip.length;

  useEffect(() => {
    setTyped("");
    let i = 0;
    let wait;
    const typer = setInterval(() => {
      i += 1;
      setTyped(tip.slice(0, i));
      if (i >= tip.length) {
        clearInterval(typer);
        wait = setTimeout(() => setTipIndex((n) => n + 1), 2600);
      }
    }, 55);
    return () => {
      clearInterval(typer);
      clearTimeout(wait);
    };
  }, [tipIndex, tip]);

  const handlePlay = (game) => {
    setSelectedGame(game.id);
    setSelectedLevel(null);
    onNavigate?.("games", { gameId: game.id });
  };

  const handleSelectLevel = (level) => {
    setSelectedLevel(level.id);
    onNavigate?.("games", { gameId: selectedGame, levelId: level.id });
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
    setSelectedLevel(null);
    onNavigate?.("games");
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
    onNavigate?.("games", { gameId: selectedGame });
  };

  if (selectedGame && !selectedLevel) {
    const game = games.find((item) => item.id === selectedGame);
    if (game) return <GameLevelSelect game={game} onBack={handleBackToGames} onSelectLevel={handleSelectLevel} />;
  }

  if (selectedGame && selectedLevel) {
    const common = { onBack: handleBackToLevels, levelId: selectedLevel };
    switch (selectedGame) {
      case "count-objects": return <Counting {...common} />;
      case "number-match": return <NumberMatch {...common} />;
      case "letter-hunt": return <LetterHunt {...common} />;
      case "color-match": return <ColorMatch {...common} />;
      case "shape-hunt": return <ShapeHunt {...common} />;
      case "animal-sounds": return <AnimalSounds {...common} />;
      case "memory": return <Memory {...common} />;
      case "coloring": return <Coloring {...common} />;
      case "word-match": return <WordMatch {...common} />;
      case "odd-one-out": return <OddOneOut {...common} />;
      default: break;
    }
  }

  return (
    <main className="games-page">
      <div className="games-floaters" aria-hidden="true">
        {floaters.map((f, i) => (
          <span key={i} style={{ "--i": i }}>{f}</span>
        ))}
      </div>

      <header className="games-header games-animate">
        <div>
          <span className="games-eyebrow">🎲 Learn through play</span>
          <h1>
            <span className="games-title-icon">🎮</span> Games
          </h1>
          <p>Pick a game and have some fun!</p>
        </div>
        <div className="games-header-icon" aria-hidden="true">🎯</div>
      </header>

      <section className="games-intro games-animate delay-1">
        <div className={`mini-bear ${talking ? "talking" : ""}`} aria-hidden="true">
          <span className="m-ear l" />
          <span className="m-ear r" />
          <span className="m-eye l" />
          <span className="m-eye r" />
          <span className="m-muzzle">
            <span className="m-mouth" />
          </span>
        </div>
        <div className="intro-bubble" role="status" aria-live="polite">
          <h2>Ready to play?</h2>
          <p>
            {typed}
            <span className="caret" />
          </p>
        </div>
      </section>

      <section className="games-list-section games-animate delay-2">
        <div className="games-section-heading">
          <h2>🌈 All Games</h2>
          <span>{games.length} games</span>
        </div>

        <div className="games-list">
          {games.map((game, index) => (
            <div className="game-slot" key={game.id} style={{ "--i": index }}>
              <GameCard game={game} onPlay={handlePlay} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Games;