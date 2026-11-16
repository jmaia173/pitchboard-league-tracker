import { Link } from 'react-router-dom';

export default function TeamCard({ team, record, playerCount }) {
  return (
    <article className="card team-card">
      <h2>
        <Link to={`/teams/${team.id}`}>{team.name}</Link>
      </h2>
      <p className="muted">{team.homeLocation}</p>
      <p>
        {playerCount} players
        {record ? ` · ${record.points} pts` : ''}
      </p>
    </article>
  );
}
