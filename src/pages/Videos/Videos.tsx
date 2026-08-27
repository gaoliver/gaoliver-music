import { PageContentSurface, PageTitle } from '../../components/design-system';
import { releaseCatalog } from '../../data';
import MainLayout from '../../templates/MainLayout';

export default function VideosPage() {
  const videos = releaseCatalog.releases.filter((release) => release.videoId);

  return (
    <MainLayout>
      <PageTitle>Videos</PageTitle>
      <PageContentSurface aria-label="G.A. Oliver videos">
        {videos.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {videos.map((release) => (
              <figure key={release.id}>
                <div className="relative aspect-video overflow-hidden bg-black">
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
                <figcaption className="pt-4">
                  <p className="text-lg font-bold uppercase text-white">{release.title}</p>
                  <p className="text-sm text-[var(--shell-muted)]">
                    {release.type} — {release.year}
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
