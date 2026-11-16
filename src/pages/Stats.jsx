import { useLeagues } from '../contexts/useLeagues';
import StatList from '../components/StatList';
import { topAssists, topScorers } from '../utils/stats';

export default function Stats() {
  const { players } = useLeagues();

  return (
    <div>
      <h1>Player Stats</h1>
      <div className="grid">
        <StatList
          title="Top scorers"
          players={topScorers(players, 5)}
          statKey="goals"
          emptyText="No goals recorded yet."
        />
        <StatList
          title="Top assists"
          players={topAssists(players, 5)}
          statKey="assists"
          emptyText="No assists recorded yet."
        />
      </div>
    </div>
  );
}
