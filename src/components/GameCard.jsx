import { Link } from 'react-router-dom';
import { formatDate, isPlayed } from '../utils/games';

export default function GameCard({ game }) {
  const played = isPlayed(game);

  return (
    <article className="card game-card">
      <p className="muted">{formatDate(game.date)}</p>
      <div className="game-teams">
        <Link to={`/teams/${game.homeTeamId}`}>{game.homeTeam.name}</Link>
        <strong className="game-score">
          {played ? `${game.homeScore} - ${game.awayScore}` : 'vs'}
        </strong>
        <Link to={`/teams/${game.awayTeamId}`}>{game.awayTeam.name}</Link>
      </div>
      <p className="muted">{game.location}</p>
    </article>
  );
}
