import { useLeagues } from './contexts/useLeagues';

export default function App() {
  const { loading, error, standings, players } = useLeagues();

  if (loading) return <p>Loading... (the API may take about 30s to wake up)</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Pitchboard</h1>
      <h2>Standings</h2>
      <table>
        <thead>
          <tr>
            <th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th>
            <th>GF</th><th>GA</th><th>GD</th><th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((s) => (
            <tr key={s.teamId}>
              <td>{s.name}</td><td>{s.played}</td><td>{s.won}</td>
              <td>{s.drawn}</td><td>{s.lost}</td><td>{s.goalsFor}</td>
              <td>{s.goalsAgainst}</td><td>{s.goalDiff}</td><td>{s.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{players.length} players loaded</p>
    </div>
  );
}
