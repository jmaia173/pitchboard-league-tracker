export const initialState = {
  teams: [],
  players: [],
  games: [],
  loading: true,
  error: null,
};

export function leaguesReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        teams: action.payload.teams,
        players: action.payload.players,
        games: action.payload.games,
      };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_GAME':
      return {
        ...state,
        games: state.games.map((g) =>
          g.id === action.payload.id ? { ...g, ...action.payload } : g
        ),
      };
    default:
      return state;
  }
}
