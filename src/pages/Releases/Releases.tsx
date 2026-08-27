import { PageContentSurface, PageTitle } from '../../components/design-system';
import ReleasesOrganism from '../../components/organisms/Releases';
import { releaseCatalog } from '../../data';
import MainLayout from '../../templates/MainLayout';

export default function ReleasesPage() {
  return (
    <MainLayout>
      <PageTitle>{releaseCatalog.title}</PageTitle>
      <PageContentSurface aria-label="Release catalog">
        <ReleasesOrganism releases={releaseCatalog.releases} detailBasePath="/releases" />
      </PageContentSurface>
    </MainLayout>
  );
}
