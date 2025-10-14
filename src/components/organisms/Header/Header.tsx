import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../atoms/Logo';
import NavMenu from '../../molecules/NavMenu';
import Button from '../../atoms/Button';
import type { CTA } from '../../../types/cta';

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  navigation: NavItem[];
  cta?: CTA;
  onNavClick?: (href: string) => void;
}

const Header: React.FC<HeaderProps> = ({ navigation, cta, onNavClick }) => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 glass">
      <nav className="container mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-3">
          <Logo size="md" />
          <span className="sr-only">Oliver</span>
        </Link>
        <NavMenu items={navigation} onLinkClick={onNavClick} />
        {cta && cta.isActive && (
          <Button variant="primary" size="sm" as="a" href={cta.url}>
            {cta.label}
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;

