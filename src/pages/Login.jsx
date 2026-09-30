import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
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
    setLoading(true);

    setTimeout(() => {
      // Check registered users from localStorage
      const storedUsers = JSON.parse(
        localStorage.getItem("movie_explorer_registered_users") || "[]"
      );

      const user = storedUsers.find((u) => u.email.toLowerCase() === formData.email.toLowerCase());

      if (user && user.password !== formData.password) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
        return;
      }

      // If user exists, log in; if not found in list, allow login as guest/existing profile
      const loggedInUser = user || {
        fullName: formData.email.split("@")[0],
        email: formData.email,
        username: formData.email.split("@")[0].toLowerCase(),
      };

      // Set active session in localStorage
      localStorage.setItem("movie_explorer_auth_user", JSON.stringify(loggedInUser));

      // Update active profile name if exists
      const existingProfile = JSON.parse(
        localStorage.getItem("movie_explorer_profile") || "{}"
      );
      localStorage.setItem(
        "movie_explorer_profile",
        JSON.stringify({
          ...existingProfile,
          fullName: loggedInUser.fullName || existingProfile.fullName || "User",
          email: loggedInUser.email,
          username: loggedInUser.username || "cinephile",
        })
      );

      setLoading(false);
      navigate("/profile");
    }, 600);
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
                <rect x="2" y="5" width="20" height="15" rx="3" fill="url(#clapper-login-gradient)" />
                <path
                  d="M2 9.5L5 5M6.5 9.5L9.5 5M11 9.5L14 5M15.5 9.5L18.5 5"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <line x1="2" y1="10" x2="22" y2="10" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
                <defs>
                  <linearGradient id="clapper-login-gradient" x1="2" y1="5" x2="22" y2="20" gradientUnits="userSpaceOnUse">
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

          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account and explore thousands of movies.</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="auth-error-alert">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label htmlFor="login-email">Email Address</label>
            <div className="auth-input-wrap">
              <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                id="login-email"
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

          <div className="auth-form-group">
            <div className="label-with-link">
              <label htmlFor="login-password">Password</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); setError("Password reset link sent to your email!"); }} className="forgot-password-link">
                Forgot password?
              </a>
            </div>
            <div className="auth-input-wrap">
              <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
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

          <div className="auth-checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span className="checkbox-text">Remember me for 30 days</span>
            </label>
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Footer Link to Register */}
        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="auth-switch-link">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;
