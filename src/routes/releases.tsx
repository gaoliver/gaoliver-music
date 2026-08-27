import type { MetaFunction } from 'react-router';
import Releases from '../pages/Releases';

export const meta: MetaFunction = () => [
  { title: 'Releases | G.A. Oliver' },
  { name: 'description', content: 'Explore the official music catalog from G.A. Oliver.' },
  { tagName: 'link', rel: 'canonical', href: 'https://gaoliver-music.com/releases' },
];

export default Releases;
