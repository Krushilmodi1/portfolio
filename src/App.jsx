// App.jsx
// npm install react-hot-toast lucide-react   (if not already installed)

import React, { useState, useRef, useEffect } from "react";
import {
  Sun, Moon, ExternalLink, Github, Linkedin,
  BookOpen, GraduationCap, BadgeCheck, Code,
  MessageCircle, ArrowUp, Menu, X, Brain, Database,
} from "lucide-react";
import profilePic from "./profile.jpg";
import toast, { Toaster } from "react-hot-toast";
import "./index.css";

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
        } else { setCharIndex(c => c + 1); }
      } else {
        setDisplayed(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex(w => w + 1);
          setCharIndex(0);
        } else { setCharIndex(c => c - 1); }
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
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

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
  { group: "Languages",      icon: "💻", items: ["Python","Java","JavaScript (ES6+)","SQL","C","C++"] },
  { group: "AI / ML",        icon: "🤖", items: ["Scikit-learn","Random Forest","SVM","KNN","Logistic Regression","K-Means","ANOVA","Feature Engineering"] },
  { group: "Data Science",   icon: "📊", items: ["Pandas","NumPy","Matplotlib","Seaborn","EDA","Statistical Analysis","Data Cleaning"] },
  { group: "Web Dev",        icon: "🌐", items: ["React.js","Node.js","Express.js","Django","MERN Stack","REST APIs","Tailwind CSS","JWT Auth"] },
  { group: "Databases",      icon: "🗄️", items: ["MySQL","MongoDB"] },
  { group: "Tools",          icon: "🛠️", items: ["Streamlit","Jupyter Notebook","GitHub","VS Code","Postman","Kaggle","Netlify"] },
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
  { title: "Machine Learning",             source: "Kaggle",    icon: "🤖", bg: "bg-blue-50 dark:bg-blue-900/20",    text: "text-blue-700 dark:text-blue-300" },
  { title: "Data Cleaning",               source: "Kaggle",    icon: "🧹", bg: "bg-sky-50 dark:bg-sky-900/20",      text: "text-sky-700 dark:text-sky-300" },
  { title: "Data Engineering",            source: "Kaggle",    icon: "⚙️", bg: "bg-indigo-50 dark:bg-indigo-900/20", text: "text-indigo-700 dark:text-indigo-300" },
  { title: "Prompt Engineering for AI",   source: "Kaggle",    icon: "💬", bg: "bg-violet-50 dark:bg-violet-900/20", text: "text-violet-700 dark:text-violet-300" },
  { title: "Python for Everybody",        source: "Coursera",  icon: "🐍", bg: "bg-emerald-50 dark:bg-emerald-900/20",text: "text-emerald-700 dark:text-emerald-300" },
  { title: "UML – Complete Guide",        source: "Udemy",     icon: "📘", bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-700 dark:text-orange-300" },
  { title: "Business Management",         source: "Udemy",     icon: "📊", bg: "bg-yellow-50 dark:bg-yellow-900/20", text: "text-yellow-700 dark:text-yellow-300" },
  { title: "C and C++ Programming",       source: "Udemy",     icon: "📟", bg: "bg-green-50 dark:bg-green-900/20",  text: "text-green-700 dark:text-green-300" },
  { title: "AI Tools & Applications",     source: "Skill Nation",icon:"🧠",bg: "bg-pink-50 dark:bg-pink-900/20",    text: "text-pink-700 dark:text-pink-300" },
];

// ─── App ──────────────────────────────────────────────────────────────────────
const App = () => {
  const [darkMode,       setDarkMode]      = useState(false);
  const [showModal,      setShowModal]     = useState(false);
  const [isSubmitting,   setIsSubmitting]  = useState(false);
  const [menuOpen,       setMenuOpen]      = useState(false);
  const [showScrollTop,  setShowScrollTop] = useState(false);
  const [activeSection,  setActiveSection] = useState("about");
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
    const ids = NAV_LINKS.map(l => l.href.slice(1));
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // ── Web3Forms submit ──
  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target);
    formData.append("access_key", "73e6f4ee-4874-4f03-9d4a-a78c0a5f0b2b");
    try {
      const res  = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        toast.success("✅ Message sent! I'll reply within 24 hours.");
        formRef.current?.reset();
        setShowModal(false);
      } else {
        toast.error("❌ Something went wrong. Please try again.");
      }
    } catch {
      toast.error("❌ Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const smoothNav   = (e, href) => { e.preventDefault(); setMenuOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <div className={darkMode ? "dark" : ""}>
      <style>{`
        .reveal { opacity:0; transform:translateY(28px); transition:opacity .6s ease,transform .6s ease; }
        .reveal.revealed { opacity:1; transform:translateY(0); }
        .reveal-d1{transition-delay:.08s;} .reveal-d2{transition-delay:.16s;} .reveal-d3{transition-delay:.24s;} .reveal-d4{transition-delay:.32s;}

        /* stagger for direct grid/flex children */
        .stagger > *:nth-child(1){transition-delay:.04s;} .stagger > *:nth-child(2){transition-delay:.10s;}
        .stagger > *:nth-child(3){transition-delay:.16s;} .stagger > *:nth-child(4){transition-delay:.22s;}
        .stagger > *:nth-child(5){transition-delay:.28s;} .stagger > *:nth-child(6){transition-delay:.34s;}
        .stagger > *:nth-child(7){transition-delay:.40s;} .stagger > *:nth-child(8){transition-delay:.46s;}
        .stagger > *:nth-child(9){transition-delay:.52s;}

        .typing-cursor::after{content:'|';animation:blink .75s step-end infinite;margin-left:2px;color:#6366f1;}
        @keyframes blink{50%{opacity:0;}}

        .hero-bg{
          background:
            radial-gradient(ellipse at 18% 38%, rgba(99,102,241,.15) 0%, transparent 58%),
            radial-gradient(ellipse at 82% 12%, rgba(59,130,246,.12) 0%, transparent 54%),
            radial-gradient(ellipse at 58% 82%, rgba(139,92,246,.10) 0%, transparent 50%);
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
      `}</style>

      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300 font-sans">
        <Toaster position="bottom-right" />

        {/* ── Navbar ── */}
        <nav className="navbar-glass sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="#about" onClick={e => smoothNav(e,"#about")}
              className="font-extrabold text-lg text-indigo-600 dark:text-indigo-400 tracking-tight">
              KM<span className="text-gray-300 dark:text-gray-600">.</span>
            </a>
            <ul className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} onClick={e => smoothNav(e, link.href)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150
                      ${activeSection === link.href.slice(1)
                        ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
                        : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <button onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white hover:scale-110 transition-transform">
                {darkMode ? <Sun size={18}/> : <Moon size={18}/>}
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white">
                {menuOpen ? <X size={18}/> : <Menu size={18}/>}
              </button>
            </div>
          </div>
          {menuOpen && (
            <div className="md:hidden px-4 pb-4 pt-2 flex flex-col gap-1 border-t border-gray-100 dark:border-gray-800">
              {NAV_LINKS.map(link => (
                <a key={link.href} href={link.href} onClick={e => smoothNav(e, link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${activeSection === link.href.slice(1)
                      ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </nav>

        {/* ── Hero / About ── */}
        <section id="about" className="hero-bg text-center px-4 pt-20 pb-16 max-w-3xl mx-auto">
          <div className="reveal reveal-d1 w-36 h-36 mx-auto mb-5 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl profile-ring">
            <img src={profilePic} alt="Krushil Modi" className="w-full h-full object-cover"/>
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

          {/* Social / links row */}
          <div className="reveal reveal-d4 flex flex-wrap justify-center gap-3 mt-6">
            <a href="https://github.com/Krushilmodi1" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition hover:scale-105 shadow">
              <Github size={15}/> GitHub
            </a>
            <a href="https://www.linkedin.com/in/krushil-modi-803037268/" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition hover:scale-105 shadow">
              <Linkedin size={15}/> LinkedIn
            </a>
            <a href="https://krushilmodi.netlify.app/" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition hover:scale-105 shadow">
              <ExternalLink size={15}/> Portfolio
            </a>
          </div>

          {/* Bio */}
          <div className="reveal reveal-d4 mt-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-left">
            <p className="leading-relaxed">
              🎯 MSc Big Data Analysis student at <strong>St. Xavier's College, Ahmedabad</strong> with hands-on
              experience designing end-to-end ML pipelines, full-stack web applications, and research-grade analytics
              platforms. Proficient in{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Python, Scikit-learn, SQL, React.js</span>
              {" "}and modern DevOps tooling. Seeking an{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">AI/ML, Software Development, or Data Analyst</span>
              {" "}internship to contribute meaningfully while accelerating real-world engineering skills.
            </p>
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="px-6 py-16 max-w-5xl mx-auto">
          <h3 className="reveal text-3xl font-extrabold flex items-center gap-2 justify-center text-indigo-600 dark:text-indigo-400 mb-10">
            <Code className="w-7 h-7"/> Skills
          </h3>
          <div className="space-y-6">
            {SKILLS.map((group, gi) => (
              <div key={gi} className="reveal">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1.5">
                  <span>{group.icon}</span> {group.group}
                </p>
                <div className="flex flex-wrap gap-2 stagger">
                  {group.items.map((skill, si) => (
                    <span key={si}
                      className="skill-pill px-3 py-1.5 text-sm font-medium rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 shadow-sm cursor-default select-none">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="px-6 py-16 max-w-6xl mx-auto">
          <h3 className="reveal text-3xl font-extrabold flex items-center gap-2 justify-center text-indigo-600 dark:text-indigo-400 mb-10">
            <BookOpen className="w-7 h-7"/> Projects
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
                    <a href={p.github} target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition"><Github size={17}/></a>
                    <a href={p.live}   target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition"><ExternalLink size={17}/></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Certifications ── */}
        <section id="certifications" className="px-6 py-16 max-w-6xl mx-auto">
          <h3 className="reveal text-3xl font-bold flex items-center gap-2 justify-center text-indigo-600 dark:text-indigo-400 mb-2">
            <BadgeCheck className="w-7 h-7"/> Certifications
          </h3>
          <p className="reveal text-center text-sm text-gray-400 dark:text-gray-500 mb-10">9 industry certifications across Data Science, ML, AI & Software Engineering</p>
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
            <GraduationCap className="w-7 h-7"/> Education
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
                <div className="absolute -left-[2.65rem] top-2 w-5 h-5 bg-indigo-500 dark:bg-indigo-400 rounded-full border-4 border-white dark:border-gray-950"/>
                <div className="card-hover bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-bold text-indigo-700 dark:text-indigo-300">{edu.degree}</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">
                    {edu.inst}{edu.grade && <span className="text-gray-400 dark:text-gray-500"> · {edu.grade}</span>}
                  </p>
                  <span className="inline-block mt-1 text-xs italic text-gray-400 dark:text-gray-500">{edu.period}</span>
                  <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-semibold text-gray-600 dark:text-gray-300">Coursework: </span>{edu.courses}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="px-6 py-16 max-w-2xl mx-auto text-center">
          <h3 className="reveal text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 mb-3">
            <MessageCircle className="w-7 h-7"/> Contact Me
          </h3>
          <p className="reveal text-gray-500 dark:text-gray-400 mb-7">
            Got a project, internship opportunity, or question? I'd love to hear from you.
          </p>
          <button onClick={() => setShowModal(true)}
            className="reveal px-7 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg transition hover:scale-105 font-semibold">
            📩 Open Contact Form
          </button>

          {/* ── Modal ── */}
          {showModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
                <button onClick={() => setShowModal(false)}
                  className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl transition">✖</button>
                <h4 className="text-xl font-semibold mb-1 text-blue-600 dark:text-blue-400">Let's Connect</h4>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">krushilmodi1234@gmail.com</p>

                <form ref={formRef} onSubmit={handleContactSubmit} className="space-y-4 text-left">
                  {/* Web3Forms key */}
                  <input type="hidden" name="access_key"  value="73e6f4ee-4874-4f03-9d4a-a78c0a5f0b2b"/>
                  <input type="hidden" name="subject"     value="New message from Portfolio — Krushil Modi"/>
                  <input type="hidden" name="from_name"   value="Portfolio Contact Form"/>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Your Name</label>
                    <input type="text" name="name" placeholder="Jane Doe" required
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"/>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Your Email</label>
                    <input type="email" name="email" placeholder="jane@example.com" required
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"/>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Message</label>
                    <textarea name="message" rows="4" placeholder="Tell me about your project or opportunity..." required
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"/>
                  </div>
                  <button type="submit" disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition">
                    {isSubmitting ? "Sending…" : "🚀 Send Message"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </section>

        {/* ── Footer ── */}
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-4 text-center">
          <div className="flex justify-center gap-6 items-center mb-3 flex-wrap">
            <a href="https://github.com/Krushilmodi1" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition">
              <Github size={17}/> GitHub
            </a>
            <a href="https://www.linkedin.com/in/krushil-modi-803037268/" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition">
              <Linkedin size={17}/> LinkedIn
            </a>
            <a href="https://krushilmodi.netlify.app/" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition">
              <ExternalLink size={17}/> Portfolio
            </a>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © {new Date().getFullYear()} Krushil Modi · Built with React & Tailwind CSS
          </p>
        </footer>

        {/* ── Scroll to Top ── */}
        {showScrollTop && (
          <button onClick={scrollToTop} aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 hover:scale-110 transition-all duration-300">
            <ArrowUp size={20}/>
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
