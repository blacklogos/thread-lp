import React, { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const trackEvent = (action: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, { category: 'newsletter' });
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setStatus('error');
      setMessage('Please enter your email');
      trackEvent('newsletter_submit_error_empty');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email');
      trackEvent('newsletter_submit_error_invalid');
      return;
    }

    setStatus('loading');
    trackEvent('newsletter_submit_start');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks for subscribing! Check your email.');
        setEmail('');
        trackEvent('newsletter_submit_success');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
        trackEvent('newsletter_submit_error_server');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Connection error. Please try again.');
      trackEvent('newsletter_submit_error_connection');
    }
  };

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          aria-label="Email address"
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>

      {message && (
        <p className={`form-message ${status}`} role="alert">
          {message}
        </p>
      )}

      <p className="form-privacy">
        We respect your privacy. Unsubscribe at any time.
      </p>

      <style>{`
        .newsletter-form {
          width: 100%;
          max-width: 400px;
        }

        .form-group {
          display: flex;
          gap: 0.5rem;
        }

        input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s;
        }

        input:focus {
          outline: none;
          border-color: #0095f6;
          box-shadow: 0 0 0 3px rgba(0, 149, 246, 0.1);
        }

        input:disabled {
          background: #f7f8fa;
          cursor: not-allowed;
        }

        button {
          padding: 0.75rem 1.5rem;
          background: #0095f6;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          min-height: 44px;
        }

        button:hover:not(:disabled) {
          background: #0084d9;
          transform: translateY(-2px);
        }

        button:focus {
          outline: 2px solid #0095f6;
          outline-offset: 2px;
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .form-message {
          margin-top: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .form-message.success {
          background: #d1fae5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        .form-message.error {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #fca5a5;
        }

        .form-privacy {
          margin-top: 0.75rem;
          font-size: 0.8rem;
          color: #9ca3af;
          text-align: center;
        }

        @media (max-width: 768px) {
          .form-group {
            flex-direction: column;
          }

          button {
            width: 100%;
          }
        }
      `}</style>
    </form>
  );
}
