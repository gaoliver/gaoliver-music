import aboutJson from './about.json';
import albumsJson from './albums.json';
import contactJson from './contact.json';
import homeJson from './home.json';
import showsJson from './shows.json';
import siteJson from './site.json';
import timelineJson from './timeline.json';
import { validateAboutContent, validateAlbumCatalog, validateContactContent, validateHomeContent, validateShowsContent, validateSiteContent, validateTimelineContent } from '../types/content';

export const aboutContent = validateAboutContent(aboutJson);
export const albumCatalog = validateAlbumCatalog(albumsJson);
export const contactContent = validateContactContent(contactJson);
export const homeContent = validateHomeContent(homeJson);
export const showsContent = validateShowsContent(showsJson);
export const siteContent = validateSiteContent(siteJson);
export const timelineContent = validateTimelineContent(timelineJson);
