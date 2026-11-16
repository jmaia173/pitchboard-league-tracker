import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { LeaguesContext } from './LeaguesContext';
import { initialState, leaguesReducer } from './leaguesReducer';
import { getGames, getPlayers, getTeams } from '../services/api';
import { computeStandings } from '../utils/standings';

export function LeaguesProvider({ children }) {
  const [state, dispatch] = useReducer(leaguesReducer, initialState);

  const loadData = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const [teams, players, games] = await Promise.all([
        getTeams(),
        getPlayers(),
        getGames(),
      ]);
      dispatch({ type: 'FETCH_SUCCESS', payload: { teams, players, games } });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const standings = useMemo(
    () => computeStandings(state.teams, state.games),
    [state.teams, state.games]
  );

  const value = useMemo(
    () => ({ ...state, standings, dispatch, reload: loadData }),
    [state, standings, loadData]
  );

  return (
    <LeaguesContext.Provider value={value}>{children}</LeaguesContext.Provider>
  );
}
