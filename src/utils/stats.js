export function topScorers(players, limit = 5) {
  return [...players]
    .filter((p) => (p.goals ?? 0) > 0)
    .sort((a, b) => b.goals - a.goals || a.name.localeCompare(b.name))
    .slice(0, limit);
}

export function topAssists(players, limit = 5) {
  return [...players]
    .filter((p) => (p.assists ?? 0) > 0)
    .sort((a, b) => b.assists - a.assists || a.name.localeCompare(b.name))
    .slice(0, limit);
}
