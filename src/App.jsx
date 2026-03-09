import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const STORAGE_KEY = "portlio23-portfolio-data-v2";
const PASSWORD_KEY = "portlio23-admin-password-v2";

const navItems = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["photography", "Photography"],
  ["blog", "Blog"],
  ["contact", "Contact"],
];

const defaultPortfolioData = {
  hero: {
    label: "Portfolio 2026",
    firstName: "Omshri",
    lastName: "Singh",
    roles: "Developer . Photographer . Creator . Storyteller",
    intro:
      "Building technology, capturing moments, and telling stories. I work at the intersection of code and creativity to turn ideas into digital experiences.",
    primaryLabel: "View My Work",
    primaryHref: "#projects",
    secondaryLabel: "Contact Me",
    secondaryHref: "#contact",
    photoMonogram: "OM",
    photoCaption: "Developer Photographer Creator",
    statOneValue: "3+",
    statOneLabel: "Projects built",
    statTwoValue: "∞",
    statTwoLabel: "Frames captured",
  },
  about: {
    label: "About Me",
    title: "Developer by logic,",
    accent: "artist by soul.",
    tagline: "I build things that matter and capture moments that last.",
    paragraphOne:
      "I'm Omshri Singh, a BCA student with a strong interest in software development, product building, and mobile photography.",
    paragraphTwo:
      "When I'm not writing code, I'm chasing golden hour, crafting stories, working on visual edits, or building ideas around A Book Of My Story - 23.",
    imageText: "OMSHRI",
    interests: [
      "Mobile Photography",
      "Software Dev",
      "Story Writing",
      "Filmmaking",
      "Sports",
      "Color Grading",
      "BCA Student",
      "Creator",
    ],
  },
  skills: [
    {
      title: "Programming",
      items: [
        { name: "HTML / CSS", value: 95 },
        { name: "JavaScript", value: 80 },
        { name: "React", value: 72 },
        { name: "Python", value: 68 },
        { name: "Node.js", value: 60 },
      ],
    },
    {
      title: "Design and Editing",
      items: [
        { name: "Lightroom", value: 92 },
        { name: "Photoshop", value: 78 },
        { name: "Color Grading", value: 88 },
        { name: "UI Design", value: 65 },
      ],
    },
    {
      title: "Creative Arts",
      items: [
        { name: "Photography", value: 90 },
        { name: "Story Writing", value: 85 },
        { name: "Filmmaking", value: 70 },
        { name: "Composition", value: 88 },
      ],
    },
  ],
  projects: [
    {
      title: "Photic Photo Portfolio",
      tech: "React, CSS, Lightroom",
      desc:
        "A photography-first portfolio platform with a lightbox viewer, category filtering, and a polished showcase layout.",
      accent: "PH",
      href: "https://github.com/omshri-23",
      linkLabel: "View GitHub Profile",
    },
    {
      title: "LensCraft Platform",
      tech: "React, Node.js, PostgreSQL",
      desc:
        "A B2B marketplace connecting photographers with clients through bookings, galleries, messaging, and dashboards.",
      accent: "LC",
      href: "https://github.com/omshri-23",
      linkLabel: "Explore Work",
    },
    {
      title: "Story Archive",
      tech: "HTML, CSS, JavaScript",
      desc:
        "A personal writing archive for poetry, short stories, and essays with a minimal reading-first design.",
      accent: "ST",
      href: "https://github.com/omshri-23",
      linkLabel: "See More Writing",
    },
  ],
  photos: [
    { category: "nature", title: "Golden Hour Forest", label: "Nature Shot", monogram: "NT" },
    { category: "street", title: "Urban Geometry", label: "Street Shot", monogram: "ST" },
    { category: "portrait", title: "Natural Light Study", label: "Portrait Shot", monogram: "PR" },
    { category: "edit", title: "Cinematic Grade", label: "Creative Edit", monogram: "ED" },
    { category: "nature", title: "Sunrise Over Horizon", label: "Nature Shot", monogram: "SN" },
    { category: "street", title: "Rainy Evening Walk", label: "Street Shot", monogram: "RW" },
  ],
  achievements: [
    { title: "Sports Champion", desc: "District-level sports achievements and strong team participation across multiple disciplines." },
    { title: "BCA Scholar", desc: "Pursuing Bachelor of Computer Applications with a strong academic and technical focus." },
    { title: "Published Author", desc: "Author of A Book Of My Story - 23, a personal narrative of life, emotion, and discovery." },
    { title: "Certifications", desc: "Certified in web development, photography editing, and design fundamentals." },
  ],
  blogs: [
    { type: "Book Excerpt", title: "A Book Of My Story - 23", excerpt: "A personal collection of stories, reflections, and poetry about growth, failure, and creating.", badge: "BK" },
    { type: "Photography Essay", title: "Why I Shoot with My Phone", excerpt: "How mobile photography changed the way I see the world and why creative constraints make work stronger.", badge: "MP" },
    { type: "Thoughts", title: "Building at the Intersection", excerpt: "On living between the worlds of logic and art and why that tension is the most interesting place to create from.", badge: "IN" },
  ],
  socials: [
    { label: "Email 1", href: "mailto:omshri.2311@gmail.com" },
    { label: "Email 2", href: "mailto:omshrisingh93056@gmail.com" },
    { label: "Instagram", href: "https://www.instagram.com/photic.photo" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/omshri23" },
    { label: "GitHub", href: "https://github.com/omshri-23" },
    { label: "YouTube", href: "https://www.youtube.com/@PHOTIC_PHOTO" },
    { label: "Phone", href: "tel:+917387517570" },
  ],
  contact: {
    label: "Contact",
    title: "Let's create something.",
    subtitle:
      "Open for collaborations, projects, internships, freelance work, and conversations. Based in Kolhapur, Maharashtra, India. Reach me at +91 7387517570.",
    formMessage: "Message saved for portfolio demo. Connect Formspree or your backend to make it live.",
  },
  footer: {
    left: "2026 Omshri Singh . Developer . Photographer . Creator",
    right: "Designed and built with care.",
  },
};

const adminTabs = [
  ["hero", "Hero"],
  ["about", "About"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["photos", "Photos"],
  ["achievements", "Achievements"],
  ["blogs", "Blogs"],
  ["socials", "Socials"],
  ["settings", "Settings"],
];

function loadPortfolioData() {
  if (typeof window === "undefined") {
    return defaultPortfolioData;
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return defaultPortfolioData;
    }

    const parsed = JSON.parse(stored);
    return normalizePortfolioData(parsed);
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return defaultPortfolioData;
  }
}

function normalizePortfolioData(parsed) {
  const safe = parsed && typeof parsed === "object" ? parsed : {};

  const normalized = {
    hero: { ...defaultPortfolioData.hero, ...(safe.hero || {}) },
    about: {
      ...defaultPortfolioData.about,
      ...(safe.about || {}),
      interests: Array.isArray(safe.about?.interests)
        ? safe.about.interests.map((item) => String(item))
        : defaultPortfolioData.about.interests,
    },
    skills: Array.isArray(safe.skills)
      ? safe.skills.map((group, groupIndex) => ({
          title: String(group?.title || `Skill Group ${groupIndex + 1}`),
          items: Array.isArray(group?.items)
            ? group.items.map((item, itemIndex) => ({
                name: String(item?.name || `Skill ${itemIndex + 1}`),
                value: Number(item?.value ?? 50) || 0,
              }))
            : defaultPortfolioData.skills[Math.min(groupIndex, defaultPortfolioData.skills.length - 1)].items,
        }))
      : defaultPortfolioData.skills,
    projects: Array.isArray(safe.projects)
      ? safe.projects.map((item, index) => ({
          title: String(item?.title || `Project ${index + 1}`),
          tech: typeof item?.tech === "string" ? item.tech : "React, CSS",
          desc: String(item?.desc || "Project description"),
          accent: String(item?.accent || "PR"),
          href: String(item?.href || "https://github.com/omshri-23"),
          linkLabel: String(item?.linkLabel || "Open Project"),
        }))
      : defaultPortfolioData.projects,
    photos: Array.isArray(safe.photos)
      ? safe.photos.map((item, index) =>
          Array.isArray(item)
            ? {
                category: String(item[0] || "nature"),
                title: String(item[1] || `Photo ${index + 1}`),
                label: String(item[2] || "Photo Label"),
                monogram: "PH",
              }
            : {
                category: String(item?.category || "nature"),
                title: String(item?.title || `Photo ${index + 1}`),
                label: String(item?.label || "Photo Label"),
                monogram: String(item?.monogram || "PH"),
              },
        )
      : defaultPortfolioData.photos,
    achievements: Array.isArray(safe.achievements)
      ? safe.achievements.map((item, index) =>
          Array.isArray(item)
            ? { title: String(item[0] || `Achievement ${index + 1}`), desc: String(item[1] || "") }
            : { title: String(item?.title || `Achievement ${index + 1}`), desc: String(item?.desc || "") },
        )
      : defaultPortfolioData.achievements,
    blogs: Array.isArray(safe.blogs)
      ? safe.blogs.map((item, index) =>
          Array.isArray(item)
            ? {
                type: String(item[0] || "Article"),
                title: String(item[1] || `Blog ${index + 1}`),
                excerpt: String(item[2] || ""),
                badge: String(item[3] || "BL"),
              }
            : {
                type: String(item?.type || "Article"),
                title: String(item?.title || `Blog ${index + 1}`),
                excerpt: String(item?.excerpt || ""),
                badge: String(item?.badge || "BL"),
              },
        )
      : defaultPortfolioData.blogs,
    socials: Array.isArray(safe.socials)
      ? safe.socials.map((item, index) =>
          Array.isArray(item)
            ? { label: String(item[0] || `Link ${index + 1}`), href: String(item[1] || "#") }
            : { label: String(item?.label || `Link ${index + 1}`), href: String(item?.href || "#") },
        )
      : defaultPortfolioData.socials,
    contact: { ...defaultPortfolioData.contact, ...(safe.contact || {}) },
    footer: { ...defaultPortfolioData.footer, ...(safe.footer || {}) },
  };

  if (
    !normalized.hero.firstName ||
    !normalized.about.interests.length ||
    !Array.isArray(normalized.skills) ||
    !Array.isArray(normalized.projects) ||
    !Array.isArray(normalized.photos)
  ) {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    return defaultPortfolioData;
  }

  return normalized;
}

function loadPassword() {
  if (typeof window === "undefined") {
    return "admin123";
  }
  return window.localStorage.getItem(PASSWORD_KEY) || "admin123";
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function HoverLink({ children, href, onEnter, onLeave, variant }) {
  return (
    <a className={variant === "primary" ? "btn-primary" : "btn-outline"} href={href} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {children}
    </a>
  );
}

function AdminField({ label, onChange, value }) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      <input onChange={(event) => onChange(event.target.value)} value={value} />
    </label>
  );
}

function AdminTextArea({ label, onChange, value }) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      <textarea onChange={(event) => onChange(event.target.value)} rows="4" value={value} />
    </label>
  );
}

function ArrayEditor({ addItem, fields, items, onChange, onRemove }) {
  return (
    <div className="admin-section">
      {items.map((item, index) => (
        <div className="admin-card" key={`${fields[0][0]}-${index}`}>
          {fields.map(([field, label, multiline]) =>
            multiline ? (
              <AdminTextArea key={field} label={label} onChange={(value) => onChange(index, field, value)} value={item[field]} />
            ) : (
              <AdminField key={field} label={label} onChange={(value) => onChange(index, field, value)} value={item[field]} />
            ),
          )}
          <button className="admin-danger" onClick={() => onRemove(index)} type="button">
            Remove
          </button>
        </div>
      ))}
      <button className="admin-add" onClick={addItem} type="button">
        Add Item
      </button>
    </div>
  );
}

function AdminPanel({
  activeAdminTab,
  adminDraftPassword,
  adminLoggedIn,
  adminOpen,
  loginError,
  loginInput,
  onAddArrayItem,
  onAddInterest,
  onAddSkillGroup,
  onAddSkillItem,
  onAdminDraftPasswordChange,
  onArrayItemChange,
  onChangeTab,
  onInterestChange,
  onLogin,
  onLoginInputChange,
  onRemoveArrayItem,
  onRemoveInterest,
  onRemoveSkillGroup,
  onRemoveSkillItem,
  onResetPortfolio,
  onSavePassword,
  onSectionChange,
  onSkillGroupChange,
  onSkillItemChange,
  portfolio,
  saveMessage,
}) {
  if (!adminOpen) {
    return null;
  }

  return (
    <aside className="admin-panel">
      <div className="admin-panel-head">
        <div>
          <div className="admin-eyebrow">Portlio Admin</div>
          <h3>Manage Portfolio Content</h3>
        </div>
        {saveMessage ? <span className="admin-save-badge">{saveMessage}</span> : null}
      </div>

      {!adminLoggedIn ? (
        <div className="admin-login">
          <label htmlFor="admin-password">Admin password</label>
          <input id="admin-password" onChange={(event) => onLoginInputChange(event.target.value)} placeholder="Enter password" type="password" value={loginInput} />
          <button className="btn-primary admin-btn" onClick={onLogin} type="button">
            Login
          </button>
          <p className="admin-note">Default password: `admin123`</p>
          {loginError ? <p className="admin-error">{loginError}</p> : null}
        </div>
      ) : (
        <>
          <div className="admin-tabs">
            {adminTabs.map(([value, label]) => (
              <button className={`admin-tab ${activeAdminTab === value ? "active" : ""}`} key={value} onClick={() => onChangeTab(value)} type="button">
                {label}
              </button>
            ))}
          </div>

          <div className="admin-body">
            {activeAdminTab === "hero" ? (
              <div className="admin-section">
                <AdminField label="Hero label" onChange={(value) => onSectionChange("hero", "label", value)} value={portfolio.hero.label} />
                <AdminField label="First name" onChange={(value) => onSectionChange("hero", "firstName", value)} value={portfolio.hero.firstName} />
                <AdminField label="Last name" onChange={(value) => onSectionChange("hero", "lastName", value)} value={portfolio.hero.lastName} />
                <AdminField label="Roles line" onChange={(value) => onSectionChange("hero", "roles", value)} value={portfolio.hero.roles} />
                <AdminTextArea label="Intro" onChange={(value) => onSectionChange("hero", "intro", value)} value={portfolio.hero.intro} />
                <AdminField label="Primary button label" onChange={(value) => onSectionChange("hero", "primaryLabel", value)} value={portfolio.hero.primaryLabel} />
                <AdminField label="Primary button href" onChange={(value) => onSectionChange("hero", "primaryHref", value)} value={portfolio.hero.primaryHref} />
                <AdminField label="Secondary button label" onChange={(value) => onSectionChange("hero", "secondaryLabel", value)} value={portfolio.hero.secondaryLabel} />
                <AdminField label="Secondary button href" onChange={(value) => onSectionChange("hero", "secondaryHref", value)} value={portfolio.hero.secondaryHref} />
                <AdminField label="Hero monogram" onChange={(value) => onSectionChange("hero", "photoMonogram", value)} value={portfolio.hero.photoMonogram} />
                <AdminField label="Hero caption" onChange={(value) => onSectionChange("hero", "photoCaption", value)} value={portfolio.hero.photoCaption} />
                <AdminField label="Stat one value" onChange={(value) => onSectionChange("hero", "statOneValue", value)} value={portfolio.hero.statOneValue} />
                <AdminField label="Stat one label" onChange={(value) => onSectionChange("hero", "statOneLabel", value)} value={portfolio.hero.statOneLabel} />
                <AdminField label="Stat two value" onChange={(value) => onSectionChange("hero", "statTwoValue", value)} value={portfolio.hero.statTwoValue} />
                <AdminField label="Stat two label" onChange={(value) => onSectionChange("hero", "statTwoLabel", value)} value={portfolio.hero.statTwoLabel} />
              </div>
            ) : null}

            {activeAdminTab === "about" ? (
              <div className="admin-section">
                <AdminField label="Section label" onChange={(value) => onSectionChange("about", "label", value)} value={portfolio.about.label} />
                <AdminField label="Title line" onChange={(value) => onSectionChange("about", "title", value)} value={portfolio.about.title} />
                <AdminField label="Accent line" onChange={(value) => onSectionChange("about", "accent", value)} value={portfolio.about.accent} />
                <AdminField label="Tagline" onChange={(value) => onSectionChange("about", "tagline", value)} value={portfolio.about.tagline} />
                <AdminTextArea label="Paragraph one" onChange={(value) => onSectionChange("about", "paragraphOne", value)} value={portfolio.about.paragraphOne} />
                <AdminTextArea label="Paragraph two" onChange={(value) => onSectionChange("about", "paragraphTwo", value)} value={portfolio.about.paragraphTwo} />
                <AdminField label="Image text" onChange={(value) => onSectionChange("about", "imageText", value)} value={portfolio.about.imageText} />
                <div className="admin-subhead">Interests</div>
                {portfolio.about.interests.map((interest, index) => (
                  <div className="admin-inline" key={`${interest}-${index}`}>
                    <input onChange={(event) => onInterestChange(index, event.target.value)} value={interest} />
                    <button className="admin-danger" onClick={() => onRemoveInterest(index)} type="button">
                      Remove
                    </button>
                  </div>
                ))}
                <button className="admin-add" onClick={onAddInterest} type="button">
                  Add Interest
                </button>
              </div>
            ) : null}

            {activeAdminTab === "skills" ? (
              <div className="admin-section">
                {portfolio.skills.map((group, groupIndex) => (
                  <div className="admin-card" key={`${group.title}-${groupIndex}`}>
                    <div className="admin-inline admin-space">
                      <input onChange={(event) => onSkillGroupChange(groupIndex, "title", event.target.value)} value={group.title} />
                      <button className="admin-danger" onClick={() => onRemoveSkillGroup(groupIndex)} type="button">
                        Remove Group
                      </button>
                    </div>
                    {group.items.map((item, itemIndex) => (
                      <div className="admin-grid-two" key={`${item.name}-${itemIndex}`}>
                        <input onChange={(event) => onSkillItemChange(groupIndex, itemIndex, "name", event.target.value)} value={item.name} />
                        <div className="admin-inline">
                          <input onChange={(event) => onSkillItemChange(groupIndex, itemIndex, "value", event.target.value)} value={item.value} />
                          <button className="admin-danger" onClick={() => onRemoveSkillItem(groupIndex, itemIndex)} type="button">
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-add" onClick={() => onAddSkillItem(groupIndex)} type="button">
                      Add Skill
                    </button>
                  </div>
                ))}
                <button className="admin-add" onClick={onAddSkillGroup} type="button">
                  Add Skill Group
                </button>
              </div>
            ) : null}

            {activeAdminTab === "projects" ? (
              <ArrayEditor
                addItem={() =>
                  onAddArrayItem("projects", {
                    title: "New Project",
                    tech: "React, CSS",
                    desc: "Describe the project here.",
                    accent: "NP",
                    href: "https://github.com/omshri-23",
                    linkLabel: "Open Project",
                  })
                }
                fields={[
                  ["title", "Title"],
                  ["tech", "Tech CSV"],
                  ["desc", "Description", true],
                  ["accent", "Accent"],
                  ["href", "Link"],
                  ["linkLabel", "Link Label"],
                ]}
                items={portfolio.projects}
                onChange={(index, field, value) => onArrayItemChange("projects", index, field, value)}
                onRemove={(index) => onRemoveArrayItem("projects", index)}
              />
            ) : null}

            {activeAdminTab === "photos" ? (
              <ArrayEditor
                addItem={() =>
                  onAddArrayItem("photos", {
                    category: "nature",
                    title: "New Photo",
                    label: "Photo Label",
                    monogram: "NP",
                  })
                }
                fields={[
                  ["category", "Category"],
                  ["title", "Title"],
                  ["label", "Label"],
                  ["monogram", "Monogram"],
                ]}
                items={portfolio.photos}
                onChange={(index, field, value) => onArrayItemChange("photos", index, field, value)}
                onRemove={(index) => onRemoveArrayItem("photos", index)}
              />
            ) : null}

            {activeAdminTab === "achievements" ? (
              <ArrayEditor
                addItem={() => onAddArrayItem("achievements", { title: "New Achievement", desc: "Achievement description." })}
                fields={[
                  ["title", "Title"],
                  ["desc", "Description", true],
                ]}
                items={portfolio.achievements}
                onChange={(index, field, value) => onArrayItemChange("achievements", index, field, value)}
                onRemove={(index) => onRemoveArrayItem("achievements", index)}
              />
            ) : null}

            {activeAdminTab === "blogs" ? (
              <ArrayEditor
                addItem={() =>
                  onAddArrayItem("blogs", {
                    type: "New Type",
                    title: "New Blog",
                    excerpt: "Write the summary here.",
                    badge: "NB",
                  })
                }
                fields={[
                  ["type", "Type"],
                  ["title", "Title"],
                  ["excerpt", "Excerpt", true],
                  ["badge", "Badge"],
                ]}
                items={portfolio.blogs}
                onChange={(index, field, value) => onArrayItemChange("blogs", index, field, value)}
                onRemove={(index) => onRemoveArrayItem("blogs", index)}
              />
            ) : null}

            {activeAdminTab === "socials" ? (
              <ArrayEditor
                addItem={() => onAddArrayItem("socials", { label: "New Link", href: "https://example.com" })}
                fields={[
                  ["label", "Label"],
                  ["href", "URL"],
                ]}
                items={portfolio.socials}
                onChange={(index, field, value) => onArrayItemChange("socials", index, field, value)}
                onRemove={(index) => onRemoveArrayItem("socials", index)}
              />
            ) : null}

            {activeAdminTab === "settings" ? (
              <div className="admin-section">
                <AdminField label="Contact label" onChange={(value) => onSectionChange("contact", "label", value)} value={portfolio.contact.label} />
                <AdminField label="Contact title" onChange={(value) => onSectionChange("contact", "title", value)} value={portfolio.contact.title} />
                <AdminTextArea label="Contact subtitle" onChange={(value) => onSectionChange("contact", "subtitle", value)} value={portfolio.contact.subtitle} />
                <AdminTextArea label="Form success message" onChange={(value) => onSectionChange("contact", "formMessage", value)} value={portfolio.contact.formMessage} />
                <AdminField label="Footer left" onChange={(value) => onSectionChange("footer", "left", value)} value={portfolio.footer.left} />
                <AdminField label="Footer right" onChange={(value) => onSectionChange("footer", "right", value)} value={portfolio.footer.right} />
                <div className="admin-subhead">Admin password</div>
                <div className="admin-inline">
                  <input onChange={(event) => onAdminDraftPasswordChange(event.target.value)} type="password" value={adminDraftPassword} />
                  <button className="admin-add" onClick={onSavePassword} type="button">
                    Save Password
                  </button>
                </div>
                <button className="admin-danger admin-reset" onClick={onResetPortfolio} type="button">
                  Reset Portfolio to Default
                </button>
              </div>
            ) : null}
          </div>
        </>
      )}
    </aside>
  );
}

function App() {
  const [theme, setTheme] = useState("dark");
  const [portfolio, setPortfolio] = useState(loadPortfolioData);
  const [adminPassword, setAdminPassword] = useState(loadPassword);
  const [adminDraftPassword, setAdminDraftPassword] = useState(loadPassword);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [loginInput, setLoginInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeAdminTab, setActiveAdminTab] = useState("hero");
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxItem, setLightboxItem] = useState(null);
  const [navCompact, setNavCompact] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, grow: false });
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const revealRef = useRef(new Set());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    window.localStorage.setItem(PASSWORD_KEY, adminPassword);
  }, [adminPassword]);

  useEffect(() => {
    const onMove = (event) => {
      setCursor((current) => ({ ...current, x: event.clientX, y: event.clientY }));
    };
    const onScroll = () => setNavCompact(window.scrollY > 60);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          if (!revealRef.current.has(entry.target)) {
            revealRef.current.add(entry.target);
            entry.target.classList.add("visible");
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [portfolio, adminOpen, activeAdminTab]);

  useEffect(() => {
    if (!lightboxItem) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxItem(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxItem]);

  useEffect(() => {
    if (!saveMessage) {
      return undefined;
    }
    const timeout = window.setTimeout(() => setSaveMessage(""), 2400);
    return () => window.clearTimeout(timeout);
  }, [saveMessage]);

  const filteredPhotos = useMemo(() => {
    if (activeFilter === "all") {
      return portfolio.photos;
    }
    return portfolio.photos.filter((photo) => photo.category === activeFilter);
  }, [activeFilter, portfolio.photos]);

  const toggleCursor = (grow) => {
    setCursor((current) => ({ ...current, grow }));
  };

  const updateForm = (field, value) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const updateSection = (section, field, value) => {
    setPortfolio((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
    }));
    setSaveMessage("Saved");
  };

  const updateArrayItem = (section, index, field, value) => {
    setPortfolio((current) => ({
      ...current,
      [section]: current[section].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
    setSaveMessage("Saved");
  };

  const addArrayItem = (section, item) => {
    setPortfolio((current) => ({
      ...current,
      [section]: [...current[section], item],
    }));
    setSaveMessage("Saved");
  };

  const removeArrayItem = (section, index) => {
    setPortfolio((current) => ({
      ...current,
      [section]: current[section].filter((_, itemIndex) => itemIndex !== index),
    }));
    setSaveMessage("Saved");
  };

  const updateInterest = (index, value) => {
    setPortfolio((current) => ({
      ...current,
      about: {
        ...current.about,
        interests: current.about.interests.map((item, itemIndex) => (itemIndex === index ? value : item)),
      },
    }));
    setSaveMessage("Saved");
  };

  const addInterest = () => {
    setPortfolio((current) => ({
      ...current,
      about: {
        ...current.about,
        interests: [...current.about.interests, "New Interest"],
      },
    }));
    setSaveMessage("Saved");
  };

  const removeInterest = (index) => {
    setPortfolio((current) => ({
      ...current,
      about: {
        ...current.about,
        interests: current.about.interests.filter((_, itemIndex) => itemIndex !== index),
      },
    }));
    setSaveMessage("Saved");
  };

  const updateSkillGroup = (groupIndex, field, value) => {
    setPortfolio((current) => ({
      ...current,
      skills: current.skills.map((group, index) => (index === groupIndex ? { ...group, [field]: value } : group)),
    }));
    setSaveMessage("Saved");
  };

  const updateSkillItem = (groupIndex, itemIndex, field, value) => {
    setPortfolio((current) => ({
      ...current,
      skills: current.skills.map((group, index) =>
        index === groupIndex
          ? {
              ...group,
              items: group.items.map((item, skillIndex) =>
                skillIndex === itemIndex ? { ...item, [field]: field === "value" ? Number(value) || 0 : value } : item,
              ),
            }
          : group,
      ),
    }));
    setSaveMessage("Saved");
  };

  const addSkillGroup = () => {
    addArrayItem("skills", { title: "New Skill Group", items: [{ name: "New Skill", value: 50 }] });
  };

  const removeSkillGroup = (groupIndex) => {
    removeArrayItem("skills", groupIndex);
  };

  const addSkillItem = (groupIndex) => {
    setPortfolio((current) => ({
      ...current,
      skills: current.skills.map((group, index) =>
        index === groupIndex ? { ...group, items: [...group.items, { name: "New Skill", value: 50 }] } : group,
      ),
    }));
    setSaveMessage("Saved");
  };

  const removeSkillItem = (groupIndex, itemIndex) => {
    setPortfolio((current) => ({
      ...current,
      skills: current.skills.map((group, index) =>
        index === groupIndex ? { ...group, items: group.items.filter((_, skillIndex) => skillIndex !== itemIndex) } : group,
      ),
    }));
    setSaveMessage("Saved");
  };

  const handleAdminLogin = () => {
    if (loginInput === adminPassword) {
      setAdminLoggedIn(true);
      setLoginError("");
      setLoginInput("");
      return;
    }
    setLoginError("Wrong password");
  };

  const submitForm = (event) => {
    event.preventDefault();
    setFormStatus(portfolio.contact.formMessage);
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  const resetPortfolio = () => {
    setPortfolio(defaultPortfolioData);
    setAdminDraftPassword("admin123");
    setAdminPassword("admin123");
    setSaveMessage("Reset complete");
  };

  const saveAdminPassword = () => {
    if (!adminDraftPassword.trim()) {
      return;
    }
    setAdminPassword(adminDraftPassword.trim());
    setSaveMessage("Password updated");
  };

  return (
    <div className="app-shell">
      <div id="cursor" className={cursor.grow ? "grow" : ""} style={{ left: cursor.x, top: cursor.y }} />

      <button className="admin-toggle" onClick={() => setAdminOpen((current) => !current)} onMouseEnter={() => toggleCursor(true)} onMouseLeave={() => toggleCursor(false)} type="button">
        {adminOpen ? "Close Admin" : "Admin"}
      </button>

      <div className={`lightbox ${lightboxItem ? "open" : ""}`} onClick={() => setLightboxItem(null)}>
        <div className="lightbox-inner" onClick={(event) => event.stopPropagation()}>
          <p className="lightbox-title">{lightboxItem?.title || "Your photograph will appear here"}</p>
          <p className="lightbox-label">{lightboxItem?.label || "Click outside to close"}</p>
        </div>
        <button className="lightbox-close" onClick={() => setLightboxItem(null)} type="button">
          X
        </button>
      </div>

      <AdminPanel
        activeAdminTab={activeAdminTab}
        adminDraftPassword={adminDraftPassword}
        adminLoggedIn={adminLoggedIn}
        adminOpen={adminOpen}
        loginError={loginError}
        loginInput={loginInput}
        onAddArrayItem={addArrayItem}
        onAddInterest={addInterest}
        onAddSkillGroup={addSkillGroup}
        onAddSkillItem={addSkillItem}
        onAdminDraftPasswordChange={setAdminDraftPassword}
        onArrayItemChange={updateArrayItem}
        onChangeTab={setActiveAdminTab}
        onInterestChange={updateInterest}
        onLogin={handleAdminLogin}
        onLoginInputChange={setLoginInput}
        onRemoveArrayItem={removeArrayItem}
        onRemoveInterest={removeInterest}
        onRemoveSkillGroup={removeSkillGroup}
        onRemoveSkillItem={removeSkillItem}
        onResetPortfolio={resetPortfolio}
        onSavePassword={saveAdminPassword}
        onSectionChange={updateSection}
        onSkillGroupChange={updateSkillGroup}
        onSkillItemChange={updateSkillItem}
        portfolio={portfolio}
        saveMessage={saveMessage}
      />

      <nav id="navbar" style={{ padding: navCompact ? ".75rem 4rem" : "1.25rem 4rem" }}>
        <div className="nav-logo">OS.</div>
        <ul className="nav-links">
          {navItems.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`}>{label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <button className="theme-btn" onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))} onMouseEnter={() => toggleCursor(true)} onMouseLeave={() => toggleCursor(false)} title="Toggle theme" type="button">
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </nav>

      <section id="home">
        <div className="hero-bg" />
        <div className="hero-grid-lines" />
        <div className="hero-left reveal">
          <div className="hero-label">{portfolio.hero.label}</div>
          <h1 className="hero-name">
            {portfolio.hero.firstName}
            <br />
            <em>{portfolio.hero.lastName}</em>
          </h1>
          <div className="hero-roles">{portfolio.hero.roles}</div>
          <p className="hero-intro">{portfolio.hero.intro}</p>
          <div className="hero-btns">
            <HoverLink href={portfolio.hero.primaryHref} onEnter={() => toggleCursor(true)} onLeave={() => toggleCursor(false)} variant="primary">
              {portfolio.hero.primaryLabel}
            </HoverLink>
            <HoverLink href={portfolio.hero.secondaryHref} onEnter={() => toggleCursor(true)} onLeave={() => toggleCursor(false)} variant="outline">
              {portfolio.hero.secondaryLabel}
            </HoverLink>
          </div>
        </div>
        <div className="hero-right reveal">
          <div className="hero-photo-frame">
            <div className="hero-photo-bg">
              <div className="hero-photo-placeholder">
                <div className="icon">{portfolio.hero.photoMonogram}</div>
                <p>{portfolio.hero.photoCaption}</p>
              </div>
            </div>
            <div className="hero-photo-deco" />
            <div className="hero-stat-chips">
              <div className="stat-chip">
                <strong>{portfolio.hero.statOneValue}</strong>
                <span>{portfolio.hero.statOneLabel}</span>
              </div>
              <div className="stat-chip">
                <strong>{portfolio.hero.statTwoValue}</strong>
                <span>{portfolio.hero.statTwoLabel}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <div className="divider" />

      <section id="about">
        <div className="about-grid">
          <div className="about-img-frame reveal">
            <div className="placeholder-icon">{portfolio.about.imageText}</div>
          </div>
          <div className="about-content reveal">
            <div className="section-label">{portfolio.about.label}</div>
            <h2 className="section-title">
              {portfolio.about.title}
              <br />
              <em>{portfolio.about.accent}</em>
            </h2>
            <p className="about-tagline">{portfolio.about.tagline}</p>
            <p className="about-text">{portfolio.about.paragraphOne}</p>
            <p className="about-text about-tight">{portfolio.about.paragraphTwo}</p>
            <div className="interest-tags">
              {portfolio.about.interests.map((item) => (
                <span className="tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
            <HoverLink href="#contact" onEnter={() => toggleCursor(true)} onLeave={() => toggleCursor(false)} variant="primary">
              Let's Connect
            </HoverLink>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="skills">
        <div className="section-label">My Skills</div>
        <h2 className="section-title">Craft meets code.</h2>
        <p className="section-sub">Everything below is editable from the admin panel, including skill groups and percentages.</p>
        <div className="skills-grid">
          {portfolio.skills.map((group) => (
            <div className="skill-card reveal" key={group.title} onMouseEnter={() => toggleCursor(true)} onMouseLeave={() => toggleCursor(false)}>
              <div className="skill-card-title">{group.title}</div>
              <div className="skill-items">
                {group.items.map((item) => (
                  <div className="skill-item" key={`${group.title}-${item.name}`}>
                    <div className="skill-item-label">
                      {item.name}
                      <span>{item.value}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-bar-fill" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      <section id="projects">
        <div className="section-label">Projects</div>
        <h2 className="section-title">Things I've built.</h2>
        <p className="section-sub">Add, remove, or edit project cards any time from the admin panel.</p>
        <div className="projects-grid">
          {portfolio.projects.map((project) => (
            <article className="project-card reveal" key={project.title} onMouseEnter={() => toggleCursor(true)} onMouseLeave={() => toggleCursor(false)}>
              <div className="project-img">
                <span className="project-img-placeholder">{project.accent}</span>
                <div className="project-img-overlay" />
              </div>
              <div className="project-body">
                <div className="project-tech">
                  {project.tech.split(",").map((item) => (
                    <span className="tech-badge" key={`${project.title}-${item.trim()}`}>
                      {item.trim()}
                    </span>
                  ))}
                </div>
                <div className="project-title">{project.title}</div>
                <p className="project-desc">{project.desc}</p>
                <a className="project-link" href={project.href} rel="noreferrer" target="_blank">
                  {project.linkLabel}
                </a>
              </div>
            </article>
          ))}
          <div className="project-card project-card-empty reveal">
            <span className="plus-mark">+</span>
            <p>Add more projects from admin whenever needed</p>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="photography">
        <div className="section-label">Photography</div>
        <h2 className="section-title">Light is my medium.</h2>
        <p className="section-sub">Photo cards and categories are fully admin-managed now.</p>
        <div className="photo-filter-bar">
          {["all", "nature", "street", "portrait", "edit"].map((filter) => (
            <button className={`filter-btn ${activeFilter === filter ? "active" : ""}`} key={filter} onClick={() => setActiveFilter(filter)} onMouseEnter={() => toggleCursor(true)} onMouseLeave={() => toggleCursor(false)} type="button">
              {filter === "all" ? "All" : filter === "edit" ? "Creative Edits" : capitalize(filter)}
            </button>
          ))}
        </div>
        <div className="photo-masonry" id="photo-grid">
          {filteredPhotos.map((photo, index) => (
            <button className="photo-item" key={`${photo.title}-${index}`} onClick={() => setLightboxItem(photo)} onMouseEnter={() => toggleCursor(true)} onMouseLeave={() => toggleCursor(false)} type="button">
              <div className="photo-item-inner">
                <div className="photo-placeholder">
                  <div className="big-icon">{photo.monogram}</div>
                  <p>{photo.label}</p>
                </div>
                <div className="photo-overlay">
                  <div className="photo-meta">
                    <span className="photo-category">{photo.category}</span>
                    <br />
                    {photo.title}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="divider" />

      <section id="achievements">
        <div className="section-label">Achievements</div>
        <h2 className="section-title">Milestones.</h2>
        <p className="section-sub">Achievement cards can be added and removed from admin.</p>
        <div className="achievements-grid">
          {portfolio.achievements.map((item) => (
            <div className="ach-card reveal" key={item.title} onMouseEnter={() => toggleCursor(true)} onMouseLeave={() => toggleCursor(false)}>
              <div className="ach-title">{item.title}</div>
              <p className="ach-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      <section id="blog">
        <div className="section-label">Writing and Blog</div>
        <h2 className="section-title">Stories worth telling.</h2>
        <p className="section-sub">Blog cards are also dynamic now.</p>
        <div className="blog-grid">
          {portfolio.blogs.map((item) => (
            <article className="blog-card reveal" key={item.title} onMouseEnter={() => toggleCursor(true)} onMouseLeave={() => toggleCursor(false)}>
              <div className="blog-card-top">{item.badge}</div>
              <div className="blog-body">
                <div className="blog-type">{item.type}</div>
                <div className="blog-title">{item.title}</div>
                <p className="blog-excerpt">{item.excerpt}</p>
                <span className="blog-read">Read more</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="divider" />

      <section id="contact">
        <div className="section-label section-label-center">{portfolio.contact.label}</div>
        <h2 className="section-title">{portfolio.contact.title}</h2>
        <p className="section-sub">{portfolio.contact.subtitle}</p>
        <div className="contact-card reveal">
          <form className="contact-form" onSubmit={submitForm}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Your Name</label>
                <input id="name" onChange={(event) => updateForm("name", event.target.value)} placeholder="Your full name" value={formState.name} />
              </div>
              <div className="form-field">
                <label htmlFor="email">Your Email</label>
                <input id="email" onChange={(event) => updateForm("email", event.target.value)} placeholder="you@example.com" type="email" value={formState.email} />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="subject">Subject</label>
              <input id="subject" onChange={(event) => updateForm("subject", event.target.value)} placeholder="Project collaboration or opportunity" value={formState.subject} />
            </div>
            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea id="message" onChange={(event) => updateForm("message", event.target.value)} placeholder="Tell me about your idea, role, or project" rows="5" value={formState.message} />
            </div>
            <button className="btn-primary" type="submit">
              Send Message
            </button>
            {formStatus ? <p className="form-status">{formStatus}</p> : null}
          </form>
        </div>
        <div className="contact-socials">
          {portfolio.socials.map((item) => (
            <a className="social-link" href={item.href} key={`${item.label}-${item.href}`} rel={item.href.startsWith("http") ? "noreferrer" : undefined} target={item.href.startsWith("http") ? "_blank" : undefined}>
              {item.label}
            </a>
          ))}
        </div>
      </section>

      <footer>
        <p>{portfolio.footer.left}</p>
        <p>{portfolio.footer.right}</p>
      </footer>
    </div>
  );
}

export default App;
