import { useEffect, useState } from "react";

import "./OfflineIndicator.css";

function OfflineIndicator() {
  const [online, setOnline] =
    useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () =>
      setOnline(true);

    const handleOffline = () =>
      setOnline(false);

    window.addEventListener(
      "online",
      handleOnline
    );

    window.addEventListener(
      "offline",
      handleOffline
    );

    return () => {
      window.removeEventListener(
        "online",
        handleOnline
      );

      window.removeEventListener(
        "offline",
        handleOffline
      );
    };
  }, []);

  if (online) {
    return null;
  }

  return (
    <div
      className="offline-indicator"
      role="status"
    >
      <span>📡</span>

      <span>
        You're offline — keep learning!
      </span>
    </div>
  );
}

export default OfflineIndicator;