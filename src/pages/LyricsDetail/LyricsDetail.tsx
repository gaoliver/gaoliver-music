import { Link } from 'react-router';
import { PageContentSurface, PageTitle } from '../../components/design-system';
import MainLayout from '../../templates/MainLayout';
import StreamingButtons from '../../components/molecules/StreamingButtons';
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
      <PageTitle>{release.title}</PageTitle>
      <PageContentSurface aria-label={`${release.title} lyrics`}>
        {/* Metadata row, full width */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-3">
          {/* Release */}
          <div>
            <p className="text-[13px] font-bold uppercase text-[var(--shell-muted)]">Release</p>
            <p className="text-[1.3rem] font-bold text-[var(--shell-text)]">{release.year}</p>
          </div>

          {/* Album */}
          <div>
            <p className="text-[13px] font-bold uppercase text-[var(--shell-muted)]">Album</p>
            <Link
              to={`/releases/${release.id}`}
              className="text-[1.3rem] font-bold text-[var(--shell-text)] underline underline-offset-4 hover:text-brand-accentHover"
            >
              {release.title}
            </Link>
          </div>
        </div>

        <hr className="my-12 border-white/15" />

        {/* Two-column band: lyrics on left, video + streaming buttons on right */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            {/* Lyrics heading */}
            <h2 className="mb-6 text-[2rem] font-bold uppercase text-[var(--shell-muted)]">Lyrics:</h2>

            {/* Stanzas */}
            <div className="space-y-8">
              {(release.lyrics ?? []).map((block, index) => (
                <p
                  key={index}
                  className="whitespace-pre-line text-[1.75rem] leading-snug text-[var(--shell-text)]"
                >
                  {block}
                </p>
              ))}
            </div>

            {/* All lyrics link */}
            <p className="mt-12">
              <Link
                to="/lyrics"
                className="text-base uppercase text-[var(--shell-muted)] transition-colors hover:text-brand-accentHover"
              >
                All lyrics
              </Link>
            </p>
          </div>

          <aside className="space-y-4">
            {release.videoId && (
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${release.videoId}`}
                  title={release.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            )}
            <StreamingButtons links={release.links} />
          </aside>
        </div>
      </PageContentSurface>
    </MainLayout>
  );
}
