import { useEffect } from "react";

import "./RewardPopup.css";

function RewardPopup({
  isVisible,
  stars = 5,
  message = "Amazing!",
  onClose,
}) {
  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const timer = setTimeout(() => {
      onClose();
    }, 2200);

    return () => {
      clearTimeout(timer);
    };
  }, [isVisible, onClose]);

  if (!isVisible) {
    return null;
  }

  const confetti = [
    "⭐",
    "✨",
    "🎉",
    "🌟",
    "💛",
    "🎈",
    "⭐",
    "✨",
    "🎊",
    "🌈",
    "⭐",
    "💫",
  ];

  return (
    <div
      className="reward-popup-overlay"
      onClick={onClose}
    >
      <div
        className="reward-popup"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="reward-confetti">
          {confetti.map((item, index) => (
            <span
              key={index}
              className={`confetti confetti-${index}`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="reward-popup-star">
          ⭐
        </div>

        <div className="reward-popup-message">
          {message}
        </div>

        <div className="reward-popup-stars">
          +{stars}
          <span>⭐</span>
        </div>

        <p>
          Stars earned!
        </p>

        <button
          type="button"
          onClick={onClose}
        >
          Awesome! 🎉
        </button>
      </div>
    </div>
  );
}

export default RewardPopup;