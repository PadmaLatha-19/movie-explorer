import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    favoriteGenre: "Sci-Fi",
    agreeTerms: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please verify.");
      return;
    }

    if (!formData.agreeTerms) {
      setError("Please agree to the Terms of Service to create an account.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Check if user already exists
      const existingUsers = JSON.parse(
        localStorage.getItem("movie_explorer_registered_users") || "[]"
      );

      const userExists = existingUsers.some(
        (u) => u.email.toLowerCase() === formData.email.toLowerCase()
      );

      if (userExists) {
        setError("An account with this email already exists. Try signing in.");
        setLoading(false);
        return;
      }

      const newUser = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        username: formData.email.split("@")[0].toLowerCase(),
        favoriteGenre: formData.favoriteGenre,
        joinedDate: "Recently Joined",
      };

      existingUsers.push(newUser);
      localStorage.setItem("movie_explorer_registered_users", JSON.stringify(existingUsers));

      // Auto login user
      localStorage.setItem("movie_explorer_auth_user", JSON.stringify(newUser));

      // Save user profile details
      localStorage.setItem(
        "movie_explorer_profile",
        JSON.stringify({
          fullName: newUser.fullName,
          username: newUser.username,
          email: newUser.email,
          location: "Earth, Sector 001",
          bio: `Cinephile & ${newUser.favoriteGenre} enthusiast. Discovering cinematic universes.`,
          joinedDate: "Recently Joined",
          favoriteGenre: newUser.favoriteGenre,
          preferredLanguage: "English (US)",
          watchlistCount: 0,
          moviesWatchedCount: 0,
          reviewsCount: 0,
        })
      );

      setLoading(false);
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    }, 700);
  };

  return (
    <main className="auth-page-container">
      <div className="auth-card-backdrop"></div>

      <div className="auth-card">
        {/* Brand Header */}
        <div className="auth-header">
          <Link to="/" className="auth-logo-link">
            <div className="logo-icon-wrapper">
              <svg
                className="logo-clapper-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="2" y="5" width="20" height="15" rx="3" fill="url(#clapper-reg-gradient)" />
                <path
                  d="M2 9.5L5 5M6.5 9.5L9.5 5M11 9.5L14 5M15.5 9.5L18.5 5"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <line x1="2" y1="10" x2="22" y2="10" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
                <defs>
                  <linearGradient id="clapper-reg-gradient" x1="2" y1="5" x2="22" y2="20" gradientUnits="userSpaceOnUse">
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

          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join Movie Explorer and save your favorite movies across the multiverse.</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="auth-error-alert">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="profile-save-alert">
            <span className="check-icon">✓</span>
            <span>{success}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label htmlFor="reg-name">Full Name</label>
            <div className="auth-input-wrap">
              <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                id="reg-name"
                name="fullName"
                type="text"
                placeholder="Paras Sharma"
                value={formData.fullName}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>
          </div>

          <div className="auth-form-group">
            <label htmlFor="reg-email">Email Address</label>
            <div className="auth-input-wrap">
              <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                id="reg-email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="auth-form-row">
            <div className="auth-form-group">
              <label htmlFor="reg-password">Password</label>
              <div className="auth-input-wrap">
                <input
                  id="reg-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 chars"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="reg-confirm">Confirm Password</label>
              <div className="auth-input-wrap">
                <input
                  id="reg-confirm"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>
          </div>

          <div className="auth-form-group">
            <label htmlFor="reg-genre">Favorite Genre</label>
            <div className="auth-input-wrap">
              <select
                id="reg-genre"
                name="favoriteGenre"
                value={formData.favoriteGenre}
                onChange={handleChange}
                className="auth-select"
              >
                <option value="Sci-Fi">🪐 Sci-Fi</option>
                <option value="Action">🔥 Action</option>
                <option value="Adventure">⛰️ Adventure</option>
                <option value="Animation">🎨 Animation</option>
                <option value="Comedy">😊 Comedy</option>
                <option value="Crime">🎭 Crime</option>
                <option value="Drama">🎭 Drama</option>
                <option value="Fantasy">🪄 Fantasy</option>
                <option value="Horror">💀 Horror</option>
                <option value="Thriller">💓 Thriller</option>
              </select>
            </div>
          </div>

          <div className="auth-checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <span className="checkbox-text">
                I agree to the <a href="#terms" onClick={(e) => e.preventDefault()} className="terms-link">Terms of Service</a> & <a href="#privacy" onClick={(e) => e.preventDefault()} className="terms-link">Privacy Policy</a>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer Link to Login */}
        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-switch-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Register;
