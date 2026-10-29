import { Link, NavLink } from 'react-router-dom';
import { useSaved } from '../context/SavedContext';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { savedIds } = useSaved();
  const { theme, toggleTheme } = useTheme();
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="masthead">
      <div className="masthead__top container">
        <span className="masthead__date">{today}</span>
        <span className="masthead__edition">New York Edition · 50¢</span>
      </div>
      <div className="masthead__brand container">
        <Link to="/" className="logo">
          The Daily Bugle
        </Link>
        <p className="masthead__tagline">New York's finest newspaper — and its loudest.</p>
      </div>
      <nav className="nav container" aria-label="Main">
        <NavLink to="/" end className="nav__link">
          Front Page
        </NavLink>
        <NavLink to="/saved" className="nav__link">
          Saved <span className="badge">{savedIds.length}</span>
        </NavLink>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀︎ Light' : '☾ Dark'}
        </button>
      </nav>
    </header>
  );
}
