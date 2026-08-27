import type { MetaFunction } from 'react-router';
import Home from '../pages/Home';
import { siteContent } from '../data';

export const meta: MetaFunction = () => [
  { title: siteContent.meta.title },
  { name: 'description', content: siteContent.meta.description },
  { tagName: 'link', rel: 'canonical', href: 'https://gaoliver-music.com/' },
];

export default Home;
