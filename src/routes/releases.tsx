import type { MetaFunction } from 'react-router';
import Releases from '../pages/Releases';
import { pageMeta } from '../lib/seo';

export const meta: MetaFunction = () =>
  pageMeta(
    'Discography | G.A. Oliver',
    'Explore the official music catalog from G.A. Oliver.',
    '/releases',
  );

export default Releases;
