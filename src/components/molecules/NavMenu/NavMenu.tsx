import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { NavigationItem } from '../../../types/navigation';

interface NavMenuProps {
  items: NavigationItem[];
  onLinkClick?: (href: string) => void;
}

/** Grace period so the pointer can cross the gap between a nav item and its
 *  panel without the panel closing underneath it. */
const CLOSE_DELAY_MS = 260;

const NavMenu: React.FC<NavMenuProps> = ({ items, onLinkClick }) => {
  const menuId = useId();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openNow = useCallback((label: string) => {
    cancelClose();
    setOpenSubmenu(label);
  }, [cancelClose]);

  const closeSoon = useCallback(() => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => setOpenSubmenu(null), CLOSE_DELAY_MS);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

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
            onMouseEnter={() => hasSubmenu && openNow(item.label)}
            onMouseLeave={() => hasSubmenu && closeSoon()}
            onFocus={() => hasSubmenu && openNow(item.label)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) closeSoon();
            }}
          >
            {/* Always a real link, as on the reference site: the parent route
                stays reachable and the submenu opens on hover, focus or
                ArrowDown rather than swallowing the click. */}
            <a
              href={item.href}
              onClick={(event) => handleClick(event, item.href)}
              className="shell-nav-link"
              aria-expanded={hasSubmenu ? isOpen : undefined}
              aria-controls={hasSubmenu ? submenuId : undefined}
              onKeyDown={(event) => {
                if (!hasSubmenu) return;
                if (event.key === 'ArrowDown') {
                  event.preventDefault();
                  setOpenSubmenu(item.label);
                } else if (event.key === 'Escape') {
                  setOpenSubmenu(null);
                }
              }}
            >
              {item.label}
            </a>

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
