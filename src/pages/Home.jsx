import { Link } from 'react-router-dom';
import { useLeagues } from '../contexts/useLeagues';
import StandingsTable from '../components/StandingsTable';
import GameCard from '../components/GameCard';
import { isPlayed, sortGamesDesc } from '../utils/games';
import { topScorers } from '../utils/stats';

export default function Home() {
  const { standings, games, players } = useLeagues();
  const latest = sortGamesDesc(games.filter((g) => isPlayed(g))).slice(0, 3);
  const [leader] = topScorers(players, 1);

  return (
    <div>
      <h1>League Overview</h1>

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
