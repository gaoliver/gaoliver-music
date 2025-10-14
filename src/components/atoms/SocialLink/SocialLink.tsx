import React from 'react';

interface SocialLinkProps {
  platform: string;
  url: string;
  ariaLabel?: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ platform, url, ariaLabel }) => {
  // Check if link is external (starts with http:// or https://)
  const isExternal = url.startsWith('http://') || url.startsWith('https://');
  
  return (
    <a
      href={url}
      aria-label={ariaLabel || platform}
      className="hover:text-brand-accent transition"
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {platform}
    </a>
  );
};

export default SocialLink;

