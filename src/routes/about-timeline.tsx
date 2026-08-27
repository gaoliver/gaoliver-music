import type { MetaFunction } from 'react-router';
import AboutTimeline from '../pages/AboutTimeline';
import { pageMeta } from '../lib/seo';

export const meta: MetaFunction = () =>
  pageMeta('Timeline | G.A. Oliver', 'Releases and milestones from G.A. Oliver.', '/about/timeline');

export default AboutTimeline;
