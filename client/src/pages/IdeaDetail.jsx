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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/ideas/${id}`);
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
    if (risk === 'High') return { bg: 'rgba(255,77,109,0.12)', border: 'rgba(255,77,109,0.35)', color: '#ff4d6d' };
    if (risk === 'Medium') return { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.35)', color: '#fbbf24' };
    return { bg: 'rgba(6,214,160,0.12)', border: 'rgba(6,214,160,0.35)', color: '#06d6a0' };
  };

  const getScoreColor = (score) => {
    if (score >= 70) return '#06d6a0';
    if (score >= 40) return '#fbbf24';
    return '#ff4d6d';
  };

  const risk = getRiskStyle(analysis.riskLevel);
  const scoreColor = getScoreColor(analysis.profitabilityScore);

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
          background: 'linear-gradient(135deg, #f0f0ff 0%, #9d5cff 100%)',
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
            background: `rgba(${scoreColor === '#06d6a0' ? '6,214,160' : scoreColor === '#fbbf24' ? '251,191,36' : '255,77,109'},0.12)`,
            border: `1px solid rgba(${scoreColor === '#06d6a0' ? '6,214,160' : scoreColor === '#fbbf24' ? '251,191,36' : '255,77,109'},0.35)`,
          }}>
            <TrendingUp size={14} color={scoreColor} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: scoreColor }}>
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
