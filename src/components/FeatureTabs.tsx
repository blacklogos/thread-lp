import React, { useState } from 'react';

interface TabContent {
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export default function FeatureTabs({ tabs }: { tabs: TabContent[] }) {
  const [activeTab, setActiveTab] = useState(0);

  const trackEvent = (tabName: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'feature_tab_click', { 
        category: 'feature_tabs',
        label: tabName
      });
    }
  };

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    trackEvent(tabs[idx].title);
  };

  return (
    <div className="feature-tabs">
      <div className="tabs-header">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            className={`tab ${idx === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(idx)}
            role="tab"
            aria-selected={idx === activeTab}
            aria-controls={`panel-${idx}`}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-title">{tab.title}</span>
          </button>
        ))}
      </div>

      <div className="tabs-content">
        {tabs.map((tab, idx) => (
          <div
            key={idx}
            id={`panel-${idx}`}
            className={`tab-panel ${idx === activeTab ? 'active' : ''}`}
            role="tabpanel"
            aria-labelledby={`tab-${idx}`}
          >
            <h3>{tab.title}</h3>
            <p>{tab.description}</p>
            <ul>
              {tab.features.map((feature, fidx) => (
                <li key={fidx}>✓ {feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <style>{`
        .feature-tabs {
          width: 100%;
        }

        .tabs-header {
          display: flex;
          gap: 1rem;
          border-bottom: 2px solid #e5e7eb;
          overflow-x: auto;
          scroll-behavior: smooth;
        }

        .tab {
          padding: 1rem 1.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          font-weight: 600;
          color: #65676b;
          transition: all 0.2s;
          border-bottom: 3px solid transparent;
          margin-bottom: -2px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
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

        .tab-icon {
          font-size: 1.25rem;
        }

        .tabs-content {
          padding: 2rem 0;
        }

        .tab-panel {
          display: none;
          animation: fadeIn 0.3s ease-in-out;
        }

        .tab-panel.active {
          display: block;
        }

        .tab-panel h3 {
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .tab-panel p {
          margin-bottom: 1.5rem;
          color: #65676b;
          line-height: 1.6;
        }

        .tab-panel ul {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .tab-panel li {
          padding: 0.75rem;
          background: #f7f8fa;
          border-radius: 8px;
          border-left: 3px solid #0095f6;
          padding-left: 1rem;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .tabs-header {
            gap: 0.5rem;
          }

          .tab {
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
          }

          .tab-title {
            display: none;
          }

          .tab.active .tab-title {
            display: inline;
          }
        }
      `}</style>
    </div>
  );
}
