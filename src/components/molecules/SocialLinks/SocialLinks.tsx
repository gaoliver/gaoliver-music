import React from 'react';
import SocialLink from '../../atoms/SocialLink';
import type { SocialLinkData } from '../../../types/navigation';

interface SocialLinksProps {
  links: SocialLinkData[];
  withDividers?: boolean;
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links, withDividers = true, className = '' }) => {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`.trim()}>
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
