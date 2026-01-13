import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaCode, FaPalette, FaMobile, FaReact, FaHtml5, FaCss3Alt, FaJs, FaFigma, FaArrowUp, FaBolt, FaShieldAlt, FaFire, FaRocket, FaStar } from 'react-icons/fa';
import { SiAdobexd, SiTypescript } from 'react-icons/si';
import './App.css';

// Marvel Heroes Data with enhanced details
const marvelHeroes = [
  { name: 'Iron Man', skill: 'React Development', color: '#B71C1C', icon: '🦾', description: 'Building powerful UI components with React', power: 'Arc Reactor Technology' },
  { name: 'Captain America', skill: 'HTML5 Mastery', color: '#1565C0', icon: '🛡️', description: 'Strong foundation in semantic HTML structure', power: 'Super Soldier Serum' },
  { name: 'Thor', skill: 'JavaScript Thunder', color: '#7B1FA2', icon: '⚡', description: 'Wielding the power of modern JavaScript', power: 'God of Thunder' },
  { name: 'Black Widow', skill: 'CSS3 Stealth', color: '#212121', icon: '🕷️', description: 'Crafting sleek, elegant stylesheets', power: 'Master Spy' },
  { name: 'Hulk', skill: 'Performance Power', color: '#2E7D32', icon: '💪', description: 'Optimizing for maximum performance', power: 'Gamma Radiation' },
  { name: 'Spider-Man', skill: 'Responsive Design', color: '#C62828', icon: '🕸️', description: 'Weaving adaptive, flexible layouts', power: 'Spider Sense' },
  { name: 'Doctor Strange', skill: 'UI/UX Magic', color: '#E65100', icon: '✨', description: 'Creating mystical user experiences', power: 'Mystic Arts' },
  { name: 'Black Panther', skill: 'Design Systems', color: '#4A148C', icon: '🐆', description: 'Building advanced design systems', power: 'Vibranium Tech' },
];

const projects = [
  {
    title: 'Stark Industries Dashboard',
    description: 'A comprehensive React dashboard with real-time data visualization, inspired by Iron Man\'s HUD interface.',
    tech: ['React', 'TypeScript', 'D3.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
    color: '#B71C1C',
    hero: 'Iron Man'
  },
  {
    title: 'Avengers Team Portal',
    description: 'Collaborative team management platform with real-time communication features.',
    tech: ['React', 'Node.js', 'Socket.io'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
    color: '#1565C0',
    hero: 'Captain America'
  },
  {
    title: 'Wakanda Design System',
    description: 'A comprehensive UI component library with accessibility-first approach.',
    tech: ['React', 'Storybook', 'Figma'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600',
    color: '#4A148C',
    hero: 'Black Panther'
  },
  {
    title: 'Multiverse Navigator',
    description: 'An immersive 3D web experience showcasing advanced CSS animations and WebGL.',
    tech: ['Three.js', 'GSAP', 'WebGL'],
    image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=600',
    color: '#E65100',
    hero: 'Doctor Strange'
  },
  {
    title: 'Web Slinger Analytics',
    description: 'Real-time analytics dashboard with intuitive data visualization.',
    tech: ['React', 'Chart.js', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
    color: '#C62828',
    hero: 'Spider-Man'
  },
  {
    title: 'Thunder CMS',
    description: 'Powerful content management system with lightning-fast performance.',
    tech: ['Next.js', 'GraphQL', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600',
    color: '#7B1FA2',
    hero: 'Thor'
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

// ============================================
// IRON MAN COMPONENT - Flying Animation
// ============================================
function IronManFlying() {
  return (
    <motion.div 
      className="iron-man-container"
      initial={{ x: -200, y: 100, opacity: 0 }}
      animate={{ 
        x: [null, window.innerWidth + 200],
        y: [null, -100],
        opacity: [0, 1, 1, 0]
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        repeatDelay: 15,
        ease: "easeInOut"
      }}
    >
      <div className="iron-man">
        <div className="iron-man-body">
          <div className="arc-reactor"></div>
        </div>
        <div className="iron-man-trail">
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={i} 
              className="trail-particle"
              animate={{ 
                opacity: [0.8, 0],
                scale: [1, 0.3]
              }}
              transition={{ 
                duration: 0.5, 
                delay: i * 0.1,
                repeat: Infinity
              }}
            />
          ))}
        </div>
        <div className="repulsor-blast left"></div>
        <div className="repulsor-blast right"></div>
      </div>
    </motion.div>
  );
}

// ============================================
// THOR'S HAMMER (MJOLNIR) COMPONENT
// ============================================
function ThorHammer({ onClick }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [lightningActive, setLightningActive] = useState(false);

  const handleClick = () => {
    setIsSpinning(true);
    setLightningActive(true);
    setTimeout(() => {
      setIsSpinning(false);
      setLightningActive(false);
    }, 2000);
    if (onClick) onClick();
  };

  return (
    <div className="thor-hammer-container">
      {lightningActive && <LightningEffect />}
      <motion.div 
        className="mjolnir"
        onClick={handleClick}
        animate={isSpinning ? { 
          rotate: [0, 360, 720, 1080],
          scale: [1, 1.2, 1.1, 1]
        } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="hammer-head">
          <div className="hammer-face front"></div>
          <div className="hammer-face back"></div>
          <div className="hammer-runes">ᛗᛃᛟᛚᚾᛁᚱ</div>
        </div>
        <div className="hammer-handle">
          <div className="handle-wrap"></div>
        </div>
        <div className="hammer-strap"></div>
      </motion.div>
      <motion.p 
        className="hammer-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Click to Summon Thunder ⚡
      </motion.p>
    </div>
  );
}

// ============================================
// LIGHTNING EFFECT COMPONENT
// ============================================
function LightningEffect() {
  return (
    <div className="lightning-container">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="lightning-bolt"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ 
            opacity: [0, 1, 0.8, 0],
            scaleY: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 0.3, 
            delay: i * 0.05,
            repeat: 3
          }}
          style={{
            left: `${10 + i * 10}%`,
            transform: `rotate(${-20 + i * 5}deg)`
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// CAPTAIN AMERICA SHIELD COMPONENT
// ============================================
function CaptainShield() {
  const [isThrown, setIsThrown] = useState(false);

  return (
    <motion.div 
      className="cap-shield-container"
      onClick={() => setIsThrown(!isThrown)}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div 
        className="cap-shield"
        animate={isThrown ? {
          x: [0, 300, 0],
          rotate: [0, 720, 1440],
          scale: [1, 0.8, 1]
        } : { rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="shield-ring outer"></div>
        <div className="shield-ring white"></div>
        <div className="shield-ring inner"></div>
        <div className="shield-star">★</div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// SPIDER-MAN WEB SHOOTER COMPONENT
// ============================================
function SpiderWeb() {
  const [webs, setWebs] = useState([]);
  
  const shootWeb = (e) => {
    const newWeb = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY
    };
    setWebs([...webs, newWeb]);
    setTimeout(() => {
      setWebs(prev => prev.filter(w => w.id !== newWeb.id));
    }, 2000);
  };

  return (
    <div className="spider-web-container" onClick={shootWeb}>
      {webs.map(web => (
        <motion.div
          key={web.id}
          className="web-shot"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          style={{ left: web.x, top: web.y }}
        >
          <svg viewBox="0 0 100 100" className="web-svg">
            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="1"/>
            <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="1"/>
            <circle cx="50" cy="50" r="15" fill="none" stroke="white" strokeWidth="1"/>
            {[...Array(8)].map((_, i) => (
              <line 
                key={i} 
                x1="50" y1="50" 
                x2={50 + 45 * Math.cos(i * Math.PI / 4)} 
                y2={50 + 45 * Math.sin(i * Math.PI / 4)} 
                stroke="white" 
                strokeWidth="1"
              />
            ))}
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// INFINITY STONES COMPONENT
// ============================================
function InfinityStones() {
  const stones = [
    { name: 'Power', color: '#9C27B0', skill: 'Backend' },
    { name: 'Space', color: '#2196F3', skill: 'Cloud' },
    { name: 'Reality', color: '#F44336', skill: 'UI Design' },
    { name: 'Soul', color: '#FF9800', skill: 'UX' },
    { name: 'Time', color: '#4CAF50', skill: 'Performance' },
    { name: 'Mind', color: '#FFEB3B', skill: 'Logic' },
  ];

  return (
    <div className="infinity-stones">
      {stones.map((stone, index) => (
        <motion.div
          key={stone.name}
          className="infinity-stone"
          style={{ '--stone-color': stone.color }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, type: 'spring' }}
          whileHover={{ 
            scale: 1.3, 
            boxShadow: `0 0 30px ${stone.color}`,
            rotate: 360
          }}
        >
          <div className="stone-inner"></div>
          <span className="stone-tooltip">{stone.name} - {stone.skill}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// HULK SMASH BUTTON COMPONENT
// ============================================
function HulkSmashButton() {
  const [smashed, setSmashed] = useState(false);

  const handleSmash = () => {
    setSmashed(true);
    // Add screen shake effect
    document.body.classList.add('screen-shake');
    setTimeout(() => {
      setSmashed(false);
      document.body.classList.remove('screen-shake');
    }, 500);
  };

  return (
    <motion.button
      className={`hulk-smash-btn ${smashed ? 'smashed' : ''}`}
      onClick={handleSmash}
      whileHover={{ scale: 1.1, backgroundColor: '#1B5E20' }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="hulk-fist">👊</span>
      <span>HULK SMASH!</span>
      {smashed && (
        <div className="smash-effect">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="smash-particle"
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{ 
                scale: [1, 0],
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
                opacity: [1, 0]
              }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
}

// ============================================
// ARC REACTOR COMPONENT (Interactive)
// ============================================
function ArcReactor({ size = 150 }) {
  const [powerLevel, setPowerLevel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPowerLevel(prev => (prev + 1) % 101);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="arc-reactor-container" style={{ width: size, height: size }}>
      <div className="reactor-outer-ring">
        <div className="reactor-inner-ring">
          <div className="reactor-core">
            <motion.div 
              className="core-glow"
              animate={{ 
                boxShadow: [
                  '0 0 20px #00D4FF, 0 0 40px #00D4FF',
                  '0 0 40px #00D4FF, 0 0 80px #00D4FF',
                  '0 0 20px #00D4FF, 0 0 40px #00D4FF'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="core-triangle"></div>
          </div>
        </div>
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="reactor-segment"
            style={{ transform: `rotate(${i * 36}deg)` }}
          />
        ))}
      </div>
      <div className="power-indicator">
        <span>{powerLevel}%</span>
      </div>
    </div>
  );
}

// ============================================
// DOCTOR STRANGE PORTAL COMPONENT
// ============================================
function StrangePortal({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="portal-wrapper">
      <motion.div 
        className={`strange-portal ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        animate={isOpen ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 2, repeat: isOpen ? Infinity : 0, ease: "linear" }}
      >
        <div className="portal-ring outer-ring">
          <div className="portal-sparks">
            {[...Array(20)].map((_, i) => (
              <motion.span 
                key={i} 
                className="spark"
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 0.5 + Math.random() * 0.5,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
        </div>
        <div className="portal-ring middle-ring"></div>
        <div className="portal-ring inner-ring"></div>
        <div className="portal-center">
          {isOpen ? '🌀' : '✨'}
        </div>
      </motion.div>
      {isOpen && (
        <motion.div 
          className="portal-content"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

// ============================================
// MAIN APP COMPONENT
// ============================================
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
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
      {/* Progress Bar */}
      <motion.div className="scroll-progress" style={{ scaleX }} />
      
      <ParticleBackground />
      <IronManFlying />
      <SpiderWeb />
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection skills={skills} />
        <MarvelShowcase />
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

// ============================================
// MARVEL SHOWCASE SECTION (Interactive Components)
// ============================================
function MarvelShowcase() {
  return (
    <section className="marvel-showcase-section">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Interactive Experience</span>
          <h2 className="section-title">Marvel Powers Unleashed</h2>
          <p className="section-subtitle">Click and interact with these legendary artifacts!</p>
        </motion.div>

        <div className="marvel-showcase-grid">
          {/* Thor's Hammer Section */}
          <motion.div
            className="showcase-item thor-showcase"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3>⚡ Mjolnir - Thor's Hammer</h3>
            <ThorHammer />
          </motion.div>

          {/* Captain America Shield */}
          <motion.div
            className="showcase-item cap-showcase"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3>🛡️ Vibranium Shield</h3>
            <CaptainShield />
            <p className="showcase-hint">Click to throw!</p>
          </motion.div>

          {/* Arc Reactor */}
          <motion.div
            className="showcase-item reactor-showcase"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3>💎 Arc Reactor</h3>
            <ArcReactor size={180} />
          </motion.div>

          {/* Infinity Stones */}
          <motion.div
            className="showcase-item stones-showcase"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3>💫 Infinity Stones</h3>
            <InfinityStones />
            <p className="showcase-hint">Hover over each stone!</p>
          </motion.div>

          {/* Hulk Smash */}
          <motion.div
            className="showcase-item hulk-showcase"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3>💪 Gamma Power</h3>
            <HulkSmashButton />
          </motion.div>

          {/* Doctor Strange Portal */}
          <motion.div
            className="showcase-item strange-showcase"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <h3>🌀 Mystic Portal</h3>
            <StrangePortal>
              <div className="portal-message">
                Welcome to the<br />Multiverse! 🌌
              </div>
            </StrangePortal>
          </motion.div>
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
