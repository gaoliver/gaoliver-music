import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import Logo from '../../atoms/Logo';
import NavMenu from '../../molecules/NavMenu';
import Button from '../../atoms/Button';
import HamburgerButton from '../../atoms/HamburgerButton';
import MobileDrawer from '../MobileDrawer';
import type { CTA } from '../../../types/cta';
import type { NavigationItem, SocialLinkData } from '../../../types/navigation';

const MOBILE_MENU_ID = 'site-mobile-menu';

/** Past this scroll offset the header takes a solid backdrop so navigation
 *  never blends into the page content behind it. */
const SCROLLED_OFFSET = 24;

function useIsScrolled(): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > SCROLLED_OFFSET);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return isScrolled;
}

interface HeaderProps {
  navigation: NavigationItem[];
  cta?: CTA;
  socialLinks: SocialLinkData[];
  onNavClick?: (href: string) => void;
}

const Header: React.FC<HeaderProps> = ({ navigation, cta, socialLinks, onNavClick }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const isScrolled = useIsScrolled();

  return (
    <>
      <header className={`shell-header ${isScrolled ? 'shell-header--scrolled' : ''}`}>
        <nav className="shell-header__nav" aria-label="Primary navigation">
          <Link
            to="/"
            className="shell-header__logo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--shell-accent-hover)]"
            aria-label="G.A. Oliver home"
          >
            <Logo size="nav" />
          </Link>

          <div className="ml-auto hidden lg:flex">
            <NavMenu items={navigation} onLinkClick={onNavClick} />
          </div>

          {cta?.isActive && (
            <Button
              variant="primary"
              size="sm"
              as="a"
              href={cta.url}
              className="ml-8 hidden !bg-[var(--shell-accent)] !text-white hover:!bg-[var(--shell-accent-hover)] lg:inline-flex"
            >
              {cta.label}
            </Button>
          )}

          <HamburgerButton
            ref={menuTriggerRef}
            isOpen={isDrawerOpen}
            onClick={() => setIsDrawerOpen((open) => !open)}
            controls={MOBILE_MENU_ID}
            className="ml-auto lg:ml-0"
          />
        </nav>
      </header>

      <MobileDrawer
        id={MOBILE_MENU_ID}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        navigation={navigation}
        cta={cta}
        socialLinks={socialLinks}
        onNavClick={onNavClick}
        triggerRef={menuTriggerRef}
      />
    </>
  );
};

export default Header;
