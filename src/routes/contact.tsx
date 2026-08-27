import type { MetaFunction } from 'react-router';
import Contact from '../pages/Contact';
import { contactContent } from '../data';
import { pageMeta } from '../lib/seo';

export const meta: MetaFunction = () =>
  pageMeta('Contact | G.A. Oliver', contactContent.description, '/contact');

export default Contact;
