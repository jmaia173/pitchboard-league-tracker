const KEY = import.meta.env.VITE_SPORTSDB_KEY;
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${KEY}`;

export async function searchTeams(name) {
  const res = await fetch(
    `${BASE_URL}/searchteams.php?t=${encodeURIComponent(name)}`
  );
  if (!res.ok) {
    throw new Error(`TheSportsDB request failed (${res.status})`);
  }
  const data = await res.json();
  return data.teams ?? [];
}
