import React from 'react';
import Header from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';
import { siteContent } from '../../data';
import { useNavigate } from 'react-router';

interface MainLayoutProps {
  children: React.ReactNode;
  onNavClick?: (href: string) => void;
  /** Route-specific cinematic backdrop. Falls back to the shared site image. */
  backgroundImage?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, onNavClick, backgroundImage }) => {
  const navigate = useNavigate();
  const handleNavClick = (href: string) => {
    if (onNavClick) return onNavClick(href);
    if (href.startsWith('#')) {
      if (window.location.pathname !== '/') navigate(`/${href}`); else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else navigate(href);
  };
  return (
    <div className="min-h-screen text-brand-text font-body antialiased">
      <div
        className="shell-backdrop"
        style={{ backgroundImage: `url(${backgroundImage ?? siteContent.backgroundImage})` }}
        aria-hidden="true"
      />
      <Header
        navigation={siteContent.navigation}
        cta={siteContent.headerCta}
        socialLinks={siteContent.socialLinks}
        onNavClick={handleNavClick}
      />
      <main>{children}</main>
      <Footer copyright={siteContent.footer.copyright} socialLinks={siteContent.socialLinks} />
    </div>
  );
};

export default MainLayout;
