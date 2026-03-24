import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, ExternalLink, MoveLeft, MoveRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
}

interface WorkSectionProps {
  onContactClick: () => void;
}

// --- Data ---
const projects: Project[] = [
  {
    id: 1,
    title: "Nisargha",
    category: "Real Estate",
    description: "A comprehensive real estate website with premium property listings, lead generation, and digital marketing integration.",
    image: "/Nisarga.jpeg",
    technologies: ["WordPress", "Digital Marketing", "Social Media Marketing"],
    liveUrl: "https://nisarghahyd.com"
  },
  {
    id: 4,
    title: "Bridge Gap Hospitals",
    category: "Healthcare",
    description: "A modern healthcare website designed to build trust and improve patient engagement with streamlined appointment booking.",
    image: "bgh.jpeg",
    technologies: ["Website Development", "Digital Marketing"],
    liveUrl: "https://bridgegaphospitals.com/"
  },
  {
    id: 2,
    title: "Anumah Infra",
    category: "Real Estate",
    description: "A real estate brand website developed to showcase premium properties with high-converting landing pages.",
    image: "/Anumah-infra.jpeg",
    technologies: ["Web Development", "Digital Marketing", "Social Media Marketing"],
    liveUrl: "https://www.anumahinfra.com/"
  },
  {
    id: 5,
    title: "HK Gastro Hospital",
    category: "Healthcare",
    description: "A professional hospital website developed to showcase gastroenterology services and specialist doctors.",
    image: "/Hk-gastro-Hospital.jpeg",
    technologies: ["Website Development"],
    liveUrl: "https://www.hkgastro.in/"
  },
  {
    id: 6,
    title: "Shubha",
    category: "E-Commerce",
    description: "An online e-commerce platform developed for selling pooja samagri and festival essentials.",
    image: "/Shubha.jpeg",
    technologies: ["E-Commerce", "Product Management", "Payment Integration"],
    liveUrl: "https://www.shubha.co.in/"
  },
  {
    id: 3,
    title: "AMR Legacy",
    category: "Real Estate",
    description: "A professional real estate website designed to showcase premium residential projects with lead generation.",
    image: "/Amr.jpeg",
    technologies: ["Website Development", "WhatsApp Marketing"],
    liveUrl: "https://amrlegacy.in/"
  },
  {
    id: 7,
    title: "A360 Studio",
    category: "3D Design Studio",
    description: "A dynamic website developed for a 3D design studio to showcase architectural visualizations and portfolios.",
    image: "/a360-studio.jpg",
    technologies: ["Website Development", "Responsive Design", "Performance Optimization"],
    liveUrl: "https://a360studio.com/"
  },
  {
    id: 9,
    title: "Metsonic",
    category: "Industrial",
    description: "A comprehensive industrial website developed to showcase material testing equipment and technical documentation.",
    image: "/Metsonic.jpeg",
    technologies: ["Website Development", "Product Catalog", "Lead Generation"],
    liveUrl: "https://metsonic.vercel.app/"
  },
];

// --- Custom Sub-Components ---

// FIX: Explicitly destructure onClick and apply it to the <button>
const CustomButton = ({ children, className = "", onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-2 bg-[#142c4c] text-white px-8 py-4 rounded-2xl font-bold 
    hover:bg-[#1c3d6a] transition-all duration-300 active:scale-95 shadow-lg shadow-[#142c4c]/20 outline-none focus-visible:ring-4 focus-visible:ring-[#142c4c]/30 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const CustomDialog = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
    document.body.style.overflow = 'unset';
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-[#142c4c]/60 backdrop-blur-md"
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none" role="dialog" aria-modal="true">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-[95vw] md:w-[85vw] max-w-5xl h-[80vh] md:h-[70vh] rounded-[32px] md:rounded-[48px] shadow-2xl overflow-hidden pointer-events-auto relative"
            >
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main Portfolio Section ---

export default function PortfolioSection({ onContactClick }: WorkSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [startX, setStartX] = useState(0);

  // Animation Refs
  const requestRef = useRef<number | null>(null);
  const animateRef = useRef<() => void>(() => {});

  const cardCount = projects.length;
  const angleStep = useMemo(() => 360 / cardCount, [cardCount]);

  const [radius, setRadius] = useState(500);
  useEffect(() => {
    const handleResize = () => setRadius(window.innerWidth < 768 ? 240 : 480);
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update animation logic whenever dependencies change
  useEffect(() => {
    animateRef.current = () => {
      if (!isDragging && !selectedProject && !isHovering) {
        setRotation(prev => prev + 0.12);
      }
      requestRef.current = requestAnimationFrame(animateRef.current);
    };
  }, [isDragging, selectedProject, isHovering]);

  // Start the animation loop once on mount
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateRef.current);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    setRotation(prev => prev + deltaX * 0.2);
    setStartX(clientX);
  };

  const getCardStyle = (index: number): React.CSSProperties => {
    const angle = (index * angleStep + rotation) * (Math.PI / 180);
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius - radius;
    const rotateY = -index * angleStep - rotation;
    const scale = (z + radius * 2) / (radius * 2) * 0.3 + 0.7;

    return {
      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: 1,
      zIndex: Math.round((z + radius) * 10),
      transition: isDragging ? 'none' : 'transform 0.1s ease-out',
      backgroundColor: '#ffffff',
      willChange: 'transform',
    };
  };

  return (
    <section id='work' className="min-h-screen bg-white py-16 md:py-24 overflow-hidden relative flex flex-col items-center justify-center">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-white/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#142c4c]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 text-center mb-12 px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-[#142c4c] mb-4 tracking-wider monda-swapnil">
          Selected Works
        </h2>
        <p className="text-[#142c4c]/70 text-lg md:text-xl max-w-xl mx-auto font-medium">
          Mesmerizing digital experiences crafted with precision.
        </p>
      </header>

      {/* 3D Carousel Container */}
      <div
        className="relative h-[400px] md:h-[450px] w-full cursor-grab active:cursor-grabbing touch-none flex items-center justify-center"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={() => setIsDragging(false)}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={() => setIsDragging(false)}
        role="region"
        aria-roledescription="carousel"
        aria-label="3D Project Gallery"
      >
        <div
          className="relative w-[280px] md:w-[340px] h-[360px] md:h-[420px]"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          {projects.map((project: Project, index: number) => (
            <article
              key={project.id}
              className="absolute inset-0 rounded-[32px] overflow-hidden shadow-2xl bg-white group cursor-pointer border-[6px] border-[#142c4c] focus:outline-none focus:ring-4 focus:ring-[#0098d4]"
              style={getCardStyle(index)}
              onClick={() => setSelectedProject(project)}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
              aria-label={`View details for ${project.title}`}
            >
              <img
                src={project.image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                draggable={false}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#142c4c]/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black mb-1 text-white/90 font-chillax">{project.category}</p>
                <h3 className="text-2xl font-bold font-anokha">{project.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10 mt-12">
        <div className="flex items-center gap-6 text-[#142c4c]/40" aria-hidden="true">
          <MoveLeft className="w-5 h-5 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Explore our universe</span>
          <MoveRight className="w-5 h-5 animate-pulse" />
        </div>

        {/* Start a Project Button */}
        <CustomButton onClick={onContactClick} className="group px-12 py-5 text-xl rounded-xl font-anokha">
          Start a Project <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
        </CustomButton>
      </div>

      <CustomDialog isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="flex flex-col md:flex-row h-full">
            <div className="w-full md:w-1/2 h-[35%] md:h-full bg-white overflow-hidden">
              <img src={selectedProject.image} className="w-full h-full object-cover" alt={selectedProject.title} />
            </div>
            <div className="w-full md:w-1/2 h-[65%] md:h-full p-8 md:p-16 flex flex-col relative overflow-hidden bg-white">
              <button 
                onClick={() => setSelectedProject(null)} 
                className="absolute top-6 right-6 p-3 bg-[#142c4c] text-white rounded-full hover:rotate-90 transition-transform duration-300 z-20 outline-none focus:ring-4 focus:ring-[#0098d4]"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
              <div className="overflow-y-auto pr-2">
                <span className="inline-block px-3 py-1 bg-[#142c4c]/10 text-[#142c4c] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 font-chillax">
                  {selectedProject.category}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-[#142c4c] mb-6 tracking-tighter leading-tight font-anokha">{selectedProject.title}</h2>
                <p className="text-lg text-[#142c4c]/70 leading-relaxed mb-8 font-chillax">{selectedProject.description}</p>
                <div className="mb-10">
                  <h4 className="text-[#142c4c] font-black text-[10px] uppercase tracking-widest mb-4">Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech: string) => (
                      <span key={tech} className="px-4 py-2 bg-[#c2e8ff] rounded-xl text-xs font-bold text-[#142c4c]">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-6 border-t border-gray-100 font-chillax">
                <CustomButton className="w-full" onClick={() => window.open(selectedProject.liveUrl, '_blank', 'noopener,noreferrer')}>
                  View Project <ExternalLink size={20} />
                </CustomButton>
              </div>
            </div>
          </div>
        )}
      </CustomDialog>
    </section>
  );
}