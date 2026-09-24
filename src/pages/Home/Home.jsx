import { useEffect, useState } from "react";

import "./Home.css";

import { getProgress } from "../../data/rewards";

const learningCategories = [
  { id: "alphabet", icon: "🔤", title: "Alphabet", description: "Letters & sounds", color: "c-red" },
  { id: "numbers", icon: "🔢", title: "Numbers", description: "Count & learn", color: "c-blue" },
  { id: "colors", icon: "🎨", title: "Colors", description: "Colors around us", color: "c-pink" },
  { id: "shapes", icon: "🔺", title: "Shapes", description: "Fun shapes", color: "c-green" },
  { id: "animals", icon: "🐶", title: "Animals", description: "Meet animals", color: "c-orange" },
];

const recommendedGames = [
  { id: "count-objects", icon: "🍎", title: "Count Objects", subtitle: "Learn numbers", background: "yellow" },
  { id: "color-match", icon: "🎨", title: "Color Match", subtitle: "Learn colors", background: "pink" },
  { id: "letter-hunt", icon: "🔤", title: "Letter Hunt", subtitle: "Find letters", background: "blue" },
];

const floaters = ["⭐", "🎈", "☁️", "🌈", "✨", "🦋", "🎈", "⭐"];

const getMessages = (name) => [
  `Hi ${name}! I'm Bruno! 👋`,
  "Let's learn something fun today!",
  "You are doing great! 🌟",
  "Tap me and I'll say more!",
  "Ready to play a game? 🎮",
  "Every star counts! ⭐",
];

function Home({ onNavigate }) {
  const [progress, setProgress] = useState(getProgress());
  const [msgIndex, setMsgIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [jump, setJump] = useState(false);
  const [burst, setBurst] = useState(0);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  /* ---------- MASCOT SPEAKING ---------- */

  const childName = progress.childName || "Aarav";
  const messages = getMessages(childName);
  const fullText = messages[msgIndex % messages.length];
  const talking = typed.length < fullText.length;

  useEffect(() => {
    setTyped("");
    let i = 0;
    let waitTimer;

    const typer = setInterval(() => {
      i += 1;
      setTyped(fullText.slice(0, i));

      if (i >= fullText.length) {
        clearInterval(typer);
        waitTimer = setTimeout(() => setMsgIndex((n) => n + 1), 2600);
      }
    }, 55);

    return () => {
      clearInterval(typer);
      clearTimeout(waitTimer);
    };
  }, [msgIndex, fullText]);

  const tapMascot = () => {
    setJump(true);
    setBurst((b) => b + 1);
    setTimeout(() => setJump(false), 700);
    setMsgIndex((n) => n + 1);
  };

  /* ---------- NAVIGATION ---------- */

  const goToHomeSection = (section) => {
    if (typeof onNavigate !== "function") return;
    onNavigate(section);
  };

  const openGame = (gameId) => {
    if (typeof onNavigate !== "function") return;
    onNavigate("games", { gameId });
  };

  const openLearningCategory = (categoryId) => {
    if (typeof onNavigate !== "function") return;
    onNavigate("learn", { categoryId });
  };

  const alphabetProgress = progress.categoryProgress?.alphabet || 0;

  return (
    <main className="home-page">
      {/* FLOATING BACKGROUND */}
      <div className="bg-floaters" aria-hidden="true">
        {floaters.map((f, i) => (
          <span key={i} style={{ "--i": i }}>
            {f}
          </span>
        ))}
      </div>

      {/* HEADER */}
      <header className="home-header home-animate">
        <div>
          <span className="home-greeting">
            <span className="wave">👋</span> Hi {childName}!
          </span>
          <h1>
            Let's learn
            <br />
            something! <span className="spin-star">🌟</span>
          </h1>
        </div>

        <button
          type="button"
          className="profile-mini-button"
          aria-label="Open profile"
          onClick={() => goToHomeSection("profile")}
        >
          {progress.avatar || "👦"}
        </button>
      </header>

      {/* MASCOT */}
      <section className="mascot-section home-animate delay-1">
        <div className="sun" aria-hidden="true">☀️</div>
        <div className="rainbow" aria-hidden="true" />
        <div className="hill h1" aria-hidden="true" />
        <div className="hill h2" aria-hidden="true" />
        <span className="butterfly b1" aria-hidden="true">🦋</span>
        <span className="butterfly b2" aria-hidden="true">🦋</span>
        <span className="tap-hint">👆 Tap me!</span>
        <div className="mascot-cloud cloud-one" />
        <div className="mascot-cloud cloud-two" />
        <span className="floating-star star-one">⭐</span>
        <span className="floating-star star-two">✨</span>
        <span className="floating-star star-three">🌟</span>

        <button
          type="button"
          className={`bear ${talking ? "talking" : ""} ${jump ? "jump" : ""}`}
          onClick={tapMascot}
          aria-label="Tap Bruno the bear to hear him talk"
        >
          <span className="ear l" />
          <span className="ear r" />
          <span className="arm l" />
          <span className="arm r" />
          <span className="body">
            <span className="belly" />
          </span>
          <span className="head">
            <span className="eye l" />
            <span className="eye r" />
            <span className="cheek l" />
            <span className="cheek r" />
            <span className="muzzle">
              <span className="nose" />
              <span className="mouth" />
            </span>
          </span>
        </button>

        {burst > 0 && (
          <div className="confetti" key={burst} aria-hidden="true">
            {["🎉", "⭐", "🎈", "✨", "💛", "🌈", "🎊", "🍬"].map((c, i) => (
              <span key={i} style={{ "--a": `${i * 45}deg` }}>{c}</span>
            ))}
          </div>
        )}

        <div className="mascot-bubble" role="status" aria-live="polite">
          <p>
            {typed}
            <span className="caret" />
          </p>
        </div>

        <div className="mascot-ground">
          <span>🌱</span>
          <span>🌼</span>
          <span>🍄</span>
          <span>🌼</span>
          <span>🌱</span>
        </div>
      </section>

      {/* STATS */}
      <section className="home-stats home-animate delay-2">
        <button type="button" className="stat-card stars-stat" onClick={() => goToHomeSection("rewards")}>
          <span className="stat-icon">⭐</span>
          <div>
            <strong>{progress.stars}</strong>
            <small>Stars</small>
          </div>
        </button>

        <button type="button" className="stat-card streak-stat" onClick={() => goToHomeSection("profile")}>
          <span className="stat-icon">🔥</span>
          <div>
            <strong>{progress.streak}</strong>
            <small>Day Streak</small>
          </div>
        </button>
      </section>

      {/* DAILY CHALLENGE */}
      <section className="home-section home-animate delay-3">
        <div className="section-heading">
          <h2>🎯 Daily Challenge</h2>
          <span className="section-badge">+10 ⭐</span>
        </div>

        <div className="daily-challenge-card">
          <div className="challenge-illustration">🔤</div>

          <div className="challenge-content">
            <h3>Find 5 Letters</h3>
            <div className="letter-tiles" aria-hidden="true">
              {["A", "?", "?", "?", "?"].map((t, i) => (
                <span key={i} className={i === 0 ? "tile found" : "tile"}>{t}</span>
              ))}
            </div>
            <p>Find the hidden letters and win today's challenge.</p>

            <button type="button" className="play-button" onClick={() => openGame("letter-hunt")}>
              Play Now <span>▶</span>
            </button>
          </div>
        </div>
      </section>

      {/* CONTINUE LEARNING */}
      <section className="home-section home-animate delay-4">
        <div className="section-heading">
          <h2>📚 Continue Learning</h2>
          <button type="button" className="see-all-button" onClick={() => goToHomeSection("learn")}>
            See all
          </button>
        </div>

        <button
          type="button"
          className="learning-progress-card"
          onClick={() => openLearningCategory("alphabet")}
          aria-label="Continue Alphabet learning"
        >
          <div className="learning-icon">🍎</div>

          <div className="learning-info">
            <span>Alphabet</span>
            <strong>A is for Apple</strong>
            <div className="progress-track">
              <div className="progress-value" style={{ width: `${alphabetProgress}%` }} />
            </div>
            <small>{alphabetProgress}% completed</small>
          </div>

          <span className="continue-button" aria-hidden="true">
            ▶
          </span>
        </button>
      </section>

      {/* GAMES */}
      <section className="home-section home-animate delay-5">
        <div className="section-heading">
          <h2>🎮 Play & Learn</h2>
          <button type="button" className="see-all-button" onClick={() => goToHomeSection("games")}>
            See all
          </button>
        </div>

        <div className="games-horizontal-list">
          {recommendedGames.map((game, index) => (
            <button
              key={game.id}
              type="button"
              className={`home-game-card ${game.background}`}
              style={{ "--d": `${index * 0.4}s` }}
              onClick={() => openGame(game.id)}
              aria-label={`Play ${game.title}`}
            >
              <span className="game-card-spark">✨</span>
              <span className="game-ribbon">{["NEW", "HOT", "FUN"][index] || "FUN"}</span>
              <span className="home-game-icon">{game.icon}</span>
              <strong>{game.title}</strong>
              <small>{game.subtitle}</small>
              <span className="game-card-arrow">▶</span>
            </button>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="home-section categories-section home-animate delay-6">
        <div className="section-heading">
          <h2>🧩 Learn More</h2>
          <button type="button" className="see-all-button" onClick={() => goToHomeSection("learn")}>
            See all
          </button>
        </div>

        <div className="category-grid">
          {learningCategories.map((category, index) => (
            <button
              key={category.id}
              type="button"
              className={`category-card ${category.color}`}
              style={{ "--d": `${index * 0.25}s` }}
              onClick={() => openLearningCategory(category.id)}
              aria-label={`Learn ${category.title}`}
            >
              <span className="category-card-icon">{category.icon}</span>
              <strong>{category.title}</strong>
              <small>{category.description}</small>
            </button>
          ))}
        </div>
      </section>

      {/* BOTTOM MESSAGE */}
      <section className="home-finish-card">
        <div className="finish-mascot">🐻</div>
        <div>
          <strong>You're doing amazing! 🌟</strong>
          <p>Learn a little, play a little, and have lots of fun!</p>
        </div>
      </section>
    </main>
  );
}

export default Home;