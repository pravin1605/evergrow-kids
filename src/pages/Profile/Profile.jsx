import { useEffect, useState } from "react";

import "./Profile.css";

import {
  badges,
  getProgress,
} from "../../data/rewards";

const floaters = ["⭐", "🎈", "🏅", "✨", "🌈", "🎉", "⭐", "🎈"];

function Profile() {
  const [progress, setProgress] = useState(getProgress());
  const [spin, setSpin] = useState(false);

  const refreshProgress = () => {
    setProgress(getProgress());
    setSpin(true);
    setTimeout(() => setSpin(false), 700);
  };

  useEffect(() => {
    refreshProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const completedBadges = badges.filter((badge) =>
    progress.badges.includes(badge.id)
  );

  const categoryNames = {
    alphabet: "Alphabet",
    numbers: "Numbers",
    colors: "Colors",
    shapes: "Shapes",
    animals: "Animals",
    fruits: "Fruits",
    vegetables: "Vegetables",
    "body-parts": "Body Parts",
  };

  const categoryIcons = {
    alphabet: "🔤",
    numbers: "🔢",
    colors: "🎨",
    shapes: "🔺",
    animals: "🐶",
    fruits: "🍎",
    vegetables: "🥕",
    "body-parts": "🖐️",
  };

  return (
    <main className="profile-page">
      <div className="profile-floaters" aria-hidden="true">
        {floaters.map((f, i) => (
          <span key={i} style={{ "--i": i }}>{f}</span>
        ))}
      </div>

      {/* HEADER */}
      <header className="profile-header p-animate">
        <span className="profile-eyebrow">🧭 My learning journey</span>
        <h1>
          <span className="p-title-icon">👤</span> Profile
        </h1>
      </header>

      {/* PROFILE CARD */}
      <section className="profile-card p-animate delay-1">
        <div className="card-confetti" aria-hidden="true">
          <span>🎊</span><span>⭐</span><span>✨</span><span>🎈</span>
        </div>

        <div className="profile-avatar">{progress.avatar}</div>

        <h2>{progress.childName}</h2>
        <p>Keep learning and growing! 🌱</p>

        <div className="profile-level">
          <span className="level-pill">Level {progress.level}</span>
          <span className="star-pill">{progress.stars} ⭐</span>
        </div>
      </section>

      {/* STATS */}
      <section className="profile-stats p-animate delay-2">
        <div className="profile-stat-card stat-a">
          <span>⭐</span>
          <strong>{progress.stars}</strong>
          <small>Stars</small>
        </div>

        <div className="profile-stat-card stat-b">
          <span>🔥</span>
          <strong>{progress.streak}</strong>
          <small>Day Streak</small>
        </div>

        <div className="profile-stat-card stat-c">
          <span>🎮</span>
          <strong>{progress.gamesPlayed}</strong>
          <small>Games</small>
        </div>

        <div className="profile-stat-card stat-d">
          <span>📚</span>
          <strong>{progress.lessonsCompleted}</strong>
          <small>Lessons</small>
        </div>
      </section>

      {/* LEARNING PROGRESS */}
      <section className="profile-section p-animate delay-3">
        <div className="profile-section-heading">
          <h2>📖 Learning Progress</h2>
        </div>

        <div className="profile-learning-list">
          {Object.entries(progress.categoryProgress).map(([categoryId, value]) => (
            <div className="profile-learning-row" key={categoryId}>
              <div className="profile-learning-info">
                <span className="row-icon">{categoryIcons[categoryId] || "⭐"}</span>
                <strong>{categoryNames[categoryId] || categoryId}</strong>
                <span className="row-percent">{value}%</span>
              </div>

              <div className="profile-progress-track">
                <div className="profile-progress-fill" style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BADGES */}
      <section className="profile-section p-animate delay-4">
        <div className="profile-section-heading">
          <h2>🏅 Badges</h2>
        </div>

        <div className="profile-badges">
          {completedBadges.length > 0 ? (
            completedBadges.map((badge, i) => (
              <div className="profile-badge" key={badge.id} style={{ "--i": i }}>
                <span>{badge.icon}</span>
                <strong>{badge.title}</strong>
              </div>
            ))
          ) : (
            <div className="profile-empty">
              <span>🌟</span>
              <p>Complete games and lessons to earn badges!</p>
            </div>
          )}
        </div>
      </section>

      {/* MANUAL REFRESH */}
      <button
        type="button"
        className={`profile-refresh-button ${spin ? "spin" : ""}`}
        onClick={refreshProgress}
      >
        <span className="refresh-icon">🔄</span> Refresh Progress
      </button>
    </main>
  );
}

export default Profile;