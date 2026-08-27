import AboutOrganism from '../../components/organisms/About';
import { PageContentSurface, PageTitle } from '../../components/design-system';
import { aboutContent } from '../../data';
import MainLayout from '../../templates/MainLayout';

export default function AboutPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title: _title, ...aboutWithoutTitle } = aboutContent;
  return (
    <MainLayout>
      <PageTitle>About</PageTitle>
      <PageContentSurface aria-label="About G.A. Oliver">
        <AboutOrganism {...aboutWithoutTitle} />
      </PageContentSurface>
    </MainLayout>
  );
}
