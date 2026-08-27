import { Link } from 'react-router';
import { PageContentSurface, PageSection, PageTitle } from '../../components/design-system';
import ReleaseCard from '../../components/molecules/ReleaseCard';
import MainLayout from '../../templates/MainLayout';
import type { ReleaseContent } from '../../types/content';
import { releaseDescription, releaseStructuredData, SITE_URL } from '../../lib/seo';

interface ReleaseDetailProps {
  release?: ReleaseContent;
}

export default function ReleaseDetail({ release }: ReleaseDetailProps) {
  if (!release) {
    return (
      <MainLayout>
        <PageTitle>Release not found</PageTitle>
        <PageContentSurface>
          <Link to="/releases" className="text-[var(--shell-accent-hover)] underline underline-offset-4">
            Return to releases
          </Link>
        </PageContentSurface>
      </MainLayout>
    );
  }

  const canonicalUrl = `${SITE_URL}/releases/${release.id}`;
  return (
    <MainLayout>
      <link rel="canonical" href={canonicalUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(releaseStructuredData(release)) }}
      />
      <PageTitle eyebrow={`${release.type} · ${release.year}`}>{release.title}</PageTitle>
      <PageContentSurface aria-label={`${release.title} release details`}>
        <PageSection title="Listen">
          <div className="grid items-start gap-10 md:grid-cols-2">
            <ReleaseCard {...release} featured />
            <div className="space-y-6 text-[var(--shell-muted-light)]">
              <p className="text-lg leading-relaxed">{releaseDescription(release)}</p>
              <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 border-t border-white/10 pt-6">
                <dt className="font-semibold uppercase tracking-wider text-[var(--shell-muted)]">Format</dt>
                <dd>{release.type}</dd>
                <dt className="font-semibold uppercase tracking-wider text-[var(--shell-muted)]">Year</dt>
                <dd>{release.year}</dd>
              </dl>
              <Link to="/releases" className="inline-flex text-[var(--shell-accent-hover)] underline underline-offset-4">
                View all releases
              </Link>
            </div>
          </div>
        </PageSection>
      </PageContentSurface>
    </MainLayout>
  );
}
