import { useState } from "react";

import BottomNavigation from "./components/BottomNavigation/BottomNavigation";

import Home from "./pages/Home/Home";
import Games from "./pages/Games/Games";
import Learn from "./pages/Learn/Learn";
import Rewards from "./pages/Rewards/Rewards";
import Profile from "./pages/Profile/Profile";



import InstallPrompt from "./components/InstallPrompt/InstallPrompt";

import OfflineIndicator from "./components/OfflineIndicator/OfflineIndicator";

function App() {
  const [activeSection, setActiveSection] =
    useState("home");

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <Home />;

      case "games":
        return <Games />;

      case "learn":
        return <Learn />;

      case "rewards":
        return <Rewards />;

      case "profile":
        return <Profile />;


        <OfflineIndicator />    

      default:
        return <Home />;



    }
  };

  return (
  <div className="app-shell">
    <main className="app-content">
      {renderSection()}
    </main>

    <InstallPrompt />

    <BottomNavigation
      activeSection={activeSection}
      onNavigate={setActiveSection}
    />
  </div>
);

}

export default App;