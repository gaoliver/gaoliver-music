import React from 'react';
import Header from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';
import siteData from '../../data/site.json';

interface MainLayoutProps {
  children: React.ReactNode;
  onNavClick?: (href: string) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, onNavClick }) => {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-body antialiased">
      <Header 
        navigation={siteData.navigation} 
        cta={siteData.headerCta}
        onNavClick={onNavClick} 
      />
      <main>{children}</main>
      <Footer copyright={siteData.footer.copyright} socialLinks={siteData.socialLinks} />
    </div>
  );
};

export default MainLayout;

