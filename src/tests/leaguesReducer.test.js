import { describe, expect, it } from 'vitest';
import { initialState, leaguesReducer } from '../contexts/leaguesReducer';

describe('leaguesReducer', () => {
  it('FETCH_START sets loading and clears the error', () => {
    const state = leaguesReducer(
      { ...initialState, loading: false, error: 'old' },
      { type: 'FETCH_START' }
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('FETCH_SUCCESS stores data and stops loading', () => {
    const payload = { teams: [{ id: 1 }], players: [{ id: 2 }], games: [{ id: 3 }] };
    const state = leaguesReducer(initialState, { type: 'FETCH_SUCCESS', payload });

    expect(state.loading).toBe(false);
    expect(state.teams).toEqual(payload.teams);
    expect(state.players).toEqual(payload.players);
    expect(state.games).toEqual(payload.games);
  });

  it('FETCH_ERROR stores the message and stops loading', () => {
    const state = leaguesReducer(initialState, { type: 'FETCH_ERROR', payload: 'boom' });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('boom');
  });

  it('UPDATE_GAME changes only the matching game without mutating state', () => {
    const before = {
      ...initialState,
      games: [
        { id: 1, homeScore: 0, awayScore: 0 },
        { id: 2, homeScore: 1, awayScore: 1 },
      ],
    };
    const snapshot = JSON.parse(JSON.stringify(before));

    const after = leaguesReducer(before, {
      type: 'UPDATE_GAME',
      payload: { id: 1, homeScore: 3, awayScore: 2 },
    });

    expect(after.games[0]).toMatchObject({ homeScore: 3, awayScore: 2 });
    expect(after.games[1]).toEqual(before.games[1]);
    expect(before).toEqual(snapshot);
    expect(after).not.toBe(before);
  });
});
