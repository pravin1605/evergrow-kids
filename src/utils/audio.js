const sounds = {
  click: "/sounds/click.mp3",
  correct: "/sounds/correct.mp3",
  wrong: "/sounds/wrong.mp3",
  reward: "/sounds/reward.mp3",
  complete: "/sounds/complete.mp3",
};

export function playSound(name) {
  const soundPath = sounds[name];

  if (!soundPath) {
    console.warn(`Sound "${name}" was not found.`);
    return;
  }

  try {
    const audio = new Audio(soundPath);

    audio.volume = 0.8;

    audio.play().catch(() => {
      // Browser may block audio until the child interacts with the app.
    });
  } catch (error) {
    console.warn("Unable to play sound:", error);
  }
}

export function playLetter(letter) {
  const normalizedLetter = letter.toLowerCase();

  try {
    const audio = new Audio(
      `/sounds/alphabet/${normalizedLetter}.mp3`
    );

    audio.volume = 0.9;

    audio.play().catch(() => {});
  } catch (error) {
    console.warn("Unable to play letter sound:", error);
  }
}

export function playAnimal(animal) {
  const normalizedAnimal = animal.toLowerCase();

  try {
    const audio = new Audio(
      `/sounds/animals/${normalizedAnimal}.mp3`
    );

    audio.volume = 0.9;

    audio.play().catch(() => {});
  } catch (error) {
    console.warn("Unable to play animal sound:", error);
  }
}