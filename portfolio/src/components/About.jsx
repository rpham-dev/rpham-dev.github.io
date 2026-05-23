import { useScrollReveal } from '../hooks/useScrollReveal';
import { Code2, Coffee } from 'lucide-react';
import './About.css';

const stats = [
  { icon: <Code2 size={22} />, value: '5+', label: 'Projects Built' },
  { icon: <Coffee size={22} />, value: '3+', label: 'Years Experience' },
];

const techStack = [
  { name: 'React', color: '#61DAFB' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Python', color: '#3776AB' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Git', color: '#F05032' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'MongoDB', color: '#47A248' },
];

export default function About() {
  const sectionRef = useScrollReveal();

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">About Me</span>
          <h2 className="section-title">Passionate about crafting digital experiences</h2>
          <p className="section-subtitle">
            Here'shnologies I love working with.
          </p>
        </div>

        <div className="about__grid">
          {/* Bio Card */}
          <div className="about__bio glass-card reveal">
            <div className="about__bio-avatar">
              <div className="about__avatar-placeholder">
                <span>R</span>
              </div>
            </div>
            <div className="about__bio-content">
              <h3 className="about__bio-title">Who I Am</h3>
              <p className="about__bio-text">
                Placeholder
              </p>
              <p className="about__bio-text">
                Placeholder
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="about__stats">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`about__stat glass-card reveal reveal-delay-${index + 1}`}
              >
                <div className="about__stat-icon">{stat.icon}</div>
                <span className="about__stat-value">{stat.value}</span>
                <span className="about__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="about__tech reveal">
          <h3 className="about__tech-title">Tech Stack</h3>
          <div className="about__tech-grid">
            {techStack.map((tech) => (
              <div key={tech.name} className="about__tech-item">
                <span
                  className="about__tech-dot"
                  style={{ background: tech.color }}
                />
                <span className="about__tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
