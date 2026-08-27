import { PageContentSurface, PageTitle } from '../../components/design-system';
import { showsContent } from '../../data';
import MainLayout from '../../templates/MainLayout';

export default function ShowsPage() {
  return (
    <MainLayout>
      <PageTitle>{showsContent.title}</PageTitle>
      <PageContentSurface aria-label="Live shows">
        <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-[var(--shell-muted-light)]">
          {showsContent.description}
        </p>
        {showsContent.shows.length === 0 ? (
          <p className="text-center text-[var(--shell-muted)]">{showsContent.emptyMessage}</p>
        ) : (
          <ul className="divide-y divide-white/10">
            {showsContent.shows.map((show) => (
              <li key={show.id} className="flex flex-wrap items-baseline justify-between gap-4 py-5">
                <span>{show.date}</span>
                <span>
                  {show.venue}, {show.city}
                </span>
                {show.ticketUrl && (
                  <a
                    href={show.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--shell-accent-hover)] underline underline-offset-4"
                  >
                    Tickets
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </PageContentSurface>
    </MainLayout>
  );
}
