export default function Loading({ message = 'Loading...' }) {
  return (
    <div className="status" role="status">
      <p>{message}</p>
      <p className="muted">The API may take up to 30 seconds to wake up.</p>
    </div>
  );
}
