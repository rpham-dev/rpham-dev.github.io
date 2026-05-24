import { useScrollReveal } from '../hooks/useScrollReveal';
import { ChevronRight } from 'lucide-react';
import './Experience.css';

const experiences = [
  {
    role: 'Data Specialist',
    company: 'Highlands Community Charter and Technical Schools',
    duration: 'Jan 2021 - Sep 2024',
    description:
      'Worked with a team to manage and improve district-wide data systems and reporting processes',
    highlights: [
      'Maintained CDE compliance by preparing and submitting ADA reports',
      'Built Excel and Tableau dashboards to surface key insights for executive leadership',
      'Administered PowerSchool SIS and database for a district of 10,000+ students',
      'Developed complex SQL Queries for data analysis, reporting, and cross-functional projects'
    ],
    tags: ['Oracle SQL', 'PowerSchool SIS', 'Tableau'],
  },
  {
    role: 'Project Engineer',
    company: 'Zinex Corporation',
    duration: 'Oct 2019 - Oct 2020',
    description:
      'Supported research and production of high-voltage power rectifiers for industrial applications',
    highlights: [
      'Modernized engineering drawings and blueprints to current industry standards',
      'Designed rectifier tanks and power supply assemblies in SolidWorks',
      'Wired and soldered components to PCBs in a production environment',
      'Developed and executed test procedures to diagnose and resolve rectifier tank failures'
    ],
    tags: ['SolidWorks', 'AutoCad', 'Soldering', 'Wiring'],
  },
  {
    role: 'Engineering Intern',
    company: 'Mason Controls',
    duration: 'Jun 2019 - Oct 2019',
    description:
      'Assisted Senior Engineers in the testing and analysis of aircraft throttle controls',
    highlights: [
      'Conducted static analyses in Femap & NX Nastran to predict mechanical failures in throttle controls',
      'Oversaw 200,000-cycle endurance testing of rotary switches on throttle control quadrant assemblies',
      'Designed data filtering and interpretation procedures for rotary switch contact analysis using VBA',
      'Developed Arduino sketch to control and monitor servomotor over rotary switch dynamic testing'
    ],
    tags: ['Femap & NX Nastran', 'VBA', 'Arduino']
  }
];

export default function Experience() {
  const sectionRef = useScrollReveal();

  return (
    <section className="experience section" id="experience" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Experience</span>
          <h2 className="section-title">Where I've worked</h2>
          <p className="section-subtitle">
            A timeline of my professional journey building software and leading
            engineering teams.
          </p>
        </div>

        <div className="experience__timeline">
          {experiences.map((exp, index) => (
            <div
              key={exp.company}
              className={`experience__item reveal reveal-delay-${(index % 3) + 1}`}
            >
              <span className="experience__dot" />
              <div className="experience__card glass-card">
                <div className="experience__header">
                  <div>
                    <h3 className="experience__role">{exp.role}</h3>
                    <span className="experience__company">{exp.company}</span>
                  </div>
                  <span className="experience__duration">{exp.duration}</span>
                </div>

                <p className="experience__description">{exp.description}</p>

                <div className="experience__highlights">
                  {exp.highlights.map((highlight) => (
                    <div key={highlight} className="experience__highlight">
                      <ChevronRight
                        size={16}
                        className="experience__highlight-icon"
                      />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="experience__tags">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="experience__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
