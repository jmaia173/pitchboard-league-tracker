import { Link } from 'react-router-dom';
import { useLeagues } from '../contexts/useLeagues';
import { useFollow } from '../contexts/useFollow';
import StandingsTable from '../components/StandingsTable';
import GameCard from '../components/GameCard';
import { isPlayed, sortGamesDesc } from '../utils/games';
import { topScorers } from '../utils/stats';

export default function Home() {
  const { teams, standings, games, players } = useLeagues();
  const { followedIds } = useFollow();
  const followedTeams = teams.filter((t) => followedIds.includes(t.id));
  const latest = sortGamesDesc(games.filter((g) => isPlayed(g))).slice(0, 3);
  const [leader] = topScorers(players, 1);

  return (
    <div>
      <h1>League Overview</h1>

      <section className="card">
        <h2>Following</h2>
        {followedTeams.length === 0 ? (
          <p className="muted">
            You are not following any teams yet. Visit the{' '}
            <Link to="/teams">Teams page</Link> to follow some.
          </p>
        ) : (
          <ul>
            {followedTeams.map((team) => (
              <li key={team.id}>
                <Link to={`/teams/${team.id}`}>{team.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Standings</h2>
        <StandingsTable rows={standings} />
      </section>

      {leader && (
        <section className="card">
          <h2>Top scorer</h2>
          <p>
            <strong>{leader.name}</strong>
            {leader.team ? ` (${leader.team.name})` : ''} · {leader.goals} goals
          </p>
        </section>
      )}

      <section>
        <h2>Latest results</h2>
        <div className="grid">
          {latest.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        <p>
          <Link to="/fixtures">See all fixtures</Link>
        </p>
      </section>
    </div>
  );
}
