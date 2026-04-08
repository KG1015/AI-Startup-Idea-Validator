import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Target, AlertTriangle, TrendingUp, Users, Cpu, Briefcase, Swords } from 'lucide-react';

const IdeaDetail = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
        const response = await axios.get(`${baseUrl}/api/ideas/${id}`);
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
    return (
      <div className="text-center animate-pulse text-muted" style={{ paddingTop: '4rem', fontSize: '0.9rem' }}>
        Loading report...
      </div>
    );
  }

  if (!idea) {
    return <div className="text-center text-muted" style={{ paddingTop: '4rem' }}>Idea not found.</div>;
  }

  const { analysis } = idea;

  const getRiskStyle = (risk) => {
    if (risk === 'High') return { bg: 'rgba(229,72,77,0.12)', border: 'rgba(229,72,77,0.35)', color: '#d92d20' };
    if (risk === 'Medium') return { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', color: '#b45309' };
    return { bg: 'rgba(14,165,114,0.12)', border: 'rgba(14,165,114,0.3)', color: '#047857' };
  };

  const getScoreStyle = (score) => {
    if (score >= 70) return { bg: 'rgba(14,165,114,0.12)', border: 'rgba(14,165,114,0.3)', color: '#047857' };
    if (score >= 40) return { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', color: '#b45309' };
    return { bg: 'rgba(229,72,77,0.12)', border: 'rgba(229,72,77,0.35)', color: '#d92d20' };
  };

  const risk = getRiskStyle(analysis.riskLevel);
  const scoreStyle = getScoreStyle(analysis.profitabilityScore);

  const SectionCard = ({ icon: Icon, iconColor = '#9d5cff', title, children, fullWidth = false }) => (
    <div className="card" style={fullWidth ? { gridColumn: '1 / -1' } : {}}>
      <div className="flex items-center gap-3" style={{ marginBottom: '1rem' }}>
        <div style={{
          width: 34, height: 34, borderRadius: '9px',
          background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon size={16} color={iconColor} />
        </div>
        <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Back link */}
      <Link to="/dashboard" style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem',
        marginBottom: '1.5rem', fontWeight: 500, transition: 'color 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-main)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
      >
        <ArrowLeft size={15} /> Back to Dashboard
      </Link>

      {/* Hero Card */}
      <div className="card" style={{
        marginBottom: '1.25rem',
        background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(37,99,235,0.08) 100%)',
        border: '1px solid rgba(124,58,237,0.25)',
      }}>
        <h1 style={{
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800,
          margin: '0 0 0.6rem', letterSpacing: '-0.03em',
          background: 'linear-gradient(125deg, #1c1c1e 0%, #5b5bd6 50%, #9333ea 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          {idea.title}
        </h1>
        <p className="text-muted" style={{ margin: '0 0 1.25rem', lineHeight: 1.7, fontSize: '0.95rem', maxWidth: '600px' }}>
          {idea.description}
        </p>

        <div className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
          {/* Score */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 0.9rem', borderRadius: '99px',
            background: scoreStyle.bg,
            border: `1px solid ${scoreStyle.border}`,
          }}>
            <TrendingUp size={14} color={scoreStyle.color} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: scoreStyle.color }}>
              Score: {analysis.profitabilityScore}/100
            </span>
          </div>

          {/* Risk */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 0.9rem', borderRadius: '99px',
            background: risk.bg, border: `1px solid ${risk.border}`,
          }}>
            <AlertTriangle size={14} color={risk.color} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: risk.color }}>
              Risk: {analysis.riskLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Analysis Grid */}
      <div className="grid grid-cols-2">
        <SectionCard icon={Target} title="Problem Summary">
          <p className="text-muted" style={{ margin: 0, lineHeight: 1.75, fontSize: '0.9rem' }}>
            {analysis.problemSummary}
          </p>
        </SectionCard>

        <SectionCard icon={Users} title="Customer Persona">
          <p className="text-muted" style={{ margin: 0, lineHeight: 1.75, fontSize: '0.9rem' }}>
            {analysis.customerPersona}
          </p>
        </SectionCard>

        <SectionCard icon={Briefcase} title="Market Overview" fullWidth>
          <p className="text-muted" style={{ margin: '0 0 1.25rem', lineHeight: 1.75, fontSize: '0.9rem' }}>
            {analysis.marketOverview}
          </p>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0.75rem 0 1rem' }} />
          <p style={{ margin: '0 0 0.6rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Known Competitors
          </p>
          <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
            {analysis.competitors?.map((comp, i) => (
              <span key={i} style={{
                padding: '0.3rem 0.75rem', borderRadius: '99px', fontSize: '0.82rem', fontWeight: 500,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--text-muted)',
              }}>
                {comp}
              </span>
            ))}
          </div>
        </SectionCard>

        <SectionCard icon={Cpu} title="Suggested Tech Stack" fullWidth>
          <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
            {analysis.suggestedTechStack?.map((tech, i) => (
              <span key={i} style={{
                padding: '0.35rem 0.85rem', borderRadius: '99px', fontSize: '0.82rem', fontWeight: 600,
                background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)',
                color: '#9d5cff',
              }}>
                {tech}
              </span>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default IdeaDetail;
