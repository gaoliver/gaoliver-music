import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import MobileDrawer from './MobileDrawer';

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
];

describe('MobileDrawer', () => {
  it('traps focus, closes with Escape, and restores trigger focus', () => {
    const onClose = vi.fn();
    const triggerRef = createRef<HTMLButtonElement>();
    const { rerender } = render(
      <MemoryRouter>
        <button ref={triggerRef}>Menu trigger</button>
        <MobileDrawer
          id="mobile-menu"
          isOpen
          onClose={onClose}
          navigation={navigation}
          socialLinks={[]}
          triggerRef={triggerRef}
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Home' })).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();

    rerender(
      <MemoryRouter>
        <button ref={triggerRef}>Menu trigger</button>
        <MobileDrawer
          id="mobile-menu"
          isOpen={false}
          onClose={onClose}
          navigation={navigation}
          socialLinks={[]}
          triggerRef={triggerRef}
        />
      </MemoryRouter>,
    );
    expect(screen.getByRole('button', { name: 'Menu trigger' })).toHaveFocus();
  });
});
