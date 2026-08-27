import { fireEvent, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import BackgroundMedia from './BackgroundMedia';

function setReducedMotion(matches: boolean) {
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

describe('BackgroundMedia', () => {
  beforeEach(() => setReducedMotion(false));

  it('keeps the image fallback when video playback fails', () => {
    const { container } = render(
      <BackgroundMedia image="/fallback.webp" video="/background.mp4" />,
    );

    expect(container.querySelector('img')).toHaveAttribute('src', '/fallback.webp');
    const video = container.querySelector('video');
    expect(video).not.toBeNull();
    fireEvent.error(video!);
    expect(container.querySelector('video')).toBeNull();
  });

  it('does not render autoplay video for reduced-motion users', () => {
    setReducedMotion(true);
    const { container } = render(
      <BackgroundMedia image="/fallback.webp" video="/background.mp4" />,
    );

    expect(container.querySelector('video')).toBeNull();
    expect(container.querySelector('img')).toBeInTheDocument();
  });
});
