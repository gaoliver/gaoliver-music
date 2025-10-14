import React, { useState } from 'react';
import Input from '../../atoms/Input';
import Textarea from '../../atoms/Textarea';
import Button from '../../atoms/Button';

interface ContactFormProps {
  placeholders: {
    name: string;
    email: string;
    message: string;
  };
  submitText: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ placeholders, submitText }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form is visual only for now
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <Input
        name="name"
        placeholder={placeholders.name}
        value={formData.name}
        onChange={handleChange}
      />
      <Input
        name="email"
        type="email"
        placeholder={placeholders.email}
        value={formData.email}
        onChange={handleChange}
      />
      <Textarea
        name="message"
        rows={5}
        placeholder={placeholders.message}
        value={formData.message}
        onChange={handleChange}
      />
      <Button type="submit" variant="primary" className="justify-self-start">
        {submitText}
      </Button>
    </form>
  );
};

export default ContactForm;

