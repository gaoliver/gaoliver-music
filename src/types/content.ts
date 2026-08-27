import type { CTA } from './cta';
import type { NavigationItem, SocialLinkData } from './navigation';

export interface SeoContent { title: string; description: string; canonicalPath: string; socialImage?: string; }
export interface StreamingLinks { spotify?: string; appleMusic?: string; youtube?: string; other?: string; }
export interface ReleaseContent { id: string; title: string; type: string; year: string; cover: string; videoId?: string; featured?: boolean; newReleaseLabel?: string; links: StreamingLinks; }
export interface ReleaseCatalogContent { title: string; releases: ReleaseContent[]; }
export interface AboutContent { title: string; description: string; details: string[]; image: string; backgroundImage?: string; lightContent?: boolean; }
export interface ContactContent { title: string; description: string; form: { endpoint: string; fields: { name: string; email: string; message: string }; submitText: string; messages: { success: string; error: string; sending: string; timeout?: string } } }
export interface HomeContent { background: { image: string; video?: string; poster?: string }; hero: { title: string; subtitle: string; ctaPrimary: CTA; ctaSecondary: CTA } }
export interface SiteContent { meta: { title: string; description: string; lang: string }; backgroundImage: string; navigation: NavigationItem[]; headerCta?: CTA; socialLinks: SocialLinkData[]; footer: { copyright: string } }
export interface ShowContent { id: string; date: string; venue: string; city: string; ticketUrl?: string; }
export interface ArticleContent { slug: string; title: string; publishedAt: string; summary: string; image?: string; }

type ContentRecord = Record<string, unknown>;

function record(value: unknown, path: string): ContentRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`Invalid content in ${path}: expected an object`);
  return value as ContentRecord;
}

function requiredString(value: unknown, path: string, allowEmpty = false): string {
  if (typeof value !== 'string' || (!allowEmpty && !value.trim())) throw new Error(`Invalid content in ${path}: expected ${allowEmpty ? 'a string' : 'a non-empty string'}`);
  return value;
}

function optionalString(value: unknown, path: string): string | undefined {
  return value === undefined ? undefined : requiredString(value, path);
}

function requiredBoolean(value: unknown, path: string): boolean {
  if (typeof value !== 'boolean') throw new Error(`Invalid content in ${path}: expected a boolean`);
  return value;
}

function validateCta(value: unknown, path: string): CTA {
  const data = record(value, path);
  return { isActive: requiredBoolean(data.isActive, `${path}.isActive`), label: requiredString(data.label, `${path}.label`), url: requiredString(data.url, `${path}.url`) };
}

function validateStringArray(value: unknown, path: string): string[] {
  if (!Array.isArray(value)) throw new Error(`Invalid content in ${path}: expected an array`);
  return value.map((item, index) => requiredString(item, `${path}[${index}]`));
}

function validateStreamingLinks(value: unknown, path: string): StreamingLinks {
  const data = record(value, path);
  return { spotify: optionalString(data.spotify, `${path}.spotify`), appleMusic: optionalString(data.appleMusic, `${path}.appleMusic`), youtube: optionalString(data.youtube, `${path}.youtube`), other: optionalString(data.other, `${path}.other`) };
}

export function validateAboutContent(value: unknown): AboutContent {
  const path = 'src/data/about.json';
  const data = record(value, path);
  return { title: requiredString(data.title, `${path}.title`), description: requiredString(data.description, `${path}.description`), details: validateStringArray(data.details, `${path}.details`), image: requiredString(data.image, `${path}.image`), backgroundImage: optionalString(data.backgroundImage, `${path}.backgroundImage`), lightContent: data.lightContent === undefined ? undefined : requiredBoolean(data.lightContent, `${path}.lightContent`) };
}

export function validateReleaseCatalog(value: unknown): ReleaseCatalogContent {
  const path = 'src/data/releases.json';
  const data = record(value, path);
  if (!Array.isArray(data.releases)) throw new Error(`Invalid content in ${path}.releases: expected an array`);
  const releases = data.releases.map((item, index): ReleaseContent => {
    const itemPath = `${path}.releases[${index}]`;
    const release = record(item, itemPath);
    return { id: requiredString(release.id, `${itemPath}.id`), title: requiredString(release.title, `${itemPath}.title`), type: requiredString(release.type, `${itemPath}.type`), year: requiredString(release.year, `${itemPath}.year`), cover: requiredString(release.cover, `${itemPath}.cover`), videoId: optionalString(release.videoId, `${itemPath}.videoId`), featured: release.featured === undefined ? undefined : requiredBoolean(release.featured, `${itemPath}.featured`), newReleaseLabel: optionalString(release.newReleaseLabel, `${itemPath}.newReleaseLabel`), links: validateStreamingLinks(release.links, `${itemPath}.links`) };
  });
  const ids = new Set<string>();
  releases.forEach((release) => { if (ids.has(release.id)) throw new Error(`Invalid content in ${path}: duplicate release id "${release.id}"`); ids.add(release.id); });
  return { title: requiredString(data.title, `${path}.title`), releases };
}

export function validateContactContent(value: unknown): ContactContent {
  const path = 'src/data/contact.json';
  const data = record(value, path);
  const form = record(data.form, `${path}.form`);
  const fields = record(form.fields, `${path}.form.fields`);
  const messages = record(form.messages, `${path}.form.messages`);
  return { title: requiredString(data.title, `${path}.title`), description: requiredString(data.description, `${path}.description`), form: { endpoint: requiredString(form.endpoint, `${path}.form.endpoint`), fields: { name: requiredString(fields.name, `${path}.form.fields.name`), email: requiredString(fields.email, `${path}.form.fields.email`), message: requiredString(fields.message, `${path}.form.fields.message`) }, submitText: requiredString(form.submitText, `${path}.form.submitText`), messages: { success: requiredString(messages.success, `${path}.form.messages.success`), error: requiredString(messages.error, `${path}.form.messages.error`), sending: requiredString(messages.sending, `${path}.form.messages.sending`), timeout: optionalString(messages.timeout, `${path}.form.messages.timeout`) } } };
}

export function validateHomeContent(value: unknown): HomeContent {
  const path = 'src/data/home.json';
  const data = record(value, path);
  const hero = record(data.hero, `${path}.hero`);
  const background = record(data.background, `${path}.background`);
  return {
    background: {
      image: requiredString(background.image, `${path}.background.image`),
      video: optionalString(background.video, `${path}.background.video`),
      poster: optionalString(background.poster, `${path}.background.poster`),
    },
    hero: {
      title: requiredString(hero.title, `${path}.hero.title`),
      subtitle: requiredString(hero.subtitle, `${path}.hero.subtitle`),
      ctaPrimary: validateCta(hero.ctaPrimary, `${path}.hero.ctaPrimary`),
      ctaSecondary: validateCta(hero.ctaSecondary, `${path}.hero.ctaSecondary`),
    },
  };
}

export function validateSiteContent(value: unknown): SiteContent {
  const path = 'src/data/site.json';
  const data = record(value, path);
  const meta = record(data.meta, `${path}.meta`);
  const footer = record(data.footer, `${path}.footer`);
  if (!Array.isArray(data.navigation)) throw new Error(`Invalid content in ${path}.navigation: expected an array`);
  if (!Array.isArray(data.socialLinks)) throw new Error(`Invalid content in ${path}.socialLinks: expected an array`);
  return { meta: { title: requiredString(meta.title, `${path}.meta.title`), description: requiredString(meta.description, `${path}.meta.description`), lang: requiredString(meta.lang, `${path}.meta.lang`) }, backgroundImage: requiredString(data.backgroundImage, `${path}.backgroundImage`), navigation: data.navigation.map((item, index) => { const itemPath = `${path}.navigation[${index}]`; const navItem = record(item, itemPath); return { label: requiredString(navItem.label, `${itemPath}.label`), href: requiredString(navItem.href, `${itemPath}.href`) }; }), headerCta: data.headerCta === undefined ? undefined : validateCta(data.headerCta, `${path}.headerCta`), socialLinks: data.socialLinks.map((item, index) => { const itemPath = `${path}.socialLinks[${index}]`; const link = record(item, itemPath); return { platform: requiredString(link.platform, `${itemPath}.platform`), url: requiredString(link.url, `${itemPath}.url`), ariaLabel: requiredString(link.ariaLabel, `${itemPath}.ariaLabel`) }; }), footer: { copyright: requiredString(footer.copyright, `${path}.footer.copyright`) } };
}
