import React, { useState } from 'react';
import API from '../api';
import ReactMarkdown from 'react-markdown';

export default function ElevatorPitchBuilder() {
  const [form, setForm] = useState({
    name: '',
    role: '',
    skills: '',
    goal: '',
    format: 'elevator',
  });

  const [pitch, setPitch] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    setLoading(true);
    setPitch('');
    try {
      const res = await API.post('/pitch/generate', form);
      setPitch(res.data?.pitch || 'No response.');
    } catch {
      setPitch('❌ Failed to generate pitch.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pitch);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert('⚠️ Failed to copy text.');
    }
  };

  const downloadPitch = () => {
    const blob = new Blob([pitch], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${form.format}-pitch.txt`;
    link.click();
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto'}}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem',color:'#400E0E' }}>Elevator Pitch Generator</h2>
      <p style={{ color: '#555', marginBottom: '1.5rem' }}>
        Impress employers, collaborators, or your future self with a powerful self-intro. Fill in your details and
        choose a format. We’ll help you sound sharp, clear, and unforgettable.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
        <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} />
        <input name="role" placeholder="Your Current Role" value={form.role} onChange={handleChange} />
        <input name="skills" placeholder="Key Skills (comma-separated)" value={form.skills} onChange={handleChange} />
        <input name="goal" placeholder="Your Career Goal" value={form.goal} onChange={handleChange} />
        <select name="format" value={form.format} onChange={handleChange}>
          <option value="elevator">Elevator Pitch</option>
          <option value="resume">Resume Summary</option>
          <option value="linkedin">LinkedIn About</option>
          <option value="portfolio">Portfolio Blurb</option>
        </select>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          padding: '0.6rem 1.2rem',
          background: '#400E0E',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        {loading ? 'Crafting pitch...' : pitch ? '🔁 Regenerate Pitch' : 'Generate Pitch'}
      </button>

      {pitch && (
        <div style={{ marginTop: '2rem' }}>
          <ReactMarkdown>{pitch}</ReactMarkdown>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              onClick={copyToClipboard}
              style={{
                padding: '0.5rem 1rem',
                background: '#6C4848',
                fontWeight:'bold',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {copied ? '✅ Copied!' : '📋 Copy to Clipboard'}
            </button>

            <button
              onClick={downloadPitch}
              style={{
                padding: '0.5rem 1rem',
                background: '#6C4848',
                fontWeight:'bold',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              📥 Download Pitch
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
