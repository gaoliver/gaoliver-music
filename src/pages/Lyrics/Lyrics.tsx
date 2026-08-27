import { Link } from 'react-router';
import { PageContentSurface, PageTitle } from '../../components/design-system';
import { releaseCatalog } from '../../data';
import MainLayout from '../../templates/MainLayout';

export default function LyricsPage() {
  const songs = releaseCatalog.releases.filter((release) => release.lyrics && release.lyrics.length > 0);

  return (
    <MainLayout>
      <PageTitle>Lyrics</PageTitle>
      <PageContentSurface aria-label="Song lyrics">
        {songs.length === 0 ? (
          <p className="text-[var(--shell-muted-light)]">No lyrics yet.</p>
        ) : (
          <ul className="divide-y divide-white/10">
            {songs.map((release) => (
              <li key={release.id}>
                <Link
                  to={`/lyrics/${release.id}`}
                  className="flex items-baseline justify-between gap-6 py-5 transition-colors hover:text-brand-accentHover"
                >
                  <span className="text-lg font-bold uppercase text-white">{release.title}</span>
                  <span className="shrink-0 text-sm text-[var(--shell-muted)]">
                    {release.type} — {release.year}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </PageContentSurface>
    </MainLayout>
  );
}
