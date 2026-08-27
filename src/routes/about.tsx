import type { MetaFunction } from 'react-router';
import About from '../pages/About';

export const meta: MetaFunction = () => [
  { title: 'About | G.A. Oliver' },
  { name: 'description', content: 'Meet G.A. Oliver, a Brazilian guitarist and singer based in the Netherlands.' },
  { tagName: 'link', rel: 'canonical', href: 'https://gaoliver-music.com/about' },
];

export default About;
