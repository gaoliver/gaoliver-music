import { PageContentSurface, PageTitle } from '../../components/design-system';
import AboutOrganism from '../../components/organisms/About';
import { aboutContent } from '../../data';
import MainLayout from '../../templates/MainLayout';

export default function AboutStoryPage() {
  return (
    <MainLayout>
      <PageTitle>Story</PageTitle>
      <PageContentSurface aria-label="G.A. Oliver story">
        <AboutOrganism
          description={aboutContent.description}
          details={aboutContent.details}
          image={aboutContent.image}
          lightContent={aboutContent.lightContent}
        />
      </PageContentSurface>
    </MainLayout>
  );
}
