import { useState, useEffect } from 'react';
import './LeftPanel.css';

/* Inline SVG icons for brands */
const GithubIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
];

const socials = [
  { icon: <GithubIcon />, href: 'https://github.com/rpham-dev/', label: 'GitHub' },
  { icon: <LinkedinIcon />, href: 'https://www.linkedin.com/in/richard-pham-796618b8/', label: 'LinkedIn' }
];

export default function LeftPanel() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Determine active section based on scroll position in the right panel
      const sections = navLinks.map((link) => link.href.slice(1));
      let currentSection = '';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Adjust threshold as needed
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentSection = section;
            break;
          }
        }
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="left-panel">
      <div className="left-panel__identity" style={{ animation: 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
        <h1 className="left-panel__name">
          Richard Pham
        </h1>
        <h2 className="left-panel__role">
          Software Developer
        </h2>
        <p className="left-panel__description">
          Data-focused professional transitioning into software engineering, with 3+ years of hands-on experience in SQL, Python, and data analytics. Skilled in building dashboards, writing complex queries, and administering large-scale databases in professional settings. Seeking to bring a strong analytical foundation and technical versatility to a software engineering role.
        </p>
      </div>

      <nav className="left-panel__nav" style={{ animation: 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both', animationDelay: '0.1s' }}>
        <ul className="left-panel__nav-list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`left-panel__nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                <span className="left-panel__nav-indicator"></span>
                <span className="left-panel__nav-text">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="left-panel__socials" style={{ animation: 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both', animationDelay: '0.2s' }}>
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            className="left-panel__social-link"
            aria-label={social.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </header>
  );
}
