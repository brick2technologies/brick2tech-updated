import React, { useState, useEffect } from 'react';
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

// --- Custom Sub-Components ---

const CustomButton = ({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`flex items-center justify-center gap-2 bg-[#142c4c] text-white px-8 py-4 rounded-2xl font-bold 
    hover:bg-[#1c3d6a] transition-all duration-300 active:scale-95 shadow-lg shadow-[#142c4c]/20 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const CustomDialog = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-[#142c4c]/60 backdrop-blur-md pointer-events-auto"
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              /* Fixed dimensions: 90% of screen on mobile, fixed large size on desktop */
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

const projects: Project[] = [
 {
  id: 1,
  title: "Nisargha",
  category: "Real Estate",
  description: "A comprehensive real estate website with premium property listings, lead generation, and digital marketing integration.",
  image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",
  technologies: ["WordPress", "Digital Marketing", "Social Media Marketing"],
  liveUrl: "https://nisarghahyd.com"
},
 {
  id: 2,
  title: "Anumah Infra",
  category: "Real Estate",
  description: "A real estate brand website developed to showcase premium properties with high-converting landing pages, integrated lead capture system, and full-scale digital marketing strategy including social media campaigns.",
  image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
  technologies: ["Web Development", "Digital Marketing", "Social Media Marketing"],
  liveUrl: "https://www.anumahinfra.com/"
},
  {
  id: 3,
  title: "AMR Legacy",
  category: "Real Estate",
  description: "A professional real estate website designed to showcase premium residential projects with high-converting landing pages, integrated lead generation system, and complete digital growth strategy including social media campaigns and WhatsApp marketing automation.",
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  technologies: [
    "Website Development",
    "Digital Marketing",
    "Social Media Marketing",
    "WhatsApp Marketing"
  ],
  liveUrl: "https://amrlegacy.in/"
},
 {
  id: 4,
  title: "Bridge Gap Hospitals",
  category: "Healthcare",
  description: "A modern healthcare website designed to build trust and improve patient engagement with streamlined appointment booking, service highlights, and integrated digital marketing strategies including social media and WhatsApp communication.",
  image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80",
  technologies: [
    "Website Development",
    "Digital Marketing"
  ],
  liveUrl: "https://bridgegaphospitals.com/"
},
 {
  id: 5,
  title: "HK Gastro Hospital",
  category: "Healthcare",
  description: "A professional hospital website developed to showcase gastroenterology services, specialist doctors, treatment information, and seamless appointment booking with a clean, patient-focused design.",
  image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80",
  technologies: [
    "Website Development"
  ],
  liveUrl: "https://www.hkgastro.in/"
},
 {
  id: 6,
  title: "Shubha",
  category: "E-Commerce",
  description: "An online e-commerce platform developed for selling pooja samagri and festival essentials, featuring product catalog management, secure checkout system, and seamless online ordering experience.",
  image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=800&q=80",
  technologies: [
    "E-Commerce Website Development",
    "Product Management",
    "Online Payment Integration"
  ],
  liveUrl: "https://www.shubha.co.in/"
},
 {
  id: 7,
  title: "A360 Studio",
  category: "3D Design Studio",
  description: "A dynamic website developed for a 3D design studio to showcase architectural visualizations, 3D walkthroughs, and creative portfolios with a modern and visually immersive user experience.",
  image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
  technologies: [
    "Website Development",
    "Responsive Design",
    "Performance Optimization"
  ],
  liveUrl: "https://a360studio.com/"
},
 {
  id: 9,
  title: "Metsonic",
  category: "Industrial / Material Testing",
  description: "A comprehensive industrial website developed to showcase Metsonic’s complete range of material testing equipment, product specifications, technical documentation, and inquiry-based lead generation system for engineering clients.",
  image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
  technologies: [
    "Website Development",
    "Product Catalog System",
    "Technical Documentation Integration",
    "Lead Generation Forms"
  ],
  liveUrl: "https://metsonic.vercel.app/"
},
];



export default function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [startX, setStartX] = useState(0);
  
  const cardCount = projects.length;
  const angleStep = 360 / cardCount;
  
  const [radius, setRadius] = useState(500);
  useEffect(() => {
    const handleResize = () => setRadius(window.innerWidth < 768 ? 240 : 480);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isDragging && !selectedProject && !isHovering) {
      const timer = setInterval(() => {
        setRotation(prev => prev + 0.12);
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isDragging, selectedProject, isHovering]);

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
    
    // CHANGE: Removed the dynamic opacity calculation to keep cards 100% visible
    const opacity = 1; 

    return {
      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: opacity,
      zIndex: Math.round((z + radius) * 10),
      transition: isDragging ? 'none' : 'transform 0.1s ease-out, opacity 0.1s ease-out',
      backgroundColor: '#ffffff', // Ensures the card backing is solid white
    };
  };

  return (
    <section className="min-h-screen bg-[#c2e8ff] py-16 md:py-24 overflow-hidden relative font-sans flex flex-col items-center justify-center">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-white/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#142c4c]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center mb-12 px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-[#142c4c] mb-4 tracking-tighter font-anokha">
          Selected Works
        </h2>
        <p className="text-[#142c4c]/70 text-lg md:text-xl max-w-xl mx-auto font-medium font-chillax">
          Mesmerizing digital experiences crafted with precision.
        </p>
      </div>

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
      >
        <div 
          className="relative w-[280px] md:w-[340px] h-[360px] md:h-[420px]"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="absolute inset-0 rounded-[32px] overflow-hidden shadow-2xl bg-white group cursor-pointer border-[6px] border-white pointer-events-auto"
              style={getCardStyle(index)}
              onClick={() => setSelectedProject(project)}
            >
              {/* CHANGE: Added opacity-100 to ensure image is never transparent */}
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-100" 
                draggable={false} 
              />
              
              {/* CHANGE: Adjusted the overlay. It now only appears slightly at the bottom 
                  to keep the text readable, but leaves the rest of the image clean. */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#142c4c]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black mb-1 text-white/90 font-chillax">{project.category}</p>
                <h3 className="text-2xl font-bold font-anokha">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ... Navigation & CTA ... */}
      <div className="relative z-10 flex flex-col items-center gap-10 mt-12">
        <div className="flex items-center gap-6 text-[#142c4c]/40">
          <MoveLeft className="w-5 h-5 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Explore our universe</span>
          <MoveRight className="w-5 h-5 animate-pulse" />
        </div>

        <CustomButton className="group px-12 py-5 text-xl rounded-xl font-anokha">
          Start a Project <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
        </CustomButton>
      </div>

      {/* Fixed-Size Modal */}
      <CustomDialog isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="flex flex-col md:flex-row h-full">
            <div className="w-full md:w-1/2 h-[35%] md:h-full bg-white overflow-hidden">
              <img src={selectedProject.image} className="w-full h-full object-cover opacity-100" alt="" />
            </div>
            {/* ... rest of modal content ... */}
            <div className="w-full md:w-1/2 h-[65%] md:h-full p-8 md:p-16 flex flex-col relative overflow-hidden bg-white">
               {/* Modal Content remains the same, ensuring bg-white is used */}
               <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 p-3 bg-[#142c4c] text-white rounded-full hover:rotate-90 transition-transform duration-300 z-20">
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
                    {selectedProject.technologies.map(tech => (
                      <span key={tech} className="px-4 py-2 bg-[#c2e8ff] rounded-xl text-xs font-bold text-[#142c4c]">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-6 border-t border-gray-100 font-chillax">
                <CustomButton className="w-full" onClick={() => window.open(selectedProject.liveUrl, '_blank')}>
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