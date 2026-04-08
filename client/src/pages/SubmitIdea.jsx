import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Sparkles, Loader2 } from 'lucide-react';

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
      const response = await axios.post('http://localhost:5001/api/ideas', {
        title,
        description
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
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="text-center mb-4">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Validate Your Idea</h1>
        <p className="text-muted">Let AI analyze your startup concept in seconds.</p>
      </div>

      <form onSubmit={handleSubmit} className="card interactive">
        <div className="input-group">
          <label className="input-label" htmlFor="title">Startup Name / Title</label>
          <input
            id="title"
            className="input-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. AcmeCorp"
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
            placeholder="Explain what it does, who it's for, and why it matters..."
            disabled={loading}
          />
        </div>

        {error && <div className="mb-4 text-center" style={{ color: 'var(--danger)' }}>{error}</div>}

        <button type="submit" className="btn-primary w-full" style={{ justifyContent: 'center' }} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-pulse" size={20} />
              Analyzing Market...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Generate Validation Report
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SubmitIdea;
