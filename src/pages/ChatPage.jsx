import React, { useState, useEffect } from 'react';
import API from '../api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);

  // Load chat history on mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get('/chat/history');
        const formatted = res.data.chats.map(chat => ({
          question: chat.question,
          answer: chat.answer
        }));
        setHistory(formatted.reverse());
        setMessages(formatted.reverse());
      } catch (err) {
        console.error('⚠️ Failed to load history:', err.message);
      }
    };
    fetchHistory();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage = { question: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');

    try {
      const res = await API.post('/chat', { message: input });
      const aiReply = { question: input, answer: res.data.response };
      setMessages((prev) => [...prev.slice(0, -1), aiReply]); // replace question-only with full pair
    } catch {
      const errorReply = { question: input, answer: '_Assistant is currently unavailable._' };
      setMessages((prev) => [...prev.slice(0, -1), errorReply]);
    }
  };

  const startNewChat = () => {
    setMessages([]);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: 250, backgroundColor: '#f3f4f6', padding: 20, borderRight: '1px solid #ddd' }}>
        <h3>CareerGPT</h3>
        <button onClick={startNewChat} style={{ width: '100%', marginBottom: 20 }}>
          ➕ New Chat
        </button>
        <div>
          <strong>History</strong>
          <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
            {history.slice(0, 10).map((chat, i) => (
              <li key={i} style={{ marginTop: 10, fontSize: '0.9rem' }}>
                🗂 {chat.question.slice(0, 40)}...
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Chat Area */}
      <main style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ marginBottom: 10 }}>🎯 Chat with CareerGPT</h2>
        <div style={{ flex: 1, overflowY: 'auto', padding: 10, border: '1px solid #ccc' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div><strong>You:</strong> {msg.question}</div>
              {msg.answer && (
                <div style={{ marginTop: 5 }}>
                  <strong>CareerGPT:</strong>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.answer}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask a career question..."
            style={{ width: '80%', padding: 8 }}
          />
          <button onClick={sendMessage} style={{ padding: '8px 16px', marginLeft: 10 }}>
            Send
          </button>
        </div>
      </main>
    </div>
  );
}
