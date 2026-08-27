import type { MetaFunction } from 'react-router';
import { PageContentSurface, PageTitle } from '../components/design-system';
import { homeContent } from '../data';
import MainLayout from '../templates/MainLayout';

export const meta: MetaFunction = () => [
  { title: 'Page not found | G.A. Oliver' },
  { name: 'robots', content: 'noindex, nofollow' },
];

export default function NotFoundRoute() {
  return (
    <MainLayout>
      <PageTitle backgroundImage={homeContent.hero.backgroundImage} backgroundImageAlt="">Page not found</PageTitle>
      <PageContentSurface>
        <p className="text-[var(--shell-muted-light)]">The page you requested does not exist.</p>
      </PageContentSurface>
    </MainLayout>
  );
}
