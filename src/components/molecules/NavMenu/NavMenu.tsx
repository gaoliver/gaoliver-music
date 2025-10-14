import React from 'react';

interface NavItem {
  label: string;
  href: string;
}

interface NavMenuProps {
  items: NavItem[];
  onLinkClick?: (href: string) => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ items, onLinkClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && onLinkClick) {
      e.preventDefault();
      onLinkClick(href);
    }
  };

  return (
    <ul className="hidden md:flex items-center gap-8 text-sm">
      {items.map((item, index) => (
        <li key={index}>
          <a
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className={`hover:text-white/90 transition ${
              item.href === '#home' ? 'text-brand-text' : ''
            }`}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;

