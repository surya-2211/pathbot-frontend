import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import logo from '../Images/logo.png';
import vector1 from '../Images/Vector1.png';
import vector2 from '../Images/Vector2.png';

const animatedText = "Pathbot";

export default function LandingPage() {
  const [typedText, setTypedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < animatedText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + animatedText[index]);
        setIndex(index + 1);
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div>
      <img src={vector1} alt='vector' className='v1' />

      <header>
        <div>
          <img src={logo} alt='logo' className='logo' />
        </div>
        <div>
          <p className='logon'>Pathbot</p>
        </div>
      </header>

      <section className='main1'> <p className='main'> Chart the Right Course with <br /> <span className="animated">{typedText}</span> <br /> <span className='maind'> From course selection to career direction,<br /> PathBot’s got your back. </span> </p>

        <div className='butd'>
          <div>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
          <div>
            <Link to="/register">
              <button>Get started for free</button>
            </Link>
          </div>
        </div>
      </section>

      <section className='main2'>
        <div className='card'>
          <p className='m1'>Roadmap Generator</p>
          <p className='m2'>Get a personalized step-by-step plan<br />to reach your career goal.</p>
        </div>
        <div className='card'>
          <p className='m1'>Portfolio Idea Builder</p>
          <p className='m2'>Generate standout project ideas<br />you can ship and showcase.</p>
        </div>
        <div className='card'>
          <p className='m1'>Pitch Crafting Studio</p>
          <p className='m2'>Create stunning elevator pitches,<br />LinkedIn bios, and more.</p>
        </div>
        <div className='card'>
          <p className='m1'>GitHub Trend Tracker</p>
          <p className='m2'>Discover trending tools & tech<br />to build smarter, faster.</p>
        </div>
        <div className='card'>
          <p className='m1'>Context-Aware Chat</p>
          <p className='m2'>Talk to an AI mentor that remembers your goals</p>
        </div>
      </section>

      <img src={vector2} alt='vector' className='v2' />

      <section className='main3'>
        <p> <span>PathBot</span> is your smart career assistant.<br/> It helps students, freshers, and career changers explore options,<br/> gain skills, and move forward — one guided step at a time. </p>
      </section>
    </div>
  );
}
