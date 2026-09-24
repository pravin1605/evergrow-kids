import { useEffect, useState } from "react";

import "./Home.css";

import { getProgress } from "../../data/rewards";

const learningCategories = [
  {
    id: "alphabet",
    icon: "🔤",
    title: "Alphabet",
    description: "Letters & sounds",
  },
  {
    id: "numbers",
    icon: "🔢",
    title: "Numbers",
    description: "Count & learn",
  },
  {
    id: "colors",
    icon: "🎨",
    title: "Colors",
    description: "Colors around us",
  },
  {
    id: "shapes",
    icon: "🔺",
    title: "Shapes",
    description: "Fun shapes",
  },
  {
    id: "animals",
    icon: "🐶",
    title: "Animals",
    description: "Meet animals",
  },
];

const recommendedGames = [
  {
    id: "count-objects",
    icon: "🍎",
    title: "Count Objects",
    subtitle: "Learn numbers",
    background: "yellow",
  },
  {
    id: "color-match",
    icon: "🎨",
    title: "Color Match",
    subtitle: "Learn colors",
    background: "pink",
  },
  {
    id: "letter-hunt",
    icon: "🔤",
    title: "Letter Hunt",
    subtitle: "Find letters",
    background: "blue",
  },
];

function Home({ onNavigate }) {
  const [progress, setProgress] =
    useState(getProgress());

  /*
   * =========================================
   * REFRESH PROGRESS
   * =========================================
   */

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  /*
   * =========================================
   * NAVIGATION HELPERS
   * =========================================
   */

  const goToHomeSection = (section) => {
    if (typeof onNavigate !== "function") {
      return;
    }

    onNavigate(section);
  };

  const openGame = (gameId) => {
    if (typeof onNavigate !== "function") {
      return;
    }

    onNavigate("games", {
      gameId,
    });
  };

  const openLearningCategory = (
    categoryId
  ) => {
    if (typeof onNavigate !== "function") {
      return;
    }

    onNavigate("learn", {
      categoryId,
    });
  };

  /*
   * =========================================
   * ALPHABET PROGRESS
   * =========================================
   */

  const alphabetProgress =
    progress.categoryProgress?.alphabet || 0;

  return (
    <main className="home-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="home-header home-animate">
        <div>
          <span className="home-greeting">
            👋 Hi{" "}
            {progress.childName || "Aarav"}!
          </span>

          <h1>
            Let's learn
            <br />
            something! 🌟
          </h1>
        </div>

        <button
          type="button"
          className="profile-mini-button"
          aria-label="Open profile"
          onClick={() =>
            goToHomeSection("profile")
          }
        >
          {progress.avatar || "👦"}
        </button>
      </header>

      {/* =====================================
          MASCOT
      ===================================== */}

      <section className="mascot-section home-animate delay-1">

        <div className="floating-star star-one">
          ⭐
        </div>

        <div className="floating-star star-two">
          ✨
        </div>

        <div className="floating-star star-three">
          🌟
        </div>

        <div className="mascot-cloud cloud-one" />
        <div className="mascot-cloud cloud-two" />

        <div className="mascot-character">
          🐻
        </div>

        <div className="mascot-bubble">
          <span>🌟</span>

          <p>
            You are doing great!
          </p>
        </div>

        <div className="mascot-ground">
          <span>🌱</span>
          <span>🌼</span>
          <span>🌱</span>
        </div>
      </section>

      {/* =====================================
          STATS
      ===================================== */}

      <section className="home-stats home-animate delay-2">

        <button
          type="button"
          className="stat-card stars-stat"
          onClick={() =>
            goToHomeSection("rewards")
          }
        >
          <span className="stat-icon">
            ⭐
          </span>

          <div>
            <strong>
              {progress.stars}
            </strong>

            <small>
              Stars
            </small>
          </div>

          <span
            className="stat-arrow"
            aria-hidden="true"
          >
            →
          </span>
        </button>

        <button
          type="button"
          className="stat-card streak-stat"
          onClick={() =>
            goToHomeSection("profile")
          }
        >
          <span className="stat-icon">
            🔥
          </span>

          <div>
            <strong>
              {progress.streak}
            </strong>

            <small>
              Day Streak
            </small>
          </div>

          <span
            className="stat-arrow"
            aria-hidden="true"
          >
            →
          </span>
        </button>

      </section>

      {/* =====================================
          DAILY CHALLENGE
      ===================================== */}

      <section className="home-section home-animate delay-3">

        <div className="section-heading">
          <div>
            <span className="section-eyebrow">
              TODAY
            </span>

            <h2>
              🎯 Daily Challenge
            </h2>
          </div>

          <span className="section-badge">
            +10 ⭐
          </span>
        </div>

        <div className="daily-challenge-card">

          <div className="challenge-decoration">
            <span>✨</span>
            <span>⭐</span>
          </div>

          <div className="challenge-illustration">
            🔤
          </div>

          <div className="challenge-content">

            <span className="challenge-label">
              TODAY'S MISSION
            </span>

            <h3>
              Find 5 Letters
            </h3>

            <p>
              Find the hidden letters and
              complete today's challenge.
            </p>

            <button
              type="button"
              className="play-button"
              onClick={() =>
                openGame("letter-hunt")
              }
            >
              Play Now

              <span>
                →
              </span>
            </button>

          </div>
        </div>
      </section>

      {/* =====================================
          CONTINUE LEARNING
      ===================================== */}

      <section className="home-section home-animate delay-4">

        <div className="section-heading">

          <div>
            <span className="section-eyebrow">
              KEEP GOING
            </span>

            <h2>
              📚 Continue Learning
            </h2>
          </div>

          <button
            type="button"
            className="see-all-button"
            onClick={() =>
              goToHomeSection("learn")
            }
          >
            See all
          </button>

        </div>

        <button
          type="button"
          className="learning-progress-card"
          onClick={() =>
            openLearningCategory("alphabet")
          }
          aria-label="Continue Alphabet learning"
        >

          <div className="learning-icon">
            🍎
          </div>

          <div className="learning-info">

            <span>
              Alphabet
            </span>

            <strong>
              A is for Apple
            </strong>

            <div className="progress-track">
              <div
                className="progress-value"
                style={{
                  width: `${alphabetProgress}%`,
                }}
              />
            </div>

            <small>
              {alphabetProgress}% completed
            </small>

          </div>

          <span
            className="continue-button"
            aria-hidden="true"
          >
            →
          </span>

        </button>
      </section>

      {/* =====================================
          GAMES
      ===================================== */}

      <section className="home-section home-animate delay-5">

        <div className="section-heading">

          <div>
            <span className="section-eyebrow">
              HAVE FUN
            </span>

            <h2>
              🎮 Play & Learn
            </h2>
          </div>

          <button
            type="button"
            className="see-all-button"
            onClick={() =>
              goToHomeSection("games")
            }
          >
            See all
          </button>

        </div>

        <div className="games-horizontal-list">

          {recommendedGames.map(
            (game, index) => (
              <button
                key={game.id}
                type="button"
                className={`home-game-card ${game.background}`}
                style={{
                  "--game-delay":
                    `${index * 80}ms`,
                }}
                onClick={() =>
                  openGame(game.id)
                }
                aria-label={`Play ${game.title}`}
              >

                <span className="game-card-spark">
                  ✨
                </span>

                <span className="home-game-icon">
                  {game.icon}
                </span>

                <strong>
                  {game.title}
                </strong>

                <small>
                  {game.subtitle}
                </small>

                <span className="game-card-arrow">
                  ▶
                </span>

              </button>
            )
          )}

        </div>
      </section>

      {/* =====================================
          LEARNING CATEGORIES
      ===================================== */}

      <section className="home-section categories-section home-animate delay-6">

        <div className="section-heading">

          <div>
            <span className="section-eyebrow">
              EXPLORE
            </span>

            <h2>
              📚 Learn More
            </h2>
          </div>

          <button
            type="button"
            className="see-all-button"
            onClick={() =>
              goToHomeSection("learn")
            }
          >
            See all
          </button>

        </div>

        <div className="category-grid">

          {learningCategories.map(
            (category) => (
              <button
                key={category.id}
                type="button"
                className="category-card"
                onClick={() =>
                  openLearningCategory(
                    category.id
                  )
                }
                aria-label={`Learn ${category.title}`}
              >

                <span className="category-card-icon">
                  {category.icon}
                </span>

                <strong>
                  {category.title}
                </strong>

                <small>
                  {category.description}
                </small>

                <span
                  className="category-arrow"
                  aria-hidden="true"
                >
                  →
                </span>

              </button>
            )
          )}

        </div>
      </section>

      {/* =====================================
          BOTTOM MESSAGE
      ===================================== */}

      <section className="home-finish-card">

        <div className="finish-mascot">
          🐻
        </div>

        <div>
          <span>
            KEEP GROWING!
          </span>

          <strong>
            You're doing amazing! 🌟
          </strong>

          <p>
            Learn a little, play a little,
            and have lots of fun!
          </p>
        </div>

      </section>

    </main>
  );
}

export default Home;