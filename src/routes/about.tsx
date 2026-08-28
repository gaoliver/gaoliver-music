import type { MetaFunction } from 'react-router';
import About from '../pages/About';
import { pageMeta } from '../lib/seo';

export const meta: MetaFunction = () =>
  pageMeta(
    'About | G.A. Oliver',
    'Meet G.A. Oliver, a Brazilian guitarist and singer based in the Netherlands.',
    '/about',
  );

export default About;
