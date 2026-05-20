
import React, { useState, useRef, useEffect } from "react";
import {
  Sun, Moon, ExternalLink, Github, Linkedin,
  BookOpen, GraduationCap, BadgeCheck, Code,
  MessageCircle, ArrowUp, Menu, X, Send, Mail,
} from "lucide-react";
import profilePic from "./profile.jpg";
import toast, { Toaster } from "react-hot-toast";
import "./index.css";
import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaGithub,
} from "react-icons/fa"
import {
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiSpringboot,
  SiDjango,
  SiPhp,
  SiMongodb,
  SiMysql,
  SiSocketdotio,
  SiFlutter,
} from "react-icons/si";

// ─── Typing Effect ────────────────────────────────────────────────────────────
function useTypingEffect(words, speed = 100, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIndex((c) => c + 1);
        }
      } else {
        setDisplayed(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex((w) => w + 1);
          setCharIndex(0);
        } else {
          setCharIndex((c) => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
}

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("revealed");
        }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
//skill
const SKILLS = [
  {
    category: "FRONTEND",
    items: [
      { name: "React.js", icon: <FaReact className="text-cyan-400" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
      { name: "Redux", icon: <SiRedux className="text-purple-500" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
      { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
      { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
    ],
  },

  {
    category: "BACKEND",
    items: [
      { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
      { name: "Spring Boot", icon: <SiSpringboot className="text-green-600" /> },
      { name: "Java", icon: <FaJava className="text-orange-500" /> },
      { name: "Python", icon: <FaPython className="text-blue-500" /> },
      { name: "Django", icon: <SiDjango className="text-green-900 dark:text-white" /> },
      { name: "PHP", icon: <SiPhp className="text-indigo-400" /> },
    ],
  },

  {
    category: "DATABASE & TOOLS",
    items: [
      { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
      { name: "MySQL", icon: <SiMysql className="text-blue-500" /> },
      { name: "Socket.io", icon: <SiSocketdotio className="text-black dark:text-white" /> },
      { name: "GitHub", icon: <FaGithub className="text-black dark:text-white" /> },
    ],
  },

  {
    category: "MOBILE",
    items: [
      { name: "Flutter", icon: <SiFlutter className="text-blue-500" /> },
    ],
  },
];
// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "About",          href: "#about" },
  { label: "Skills",         href: "#skills" },
  { label: "Projects",       href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Education",      href: "#education" },
  { label: "Contact",        href: "#contact" },
];

const SKILLS = [
  {
    group: "Languages",
    icon: "💻",
    items: [
      { label: "Python",            tabler: "ti-brand-python",     color: "#3b77c8" },
      { label: "Java",              tabler: "ti-coffee",           color: "#e07436" },
      { label: "JavaScript (ES6+)", tabler: "ti-brand-javascript", color: "#c8a015" },
      { label: "SQL",               tabler: "ti-database",         color: "#1d9e75" },
      { label: "C",                 tabler: "ti-letter-c",         color: "#7f77dd" },
      { label: "C++",               tabler: "ti-letter-c",         color: "#7f77dd", suffix: "++" },
    ],
  },
  {
    group: "AI / ML",
    icon: "🤖",
    items: [
      { label: "Scikit-learn",         tabler: "ti-brain",           color: "#7f77dd" },
      { label: "Random Forest",        tabler: "ti-trees",           color: "#3b6d11" },
      { label: "SVM",                  tabler: "ti-chart-scatter",   color: "#6366f1" },
      { label: "KNN",                  tabler: "ti-topology-star-3", color: "#d85a30" },
      { label: "Logistic Regression",  tabler: "ti-trending-up",     color: "#185fa5" },
      { label: "K-Means",             tabler: "ti-chart-dots",      color: "#ba7517" },
      { label: "ANOVA",               tabler: "ti-chart-bar",       color: "#993556" },
      { label: "Feature Engineering", tabler: "ti-adjustments",    color: "#534ab7" },
    ],
  },
  {
    group: "Data Science",
    icon: "📊",
    items: [
      { label: "Pandas",               tabler: "ti-table",       color: "#185fa5" },
      { label: "NumPy",                tabler: "ti-math",        color: "#4b87c5" },
      { label: "Matplotlib",           tabler: "ti-chart-line",  color: "#d85a30" },
      { label: "Seaborn",              tabler: "ti-palette",     color: "#1d9e75" },
      { label: "EDA",                  tabler: "ti-search",      color: "#534ab7" },
      { label: "Statistical Analysis", tabler: "ti-sigma",       color: "#ba7517" },
      { label: "Data Cleaning",        tabler: "ti-eraser",      color: "#993556" },
    ],
  },
  {
    group: "Web Dev",
    icon: "🌐",
    items: [
      { label: "React.js",     tabler: "ti-brand-react",    color: "#38bdf8" },
      { label: "Node.js",      tabler: "ti-brand-nodejs",   color: "#3b6d11" },
      { label: "Express.js",   tabler: "ti-server",         color: "#888780" },
      { label: "Django",       tabler: "ti-brand-python",   color: "#3b6d11" },
      { label: "MERN Stack",   tabler: "ti-stack-2",        color: "#d85a30" },
      { label: "REST APIs",    tabler: "ti-api",            color: "#6366f1" },
      { label: "Tailwind CSS", tabler: "ti-brand-tailwind", color: "#38bdf8" },
      { label: "JWT Auth",     tabler: "ti-lock",           color: "#ba7517" },
    ],
  },
  {
    group: "Databases",
    icon: "🗄️",
    items: [
      { label: "MySQL",   tabler: "ti-database",      color: "#185fa5" },
      { label: "MongoDB", tabler: "ti-brand-mongodb", color: "#3b6d11" },
    ],
  },
  {
    group: "Tools",
    icon: "🛠️",
    items: [
      { label: "Streamlit",        tabler: "ti-brand-python",  color: "#d85a30" },
      { label: "Jupyter Notebook", tabler: "ti-notebook",      color: "#e07436" },
      { label: "GitHub",           tabler: "ti-brand-github",  color: "#888780" },
      { label: "VS Code",          tabler: "ti-brand-vscode",  color: "#185fa5" },
      { label: "Postman",          tabler: "ti-api",           color: "#d85a30" },
      { label: "Kaggle",           tabler: "ti-chart-bar",     color: "#38bdf8" },
      { label: "Netlify",          tabler: "ti-cloud-upload",  color: "#1d9e75" },
    ],
  },
];

const PROJECTS = [
  {
    title: "Impact of Short-Form Video on Academic Performance",
    type: "Research Project · 2026",
    tech: ["Python","Scikit-learn","Pandas","K-Means","Random Forest","SVM","ANOVA","Streamlit","EDA"],
    description:
      "Analysed a 207-student dataset across five behavioural dimensions. Built & compared 6 ML classifiers — Random Forest achieved highest accuracy via hyperparameter tuning. K-Means segmented students into risk cohorts validated by ANOVA (p < 0.05). Deployed an interactive Streamlit dashboard for real-time predictive analytics.",
    status: "Completed",
    github: "https://github.com/Krushilmodi1/Impact-of-shortform_video",
    live: "https://krushilmodi.netlify.app/",
  },
  {
    title: "Real Estate Marketplace",
    type: "Full-Stack Web App · 2025",
    tech: ["MERN Stack","React.js","Node.js","MongoDB","JWT Auth","Tailwind CSS","REST APIs"],
    description:
      "Scalable property platform with JWT authentication, role-based access control, and secure session management. Advanced property search with server-side query optimisation. Fully responsive UI with cross-device compatibility.",
    status: "Completed",
    github: "https://github.com/Krushilmodi1/real-estate-marketplace",
    live: "https://krushilmodi.netlify.app/",
  },
  {
    title: "Timetable Scheduling Automation",
    type: "Web Application · 2024",
    tech: ["Django","Python","JavaScript","HTML/CSS"],
    description:
      "Automated timetable generator using constraint-satisfaction logic in Django, eliminating scheduling conflicts. Clean frontend enabling non-technical staff to configure constraints, view schedules, and export timetables.",
    status: "Completed",
    github: "https://github.com/Krushilmodi1",
    live: "https://krushilmodi.netlify.app/",
  },
];

const CERTS = [
  { title: "Machine Learning",          source: "Kaggle",       icon: "🤖", bg: "bg-blue-50 dark:bg-blue-900/20",    text: "text-blue-700 dark:text-blue-300" },
  { title: "Data Cleaning",             source: "Kaggle",       icon: "🧹", bg: "bg-sky-50 dark:bg-sky-900/20",      text: "text-sky-700 dark:text-sky-300" },
  { title: "Data Engineering",          source: "Kaggle",       icon: "⚙️", bg: "bg-indigo-50 dark:bg-indigo-900/20",text: "text-indigo-700 dark:text-indigo-300" },
  { title: "Prompt Engineering for AI", source: "Kaggle",       icon: "💬", bg: "bg-violet-50 dark:bg-violet-900/20",text: "text-violet-700 dark:text-violet-300" },
  { title: "Python for Everybody",      source: "Coursera",     icon: "🐍", bg: "bg-emerald-50 dark:bg-emerald-900/20",text:"text-emerald-700 dark:text-emerald-300" },
  { title: "UML – Complete Guide",      source: "Udemy",        icon: "📘", bg: "bg-orange-50 dark:bg-orange-900/20",text: "text-orange-700 dark:text-orange-300" },
  { title: "Business Management",       source: "Udemy",        icon: "📊", bg: "bg-yellow-50 dark:bg-yellow-900/20",text: "text-yellow-700 dark:text-yellow-300" },
  { title: "C and C++ Programming",     source: "Udemy",        icon: "📟", bg: "bg-green-50 dark:bg-green-900/20",  text: "text-green-700 dark:text-green-300" },
  { title: "AI Tools & Applications",   source: "Skill Nation", icon: "🧠", bg: "bg-pink-50 dark:bg-pink-900/20",   text: "text-pink-700 dark:text-pink-300" },
];


// ─── App ──────────────────────────────────────────────────────────────────────
const App = () => {
  const [darkMode,      setDarkMode]      = useState(false);
  const [isSubmitting,  setIsSubmitting]  = useState(false);
  const [formStatus,    setFormStatus]    = useState("idle"); // idle | success | error | blocked
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const formRef = useRef(null);

  const typedText = useTypingEffect([
    "AI / ML Engineer",
    "Software Developer",
    "MERN Stack Developer",
    "Big Data Enthusiast",
    "Data Analyst",
  ]);

  useScrollReveal();

  useEffect(() => {
    const fn = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // ── Web3Forms submit (JSON mode — more reliable than FormData) ──────────────
  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormStatus("idle");

    const fd = new FormData(event.target);

    // honeypot — if bot filled it, abort silently
    if (fd.get("botcheck")) {
      setIsSubmitting(false);
      return;
    }

    const payload = {
      access_key:  "73e6f4ee-4874-4f03-9d4a-a78c0a5f0b2b",
      subject:     "📬 New Portfolio Message from " + (fd.get("name") || "visitor"),
      from_name:   "Krushil Modi Portfolio",
      name:        fd.get("name"),
      email:       fd.get("email"),
      message:     fd.get("message"),
      // redirect blocked for SPA — omit or set to ""
    };

    try {
      const res  = await fetch("https://api.web3forms.com/submit", {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setFormStatus("success");
        toast.success("✅ Message sent! I'll reply within 24 hours.");
        formRef.current?.reset();
      } else if (
        data.message?.toLowerCase().includes("allowlist") ||
        data.message?.toLowerCase().includes("host")
      ) {
        // Domain not whitelisted in Web3Forms dashboard
        setFormStatus("blocked");
        toast.error("⚠️ Form blocked — see note below.");
      } else {
        setFormStatus("error");
        toast.error("❌ Something went wrong. Please try emailing directly.");
        console.error("Web3Forms error:", data);
      }
    } catch (err) {
      setFormStatus("error");
      toast.error("❌ Network error. Please use the email link below.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const smoothNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <style>{`
        .reveal { opacity:0; transform:translateY(28px); transition:opacity .6s ease,transform .6s ease; }
        .reveal.revealed { opacity:1; transform:translateY(0); }
        .reveal-d1{transition-delay:.08s;} .reveal-d2{transition-delay:.16s;}
        .reveal-d3{transition-delay:.24s;} .reveal-d4{transition-delay:.32s;}

        .stagger>*:nth-child(1){transition-delay:.04s;} .stagger>*:nth-child(2){transition-delay:.10s;}
        .stagger>*:nth-child(3){transition-delay:.16s;} .stagger>*:nth-child(4){transition-delay:.22s;}
        .stagger>*:nth-child(5){transition-delay:.28s;} .stagger>*:nth-child(6){transition-delay:.34s;}
        .stagger>*:nth-child(7){transition-delay:.40s;} .stagger>*:nth-child(8){transition-delay:.46s;}
        .stagger>*:nth-child(9){transition-delay:.52s;}

        .typing-cursor::after{content:'|';animation:blink .75s step-end infinite;margin-left:2px;color:#6366f1;}
        @keyframes blink{50%{opacity:0;}}

        .hero-bg{
          background:
            radial-gradient(ellipse at 18% 38%,rgba(99,102,241,.15) 0%,transparent 58%),
            radial-gradient(ellipse at 82% 12%,rgba(59,130,246,.12) 0%,transparent 54%),
            radial-gradient(ellipse at 58% 82%,rgba(139,92,246,.10) 0%,transparent 50%);
          animation:meshShift 9s ease-in-out infinite alternate;
        }
        @keyframes meshShift{0%{background-size:100% 100%;}100%{background-size:105% 105%;}}

        @keyframes ringPulse{0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.45);}50%{box-shadow:0 0 0 14px rgba(99,102,241,0);}}
        .profile-ring{animation:ringPulse 2.6s ease-in-out infinite;}

        .navbar-glass{background:rgba(255,255,255,.88);backdrop-filter:blur(14px);border-bottom:1px solid rgba(0,0,0,.07);}
        .dark .navbar-glass{background:rgba(3,7,18,.90);border-bottom:1px solid rgba(255,255,255,.08);}

        .skill-pill:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 4px 14px rgba(99,102,241,.18);}
        .skill-pill{transition:transform .25s,box-shadow .25s;}

        .card-hover{transition:transform .3s,box-shadow .3s,border-color .3s;}
        .card-hover:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.09);}
        .dark .card-hover:hover{box-shadow:0 12px 32px rgba(0,0,0,.35);}

        .contact-input{
          width:100%; padding:10px 14px 10px 38px;
          border-radius:10px; border:1.5px solid #e5e7eb;
          background:#f9fafb; color:#111827;
          font-size:14px; outline:none;
          transition:border-color .2s,box-shadow .2s;
          font-family:inherit;
        }
        .contact-input.no-icon{padding-left:14px;}
        .dark .contact-input{background:#1f2937;border-color:#374151;color:#f9fafb;}
        .contact-input:focus{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.15);}
        .contact-input::placeholder{color:#9ca3af;}
        .dark .contact-input::placeholder{color:#6b7280;}

        .submit-btn{
          width:100%; display:flex; align-items:center; justify-content:center; gap:8px;
          padding:12px; border-radius:12px; border:none; cursor:pointer;
          background:linear-gradient(135deg,#3b82f6,#6366f1);
          color:#fff; font-size:15px; font-weight:600;
          transition:opacity .2s, transform .15s;
        }
        .submit-btn:hover:not(:disabled){opacity:.92;transform:scale(1.015);}
        .submit-btn:active:not(:disabled){transform:scale(.98);}
        .submit-btn:disabled{opacity:.55;cursor:not-allowed;}

        .alert-box{
          padding:12px 16px; border-radius:10px; font-size:13px;
          margin-top:14px; display:flex; align-items:flex-start; gap:10px;
        }
        .alert-success{background:#ecfdf5;color:#065f46;border:1px solid #6ee7b7;}
        .dark .alert-success{background:#064e3b;color:#a7f3d0;border-color:#34d399;}
        .alert-error{background:#fef2f2;color:#991b1b;border:1px solid #fca5a5;}
        .dark .alert-error{background:#450a0a;color:#fca5a5;border-color:#ef4444;}
        .alert-blocked{background:#fffbeb;color:#92400e;border:1px solid #fcd34d;}
        .dark .alert-blocked{background:#451a03;color:#fcd34d;border-color:#f59e0b;}
      `}</style>

      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300 font-sans">
        <Toaster position="bottom-right" />

        {/* ── Navbar ── */}
        <nav className="navbar-glass sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <a
              href="#about"
              onClick={(e) => smoothNav(e, "#about")}
              className="font-extrabold text-lg text-indigo-600 dark:text-indigo-400 tracking-tight"
            >
              KM<span className="text-gray-300 dark:text-gray-600">.</span>
            </a>

            <ul className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => smoothNav(e, link.href)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                      activeSection === link.href.slice(1)
                        ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
                        : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white hover:scale-110 transition-transform"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden px-4 pb-4 pt-2 flex flex-col gap-1 border-t border-gray-100 dark:border-gray-800">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => smoothNav(e, link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === link.href.slice(1)
                      ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </nav>

        {/* ── Hero / About ── */}
        <section id="about" className="hero-bg text-center px-4 pt-20 pb-16 max-w-3xl mx-auto">
          <div className="reveal reveal-d1 w-36 h-36 mx-auto mb-5 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl profile-ring">
            <img src={profilePic} alt="Krushil Modi" className="w-full h-full object-cover" />
          </div>

          <h1 className="reveal reveal-d2 text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
            Krushil Modi
          </h1>

          <h2 className="reveal reveal-d3 typing-cursor text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mt-3 min-h-[2rem]">
            {typedText}
          </h2>

          <p className="reveal reveal-d4 mt-3 text-sm text-gray-500 dark:text-gray-400 flex flex-wrap justify-center gap-x-3 gap-y-1">
            <span>📍 Ahmedabad, Gujarat</span>
            <span>📞 +91 78638 68115</span>
            <span>✉️ krushilmodi1234@gmail.com</span>
          </p>

          <div className="reveal reveal-d4 flex flex-wrap justify-center gap-3 mt-6">
            <a href="https://github.com/Krushilmodi1" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition hover:scale-105 shadow">
              <Github size={15} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/krushil-modi-803037268/" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition hover:scale-105 shadow">
              <Linkedin size={15} /> LinkedIn
            </a>
            <a href="https://krushilmodi.netlify.app/" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition hover:scale-105 shadow">
              <ExternalLink size={15} /> Portfolio
            </a>
          </div>

          <div className="reveal reveal-d4 mt-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-left">
            <p className="leading-relaxed">
              🎯 MSc Big Data Analysis student at{" "}
              <strong>St. Xavier's College, Ahmedabad</strong> with hands-on experience designing
              end-to-end ML pipelines, full-stack web applications, and research-grade analytics
              platforms. Proficient in{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                Python, Scikit-learn, SQL, React.js
              </span>{" "}
              and modern DevOps tooling. Seeking an{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                AI/ML, Software Development, or Data Analyst
              </span>{" "}
              internship to contribute meaningfully while accelerating real-world engineering skills.
            </p>
          </div>
        </section>

        {/* ── Skills ── */}
        {/* ── Skills ── */}
<section id="skills" className="px-6 py-20 max-w-7xl mx-auto">

  <div className="flex items-center justify-center gap-3 mb-16">
    <Code className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />

    <h3 className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">
      Skills
    </h3>
  </div>

  <div className="space-y-14">

    {SKILLS.map((group, index) => (
      <div key={index}>

        <h4 className="text-lg tracking-[3px] font-bold text-gray-400 uppercase mb-8">
          {group.category}
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

          {group.items.map((skill, i) => (
            <div
              key={i}
              className="
                bg-white dark:bg-gray-900
                border border-gray-200 dark:border-gray-700
                rounded-2xl
                h-32
                flex flex-col items-center justify-center
                shadow-sm
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all duration-300
                cursor-pointer
              "
            >

              <div className="text-5xl mb-4">
                {skill.icon}
              </div>

              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {skill.name}
              </p>

            </div>
          ))}

        </div>

      </div>
    ))}

  </div>
</section>

        {/* ── Projects ── */}
        <section id="projects" className="px-6 py-16 max-w-6xl mx-auto">
          <h3 className="reveal text-3xl font-extrabold flex items-center gap-2 justify-center text-indigo-600 dark:text-indigo-400 mb-10">
            <BookOpen className="w-7 h-7" /> Projects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 stagger">
            {PROJECTS.map((p, i) => (
              <div key={i}
                className="reveal card-hover relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 flex flex-col">
                <div className="absolute top-0 right-0 m-3">
                  <span className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 text-xs px-3 py-0.5 rounded-full font-medium">
                    {p.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1 pr-14">{p.title}</h4>
                <p className="text-xs text-indigo-500 dark:text-indigo-400 font-medium mb-3">{p.type}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 flex-1">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.map((t, j) => (
                    <span key={j}
                      className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-700">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-medium">Links</span>
                  <div className="flex gap-3">
                    <a href={p.github} target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition"><Github size={17} /></a>
                    <a href={p.live}   target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition"><ExternalLink size={17} /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Certifications ── */}
        <section id="certifications" className="px-6 py-16 max-w-6xl mx-auto">
          <h3 className="reveal text-3xl font-bold flex items-center gap-2 justify-center text-indigo-600 dark:text-indigo-400 mb-2">
            <BadgeCheck className="w-7 h-7" /> Certifications
          </h3>
          <p className="reveal text-center text-sm text-gray-400 dark:text-gray-500 mb-10">
            9 industry certifications across Data Science, ML, AI &amp; Software Engineering
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 stagger">
            {CERTS.map((cert, i) => (
              <div key={i}
                className="reveal card-hover bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-indigo-300 dark:hover:border-indigo-600 flex items-start gap-4">
                <div className={`w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl ${cert.bg} text-xl`}>
                  {cert.icon}
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${cert.text}`}>{cert.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">{cert.source}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Education ── */}
        <section id="education" className="px-6 py-16 max-w-4xl mx-auto">
          <h3 className="reveal text-3xl font-bold flex items-center gap-2 justify-center text-indigo-600 dark:text-indigo-400 mb-10">
            <GraduationCap className="w-7 h-7" /> Education
          </h3>
          <div className="relative border-l-4 border-indigo-400 dark:border-indigo-500 pl-8 space-y-8">
            {[
              {
                degree:  "MSc in Big Data Analysis",
                inst:    "St. Xavier's College (Autonomous), Ahmedabad",
                period:  "2025 – 2027  |  Pursuing",
                courses: "Machine Learning, Statistical Modelling, Big Data Technologies, Data Engineering, Business Intelligence, Research Methodology",
                delay:   "reveal-d1",
              },
              {
                degree:  "Bachelor of Computer Applications (BCA)",
                inst:    "Indus University, Ahmedabad",
                grade:   "CGPA: 8.86 / 10",
                period:  "2022 – 2025",
                courses: "Data Structures & Algorithms, DBMS, OOP (Java/C++), Web Technologies, Software Engineering",
                delay:   "reveal-d2",
              },
            ].map((edu, i) => (
              <div key={i} className={`reveal ${edu.delay} relative`}>
                <div className="absolute -left-[2.65rem] top-2 w-5 h-5 bg-indigo-500 dark:bg-indigo-400 rounded-full border-4 border-white dark:border-gray-950" />
                <div className="card-hover bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-bold text-indigo-700 dark:text-indigo-300">{edu.degree}</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">
                    {edu.inst}
                    {edu.grade && <span className="text-gray-400 dark:text-gray-500"> · {edu.grade}</span>}
                  </p>
                  <span className="inline-block mt-1 text-xs italic text-gray-400 dark:text-gray-500">{edu.period}</span>
                  <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-semibold text-gray-600 dark:text-gray-300">Coursework: </span>
                    {edu.courses}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="px-6 py-16 max-w-2xl mx-auto">
          <h3 className="reveal text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 mb-3">
            <MessageCircle className="w-7 h-7" /> Contact Me
          </h3>
          <p className="reveal text-center text-gray-500 dark:text-gray-400 mb-8">
            Got a project, internship opportunity, or question? I'd love to hear from you.
          </p>

          <div className="reveal bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8">

            {/* Card header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow">
                KM
              </div>
              <div>
                <h4 className="text-base font-bold text-blue-600 dark:text-blue-400">Let's Connect</h4>
                <p className="text-xs text-gray-400 dark:text-gray-500">krushilmodi1234@gmail.com</p>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 mb-6" />

            {/* ── THE FORM ── */}
            <form ref={formRef} onSubmit={handleContactSubmit} className="space-y-4">

              {/* Hidden Web3Forms config */}
              <input type="hidden" name="access_key"  value="73e6f4ee-4874-4f03-9d4a-a78c0a5f0b2b" />
              <input type="hidden" name="subject"     value="New Portfolio Contact" />
              <input type="hidden" name="from_name"   value="Krushil Modi Portfolio" />

              {/* Honeypot — keeps bots out, must stay hidden */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">
                  Your Name *
                </label>
                <div className="relative">
                  <i className="ti ti-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: 16 }} aria-hidden="true" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Jane Doe"
                    required
                    className="contact-input"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">
                  Your Email *
                </label>
                <div className="relative">
                  <i className="ti ti-mail absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: 16 }} aria-hidden="true" />
                  <input
                    type="email"
                    name="email"
                    placeholder="jane@example.com"
                    required
                    className="contact-input"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project or opportunity..."
                  required
                  className="contact-input no-icon resize-none"
                />
              </div>

              {/* Submit */}
              <button type="submit" disabled={isSubmitting} className="submit-btn">
                <Send size={16} />
                {isSubmitting ? "Sending…" : "Send Message"}
              </button>
            </form>

            {/* ── Status messages ── */}
            {formStatus === "success" && (
              <div className="alert-box alert-success">
                <span>✅</span>
                <span>Message sent successfully! I'll get back to you within 24 hours.</span>
              </div>
            )}

            {formStatus === "error" && (
              <div className="alert-box alert-error">
                <span>❌</span>
                <span>
                  Something went wrong. Please email me directly at{" "}
                  <a href="mailto:krushilmodi1234@gmail.com" className="underline font-semibold">
                    krushilmodi1234@gmail.com
                  </a>
                </span>
              </div>
            )}

            {formStatus === "blocked" && (
              <div className="alert-box alert-blocked">
                <span>⚠️</span>
                <div>
                  <p className="font-semibold mb-1">Form blocked by Web3Forms domain filter.</p>
                  <p className="text-xs leading-relaxed">
                    To fix: log in at{" "}
                    <a href="https://web3forms.com/dashboard" target="_blank" rel="noreferrer" className="underline font-semibold">
                      web3forms.com/dashboard
                    </a>{" "}
                    → Settings → Allowed Hosts → add{" "}
                    <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">krushilmodi.netlify.app</code>{" "}
                    and{" "}
                    <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">localhost</code>.
                  </p>
                </div>
              </div>
            )}

            {/* Always-visible fallback links */}
            <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800 flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <a href="https://github.com/Krushilmodi1" target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-indigo-500 transition">
                <Github size={15} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/krushil-modi-803037268/" target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-blue-500 transition">
                <Linkedin size={15} /> LinkedIn
              </a>
              <a href="mailto:krushilmodi1234@gmail.com"
                className="flex items-center gap-1.5 hover:text-indigo-500 transition">
                <Mail size={15} /> krushilmodi1234@gmail.com
              </a>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-4 text-center">
          <div className="flex justify-center gap-6 items-center mb-3 flex-wrap">
            <a href="https://github.com/Krushilmodi1" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition">
              <Github size={17} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/krushil-modi-803037268/" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition">
              <Linkedin size={17} /> LinkedIn
            </a>
            <a href="https://krushilmodi.netlify.app/" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition">
              <ExternalLink size={17} /> Portfolio
            </a>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © {new Date().getFullYear()} Krushil Modi · Built with React &amp; Tailwind CSS
          </p>
        </footer>

        {/* ── Scroll to Top ── */}
        {showScrollTop && (
          <button onClick={scrollToTop} aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 hover:scale-110 transition-all duration-300">
            <ArrowUp size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
