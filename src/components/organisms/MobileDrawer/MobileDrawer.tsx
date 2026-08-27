import React, { useEffect, useRef } from 'react';
import SocialLinks from '../../molecules/SocialLinks';
import type { CTA } from '../../../types/cta';
import type { NavigationItem, SocialLinkData } from '../../../types/navigation';

const FOCUSABLE_ELEMENTS = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
  cta?: CTA;
  socialLinks: SocialLinkData[];
  onNavClick?: (href: string) => void;
  id: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  navigation,
  cta,
  socialLinks,
  onNavClick,
  id,
  triggerRef,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const menuTrigger = triggerRef.current;
    const drawer = drawerRef.current;
    const focusable = drawer?.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS);
    focusable?.[0]?.focus();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      (menuTrigger ?? previouslyFocused)?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  const handleNavClick = (href: string) => {
    onNavClick?.(href);
    onClose();
  };

  return (
    <div
      ref={drawerRef}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={`fixed inset-0 z-[60] bg-[var(--shell-accent)] text-white transition-transform duration-300 motion-reduce:transition-none lg:hidden ${
        isOpen ? 'translate-y-0' : 'pointer-events-none -translate-y-full'
      }`}
    >
      <div className="mx-auto flex h-full max-w-2xl flex-col px-6 pb-8 pt-24">
        <nav className="flex flex-1 flex-col items-center justify-center gap-2" aria-label="Mobile navigation">
          {navigation.map((item) => {
            const isExternal = /^https?:\/\//.test(item.href);
            if (isExternal) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="mobile-menu-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              );
            }

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  if (item.href.startsWith('#')) event.preventDefault();
                  handleNavClick(item.href);
                }}
                className="mobile-menu-link"
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {cta?.isActive && (
          <div className="mb-8 text-center">
            <a
              href={cta.url}
              onClick={onClose}
              className="inline-flex border border-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-white hover:text-[var(--shell-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              target={/^https?:\/\//.test(cta.url) ? '_blank' : undefined}
              rel={/^https?:\/\//.test(cta.url) ? 'noopener noreferrer' : undefined}
            >
              {cta.label}
            </a>
          </div>
        )}

        <div className="border-t border-white/25 pt-6 text-white">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
            Listen &amp; follow
          </p>
          <SocialLinks links={socialLinks} withDividers={false} className="justify-center" />
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
