import type { CTA } from "./cta";
import type { NavigationItem, SocialLinkData } from "./navigation";

export interface SeoContent {
  title: string;
  description: string;
  canonicalPath: string;
  socialImage?: string;
}
export interface StreamingLinks {
  spotify?: string;
  appleMusic?: string;
  youtube?: string;
  other?: string;
}
export interface SongContent {
  id: string;
  title: string;
  composer: string;
  videoId?: string;
  links?: StreamingLinks;
  lyrics?: string[];
  lyricsDraft?: boolean;
}
export interface AlbumContent {
  id: string;
  title: string;
  type: string;
  year: string;
  cover: string;
  featured?: boolean;
  newReleaseLabel?: string;
  links: StreamingLinks;
  songs: SongContent[];
}
export interface ShowsContent {
  title: string;
  description: string;
  emptyMessage: string;
  shows: Array<{
    id: string;
    date: string;
    venue: string;
    city: string;
    ticketUrl?: string;
  }>;
}
export interface AlbumCatalogContent {
  title: string;
  albums: AlbumContent[];
}
export interface AboutContent {
  title: string;
  summary: string;
  description: string;
  details: string[];
  image: string;
  backgroundImage?: string;
  lightContent?: boolean;
}
export interface ContactContent {
  title: string;
  description: string;
  email?: string;
  form: {
    endpoint: string;
    fields: { name: string; email: string; message: string };
    submitText: string;
    messages: {
      success: string;
      error: string;
      sending: string;
      timeout?: string;
    };
  };
}
export interface TimelineContent {
  title: string;
  description: string;
  entries: Array<{ year: string; title: string; description: string }>;
}
export interface HomeContent {
  background: { image?: string; video?: string; poster?: string };
  hero: { title: string; subtitle: string; ctaPrimary: CTA; ctaSecondary: CTA };
}
export interface SiteContent {
  meta: { title: string; description: string; lang: string };
  backgroundImage: string;
  navigation: NavigationItem[];
  headerCta?: CTA;
  socialLinks: SocialLinkData[];
  footer: { copyright: string };
}
export interface ShowContent {
  id: string;
  date: string;
  venue: string;
  city: string;
  ticketUrl?: string;
}
export interface ArticleContent {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
}

type ContentRecord = Record<string, unknown>;

function record(value: unknown, path: string): ContentRecord {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`Invalid content in ${path}: expected an object`);
  return value as ContentRecord;
}

function requiredString(
  value: unknown,
  path: string,
  allowEmpty = false,
): string {
  if (typeof value !== "string" || (!allowEmpty && !value.trim()))
    throw new Error(
      `Invalid content in ${path}: expected ${allowEmpty ? "a string" : "a non-empty string"}`,
    );
  return value;
}

function optionalString(
  value: unknown,
  path: string,
  allowEmpty = false,
): string | undefined {
  return value === undefined
    ? undefined
    : requiredString(value, path, allowEmpty);
}

function requiredBoolean(value: unknown, path: string): boolean {
  if (typeof value !== "boolean")
    throw new Error(`Invalid content in ${path}: expected a boolean`);
  return value;
}

function validateCta(value: unknown, path: string): CTA {
  const data = record(value, path);
  return {
    isActive: requiredBoolean(data.isActive, `${path}.isActive`),
    label: requiredString(data.label, `${path}.label`),
    url: requiredString(data.url, `${path}.url`),
  };
}

function validateStringArray(value: unknown, path: string): string[] {
  if (!Array.isArray(value))
    throw new Error(`Invalid content in ${path}: expected an array`);
  return value.map((item, index) => requiredString(item, `${path}[${index}]`));
}

function validateStreamingLinks(value: unknown, path: string): StreamingLinks {
  const data = record(value, path);
  return {
    spotify: optionalString(data.spotify, `${path}.spotify`),
    appleMusic: optionalString(data.appleMusic, `${path}.appleMusic`),
    youtube: optionalString(data.youtube, `${path}.youtube`),
    other: optionalString(data.other, `${path}.other`),
  };
}

export function validateAboutContent(value: unknown): AboutContent {
  const path = "src/data/about.json";
  const data = record(value, path);
  return {
    title: requiredString(data.title, `${path}.title`),
    summary: requiredString(data.summary, `${path}.summary`),
    description: requiredString(data.description, `${path}.description`),
    details: validateStringArray(data.details, `${path}.details`),
    image: requiredString(data.image, `${path}.image`),
    backgroundImage: optionalString(
      data.backgroundImage,
      `${path}.backgroundImage`,
    ),
    lightContent:
      data.lightContent === undefined
        ? undefined
        : requiredBoolean(data.lightContent, `${path}.lightContent`),
  };
}

export function validateShowsContent(value: unknown): ShowsContent {
  const path = "src/data/shows.json";
  const data = record(value, path);
  if (!Array.isArray(data.shows))
    throw new Error(`Invalid content in ${path}.shows: expected an array`);
  return {
    title: requiredString(data.title, `${path}.title`),
    description: requiredString(data.description, `${path}.description`),
    emptyMessage: requiredString(data.emptyMessage, `${path}.emptyMessage`),
    shows: data.shows.map((entry, index) => {
      const showPath = `${path}.shows[${index}]`;
      const show = record(entry, showPath);
      return {
        id: requiredString(show.id, `${showPath}.id`),
        date: requiredString(show.date, `${showPath}.date`),
        venue: requiredString(show.venue, `${showPath}.venue`),
        city: requiredString(show.city, `${showPath}.city`),
        ticketUrl: optionalString(show.ticketUrl, `${showPath}.ticketUrl`),
      };
    }),
  };
}

export function validateTimelineContent(value: unknown): TimelineContent {
  const path = "src/data/timeline.json";
  const data = record(value, path);
  if (!Array.isArray(data.entries) || data.entries.length === 0) {
    throw new Error(
      `Invalid content in ${path}.entries: expected a non-empty array`,
    );
  }
  return {
    title: requiredString(data.title, `${path}.title`),
    description: requiredString(data.description, `${path}.description`),
    entries: data.entries.map((entry, index) => {
      const entryPath = `${path}.entries[${index}]`;
      const item = record(entry, entryPath);
      return {
        year: requiredString(item.year, `${entryPath}.year`),
        title: requiredString(item.title, `${entryPath}.title`),
        description: requiredString(
          item.description,
          `${entryPath}.description`,
        ),
      };
    }),
  };
}

function validateSong(value: unknown, path: string): SongContent {
  const song = record(value, path);
  return {
    id: requiredString(song.id, `${path}.id`),
    title: requiredString(song.title, `${path}.title`),
    composer: requiredString(song.composer, `${path}.composer`),
    videoId: optionalString(song.videoId, `${path}.videoId`),
    links:
      song.links === undefined
        ? undefined
        : validateStreamingLinks(song.links, `${path}.links`),
    lyrics:
      song.lyrics === undefined
        ? undefined
        : validateStringArray(song.lyrics, `${path}.lyrics`),
    lyricsDraft:
      song.lyricsDraft === undefined
        ? undefined
        : requiredBoolean(song.lyricsDraft, `${path}.lyricsDraft`),
  };
}

export function validateAlbumCatalog(value: unknown): AlbumCatalogContent {
  const path = "src/data/albums.json";
  const data = record(value, path);
  if (!Array.isArray(data.albums))
    throw new Error(`Invalid content in ${path}.albums: expected an array`);
  const albums = data.albums.map((item, index): AlbumContent => {
    const itemPath = `${path}.albums[${index}]`;
    const album = record(item, itemPath);
    if (!Array.isArray(album.songs) || album.songs.length === 0) {
      throw new Error(
        `Invalid content in ${itemPath}.songs: expected a non-empty array`,
      );
    }
    return {
      id: requiredString(album.id, `${itemPath}.id`),
      title: requiredString(album.title, `${itemPath}.title`),
      type: requiredString(album.type, `${itemPath}.type`),
      year: requiredString(album.year, `${itemPath}.year`),
      cover: requiredString(album.cover, `${itemPath}.cover`),
      featured:
        album.featured === undefined
          ? undefined
          : requiredBoolean(album.featured, `${itemPath}.featured`),
      newReleaseLabel: optionalString(
        album.newReleaseLabel,
        `${itemPath}.newReleaseLabel`,
      ),
      links: validateStreamingLinks(album.links, `${itemPath}.links`),
      songs: album.songs.map((song, songIndex) =>
        validateSong(song, `${itemPath}.songs[${songIndex}]`),
      ),
    };
  });
  const albumIds = new Set<string>();
  const songIds = new Set<string>();
  albums.forEach((album) => {
    if (albumIds.has(album.id))
      throw new Error(
        `Invalid content in ${path}: duplicate album id "${album.id}"`,
      );
    albumIds.add(album.id);
    album.songs.forEach((song) => {
      if (songIds.has(song.id))
        throw new Error(
          `Invalid content in ${path}: duplicate song id "${song.id}"`,
        );
      songIds.add(song.id);
    });
  });
  return { title: requiredString(data.title, `${path}.title`), albums };
}

export function validateContactContent(value: unknown): ContactContent {
  const path = "src/data/contact.json";
  const data = record(value, path);
  const form = record(data.form, `${path}.form`);
  const fields = record(form.fields, `${path}.form.fields`);
  const messages = record(form.messages, `${path}.form.messages`);
  return {
    title: requiredString(data.title, `${path}.title`),
    description: requiredString(data.description, `${path}.description`),
    email: optionalString(data.email, `${path}.email`),
    form: {
      endpoint: requiredString(form.endpoint, `${path}.form.endpoint`),
      fields: {
        name: requiredString(fields.name, `${path}.form.fields.name`),
        email: requiredString(fields.email, `${path}.form.fields.email`),
        message: requiredString(fields.message, `${path}.form.fields.message`),
      },
      submitText: requiredString(form.submitText, `${path}.form.submitText`),
      messages: {
        success: requiredString(
          messages.success,
          `${path}.form.messages.success`,
        ),
        error: requiredString(messages.error, `${path}.form.messages.error`),
        sending: requiredString(
          messages.sending,
          `${path}.form.messages.sending`,
        ),
        timeout: optionalString(
          messages.timeout,
          `${path}.form.messages.timeout`,
        ),
      },
    },
  };
}

export function validateHomeContent(value: unknown): HomeContent {
  const path = "src/data/home.json";
  const data = record(value, path);
  const hero = record(data.hero, `${path}.hero`);
  const background = record(data.background, `${path}.background`);
  return {
    background: {
      // An absent or blank image means "use the site's shared backdrop" -
      // a homepage-specific image is a deliberate override, not a requirement.
      image:
        background.image === undefined || background.image === ""
          ? undefined
          : requiredString(background.image, `${path}.background.image`),
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

function validateSubmenu(
  value: unknown,
  path: string,
): NavigationItem["submenu"] {
  if (value === undefined) return undefined;
  const data = record(value, path);
  if (!Array.isArray(data.items) || data.items.length === 0) {
    throw new Error(
      `Invalid content in ${path}.items: expected a non-empty array`,
    );
  }
  return {
    image: optionalString(data.image, `${path}.image`),
    // Decorative submenu artwork legitimately carries an empty alt.
    imageAlt: optionalString(data.imageAlt, `${path}.imageAlt`, true),
    items: data.items.map((item, index) => {
      const itemPath = `${path}.items[${index}]`;
      const subItem = record(item, itemPath);
      return {
        label: requiredString(subItem.label, `${itemPath}.label`),
        href: requiredString(subItem.href, `${itemPath}.href`),
        description: optionalString(
          subItem.description,
          `${itemPath}.description`,
        ),
      };
    }),
  };
}

export function validateSiteContent(value: unknown): SiteContent {
  const path = "src/data/site.json";
  const data = record(value, path);
  const meta = record(data.meta, `${path}.meta`);
  const footer = record(data.footer, `${path}.footer`);
  if (!Array.isArray(data.navigation))
    throw new Error(`Invalid content in ${path}.navigation: expected an array`);
  if (!Array.isArray(data.socialLinks))
    throw new Error(
      `Invalid content in ${path}.socialLinks: expected an array`,
    );
  return {
    meta: {
      title: requiredString(meta.title, `${path}.meta.title`),
      description: requiredString(meta.description, `${path}.meta.description`),
      lang: requiredString(meta.lang, `${path}.meta.lang`),
    },
    backgroundImage: requiredString(
      data.backgroundImage,
      `${path}.backgroundImage`,
    ),
    navigation: data.navigation.map((item, index) => {
      const itemPath = `${path}.navigation[${index}]`;
      const navItem = record(item, itemPath);
      return {
        label: requiredString(navItem.label, `${itemPath}.label`),
        href: requiredString(navItem.href, `${itemPath}.href`),
        submenu: validateSubmenu(navItem.submenu, `${itemPath}.submenu`),
      };
    }),
    headerCta:
      data.headerCta === undefined
        ? undefined
        : validateCta(data.headerCta, `${path}.headerCta`),
    socialLinks: data.socialLinks.map((item, index) => {
      const itemPath = `${path}.socialLinks[${index}]`;
      const link = record(item, itemPath);
      return {
        platform: requiredString(link.platform, `${itemPath}.platform`),
        url: requiredString(link.url, `${itemPath}.url`),
        ariaLabel: requiredString(link.ariaLabel, `${itemPath}.ariaLabel`),
      };
    }),
    footer: {
      copyright: requiredString(footer.copyright, `${path}.footer.copyright`),
    },
  };
}
