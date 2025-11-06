import React, { useState } from 'react';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  const trackEvent = (action: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, { category: 'testimonial_carousel' });
    }
  };

  const handleNext = () => {
    next();
    trackEvent('testimonial_next');
  };

  const handlePrev = () => {
    prev();
    trackEvent('testimonial_prev');
  };

  return (
    <div className="carousel-container">
      <div className="carousel-content">
        <div className="avatar">{testimonials[current].avatar}</div>
        <blockquote>{testimonials[current].quote}</blockquote>
        <cite>
          <strong>{testimonials[current].name}</strong>
          <span>{testimonials[current].role}</span>
        </cite>
      </div>

      <div className="carousel-controls">
        <button onClick={handlePrev} className="carousel-btn prev" aria-label="Previous testimonial">
          ←
        </button>
        <div className="carousel-dots">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === current ? 'active' : ''}`}
              onClick={() => {
                setCurrent(idx);
                trackEvent('testimonial_dot_click');
              }}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
        <button onClick={handleNext} className="carousel-btn next" aria-label="Next testimonial">
          →
        </button>
      </div>

      <style>{`
        .carousel-container {
          max-width: 600px;
          margin: 0 auto;
          background: linear-gradient(135deg, #f7f8fa 0%, #fff 100%);
          padding: 3rem 2rem;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }

        .carousel-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: center;
          min-height: 250px;
          justify-content: center;
        }

        .avatar {
          font-size: 3rem;
          line-height: 1;
        }

        blockquote {
          font-style: italic;
          color: #000;
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
        }

        cite {
          font-style: normal;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-size: 0.85rem;
          color: #65676b;
        }

        cite strong {
          color: #000;
        }

        .carousel-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          margin-top: 2rem;
        }

        .carousel-btn {
          background: #0095f6;
          color: white;
          border: none;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 44px;
        }

        .carousel-btn:hover {
          background: #0084d9;
          transform: scale(1.1);
        }

        .carousel-btn:focus {
          outline: 2px solid #0095f6;
          outline-offset: 2px;
        }

        .carousel-dots {
          display: flex;
          gap: 0.5rem;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d1d5db;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .dot.active {
          background: #0095f6;
          width: 24px;
          border-radius: 4px;
        }

        .dot:hover {
          background: #0095f6;
        }

        .dot:focus {
          outline: 2px solid #0095f6;
          outline-offset: 2px;
        }

        @media (max-width: 768px) {
          .carousel-container {
            padding: 2rem 1rem;
          }

          .carousel-controls {
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
