import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/chat');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return <p>Authenticating...</p>;
}
