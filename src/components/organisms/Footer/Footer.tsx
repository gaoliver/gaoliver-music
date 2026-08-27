import React from 'react';
import SocialLinks from '../../molecules/SocialLinks';
import type { SocialLinkData } from '../../../types/navigation';

const STREAMING_PLATFORMS = new Set(['Spotify', 'AppleMusic', 'AmazonMusic', 'Deezer']);

interface FooterProps {
  copyright: string;
  socialLinks: SocialLinkData[];
}

const Footer: React.FC<FooterProps> = ({ copyright, socialLinks }) => {
  const copyrightText = copyright.replace('[YEAR]', new Date().getFullYear().toString());
  const streamingLinks = socialLinks.filter((link) => STREAMING_PLATFORMS.has(link.platform));
  const communityLinks = socialLinks.filter((link) => !STREAMING_PLATFORMS.has(link.platform));

  return (
    <footer className="shell-footer">
      <div className="shell-footer__content">
        <div className="flex flex-row flex-wrap items-center justify-center gap-20 text-[var(--shell-muted-light)]">
          <div>
            <span className="sr-only">Streaming platforms</span>
            <SocialLinks links={streamingLinks} withDividers={false} className="justify-center" />
          </div>
          <div>
            <span className="sr-only">Social platforms</span>
            <SocialLinks links={communityLinks} withDividers={false} className="justify-center" />
          </div>
        </div>
        <p className="mt-6 text-center text-[13px] uppercase text-[var(--shell-muted)]">
          {copyrightText}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
