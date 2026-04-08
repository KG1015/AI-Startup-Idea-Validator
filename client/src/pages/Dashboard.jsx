import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/ideas');
        setIdeas(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchIdeas();
  }, []);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    if (!window.confirm('Delete this idea?')) return;
    try {
      await axios.delete(`http://localhost:5001/api/ideas/${id}`);
      setIdeas(ideas.filter(idea => idea._id !== id));
    } catch (error) {
      console.error('Failed to delete', error);
    }
  };

  if (loading) {
    return <div className="text-center mt-4 text-muted animate-pulse">Loading dashboard...</div>;
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 style={{ margin: 0 }}>Your Startup Ideas</h2>
        <Link to="/" className="btn-primary" style={{ textDecoration: 'none' }}>New Idea</Link>
      </div>

      {ideas.length === 0 ? (
        <div className="card text-center text-muted mt-4">
          <p>No ideas validated yet. Go build something great!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 mt-4">
          {ideas.map((idea) => (
            <Link to={`/idea/${idea._id}`} key={idea._id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card interactive flex flex-col justify-between" style={{ height: '100%' }}>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 style={{ margin: 0 }}>{idea.title}</h3>
                    <div className="chip" style={{ borderColor: idea.analysis.riskLevel === 'High' ? 'var(--danger)' : idea.analysis.riskLevel === 'Medium' ? 'var(--warning)' : 'var(--accent)', color: idea.analysis.riskLevel === 'High' ? 'var(--danger)' : idea.analysis.riskLevel === 'Medium' ? 'var(--warning)' : 'var(--accent)' }}>
                      Risk: {idea.analysis.riskLevel}
                    </div>
                  </div>
                  <p className="text-muted" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {idea.description}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <div className="flex items-center gap-2" style={{ color: 'var(--primary)', fontWeight: 500 }}>
                    View Report <ArrowRight size={16} />
                  </div>
                  <button onClick={(e) => handleDelete(idea._id, e)} className="btn-secondary" style={{ padding: '0.4rem', border: 'none' }}>
                    <Trash2 size={16} color="var(--danger)" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
