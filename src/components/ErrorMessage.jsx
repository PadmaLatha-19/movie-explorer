function ErrorMessage({ message }) {
  return (
    <div className="cinematic-error-container">
      <div className="error-icon-box">⚠️</div>
      <h3 className="error-title">Unable to Load Content</h3>
      <p className="error-description">{message}</p>
    </div>
  );
}

export default ErrorMessage;