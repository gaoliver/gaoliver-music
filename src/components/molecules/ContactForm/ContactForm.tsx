import React, { useEffect, useRef, useState } from 'react';
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
    timeout?: string;
  };
}

const REQUEST_TIMEOUT_MS = 10_000;
const STATUS_RESET_MS = 5_000;

const ContactForm: React.FC<ContactFormProps> = ({ endpoint, placeholders, submitText, messages }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'timeout'>('idle');
  const abortControllerRef = useRef<AbortController | null>(null);
  const statusResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      abortControllerRef.current?.abort();
      if (statusResetRef.current) clearTimeout(statusResetRef.current);
    };
  }, []);

  const resetStatusLater = () => {
    if (statusResetRef.current) clearTimeout(statusResetRef.current);
    statusResetRef.current = setTimeout(() => {
      if (mountedRef.current) setStatus('idle');
    }, STATUS_RESET_MS);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    abortControllerRef.current?.abort();
    if (statusResetRef.current) clearTimeout(statusResetRef.current);

    if (honeypot.trim()) {
      setStatus('success');
      resetStatusLater();
      return;
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    const timeoutId = setTimeout(() => abortController.abort(), REQUEST_TIMEOUT_MS);
    setStatus('sending');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, website: honeypot }),
        signal: abortController.signal,
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        resetStatusLater();
      } else {
        setStatus('error');
        resetStatusLater();
      }
    } catch (error) {
      if (!mountedRef.current) return;
      if (error instanceof DOMException && error.name === 'AbortError') {
        setStatus('timeout');
      } else {
        setStatus('error');
      }
      resetStatusLater();
    } finally {
      clearTimeout(timeoutId);
      if (abortControllerRef.current === abortController) {
        abortControllerRef.current = null;
      }
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
        label="Name"
        name="name"
        placeholder={placeholders.name}
        value={formData.name}
        onChange={handleChange}
        required
        disabled={status === 'sending'}
      />
      <input
        name="website"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-px w-px overflow-hidden opacity-0"
      />
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder={placeholders.email}
        value={formData.email}
        onChange={handleChange}
        required
        disabled={status === 'sending'}
      />
      <Textarea
        label="Message"
        name="message"
        rows={5}
        placeholder={placeholders.message}
        value={formData.message}
        onChange={handleChange}
        required
        disabled={status === 'sending'}
      />
      
      {/* Status Messages */}
      {status !== 'idle' && (
        <div
          className={`rounded-lg border p-4 ${status === 'success' ? 'border-green-500/20 bg-green-500/10 text-green-400' : status === 'sending' ? 'border-white/15 bg-white/5 text-white/75' : 'border-red-500/20 bg-red-500/10 text-red-400'}`}
          aria-live="polite"
          role="status"
        >
          {status === 'success' && messages.success}
          {status === 'sending' && messages.sending}
          {status === 'error' && messages.error}
          {status === 'timeout' && (messages.timeout || 'The request timed out. Please try again.')}
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
