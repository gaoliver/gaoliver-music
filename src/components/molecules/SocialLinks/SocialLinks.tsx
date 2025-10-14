import React from 'react';
import SocialLink from '../../atoms/SocialLink';

interface SocialLinkData {
  platform: string;
  url: string;
  ariaLabel: string;
}

interface SocialLinksProps {
  links: SocialLinkData[];
  withDividers?: boolean;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links, withDividers = true }) => {
  return (
    <div className="flex items-center gap-4">
      {links.map((link, index) => (
        <React.Fragment key={link.platform}>
          <SocialLink
            platform={link.platform}
            url={link.url}
            ariaLabel={link.ariaLabel}
          />
          {withDividers && index < links.length - 1 && (
            <span className="text-white/20">•</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SocialLinks;

