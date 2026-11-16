export default function StatList({ title, players, statKey, emptyText }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      {players.length === 0 ? (
        <p className="muted">{emptyText}</p>
      ) : (
        <ol className="stat-list">
          {players.map((player) => (
            <li key={player.id}>
              <span>
                {player.name}
                {player.team && (
                  <span className="muted"> · {player.team.name}</span>
                )}
              </span>
              <strong>{player[statKey]}</strong>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
