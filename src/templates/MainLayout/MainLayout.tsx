import React from 'react';
import Header from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';
import { siteContent } from '../../data';
import { useNavigate } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
  onNavClick?: (href: string) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, onNavClick }) => {
  const navigate = useNavigate();
  const handleNavClick = (href: string) => {
    if (onNavClick) return onNavClick(href);
    if (href.startsWith('#')) {
      if (window.location.pathname !== '/') navigate(`/${href}`); else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else navigate(href);
  };
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-body antialiased">
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
