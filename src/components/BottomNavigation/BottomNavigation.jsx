import "./BottomNavigation.css";

const navigationItems = [
  {
    id: "home",
    label: "Home",
    icon: "🏠",
  },
  {
    id: "games",
    label: "Games",
    icon: "🎮",
  },
  {
    id: "learn",
    label: "Learn",
    icon: "📚",
  },
  {
    id: "rewards",
    label: "Rewards",
    icon: "🏆",
  },
  {
    id: "profile",
    label: "Profile",
    icon: "👤",
  },
];

function BottomNavigation({ activeSection, onNavigate }) {
  return (
    <nav className="bottom-navigation" aria-label="Main navigation">
      <div className="bottom-navigation-inner">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-item ${
              activeSection === item.id ? "active" : ""
            }`}
            onClick={() => onNavigate(item.id)}
            aria-label={item.label}
            aria-current={
              activeSection === item.id ? "page" : undefined
            }
          >
            <span className="nav-icon" aria-hidden="true">
              {item.icon}
            </span>

            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default BottomNavigation;