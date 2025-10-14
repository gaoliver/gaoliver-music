import React from 'react';

interface AboutProps {
  title: string;
  description: string;
  details: string[];
  image: string;
  backgroundImage?: string;
}

const About: React.FC<AboutProps> = ({ title, description, details, image, backgroundImage }) => {
  const bgImage = backgroundImage || image;
  
  return (
    <section id="about" className="relative pt-24 pb-12 overflow-hidden">
      {/* Background Image with Blur and Fade */}
      {bgImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ 
            backgroundImage: `url(${bgImage})`,
            filter: 'blur(4px)',
            transform: 'scale(1.1)'
          }}
        />
      )}
      
      {/* Radial Vignette Overlay - Dark edges, lighter center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(18,18,18,0.5)_45%,_rgba(18,18,18,0.9)_100%)]" />
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-5 gap-10 items-center">
          {/* Left Image */}
          <div className="md:col-span-2 rounded-2xl overflow-hidden border border-white/10 bg-brand-bgAlt shadow-soft">
            <div
              className="aspect-[4/5] bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
          
          {/* Right Content */}
          <div className="md:col-span-3">
            <h2 className="font-title text-3xl md:text-4xl mb-4">{title}</h2>
            <p className="text-brand-text leading-relaxed">{description}</p>
            <ul className="mt-6 space-y-2 text-sm text-brand-muted">
              {details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

