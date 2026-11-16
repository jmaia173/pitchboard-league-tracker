import { describe, expect, it } from 'vitest';
import { computeStandings } from '../utils/standings';

const teams = [
  { id: 1, name: 'Alpha FC' },
  { id: 2, name: 'Beta United' },
  { id: 3, name: 'Gamma SC' },
];
const TODAY = '2026-12-31';

const game = (id, date, homeTeamId, awayTeamId, homeScore, awayScore) => ({
  id, date, homeTeamId, awayTeamId, homeScore, awayScore,
});

describe('computeStandings', () => {
  it('awards 3 points for a win and 0 for a loss', () => {
    const rows = computeStandings(teams, [game(1, '2026-01-01', 1, 2, 3, 1)], TODAY);
    const alpha = rows.find((r) => r.teamId === 1);
    const beta = rows.find((r) => r.teamId === 2);

    expect(alpha).toMatchObject({ played: 1, won: 1, points: 3, goalDiff: 2 });
    expect(beta).toMatchObject({ played: 1, lost: 1, points: 0, goalDiff: -2 });
  });

  it('awards 1 point each for a draw', () => {
    const rows = computeStandings(teams, [game(1, '2026-01-01', 1, 2, 2, 2)], TODAY);

    expect(rows.find((r) => r.teamId === 1)).toMatchObject({ drawn: 1, points: 1 });
    expect(rows.find((r) => r.teamId === 2)).toMatchObject({ drawn: 1, points: 1 });
  });

  it('ignores games dated after today', () => {
    const rows = computeStandings(teams, [game(1, '2099-01-01', 1, 2, 5, 0)], TODAY);

    expect(rows.every((r) => r.played === 0 && r.points === 0)).toBe(true);
  });

  it('sorts by points, then goal difference', () => {
    const games = [
      game(1, '2026-01-01', 1, 3, 1, 0),
      game(2, '2026-01-02', 2, 3, 4, 0),
    ];
    const rows = computeStandings(teams, games, TODAY);

    expect(rows.map((r) => r.name)).toEqual(['Beta United', 'Alpha FC', 'Gamma SC']);
  });

  it('returns a zeroed row for every team when there are no games', () => {
    const rows = computeStandings(teams, [], TODAY);

    expect(rows).toHaveLength(3);
    expect(rows.every((r) => r.points === 0)).toBe(true);
  });
});
