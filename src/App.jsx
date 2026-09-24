import { useEffect, useState } from "react";

import BottomNavigation from "./components/BottomNavigation/BottomNavigation";

import Home from "./pages/Home/Home";
import Games from "./pages/Games/Games";
import Learn from "./pages/Learn/Learn";
import Rewards from "./pages/Rewards/Rewards";
import Profile from "./pages/Profile/Profile";

import InstallPrompt from "./components/InstallPrompt/InstallPrompt";
import OfflineIndicator from "./components/OfflineIndicator/OfflineIndicator";

/*
 * =========================================
 * GET CURRENT NAVIGATION FROM URL
 * =========================================
 *
 * Supported URLs:
 *
 * #home
 * #games
 * #games/count-objects
 * #games/letter-hunt
 * #games/color-match
 * #learn
 * #learn/alphabet
 * #learn/numbers
 * #learn/colors
 * #rewards
 * #profile
 */

function getNavigationFromUrl() {
  const hash = window.location.hash
    .replace(/^#/, "")
    .trim();

  /*
   * No hash = HOME
   */

  if (!hash) {
    return {
      section: "home",
      gameId: null,
      categoryId: null,
    };
  }

  const parts = hash.split("/");

  const section = parts[0];

  /*
   * =========================================
   * GAMES
   * =========================================
   */

  if (section === "games") {
    return {
      section: "games",
      gameId: parts[1] || null,
      categoryId: null,
    };
  }

  /*
   * =========================================
   * LEARN
   * =========================================
   */

  if (section === "learn") {
    return {
      section: "learn",
      gameId: null,
      categoryId: parts[1] || null,
    };
  }

  /*
   * =========================================
   * REWARDS
   * =========================================
   */

  if (section === "rewards") {
    return {
      section: "rewards",
      gameId: null,
      categoryId: null,
    };
  }

  /*
   * =========================================
   * PROFILE
   * =========================================
   */

  if (section === "profile") {
    return {
      section: "profile",
      gameId: null,
      categoryId: null,
    };
  }

  /*
   * =========================================
   * INVALID URL
   * =========================================
   *
   * If somebody enters an unknown hash,
   * safely return to Home.
   */

  return {
    section: "home",
    gameId: null,
    categoryId: null,
  };
}

/*
 * =========================================
 * APP
 * =========================================
 */

function App() {
  /*
   * Read the URL ONCE when the app starts.
   *
   * This is the important part for refresh.
   */

  const initialNavigation =
    getNavigationFromUrl();

  const [activeSection, setActiveSection] =
    useState(initialNavigation.section);

  const [selectedGameId, setSelectedGameId] =
    useState(initialNavigation.gameId);

  const [
    selectedCategoryId,
    setSelectedCategoryId,
  ] = useState(
    initialNavigation.categoryId
  );

  /*
   * =========================================
   * NAVIGATION FUNCTION
   * =========================================
   */

  const handleNavigate = (
    section,
    options = {}
  ) => {
    let gameId = null;
    let categoryId = null;

    /*
     * =======================================
     * GAMES
     * =======================================
     */

    if (section === "games") {
      gameId = options.gameId || null;

      setSelectedGameId(gameId);
      setSelectedCategoryId(null);
    }

    /*
     * =======================================
     * LEARN
     * =======================================
     */

    else if (section === "learn") {
      categoryId =
        options.categoryId || null;

      setSelectedCategoryId(categoryId);
      setSelectedGameId(null);
    }

    /*
     * =======================================
     * OTHER SECTIONS
     * =======================================
     */

    else {
      setSelectedGameId(null);
      setSelectedCategoryId(null);
    }

    /*
     * Update React state.
     */

    setActiveSection(section);

    /*
     * =======================================
     * BUILD URL
     * =======================================
     */

    let newHash = section;

    if (section === "games" && gameId) {
      newHash = `games/${gameId}`;
    }

    if (section === "learn" && categoryId) {
      newHash = `learn/${categoryId}`;
    }

    /*
     * =======================================
     * UPDATE BROWSER URL
     * =======================================
     *
     * location.hash is intentionally used here.
     *
     * This makes browser/PWA navigation and
     * refresh work correctly.
     */

    if (
      window.location.hash !==
      `#${newHash}`
    ) {
      window.location.hash = newHash;
    }
  };

  /*
   * =========================================
   * BROWSER HASH CHANGE
   * =========================================
   *
   * Handles:
   *
   * - browser navigation
   * - PWA navigation
   * - manual hash changes
   */

  useEffect(() => {
    const handleHashChange = () => {
      const navigation =
        getNavigationFromUrl();

      setActiveSection(
        navigation.section
      );

      setSelectedGameId(
        navigation.gameId
      );

      setSelectedCategoryId(
        navigation.categoryId
      );
    };

    window.addEventListener(
      "hashchange",
      handleHashChange
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        handleHashChange
      );
    };
  }, []);

  /*
   * =========================================
   * RENDER CURRENT PAGE
   * =========================================
   */

  const renderSection = () => {
    switch (activeSection) {
      /*
       * HOME
       */

      case "home":
        return (
          <Home
            onNavigate={handleNavigate}
          />
        );

      /*
       * GAMES
       */

      case "games":
        return (
          <Games
            initialGameId={selectedGameId}
            onNavigate={handleNavigate}
          />
        );

      /*
       * LEARN
       */

      case "learn":
        return (
          <Learn
            initialCategoryId={
              selectedCategoryId
            }
          />
        );

      /*
       * REWARDS
       */

      case "rewards":
        return <Rewards />;

      /*
       * PROFILE
       */

      case "profile":
        return <Profile />;

      /*
       * FALLBACK
       */

      default:
        return (
          <Home
            onNavigate={handleNavigate}
          />
        );
    }
  };

  /*
   * =========================================
   * APP UI
   * =========================================
   */

  return (
    <div className="app-shell">

      <main className="app-content">
        {renderSection()}
      </main>

      <OfflineIndicator />

      <InstallPrompt />

      <BottomNavigation
        activeSection={activeSection}
        onNavigate={(section) =>
          handleNavigate(section)
        }
      />

    </div>
  );
}

export default App;