import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FollowProvider } from '../contexts/FollowProvider';
import FollowButton from '../components/FollowButton';

const renderButton = () =>
  render(
    <FollowProvider>
      <FollowButton teamId={11} teamName="Ashland FC" />
    </FollowProvider>
  );

describe('FollowContext + FollowButton', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts as "Follow" and toggles to "Following" on click', async () => {
    const user = userEvent.setup();
    renderButton();

    const button = screen.getByRole('button', { name: 'Follow Ashland FC' });
    expect(button).toHaveAttribute('aria-pressed', 'false');

    await user.click(button);

    expect(screen.getByRole('button', { name: 'Unfollow Ashland FC' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Following')).toBeInTheDocument();
  });

  it('unfollows when clicked a second time', async () => {
    const user = userEvent.setup();
    renderButton();

    await user.click(screen.getByRole('button', { name: 'Follow Ashland FC' }));
    await user.click(screen.getByRole('button', { name: 'Unfollow Ashland FC' }));

    expect(screen.getByRole('button', { name: 'Follow Ashland FC' })).toBeInTheDocument();
  });

  it('saves followed team ids to localStorage', async () => {
    const user = userEvent.setup();
    renderButton();

    await user.click(screen.getByRole('button', { name: 'Follow Ashland FC' }));

    expect(JSON.parse(localStorage.getItem('pitchboard-followed-teams'))).toEqual([11]);
  });

  it('restores followed teams from localStorage', () => {
    localStorage.setItem('pitchboard-followed-teams', JSON.stringify([11]));
    renderButton();

    expect(screen.getByRole('button', { name: 'Unfollow Ashland FC' })).toBeInTheDocument();
  });
});
