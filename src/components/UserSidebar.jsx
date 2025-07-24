import React, { useState, useRef, useEffect } from 'react';

export default function UserSidebar({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef();

  useEffect(() => {
    const closeOnClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', closeOnClickOutside);
    return () => document.removeEventListener('mousedown', closeOnClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div style={{ position: 'relative' }} ref={boxRef}>
      {/* Avatar circle */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          width: 42,
          height: 42,
          borderRadius: '50%',
          backgroundColor: '#3b82f6',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          fontSize: 18,
          cursor: 'pointer',
        }}
      >
        {user.name?.[0]?.toUpperCase() || 'U'}
      </div>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 50,
            right: 0,
            width: 220,
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            padding: 16,
            zIndex: 10,
          }}
        >
          <div style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>
            {user.name}
          </div>
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>
            {user.email}
          </div>
          <div
            onClick={onLogout}
            style={{
              fontSize: 14,
              color: '#f87171',
              cursor: 'pointer',
              marginTop: 8,
            }}
          >
            🔓 Sign out
          </div>
        </div>
      )}
    </div>
  );
}
