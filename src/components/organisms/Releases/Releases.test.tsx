import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Releases from './Releases';

describe('Releases', () => {
  it('renders the release grid', () => {
    render(<Releases releases={[{ id: 'one', title: 'One', type: 'Single', year: '2026', cover: '/one.webp', links: {} }]} />);
    expect(screen.getByRole('heading', { name: 'Releases' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'One' })).toBeInTheDocument();
  });
});
