import React from 'react';
import ContactForm from '../../molecules/ContactForm';

interface ContactProps {
  title: string;
  endpoint: string;
  fields: {
    name: string;
    email: string;
    message: string;
  };
  submitText: string;
  messages: {
    success: string;
    error: string;
    sending: string;
  };
}

const Contact: React.FC<ContactProps> = ({ title, endpoint, fields, submitText, messages }) => {
  return (
    <section id="contact" className="pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="font-title text-3xl md:text-4xl mb-6">{title}</h2>
        <ContactForm 
          endpoint={endpoint}
          placeholders={fields} 
          submitText={submitText}
          messages={messages}
        />
      </div>
    </section>
  );
};

export default Contact;

