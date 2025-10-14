import React, { useState } from 'react';
import Input from '../../atoms/Input';
import Textarea from '../../atoms/Textarea';
import Button from '../../atoms/Button';

interface ContactFormProps {
  endpoint: string;
  placeholders: {
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

const ContactForm: React.FC<ContactFormProps> = ({ endpoint, placeholders, submitText, messages }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else {
        setStatus('error');
        // Reset error message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      }
    } catch (error) {
      setStatus('error');
      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim();

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <Input
        name="name"
        placeholder={placeholders.name}
        value={formData.name}
        onChange={handleChange}
        required
        disabled={status === 'sending'}
      />
      <Input
        name="email"
        type="email"
        placeholder={placeholders.email}
        value={formData.email}
        onChange={handleChange}
        required
        disabled={status === 'sending'}
      />
      <Textarea
        name="message"
        rows={5}
        placeholder={placeholders.message}
        value={formData.message}
        onChange={handleChange}
        required
        disabled={status === 'sending'}
      />
      
      {/* Status Messages */}
      {status === 'success' && (
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
          {messages.success}
        </div>
      )}
      
      {status === 'error' && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
          {messages.error}
        </div>
      )}
      
      <Button 
        type="submit" 
        variant="primary" 
        className="justify-self-start"
        disabled={!isFormValid || status === 'sending'}
      >
        {status === 'sending' ? messages.sending : submitText}
      </Button>
    </form>
  );
};

export default ContactForm;

