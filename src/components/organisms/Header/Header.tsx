import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../atoms/Logo';
import NavMenu from '../../molecules/NavMenu';
import Button from '../../atoms/Button';
import HamburgerButton from '../../atoms/HamburgerButton';
import MobileDrawer from '../MobileDrawer';
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

interface HeaderProps {
  navigation: NavItem[];
  cta?: CTA;
  socialLinks: SocialLink[];
  onNavClick?: (href: string) => void;
}

const Header: React.FC<HeaderProps> = ({ navigation, cta, socialLinks, onNavClick }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 glass">
        <nav className="container mx-auto flex items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-3">
            <Logo size="md" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <NavMenu items={navigation} onLinkClick={onNavClick} />
          </div>
          
          {/* Desktop CTA */}
          {cta && cta.isActive && (
            <Button 
              variant="primary" 
              size="sm" 
              as="a" 
              href={cta.url}
              className="hidden lg:inline-flex"
            >
              {cta.label}
            </Button>
          )}

          {/* Mobile Hamburger Button */}
          <HamburgerButton isOpen={isDrawerOpen} onClick={toggleDrawer} />
        </nav>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        navigation={navigation}
        cta={cta}
        socialLinks={socialLinks}
        onNavClick={onNavClick}
      />
    </>
  );
};

export default Header;

