import { useScrollReveal } from '../hooks/useScrollReveal';
import { ExternalLink, Folder } from 'lucide-react';
import './Projects.css';

/* Inline SVG icons for brands (lucide-react removed brand icons) */
const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const projects = [
  {
    title: 'DnD Character Roleplaying Tool',
    description: 'Discord-integrated D&D companion that leverages OpenAI for dynamic character creation and ElevenLabs for AI-generated voice acting via text-to-speech.',
    tags: ['Python', 'Discord.py', 'OpenAI API', 'ElevenLabs'],
    github: 'https://github.com/rpham-dev/DnD-Character-Roleplaying-Tool',
    live: '#',
    featured: true,
  },
  {
    title: 'Discord Puzzle Bot',
    description: 'Discord bot that tracks crossword progress and incorporrates minigames similar to Wordle and Geoguessr that multiple users can play at once strictly within a text channel.',
    tags: ['Python', 'Discord.py'],
    github: 'https://github.com/rpham-dev/puzzleBot',
    live: '#',
    featured: true,
  },
  {
    title: 'MapleStory Shop Parser',
    description: 'A Python script that uses PaddleOCR to capture and extract real-time item data from in-game shop browsing — including item names, stats, and prices. The parsed data is structured for post-processing, enabling analysis like price trend tracking across player-listed items.',
    tags: ['Python', 'PaddleOCR'],
    github: 'https://github.com/rpham-dev/ImageToTextParser',
    live: '#',
    featured: false,
  },
  {
    title: 'Placeholder',
    description: 'Placeholder',
    tags: ['Next.js', 'MDX', 'Tailwind', 'Vercel'],
    github: '#',
    live: '#',
    featured: false,
  },
  {
    title: 'Placeholder',
    description: 'Placeholder',
    tags: ['React', 'OpenAI API', 'Node.js', 'MongoDB'],
    github: '#',
    live: '#',
    featured: false,
  },
  {
    title: 'Placeholder',
    description: 'Placeholder',
    tags: ['Node.js', 'Express', 'Stripe', 'PostgreSQL'],
    github: '#',
    live: null,
    featured: false,
  },
];

export default function Projects() {
  const sectionRef = useScrollReveal();

  return (
    <section className="projects section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Projects</span>
          <h2 className="section-title">Things I've built</h2>
          <p className="section-subtitle">
          </p>
        </div>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`projects__card glass-card reveal reveal-delay-${(index % 3) + 1}`}
            >
              <div className="projects__card-header">
                <Folder size={28} className="projects__card-icon" />
                <div className="projects__card-links">
                  {project.github && (
                    <a href={project.github} className="projects__card-link" aria-label={`GitHub repo for ${project.title}`}>
                      <GithubIcon size={20} />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} className="projects__card-link" aria-label={`Live demo for ${project.title}`}>
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="projects__card-title">{project.title}</h3>
              <p className="projects__card-desc">{project.description}</p>

              <div className="projects__card-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="projects__tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
