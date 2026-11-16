import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StandingsTable from '../components/StandingsTable';

const rows = [
  { teamId: 1, name: 'Alpha FC', played: 2, won: 2, drawn: 0, lost: 0, goalDiff: 5, points: 6 },
  { teamId: 2, name: 'Beta United', played: 2, won: 0, drawn: 0, lost: 2, goalDiff: -5, points: 0 },
];

describe('StandingsTable', () => {
  it('renders one row per team with rank and points', () => {
    render(
      <MemoryRouter>
        <StandingsTable rows={rows} />
      </MemoryRouter>
    );

    const bodyRows = screen.getAllByRole('row').slice(1);
    expect(bodyRows).toHaveLength(2);
    expect(within(bodyRows[0]).getByRole('link', { name: 'Alpha FC' })).toBeInTheDocument();
    expect(within(bodyRows[0]).getByText('6')).toBeInTheDocument();
    expect(within(bodyRows[1]).getByText('Beta United')).toBeInTheDocument();
  });
});
