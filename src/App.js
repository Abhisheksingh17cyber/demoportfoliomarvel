import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaCode, FaPalette, FaMobile, FaReact, FaHtml5, FaCss3Alt, FaJs, FaFigma, FaArrowUp } from 'react-icons/fa';
import { SiAdobexd, SiTypescript } from 'react-icons/si';
import './App.css';

// Marvel Heroes Data
const marvelHeroes = [
  { name: 'Iron Man', skill: 'React Development', color: '#B71C1C', icon: '🦾', description: 'Building powerful UI components with React' },
  { name: 'Captain America', skill: 'HTML5 Mastery', color: '#1565C0', icon: '🛡️', description: 'Strong foundation in semantic HTML structure' },
  { name: 'Thor', skill: 'JavaScript Thunder', color: '#7B1FA2', icon: '⚡', description: 'Wielding the power of modern JavaScript' },
  { name: 'Black Widow', skill: 'CSS3 Stealth', color: '#212121', icon: '🕷️', description: 'Crafting sleek, elegant stylesheets' },
  { name: 'Hulk', skill: 'Performance Power', color: '#2E7D32', icon: '💪', description: 'Optimizing for maximum performance' },
  { name: 'Spider-Man', skill: 'Responsive Design', color: '#C62828', icon: '🕸️', description: 'Weaving adaptive, flexible layouts' },
  { name: 'Doctor Strange', skill: 'UI/UX Magic', color: '#E65100', icon: '✨', description: 'Creating mystical user experiences' },
  { name: 'Black Panther', skill: 'Design Systems', color: '#4A148C', icon: '🐆', description: 'Building advanced design systems' },
];

const projects = [
  {
    title: 'Stark Industries Dashboard',
    description: 'A comprehensive React dashboard with real-time data visualization, inspired by Iron Man\'s HUD interface.',
    tech: ['React', 'TypeScript', 'D3.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
    color: '#B71C1C'
  },
  {
    title: 'Avengers Team Portal',
    description: 'Collaborative team management platform with real-time communication features.',
    tech: ['React', 'Node.js', 'Socket.io'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
    color: '#1565C0'
  },
  {
    title: 'Wakanda Design System',
    description: 'A comprehensive UI component library with accessibility-first approach.',
    tech: ['React', 'Storybook', 'Figma'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600',
    color: '#4A148C'
  },
  {
    title: 'Multiverse Navigator',
    description: 'An immersive 3D web experience showcasing advanced CSS animations and WebGL.',
    tech: ['Three.js', 'GSAP', 'WebGL'],
    image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=600',
    color: '#E65100'
  }
];

const skills = [
  { name: 'React', level: 95, icon: <FaReact />, color: '#61DAFB' },
  { name: 'HTML5', level: 98, icon: <FaHtml5 />, color: '#E34F26' },
  { name: 'CSS3', level: 92, icon: <FaCss3Alt />, color: '#1572B6' },
  { name: 'JavaScript', level: 90, icon: <FaJs />, color: '#F7DF1E' },
  { name: 'TypeScript', level: 85, icon: <SiTypescript />, color: '#3178C6' },
  { name: 'Figma', level: 88, icon: <FaFigma />, color: '#F24E1E' },
  { name: 'Adobe XD', level: 82, icon: <SiAdobexd />, color: '#FF61F6' },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app">
      <ParticleBackground />
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection skills={skills} />
        <MarvelHeroesSection heroes={marvelHeroes} />
        <ProjectsSection projects={projects} />
        <ContactSection />
      </main>

      <Footer />
      
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top-btn"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// Loading Screen Component
function LoadingScreen() {
  return (
    <motion.div className="loading-screen">
      <motion.div
        className="loading-logo"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, type: 'spring' }}
      >
        <span className="marvel-text">MARVEL</span>
        <span className="portfolio-text">PORTFOLIO</span>
      </motion.div>
      <motion.div
        className="loading-bar"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 2 }}
      />
      <motion.p
        className="loading-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Assembling the Avengers...
      </motion.p>
    </motion.div>
  );
}

// Particle Background Component
function ParticleBackground() {
  const particles = Array.from({ length: 50 }, (_, i) => i);
  
  return (
    <div className="particle-container">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="particle"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            y: [null, Math.random() * -500 - 100],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

// Navigation Component
function Navigation({ activeSection, setActiveSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Skills', 'Heroes', 'Projects', 'Contact'];

  const scrollToSection = (section) => {
    const element = document.getElementById(section.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`navigation ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
        >
          <span className="logo-marvel">M</span>
          <span className="logo-text">Portfolio</span>
        </motion.div>

        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item) => (
            <motion.button
              key={item}
              className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
              onClick={() => scrollToSection(item)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.button>
          ))}
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </motion.nav>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="badge-icon">⚡</span>
          <span>Available for Projects</span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="title-line">I'm a</span>
          <span className="title-highlight">
            <span className="gradient-text">Creative Developer</span>
          </span>
          <span className="title-line">& UI/UX Designer</span>
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Crafting extraordinary digital experiences with the power of 
          <strong> React</strong>, <strong>HTML5</strong>, and <strong>modern UI/UX design</strong>. 
          Like the Avengers assembling to save the world, I bring together 
          cutting-edge technologies to build heroic web applications.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button 
            className="cta-primary"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(229, 62, 62, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </motion.button>
          <motion.button 
            className="cta-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            Get in Touch
          </motion.button>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="stat">
            <span className="stat-number">50+</span>
            <span className="stat-label">Projects Completed</span>
          </div>
          <div className="stat">
            <span className="stat-number">5+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat">
            <span className="stat-number">30+</span>
            <span className="stat-label">Happy Clients</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="hero-image-container">
          <div className="hero-glow"></div>
          <div className="hero-rings">
            <div className="ring ring-1"></div>
            <div className="ring ring-2"></div>
            <div className="ring ring-3"></div>
          </div>
          <div className="hero-avatar">
            <span className="avatar-icon">🦸</span>
          </div>
        </div>
      </motion.div>

      <div className="hero-scroll-indicator">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span>Scroll Down</span>
          <div className="scroll-arrow">↓</div>
        </motion.div>
      </div>
    </section>
  );
}

// About Section Component
function AboutSection() {
  const features = [
    { icon: <FaCode />, title: 'Clean Code', desc: 'Writing maintainable, scalable code' },
    { icon: <FaPalette />, title: 'Creative Design', desc: 'Crafting visually stunning interfaces' },
    { icon: <FaMobile />, title: 'Responsive', desc: 'Perfect on every device' },
  ];

  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">About Me</span>
          <h2 className="section-title">The Origin Story</h2>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="image-frame">
              <div className="image-glow"></div>
              <div className="about-avatar">
                <span>💻</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="about-intro">
              Just like every Marvel hero has an origin story, mine began with a 
              fascination for creating beautiful, functional digital experiences.
            </p>
            <p>
              With over <strong>5 years of experience</strong> in web development and UI/UX design, 
              I've mastered the art of transforming complex ideas into intuitive, 
              user-friendly interfaces. My toolkit includes <strong>React</strong>, 
              <strong> HTML5</strong>, <strong>CSS3</strong>, and modern design tools.
            </p>
            <p>
              Like Tony Stark engineering his Iron Man suit, I continuously upgrade 
              my skills to stay at the forefront of web technology. Every project 
              is an opportunity to push boundaries and create something extraordinary.
            </p>

            <div className="about-features">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(229, 62, 62, 0.2)' }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h4>{feature.title}</h4>
                  <p>{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Skills Section Component
function SkillsSection({ skills }) {
  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">My Powers</span>
          <h2 className="section-title">Technical Arsenal</h2>
        </motion.div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, boxShadow: `0 20px 40px ${skill.color}40` }}
            >
              <div className="skill-icon" style={{ color: skill.color }}>
                {skill.icon}
              </div>
              <h3 className="skill-name">{skill.name}</h3>
              <div className="skill-bar-container">
                <motion.div
                  className="skill-bar"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)` }}
                />
              </div>
              <span className="skill-level">{skill.level}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Marvel Heroes Section Component
function MarvelHeroesSection({ heroes }) {
  return (
    <section id="heroes" className="heroes-section">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Skill Heroes</span>
          <h2 className="section-title">Assemble Your Skills</h2>
          <p className="section-subtitle">Each Marvel hero represents a superpower in my development arsenal</p>
        </motion.div>

        <div className="heroes-grid">
          {heroes.map((hero, index) => (
            <motion.div
              key={hero.name}
              className="hero-card"
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: `0 30px 60px ${hero.color}50`
              }}
              style={{ '--hero-color': hero.color }}
            >
              <div className="hero-card-glow" style={{ background: hero.color }}></div>
              <div className="hero-card-content">
                <span className="hero-icon">{hero.icon}</span>
                <h3 className="hero-name">{hero.name}</h3>
                <p className="hero-skill">{hero.skill}</p>
                <p className="hero-description">{hero.description}</p>
              </div>
              <div className="hero-card-border" style={{ borderColor: hero.color }}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Section Component
function ProjectsSection({ projects }) {
  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">My Work</span>
          <h2 className="section-title">Featured Missions</h2>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -10 }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay" style={{ background: `${project.color}E6` }}>
                  <motion.button 
                    className="project-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    View Project
                  </motion.button>
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section Component
function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thanks for reaching out! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-title">Let's Save the World Together</h2>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3>Ready to start your mission?</h3>
            <p>
              Whether you need a stunning website, a complex web application, 
              or a complete design system, I'm here to help bring your vision to life.
            </p>
            <div className="contact-methods">
              <a href="mailto:contact@example.com" className="contact-method">
                <FaEnvelope /> contact@example.com
              </a>
            </div>
            <div className="social-links">
              <motion.a href="#" whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <FaGithub />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <FaLinkedin />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <FaTwitter />
              </motion.a>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(229, 62, 62, 0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <span className="logo-marvel">M</span>
          <span className="logo-text">Portfolio</span>
        </div>
        <p className="footer-text">
          Designed & Built with ❤️ and superpowers
        </p>
        <p className="footer-copyright">
          © 2026 Marvel Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default App;
