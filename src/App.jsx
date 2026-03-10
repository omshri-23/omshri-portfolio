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
    href: "https://github.com/omshri-23",
  },
  {
    title: "Photic Photography",
    stack: "React - Vite - Frontend Experience",
    type: "Live Photography Portfolio",
    text: "Live photography portfolio built in React and Vite with a cleaner presentation layer, modern frontend structure, and a visual-first browsing experience.",
    href: "https://photic-photography.vercel.app/",
  },
  {
    title: "Top Byte",
    stack: "HTML - CSS - JavaScript",
    type: "E-commerce Frontend",
    text: "Responsive online computer store interface with product discovery, filtering, and cart-oriented UI behavior.",
    href: "https://github.com/omshri-23",
  },
  {
    title: "Style Sphere",
    stack: "Frontend Concept - UI System",
    type: "Fashion Commerce Interface",
    text: "A visual-first fashion storefront concept focused on bold layout, cleaner browsing flow, and modern product presentation.",
    href: "https://github.com/omshri-23/Style-Sphere",
  },
];

const education = [
  {
    year: "2023 - 2026",
    title: "Bachelor of Computer Application",
    place: "Jaysingpur College, Jaysingpur",
    score: "8.67",
    label: "CGPA",
  },
  {
    year: "2021 - 2023",
    title: "Higher Secondary - PCM + Computer Science",
    place: "Sharad Institute of Technology Jr. College, Kolhapur",
    score: "79%",
    label: "Percentage",
  },
  {
    year: "2021",
    title: "Secondary School Certificate",
    place: "Alphonsa School, Yadrav, Kolhapur",
    score: "88%",
    label: "Percentage",
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
    "Textile Voice",
    "Contributor",
    "Jan - Nov 2025 - Contributed to software development and digital strategy at Textile Voice while working across the same parent company ecosystem.",
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
    text: "Photo editing, design workflow, and visual composition fundamentals.",
  },
  {
    title: "Tally and Advanced Excel",
    meta: "Certified - 2024",
    text: "Practical spreadsheet, reporting, and business data handling skills.",
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

function TiltCard({ className = "", children }) {
  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.transform = `perspective(1000px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) translateY(-6px)`;
  };

  const onLeave = (event) => {
    event.currentTarget.style.transform = "";
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

function App() {
  const sections = useMemo(
    () => ["hero", "experience", "about", "projects", "journey", "milestones", "contact"],
    [],
  );
  const [activeSection, setActiveSection] = useState("hero");
  const [heroBadge, setHeroBadge] = useState("BCA Student - Developer - Kolhapur, MH");

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
    <div className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grain" />

      <div className="section-counter" aria-hidden="true">
        <span className="section-counter__num">{String(currentIndex).padStart(2, "0")}</span>
        <span className="section-counter__line" />
        <span className="section-counter__total">/ {String(sections.length).padStart(2, "0")}</span>
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
                Motivated and self-driven Bachelor of Computer Applications student with 11 months of
                professional experience in digital marketing and strong hands-on development work
                across HTML, CSS, JavaScript, ASP.NET, C#, and SQL Server.
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

              <div className="facts-grid reveal reveal-delay-3">
                <div className="fact-card">
                  <span>Email</span>
                  <strong>omshri.2311@gmail.com</strong>
                </div>
                <div className="fact-card">
                  <span>Phone</span>
                  <strong>+91 7387517570</strong>
                </div>
                <div className="fact-card">
                  <span>Languages</span>
                  <strong>English - Hindi - Marathi</strong>
                </div>
                <div className="fact-card">
                  <span>Extra</span>
                  <strong>Basketball - Cricket - Mobile Photography</strong>
                </div>
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
                  <div className="project-visual">
                    <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                    <div className="project-glow" />
                  </div>
                  <div className="project-body">
                    <p className="project-type">{project.type}</p>
                    <h3>{project.title}</h3>
                    <p className="project-stack">{project.stack}</p>
                    <p className="project-text">{project.text}</p>
                    <a href={project.href} target="_blank" rel="noreferrer" className="project-link">
                      {project.title === "Photic Photography" ? "Open Live Project" : "Open Repository"}
                    </a>
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
                {journey.map(([year, title, description]) => (
                  <div key={year + title} className="timeline-item">
                    <span className="timeline-year">{year}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="education-stack">
              <div className="section-eye reveal">Education</div>
              {education.map((item, index) => (
                <TiltCard key={item.title} className={`education-card reveal reveal-delay-${index + 2}`}>
                  <p className="education-year">{item.year}</p>
                  <h3>{item.title}</h3>
                  <p className="education-place">{item.place}</p>
                  <div className="education-score">
                    <strong>{item.score}</strong>
                    <span>{item.label}</span>
                  </div>
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
                  <div className="milestone-glow" />
                  <p className="milestone-label">Highlight</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
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

              <div className="contact-links reveal reveal-delay-3 contact-links--icons">
                <a href="mailto:omshri.2311@gmail.com">omshri.2311@gmail.com</a>
                <span>India - Available Remotely</span>
                <span>Responds within 24 hours</span>
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
  );
}

export default App;
