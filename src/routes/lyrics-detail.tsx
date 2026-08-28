import type { MetaFunction } from 'react-router';
import { albumCatalog } from '../data';
import { findSong } from '../lib/discography';
import { pageMeta } from '../lib/seo';
import LyricsDetail from '../pages/LyricsDetail';

export const meta: MetaFunction = ({ params }) => {
  const match = findSong(albumCatalog, params.slug);
  if (!match) return [{ title: 'Lyrics not found | G.A. Oliver' }, { name: 'robots', content: 'noindex, nofollow' }];
  const { song } = match;
  const base = pageMeta(`${song.title} lyrics | G.A. Oliver`, `Lyrics to ${song.title} by G.A. Oliver.`, `/lyrics/${song.id}`);
  return song.lyricsDraft ? [...base, { name: 'robots', content: 'noindex' }] : base;
};

export default function LyricsDetailRoute({ params }: { params: { slug?: string } }) {
  return <LyricsDetail match={findSong(albumCatalog, params.slug)} />;
}
