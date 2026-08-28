import { PageContentSurface, PageTitle } from '../../components/design-system';
import { albumCatalog } from '../../data';
import { allSongs } from '../../lib/discography';
import MainLayout from '../../templates/MainLayout';

export default function VideosPage() {
  const videos = allSongs(albumCatalog).filter(({ song }) => song.videoId);

  return (
    <MainLayout>
      <PageTitle>Videos</PageTitle>
      <PageContentSurface aria-label="G.A. Oliver videos">
        {videos.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {videos.map(({ song, album }) => (
              <figure key={song.id}>
                <div className="relative aspect-video overflow-hidden bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${song.videoId}`}
                    title={song.title}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <figcaption className="pt-4">
                  <p className="text-lg font-bold uppercase text-white">{song.title}</p>
                  <p className="text-sm text-[var(--shell-muted)]">
                    {album.type} — {album.year}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className="text-[var(--shell-muted-light)]">No videos yet.</p>
        )}
      </PageContentSurface>
    </MainLayout>
  );
}
