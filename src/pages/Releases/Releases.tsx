import { PageContentSurface, PageTitle } from '../../components/design-system';
import ReleasesOrganism from '../../components/organisms/Releases';
import { albumCatalog } from '../../data';
import MainLayout from '../../templates/MainLayout';

export default function ReleasesPage() {
  return (
    <MainLayout>
      <PageTitle>{albumCatalog.title}</PageTitle>
      <PageContentSurface aria-label="Release catalog">
        {/* The mobile menu is top level only, mirroring the reference, so the
            sibling Videos route is reached from here. */}
        <ReleasesOrganism
          albums={albumCatalog.albums}
          detailBasePath="/releases"
          viewAllCta={{ isActive: true, label: 'Videos »', url: '/videos' }}
        />
      </PageContentSurface>
    </MainLayout>
  );
}
