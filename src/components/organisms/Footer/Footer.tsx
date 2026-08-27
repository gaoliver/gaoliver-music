import React from 'react';
import Logo from '../../atoms/Logo';
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
        <Logo size="md" className="mb-6 opacity-70" />
        <div className="flex flex-col items-center gap-5 text-[var(--shell-muted-light)]">
          <div>
            <span className="sr-only">Streaming platforms</span>
            <SocialLinks links={streamingLinks} withDividers={false} className="justify-center" />
          </div>
          <div>
            <span className="sr-only">Social platforms</span>
            <SocialLinks links={communityLinks} withDividers={false} className="justify-center" />
          </div>
        </div>
        <p className="mt-7 text-center text-[0.65rem] uppercase tracking-[0.18em] text-[var(--shell-muted)]">
          {copyrightText}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
