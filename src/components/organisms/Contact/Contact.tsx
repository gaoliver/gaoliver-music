import React from 'react';
import ContactForm from '../../molecules/ContactForm';

interface ContactProps {
  title: string;
  fields: {
    name: string;
    email: string;
    message: string;
  };
  submitText: string;
}

const Contact: React.FC<ContactProps> = ({ title, fields, submitText }) => {
  return (
    <section id="contact" className="pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="font-title text-3xl md:text-4xl mb-6">{title}</h2>
        <ContactForm placeholders={fields} submitText={submitText} />
      </div>
    </section>
  );
};

export default Contact;

