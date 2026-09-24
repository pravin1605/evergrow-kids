import { useState } from "react";

import "./AnimalSounds.css";

import RewardPopup from "../../components/RewardPopup/RewardPopup";

import {
  recordGameCompleted,
} from "../../data/rewards";

const animals = [
  {
    name: "Dog",
    emoji: "🐶",
    sound: "Woof!",
  },
  {
    name: "Cat",
    emoji: "🐱",
    sound: "Meow!",
  },
  {
    name: "Cow",
    emoji: "🐮",
    sound: "Moo!",
  },
];

function AnimalSounds({ onBack }) {
  const [animalIndex, setAnimalIndex] =
    useState(0);

  const [message, setMessage] =
    useState("");

  const [rewardVisible, setRewardVisible] =
    useState(false);

  const animal = animals[animalIndex];

  const handleAnimal = (selected) => {
    if (selected.name === animal.name) {
      setMessage(`🎉 ${animal.sound}`);

      setTimeout(() => {
        if (
          animalIndex <
          animals.length - 1
        ) {
          setAnimalIndex(
            (previous) => previous + 1
          );

          setMessage("");
        } else {
          setMessage(
            "🏆 Animal game complete!"
          );

          const result =
            recordGameCompleted(
              "animal-sounds",
              10
            );

          if (result.awarded) {
            setRewardVisible(true);
          }
        }
      }, 700);
    } else {
      setMessage(
        "💭 Listen and try again!"
      );
    }
  };

  return (
    <main className="animal-sounds-page">
      <button
        type="button"
        className="animal-sounds-back"
        onClick={onBack}
      >
        ← Games
      </button>

      <header className="animal-sounds-header">
        <span>🐾 ANIMAL GAME</span>

        <h1>Animal Sounds</h1>

        <p>
          Which animal makes this sound?
        </p>
      </header>

      <section className="animal-sounds-card">
        <div className="animal-sound-bubble">
          🔊
        </div>

        <h2>
          "{animal.sound}"
        </h2>

        <p>Who makes this sound?</p>

        <div className="animal-options">
          {animals.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() =>
                handleAnimal(item)
              }
            >
              <span>{item.emoji}</span>

              <strong>{item.name}</strong>
            </button>
          ))}
        </div>

        {message && (
          <div className="animal-sounds-message">
            {message}
          </div>
        )}
      </section>

      <RewardPopup
        isVisible={rewardVisible}
        stars={10}
        message="Animal Expert!"
        onClose={() =>
          setRewardVisible(false)
        }
      />
    </main>
  );
}

export default AnimalSounds;