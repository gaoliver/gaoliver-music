import type { MetaFunction } from 'react-router';
import { releaseCatalog } from '../data';
import { pageMeta } from '../lib/seo';
import LyricsDetail from '../pages/LyricsDetail';

function findRelease(slug: string | undefined) {
  return releaseCatalog.releases.find((release) => release.id === slug);
}

export const meta: MetaFunction = ({ params }) => {
  const release = findRelease(params.slug);
  if (!release) return [{ title: 'Lyrics not found | G.A. Oliver' }, { name: 'robots', content: 'noindex, nofollow' }];
  const base = pageMeta(`${release.title} lyrics | G.A. Oliver`, `Lyrics to ${release.title} by G.A. Oliver.`, `/lyrics/${release.id}`);
  return release.lyricsDraft ? [...base, { name: 'robots', content: 'noindex' }] : base;
};

export default function LyricsDetailRoute({ params }: { params: { slug?: string } }) {
  return <LyricsDetail release={findRelease(params.slug)} />;
}
