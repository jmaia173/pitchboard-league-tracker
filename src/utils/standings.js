const todayISO = () => new Date().toISOString().slice(0, 10);

export function computeStandings(teams, games, today = todayISO()) {
  const table = new Map(
    teams.map((t) => [
      t.id,
      {
        teamId: t.id,
        name: t.name,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDiff: 0,
        points: 0,
      },
    ])
  );

  games
    .filter((g) => g.date <= today)
    .forEach((g) => {
      const home = table.get(g.homeTeamId);
      const away = table.get(g.awayTeamId);
      if (!home || !away) return;

      home.played += 1;
      away.played += 1;
      home.goalsFor += g.homeScore;
      home.goalsAgainst += g.awayScore;
      away.goalsFor += g.awayScore;
      away.goalsAgainst += g.homeScore;

      if (g.homeScore > g.awayScore) {
        home.won += 1;
        home.points += 3;
        away.lost += 1;
      } else if (g.homeScore < g.awayScore) {
        away.won += 1;
        away.points += 3;
        home.lost += 1;
      } else {
        home.drawn += 1;
        away.drawn += 1;
        home.points += 1;
        away.points += 1;
      }
    });

  return [...table.values()]
    .map((row) => ({ ...row, goalDiff: row.goalsFor - row.goalsAgainst }))
    .sort(
      (a, b) =>
        b.points - a.points ||
        b.goalDiff - a.goalDiff ||
        b.goalsFor - a.goalsFor ||
        a.name.localeCompare(b.name)
    );
}
