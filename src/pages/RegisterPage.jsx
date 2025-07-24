import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import GoogleButton from '../components/GoogleButton';
import './RegisterPage.css';
import logo from '../Images/logo.png';
import vector1 from '../Images/Vector1.png'
export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <img src={vector1} alt='vector' className='ve1' />
      <header>
        <div>
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div>
          <p className="logon">Pathbot</p>
        </div>
      </header>

      <p className="p1">CREATE YOUR ACCOUNT</p>
      <p className="p2">Quick, easy signup to unlock your path</p>
      <p className="p3">
        Already have an account? <button onClick={goToLogin}>Sign in</button>
      </p>

      <form onSubmit={handleSubmit} className="form">
        <fieldset className="input-wrapper">
          <legend>Name</legend>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </fieldset>

        <fieldset className="input-wrapper">
          <legend>Email</legend>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </fieldset>

        <fieldset className="input-wrapper">
          <legend>Password</legend>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </fieldset>

        <button type="submit" className='cbut'>Create Account</button>
      </form>

      <p className="p4">------ Or continue with ------</p>
      <GoogleButton text="Login with Google" />
    </div>
  );
}
