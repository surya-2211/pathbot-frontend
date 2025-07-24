import React, { useState } from 'react';
import API from '../api'; // Your axios instance
import ReactMarkdown from 'react-markdown';

export default function RoadmapGenerator() {
  const [goal, setGoal] = useState('');
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goal.trim()) return;

    setLoading(true);
    setRoadmap('');

    try {
      const res = await API.post('/roadmap', { goal });
      setRoadmap(res.data?.roadmap || 'No roadmap generated.');
    } catch (err) {
      setRoadmap('❌ Failed to generate roadmap.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
  try {
    const res = await API.post('/roadmap/pdf', { roadmap }, { responseType: 'blob' });
    const blob = new Blob([res.data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'career-roadmap.pdf';
    link.click();
  } catch {
    alert('❌ Failed to download roadmap.');
  }
};

  return (
  <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto'}}>
    <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem',color:'#400E0E' }}>Career Roadmap Generator</h2>
    <p style={{ color: '#555', marginBottom: '1.5rem' }}>
      Not sure what steps to take next? Let me build you a personalized roadmap toward your goal.
      Whether you want to become a <strong>cloud architect</strong>, <strong>AI engineer</strong>, or <strong>product designer</strong> — this tool will give you a step-by-step plan based on current trends and skills.
    </p>

    <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="e.g., Become a machine learning engineer"
        required
        style={{
          width: '360px',
          padding: '0.6rem',
          fontSize: '1rem',
          borderRadius: '6px',
          border: '1px solid #ccc',
          marginRight: '1rem',
        }}
      />
      <button type="submit" style={{
        padding: '0.6rem 1rem',
        fontSize: '1rem',
        borderRadius: '6px',
        border: 'none',
        background: '#400E0E',
        color: 'white',
        cursor: 'pointer'
      }}>
        Generate
      </button>
    </form>

    <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

    {loading && <p>⏳ Generating your roadmap...</p>}

    {roadmap && (
      <>
        <ReactMarkdown>{roadmap}</ReactMarkdown>
        <button
          onClick={handleDownloadPDF}
          style={{
            marginTop: '1rem',
            padding: '0.6rem 1rem',
            background: '#400E0E',
            fontWeight:'bold',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          📄 Download as PDF
        </button>
      </>
    )}
  </div>
);

}
