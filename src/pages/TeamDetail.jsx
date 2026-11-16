import { Link, useParams } from 'react-router-dom';
import { useLeagues } from '../contexts/useLeagues';
import GameCard from '../components/GameCard';
import { sortGamesDesc } from '../utils/games';

export default function TeamDetail() {
  const { teamId } = useParams();
  const { teams, players, games, standings } = useLeagues();
  const id = Number(teamId);
  const team = teams.find((t) => t.id === id);

  if (!team) {
    return (
      <div>
        <h1>Team not found</h1>
        <Link to="/teams">Back to teams</Link>
      </div>
    );
  }

  const roster = players
    .filter((p) => p.teamId === id)
    .sort((a, b) => a.jerseyNumber - b.jerseyNumber);
  const teamGames = sortGamesDesc(
    games.filter((g) => g.homeTeamId === id || g.awayTeamId === id)
  );
  const record = standings.find((s) => s.teamId === id);

  return (
    <div>
      <p>
        <Link to="/teams">← All teams</Link>
      </p>
      <h1>{team.name}</h1>
      <p className="muted">{team.homeLocation}</p>

      {record && (
        <p>
          {record.won}W {record.drawn}D {record.lost}L · {record.points} pts · GD{' '}
          {record.goalDiff}
        </p>
      )}

      <section>
        <h2>Roster</h2>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Position</th>
                <th scope="col">G</th>
                <th scope="col">A</th>
              </tr>
            </thead>
            <tbody>
              {roster.map((p) => (
                <tr key={p.id}>
                  <td>{p.jerseyNumber}</td>
                  <td>{p.name}</td>
                  <td>{p.position}</td>
                  <td>{p.goals}</td>
                  <td>{p.assists}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Games</h2>
        <div className="grid">
          {teamGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </div>
  );
}
