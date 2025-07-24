import React from 'react';
import './Dashboard.css';
import Sidebar from '../components/UserSidebar';
import ChatInterface from './ConversationPage';
import RoadmapGenerator from '../components/RoadmapGenerator';
import PortfolioIdea from '../components/PortfolioIdea';
import ElevatorPitchBuilder from './ElevatorPitchBuilder';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; // ✅ Import context

export default function Dashboard() {
  const { user } = useAuth(); // ✅ Access logged-in user

  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <h2 className="dashboard-header">👋 Welcome, {user?.name || 'Explorer'}!</h2>

        <div className="dashboard-subtext">
          Your AI-powered co-pilot for roadmap building, pitch creation, and portfolio ideas.
        </div>

        <motion.div className="dashboard-card" {...fadeIn}>
          <h3>💬 Chat with CareerGPT</h3>
          <p>Stuck on what to do next in your career? Talk to your AI mentor about trends, options, or goals.</p>
          <ChatInterface user={user} />
        </motion.div>

        <motion.div className="dashboard-card" {...fadeIn}>
          <h3>🧭 Roadmap Generator</h3>
          <p>Create a step-by-step learning path toward your next role or skill goal.</p>
          <RoadmapGenerator user={user} />
        </motion.div>

        <motion.div className="dashboard-card" {...fadeIn}>
          <h3>🚀 Portfolio Project Generator</h3>
          <p>Need project inspiration? Generate ready-to-build portfolio ideas with real-world use cases.</p>
          <PortfolioIdea />
        </motion.div>

        <motion.div className="dashboard-card" {...fadeIn}>
          <h3>🎙️ Elevator Pitch Builder</h3>
          <p>Craft confident, recruiter-friendly self-introductions in multiple formats.</p>
          <ElevatorPitchBuilder />
        </motion.div>

        <motion.div className="dashboard-card muted-card" {...fadeIn}>
          <h3>📌 Recent Tips</h3>
          <ul className="dashboard-tips">
            <li>• Try combining a roadmap with a generated project for double impact</li>
            <li>• Your elevator pitch can be reused for LinkedIn and your portfolio</li>
            <li>• Hiring trends are shifting fast — ask CareerGPT about “2025-proof” skills</li>
          </ul>
        </motion.div>
      </main>
    </div>
  );
}
