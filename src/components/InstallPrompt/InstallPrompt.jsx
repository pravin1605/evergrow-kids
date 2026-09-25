import { useEffect, useState } from "react";

import "./InstallPrompt.css";

function InstallPrompt() {
  const [installEvent, setInstallEvent] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallEvent(event);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallEvent(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    const standalone = window.matchMedia("(display-mode: standalone)").matches;

    if (standalone) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installEvent) return;

    await installEvent.prompt();

    const result = await installEvent.userChoice;

    if (result.outcome === "accepted") {
      setIsInstalled(true);
    }

    setInstallEvent(null);
  };

  if (isInstalled || !installEvent) {
    return null;
  }

  return (
    <button
      type="button"
      className="install-prompt"
      onClick={handleInstall}
      aria-label="Install EverGrow Kids app"
      title="Install EverGrow Kids"
    >
      <span className="install-prompt-ring" aria-hidden="true" />
      <span className="install-prompt-icon">📱</span>
    </button>
  );
}

export default InstallPrompt;