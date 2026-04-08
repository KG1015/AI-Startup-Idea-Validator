import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Target, AlertTriangle, TrendingUp, Users, Cpu, Briefcase } from 'lucide-react';

const IdeaDetail = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/ideas/${id}`);
        setIdea(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchIdea();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-4 text-muted animate-pulse">Loading report...</div>;
  }

  if (!idea) {
    return <div className="text-center mt-4">Idea not found.</div>;
  }

  const { analysis } = idea;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <Link to="/dashboard" className="flex items-center gap-2 mb-4 text-muted" style={{ textDecoration: 'none' }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="card mb-4" style={{ background: 'linear-gradient(145deg, var(--bg-card) 0%, rgba(99, 102, 241, 0.05) 100%)', border: '1px solid var(--primary)' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', marginTop: 0 }}>{idea.title}</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>{idea.description}</p>

        <div className="flex gap-4 mt-4 pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <div className="flex items-center gap-2 chip">
            <TrendingUp size={16} color="var(--accent)" />
            Score: {analysis.profitabilityScore}/100
          </div>
          <div className="flex items-center gap-2 chip">
            <AlertTriangle size={16} color={analysis.riskLevel === 'High' ? 'var(--danger)' : analysis.riskLevel === 'Medium' ? 'var(--warning)' : 'var(--accent)'} />
            Risk: {analysis.riskLevel}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 mt-4">
        <div className="card">
          <div className="flex items-center gap-2 mb-4 pt-1">
            <Target size={20} color="var(--primary)" />
            <h3 style={{ margin: 0 }}>Problem Summary</h3>
          </div>
          <p className="text-muted" style={{ lineHeight: 1.6 }}>{analysis.problemSummary}</p>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-4 pt-1">
            <Users size={20} color="var(--primary)" />
            <h3 style={{ margin: 0 }}>Customer Persona</h3>
          </div>
          <p className="text-muted" style={{ lineHeight: 1.6 }}>{analysis.customerPersona}</p>
        </div>

        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <div className="flex items-center gap-2 mb-4 pt-1">
            <Briefcase size={20} color="var(--primary)" />
            <h3 style={{ margin: 0 }}>Market & Competitors</h3>
          </div>
          <p className="text-muted mb-4" style={{ lineHeight: 1.6 }}>{analysis.marketOverview}</p>

          <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>Known Competitors</h4>
          <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
            {analysis.competitors.map((comp, i) => (
              <span key={i} className="chip bg-dark">{comp}</span>
            ))}
          </div>
        </div>

        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <div className="flex items-center gap-2 mb-4 pt-1">
            <Cpu size={20} color="var(--primary)" />
            <h3 style={{ margin: 0 }}>Suggested Tech Stack</h3>
          </div>
          <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
            {analysis.suggestedTechStack.map((tech, i) => (
              <span key={i} className="chip" style={{ borderColor: 'var(--text-muted)' }}>{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetail;
