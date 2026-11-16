import { useFollow } from '../contexts/useFollow';

export default function FollowButton({ teamId, teamName }) {
  const { isFollowing, toggleFollow } = useFollow();
  const following = isFollowing(teamId);

  return (
    <button
      type="button"
      className={following ? 'btn active' : 'btn'}
      aria-pressed={following}
      aria-label={`${following ? 'Unfollow' : 'Follow'} ${teamName}`}
      onClick={() => toggleFollow(teamId)}
    >
      {following ? 'Following' : 'Follow'}
    </button>
  );
}
