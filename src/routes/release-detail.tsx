import type { MetaFunction } from 'react-router';
import { releaseCatalog } from '../data';
import { releaseMeta } from '../lib/seo';
import ReleaseDetail from '../pages/ReleaseDetail';

function findRelease(slug: string | undefined) {
  return releaseCatalog.releases.find((release) => release.id === slug);
}

export const meta: MetaFunction = ({ params }) => {
  const release = findRelease(params.slug);
  return release
    ? releaseMeta(release)
    : [{ title: 'Release not found | G.A. Oliver' }, { name: 'robots', content: 'noindex, nofollow' }];
};

export default function ReleaseDetailRoute({ params }: { params: { slug?: string } }) {
  return <ReleaseDetail release={findRelease(params.slug)} />;
}
