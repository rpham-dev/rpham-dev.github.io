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
  { name: 'Docker', color: '#2496ED' },
  { name: 'Git', color: '#F05032' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'Arduino', color: '#00979D' },
  { name: 'Raspberry Pi', color: '#A22846' },
  { name: 'SolidWorks', color: '#E2231A' },
  { name: 'Oracle', color: '#F80000' },
  { name: 'Visual Basic', color: '#945DB7' },
];

export default function About() {
  const sectionRef = useScrollReveal();

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">About Me</span>
          <h2 className="section-title">Passionate about creating digital solutions</h2>
        </div>

        <div className="about__grid">
          {/* Bio Card */}
          <div className="about__bio glass-card reveal">
            <div className="about__bio-avatar">
              <img
                src="/Richard-trimmed.jpg"
                alt="Richard Pham"
                className="about__avatar-img"
              />
            </div>
            <div className="about__bio-content">
              <h3 className="about__bio-title">Who I Am</h3>
              <p className="about__bio-text">
                I'm a self-driven software developer with a background that spans mechanical engineering, data science, and
                software engineering. Most recently, I worked as a data specialist for a school district, building dashboards with
                Oracle SQL and Tableau to help district leadership tackle growth and identify areas for improvement. That experience
                sharpened both my technical skills and my instinct for building things that actually solve real problems. I'm now
                looking to grow as a software engineer, with a focus on AI and automation tools that make people's lives easier.
              </p>
              <p className="about__bio-text">
                When I'm not coding, you can find me tinkering with side projects or exploring new tools and technologies.
                Outside of tech, I enjoy tennis, board games, crossword puzzles, and the occasional online strategy game.
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
        <div className="about__tech glass-card reveal">
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
