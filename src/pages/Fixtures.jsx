import { useState } from 'react';
import { useLeagues } from '../contexts/useLeagues';
import GameCard from '../components/GameCard';
import { isPlayed, sortGamesAsc, sortGamesDesc } from '../utils/games';

export default function Fixtures() {
  const { games } = useLeagues();
  const [view, setView] = useState('results');

  const list =
    view === 'results'
      ? sortGamesDesc(games.filter((g) => isPlayed(g)))
      : sortGamesAsc(games.filter((g) => !isPlayed(g)));

  return (
    <div>
      <h1>Fixtures</h1>

      <div className="tabs" role="group" aria-label="Fixture view">
        <button
          type="button"
          className={view === 'results' ? 'btn active' : 'btn'}
          aria-pressed={view === 'results'}
          onClick={() => setView('results')}
        >
          Results
        </button>
        <button
          type="button"
          className={view === 'upcoming' ? 'btn active' : 'btn'}
          aria-pressed={view === 'upcoming'}
          onClick={() => setView('upcoming')}
        >
          Upcoming
        </button>
      </div>

      {list.length === 0 ? (
        <p className="muted">
          {view === 'upcoming'
            ? 'No upcoming games scheduled.'
            : 'No results yet.'}
        </p>
      ) : (
        <div className="grid">
          {list.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
