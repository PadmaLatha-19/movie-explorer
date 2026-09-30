import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-heading">Page Not Found</h2>
        <p className="not-found-desc">
          The page or movie universe you are exploring does not exist or has been moved.
        </p>
        <Link to="/" className="hero-search-btn not-found-btn">
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;