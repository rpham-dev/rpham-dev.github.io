import { useScrollReveal } from '../hooks/useScrollReveal';
import './Skills.css';

const skillCategories = [
  {
    title: 'Frontend',
    color: '#7c3aed',
    skills: [
      { name: 'React', icon: 'devicon-react-original' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain' },
      { name: 'HTML5', icon: 'devicon-html5-plain' }
    ],
  },
  {
    title: 'Backend',
    color: '#06b6d4',
    skills: [
      { name: 'Node.js', icon: 'devicon-nodejs-plain' },
      { name: 'Python', icon: 'devicon-python-plain' },
      { name: 'Express', icon: 'devicon-express-original' },
      { name: 'FastAPI', icon: 'devicon-fastapi-plain' },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain' }
    ],
  },
  {
    title: 'Tools & DevOps',
    color: '#a78bfa',
    skills: [
      { name: 'Git', icon: 'devicon-git-plain' },
      { name: 'GitHub', icon: 'devicon-github-original' },
      { name: 'Docker', icon: 'devicon-docker-plain' },
      { name: 'Linux', icon: 'devicon-linux-plain' },
      { name: 'VS Code', icon: 'devicon-vscode-plain' }
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
            Technologies and toolss I use to bring ideas to life, organized by domain.
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

              <div className="skills__icon-list">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skills__icon-item">
                    <div className="skills__icon-wrapper">
                      <i className={skill.icon} />
                    </div>
                    <span className="skills__icon-label">{skill.name}</span>
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
