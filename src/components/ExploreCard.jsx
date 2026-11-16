export default function ExploreCard({ team }) {
  const badge = team.strBadge || team.strTeamBadge;

  return (
    <article className="card explore-card">
      {badge && (
        <img
          src={badge}
          alt={`${team.strTeam} badge`}
          width="64"
          height="64"
          loading="lazy"
        />
      )}
      <h2>{team.strTeam}</h2>
      <p className="muted">
        {[team.strLeague, team.strCountry].filter(Boolean).join(' · ')}
      </p>
      {team.strStadium && <p>Stadium: {team.strStadium}</p>}
    </article>
  );
}
