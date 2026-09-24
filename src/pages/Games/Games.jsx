import { useEffect, useState } from "react";

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

function Games({
  initialGameId = null,
  onNavigate,
}) {
  /*
   * =========================================
   * CURRENT GAME
   * =========================================
   *
   * App is the main source of truth.
   */

  const [selectedGame, setSelectedGame] =
    useState(initialGameId);

  /*
   * =========================================
   * SYNC WITH APP
   * =========================================
   *
   * When the URL changes or Home opens a game,
   * update the Games screen.
   */

  useEffect(() => {
    setSelectedGame(
      initialGameId || null
    );
  }, [initialGameId]);

  /*
   * =========================================
   * PLAY GAME
   * =========================================
   */

  const handlePlay = (game) => {
    /*
     * Update local UI immediately.
     */

    setSelectedGame(game.id);

    /*
     * Tell App about the navigation.
     *
     * App will update:
     *
     * #games/game-id
     */

    if (typeof onNavigate === "function") {
      onNavigate("games", {
        gameId: game.id,
      });
    }
  };

  /*
   * =========================================
   * BACK TO GAMES
   * =========================================
   */

  const handleBack = () => {
    setSelectedGame(null);

    /*
     * VERY IMPORTANT
     *
     * Remove the game ID from the URL.
     *
     * Otherwise refreshing after going back
     * would reopen the old game.
     */

    if (typeof onNavigate === "function") {
      onNavigate("games");
    }
  };

  /*
   * =========================================
   * GAME ROUTING
   * =========================================
   */

  switch (selectedGame) {
    /*
     * COUNT OBJECTS
     */

    case "count-objects":
      return (
        <Counting
          onBack={handleBack}
        />
      );

    /*
     * NUMBER MATCH
     */

    case "number-match":
      return (
        <NumberMatch
          onBack={handleBack}
        />
      );

    /*
     * LETTER HUNT
     */

    case "letter-hunt":
      return (
        <LetterHunt
          onBack={handleBack}
        />
      );

    /*
     * COLOR MATCH
     */

    case "color-match":
      return (
        <ColorMatch
          onBack={handleBack}
        />
      );

    /*
     * SHAPE HUNT
     */

    case "shape-hunt":
      return (
        <ShapeHunt
          onBack={handleBack}
        />
      );

    /*
     * ANIMAL SOUNDS
     */

    case "animal-sounds":
      return (
        <AnimalSounds
          onBack={handleBack}
        />
      );

    /*
     * MEMORY
     */

    case "memory":
      return (
        <Memory
          onBack={handleBack}
        />
      );

    /*
     * COLORING
     */

    case "coloring":
      return (
        <Coloring
          onBack={handleBack}
        />
      );

    default:
      break;
  }

  /*
   * =========================================
   * GAMES HOME
   * =========================================
   */

  return (
    <main className="games-page">

      <header className="games-header">

        <div>
          <span className="games-eyebrow">
            LEARN THROUGH PLAY
          </span>

          <h1>
            🎮 Games
          </h1>

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
          <h2>
            Ready to play?
          </h2>

          <p>
            Learn new things while playing
            fun games.
          </p>
        </div>

      </section>

      <section className="games-list-section">

        <div className="games-section-heading">

          <h2>
            All Games
          </h2>

          <span>
            {games.length} games
          </span>

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