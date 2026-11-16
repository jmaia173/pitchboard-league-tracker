import { useContext } from 'react';
import { FollowContext } from './FollowContext';

export function useFollow() {
  const ctx = useContext(FollowContext);
  if (!ctx) throw new Error('useFollow must be used inside FollowProvider');
  return ctx;
}
