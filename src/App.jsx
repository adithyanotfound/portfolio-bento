import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Code2, 
  Download,
  Layers,
  Cpu,
  Terminal,
  Globe,
  Trophy,
  Car,
  MapPin,
  Coffee
} from 'lucide-react';
import './App.css';

// --- Assets Imports (Move these files to src/assets/) ---
// Note: You must change the paths below to match where you actually put the files
import profilePic from './assets/pic.jpg';
import carImage from './assets/f1-car.svg';

// --- Data ---
const PROJECTS = [
  {
    id: 1,
    title: "KarigarMart",
    category: "E-commerce PWA",
    // These files should be in the 'public' folder
    image: "/karigar-mart.jpeg", 
    description: "Reels-based PWA with HLS streaming and Vertex AI ad generation.",
    link: "https://github.com/adithyanotfound/KarigarMart"
  },
  {
    id: 2,
    title: "Investrix",
    category: "Fintech & Blockchain",
    image: "/investrix.jpeg",
    description: "SME investment platform with unique Blockchain Bidding System",
    link: "https://investrix-v2.vercel.app/"
  },
  {
    id: 3,
    title: "Chatbox",
    category: "Real Time Chat App",
    image: "/chatbox.jpeg",
    description: "Real-time messaging application with instant delivery and responsive UI.",
    link: "https://chatbox-demo.onrender.com/"
  }
];

// Collect all images to preload
const ASSETS_TO_PRELOAD = [
  profilePic,
  carImage,
  ...PROJECTS.map(p => p.image)
];

const GREETINGS = [
  { text: 'Hello', language: 'English' },
  { text: 'Hola', language: 'Español' },
  { text: 'नमस्ते', language: 'हिन्दी' },
  { text: 'こんにちは', language: '日本語' },
  { text: 'Bonjour', language: 'Français' },
  { text: 'مرحبا', language: 'العربية' },
  { text: '你好', language: '中文' },
  { text: 'Ciao', language: 'Italiano' },
  { text: '안녕하세요', language: '한국어' },
  { text: 'Olá', language: 'Português' },
  { text: 'Привет', language: 'Русский' }
];

// --- Components ---

const Loader = ({ onComplete }) => {
  const [mounted, setMounted] = useState(true);
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [sequenceFinished, setSequenceFinished] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = ASSETS_TO_PRELOAD.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve; // Resolve even on error to avoid hanging
        });
      });

      await Promise.all(imagePromises);
      setAssetsLoaded(true);
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!sequenceFinished) {
      const durations = GREETINGS.map((_, index) =>
        index === 0 ? 500 : 180
      );

      if (currentGreetingIndex >= GREETINGS.length - 1) {
        setSequenceFinished(true);
        return;
      }

      const timeout = setTimeout(() => {
        setCurrentGreetingIndex((prev) => prev + 1);
      }, durations[currentGreetingIndex] || 180);

      return () => clearTimeout(timeout);
    }
  }, [currentGreetingIndex, sequenceFinished]);

  useEffect(() => {
    if (assetsLoaded && sequenceFinished) {
      setMounted(false);
      const timeout = setTimeout(onComplete, 500);
      return () => clearTimeout(timeout);
    }
  }, [assetsLoaded, sequenceFinished, onComplete]);

  const currentGreeting = GREETINGS[currentGreetingIndex];

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ease-in-out ${!mounted ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="flex items-center justify-center text-center px-6">
        <div className="h-24 md:h-32 flex items-center justify-center overflow-hidden">
          <p
            key={currentGreeting.text}
            className="text-4xl md:text-6xl font-marcellus text-[#FDFBF7] greeting-text"
          >
            {currentGreeting.text}
          </p>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => (
  <nav className="w-full flex justify-between items-center py-6 mb-2 animate-enter" style={{ animationDelay: '0.05s' }}>
    <div className="text-2xl font-marcellus tracking-tight font-bold flex items-center gap-2">
      <div className="w-3 h-3 bg-[#2C2825] rounded-full" />
      ADITHYA V.
    </div>
    {/* Fixed: used href instead of src, and referencing public file */}
    <a href="/Adithya_resume_2025.pdf" target="_blank" rel="noopener noreferrer">
      <div className="flex items-center gap-6 md:gap-8">
        <button className="flex items-center gap-2 bg-[#2C2825] text-[#FDFBF7] px-5 py-2 rounded-full text-sm font-medium hover:bg-[#423D38] transition-colors">
          <span>CV</span>
          <Download size={14} />
        </button>
      </div>
    </a>
  </nav>
);

const SidebarProjectItem = ({ project, isActive, onClick }) => (
  <div 
    onClick={() => {
      if (isActive) {
        window.open(project.link, '_blank');
      } else {
        onClick();
      }
    }}
    className={`group cursor-pointer py-5 border-b border-[#2C2825]/10 last:border-0 transition-all duration-500`}
  >
    <div className="flex justify-between items-center mb-2">
      <h3 className={`font-marcellus text-xl transition-colors duration-300 ${isActive ? 'text-[#2C2825]' : 'text-[#6B6661] group-hover:text-[#2C2825]'}`}>
        {project.title}
      </h3>
      <ArrowUpRight 
        size={18} 
        className={`transition-all duration-500 ${isActive ? 'opacity-100 rotate-45 text-[#2C2825]' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-[#6B6661]'}`} 
      />
    </div>
    
    <div className={`project-image-container overflow-hidden ${isActive ? 'max-h-80 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-auto max-h-60 object-cover object-center rounded-xl shadow-sm mb-3"
      />
      <p className="text-sm text-[#6B6661] leading-relaxed">
        {project.description}
      </p>
    </div>
    
    <div className="flex justify-between items-center">
      <p className={`text-xs uppercase tracking-wider transition-colors ${isActive ? 'text-[#2C2825]' : 'text-[#A89F91]'}`}>
        {project.category}
      </p>
      {isActive && <span className="text-[10px] font-bold border border-[#2C2825] px-2 py-0.5 rounded-full">VIEW CASE</span>}
    </div>
  </div>
);

const ExperienceItem = ({ role, company, period }) => (
  <div className="flex justify-between items-start border-b border-[#2C2825]/10 pb-3 last:border-0 last:pb-0 group hover:pl-2 transition-all">
    <div className="max-w-[70%]">
      <h4 className="font-medium text-[#2C2825] leading-snug">{company}</h4>
      <p className="text-sm text-[#6B6661] mt-0.5">{role}</p>
    </div>
    <span className="text-xs font-mono text-[#A89F91] whitespace-nowrap ml-auto shrink-0 mt-0.5">{period}</span>
  </div>
);

const TechBadge = ({ label }) => (
  <span className="px-3 py-1.5 text-xs font-medium border border-[#2C2825]/10 rounded-full bg-white text-[#2C2825] hover:bg-[#2C2825] hover:text-white transition-colors cursor-default">
    {label}
  </span>
);

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState(1); 

  if (loading) {
    return (
      <>
        <Loader onComplete={() => setLoading(false)} />
      </>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FDFBF7] px-4 md:px-8 pb-8">
      
      <div className="max-w-[1400px] mx-auto">
        <Navbar />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 auto-rows-min">
            
            {/* Row 1 */}
            <div className="md:col-span-1 bg-[#EBE7DE] rounded-3xl p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden bento-card animate-enter" style={{ animationDelay: '0.1s' }}>
              <div className="absolute top-6 right-6 opacity-20 animate-[spin_10s_linear_infinite]">
                <Layers size={80} strokeWidth={1} />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2C2825]/10 bg-white/50 mb-6">
                  <Trophy size={12} className="text-[#2C2825]" />
                  <span className="text-[10px] font-bold tracking-widest uppercase">5x Hackathon Winner</span>
                </div>
                <h1 className="font-marcellus text-4xl leading-[1.15] text-[#2C2825]">
                  Adithya V.
                </h1>
                <p className="text-lg text-[#6B6661] mt-2 font-medium">
                  Software Engineer
                </p>
              </div>
              <div className="mt-8">
                 <p className="text-sm text-[#6B6661] max-w-[90%] leading-relaxed">
                   Building web apps with React, Node.js, & AWS. Delivered systems processing 10k+ daily transactions.
                 </p>
              </div>
            </div>

            <div className="md:col-span-1 rounded-3xl overflow-hidden relative group h-[320px] bento-card animate-enter" style={{ animationDelay: '0.2s' }}>
              <img 
                src={profilePic} 
                alt="Profile" 
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <span className="bg-white/90 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-2">
                   <MapPin size={12} /> New Delhi, India
                 </span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="md:col-span-1 bg-white border border-[#E6E1D6] rounded-3xl p-6 bento-card animate-enter" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2 mb-6 text-[#A89F91]">
                <Code2 size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Experience</span>
              </div>
              <div className="space-y-4">
                <ExperienceItem company="Vimo" role="Software Engineer Intern" period="Jun '25 — Jul '25" />
                <ExperienceItem company="Palisa Does Foundation" role="Open Source Contributor" period="Jun '24 — Apr '25" />
              </div>
            </div>

            <div className="md:col-span-1 bg-[#F5F2EB] rounded-3xl p-6 flex flex-col justify-between bento-card animate-enter" style={{ animationDelay: '0.35s' }}>
              <div className="flex items-center gap-2 mb-4 text-[#A89F91]">
                <Coffee size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Philosophy</span>
              </div>
              <p className="text-[#2C2825] text-lg leading-relaxed font-marcellus">
                "Strong focus on performance, maintainability, and clear code. I believe that great software is an intersection of strong infrastructure and intuitive design."
              </p>
              <div className="mt-4 flex gap-4 opacity-50">
                <Globe size={20} />
                <Cpu size={20} />
                <Terminal size={20} />
              </div>
            </div>

            {/* Row 3 */}
            <div className="md:col-span-1 bg-[#EBE7DE] rounded-3xl p-6 bento-card animate-enter" style={{ animationDelay: '0.4s' }}>
               <h3 className="font-marcellus text-xl mb-4 text-[#2C2825]">Tech Stack</h3>
               <div className="flex flex-wrap gap-2 content-start">
                 {['JavaScript', 'TypeScript', 'Python', 'React', 'Next.js', 'Node.js', 'Express', 'AWS', 'OCI', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'Kafka', 'Redis', 'Git', 'Testing', 'GenAI'].map(tech => (
                   <TechBadge key={tech} label={tech} />
                 ))}
               </div>
            </div>

            <div className="md:col-span-1 bg-[#2C2825] text-[#FDFBF7] rounded-3xl p-8 flex flex-col justify-between bento-card animate-enter" style={{ animationDelay: '0.45s' }}>
              <div>
                <p className="text-sm text-white/60 mb-2">Let's Connect</p>
                <h2 className="font-marcellus text-3xl">Contact Me</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                 <a href="mailto:adithyav102@gmail.com" className="text-xs font-medium tracking-widest uppercase hover:text-[#A89F91] transition-colors text-right">Email</a>
                 <a href="https://linkedin.com/in/adithya102/" className="text-xs font-medium tracking-widest uppercase hover:text-[#A89F91] transition-colors text-right">LinkedIn</a>
                 <a href="https://github.com/adithyanotfound" className="text-xs font-medium tracking-widest uppercase hover:text-[#A89F91] transition-colors text-right">GitHub</a>
                 <a href="#" className="text-xs font-medium tracking-widest uppercase hover:text-[#A89F91] transition-colors text-right">Twitter</a>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4 bg-white border border-[#E6E1D6] rounded-3xl p-6 h-full min-h-[600px] flex flex-col bento-card animate-enter" style={{ animationDelay: '0.5s' }}>
            <div className="flex justify-between items-baseline mb-6 border-b border-[#2C2825]/10 pb-4">
               <h2 className="font-marcellus text-2xl">Selected Works</h2>
               <span className="text-xs font-mono opacity-50">03</span>
            </div>
            
            <div className="flex-1 flex flex-col gap-2">
              {PROJECTS.map((project) => (
                <SidebarProjectItem 
                  key={project.id} 
                  project={project} 
                  isActive={activeProject === project.id}
                  onClick={() => setActiveProject(project.id)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}