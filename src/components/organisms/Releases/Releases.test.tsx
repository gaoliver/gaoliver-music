import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Releases from './Releases';

const albums = [{ id: 'one', title: 'One', type: 'Single', year: '2026', cover: '/one.webp', links: {} }];

describe('Releases', () => {
  it('renders the album grid with an optional section heading', () => {
    render(<Releases albums={albums} title="Releases" />);
    expect(screen.getByRole('heading', { name: 'Releases' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'One' })).toBeInTheDocument();
  });

  it('omits the section heading when no title is supplied', () => {
    render(<Releases albums={albums} />);
    expect(screen.queryByRole('heading', { name: 'Releases' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'One' })).toBeInTheDocument();
  });
});
