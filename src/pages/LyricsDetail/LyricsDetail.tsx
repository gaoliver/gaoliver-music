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
      <PageTitle>{release.title}</PageTitle>
      <PageContentSurface aria-label={`${release.title} lyrics`}>
        {/* Two-column layout: metadata on left, video on right */}
        <div className="mb-12 grid gap-10 md:grid-cols-[1fr_auto]">
          {/* Left: Metadata grid */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-6 self-start sm:grid-cols-3">
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

          {/* Right: Video and Spotify link */}
          {release.videoId && (
            <div>
              <div className="relative aspect-video w-full overflow-hidden bg-black md:w-[340px]">
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
              {release.links.spotify && (
                <a
                  href={release.links.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-base uppercase text-[var(--shell-muted)] transition-colors hover:text-brand-accentHover"
                >
                  Listen on Spotify
                </a>
              )}
            </div>
          )}
        </div>

        {/* Horizontal rule */}
        <hr className="my-12 border-white/15" />

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
      </PageContentSurface>
    </MainLayout>
  );
}
