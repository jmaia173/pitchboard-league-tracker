import { describe, expect, it } from 'vitest';
import { topAssists, topScorers } from '../utils/stats';

const players = [
  { id: 1, name: 'Ana', goals: 5, assists: 1 },
  { id: 2, name: 'Bruno', goals: 8, assists: 0 },
  { id: 3, name: 'Caio', goals: 0, assists: 4 },
];

describe('player stat helpers', () => {
  it('ranks top scorers by goals and drops players with none', () => {
    expect(topScorers(players).map((p) => p.name)).toEqual(['Bruno', 'Ana']);
  });

  it('ranks top assists and drops players with none', () => {
    expect(topAssists(players).map((p) => p.name)).toEqual(['Caio', 'Ana']);
  });

  it('respects the limit and does not mutate the input', () => {
    const copy = [...players];
    expect(topScorers(players, 1)).toHaveLength(1);
    expect(players).toEqual(copy);
  });
});
