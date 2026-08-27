import type { MetaFunction } from 'react-router';
import Lyrics from '../pages/Lyrics';
import { pageMeta } from '../lib/seo';

export const meta: MetaFunction = () =>
  pageMeta('Lyrics | G.A. Oliver', 'Lyrics to the songs of G.A. Oliver.', '/lyrics');

export default Lyrics;
