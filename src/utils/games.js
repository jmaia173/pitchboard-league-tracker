export const todayISO = () => new Date().toISOString().slice(0, 10);

export const isPlayed = (game, today = todayISO()) => game.date <= today;

export const sortGamesDesc = (games) =>
  [...games].sort((a, b) => b.date.localeCompare(a.date));

export const sortGamesAsc = (games) =>
  [...games].sort((a, b) => a.date.localeCompare(b.date));

export const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
