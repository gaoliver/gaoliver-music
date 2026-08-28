import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import MainLayout from './MainLayout';
import { siteContent } from '../../data';

function getBackdropImageSrc(container: HTMLElement): string | null {
  return container.querySelector('.background-media__image')?.getAttribute('src') ?? null;
}

describe('MainLayout backdrop', () => {
  it('falls back to the shared site backdrop when no route-specific image is given', () => {
    const { container } = render(
      <MemoryRouter>
        <MainLayout>content</MainLayout>
      </MemoryRouter>,
    );
    expect(getBackdropImageSrc(container)).toBe(siteContent.backgroundImage);
  });

  it('falls back to the shared site backdrop when background.image is blank', () => {
    const { container } = render(
      <MemoryRouter>
        <MainLayout background={{ image: undefined, video: '/videos/example.mp4' }}>content</MainLayout>
      </MemoryRouter>,
    );
    expect(getBackdropImageSrc(container)).toBe(siteContent.backgroundImage);
  });

  it('uses a route-specific image when one is provided', () => {
    const { container } = render(
      <MemoryRouter>
        <MainLayout background={{ image: '/images/custom-hero.webp' }}>content</MainLayout>
      </MemoryRouter>,
    );
    expect(getBackdropImageSrc(container)).toBe('/images/custom-hero.webp');
  });
});
