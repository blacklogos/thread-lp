import React, { useState } from 'react';

interface ComparisonView {
  view: string;
  data: string[][];
}

export default function ComparisonSlider({ views }: { views: ComparisonView[] }) {
  const [currentView, setCurrentView] = useState(0);

  const trackEvent = (viewName: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'comparison_view_change', {
        category: 'comparison_slider',
        label: viewName
      });
    }
  };

  const handleViewChange = (index: number) => {
    setCurrentView(index);
    trackEvent(views[index].view);
  };

  const data = views[currentView]?.data || [];

  return (
    <div className="comparison-slider">
      <div className="view-tabs">
        {views.map((view, idx) => (
          <button
            key={idx}
            className={`tab ${idx === currentView ? 'active' : ''}`}
            onClick={() => handleViewChange(idx)}
            role="tab"
            aria-selected={idx === currentView}
          >
            {view.view}
          </button>
        ))}
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {data[0]?.map((header, idx) => (
                <th key={idx}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, ridx) => (
              <tr key={ridx}>
                {row.map((cell, cidx) => (
                  <td key={cidx} className={cidx === 0 ? 'feature' : ''}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .comparison-slider {
          width: 100%;
        }

        .view-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .tab {
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          font-weight: 600;
          color: #65676b;
          transition: all 0.2s;
          border-bottom: 3px solid transparent;
          margin-bottom: -2px;
        }

        .tab:hover {
          color: #0095f6;
        }

        .tab.active {
          color: #0095f6;
          border-bottom-color: #0095f6;
        }

        .tab:focus {
          outline: 2px solid #0095f6;
          outline-offset: -2px;
        }

        .table-wrapper {
          overflow-x: auto;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
        }

        thead {
          background: #f7f8fa;
        }

        th {
          padding: 1.5rem;
          text-align: left;
          font-weight: 600;
          border-bottom: 2px solid #e5e7eb;
          font-size: 0.95rem;
        }

        td {
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          font-size: 0.95rem;
        }

        td.feature {
          font-weight: 600;
          color: #000;
        }

        tbody tr:last-child td {
          border-bottom: none;
        }

        tbody tr:hover {
          background: #f7f8fa;
        }

        @media (max-width: 768px) {
          .view-tabs {
            gap: 0.5rem;
          }

          .tab {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }

          th,
          td {
            padding: 1rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}
