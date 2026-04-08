import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Lightbulb, LayoutDashboard } from 'lucide-react';
import SubmitIdea from './pages/SubmitIdea';
import Dashboard from './pages/Dashboard';
import IdeaDetail from './pages/IdeaDetail';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/" className="nav-brand">
            <Lightbulb size={24} color="#6366f1" />
            <span>ValidateIt AI</span>
          </Link>
          <div className="nav-links flex items-center">
            <Link to="/">New Idea</Link>
            <Link to="/dashboard" className="flex items-center gap-2" style={{ marginLeft: '1.5rem' }}>
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
          </div>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<SubmitIdea />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/idea/:id" element={<IdeaDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
