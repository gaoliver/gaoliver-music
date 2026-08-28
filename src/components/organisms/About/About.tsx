import React from 'react';

interface AboutProps {
  title?: string;
  description: string;
  details: string[];
  image: string;
  backgroundImage?: string;
  lightContent?: boolean;
}

const About: React.FC<AboutProps> = ({ title, description, details, image, lightContent = false }) => {
  // Define color classes based on lightContent prop
  const titleColor = lightContent ? 'text-white' : 'text-brand-text';
  const textColor = lightContent ? 'text-white/90' : 'text-brand-text';
  const mutedColor = lightContent ? 'text-white/70' : 'text-brand-muted';
  
  return (
    <section id="about" className="relative pt-12 pb-12">
      {/* Content sits directly on the page content surface; the cinematic
          backdrop is owned by the site shell. */}
      <div className="relative z-10">
        <div className="grid md:grid-cols-5 gap-10 items-center">
          {/* Left Image */}
          <div className="md:col-span-2 h-[270px] md:h-auto overflow-hidden bg-brand-bgAlt">
            <div
              className="aspect-[4/5] h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
          
          {/* Right Content */}
          <div className="md:col-span-3">
            {title && <h2 className={`font-title text-3xl md:text-4xl mb-4 ${titleColor}`}>{title}</h2>}
            <div 
              className={`leading-relaxed ${textColor} prose prose-invert max-w-none`}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <ul className={`mt-6 space-y-2 text-sm ${mutedColor}`}>
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

