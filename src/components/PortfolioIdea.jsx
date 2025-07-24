import React, { useState } from 'react';
import API from '../api';
import ReactMarkdown from 'react-markdown';

export default function PortfolioIdea() {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);

  const generateIdea = async () => {
    setLoading(true);
    setIdea('');
    try {
      const res = await API.post('/portfolio/idea');
      setIdea(res.data?.idea || 'No response.');
    } catch {
      setIdea('❌ Failed to generate.');
    } finally {
      setLoading(false);
    }
  };

  const downloadMarkdown = () => {
    const blob = new Blob([idea], { type: 'text/markdown' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'README.md';
    link.click();
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '720px', margin: 'auto'}}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem',color:'#400E0E' }}>
        Portfolio Project Generator
      </h2>
      <p style={{ marginBottom: '1rem', color: '#555' }}>
        Looking for a standout project for your GitHub profile or resume? Click below and get a full-blown idea complete with a GitHub-ready pitch and features list — powered by AI.
      </p>

      <button
        onClick={generateIdea}
        disabled={loading}
        style={{
          padding: '0.6rem 1.2rem',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '6px',
          background: '#400E0E',
          color: '#fff',
          cursor: 'pointer'
        }}
      >
        {loading ? '💡 Thinking...' : idea ? '🔁 Regenerate Idea' : 'Generate Project Idea'}
      </button>

      {idea && (
        <>
          <hr style={{ margin: '2rem 0', borderColor: '#eee' }} />
          <ReactMarkdown>{idea}</ReactMarkdown>

          <button
            onClick={downloadMarkdown}
            style={{
              marginTop: '1.5rem',
              padding: '0.6rem 1.2rem',
              background: '#400E0E',
              fontWeight:'bold',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            📄 Download as README.md
          </button>
        </>
      )}
    </div>
  );
}
