import type { MetaFunction } from 'react-router';
import Shows from '../pages/Shows';
import { pageMeta } from '../lib/seo';

export const meta: MetaFunction = () =>
  pageMeta('Shows | G.A. Oliver', 'Upcoming and past live dates for G.A. Oliver.', '/shows');

export default Shows;
