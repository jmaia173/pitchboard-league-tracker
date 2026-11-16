import { useState } from 'react';
import { useLeagues } from '../contexts/useLeagues';
import TeamCard from '../components/TeamCard';

export default function Teams() {
  const { teams, players, standings } = useLeagues();
  const [query, setQuery] = useState('');

  const visible = teams.filter((team) =>
    team.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div>
      <h1>Teams</h1>

      <label className="field">
        <span>Search teams</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Ashland"
        />
      </label>

      {visible.length === 0 ? (
        <p className="muted">No teams match "{query}".</p>
      ) : (
        <div className="grid">
          {visible.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              record={standings.find((s) => s.teamId === team.id)}
              playerCount={players.filter((p) => p.teamId === team.id).length}
            />
          ))}
        </div>
      )}
    </div>
  );
}
