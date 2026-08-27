import aboutJson from './about.json';
import contactJson from './contact.json';
import homeJson from './home.json';
import releasesJson from './releases.json';
import showsJson from './shows.json';
import siteJson from './site.json';
import timelineJson from './timeline.json';
import { validateAboutContent, validateContactContent, validateHomeContent, validateReleaseCatalog, validateShowsContent, validateSiteContent, validateTimelineContent } from '../types/content';

export const aboutContent = validateAboutContent(aboutJson);
export const contactContent = validateContactContent(contactJson);
export const homeContent = validateHomeContent(homeJson);
export const releaseCatalog = validateReleaseCatalog(releasesJson);
export const showsContent = validateShowsContent(showsJson);
export const siteContent = validateSiteContent(siteJson);
export const timelineContent = validateTimelineContent(timelineJson);
