import React from 'react';
import googlebut from '../Images/google.png'
export default function GoogleButton({ text = 'Continue with Google' }) {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div style={{display:'flex',
      justifyContent:'center',
      alignItems:'center'
    }}>
      <button
      onClick={handleGoogleLogin}
      style={{
        padding: '0.6rem 1rem',
        border: '1px solid #ddd',
        borderRadius: '20px',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer',
        marginTop: 12,
        fontWeight:600,
        justifyContent:'center',
        fontSize:'18px',
        color:'black'
      }}
    >
      <img src={googlebut} alt="Google" width={20} />
      <span style={{ fontWeight: 500 }}>{text}</span>
    </button>
    </div>
  );
}
