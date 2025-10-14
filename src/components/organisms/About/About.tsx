import React from 'react';

interface AboutProps {
  title: string;
  description: string;
  details: string[];
  image: string;
}

const About: React.FC<AboutProps> = ({ title, description, details, image }) => {
  return (
    <section id="about" className="py-12">
      <div className="container mx-auto px-6 grid md:grid-cols-5 gap-10 items-center">
        <div className="md:col-span-2 rounded-2xl overflow-hidden border border-white/10 bg-brand-bgAlt">
          <div
            className="aspect-[4/5] bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
        <div className="md:col-span-3">
          <h2 className="font-title text-3xl md:text-4xl mb-4">{title}</h2>
          <p className="text-brand-muted leading-relaxed">{description}</p>
          <ul className="mt-6 space-y-2 text-sm text-brand-muted">
            {details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;

