import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GameCard from '../components/GameCard';

const baseGame = {
  id: 1,
  location: 'Ashland Sports Park',
  homeScore: 3,
  awayScore: 1,
  homeTeamId: 11,
  awayTeamId: 12,
  homeTeam: { id: 11, name: 'Ashland FC' },
  awayTeam: { id: 12, name: 'Medford United' },
};

const renderCard = (game) =>
  render(
    <MemoryRouter>
      <GameCard game={game} />
    </MemoryRouter>
  );

describe('GameCard', () => {
  it('shows team names, location, and the score for a played game', () => {
    renderCard({ ...baseGame, date: '2020-01-01' });

    expect(screen.getByRole('link', { name: 'Ashland FC' })).toHaveAttribute('href', '/teams/11');
    expect(screen.getByRole('link', { name: 'Medford United' })).toBeInTheDocument();
    expect(screen.getByText('Ashland Sports Park')).toBeInTheDocument();
    expect(screen.getByText('3 - 1')).toBeInTheDocument();
  });

  it('shows "vs" instead of a score for a future game', () => {
    renderCard({ ...baseGame, date: '2099-01-01' });

    expect(screen.getByText('vs')).toBeInTheDocument();
    expect(screen.queryByText('3 - 1')).not.toBeInTheDocument();
  });
});
