import React, { useId, useState } from 'react';
import type { NavigationItem } from '../../../types/navigation';

interface NavMenuProps {
  items: NavigationItem[];
  onLinkClick?: (href: string) => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ items, onLinkClick }) => {
  const menuId = useId();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && onLinkClick) {
      event.preventDefault();
      onLinkClick(href);
    }
  };

  return (
    <ul className="hidden items-center gap-8 text-base font-normal uppercase tracking-normal lg:flex">
      {items.map((item) => {
        const submenuId = `${menuId}-${item.label.replace(/\s+/g, '-').toLowerCase()}`;
        const hasSubmenu = Boolean(item.submenu?.items.length);
        const isOpen = openSubmenu === item.label;

        return (
          <li
            key={item.href}
            className="group"
            onMouseEnter={() => hasSubmenu && setOpenSubmenu(item.label)}
            onMouseLeave={() => hasSubmenu && setOpenSubmenu(null)}
            onFocus={() => hasSubmenu && setOpenSubmenu(item.label)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setOpenSubmenu(null);
            }}
          >
            {hasSubmenu ? (
              <button
                type="button"
                className="shell-nav-link"
                aria-expanded={isOpen}
                aria-controls={submenuId}
                onClick={() => setOpenSubmenu(isOpen ? null : item.label)}
              >
                {item.label}
              </button>
            ) : (
              <a
                href={item.href}
                onClick={(event) => handleClick(event, item.href)}
                className="shell-nav-link"
              >
                {item.label}
              </a>
            )}

            {hasSubmenu && item.submenu && (
              <div
                id={submenuId}
                className={`shell-submenu ${isOpen ? 'shell-submenu--open' : ''}`}
              >
                {item.submenu.image && (
                  <img
                    src={item.submenu.image}
                    alt={item.submenu.imageAlt ?? ''}
                    className="shell-submenu__image"
                  />
                )}
                <ul className="shell-submenu__items">
                  {item.submenu.items.map((subItem) => (
                    <li key={subItem.href}>
                      <a href={subItem.href} className="shell-submenu__link">
                        <span>{subItem.label}</span>
                        {subItem.description && <small>{subItem.description}</small>}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default NavMenu;
