interface TabContent {
  title: string;
  description: string;
  features?: string[];
  icon: string;
}

type FeatureTabsProps = {
  tabs?: TabContent[];
};

export default function FeatureTabs({ tabs }: FeatureTabsProps) {
  const safeTabs = tabs ?? [];

  return (
    <div className="feature-list">
      {safeTabs.map((tab, idx) => {
        const features = tab.features ?? [];

        return (
          <article className="feature-card" key={idx}>
            <div className="card-header">
              <span className="icon" aria-hidden>{tab.icon}</span>
              <div className="titles">
                <h3>{tab.title}</h3>
                <p>{tab.description}</p>
              </div>
            </div>
            <ul>
              {features.map((feature, fidx) => (
                <li key={fidx}>{feature}</li>
              ))}
            </ul>
          </article>
        );
      })}

      <style>{`
        .feature-list {
          display: grid;
          gap: 1.5rem;
        }

        .feature-card {
          border: 1px solid var(--border-light);
          border-radius: 16px;
          padding: 1.75rem;
          background: white;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .card-header {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .icon {
          font-size: 1.5rem;
          line-height: 1;
        }

        .titles h3 {
          margin: 0;
          font-size: 1.15rem;
        }

        .titles p {
          margin: 0.35rem 0 0;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        ul {
          display: grid;
          gap: 0.75rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        li {
          font-size: 0.95rem;
          color: var(--text-primary);
          padding-left: 1.5rem;
          position: relative;
        }

        li::before {
          content: '•';
          position: absolute;
          left: 0;
          top: 0;
          color: var(--orange-mid);
          font-size: 1.2rem;
          line-height: 1;
        }

        @media (max-width: 768px) {
          .feature-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
