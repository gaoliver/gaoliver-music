import React from 'react';
import { FaSpotify, FaApple, FaYoutube } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';
import type { StreamingLinks } from '../../../types/content';

interface StreamingButtonsProps {
  links: StreamingLinks;
  className?: string;
}

/**
 * Outlined, platform-coloured listen actions stacked in a column, matching the
 * reference site's song page. Only configured platforms are rendered.
 */
const PLATFORMS: Array<{
  key: keyof StreamingLinks;
  label: string;
  icon: React.ReactNode;
  className: string;
}> = [
  {
    key: 'spotify',
    label: 'Listen on Spotify',
    icon: <FaSpotify size={20} />,
    className: 'border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954] hover:text-black',
  },
  {
    key: 'appleMusic',
    label: 'Listen on Apple Music',
    icon: <FaApple size={20} />,
    className: 'border-[#fa243c] text-[#fa243c] hover:bg-[#fa243c] hover:text-white',
  },
  {
    key: 'youtube',
    label: 'Listen on YouTube Music',
    icon: <FaYoutube size={20} />,
    className: 'border-[#ff0000] text-[#ff0000] hover:bg-[#ff0000] hover:text-white',
  },
  {
    key: 'other',
    label: 'All platforms',
    icon: <HiDotsHorizontal size={22} />,
    className:
      'border-[var(--shell-muted)] text-[var(--shell-muted-light)] hover:bg-[var(--shell-muted-light)] hover:text-black',
  },
];

const StreamingButtons: React.FC<StreamingButtonsProps> = ({ links, className = '' }) => {
  const available = PLATFORMS.filter((platform) => links[platform.key]);
  if (available.length === 0) return null;

  return (
    <ul className={`space-y-3 ${className}`.trim()}>
      {available.map((platform) => (
        <li key={platform.key}>
          <a
            href={links[platform.key]}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 border px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors motion-reduce:transition-none ${platform.className}`}
          >
            {platform.icon}
            <span>{platform.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default StreamingButtons;
