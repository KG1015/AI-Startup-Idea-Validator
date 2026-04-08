import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Trash2, LayoutDashboard, Plus } from 'lucide-react';

const Dashboard = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/ideas`);
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
    e.stopPropagation();
    if (!window.confirm('Delete this idea?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/ideas/${id}`);
      setIdeas(ideas.filter((idea) => idea._id !== id));
    } catch (error) {
      console.error('Failed to delete', error);
    }
  };

  const getRiskColor = (risk) => {
    if (risk === 'High') return { bg: 'rgba(255,77,109,0.1)', border: 'rgba(255,77,109,0.3)', color: '#ff4d6d' };
    if (risk === 'Medium') return { bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.3)', color: '#fbbf24' };
    return { bg: 'rgba(6,214,160,0.1)', border: 'rgba(6,214,160,0.3)', color: '#06d6a0' };
  };

  const getScoreColor = (score) => {
    if (score >= 70) return '#06d6a0';
    if (score >= 40) return '#fbbf24';
    return '#ff4d6d';
  };

  if (loading) {
    return (
      <div className="text-center animate-pulse text-muted" style={{ paddingTop: '4rem', fontSize: '0.9rem' }}>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-4" style={{ marginBottom: '2rem' }}>
        <div className="flex items-center gap-3">
          <div className="section-icon">
            <LayoutDashboard size={18} color="#9d5cff" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
              Your Ideas
            </h2>
            <p className="text-muted" style={{ margin: 0, fontSize: '0.82rem' }}>
              {ideas.length} idea{ideas.length !== 1 ? 's' : ''} validated
            </p>
          </div>
        </div>
        <Link to="/" className="btn-primary" style={{ textDecoration: 'none', borderRadius: '10px' }}>
          <Plus size={16} /> New Idea
        </Link>
      </div>

      {/* Empty state */}
      {ideas.length === 0 ? (
        <div className="card text-center" style={{ padding: '4rem 2rem' }}>
          <div style={{
            width: 60, height: 60, borderRadius: '16px',
            background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem'
          }}>
            <LayoutDashboard size={26} color="#9d5cff" />
          </div>
          <h3 style={{ margin: '0 0 0.5rem', fontWeight: 600 }}>No ideas yet</h3>
          <p className="text-muted" style={{ margin: '0 0 1.5rem', fontSize: '0.9rem' }}>
            Submit your first startup concept and get an AI-generated report.
          </p>
          <Link to="/" className="btn-primary" style={{ textDecoration: 'none' }}>
            <Plus size={16} /> Validate an idea
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2">
          {ideas.map((idea) => {
            const risk = getRiskColor(idea.analysis?.riskLevel);
            const scoreColor = getScoreColor(idea.analysis?.profitabilityScore ?? 0);
            return (
              <Link
                to={`/idea/${idea._id}`}
                key={idea._id}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="card interactive flex flex-col justify-between" style={{ height: '100%', minHeight: '180px' }}>
                  {/* Top */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 style={{ margin: 0, fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
                        {idea.title}
                      </h3>
                      <span style={{
                        fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.65rem',
                        borderRadius: '99px', background: risk.bg, border: `1px solid ${risk.border}`, color: risk.color,
                      }}>
                        {idea.analysis?.riskLevel ?? '—'} Risk
                      </span>
                    </div>
                    <p className="text-muted" style={{
                      margin: 0, fontSize: '0.85rem', lineHeight: 1.6,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {idea.description}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="flex justify-between items-center" style={{
                    marginTop: '1.25rem', paddingTop: '1rem',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <div className="flex items-center gap-2">
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: `conic-gradient(${scoreColor} ${(idea.analysis?.profitabilityScore ?? 0) * 3.6}deg, rgba(255,255,255,0.06) 0deg)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#0a0a0f' }} />
                      </div>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: scoreColor }}>
                        {idea.analysis?.profitabilityScore ?? 0}/100
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#9d5cff', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        View Report <ArrowRight size={13} />
                      </span>
                      <button
                        onClick={(e) => handleDelete(idea._id, e)}
                        style={{
                          background: 'transparent', border: 'none', cursor: 'pointer',
                          padding: '0.3rem', borderRadius: '6px', display: 'flex',
                          transition: 'background 0.2s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,77,109,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <Trash2 size={15} color="#ff4d6d" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
