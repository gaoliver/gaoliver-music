import type { MetaFunction } from 'react-router';
import Home from '../pages/Home';
import { siteContent } from '../data';
import { pageMeta } from '../lib/seo';

export const meta: MetaFunction = () =>
  pageMeta(siteContent.meta.title, siteContent.meta.description, '/');

export default Home;
