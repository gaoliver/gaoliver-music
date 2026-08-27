import { PageContentSurface, PageTitle, Timeline } from '../../components/design-system';
import { timelineContent } from '../../data';
import MainLayout from '../../templates/MainLayout';

export default function AboutTimelinePage() {
  const timelineItems = timelineContent.entries.map((entry) => ({
    year: entry.year,
    title: entry.title,
    children: entry.description,
  }));

  return (
    <MainLayout>
      <PageTitle>{timelineContent.title}</PageTitle>
      <PageContentSurface aria-label="G.A. Oliver timeline">
        <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-[var(--shell-muted-light)]">
          {timelineContent.description}
        </p>
        <Timeline items={timelineItems} />
      </PageContentSurface>
    </MainLayout>
  );
}
