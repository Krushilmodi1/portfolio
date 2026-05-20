import React, { useState, useEffect, useRef } from "react";
import {
  FaSun, FaMoon, FaGithub, FaLinkedin, FaGlobe,
  FaJava, FaPython, FaJs, FaReact, FaNodeJs,
  FaCss3Alt, FaCode, FaBars, FaTimes,
  FaExternalLinkAlt, FaEnvelope, FaMapMarkerAlt, FaPhone, FaDownload,
  FaBrain, FaRobot, FaServer, FaChartBar, FaProjectDiagram,
} from "react-icons/fa";
import {
  SiMongodb, SiMysql, SiTailwindcss, SiExpress,
  SiJavascript, SiScikitlearn, SiPandas, SiNumpy,
  SiPlotly, SiJupyter, SiPostman,
  SiNetlify, SiStreamlit, SiCplusplus,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
/* ─── DATA ─────────────────────────────────────────── */

const NAV_LINKS = [
  "About", "Skills", "Projects", "Stats", "Education", "Certifications", "Contact",
];

const SKILLS = [
  {
    cat: "Programming",
    items: [
      { name: "Python",     icon: <FaPython />,      color: "#3776ab" },
      { name: "Java",       icon: <FaJava />,         color: "#f89820" },
      { name: "JavaScript", icon: <SiJavascript />,  color: "#f7df1e" },
      { name: "SQL",        icon: <SiMysql />,        color: "#4479a1" },
      { name: "C++",        icon: <SiCplusplus />,   color: "#00599c" },
    ],
  },
  {
    cat: "AI / Machine Learning",
    items: [
      { name: "Scikit-learn",  icon: <SiScikitlearn />,   color: "#f7931e" },
      { name: "Pandas",        icon: <SiPandas />,         color: "#e040fb" },
      { name: "NumPy",         icon: <SiNumpy />,           color: "#4fc3f7" },
      { name: "Matplotlib",    icon: <SiPlotly />,         color: "#11557c" },
      { name: "EDA",           icon: <FaChartBar />,       color: "#6366f1" },
      { name: "Random Forest", icon: <FaBrain />,          color: "#22c55e" },
      { name: "SVM",           icon: <FaRobot />,          color: "#8b5cf6" },
      { name: "K-Means",       icon: <FaProjectDiagram />, color: "#f97316" },
    ],
  },
  {
    cat: "Web Development",
    items: [
      { name: "React.js",    icon: <FaReact />,       color: "#61dafb" },
      { name: "Node.js",     icon: <FaNodeJs />,      color: "#68a063" },
      { name: "Express.js",  icon: <SiExpress />,     color: "#888888" },
      { name: "MongoDB",     icon: <SiMongodb />,     color: "#47a248" },
      { name: "Tailwind",    icon: <SiTailwindcss />, color: "#06b6d4" },
      { name: "REST APIs",   icon: <FaServer />,      color: "#6366f1" },
    ],
  },
  {
    cat: "Tools & Platforms",
    items: [
      { name: "GitHub",    icon: <FaGithub />,          color: "#181717" },
      { name: "Jupyter",   icon: <SiJupyter />,         color: "#f37626" },
      { name: "VS Code", icon: <VscVscode />, color: "#007acc" },
      { name: "Postman",   icon: <SiPostman />,         color: "#ff6c37" },
      { name: "Netlify",   icon: <SiNetlify />,         color: "#00c7b7" },
      { name: "Streamlit", icon: <SiStreamlit />,       color: "#ff4b4b" },
    ],
  },
];

const PROJECTS = [
  {
    title: "Impact of Short-Form Video on Academic Performance",
    icon: "📊",
    status: "Completed",
    desc: "Analysed a 207-student dataset across five behavioural dimensions. Built & compared 6 ML classifiers — Random Forest achieved highest accuracy via hyperparameter tuning. K-Means segmented students into risk cohorts validated by ANOVA (p < 0.05). Deployed an interactive Streamlit dashboard for real-time predictive analytics.",
    tech: ["Python","Scikit-learn","Pandas","K-Means","Random Forest","SVM","ANOVA","Streamlit","EDA"],
    color: "#6366f1",
    github: "https://github.com/Krushilmodi1/Impact-of-shortform_video",
    live: "https://krushilmodi.netlify.app/",
  },
  {
    title: "Real Estate Marketplace",
    icon: "🏠",
    status: "Completed",
    desc: "Scalable property platform with JWT authentication, role-based access control, and secure session management. Advanced property search with server-side query optimisation. Fully responsive UI with cross-device compatibility.",
    tech: ["MERN Stack","React.js","Node.js","MongoDB","JWT Auth","Tailwind CSS","REST APIs"],
    color: "#0ea5e9",
    github: "https://github.com/Krushilmodi1/real-estate-marketplace",
    live: "https://krushilmodi.netlify.app/",
  },
  {
    title: "Timetable Scheduling Automation",
    icon: "🗓️",
    status: "Completed",
    desc: "Automated timetable generator using constraint-satisfaction logic in Django, eliminating scheduling conflicts. Clean frontend enabling non-technical staff to configure constraints, view schedules, and export timetables.",
    tech: ["Django","Python","JavaScript","HTML/CSS"],
    color: "#f97316",
    github: "https://github.com/Krushilmodi1",
    live: "https://krushilmodi.netlify.app/",
  },
];

const CERTS = [
  { name: "Machine Learning",          source: "Kaggle",       icon: "🤖", color: "#3b82f6",  link: "" },
  { name: "Data Cleaning",             source: "Kaggle",       icon: "🧹", color: "#0ea5e9",  link: "" },
  { name: "Data Engineering",          source: "Kaggle",       icon: "⚙️", color: "#6366f1",  link: "" },
  { name: "Prompt Engineering for AI", source: "Kaggle",       icon: "💬", color: "#8b5cf6",  link: "" },
  { name: "Python for Everybody",      source: "Coursera",     icon: "🐍", color: "#22c55e",  link: "" },
  { name: "UML – Complete Guide",      source: "Udemy",        icon: "📘", color: "#f97316",  link: "" },
  { name: "Business Management",       source: "Udemy",        icon: "📊", color: "#eab308",  link: "" },
  { name: "C and C++ Programming",     source: "Udemy",        icon: "📟", color: "#10b981",  link: "" },
  { name: "AI Tools & Applications",   source: "Skill Nation", icon: "🧠", color: "#ec4899",  link: "" },
];

const SOCIAL = [
  { label: "GitHub",   icon: <FaGithub />,   url: "https://github.com/Krushilmodi1",                     color: "#181717" },
  { label: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/krushil-modi-803037268/", color: "#0a66c2" },
  // { label: "Portfolio", icon: <FaGlobe />, url: "https://krushilmodi.netlify.app/", color: "#6366f1" },
];

/* ─── HOOKS ─────────────────────────────────────────── */

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const handler = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id.toLowerCase());
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ids]);
  return active;
}

function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return [count, ref];
}

function useTypingEffect(words, speed = 100, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex]  = useState(0);
  const [charIndex, setCharIndex]  = useState(0);
  const [deleting,  setDeleting]   = useState(false);
  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) setTimeout(() => setDeleting(true), pause);
        else setCharIndex(c => c + 1);
      } else {
        setDisplayed(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) { setDeleting(false); setWordIndex(w => w + 1); setCharIndex(0); }
        else setCharIndex(c => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);
  return displayed;
}

/* ─── SMALL COMPONENTS ──────────────────────────────── */

function StatusBadge({ status }) {
  const map = {
    Completed:    "bg-blue-100   text-blue-700   dark:bg-blue-900   dark:text-blue-300",
    Live:         "bg-green-100  text-green-700  dark:bg-green-900  dark:text-green-300",
    "In Progress":"bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  };
  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${map[status] || map.Completed}`}>
      {status}
    </span>
  );
}

function StatCard({ value, suffix = "", label, color }) {
  const [count, ref] = useCountUp(value);
  return (
    <div ref={ref} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700 text-center hover:shadow-lg transition-shadow">
      <div className="text-4xl font-bold mb-1" style={{ color }}>{count}{suffix}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
      {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
      <div className="mt-3 h-1 w-12 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full" />
    </div>
  );
}

/* ─── SKILLS SECTION ────────────────────────────────── */

// Proficiency level added to each skill (0–100)
const SKILLS_WITH_LEVEL = [
  {
    cat: "Programming",
    items: [
      { name: "Python",     icon: <FaPython />,      color: "#3776ab", level: 88 },
      { name: "Java",       icon: <FaJava />,         color: "#f89820", level: 72 },
      { name: "JavaScript", icon: <SiJavascript />,  color: "#f7df1e", level: 75 },
      { name: "SQL",        icon: <SiMysql />,        color: "#4479a1", level: 80 },
      { name: "C++",        icon: <SiCplusplus />,   color: "#00599c", level: 65 },
    ],
  },
  {
    cat: "AI / ML",
    items: [
      { name: "Scikit-learn",  icon: <SiScikitlearn />,   color: "#f7931e", level: 85 },
      { name: "Pandas",        icon: <SiPandas />,         color: "#e040fb", level: 87 },
      { name: "NumPy",         icon: <SiNumpy />,           color: "#4fc3f7", level: 83 },
      { name: "Matplotlib",    icon: <SiPlotly />,         color: "#11557c", level: 78 },
      { name: "EDA",           icon: <FaChartBar />,       color: "#6366f1", level: 90 },
      { name: "Random Forest", icon: <FaBrain />,          color: "#22c55e", level: 82 },
      { name: "SVM",           icon: <FaRobot />,          color: "#8b5cf6", level: 75 },
      { name: "K-Means",       icon: <FaProjectDiagram />, color: "#f97316", level: 78 },
    ],
  },
  {
    cat: "Web Dev",
    items: [
      { name: "React.js",    icon: <FaReact />,       color: "#61dafb", level: 82 },
      { name: "Node.js",     icon: <FaNodeJs />,      color: "#68a063", level: 78 },
      { name: "Express.js",  icon: <SiExpress />,     color: "#888888", level: 75 },
      { name: "MongoDB",     icon: <SiMongodb />,     color: "#47a248", level: 76 },
      { name: "Tailwind",    icon: <SiTailwindcss />, color: "#06b6d4", level: 85 },
      { name: "REST APIs",   icon: <FaServer />,      color: "#6366f1", level: 80 },
    ],
  },
  {
    cat: "Tools",
    items: [
      { name: "GitHub",    icon: <FaGithub />,          color: "#6366f1", level: 85 },
      { name: "Jupyter",   icon: <SiJupyter />,         color: "#f37626", level: 88 },
      { name: "VS Code",   icon: <VscVscode />,color: "#007acc", level: 90 },
      { name: "Postman",   icon: <SiPostman />,         color: "#ff6c37", level: 75 },
      { name: "Netlify",   icon: <SiNetlify />,         color: "#00c7b7", level: 78 },
      { name: "Streamlit", icon: <SiStreamlit />,       color: "#ff4b4b", level: 80 },
    ],
  },
];

function SkillBar({ level, color }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setWidth(level); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [level]);
  return (
    <div ref={ref} className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${width}%`, background: color }}
      />
    </div>
  );
}

function SkillsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const group = SKILLS_WITH_LEVEL[activeTab];

  return (
    <section id="skills" className="bg-white dark:bg-gray-900 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle title="Skills" subtitle="Technologies & tools I work with" />

        {/* Tab bar */}
        <div className="flex flex-wrap gap-2 mb-10">
          {SKILLS_WITH_LEVEL.map((g, i) => (
            <button
              key={g.cat}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeTab === i
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 dark:shadow-indigo-900"
                  : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600"
              }`}
            >
              {g.cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {group.items.map(skill => (
            <div
              key={skill.name}
              className="group bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 flex flex-col items-center border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon with glow ring on hover */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
                style={{ background: skill.color + "15" }}
              >
                <span className="text-3xl" style={{ color: skill.color }}>{skill.icon}</span>
              </div>

              <span className="text-sm font-semibold text-center text-gray-700 dark:text-gray-200 mb-1 leading-tight">
                {skill.name}
              </span>

              {/* Proficiency label */}
              <span className="text-xs font-medium mb-1" style={{ color: skill.color }}>
                {skill.level >= 85 ? "Advanced" : skill.level >= 75 ? "Proficient" : "Familiar"}
              </span>

              {/* Animated bar */}
              <SkillBar level={skill.level} color={skill.color} />
            </div>
          ))}
        </div>

        {/* Summary strip */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Programming Languages", value: "5",  color: "#6366f1" },
            { label: "ML / AI Tools",          value: "8",  color: "#22c55e" },
            { label: "Web Technologies",        value: "6",  color: "#0ea5e9" },
            { label: "Dev Tools & Platforms",   value: "6+", color: "#f97316" },
          ].map(s => (
            <div key={s.label}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 text-center">
              <div className="text-3xl font-extrabold mb-0.5" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MAIN APP ───────────────────────────────────────── */

export default function App() {
  const [darkMode,   setDarkMode]   = useState(false);
  const [showModal,  setShowModal]  = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [sending,    setSending]    = useState(false);
  const [sent,       setSent]       = useState(false);
  const activeSection = useScrollSpy(NAV_LINKS);
  const typedText     = useTypingEffect([
    "AI / ML Engineer",
    "Software Developer",
    "MERN Stack Developer",
    "Big Data Enthusiast",
    "Data Analyst",
  ]);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const form     = e.target;
    const formData = new FormData(form);
    formData.append("access_key", "73e6f4ee-4874-4f03-9d4a-a78c0a5f0b2b");
    const res  = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
    const data = await res.json();
    setSending(false);
    if (data.success) {
      setSent(true);
      form.reset();
      setTimeout(() => { setSent(false); setShowModal(false); }, 2500);
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <style>{`
        .typing-cursor::after {
          content: '|';
          animation: blink .75s step-end infinite;
          margin-left: 2px;
          color: #6366f1;
        }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 transition-colors duration-300 font-sans">

        {/* ── NAVBAR ── */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 text-lg tracking-tight">KM.</span>

            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <button key={link} onClick={() => scrollTo(link)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === link
                      ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}>
                  {link}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                {darkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
              </button>
              <button className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <button key={link} onClick={() => scrollTo(link)}
                  className="text-left px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                  {link}
                </button>
              ))}
            </div>
          )}
        </nav>

        {/* ── HERO ── */}
        <section className="pt-14 min-h-screen flex items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-0 w-80 h-80 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
            {/* Left */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-indigo-100 dark:border-indigo-800">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Seeking Internship — Ahmedabad · Remote
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
                Krushil<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Modi</span>
              </h1>

              <p className="typing-cursor text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium mb-3 min-h-[2rem]">
                {typedText}
              </p>

              <p className="text-base text-gray-500 dark:text-gray-500 mb-8 max-w-lg">
                MSc Big Data Analysis student at <strong className="text-gray-700 dark:text-gray-300">St. Xavier's College, Ahmedabad</strong> building
                end-to-end ML pipelines, full-stack web apps & research analytics platforms.
                3+ projects shipped. 9 industry certifications.
              </p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <a href="https://docs.google.com/document/d/1ngGxkqG3lVIJSdmdA-Il-TCNrzacTAon/export?format=pdf" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 active:scale-95 transition font-medium text-sm">
                  <FaDownload size={12} /> Download CV
                </a>
                <a href="https://www.linkedin.com/in/krushil-modi-803037268/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 active:scale-95 transition font-medium text-sm">
                  <FaLinkedin size={12} /> LinkedIn
                </a>
                <button onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition font-medium text-sm">
                  <FaEnvelope size={12} /> Contact Me
                </button>
              </div>

              <div className="flex gap-4 justify-center md:justify-start mt-6">
                {SOCIAL.map(s => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" title={s.label}
                    className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors text-xl">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right — Avatar */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full blur-xl opacity-30 scale-110" />
                <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                  {/* Replace src with your actual photo import if available */}
                  <span className="text-white font-extrabold text-7xl select-none">KM</span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  Available
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="max-w-6xl mx-auto px-4 py-20">
          <SectionTitle title="About Me" />
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-7">
              <p>
                I'm an <strong className="text-gray-900 dark:text-white">AI/ML & Full-Stack Developer</strong> from
                Ahmedabad, India — currently pursuing MSc in Big Data Analysis at St. Xavier's College
                while building end-to-end machine learning pipelines and web applications.
              </p>
              <p>
                My focus is on <strong className="text-gray-900 dark:text-white">Python, Scikit-learn, React.js & Node.js</strong> —
                from designing research-grade ML models and Streamlit dashboards to shipping scalable
                MERN apps with JWT auth and responsive UIs.
              </p>
              <p>
                I hold <strong className="text-gray-900 dark:text-white">9 industry certifications</strong> from
                Kaggle, Coursera, Udemy & Skill Nation — spanning Machine Learning, Data Engineering,
                Prompt Engineering, and more.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { label: "Location", value: "Ahmedabad, Gujarat" },
                  { label: "Email",    value: "krushilmodi1234@gmail.com" },
                  { label: "Phone",    value: "+91 78638 68115" },
                  { label: "Status",   value: "Seeking Internship" },
                ].map(item => (
                  <div key={item.label} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3">
                    <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{item.label}</div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { num: 3,   suffix: "+",  label: "Projects Shipped",      color: "#6366f1" },
                { num: 9,   suffix: "",   label: "Certifications Earned",  color: "#0ea5e9" },
                { num: 6,   suffix: "+",  label: "ML Models Compared",     color: "#22c55e" },
                { num: 207, suffix: "",   label: "Research Dataset Size",   color: "#f97316" },
              ].map(s => (
                <StatCard key={s.label} value={s.num} suffix={s.suffix} label={s.label} color={s.color} />
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <SkillsSection />

        {/* ── PROJECTS ── */}
        <section id="projects" className="max-w-6xl mx-auto px-4 py-20">
          <SectionTitle title="Projects" subtitle={`${PROJECTS.length} real-world applications`} />
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p, i) => (
              <div key={i}
                className="group bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden hover:-translate-y-1">
                <div className="h-1.5 w-full" style={{ background: p.color }} />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                      {p.icon} {p.title}
                    </h3>
                    <StatusBadge status={p.status} />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-6 mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tech.map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: p.color + "18", color: p.color }}>{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                        <FaGithub size={12} /> Code
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg text-white transition"
                        style={{ background: p.color }}>
                        <FaExternalLinkAlt size={10} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── GITHUB STATS ── */}
        <section id="stats" className="bg-white dark:bg-gray-900 py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700 dark:text-indigo-400">
              📊 GitHub Stats
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
                <img
                  src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=Krushilmodi1&theme=tokyonight"
                  alt="GitHub Stats"
                  className="w-full rounded-xl"
                />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
                <img
                  src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=Krushilmodi1&theme=tokyonight"
                  alt="Top Languages"
                  className="w-full rounded-xl"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
              <img
                src="https://github-readme-streak-stats.herokuapp.com/?user=Krushilmodi1&theme=tokyonight&hide_border=true&background=0f172a"
                alt="GitHub Streak"
                className="w-full rounded-xl"
              />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <img
                src="https://github-readme-activity-graph.vercel.app/graph?username=Krushilmodi1&theme=react-dark&hide_border=true&bg_color=0f172a"
                alt="Activity Graph"
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section id="education" className="max-w-6xl mx-auto px-4 py-20">
          <SectionTitle title="Education" />
          <div className="relative border-l-2 border-indigo-200 dark:border-indigo-900 ml-4 space-y-10">
            {[
              {
                degree:  "MSc in Big Data Analysis",
                school:  "St. Xavier's College (Autonomous), Ahmedabad",
                period:  "2025 – 2027",
                status:  "Pursuing",
                courses: "Machine Learning, Statistical Modelling, Big Data Technologies, Data Engineering, Business Intelligence, Research Methodology",
                color:   "#6366f1",
              },
              {
                degree:  "Bachelor of Computer Applications (BCA)",
                school:  "Indus University, Ahmedabad",
                period:  "2022 – 2025",
                status:  "CGPA: 8.86 / 10",
                courses: "Data Structures & Algorithms, DBMS, OOP (Java/C++), Web Technologies, Software Engineering",
                color:   "#0ea5e9",
              },
            ].map((edu, i) => (
              <div key={i} className="relative pl-8">
                <div className="absolute -left-2.5 top-1.5 w-4 h-4 rounded-full border-2 border-white dark:border-gray-950 shadow"
                  style={{ background: edu.color }} />
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition">
                  <div className="flex flex-col md:flex-row justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{edu.school}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm text-gray-400">{edu.period}</div>
                      <div className="text-sm font-semibold mt-0.5" style={{ color: edu.color }}>{edu.status}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-semibold text-gray-600 dark:text-gray-300">Coursework: </span>
                    {edu.courses}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section id="certifications" className="bg-white dark:bg-gray-900 py-20">
          <div className="max-w-6xl mx-auto px-4">
            <SectionTitle title="Certifications" subtitle="9 industry certifications across Data Science, ML, AI & Software Engineering" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {CERTS.map((cert, idx) => (
                <div key={idx}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all text-center">
                  <div className="text-3xl mb-3 flex justify-center">{cert.icon}</div>
                  {cert.link ? (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline leading-snug block">
                      {cert.name} <FaExternalLinkAlt size={8} className="inline ml-1" />
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-snug">{cert.name}</p>
                  )}
                  <p className="text-xs mt-1 font-semibold" style={{ color: cert.color }}>{cert.source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="max-w-6xl mx-auto px-4 py-20">
          <SectionTitle title="Let's Connect" subtitle="Open to AI/ML, Software Development & Data Analyst internships" />
          <div className="grid md:grid-cols-2 gap-10">
            {/* Info */}
            <div className="space-y-6">
              {[
                { icon: <FaEnvelope />,    label: "Email",    value: "krushilmodi1234@gmail.com", href: "mailto:krushilmodi1234@gmail.com" },
                { icon: <FaPhone />,       label: "Phone",    value: "+91 78638 68115",            href: "tel:+917863868115" },
                { icon: <FaMapMarkerAlt />,label: "Location", value: "Ahmedabad, Gujarat, India",  href: null },
              ].map(c => (
                <div key={c.label}
                  className="flex items-center gap-4 bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">{c.label}</div>
                    {c.href
                      ? <a href={c.href} className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">{c.value}</a>
                      : <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{c.value}</div>}
                  </div>
                </div>
              ))}

              <div className="flex gap-3 flex-wrap">
                {SOCIAL.map(s => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white transition">
                    {s.icon} {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Inline form */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Send a Message</h3>
              {sent ? (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <div className="text-4xl mb-3">✅</div>
                  <p className="font-medium text-green-600 dark:text-green-400">Message sent! I'll reply within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="subject" value="📩 New Portfolio Contact Message — Krushil Modi" />
                  <input type="text"  name="name"    placeholder="Your Name"    required
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                  <input type="email" name="email"   placeholder="Your Email"   required
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                  <textarea name="message" placeholder="Your message..." rows={4} required
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none" />
                  <button type="submit" disabled={sending}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-xl font-medium text-sm transition active:scale-95">
                    {sending ? "Sending..." : "🚀 Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400">© {new Date().getFullYear()} Krushil Modi · Built with React & Tailwind CSS</div>
            <div className="flex gap-4">
              {SOCIAL.map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" title={s.label}
                  className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition text-lg">
                  {s.icon}
                </a>
              ))}
            </div>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
              Back to top ↑
            </button>
          </div>
        </footer>

        {/* ── CONTACT MODAL ── */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={e => e.target === e.currentTarget && setShowModal(false)}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
                <h3 className="font-bold text-gray-900 dark:text-white">Contact Me</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition">
                  <FaTimes />
                </button>
              </div>
              <div className="p-5">
                {sent ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">✅</div>
                    <p className="font-medium text-green-600 dark:text-green-400">Message sent! I'll reply within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="hidden" name="subject" value="📩 New Portfolio Contact Message — Krushil Modi" />
                    <input type="text"  name="name"    placeholder="Your Name"    required
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                    <input type="email" name="email"   placeholder="Your Email"   required
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                    <textarea name="message" placeholder="Your message..." rows={4} required
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
                    <button type="submit" disabled={sending}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-xl font-semibold text-sm transition">
                      {sending ? "Sending..." : "🚀 Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}