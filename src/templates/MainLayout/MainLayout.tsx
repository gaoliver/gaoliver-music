import React from 'react';
import Header from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';
import BackgroundMedia from '../../components/media/BackgroundMedia';
import { siteContent } from '../../data';
import { useNavigate } from 'react-router';

interface MainLayoutProps {
  children: React.ReactNode;
  onNavClick?: (href: string) => void;
  /**
   * Route-specific backdrop. Supports an optional looping video, which is
   * suppressed for reduced-motion users. Defaults to the shared site image.
   */
  background?: { image: string; video?: string; poster?: string };
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, onNavClick, background }) => {
  const navigate = useNavigate();
  const handleNavClick = (href: string) => {
    if (onNavClick) return onNavClick(href);
    if (href.startsWith('#')) {
      if (window.location.pathname !== '/') navigate(`/${href}`); else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else navigate(href);
  };
  return (
    /* Flex column so a full-height route (the homepage hero) can fill exactly
       the space left between header and footer, with no magic offsets. */
    <div className="flex min-h-svh flex-col text-brand-text font-body antialiased">
      <BackgroundMedia
        image={background?.image ?? siteContent.backgroundImage}
        video={background?.video}
        poster={background?.poster}
        overlay="rgba(10, 10, 10, 0.4)"
        className="background-media--fixed"
      />
      <Header
        navigation={siteContent.navigation}
        cta={siteContent.headerCta}
        socialLinks={siteContent.socialLinks}
        onNavClick={handleNavClick}
      />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer copyright={siteContent.footer.copyright} socialLinks={siteContent.socialLinks} />
    </div>
  );
};

export default MainLayout;
