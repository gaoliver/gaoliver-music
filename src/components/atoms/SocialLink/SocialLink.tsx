import React from 'react';
import { FaSpotify, FaApple, FaAmazon, FaYoutube, FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa';

interface SocialLinkProps {
  platform: string;
  url: string;
  ariaLabel?: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ platform, url, ariaLabel }) => {
  // Check if link is external (starts with http:// or https://)
  const isExternal = url.startsWith('http://') || url.startsWith('https://');
  
  // Map platform to icon
  const getIcon = () => {
    const iconSize = 20;
    switch (platform) {
      case 'Spotify':
        return <FaSpotify size={iconSize} />;
      case 'AppleMusic':
        return <FaApple size={iconSize} />;
      case 'AmazonMusic':
        return <FaAmazon size={iconSize} />;
      case 'Deezer':
        // return <SiDeezer size={iconSize} />;
        return null;
      case 'YouTube':
        return <FaYoutube size={iconSize} />;
      case 'Instagram':
        return <FaInstagram size={iconSize} />;
      case 'TikTok':
        return <FaTiktok size={iconSize} />;
      case 'Facebook':
        return <FaFacebook size={iconSize} />;
      default:
        return <span>{platform}</span>;
    }
  };
  
  return (
    <a
      href={url}
      aria-label={ariaLabel || platform}
      className="hover:text-brand-accent transition-colors duration-200"
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {getIcon()}
    </a>
  );
};

export default SocialLink;

