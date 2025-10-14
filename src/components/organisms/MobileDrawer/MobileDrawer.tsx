import React, { useEffect } from 'react';
import Button from '../../atoms/Button';
import SocialLinks from '../../molecules/SocialLinks';
import type { CTA } from '../../../types/cta';

interface NavItem {
  label: string;
  href: string;
}

interface SocialLink {
  platform: string;
  url: string;
  ariaLabel: string;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavItem[];
  cta?: CTA;
  socialLinks: SocialLink[];
  onNavClick?: (href: string) => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  navigation,
  cta,
  socialLinks,
  onNavClick,
}) => {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    if (onNavClick) {
      onNavClick(href);
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-40 h-full w-80 max-w-[85vw] bg-brand-bgAlt shadow-2xl transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col p-6 pt-20">
          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => {
              const isExternal = item.href.startsWith('http://') || item.href.startsWith('https://');
              
              if (isExternal) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className="rounded-lg px-4 py-3 font-body text-lg transition-colors hover:bg-white/5 hover:text-brand-accent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                );
              }

              // Internal link (smooth scroll)
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="rounded-lg px-4 py-3 text-left font-body text-lg transition-colors hover:bg-white/5 hover:text-brand-accent"
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* CTA Button */}
          {cta && cta.isActive && (
            <div className="mt-6">
              <Button 
                variant="primary" 
                size="md" 
                as="a" 
                href={cta.url}
                className="w-full"
                onClick={onClose}
              >
                {cta.label}
              </Button>
            </div>
          )}

          {/* Social Links */}
          <div className="mt-auto border-t border-white/5 pt-6">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-brand-muted">Follow me</p>
            <SocialLinks links={socialLinks} withDividers={false} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;

