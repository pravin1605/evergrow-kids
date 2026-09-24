import "./Home.css";

const learningCategories = [
  {
    id: "alphabet",
    icon: "🔤",
    title: "Alphabet",
  },
  {
    id: "numbers",
    icon: "🔢",
    title: "Numbers",
  },
  {
    id: "colors",
    icon: "🎨",
    title: "Colors",
  },
  {
    id: "shapes",
    icon: "🔺",
    title: "Shapes",
  },
  {
    id: "animals",
    icon: "🐶",
    title: "Animals",
  },
];

const recommendedGames = [
  {
    id: "counting",
    icon: "🍎",
    title: "Count Objects",
    subtitle: "Learn numbers",
    background: "yellow",
  },
  {
    id: "colors",
    icon: "🎨",
    title: "Color Match",
    subtitle: "Learn colors",
    background: "pink",
  },
  {
    id: "letters",
    icon: "🔤",
    title: "Letter Hunt",
    subtitle: "Find letters",
    background: "blue",
  },
];

function Home() {
  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-header">
        <div>
          <span className="home-greeting">👋 Hi Aarav!</span>

          <h1>Let's learn something!</h1>
        </div>

        <button
          type="button"
          className="profile-mini-button"
          aria-label="Open profile"
        >
          👦
        </button>
      </header>

      {/* Mascot */}
      <section className="mascot-section">
        <div className="mascot-character">🐻</div>

        <div className="mascot-bubble">
          <span>🌟</span>
          <p>You are doing great!</p>
        </div>
      </section>

      {/* Stats */}
      <section className="home-stats">
        <div className="stat-card stars-stat">
          <span className="stat-icon">⭐</span>

          <div>
            <strong>125</strong>
            <small>Stars</small>
          </div>
        </div>

        <div className="stat-card streak-stat">
          <span className="stat-icon">🔥</span>

          <div>
            <strong>5</strong>
            <small>Day Streak</small>
          </div>
        </div>
      </section>

      {/* Daily Challenge */}
      <section className="home-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">TODAY</span>
            <h2>🎯 Daily Challenge</h2>
          </div>

          <span className="section-badge">+10 ⭐</span>
        </div>

        <div className="daily-challenge-card">
          <div className="challenge-illustration">
            🔤
          </div>

          <div className="challenge-content">
            <h3>Find 5 Letters</h3>

            <p>
              Find the hidden letters and complete today's challenge.
            </p>

            <button type="button" className="play-button">
              Play
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Continue Learning */}
      <section className="home-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">KEEP GOING</span>
            <h2>📚 Continue Learning</h2>
          </div>

          <button type="button" className="see-all-button">
            See all
          </button>
        </div>

        <div className="learning-progress-card">
          <div className="learning-icon">🍎</div>

          <div className="learning-info">
            <span>Alphabet</span>

            <strong>A is for Apple</strong>

            <div className="progress-track">
              <div className="progress-value" />
            </div>

            <small>7 of 10 lessons completed</small>
          </div>

          <button
            type="button"
            className="continue-button"
            aria-label="Continue learning"
          >
            →
          </button>
        </div>
      </section>

      {/* Recommended Games */}
      <section className="home-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">HAVE FUN</span>
            <h2>🎮 Play & Learn</h2>
          </div>

          <button type="button" className="see-all-button">
            See all
          </button>
        </div>

        <div className="games-horizontal-list">
          {recommendedGames.map((game) => (
            <button
              key={game.id}
              type="button"
              className={`home-game-card ${game.background}`}
            >
              <span className="home-game-icon">{game.icon}</span>

              <strong>{game.title}</strong>

              <small>{game.subtitle}</small>
            </button>
          ))}
        </div>
      </section>

      {/* Learning Categories */}
      <section className="home-section categories-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">EXPLORE</span>
            <h2>📚 Learn More</h2>
          </div>
        </div>

        <div className="category-grid">
          {learningCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              className="category-card"
            >
              <span>{category.icon}</span>
              <strong>{category.title}</strong>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;