import type { MetaFunction } from 'react-router';
import Contact from '../pages/Contact';
import { contactContent } from '../data';

export const meta: MetaFunction = () => [
  { title: 'Contact | G.A. Oliver' },
  { name: 'description', content: contactContent.description },
  { tagName: 'link', rel: 'canonical', href: 'https://gaoliver-music.com/contact' },
];

export default Contact;
