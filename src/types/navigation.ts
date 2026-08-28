export interface NavigationItem {
  label: string;
  href: string;
  submenu?: {
    image?: string;
    imageAlt?: string;
    items: Array<{
      label: string;
      href: string;
      description?: string;
    }>;
  };
}

export interface SocialLinkData {
  platform: string;
  url: string;
  ariaLabel: string;
}
