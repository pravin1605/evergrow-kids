import { useEffect, useState } from "react";

import "./Rewards.css";

import RewardPopup from "../../components/RewardPopup/RewardPopup";

import {
  badges,
  getProgress,
  unlockables,
} from "../../data/rewards";

const floaters = ["🏆", "⭐", "🎖️", "🎉", "✨", "🎁", "🌈", "⭐"];

function Rewards() {
  const [progress, setProgress] = useState(getProgress());
  const [showPopup, setShowPopup] = useState(false);

  const refreshProgress = () => {
    setProgress(getProgress());
  };

  useEffect(() => {
    refreshProgress();
  }, []);

  const levelProgress = ((progress.stars % 100) / 100) * 100;

  const handleDemoReward = () => {
    setShowPopup(true);
    setProgress(getProgress());
  };

  return (
    <main className="rewards-page">
      <div className="rewards-floaters" aria-hidden="true">
        {floaters.map((f, i) => (
          <span key={i} style={{ "--i": i }}>{f}</span>
        ))}
      </div>

      {/* HEADER */}
      <header className="rewards-header r-animate">
        <div>
          <span className="rewards-eyebrow">🎯 Your achievements</span>
          <h1>
            <span className="r-title-icon">🏆</span> Rewards
          </h1>
          <p>Look at all the amazing things you did!</p>
        </div>

        <div className="rewards-header-icon">⭐</div>
      </header>

      {/* STAR HERO */}
      <section className="rewards-hero-card r-animate delay-1">
        <div className="hero-shine" aria-hidden="true" />
        <div className="rewards-hero-icon">{progress.avatar}</div>

        <div className="rewards-hero-content">
          <span>You have</span>
          <strong>{progress.stars}</strong>
          <small>⭐ Stars</small>
        </div>

        <div className="rewards-streak">
          <span>🔥</span>
          <strong>{progress.streak}</strong>
          <small>Day Streak</small>
        </div>
      </section>

      {/* LEVEL */}
      <section className="rewards-level-card r-animate delay-2">
        <div className="rewards-level-top">
          <div>
            <span>Your level</span>
            <strong>Level {progress.level}</strong>
          </div>

          <span className="level-pill">{progress.stars % 100}/100 ⭐</span>
        </div>

        <div className="rewards-progress-track">
          <div className="rewards-progress-fill" style={{ width: `${levelProgress}%` }} />
        </div>

        <p>Keep learning to reach the next level! 🚀</p>
      </section>

      {/* BADGES */}
      <section className="rewards-section r-animate delay-3">
        <div className="rewards-section-heading">
          <h2>🏅 Badges</h2>
          <strong>{progress.badges.length}/{badges.length}</strong>
        </div>

        <div className="badges-grid">
          {badges.map((badge, index) => {
            const unlocked = progress.badges.includes(badge.id);

            return (
              <article
                key={badge.id}
                className={`badge-card ${unlocked ? "unlocked" : "locked"}`}
                style={{ "--i": index }}
              >
                <div className="badge-icon">{unlocked ? badge.icon : "🔒"}</div>
                <strong>{badge.title}</strong>
                <span>{badge.description}</span>
              </article>
            );
          })}
        </div>
      </section>

      {/* UNLOCKABLES */}
      <section className="rewards-section r-animate delay-4">
        <div className="rewards-section-heading">
          <h2>🎁 Unlockables</h2>
        </div>

        <div className="unlockables-list">
          {unlockables.map((item, index) => {
            const unlocked = progress.stars >= item.requirement;

            return (
              <article
                key={item.id}
                className={`unlockable-card ${unlocked ? "unlocked" : "locked"}`}
                style={{ "--i": index }}
              >
                <div className="unlockable-icon">{unlocked ? item.icon : "🔒"}</div>

                <div className="unlockable-content">
                  <strong>{item.title}</strong>
                  <span>{unlocked ? "Unlocked! 🎉" : `${item.requirement} ⭐ needed`}</span>
                </div>

                <div className="unlockable-status">{unlocked ? "✓" : "🔒"}</div>
              </article>
            );
          })}
        </div>
      </section>

      {/* TEST POPUP */}
      <section className="rewards-demo-card r-animate delay-5">
        <div>
          <span>Test reward</span>
          <h2>🎉 Try a Reward Popup</h2>
          <p>This will become automatic when games award stars.</p>
        </div>

        <button type="button" onClick={handleDemoReward}>
          +10 ⭐
        </button>
      </section>

      <RewardPopup
        isVisible={showPopup}
        stars={10}
        message="Amazing!"
        onClose={() => setShowPopup(false)}
      />
    </main>
  );
}

export default Rewards;