import type { MetaFunction } from 'react-router';
import AboutStory from '../pages/AboutStory';
import { pageMeta } from '../lib/seo';

export const meta: MetaFunction = () =>
  pageMeta('Story | G.A. Oliver', 'The journey behind the music of G.A. Oliver.', '/about/story');

export default AboutStory;
