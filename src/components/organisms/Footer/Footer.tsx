import React from 'react';
import Logo from '../../atoms/Logo';
import SocialLinks from '../../molecules/SocialLinks';

interface SocialLink {
  platform: string;
  url: string;
  ariaLabel: string;
}

interface FooterProps {
  copyright: string;
  socialLinks: SocialLink[];
}

const Footer: React.FC<FooterProps> = ({ copyright, socialLinks }) => {
  return (
    <footer className="mt-16 border-t border-white/10 bg-brand-bgAlt">
      <div className="container mx-auto px-6 py-10 text-sm">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo size="sm" className="opacity-80" />
            <span className="text-white/50">Oliver</span>
          </div>
          <div className="text-white/60">
            <SocialLinks links={socialLinks} withDividers={false} />
          </div>
          <div className="text-white/40">{copyright}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

