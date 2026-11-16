import { useEffect, useState } from 'react';
import { searchTeams } from '../services/sportsdb';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import ExploreCard from '../components/ExploreCard';

export default function Explore() {
  const [input, setInput] = useState('Arsenal');
  const [query, setQuery] = useState('Arsenal');
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    searchTeams(query)
      .then((results) => {
        if (!cancelled) setTeams(results);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || trimmed === query) return;
    setLoading(true);
    setError(null);
    setQuery(trimmed);
  };

  return (
    <div>
      <h1>Explore</h1>
      <p className="muted">
        Search professional teams from TheSportsDB for inspiration.
      </p>

      <form className="search-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Team name</span>
          <input
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. Barcelona"
          />
        </label>
        <button type="submit" className="btn">
          Search
        </button>
      </form>

      {loading && <Loading message="Searching..." />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && teams.length === 0 && (
        <p className="muted">No teams found for "{query}".</p>
      )}
      {!loading && !error && teams.length > 0 && (
        <div className="grid">
          {teams.map((team) => (
            <ExploreCard key={team.idTeam} team={team} />
          ))}
        </div>
      )}
    </div>
  );
}
