
let currentSpeech = null;

export function speak(text, options = {}) {
  if (!("speechSynthesis" in window)) {
    console.warn(
      "Speech synthesis is not supported."
    );

    return false;
  }

  window.speechSynthesis.cancel();

  const {
    rate = 0.8,
    pitch = 1.15,
    volume = 1,
    lang = "en-IN",
    onStart,
    onEnd,
  } = options;

  const utterance =
    new SpeechSynthesisUtterance(text);

  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = volume;
  utterance.lang = lang;

  utterance.onstart = () => {
    currentSpeech = utterance;

    if (onStart) {
      onStart();
    }
  };

  utterance.onend = () => {
    currentSpeech = null;

    if (onEnd) {
      onEnd();
    }
  };

  utterance.onerror = () => {
    currentSpeech = null;

    if (onEnd) {
      onEnd();
    }
  };

  currentSpeech = utterance;

  window.speechSynthesis.speak(utterance);

  return true;
}

export function stopSpeaking() {
  if (!("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  currentSpeech = null;
}

export function isSpeechSupported() {
  return "speechSynthesis" in window;
}
