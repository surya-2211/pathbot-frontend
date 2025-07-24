import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ConversationPage from './pages/ConversationPage';
import LandingPage from './pages/LandingPage';
import PrivateRoute from './components/PrivateRoute';
import CareerRadar from './pages/CareerRadar';
import OAuthSuccess from './pages/OAuthSuccess';
import RoadmapPage from './pages/RoadmapPage';
import PortfolioIdea from './components/PortfolioIdea';
import ElevatorPitchBuilder from './pages/ElevatorPitchBuilder';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={
          <PrivateRoute>
            <ConversationPage />
          </PrivateRoute>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/career-radar" element={<CareerRadar />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path='/roadmap' element={<RoadmapPage/>}/>
        <Route path='/portfolio' element={<PortfolioIdea/>}/>
        <Route path='/pitch' element={<ElevatorPitchBuilder/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
