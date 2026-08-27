import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Hero from './Hero';

const props = { title: 'Title', subtitle: 'Subtitle', ctaPrimary: { label: 'Listen', url: '#listen', isActive: true }, ctaSecondary: { label: 'Contact', url: '#contact', isActive: false } };

describe('Hero', () => {
  it('renders safely without a featured release', () => {
    render(<Hero {...props} />);
    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
    expect(screen.queryByText(/New Release/)).not.toBeInTheDocument();
  });
});
