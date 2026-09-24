import { useState } from "react";

import "./Memory.css";

import RewardPopup from "../../components/RewardPopup/RewardPopup";
import { getGameLevels } from "../../data/gameLevels";

import {
  recordLevelCompleted,
} from "../../data/rewards";



function Memory({ onBack, levelId = 1 }) {
  const level = getGameLevels("memory")[Number(levelId) - 1] || getGameLevels("memory")[0];
  const values = ["🍎", "⭐", "🐶", "🍌", "🌈", "🚗"].slice(0, level.pairs);
  const cards = values.flatMap((value, index) => [
    { id: index * 2 + 1, value },
    { id: index * 2 + 2, value },
  ]);

  const [flipped, setFlipped] =
    useState([]);

  const [matched, setMatched] =
    useState([]);

  const [rewardVisible, setRewardVisible] =
    useState(false);

  const handleCard = (card) => {
    if (
      flipped.includes(card.id) ||
      matched.includes(card.id) ||
      flipped.length === 2
    ) {
      return;
    }

    const nextFlipped = [
      ...flipped,
      card.id,
    ];

    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      const first = cards.find(
        (item) =>
          item.id === nextFlipped[0]
      );

      const second = cards.find(
        (item) =>
          item.id === nextFlipped[1]
      );

      if (first.value === second.value) {
        const nextMatched = [
          ...matched,
          first.id,
          second.id,
        ];

        setMatched(nextMatched);

        if (
          nextMatched.length ===
          cards.length
        ) {
          const result =
            recordLevelCompleted(
              "memory",
              levelId,
              levelId === 10 ? 10 : 5
            );

          if (result.awarded) {
            setRewardVisible(true);
          }
        }

        setTimeout(() => {
          setFlipped([]);
        }, 500);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 800);
      }
    }
  };

  const completed =
    matched.length === cards.length;

  return (
    <main className="memory-page">
      <button
        type="button"
        className="memory-back"
        onClick={onBack}
      >
        ← Levels
      </button>

      <header className="memory-header">
        <span>🧠 MEMORY GAME</span>

        <h1>Memory</h1>

        <p>Find the matching pairs!</p>
      </header>

      <section className="memory-card">
        <div className="memory-grid">
          {cards.map((card) => {
            const visible =
              flipped.includes(card.id) ||
              matched.includes(card.id);

            return (
              <button
                key={card.id}
                type="button"
                className={`memory-tile ${
                  visible ? "visible" : ""
                } ${
                  matched.includes(card.id)
                    ? "matched"
                    : ""
                }`}
                onClick={() =>
                  handleCard(card)
                }
              >
                {visible
                  ? card.value
                  : "?"}
              </button>
            );
          })}
        </div>

        {completed && (
          <div className="memory-complete">
            🏆 Amazing memory!
          </div>
        )}
      </section>

      <RewardPopup
        isVisible={rewardVisible}
        stars={level.stars}
        message="Memory Master!"
        onClose={() =>
          setRewardVisible(false)
        }
      />
    </main>
  );
}

export default Memory;