import { Link } from "react-router";
import { PageContentSurface, PageTitle } from "../../components/design-system";
import ReleaseCard from "../../components/molecules/ReleaseCard";
import MainLayout from "../../templates/MainLayout";
import type { AlbumContent } from "../../types/content";
import { albumVideoId } from "../../lib/discography";
import { albumDescription, albumStructuredData, SITE_URL } from "../../lib/seo";

interface ReleaseDetailProps {
  album?: AlbumContent;
}

export default function ReleaseDetail({ album }: ReleaseDetailProps) {
  if (!album) {
    return (
      <MainLayout>
        <PageTitle>Release not found</PageTitle>
        <PageContentSurface>
          <Link
            to="/releases"
            className="text-[var(--shell-accent-hover)] underline underline-offset-4"
          >
            Return to releases
          </Link>
        </PageContentSurface>
      </MainLayout>
    );
  }

  const canonicalUrl = `${SITE_URL}/releases/${album.id}`;
  return (
    <MainLayout>
      <link rel="canonical" href={canonicalUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(albumStructuredData(album)),
        }}
      />
      <PageTitle eyebrow={`${album.type} · ${album.year}`}>
        {album.title}
      </PageTitle>
      <PageContentSurface aria-label={`${album.title} release details`}>
        <div className="grid items-start gap-10 md:grid-cols-2">
          <ReleaseCard
            title={album.title}
            type={album.type}
            year={album.year}
            cover={album.cover}
            links={album.links}
            videoId={albumVideoId(album)}
            featured
          />
          <div className="space-y-6 text-[var(--shell-muted-light)]">
            <p className="text-lg leading-relaxed">{albumDescription(album)}</p>
            <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 border-t border-white/10 pt-6">
              <dt className="font-semibold uppercase tracking-wider text-[var(--shell-muted)]">
                Format
              </dt>
              <dd>{album.type}</dd>
              <dt className="font-semibold uppercase tracking-wider text-[var(--shell-muted)]">
                Year
              </dt>
              <dd>{album.year}</dd>
            </dl>
            <div className="border-t border-white/10 pt-6">
              <h2 className="mb-3 font-semibold uppercase tracking-wider text-[var(--shell-muted)]">
                Tracklist
              </h2>
              <ol className="space-y-2">
                {album.songs?.map((song, index) => (
                  <li
                    key={song.id}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <span>
                      <span className="text-[var(--shell-muted)]">
                        {index + 1}.
                      </span>{" "}
                      {song.lyrics && song.lyrics.length > 0 ? (
                        <Link
                          to={`/lyrics/${song.id}`}
                          className="text-[var(--shell-accent-hover)] underline underline-offset-4"
                        >
                          {song.title}
                        </Link>
                      ) : (
                        song.title
                      )}
                    </span>
                    <span className="shrink-0 text-sm">{song.composer}</span>
                  </li>
                ))}
              </ol>
            </div>
            <Link
              to="/releases"
              className="inline-flex text-[var(--shell-accent-hover)] underline underline-offset-4"
            >
              View all releases
            </Link>
          </div>
        </div>
      </PageContentSurface>
    </MainLayout>
  );
}
