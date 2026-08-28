import type { MetaFunction } from 'react-router';
import { albumCatalog } from '../data';
import { findAlbum } from '../lib/discography';
import { albumMeta } from '../lib/seo';
import ReleaseDetail from '../pages/ReleaseDetail';

export const meta: MetaFunction = ({ params }) => {
  const album = findAlbum(albumCatalog, params.slug);
  return album
    ? albumMeta(album)
    : [{ title: 'Release not found | G.A. Oliver' }, { name: 'robots', content: 'noindex, nofollow' }];
};

export default function ReleaseDetailRoute({ params }: { params: { slug?: string } }) {
  return <ReleaseDetail album={findAlbum(albumCatalog, params.slug)} />;
}
