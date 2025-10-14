import React from 'react';

interface SocialLinkProps {
  platform: string;
  url: string;
  ariaLabel?: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ platform, url, ariaLabel }) => {
  return (
    <a
      href={url}
      aria-label={ariaLabel || platform}
      className="hover:text-brand-accent transition"
    >
      {platform}
    </a>
  );
};

export default SocialLink;

