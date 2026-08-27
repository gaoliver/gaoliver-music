import type { MetaFunction } from 'react-router';
import Videos from '../pages/Videos';
import { pageMeta } from '../lib/seo';

export const meta: MetaFunction = () =>
  pageMeta('Videos | G.A. Oliver', 'Official videos from G.A. Oliver.', '/videos');

export default Videos;
