import React, { useState, useEffect, useRef } from 'react';
import API from '../api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import logo from '../Images/logo.png';
import newchat from '../Images/newchat.png';
import bin from '../Images/bin.png';
import send from '../Images/send.png';
import imag from '../Images/img.png';

import './ConversationPage.css';
import UserSidebar from '../components/UserSidebar';
import RoadmapGenerator from '../components/RoadmapGenerator';
import PortfolioIdea from '../components/PortfolioIdea';
import ElevatorPitchBuilder from '../pages/ElevatorPitchBuilder';
import CareerRadar from '../pages/CareerRadar';

export default function ConversationPage() {
  const [user, setUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedConvo, setSelectedConvo] = useState(null);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 Hi there! I’m Pathbot. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [activeView, setActiveView] = useState('chat');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const [userRes, convoRes] = await Promise.all([
        API.get('/users/me'),
        API.get('/conversations')
      ]);
      setUser(userRes.data);
      setConversations(convoRes.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const loadConversation = async (id) => {
    const res = await API.get(`/conversations/${id}`);
    setSelectedConvo(res.data);
    setMessages(res.data.messages.length > 0
      ? res.data.messages
      : [{ role: 'assistant', content: '📝 Starting fresh. What can I help you with today?' }]
    );
    setActiveView('chat');
    setIsSidebarOpen(false);
  };

  const startNewChat = async () => {
    const res = await API.post('/conversations', { title: 'New Conversation' });
    setSelectedConvo(res.data);
    setMessages([{ role: 'assistant', content: '👋 New conversation started! Ask me anything.' }]);
    setConversations(prev => [res.data, ...prev]);
    setActiveView('chat');
    setIsSidebarOpen(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || !selectedConvo) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    await API.post(`/conversations/${selectedConvo._id}/message`, userMsg);
    try {
      const res = await API.post('/chat', { message: input });
      const aiMsg = { role: 'assistant', content: res.data.response };
      await API.post(`/conversations/${selectedConvo._id}/message`, aiMsg);
      setMessages(prev => [...prev, aiMsg]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '_Assistant is currently unavailable._'
      }]);
    }
  };

  const saveTitle = async (id) => {
    if (!editTitle.trim()) return;
    await API.patch(`/conversations/${id}`, { title: editTitle });
    setEditingId(null);
    setConversations(prev =>
      prev.map(c => (c._id === id ? { ...c, title: editTitle } : c))
    );
  };

  const deleteConversation = async (id) => {
    await API.delete(`/conversations/${id}`);
    setConversations(prev => prev.filter(c => c._id !== id));
    if (selectedConvo?._id === id) {
      setSelectedConvo(null);
      setMessages([
        { role: 'assistant', content: '👋 Hi there! I’m Pathbot. How can I help you today?' }
      ]);
    }
  };

  return (
    <div className="conversation-container">
      <button
        className="mobile-sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <UserSidebar user={user} onLogout={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }} />

        <div className="sidebar-header">
          <h4>🗂️ Conversation History</h4>
          <button onClick={startNewChat} className="newchat-button">
            <img src={newchat} alt="New Chat" />
          </button>
        </div>

        <div className="conversation-list">
          <ul>
            {conversations.map((c) => (
              <li
                key={c._id}
                className={`conversation-item ${selectedConvo?._id === c._id ? 'active' : ''}`}
              >
                <div
                  onClick={() => loadConversation(c._id)}
                  onDoubleClick={() => {
                    setEditingId(c._id);
                    setEditTitle(c.title || '');
                  }}
                  className="conversation-title"
                >
                  {editingId === c._id ? (
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onBlur={() => saveTitle(c._id)}
                      autoFocus
                    />
                  ) : (
                    <span>{c.title || 'Untitled'}</span>
                  )}
                </div>
                <button onClick={() => deleteConversation(c._id)} className="bin-button">
                  <img src={bin} alt="Delete" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar-tools">
          <h4>⚡ Quick Tools</h4>
          <button onClick={() => setActiveView('chat')}>Chat</button>
          <button onClick={() => setActiveView('roadmap')}>Roadmap</button>
          <button onClick={() => setActiveView('portfolio')}>Portfolio</button>
          <button onClick={() => setActiveView('pitch')}>Pitch</button>
          <button onClick={() => setActiveView('radar')}>GitHub Radar</button>
        </div>
      </aside>
      <main className="chat-panel">
        <header className="chat-header">
          <img src={logo} alt="logo" className="chat-logo" />
          <h2 style={{ color: '#400E0E' }}>Pathbot</h2>
        </header>

        {activeView === 'chat' && (
          <>
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-message ${msg.role}`}>
                  <strong>{msg.role === 'user' ? 'You' : 'Pathbot'}:</strong>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input">
              <img src={imag} alt="imag" className="simg" />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask your question..."
              />
              <button onClick={sendMessage} className='sendbut'>
                <img src={send} alt="send" className="send" />
              </button>
            </div>
          </>
        )}

        {activeView === 'roadmap' && <RoadmapGenerator user={user} />}
        {activeView === 'portfolio' && <PortfolioIdea />}
        {activeView === 'pitch' && <ElevatorPitchBuilder />}
        {activeView === 'radar' && <CareerRadar />}
      </main>
    </div>
  );
}
