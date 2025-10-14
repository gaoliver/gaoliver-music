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

export interface SiteData {
  site: {
    title: string;
    description: string;
    lang: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: CTA;
    ctaSecondary: CTA;
  };
  about: {
    title: string;
    description: string;
    details: string[];
    image: string;
  };
  releases: Release[];
  navigation: NavItem[];
  socialLinks: SocialLink[];
  contact: {
    title: string;
    fields: {
      name: string;
      email: string;
      message: string;
    };
    submitText: string;
  };
  footer: {
    copyright: string;
  };
}

