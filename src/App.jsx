
import React, { useState, useRef, useEffect } from "react";
import {
  Sun,
  Moon,
  ExternalLink,
  Github,
  Linkedin,
  BookOpen,
  GraduationCap,
  BadgeCheck,
  Code,
  MessageCircle,
  ArrowUp,
  Menu,
  X,
} from "lucide-react";
import profilePic from "./profile.jpg";
import toast, { Toaster } from "react-hot-toast";
import "./index.css";

// ─── Typing Effect Hook ───────────────────────────────────────────────────────
function useTypingEffect(words, speed = 100, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(
      () => {
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
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
}

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Nav links ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "About",          href: "#about" },
  { label: "Skills",         href: "#skills" },
  { label: "Projects",       href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Education",      href: "#education" },
  { label: "Contact",        href: "#contact" },
];

// ─── App ──────────────────────────────────────────────────────────────────────
const App = () => {
  const [darkMode,      setDarkMode]     = useState(false);
  const [showModal,     setShowModal]    = useState(false);
  const [isSubmitting,  setIsSubmitting] = useState(false);
  const [menuOpen,      setMenuOpen]     = useState(false);
  const [showScrollTop, setShowScrollTop]= useState(false);
  const [activeSection, setActiveSection]= useState("about");
  const formRef = useRef(null);

  const typedText = useTypingEffect([
    "Software Developer",
    "MERN Stack Developer",
    "Big Data Enthusiast",
    "Django Developer",
    "Problem Solver",
  ]);

  useScrollReveal();

  // Show scroll-to-top after 400 px
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section highlight in navbar
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

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

  const smoothNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <style>{`
        /* Scroll reveal */
        .reveal { opacity:0; transform:translateY(28px); transition:opacity .65s ease,transform .65s ease; }
        .reveal.revealed { opacity:1; transform:translateY(0); }
        .reveal-delay-1 { transition-delay:.1s; }
        .reveal-delay-2 { transition-delay:.2s; }
        .reveal-delay-3 { transition-delay:.3s; }
        .reveal-delay-4 { transition-delay:.4s; }

        /* Stagger for grid children */
        .stagger-child:nth-child(1)  { transition-delay:.05s; }
        .stagger-child:nth-child(2)  { transition-delay:.12s; }
        .stagger-child:nth-child(3)  { transition-delay:.19s; }
        .stagger-child:nth-child(4)  { transition-delay:.26s; }
        .stagger-child:nth-child(5)  { transition-delay:.33s; }
        .stagger-child:nth-child(6)  { transition-delay:.40s; }
        .stagger-child:nth-child(7)  { transition-delay:.47s; }
        .stagger-child:nth-child(8)  { transition-delay:.54s; }
        .stagger-child:nth-child(9)  { transition-delay:.61s; }
        .stagger-child:nth-child(10) { transition-delay:.68s; }
        .stagger-child:nth-child(11) { transition-delay:.75s; }
        .stagger-child:nth-child(12) { transition-delay:.82s; }

        /* Typing cursor */
        .typing-cursor::after { content:'|'; animation:blink .75s step-end infinite; margin-left:2px; color:#6366f1; }
        @keyframes blink { 50% { opacity:0; } }

        /* Animated gradient hero background */
        .hero-bg {
          background:
            radial-gradient(ellipse at 20% 40%, rgba(99,102,241,.14) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 10%, rgba(59,130,246,.11) 0%, transparent 55%),
            radial-gradient(ellipse at 60% 80%, rgba(139,92,246,.09) 0%, transparent 50%);
          animation: meshShift 9s ease-in-out infinite alternate;
        }
        @keyframes meshShift {
          0%   { background-position: 20% 40%, 80% 10%, 60% 80%; }
          100% { background-position: 25% 45%, 75% 15%, 65% 75%; }
        }

        /* Profile ring pulse */
        @keyframes ringPulse {
          0%,100% { box-shadow: 0 0 0 0   rgba(99,102,241,.45); }
          50%      { box-shadow: 0 0 0 12px rgba(99,102,241,0);   }
        }
        .profile-ring { animation: ringPulse 2.6s ease-in-out infinite; }

        /* Glass navbar */
        .navbar-glass { background:rgba(255,255,255,.86); backdrop-filter:blur(14px); border-bottom:1px solid rgba(0,0,0,.06); }
        .dark .navbar-glass { background:rgba(3,7,18,.88); border-bottom:1px solid rgba(255,255,255,.07); }

        /* Skill shimmer */
        .skill-card { position:relative; overflow:hidden; }
        .skill-card::before {
          content:''; position:absolute; top:-60%; left:-60%;
          width:50%; height:200%;
          background:linear-gradient(120deg, transparent, rgba(99,102,241,.13), transparent);
          transform:skewX(-20deg); transition:.5s;
        }
        .skill-card:hover::before { left:130%; }
      `}</style>

      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300 font-sans">
        <Toaster position="bottom-right" />

        {/* ── Sticky Navbar ── */}
        <nav className="navbar-glass sticky top-0 z-40 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="#about" onClick={(e) => smoothNav(e, "#about")}
              className="font-extrabold text-lg text-indigo-600 dark:text-indigo-400 tracking-tight">
              KM<span className="text-gray-400">.</span>
            </a>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={(e) => smoothNav(e, link.href)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200
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
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white hover:scale-110 transition-transform shadow-sm">
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white">
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden px-4 pb-4 pt-2 flex flex-col gap-1 border-t border-gray-100 dark:border-gray-800">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} onClick={(e) => smoothNav(e, link.href)}
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
        <section id="about" className="hero-bg relative text-center px-4 pt-20 pb-16 max-w-3xl mx-auto">
          <div className="reveal reveal-delay-1 w-36 h-36 mx-auto mb-5 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl profile-ring">
            <img src={profilePic} alt="Krushil Modi" className="w-full h-full object-cover" />
          </div>

          <h1 className="reveal reveal-delay-2 text-3xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
            Krushil Modi
          </h1>

          <h2 className="reveal reveal-delay-3 typing-cursor text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mt-3 min-h-[2rem]">
            {typedText}
          </h2>

          <p className="reveal reveal-delay-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
            📍 Ahmedabad, Gujarat &nbsp;·&nbsp; 📞 7863868115 &nbsp;·&nbsp; ✉️ krushilmodi1234@gmail.com
          </p>

          {/* Social links */}
          <div className="reveal reveal-delay-4 flex justify-center gap-4 mt-5">
            <a href="https://github.com/Krushilmodi1" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition hover:scale-105 shadow">
              <Github size={16} /> GitHub
            </a>
            <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition hover:scale-105 shadow">
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>

          {/* Bio */}
          <div className="reveal reveal-delay-4 mt-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <p className="leading-relaxed">
              🎯 A passionate postgraduate in <strong>Big Data Analytics</strong>{" "}
              with a deep interest in building scalable web apps, solving real-world problems, and continuously
              learning. I love working on modern stacks like{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">MERN</span>,{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Django</span>, and{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Cloud integrations</span>.
            </p>
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="px-6 py-16 max-w-5xl mx-auto">
          <h3 className="reveal text-3xl font-extrabold flex items-center gap-2 justify-center text-indigo-600 dark:text-indigo-400 mb-10">
            <Code className="w-7 h-7" /> Skills
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {[
              "Java ☕","Python 🐍","JavaScript 🟨","HTML 🔤",
              "CSS 🎨","Bootstrap 🅱️","React.js ⚛️","Node.js 🌿",
              "MongoDB 🍃","MySQL 🗃️","Django 🧩","Git/GitHub 🐙",
            ].map((text, i) => (
              <div key={i}
                className="reveal stagger-child skill-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center font-semibold text-gray-800 dark:text-white shadow-sm hover:shadow-md transition duration-300 hover:-translate-y-1 hover:border-indigo-400 dark:hover:border-indigo-500 cursor-default">
                <span className="block text-lg">{text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="px-6 py-16 max-w-6xl mx-auto">
          <h3 className="reveal text-3xl font-extrabold flex items-center gap-2 justify-center text-indigo-600 dark:text-indigo-400 mb-10">
            <BookOpen className="w-7 h-7" /> Projects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Time Table Scheduling",
                tech: ["HTML","CSS","JavaScript","Python","Django"],
                description: "A full-stack web app that auto-generates timetables for students and staff — saves time and reduces scheduling errors.",
                status: "Completed", github: "#", live: "#",
              },
              {
                title: "Real Estate Marketplace",
                tech: ["MERN Stack","Tailwind CSS"],
                description: "A modern platform to rent/buy/sell properties with secure login and advanced filtering options.",
                status: "Completed", github: "#", live: "#",
              },
            ].map((project, i) => (
              <div key={i}
                className="reveal stagger-child relative group bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 transition duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-400 dark:hover:border-indigo-500">
                <div className="absolute top-0 right-0 m-3">
                  <span className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 text-xs px-3 py-1 rounded-full font-medium">
                    {project.status}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="text-indigo-500">📌</span> {project.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t, j) => (
                    <span key={j} className="px-3 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-700">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Links</span>
                  <div className="flex gap-3">
                    <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition"><Github size={18} /></a>
                    <a href={project.live}   target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition"><ExternalLink size={18} /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Certifications ── */}
        <section id="certifications" className="px-6 py-16 max-w-6xl mx-auto">
          <h3 className="reveal text-3xl font-bold flex items-center gap-2 justify-center text-indigo-600 dark:text-indigo-400 mb-10">
            <BadgeCheck className="w-7 h-7" /> Certifications
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title:"UML - The Most Complete Guide", source:"Udemy",      date:"Dec 2024", icon:"📘", bg:"bg-blue-50 dark:bg-blue-900/20",    text:"text-blue-700 dark:text-blue-300" },
              { title:"AI Tools",                      source:"Skill Nation",date:"Oct 2024", icon:"🤖", bg:"bg-purple-50 dark:bg-purple-900/20", text:"text-purple-700 dark:text-purple-300" },
              { title:"C and C++",                     source:"Offline",    date:"July 2023",icon:"📟", bg:"bg-green-50 dark:bg-green-900/20",   text:"text-green-700 dark:text-green-300" },
              { title:"Business Management",           source:"Udemy",      date:"Dec 2024", icon:"📊", bg:"bg-yellow-50 dark:bg-yellow-900/20", text:"text-yellow-700 dark:text-yellow-300" },
              { title:"Python for Everybody",          source:"Coursera",   date:"Nov 2024", icon:"🐍", bg:"bg-emerald-50 dark:bg-emerald-900/20",text:"text-emerald-700 dark:text-emerald-300" },
            ].map((cert, i) => (
              <div key={i}
                className="reveal stagger-child group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 hover:border-indigo-300 dark:hover:border-indigo-600">
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${cert.bg} mb-4 text-2xl`}>{cert.icon}</div>
                <h4 className={`text-base font-bold ${cert.text} group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition`}>{cert.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{cert.source}</span> · {cert.date}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Education ── */}
        <section id="education" className="px-6 py-16 max-w-4xl mx-auto">
          <h3 className="reveal text-3xl font-bold flex items-center gap-2 justify-center text-indigo-600 dark:text-indigo-400 mb-10">
            <GraduationCap className="w-7 h-7" /> Education
          </h3>
          <div className="relative border-l-4 border-indigo-400 dark:border-indigo-500 pl-8 space-y-10">
            {[
              { degree:"M.Sc. in Big Data Analytics", institute:"St. Xavier's College, Ahmedabad", period:"2025–2027 (Pursuing)", delay:"reveal-delay-1" },
              { degree:"BCA", institute:"Indus University", extra:"CGPA: 8.86 / 10", period:"2022–2025", delay:"reveal-delay-2" },
            ].map((edu, i) => (
              <div key={i} className={`reveal ${edu.delay} relative`}>
                <div className="absolute -left-[2.65rem] top-1.5 w-5 h-5 bg-indigo-500 dark:bg-indigo-400 rounded-full border-4 border-white dark:border-gray-950" />
                <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-300">
                  <h4 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">{edu.degree}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {edu.institute}
                    {edu.extra && <span className="text-gray-400 dark:text-gray-500"> · {edu.extra}</span>}
                  </p>
                  <span className="inline-block mt-2 text-xs italic text-gray-400 dark:text-gray-500">{edu.period}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="px-6 py-16 max-w-2xl mx-auto text-center">
          <h3 className="reveal text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 mb-3">
            <MessageCircle className="w-7 h-7" /> Contact Me
          </h3>
          <p className="reveal text-gray-500 dark:text-gray-400 mb-7">
            Got a project or question? I'd love to hear from you.
          </p>
          <button onClick={() => setShowModal(true)}
            className="reveal px-7 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg transition hover:scale-105 font-semibold">
            📩 Open Contact Form
          </button>

          {showModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
                <button onClick={() => setShowModal(false)}
                  className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl transition">✖</button>
                <h4 className="text-xl font-semibold mb-5 text-blue-600 dark:text-blue-400">Let's Connect</h4>
                <form ref={formRef} onSubmit={handleContactSubmit} className="space-y-4 text-left">
                  <input type="hidden" name="access_key" value="73e6f4ee-4874-4f03-9d4a-a78c0a5f0b2b" />
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Your Name</label>
                    <input type="text" name="name" placeholder="Krushil Modi" required
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Your Email</label>
                    <input type="email" name="email" placeholder="you@example.com" required
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Message</label>
                    <textarea name="message" placeholder="Tell me about your project..." rows="4" required
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none" />
                  </div>
                  <button type="submit" disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition">
                    {isSubmitting ? "Sending..." : "🚀 Send Message"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </section>

        {/* ── Footer ── */}
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-6 text-center">
          <div className="flex justify-center gap-6 items-center mb-3">
            <a href="https://github.com/Krushilmodi1" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition">
              <Github size={18} /> GitHub
            </a>
            <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition">
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © {new Date().getFullYear()} Krushil Modi · Built with React & Tailwind CSS
          </p>
        </footer>

        {/* ── Scroll to Top ── */}
        {showScrollTop && (
          <button onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 hover:scale-110 transition-all duration-300"
            aria-label="Scroll to top">
            <ArrowUp size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
