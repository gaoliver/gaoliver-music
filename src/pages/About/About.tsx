import { PageContentSurface, PageTitle, FeaturedTile, FeaturedTileGrid } from '../../components/design-system';
import { aboutContent } from '../../data';
import MainLayout from '../../templates/MainLayout';

export default function AboutPage() {
  return (
    <MainLayout>
      <PageTitle>About</PageTitle>
      <PageContentSurface aria-label="About G.A. Oliver">
        <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-[var(--shell-muted-light)]">
          {aboutContent.summary}
        </p>
        <FeaturedTileGrid>
          <FeaturedTile
            title="Story"
            href="/about/story"
            image={aboutContent.image}
            imageAlt=""
            description="The journey behind the music"
          />
          <FeaturedTile
            title="Timeline"
            href="/about/timeline"
            image={aboutContent.backgroundImage ?? aboutContent.image}
            imageAlt=""
            description="Releases and milestones"
          />
        </FeaturedTileGrid>
      </PageContentSurface>
    </MainLayout>
  );
}
