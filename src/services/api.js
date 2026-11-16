const BASE_URL = import.meta.env.VITE_API_URL;

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export const getTeams = () => request('/teams');
export const getTeam = (id) => request(`/teams/${id}`);
export const getPlayers = () => request('/players');
export const getGames = () => request('/games');
