import { Link } from 'react-router';
import { PageContentSurface, PageTitle } from '../../components/design-system';
import MainLayout from '../../templates/MainLayout';
import type { ReleaseContent } from '../../types/content';

interface LyricsDetailProps {
  release?: ReleaseContent;
}

export default function LyricsDetail({ release }: LyricsDetailProps) {
  if (!release) {
    return (
      <MainLayout>
        <PageTitle>Lyrics not found</PageTitle>
        <PageContentSurface>
          <Link to="/lyrics" className="text-[var(--shell-accent-hover)] underline underline-offset-4">
            Return to lyrics
          </Link>
        </PageContentSurface>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageTitle eyebrow={`${release.type} · ${release.year}`}>{release.title}</PageTitle>
      <PageContentSurface aria-label={`${release.title} lyrics`}>
        <div className="mx-auto max-w-2xl space-y-8">
          {(release.lyrics ?? []).map((block, index) => (
            <p key={index} className="whitespace-pre-line text-lg leading-relaxed text-[var(--shell-muted-light)]">
              {block}
            </p>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-2xl">
          <Link to="/lyrics" className="text-[var(--shell-accent-hover)] underline underline-offset-4">
            All lyrics
          </Link>
        </p>
      </PageContentSurface>
    </MainLayout>
  );
}
