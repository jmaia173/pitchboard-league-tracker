import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { LeaguesContext } from '../contexts/LeaguesContext';
import { FollowProvider } from '../contexts/FollowProvider';
import Teams from '../pages/Teams';

const value = {
  teams: [
    { id: 11, name: 'Ashland FC', homeLocation: 'Ashland Sports Park' },
    { id: 12, name: 'Medford United', homeLocation: 'Medford Stadium' },
  ],
  players: [
    { id: 1, teamId: 11, name: 'Pedro' },
    { id: 2, teamId: 11, name: 'Luis' },
    { id: 3, teamId: 12, name: 'Marco' },
  ],
  standings: [
    { teamId: 11, points: 10 },
    { teamId: 12, points: 3 },
  ],
};

const renderTeams = () =>
  render(
    <MemoryRouter>
      <LeaguesContext.Provider value={value}>
        <FollowProvider>
          <Teams />
        </FollowProvider>
      </LeaguesContext.Provider>
    </MemoryRouter>
  );

describe('Teams page', () => {
  it('renders a card for every team with player count and points', () => {
    renderTeams();

    expect(screen.getByRole('link', { name: 'Ashland FC' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Medford United' })).toBeInTheDocument();
    expect(screen.getByText('2 players · 10 pts')).toBeInTheDocument();
  });

  it('filters teams as the user types in the search box', async () => {
    const user = userEvent.setup();
    renderTeams();

    await user.type(screen.getByLabelText('Search teams'), 'medford');

    expect(screen.getByRole('link', { name: 'Medford United' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Ashland FC' })).not.toBeInTheDocument();
  });

  it('shows an empty message when nothing matches', async () => {
    const user = userEvent.setup();
    renderTeams();

    await user.type(screen.getByLabelText('Search teams'), 'zzz');

    expect(screen.getByText(/No teams match/)).toBeInTheDocument();
  });
});
