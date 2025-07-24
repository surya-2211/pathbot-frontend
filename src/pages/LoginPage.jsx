import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import GoogleButton from '../components/GoogleButton';
import './LoginPage.css'
import logo from '../Images/logo.png';
import vector1 from '../Images/Vector1.png'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/chat');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };
  function gotoreg(){
    navigate('/register')
  }
  return (
    <div>
      <img src={vector1} alt='vector' className='ve1' />
      <header>
          <div>
            <img src={logo} alt='logo' className='logo' />
          </div>
          <div>
            <p className='logon'>Pathbot</p>
          </div>
        </header>
      <p className='pp1'>WELCOME BACK</p>
      <p className='pp2'>Good to see you! Let's walk your path</p>
      <p className='pp3'>Doesn't have an account? <span><button onClick={gotoreg}>Register here</button></span></p>
      <form onSubmit={handleSubmit} className="form">
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

      <button type="submit" className='lbut'>Sign In</button>
    </form>

      <p className="p4">------ Or continue with ------</p>
      <GoogleButton text="Log in with Google" />
    </div>
  );
}
