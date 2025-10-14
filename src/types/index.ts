export interface CTA {
  isActive: boolean;
  label: string;
  url: string;
}

export interface Release {
  id: string;
  title: string;
  type: string;
  year: string;
  cover: string;
  featured?: boolean;
  links: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    other?: string;
  };
}

export interface SocialLink {
  platform: string;
  url: string;
  ariaLabel: string;
}

export interface NavItem {
  label: string;
  href: string;
}

// Home Page Data
export interface HomeData {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage?: string;
    ctaPrimary: CTA;
    ctaSecondary: CTA;
  };
  about: {
    summary: string;
    cta: CTA;
  };
  releases: {
    sectionTitle: string;
    cta: CTA;
    limit: number;
  };
  contact: {
    sectionTitle: string;
    description: string;
  };
}

// About Data
export interface AboutData {
  title: string;
  description: string;
  details: string[];
  image: string;
  backgroundImage?: string;
}

// Site Configuration
export interface SiteData {
  meta: {
    title: string;
    description: string;
  };
  navigation: NavItem[];
  socialLinks: SocialLink[];
  headerCta?: CTA;
  footer: {
    copyright: string;
  };
}

