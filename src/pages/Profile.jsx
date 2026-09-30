import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  // Load user profile from localStorage or default values
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("movie_explorer_profile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback to default
      }
    }
    return {
      fullName: "Paras",
      username: "paras_cinema",
      email: "paras@movieexplorer.com",
      location: "San Francisco, CA",
      bio: "Cinephile & Sci-Fi enthusiast. Constantly exploring distant galaxies and timeless cinematic masterpieces.",
      joinedDate: "October 2024",
      favoriteGenre: "Sci-Fi",
      preferredLanguage: "English (US)",
      watchlistCount: 18,
      moviesWatchedCount: 47,
      reviewsCount: 12,
    };
  });

  const [formData, setFormData] = useState({ ...userData });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(formData);
    localStorage.setItem("movie_explorer_profile", JSON.stringify(formData));
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCancel = () => {
    setFormData({ ...userData });
    setIsEditing(false);
  };

  return (
    <main className="profile-page">
      <div className="profile-container">
        {/* Navigation Breadcrumb */}
        <div className="profile-top-bar">
          <button
            type="button"
            className="details-back-btn"
            onClick={() => navigate(-1)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back</span>
          </button>

          <Link to="/" className="section-link-btn">
            Explore Movies →
          </Link>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <div className="profile-save-alert">
            <span className="check-icon">✓</span>
            <span>Profile information updated successfully!</span>
          </div>
        )}

        {/* Profile Header Banner */}
        <div className="profile-header-card">
          <div className="profile-cover-gradient"></div>

          <div className="profile-header-content">
            <div className="profile-avatar-large">
              <span>{userData.fullName.charAt(0).toUpperCase()}</span>
              <div className="online-indicator" title="Active Cinephile"></div>
            </div>

            <div className="profile-title-block">
              <div className="name-and-badge">
                <h1 className="profile-name">{userData.fullName}</h1>
                <span className="pro-user-badge">PRO Cinephile</span>
              </div>
              <p className="profile-username">@{userData.username}</p>
              <p className="profile-bio-text">{userData.bio}</p>
              <div className="profile-meta-pills">
                <span className="meta-pill">
                  <span>📅</span>
                  <span>Member since {userData.joinedDate}</span>
                </span>
                <span className="meta-pill">
                  <span>📍</span>
                  <span>{userData.location}</span>
                </span>
                <span className="meta-pill">
                  <span>🪐</span>
                  <span>Fav Genre: {userData.favoriteGenre}</span>
                </span>
              </div>
            </div>

            <div className="profile-header-actions">
              <button
                type="button"
                className={`profile-action-btn ${isEditing ? "active" : ""}`}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Close Edit" : "Edit Profile ✏️"}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="profile-stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrap">🍿</div>
            <div className="stat-data">
              <span className="stat-number">{userData.moviesWatchedCount}</span>
              <span className="stat-label">Movies Watched</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap">🔖</div>
            <div className="stat-data">
              <span className="stat-number">{userData.watchlistCount}</span>
              <span className="stat-label">In Watchlist</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap">⭐</div>
            <div className="stat-data">
              <span className="stat-number">8.6</span>
              <span className="stat-label">Avg. Rating Given</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap">✍️</div>
            <div className="stat-data">
              <span className="stat-number">{userData.reviewsCount}</span>
              <span className="stat-label">Reviews Written</span>
            </div>
          </div>
        </div>

        {/* Details & Form Card */}
        <div className="profile-main-grid">
          <div className="profile-details-card">
            <div className="card-header-row">
              <h2 className="card-title">User Information</h2>
              <span className="card-subtitle">Personal and account details</span>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="3"
                    value={formData.bio}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="favoriteGenre">Favorite Genre</label>
                    <input
                      id="favoriteGenre"
                      name="favoriteGenre"
                      type="text"
                      value={formData.favoriteGenre}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="preferredLanguage">Preferred Language</label>
                    <input
                      id="preferredLanguage"
                      name="preferredLanguage"
                      type="text"
                      value={formData.preferredLanguage}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="hero-search-btn">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="info-display-grid">
                <div className="info-field">
                  <span className="field-label">Full Name</span>
                  <span className="field-value">{userData.fullName}</span>
                </div>

                <div className="info-field">
                  <span className="field-label">Username</span>
                  <span className="field-value">@{userData.username}</span>
                </div>

                <div className="info-field">
                  <span className="field-label">Email Address</span>
                  <span className="field-value">{userData.email}</span>
                </div>

                <div className="info-field">
                  <span className="field-label">Location</span>
                  <span className="field-value">{userData.location}</span>
                </div>

                <div className="info-field">
                  <span className="field-label">Favorite Genre</span>
                  <span className="field-value">{userData.favoriteGenre}</span>
                </div>

                <div className="info-field">
                  <span className="field-label">Preferred Audio/Language</span>
                  <span className="field-value">{userData.preferredLanguage}</span>
                </div>

                <div className="info-field full-width">
                  <span className="field-label">Bio</span>
                  <span className="field-value">{userData.bio}</span>
                </div>
              </div>
            )}
          </div>

          {/* Preferences & Genres Card */}
          <div className="profile-sidebar-card">
            <div className="card-header-row">
              <h2 className="card-title">Top Genres</h2>
            </div>
            <p className="sidebar-desc">
              Your most explored genres based on your watch and rating history.
            </p>

            <div className="genre-tags-cloud">
              <span className="genre-pill-card active">
                <span>🪐</span> Sci-Fi <span>(38%)</span>
              </span>
              <span className="genre-pill-card">
                <span>🔥</span> Action <span>(24%)</span>
              </span>
              <span className="genre-pill-card">
                <span>💓</span> Thriller <span>(18%)</span>
              </span>
              <span className="genre-pill-card">
                <span>🎭</span> Drama <span>(12%)</span>
              </span>
              <span className="genre-pill-card">
                <span>🎨</span> Animation <span>(8%)</span>
              </span>
            </div>

            <div className="preferences-box">
              <h3 className="pref-heading">Cinema Preferences</h3>
              <ul className="pref-list">
                <li>
                  <span className="pref-check">✓</span> High Definition (4K HDR)
                </li>
                <li>
                  <span className="pref-check">✓</span> English Subtitles
                </li>
                <li>
                  <span className="pref-check">✓</span> TMDB Recommendations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
