// App.jsx
import React, { useState, useRef } from "react";
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
} from "lucide-react";
import profilePic from "./profile.jpg";
import toast, { Toaster } from "react-hot-toast";
import "./index.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    formData.append("access_key", "73e6f4ee-4874-4f03-9d4a-a78c0a5f0b2b");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        toast.success("✅ Message sent! I'll reply within 24 hours.");
        formRef.current?.reset();
        setShowModal(false);
      } else {
        toast.error("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("❌ Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all font-sans">
        <Toaster position="bottom-right" />

        {/* Profile & Summary */}
        <section className="relative text-center px-4 py-12 max-w-3xl mx-auto">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="fixed top-5 right-5 z-50 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white shadow-md transition-all hover:scale-110 hover:shadow-lg"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Profile Picture with Glow */}
          <div className="relative w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white dark:border-gray-600 shadow-xl ring-4 ring-indigo-200 dark:ring-indigo-500/30">
            <img
              src={profilePic}
              alt="Krushil Modi"
              className="w-36 h-36 mx-auto rounded-full border-[6px] border-white dark:border-gray-800 shadow-2xl ring-4 ring-blue-300 dark:ring-blue-500 transition duration-500"
            />
          </div>

          {/* Name & Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
            Krushil Modi
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mt-2">
            Software Developer
          </h2>

          {/* Contact Info */}
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
            Ahmedabad, Gujarat · 7863868115 · krushilmodi1234@gmail.com
          </p>

          {/* About Description Box */}
          <div className="mt-6 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <p className="leading-relaxed text-[1rem]">
              🎯 A passionate postgraduate in{" "}
              <strong>Big Data Analytics</strong> with a deep interest in
              building scalable web apps, solving real-world problems, and
              continuously learning. I love working on modern stacks like{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                MERN
              </span>
              ,
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                {" "}
                Django
              </span>
              , and{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                Cloud integrations
              </span>
              .
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className="px-6 py-12 max-w-5xl mx-auto">
          <h3 className="text-3xl font-extrabold flex items-center gap-2 justify-center text-indigo-600 dark:text-indigo-400">
            <Code className="w-6 h-6" /> Skills
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10">
            {[
              "Java ☕",
              "Python 🐍",
              "JavaScript 🟨",
              "HTML 🔤",
              "CSS 🎨",
              "Bootstrap 🅱️",
              "React.js ⚛️",
              "Node.js 🌿",
              "MongoDB 🍃",
              "MySQL 🗃️",
              "Django 🧩",
              "Git/GitHub 🐙",
            ].map((text, index) => (
              <div
                key={index}
                className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center font-semibold text-gray-800 dark:text-white shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 hover:scale-[1.03]"
              >
                <span className="block text-lg">{text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="px-6 py-14 max-w-6xl mx-auto">
          <h3 className="text-3xl font-extrabold flex items-center gap-2 justify-center text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-7 h-7" /> Projects
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {[
              {
                title: "Time Table Scheduling",
                tech: ["HTML", "CSS", "JavaScript", "Python", "Django"],
                description:
                  "A full-stack web app that auto-generates timetables for students and staff — saves time and reduces errors.",
                status: "Completed",
                github: "#",
                live: "#",
              },
              {
                title: "Real Estate Marketplace",
                tech: ["MERN Stack", "Tailwind CSS"],
                description:
                  "A modern platform to rent/buy/sell properties with secure login and advanced filtering options.",
                status: "Completed",
                github: "#",
                live: "#",
              },
            ].map((project, i) => (
              <div
                key={i}
                className="relative group bg-white/90 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 dark:border-gray-700 transition duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-indigo-500"
              >
                <div className="absolute top-0 right-0 m-3">
                  <span className="bg-green-100 text-green-700 dark:bg-green-700 dark:text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                    {project.status}
                  </span>
                </div>

                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="text-indigo-500 dark:text-indigo-400">
                    📌
                  </span>{" "}
                  {project.title}
                </h4>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 dark:from-indigo-700 dark:to-purple-700 dark:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium opacity-80">Links:</span>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 transition"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 transition"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="px-6 py-14 max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold flex items-center gap-2 justify-center text-indigo-600 dark:text-indigo-400">
            <BadgeCheck className="w-6 h-6" /> Certifications
          </h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
            {[
              {
                title: "UML - The Most Complete Guide",
                source: "Udemy",
                date: "Dec 2024",
                icon: "📘",
                color: "from-blue-100 to-blue-300 text-blue-800",
              },
              {
                title: "AI Tools",
                source: "Skill Nation",
                date: "Oct 2024",
                icon: "🤖",
                color: "from-purple-100 to-purple-300 text-purple-800",
              },
              {
                title: "C and C++",
                source: "Offline",
                date: "July 2023",
                icon: "📟",
                color: "from-green-100 to-green-300 text-green-800",
              },
              {
                title: "Business Management",
                source: "Udemy",
                date: "Dec 2024",
                icon: "📊",
                color: "from-yellow-100 to-yellow-300 text-yellow-800",
              },
              {
                title: "Python for Everybody",
                source: "Coursera",
                date: "Nov 2024",
                icon: "🐍",
                color: "from-emerald-100 to-emerald-300 text-emerald-800",
              },
            ].map((cert, i) => (
              <div
                key={i}
                className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 hover:scale-[1.02]"
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr ${cert.color} mb-4 text-xl`}
                >
                  {cert.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-indigo-600 transition">
                  {cert.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span className="font-medium">{cert.source}</span> •{" "}
                  {cert.date}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="px-6 py-12 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold flex items-center gap-2 justify-center text-indigo-600 dark:text-indigo-400">
            <GraduationCap className="w-6 h-6" /> Education
          </h3>

          <div className="mt-10 relative border-l-4 border-indigo-500 dark:border-indigo-400 pl-6 space-y-10">
            <div className="relative">
              <div className="absolute -left-3 top-1 w-6 h-6 bg-indigo-500 dark:bg-indigo-400 rounded-full border-4 border-white dark:border-gray-900" />
              <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-lg transition hover:scale-[1.02] duration-300">
                <h4 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">
                  M.Sc. in Big Data Analytics
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  St. Xavier's College, Ahmedabad <br />
                  <span className="italic text-xs text-gray-500 dark:text-gray-400">
                    2025–2027 (Pursuing)
                  </span>
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-3 top-1 w-6 h-6 bg-indigo-500 dark:bg-indigo-400 rounded-full border-4 border-white dark:border-gray-900" />
              <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-lg transition hover:scale-[1.02] duration-300">
                <h4 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">
                  BCA
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Indus University, CGPA: 8.86/10 <br />
                  <span className="italic text-xs text-gray-500 dark:text-gray-400">
                    2022–2025
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="px-6 py-12 max-w-2xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 mb-4">
            <MessageCircle className="w-6 h-6" /> Contact Me
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Got a project or question? I'd love to hear from you. Just click
            below!
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition hover:scale-105 font-medium"
          >
            📩 Open Contact Form
          </button>

          {showModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl w-11/12 max-w-md relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 text-lg"
                >
                  ✖
                </button>

                <h4 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                  Let's Connect
                </h4>

                <form
                  ref={formRef}
                  onSubmit={handleContactSubmit}
                  className="space-y-4"
                >
                  {/* Web3Forms hidden field */}
                  <input
                    type="hidden"
                    name="access_key"
                    value="73e6f4ee-4874-4f03-9d4a-a78c0a5f0b2b"
                  />

                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="4"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition"
                  >
                    {isSubmitting ? "Sending..." : "🚀 Send Message"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-gray-900 py-6 mt-10 text-center">
          <div className="flex justify-center gap-6 items-center">
            <a
              href="https://github.com/Krushilmodi1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-2"
            >
              <Github size={20} />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-2"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            © 2025 Krushil Modi. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
