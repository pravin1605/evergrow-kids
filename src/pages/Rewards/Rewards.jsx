import { useEffect, useState } from "react";

import "./Rewards.css";

import RewardPopup from "../../components/RewardPopup/RewardPopup";

import {
  badges,
  getProgress,
  unlockables,
} from "../../data/rewards";

function Rewards() {
  const [progress, setProgress] =
    useState(getProgress());

  const [showPopup, setShowPopup] =
    useState(false);

  /*
   * =========================================
   * REFRESH PROGRESS
   * =========================================
   */

  const refreshProgress = () => {
    setProgress(getProgress());
  };

  /*
   * Refresh whenever Rewards becomes visible.
   */

  useEffect(() => {
    refreshProgress();
  }, []);

  /*
   * =========================================
   * LEVEL PROGRESS
   * =========================================
   */

  const levelProgress =
    ((progress.stars % 100) / 100) * 100;

  /*
   * =========================================
   * DEMO REWARD
   * =========================================
   *
   * This remains only for testing the popup.
   */

  const handleDemoReward = () => {
    setShowPopup(true);

    setProgress(getProgress());
  };

  return (
    <main className="rewards-page">
      {/* HEADER */}

      <header className="rewards-header">
        <div>
          <span className="rewards-eyebrow">
            YOUR ACHIEVEMENTS
          </span>

          <h1>🏆 Rewards</h1>

          <p>
            Look at all the amazing things you did!
          </p>
        </div>

        <div className="rewards-header-icon">
          ⭐
        </div>
      </header>

      {/* STAR HERO */}

      <section className="rewards-hero-card">
        <div className="rewards-hero-icon">
          {progress.avatar}
        </div>

        <div className="rewards-hero-content">
          <span>YOU HAVE</span>

          <strong>{progress.stars}</strong>

          <small>⭐ Stars</small>
        </div>

        <div className="rewards-streak">
          <span>🔥</span>

          <strong>
            {progress.streak}
          </strong>

          <small>Day Streak</small>
        </div>
      </section>

      {/* LEVEL */}

      <section className="rewards-level-card">
        <div className="rewards-level-top">
          <div>
            <span>YOUR LEVEL</span>

            <strong>
              Level {progress.level}
            </strong>
          </div>

          <span>
            {progress.stars % 100}/100 ⭐
          </span>
        </div>

        <div className="rewards-progress-track">
          <div
            className="rewards-progress-fill"
            style={{
              width: `${levelProgress}%`,
            }}
          />
        </div>

        <p>
          Keep learning to reach the next level! 🚀
        </p>
      </section>

      {/* BADGES */}

      <section className="rewards-section">
        <div className="rewards-section-heading">
          <div>
            <span>COLLECT THEM ALL</span>

            <h2>🏅 Badges</h2>
          </div>

          <strong>
            {progress.badges.length}/
            {badges.length}
          </strong>
        </div>

        <div className="badges-grid">
          {badges.map((badge) => {
            const unlocked =
              progress.badges.includes(
                badge.id
              );

            return (
              <article
                key={badge.id}
                className={`badge-card ${
                  unlocked
                    ? "unlocked"
                    : "locked"
                }`}
              >
                <div className="badge-icon">
                  {unlocked
                    ? badge.icon
                    : "🔒"}
                </div>

                <strong>
                  {badge.title}
                </strong>

                <span>
                  {badge.description}
                </span>
              </article>
            );
          })}
        </div>
      </section>

      {/* UNLOCKABLES */}

      <section className="rewards-section">
        <div className="rewards-section-heading">
          <div>
            <span>USE YOUR STARS</span>

            <h2>🎁 Unlockables</h2>
          </div>
        </div>

        <div className="unlockables-list">
          {unlockables.map((item) => {
            const unlocked =
              progress.stars >=
              item.requirement;

            return (
              <article
                key={item.id}
                className={`unlockable-card ${
                  unlocked
                    ? "unlocked"
                    : "locked"
                }`}
              >
                <div className="unlockable-icon">
                  {unlocked
                    ? item.icon
                    : "🔒"}
                </div>

                <div className="unlockable-content">
                  <strong>
                    {item.title}
                  </strong>

                  <span>
                    {unlocked
                      ? "Unlocked! 🎉"
                      : `${item.requirement} ⭐ needed`}
                  </span>
                </div>

                <div className="unlockable-status">
                  {unlocked ? "✓" : "🔒"}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* TEST POPUP */}

      <section className="rewards-demo-card">
        <div>
          <span>TEST REWARD</span>

          <h2>
            🎉 Try a Reward Popup
          </h2>

          <p>
            This will become automatic when
            games award stars.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDemoReward}
        >
          +10 ⭐
        </button>
      </section>

      <RewardPopup
        isVisible={showPopup}
        stars={10}
        message="Amazing!"
        onClose={() =>
          setShowPopup(false)
        }
      />
    </main>
  );
}

export default Rewards;