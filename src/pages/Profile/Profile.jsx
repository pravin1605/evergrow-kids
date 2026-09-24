import { useEffect, useState } from "react";

import "./Profile.css";

import {
  badges,
  getProgress,
} from "../../data/rewards";

function Profile() {
  const [progress, setProgress] =
    useState(getProgress());

  /*
   * =========================================
   * REFRESH PROGRESS
   * =========================================
   */

  const refreshProgress = () => {
    setProgress(getProgress());
  };

  /*
   * Refresh profile when opened.
   */

  useEffect(() => {
    refreshProgress();
  }, []);

  /*
   * =========================================
   * COMPLETED BADGES
   * =========================================
   */

  const completedBadges =
    badges.filter((badge) =>
      progress.badges.includes(
        badge.id
      )
    );

  /*
   * =========================================
   * CATEGORY NAMES
   * =========================================
   */

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

  return (
    <main className="profile-page">
      {/* HEADER */}

      <header className="profile-header">
        <span>
          MY LEARNING JOURNEY
        </span>

        <h1>👤 Profile</h1>
      </header>

      {/* PROFILE CARD */}

      <section className="profile-card">
        <div className="profile-avatar">
          {progress.avatar}
        </div>

        <h2>
          {progress.childName}
        </h2>

        <p>
          Keep learning and growing! 🌱
        </p>

        <div className="profile-level">
          <span>
            Level {progress.level}
          </span>

          <span>
            {progress.stars} ⭐
          </span>
        </div>
      </section>

      {/* STATS */}

      <section className="profile-stats">
        <div className="profile-stat-card">
          <span>⭐</span>

          <strong>
            {progress.stars}
          </strong>

          <small>Stars</small>
        </div>

        <div className="profile-stat-card">
          <span>🔥</span>

          <strong>
            {progress.streak}
          </strong>

          <small>Day Streak</small>
        </div>

        <div className="profile-stat-card">
          <span>🎮</span>

          <strong>
            {progress.gamesPlayed}
          </strong>

          <small>Games</small>
        </div>

        <div className="profile-stat-card">
          <span>📚</span>

          <strong>
            {progress.lessonsCompleted}
          </strong>

          <small>Lessons</small>
        </div>
      </section>

      {/* LEARNING PROGRESS */}

      <section className="profile-section">
        <div className="profile-section-heading">
          <span>KEEP GOING</span>

          <h2>
            📖 Learning Progress
          </h2>
        </div>

        <div className="profile-learning-list">
          {Object.entries(
            progress.categoryProgress
          ).map(
            ([categoryId, value]) => (
              <div
                className="profile-learning-row"
                key={categoryId}
              >
                <div className="profile-learning-info">
                  <strong>
                    {categoryNames[
                      categoryId
                    ] || categoryId}
                  </strong>

                  <span>
                    {value}%
                  </span>
                </div>

                <div className="profile-progress-track">
                  <div
                    className="profile-progress-fill"
                    style={{
                      width: `${value}%`,
                    }}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* BADGES */}

      <section className="profile-section">
        <div className="profile-section-heading">
          <span>
            YOUR ACHIEVEMENTS
          </span>

          <h2>
            🏅 Badges
          </h2>
        </div>

        <div className="profile-badges">
          {completedBadges.length > 0 ? (
            completedBadges.map(
              (badge) => (
                <div
                  className="profile-badge"
                  key={badge.id}
                >
                  <span>
                    {badge.icon}
                  </span>

                  <strong>
                    {badge.title}
                  </strong>
                </div>
              )
            )
          ) : (
            <div className="profile-empty">
              <span>🌟</span>

              <p>
                Complete games and lessons
                to earn badges!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* MANUAL REFRESH */}

      <button
        type="button"
        className="profile-refresh-button"
        onClick={refreshProgress}
      >
        🔄 Refresh Progress
      </button>
    </main>
  );
}

export default Profile;