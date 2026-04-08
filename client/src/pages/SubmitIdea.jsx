import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Sparkles, Loader2, Zap } from 'lucide-react';

const SubmitIdea = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError('Please fill out all fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/ideas`, {
        title,
        description,
      });
      navigate(`/idea/${response.data._id}`);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze the idea. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '640px', margin: '0 auto', paddingTop: '2rem' }}>

      {/* Hero */}
      <div className="text-center mb-4" style={{ marginBottom: '2.5rem' }}>
        <h1 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
          fontWeight: 800,
          lineHeight: 1.12,
          letterSpacing: '-0.035em',
          margin: '0 0 1rem',
          color: '#1c1c1e',
        }}>
          Validate Your
          <br />
          <span style={{
            background: 'linear-gradient(125deg, #5b5bd6 0%, #9333ea 50%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontStyle: 'italic',
            backgroundSize: '200% auto',
            animation: 'gradientShift 4s ease infinite',
          }}>
            Startup Idea
          </span>
        </h1>
        <style>{`
          @keyframes gradientShift {
            0%   { background-position: 0% center; }
            50%  { background-position: 100% center; }
            100% { background-position: 0% center; }
          }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
        <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '460px', margin: '0 auto' }}>
          Describe your concept and get an AI-generated analysis — market size, competitors, risks, and more in seconds.
        </p>
      </div>

      {/* Form Card */}
      <div className="card" style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        padding: '2rem',
      }}>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="title">Startup Name</label>
            <input
              id="title"
              className="input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. GymBuddy, FoodieBot, SkillSwap"
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="description">Core Concept</label>
            <textarea
              id="description"
              className="input-field"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain what it does, who it's for, and why it matters. The more detail, the better the analysis..."
              disabled={loading}
            />
          </div>

          {error && (
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              background: 'rgba(255, 77, 109, 0.1)',
              border: '1px solid rgba(255, 77, 109, 0.3)',
              color: '#ff4d6d',
              fontSize: '0.875rem',
              marginBottom: '1.25rem',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary w-full"
            style={{ justifyContent: 'center', padding: '0.9rem', fontSize: '0.95rem', borderRadius: '12px' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate Validation Report
              </>
            )}
          </button>
        </form>
      </div>



      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default SubmitIdea;
