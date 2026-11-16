import { useEffect, useMemo, useState } from 'react';
import { FollowContext } from './FollowContext';

const STORAGE_KEY = 'pitchboard-followed-teams';

function loadFollowed() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function FollowProvider({ children }) {
  const [followedIds, setFollowedIds] = useState(loadFollowed);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(followedIds));
    } catch {
      // storage unavailable; keep working in memory
    }
  }, [followedIds]);

  const value = useMemo(
    () => ({
      followedIds,
      isFollowing: (id) => followedIds.includes(id),
      toggleFollow: (id) =>
        setFollowedIds((prev) =>
          prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        ),
    }),
    [followedIds]
  );

  return (
    <FollowContext.Provider value={value}>{children}</FollowContext.Provider>
  );
}
