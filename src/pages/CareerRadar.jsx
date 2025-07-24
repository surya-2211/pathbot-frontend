import React, { useEffect, useState } from 'react';
import API from '../api';

export default function CareerRadar() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrends() {
      try {
        const res = await API.get('/trends/github');
        setTrends(res.data);
      } catch (err) {
        console.error('Trend fetch error:', err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTrends();
  }, []);

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '960px', margin: 'auto'}}>
      <h2 style={{ fontSize: '1.9rem', marginBottom: '0.5rem', fontWeight: 700, color: '#400E0E' }}>
        GitHub Career Tech Radar
      </h2>
      <p style={{ color: '#555', marginBottom: '1.5rem' }}>
        Stay ahead of the curve by exploring the latest tools, libraries, and frameworks trending across open-source.
        This feed is updated daily to help you spot what’s rising — so you can learn and build accordingly.
      </p>

      {loading ? (
        <p>🔄 Fetching trending repositories...</p>
      ) : trends.length === 0 ? (
        <p>🚫 No trends available right now. Try again later.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.2rem'
        }}>
          {trends.map((item, i) => (
            <div
              key={i}
              style={{
                background: '#f9fafb',
                padding: '1rem 1.2rem',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '1.1rem', fontWeight: 600, color: '#400E0E', textDecoration: 'none' }}
              >
                {item.tech}
              </a>
              <div style={{ fontSize: 14, color: '#6b7280', marginTop: 6 }}>
                Language: {item.language || 'Unknown'} &nbsp; | &nbsp; ⭐ {item.stars} stars
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
