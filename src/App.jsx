import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

const navigation = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "milestones", label: "Wins" },
  { id: "contact", label: "Contact" },
];

const heroStats = [
  { value: "4+", label: "Years Coding" },
  { value: "8.67", label: "BCA CGPA" },
  { value: "11M", label: "Pro Experience" },
  { value: "1K+", label: "Photos Shot" },
];

const experience = [
  {
    company: "Textile Daddy",
    role: "Social Media Manager and Digital Marketing Executive",
    period: "Jan 2025 - Nov 2025",
    points: [
      "Managed brand presence across LinkedIn and Facebook for a B2B textile portal.",
      "Designed creatives, banners, and promotional content with consistent brand identity.",
      "Improved reach, engagement, and lead generation through structured campaign planning.",
    ],
    tags: ["Social Media", "Branding", "Campaigns", "B2B"],
  },
  {
    company: "Textile Voice",
    role: "Software Development and Digital Strategy Contributor",
    period: "Jan 2025 - Nov 2025",
    points: [
      "Contributed to feature planning and responsive UI improvements.",
      "Managed content updates including news, listings, and digital consistency.",
      "Worked between marketing and development priorities to support execution.",
    ],
    tags: ["UI", "Content", "Strategy", "Coordination"],
  },
];

const skillGroups = [
  {
    title: "Development",
    items: [
      ["HTML and CSS", 95],
      ["JavaScript", 80],
      ["ASP.NET and C#", 74],
      ["SQL Server", 78],
      ["React", 62],
    ],
  },
  {
    title: "Creative",
    items: [
      ["Photography", 90],
      ["Adobe Lightroom", 92],
      ["Photoshop", 78],
      ["Social Media", 88],
      ["Content Design", 84],
    ],
  },
];

const projects = [
  {
    title: "LensCraft",
    stack: "React - PostgreSQL - Startup Build",
    type: "Photography Startup Platform",
    text: "Originally started as an ASP.NET college project, now being rebuilt as a full startup-focused platform for photographers with stronger product direction, modern frontend architecture, and scalable backend planning.",
    liveHref: "",
    repoHref: "https://github.com/omshri-23",
  },
  {
    title: "Photic Photography",
    stack: "React - Vite - Frontend Experience",
    type: "Live Photography Portfolio",
    text: "Live photography portfolio built in React and Vite with a cleaner presentation layer, modern frontend structure, and a visual-first browsing experience.",
    liveHref: "https://photic-photo.vercel.app/",
    repoHref: "https://github.com/omshri-23/Photic-Photography",
  },
  {
    title: "Top Byte",
    stack: "HTML - CSS - JavaScript",
    type: "E-commerce Frontend",
    text: "Responsive online computer store interface with product discovery, filtering, and cart-oriented UI behavior.",
    liveHref: "https://omshri-23.github.io/TopByte/",
    repoHref: "https://github.com/omshri-23/TopByte",
  },
  {
    title: "Style Sphere",
    stack: "Frontend Concept - UI System",
    type: "Fashion Commerce Interface",
    text: "A visual-first fashion storefront concept focused on bold layout, cleaner browsing flow, and modern product presentation.",
    liveHref: "https://omshri-23.github.io/Style-Sphere/",
    repoHref: "https://github.com/omshri-23/Style-Sphere",
  },
  {
    title: "Priyadarshini Computers",
    stack: "Web App - Vercel",
    type: "Computer Retail Website",
    text: "A clean, fast website for a local computer store with a modern presentation layer and clear browsing flow.",
    liveHref: "https://priyadarshini-computers.vercel.app/",
    repoHref: "https://github.com/omshri-23/priyadarshini-institute",
  },
  {
    title: "EcoTrack",
    stack: "Carbon Footprint Platform",
    type: "CarbonFootprint (Public)",
    text: "EcoTrack is a smart carbon footprint management platform designed to help individuals and organizations measure, analyze, and reduce environmental impact using real-world data and verified emission factors.",
    liveHref: "https://github.com/omshri-23/CarbonFootprint",
    repoHref: "https://github.com/omshri-23/CarbonFootprint",
  },
];

const education = [
  {
    year: "2023 - 2026",
    title: "Bachelor of Computer Application",
    place: "Jaysingpur College, Jaysingpur",
    detail: "Focus: computer applications, software development, and databases.",
  },
  {
    year: "2021 - 2023",
    title: "Higher Secondary - PCM + Computer Science",
    place: "Sharad Institute of Technology Jr. College, Kolhapur",
    detail: "Stream: PCM + Computer Science.",
  },
  {
    year: "2021",
    title: "Secondary School Certificate",
    place: "Alphonsa School, Yadrav, Kolhapur",
    detail: "Foundation: mathematics, science, and communication.",
  },
];

const milestones = [
  {
    title: "Sports Champion",
    text: "District-level sports achievements. Consistent team player and competitor across multiple disciplines.",
  },
  {
    title: "BCA Scholar",
    text: "Pursuing Bachelor of Computer Applications with strong academics and deep technical focus.",
  },
  {
    title: "Creative Discipline",
    text: "Strong consistency across photography, design execution, digital presentation, and personal creative work.",
  },
  {
    title: "Certifications",
    text: "Certified in web development, photography editing, and design fundamentals across practical learning tracks.",
  },
];

const journey = [
  [
    "March 2021",
    "Started at Alphonsa School - 88% SSC",
    "Completed secondary school with 88% and wrote the first lines of HTML. The beginning of everything.",
  ],
  [
    "2021 - 2023",
    "College PCM Computer Science - HSC (79%)",
    "Completed HSC with PCM and Computer Science at Sharad Institute of Technology.",
  ],
  ["June 2023", "Creative Growth", "Began building a stronger creative identity across design, photography, and visual storytelling."],
  [
    "2023 - Present",
    "BCA - Jaysingpur College - CGPA 8.67",
    "Enrolled in Bachelor of Computer Application, deepened full-stack skills, and built projects like LensCraft, Photic Photography, Top Byte, and Style Sphere.",
  ],
  [
    "Jan - Nov 2025",
    "Social Media Manager - Textile Daddy",
    "Built real professional experience by growing a B2B textile portal's social presence, running campaigns, and building content systems.",
  ],
  [
    "Jan - Nov 2025",
    "Textile Voice - Contributor",
    "Contributed to software development and digital strategy at Textile Voice while working across the same parent company ecosystem.",
  ],
  [
    "Now",
    "Open to Work - Building LensCraft Startup",
    "Open to internships, collaborations, and opportunities while moving LensCraft toward a serious startup product.",
  ],
];

const certifications = [
  {
    title: "Adobe Photoshop",
    meta: "Certified - 2024",
    text: "Retouching, compositing, color control, and export-ready asset workflows.",
  },
  {
    title: "Canva Design",
    meta: "Design Tools",
    text: "Brand kits, social creatives, quick layout iterations, and clean presentation assets.",
  },
  {
    title: "UI/UX Design",
    meta: "Design Practice",
    text: "Hierarchy, spacing systems, typography, and user-first interface thinking.",
  },
  {
    title: "Database Management",
    meta: "Core Knowledge",
    text: "Structured data thinking, schemas, relationships, and query logic.",
  },
  {
    title: "Networking Basics",
    meta: "Core Knowledge",
    text: "System connectivity, communication fundamentals, and network concepts.",
  },
  {
    title: "Operating Systems",
    meta: "Core Knowledge",
    text: "System fundamentals, process awareness, and platform-level understanding.",
  },
];

function projectMonogram(title) {
  const parts = String(title)
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  const word = parts[0] ?? "";
  return word.slice(0, 2).toUpperCase();
}

function TiltCard({ className = "", children }) {
  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const px = x - 0.5;
    const py = y - 0.5;
    event.currentTarget.style.setProperty("--mx", `${(x * 100).toFixed(2)}%`);
    event.currentTarget.style.setProperty("--my", `${(y * 100).toFixed(2)}%`);
    event.currentTarget.style.transform = `perspective(1000px) rotateX(${(-py * 8).toFixed(
      2,
    )}deg) rotateY(${(px * 10).toFixed(2)}deg) translateY(-6px)`;
  };

  const onLeave = (event) => {
    event.currentTarget.style.transform = "";
    event.currentTarget.style.removeProperty("--mx");
    event.currentTarget.style.removeProperty("--my");
  };

  return (
    <div className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

function MagneticLink({ className = "", href, children, ...props }) {
  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.24;
    event.currentTarget.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  };

  const onLeave = (event) => {
    event.currentTarget.style.transform = "";
  };

  return (
    <a href={href} className={className} onMouseMove={onMove} onMouseLeave={onLeave} {...props}>
      {children}
    </a>
  );
}

function BootLoader({ done }) {
  return (
    <div
      className={`boot-loader${done ? " boot-loader--done" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      aria-hidden={done}
    >
      <TiltCard className="boot-loader__card">
        <div className="boot-loader__logo" aria-hidden="true">
          23
        </div>
        <div className="boot-loader__row">
          <p className="boot-loader__label">Loading portfolio</p>
          <div className="boot-loader__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </TiltCard>
    </div>
  );
}

function InlineIcon({ name, className = "" }) {
  const common = {
    className,
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  };

  switch (name) {
    case "mail":
      return (
        <svg {...common}>
          <path
            d="M4.5 7.5l6.8 5.1c.4.3.9.3 1.3 0l6.9-5.1"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.5 6.5h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path
            d="M8.2 5.5l1.2-1.2a2 2 0 0 1 2.9 0l1.7 1.7a2 2 0 0 1 0 2.9l-.8.8c1.1 2 2.7 3.7 4.7 4.7l.8-.8a2 2 0 0 1 2.9 0l1.7 1.7a2 2 0 0 1 0 2.9l-1.2 1.2c-1.1 1.1-2.8 1.4-4.2.7-6.4-3.1-11.6-8.3-14.7-14.7-.7-1.4-.4-3.1.7-4.2z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "languages":
      return (
        <svg {...common}>
          <path
            d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12h20"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 2a14.5 14.5 0 0 1 0 20a14.5 14.5 0 0 1 0-20z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path
            d="M12 22s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 11.5a2.2 2.2 0 1 0 0-4.4a2.2 2.2 0 0 0 0 4.4z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <path
            d="M12 22a10 10 0 1 0-10-10a10 10 0 0 0 10 10z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 6v6l3.5 2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path
            d="M12 2l1.1 4a2 2 0 0 0 1.4 1.4l4 1.1-4 1.1a2 2 0 0 0-1.4 1.4l-1.1 4-1.1-4a2 2 0 0 0-1.4-1.4L5.5 8.5l4-1.1A2 2 0 0 0 11 6l1-4z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 13l.6 2.1a1.2 1.2 0 0 0 .8.8L22.5 16l-2.1.6a1.2 1.2 0 0 0-.8.8L19 19.5l-.6-2.1a1.2 1.2 0 0 0-.8-.8L15.5 16l2.1-.6a1.2 1.2 0 0 0 .8-.8L19 13z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function App() {
  const sections = useMemo(
    () => ["hero", "experience", "about", "projects", "journey", "milestones", "contact"],
    [],
  );
  const [activeSection, setActiveSection] = useState("hero");
  const [heroBadge, setHeroBadge] = useState("BCA Student - Developer - Kolhapur, MH");
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const delay = prefersReducedMotion ? 0 : 900;
    const timer = window.setTimeout(() => setBootDone(true), delay);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.style.background = "#07070d";
    document.body.style.background = "#07070d";
    document.body.style.color = "#efe8da";

    const revealTargets = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealTargets.forEach((node) => revealObserver.observe(node));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.45 },
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        sectionObserver.observe(element);
      }
    });

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [sections]);

  useEffect(() => {
    const target = "BCA Student - Developer - Kolhapur, MH";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let frame = 0;
    const timer = window.setInterval(() => {
      let next = "";
      for (let index = 0; index < target.length; index += 1) {
        if (target[index] === " ") {
          next += " ";
        } else if (index < frame / 2) {
          next += target[index];
        } else {
          next += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setHeroBadge(next);
      frame += 1;
      if (frame >= target.length * 2) {
        window.clearInterval(timer);
        setHeroBadge(target);
      }
    }, 42);

    return () => window.clearInterval(timer);
  }, []);

  const currentIndex = Math.max(1, sections.indexOf(activeSection) + 1);

  return (
    <>
      <BootLoader done={bootDone} />
      <div className="page-shell">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <div className="grain" />

        <div className="section-counter" aria-hidden="true">
          <span className="section-counter__num">{String(currentIndex).padStart(2, "0")}</span>
          <span className="section-counter__line" />
          <span className="section-counter__total">
            / {String(sections.length).padStart(2, "0")}
          </span>
        </div>

        <header className="site-nav">
          <div className="site-nav__inner">
            <a href="#hero" className="site-logo">
              23
            </a>
            <nav className="site-links">
              {navigation.map((item) => (
                <a key={item.id} href={`#${item.id}`}>
                  {item.label}
                </a>
              ))}
            </nav>
            <a href="#contact" className="site-pill">
              Open to Work
            </a>
          </div>
        </header>

        <main>
          <section className="hero-section" id="hero">
            <div className="container hero-grid">
              <div className="hero-copy">
                <p className="hero-badge reveal">{heroBadge}</p>
                <h1 className="hero-title reveal reveal-delay-1">
                  Omshri <span>Singh</span>
                </h1>
                <div className="hero-role-row reveal reveal-delay-2">
                  <span>Full Stack Dev</span>
                  <span>Photography-Tech</span>
                  <span>Digital Strategy</span>
                  <span>Creator</span>
                </div>
                <p className="hero-text reveal reveal-delay-2">
                  Motivated and self-driven Bachelor of Computer Applications student with 11 months
                  of professional experience in digital marketing and strong hands-on development
                  work across HTML, CSS, JavaScript, ASP.NET, C#, and SQL Server.
                </p>
                <div className="hero-actions reveal reveal-delay-3">
                  <MagneticLink href="#projects" className="button button-primary">
                    View Projects
                  </MagneticLink>
                  <MagneticLink href="#contact" className="button button-secondary">
                    Contact Me
                  </MagneticLink>
                </div>
              </div>

              <div className="hero-stage reveal reveal-delay-2">
                <div className="hero-ring hero-ring--one" />
              <div className="hero-ring hero-ring--two" />
              <div className="hero-ring hero-ring--three" />
              <div className="hero-orb" />
              <TiltCard className="floating-card floating-card--main">
                <div className="floating-card__eyebrow">Focus</div>
                <div className="floating-card__title">Photography-Tech Startup Vision</div>
                <p>Building products where creative work and software meet.</p>
              </TiltCard>
              <TiltCard className="floating-card floating-card--small floating-card--top">
                <div className="stat-value">8.67</div>
                <div className="stat-label">BCA CGPA</div>
              </TiltCard>
              <TiltCard className="floating-card floating-card--small floating-card--bottom">
                <div className="stat-value">11M</div>
                <div className="stat-label">Social Media Manager</div>
              </TiltCard>
            </div>
          </div>

          <div className="container hero-stats reveal reveal-delay-4">
            {heroStats.map((item) => (
              <TiltCard key={item.label} className="hero-stat">
                <div className="hero-stat__value">{item.value}</div>
                <div className="hero-stat__label">{item.label}</div>
              </TiltCard>
            ))}
          </div>
        </section>

        <section className="marquee-bar" aria-hidden="true">
          <div className="marquee-track">
            {[
              "ASP.NET",
              "C#",
              "React",
              "SQL Server",
              "Photography",
              "Lightroom",
              "Digital Marketing",
              "Problem Solving",
              "Kolhapur",
              "Basketball",
              "Cricket",
            ]
              .concat([
                "ASP.NET",
                "C#",
                "React",
                "SQL Server",
                "Photography",
                "Lightroom",
                "Digital Marketing",
                "Problem Solving",
                "Kolhapur",
                "Basketball",
                "Cricket",
              ])
              .map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
          </div>
        </section>

        <section className="section section-dark" id="experience">
          <div className="container">
            <p className="section-eye reveal">Experience</p>
            <h2 className="section-title reveal reveal-delay-1">
              Real-world <span>impact</span>
            </h2>
            <p className="section-subtitle reveal reveal-delay-2">
              Experience before graduation across branding, digital execution, UI thinking, and
              platform support.
            </p>

            <div className="cards-grid cards-grid--two">
              {experience.map((item, index) => (
                <TiltCard key={item.company} className={`panel-card reveal reveal-delay-${index + 2}`}>
                  <div className="panel-top">
                    <div>
                      <h3>{item.company}</h3>
                      <p className="panel-role">{item.role}</p>
                    </div>
                    <span className="panel-period">{item.period}</span>
                  </div>
                  <ul className="bullet-list">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="tag-row">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container about-layout">
            <div className="about-copy">
              <p className="section-eye reveal">About</p>
              <h2 className="section-title reveal reveal-delay-1">
                Developer by logic, <span>creator by instinct</span>
              </h2>
              <p className="section-subtitle reveal reveal-delay-2">
                I combine software thinking, digital communication, photography, and product
                ambition. My long-term direction is clear: build technology that meaningfully serves
                creative professionals.
              </p>

              <div className="facts-grid">
                <TiltCard className="fact-card reveal reveal-delay-3">
                  <div className="fact-card__meta">
                    <span className="fact-card__icon">
                      <InlineIcon name="mail" />
                    </span>
                    <span className="fact-card__label">Email</span>
                  </div>
                  <strong>
                    <a href="mailto:omshri.2311@gmail.com">omshri.2311@gmail.com</a>
                  </strong>
                </TiltCard>
                <TiltCard className="fact-card reveal reveal-delay-4">
                  <div className="fact-card__meta">
                    <span className="fact-card__icon">
                      <InlineIcon name="phone" />
                    </span>
                    <span className="fact-card__label">Phone</span>
                  </div>
                  <strong>
                    <a href="tel:+917387517570">+91 7387517570</a>
                  </strong>
                </TiltCard>
                <TiltCard className="fact-card reveal reveal-delay-3">
                  <div className="fact-card__meta">
                    <span className="fact-card__icon">
                      <InlineIcon name="languages" />
                    </span>
                    <span className="fact-card__label">Languages</span>
                  </div>
                  <strong>English - Hindi - Marathi</strong>
                </TiltCard>
                <TiltCard className="fact-card reveal reveal-delay-4">
                  <div className="fact-card__meta">
                    <span className="fact-card__icon">
                      <InlineIcon name="spark" />
                    </span>
                    <span className="fact-card__label">Extra</span>
                  </div>
                  <strong>Basketball - Cricket - Mobile Photography</strong>
                </TiltCard>
              </div>
            </div>

            <div className="skills-column">
              {skillGroups.map((group, groupIndex) => (
                <div key={group.title} className={`skills-group reveal reveal-delay-${groupIndex + 2}`}>
                  <div className="skills-group__title">{group.title}</div>
                  <div className="skills-list">
                    {group.items.map(([label, value]) => (
                      <div key={label} className="skill-row">
                        <div className="skill-row__top">
                          <span>{label}</span>
                          <span>{value}%</span>
                        </div>
                        <div className="skill-track">
                          <div className="skill-fill" style={{ width: `${value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-dark" id="projects">
          <div className="container">
            <p className="section-eye reveal">Projects</p>
            <h2 className="section-title reveal reveal-delay-1">
              Things I have <span>built</span>
            </h2>
            <p className="section-subtitle reveal reveal-delay-2">
              Practical work rooted in portfolio systems, startup thinking, and interface craft.
            </p>

            <div className="cards-grid cards-grid--projects">
              {projects.map((project, index) => (
                <TiltCard key={project.title} className={`project-card reveal reveal-delay-${index + 2}`}>
                  <div className="project-card__inner">
                    <div className="project-visual">
                      <div className="project-mark" aria-hidden="true">
                        <span className="project-mark__icon">
                          <InlineIcon name="spark" className="project-mark__svg" />
                        </span>
                        <span className="project-mark__abbr">{projectMonogram(project.title)}</span>
                      </div>
                      <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                      <div className="project-glow" />
                    </div>
                    <div className="project-body">
                      <p className="project-type">{project.type}</p>
                      <h3>{project.title}</h3>
                      <p className="project-stack">{project.stack}</p>
                      <p className="project-text">{project.text}</p>
                      <div className="project-links">
                        {project.liveHref ? (
                          <MagneticLink
                            href={project.liveHref}
                            target="_blank"
                            rel="noreferrer"
                            className="project-action project-action--live"
                          >
                            Live
                          </MagneticLink>
                        ) : (
                          <span className="project-action project-action--disabled" aria-disabled="true">
                            Live
                          </span>
                        )}

                        {project.repoHref ? (
                          <MagneticLink
                            href={project.repoHref}
                            target="_blank"
                            rel="noreferrer"
                            className="project-action project-action--repo"
                          >
                            GitHub
                          </MagneticLink>
                        ) : (
                          <span className="project-action project-action--disabled" aria-disabled="true">
                            GitHub
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="journey">
          <div className="container journey-layout">
            <div>
              <p className="section-eye reveal">Journey</p>
              <h2 className="section-title reveal reveal-delay-1">
                Growth with <span>direction</span>
              </h2>
              <p className="section-subtitle reveal reveal-delay-2">
                From learning the web to building product ideas and working in real business
                environments.
              </p>

              <div className="timeline reveal reveal-delay-3">
                {journey.map(([year, title, description]) => {
                  const titleParts = String(title).split(" - ");
                  const metaCandidate = titleParts[titleParts.length - 1] || "";
                  const showMeta =
                    titleParts.length > 1 && /%|\bCGPA\b|\bHSC\b|\bSSC\b|\d/.test(metaCandidate);
                  const mainTitle = showMeta ? titleParts.slice(0, -1).join(" - ") : title;
                  const metaTitle = showMeta ? metaCandidate : "";

                  return (
                    <div key={year + title} className="timeline-item">
                      <span className="timeline-year">{year}</span>
                      <div>
                        <h3 className="timeline-title">
                          <span className="timeline-title__text">{mainTitle}</span>
                          {metaTitle ? <span className="timeline-title__meta">{metaTitle}</span> : null}
                        </h3>
                        <p>{description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="education-stack">
              <div className="section-eye reveal">Education</div>
              {education.map((item, index) => (
                <TiltCard key={item.title} className={`education-card reveal reveal-delay-${index + 2}`}>
                  <p className="education-year">{item.year}</p>
                  <h3>{item.title}</h3>
                  <p className="education-place">{item.place}</p>
                  {item.detail ? <p className="education-detail">{item.detail}</p> : null}
                </TiltCard>
              ))}

              <div className="certifications certifications-grid reveal reveal-delay-4">
                {certifications.map((item, index) => (
                  <TiltCard key={item.title} className={`cert-card cert-card--${index + 1}`}>
                    <p className="cert-card__meta">{item.meta}</p>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section-dark" id="milestones">
          <div className="container">
            <p className="section-eye reveal">Milestones and Wins</p>
            <h2 className="section-title reveal reveal-delay-1">
              Milestones and <span>wins</span>
            </h2>
            <p className="section-subtitle reveal reveal-delay-2">
              Sports, academics, creativity, and execution - the strongest highlights from the
              journey so far.
            </p>

            <div className="cards-grid cards-grid--milestones">
              {milestones.map((item, index) => (
                <TiltCard key={item.title} className={`milestone-card reveal reveal-delay-${index + 1}`}>
                  <div className="milestone-card__inner">
                    <div className="milestone-glow" />
                    <p className="milestone-label">Highlight</p>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-dark" id="contact">
          <div className="contact-wave" />
          <div className="contact-mesh" />
          <div className="container contact-layout">
            <div>
              <p className="section-eye reveal">Contact</p>
              <h2 className="section-title reveal reveal-delay-1">
                Let us create <span>something</span>
              </h2>
              <p className="section-subtitle reveal reveal-delay-2">
                Open for collaborations, photography projects, and meaningful conversations.
              </p>

              <div className="contact-links reveal reveal-delay-3">
                <a className="contact-link" href="mailto:omshri.2311@gmail.com">
                  <span className="contact-link__icon">
                    <InlineIcon name="mail" />
                  </span>
                  <span>omshri.2311@gmail.com</span>
                </a>
                <a className="contact-link" href="tel:+917387517570">
                  <span className="contact-link__icon">
                    <InlineIcon name="phone" />
                  </span>
                  <span>+91 7387517570</span>
                </a>
                <div className="contact-link" role="listitem">
                  <span className="contact-link__icon">
                    <InlineIcon name="pin" />
                  </span>
                  <span>India - Available Remotely</span>
                </div>
                <div className="contact-link" role="listitem">
                  <span className="contact-link__icon">
                    <InlineIcon name="clock" />
                  </span>
                  <span>Responds within 24 hours</span>
                </div>
              </div>

              <div className="contact-socials reveal reveal-delay-4">
                <MagneticLink href="https://www.linkedin.com/in/omshri23/" target="_blank" rel="noreferrer" className="contact-social">
                  LinkedIn
                </MagneticLink>
                <MagneticLink href="https://github.com/omshri-23" target="_blank" rel="noreferrer" className="contact-social">
                  GitHub
                </MagneticLink>
                <MagneticLink href="https://www.instagram.com/photic.photo" target="_blank" rel="noreferrer" className="contact-social">
                  Instagram
                </MagneticLink>
              </div>
            </div>

            <TiltCard className="contact-panel reveal reveal-delay-4">
              <div className="contact-panel__mesh" />
              <p className="contact-panel__label">Current Focus</p>
              <h3>Startup-ready photography products</h3>
              <p>
                LensCraft is the clearest expression of where I want to go next: software that helps
                photographers present, manage, and grow their work.
              </p>
              <div className="contact-panel__buttons">
                <MagneticLink href="mailto:omshri.2311@gmail.com" className="button button-primary">
                  Email Me
                </MagneticLink>
                <MagneticLink href="https://github.com/omshri-23" target="_blank" rel="noreferrer" className="button button-secondary">
                  View GitHub
                </MagneticLink>
              </div>
            </TiltCard>
          </div>
        </section>
      </main>
    </div>
    </>
  );
}

export default App;
