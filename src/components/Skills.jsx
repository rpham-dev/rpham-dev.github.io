import { useScrollReveal } from '../hooks/useScrollReveal';
import './Skills.css';

const skillCategories = [
  {
    title: 'Frontend',
    color: '#7c3aed',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'JavaScript / TypeScript', level: 92 },
      { name: 'HTML & CSS', level: 95 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'Redux / Zustand', level: 82 },
    ],
  },
  {
    title: 'Backend',
    color: '#06b6d4',
    skills: [
      { name: 'Node.js / Express', level: 90 },
      { name: 'Python / FastAPI', level: 85 },
      { name: 'PostgreSQL / MongoDB', level: 87 },
      { name: 'REST & GraphQL APIs', level: 88 },
      { name: 'Authentication / JWT', level: 84 },
    ],
  },
  {
    title: 'Tools & DevOps',
    color: '#a78bfa',
    skills: [
      { name: 'Git / GitHub', level: 93 },
      { name: 'Docker / Containers', level: 80 },
      { name: 'CI/CD Pipelines', level: 78 },
      { name: 'AWS / Cloud', level: 75 },
      { name: 'Linux / Shell', level: 82 },
    ],
  },
];

export default function Skills() {
  const sectionRef = useScrollReveal();

  return (
    <section className="skills section" id="skills" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Skills</span>
          <h2 className="section-title">My technical toolkit</h2>
          <p className="section-subtitle">
            Technologies and tools I use to bring ideas to life, organized by domain.
          </p>
        </div>

        <div className="skills__grid">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className={`skills__category glass-card reveal reveal-delay-${catIndex + 1}`}
            >
              <div className="skills__category-header">
                <span
                  className="skills__category-indicator"
                  style={{ background: category.color }}
                />
                <h3 className="skills__category-title">{category.title}</h3>
              </div>

              <div className="skills__list">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skills__item">
                    <div className="skills__item-header">
                      <span className="skills__item-name">{skill.name}</span>
                      <span className="skills__item-level">{skill.level}%</span>
                    </div>
                    <div className="skills__bar">
                      <div
                        className="skills__bar-fill"
                        style={{
                          '--fill-width': `${skill.level}%`,
                          '--fill-color': category.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
