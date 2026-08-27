import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ReleaseCard from './ReleaseCard';

const base = { title: 'Night Divine', type: 'EP', year: '2025', cover: '/cover.webp', links: {} };

describe('ReleaseCard', () => {
  it('renders regular and featured variants with available links', () => {
    const links = { spotify: 'https://spotify.test', appleMusic: 'https://apple.test', youtube: 'https://youtube.test', other: 'https://other.test' };
    const { rerender } = render(<ReleaseCard {...base} links={links} />);
    expect(screen.getByRole('heading', { name: base.title })).toBeInTheDocument();
    expect(screen.getByLabelText('Listen on Spotify')).toBeInTheDocument();
    rerender(<ReleaseCard {...base} featured links={links} />);
    expect(screen.getByText(/New Release/)).toBeInTheDocument();
  });

  it('renders long titles and omits missing streaming links', () => {
    const title = 'A very long release title that remains readable on narrow screens';
    render(<ReleaseCard {...base} title={title} />);
    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    expect(screen.queryByLabelText('Listen on Spotify')).not.toBeInTheDocument();
  });
});
