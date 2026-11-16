export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="status error" role="alert">
      <p>Something went wrong: {message}</p>
      {onRetry && (
        <button type="button" className="btn" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
