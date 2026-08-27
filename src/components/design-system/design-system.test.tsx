import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  FeaturedTile,
  FeaturedTileGrid,
  PageContentSurface,
  PageSection,
  PageTitle,
  Timeline,
} from '.';

describe('editorial design system', () => {
  it('provides one route title and semantic content sections', () => {
    render(
      <>
        <PageTitle eyebrow="Official">About</PageTitle>
        <PageContentSurface aria-label="About content">
          <PageSection title="Story"><p>Real supplied content</p></PageSection>
        </PageContentSurface>
      </>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'About content' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Story' })).toBeInTheDocument();
  });

  it('renders linked editorial tiles and ordered timeline entries', () => {
    render(
      <>
        <FeaturedTileGrid>
          <FeaturedTile image="/cover.webp" imageAlt="Release cover" title="Night Divine" href="/releases/night-divine" />
        </FeaturedTileGrid>
        <Timeline items={[{ year: '2025', title: 'Milestone', children: 'Description' }]} />
      </>,
    );

    expect(screen.getByRole('link', { name: /Night Divine/ })).toHaveAttribute('href', '/releases/night-divine');
    expect(screen.getByRole('list')).toHaveTextContent('2025');
  });
});
