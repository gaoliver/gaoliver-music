import AboutOrganism from '../../components/organisms/About';
import { PageContentSurface, PageTitle } from '../../components/design-system';
import { aboutContent } from '../../data';
import MainLayout from '../../templates/MainLayout';

export default function AboutPage() {
  return (
    <MainLayout>
      <PageTitle>About</PageTitle>
      <PageContentSurface aria-label="About G.A. Oliver">
        <AboutOrganism {...aboutContent} />
      </PageContentSurface>
    </MainLayout>
  );
}
