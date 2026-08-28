import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ContactForm from './ContactForm';

const props = {
  endpoint: 'https://forms.example.test/submit',
  placeholders: { name: 'Your name', email: 'Your email', message: 'Message' },
  submitText: 'Send',
  messages: { success: 'Sent', error: 'Failed', sending: 'Sending', timeout: 'Timed out' },
};

function fillRequiredFields() {
  fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Gabriel' } });
  fireEvent.change(screen.getByPlaceholderText('Your email'), { target: { value: 'gabriel@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Message'), { target: { value: 'Hello' } });
}

describe('ContactForm', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('submits to the configured provider and announces success', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 200 }));
    render(<ContactForm {...props} />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    expect(await screen.findByRole('status')).toHaveTextContent('Sent');
    expect(fetchMock).toHaveBeenCalledWith(props.endpoint, expect.objectContaining({ method: 'POST' }));
  });

  it('silently accepts honeypot submissions without contacting the provider', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const { container } = render(<ContactForm {...props} />);
    fillRequiredFields();
    fireEvent.change(container.querySelector('input[name="website"]')!, { target: { value: 'spam' } });
    fireEvent.submit(container.querySelector('form')!);

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Sent'));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('announces a request timeout', async () => {
    vi.useFakeTimers();
    vi.spyOn(globalThis, 'fetch').mockImplementation((_url, init) => new Promise((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
    }));
    render(<ContactForm {...props} />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10_000);
    });

    expect(screen.getByRole('status')).toHaveTextContent('Timed out');
  });
});
