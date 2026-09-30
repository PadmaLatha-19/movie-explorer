import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showToast, setShowToast] = useState("");

  const triggerToast = (msg) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(""), 2800);
  };

  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleSearchClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const input = document.getElementById("hero-search-input");
        if (input) {
          input.focus();
          input.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 150);
    } else {
      const input = document.getElementById("hero-search-input");
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="logo-icon-wrapper">
            <svg
              className="logo-clapper-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="5" width="20" height="15" rx="3" fill="url(#clapper-gradient)" />
              <path
                d="M2 9.5L5 5M6.5 9.5L9.5 5M11 9.5L14 5M15.5 9.5L18.5 5"
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <line x1="2" y1="10" x2="22" y2="10" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
              <defs>
                <linearGradient id="clapper-gradient" x1="2" y1="5" x2="22" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8b5cf6" />
                  <stop offset="1" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="logo-title">
            <span className="logo-text-white">Movie</span>{" "}
            <span className="logo-text-purple">Explorer</span>
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className={`navbar-nav ${mobileMenuOpen ? "open" : ""}`}>
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            onClick={(e) => handleNavClick("hero-section", e)}
          >
            Home
          </Link>
          <a
            href="#popular-movies"
            className="nav-link"
            onClick={(e) => handleNavClick("popular-movies", e)}
          >
            Movies
          </a>
          <a
            href="#genres-section"
            className="nav-link"
            onClick={(e) => handleNavClick("genres-section", e)}
          >
            Genres
          </a>
          <button
            type="button"
            className="nav-link nav-btn"
            onClick={() => triggerToast("Watchlist feature saved to your profile!")}
          >
            Watchlist
          </button>
          <button
            type="button"
            className="nav-link nav-btn"
            onClick={() => triggerToast("Movie Explorer v2.0 • Powered by TMDB API")}
          >
            About
          </button>
          <Link
            to="/login"
            className={`nav-link ${location.pathname === "/login" || location.pathname === "/register" ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Sign In
          </Link>
        </nav>

        {/* Right Action Icons */}
        <div className="navbar-actions">
          <button
            type="button"
            className="action-icon-btn"
            aria-label="Search movies"
            onClick={handleSearchClick}
            title="Search movies"
          >
            <svg
              className="search-svg-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <Link
            to="/profile"
            className="user-avatar"
            title="View Profile"
            aria-label="View Profile"
          >
            <span>P</span>
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`bar ${mobileMenuOpen ? "bar-1" : ""}`}></span>
            <span className={`bar ${mobileMenuOpen ? "bar-2" : ""}`}></span>
            <span className={`bar ${mobileMenuOpen ? "bar-3" : ""}`}></span>
          </button>
        </div>
      </div>

      {/* Subtle Toast Feedback */}
      {showToast && (
        <div className="navbar-toast">
          <span>{showToast}</span>
        </div>
      )}
    </header>
  );
}

export default Navbar;