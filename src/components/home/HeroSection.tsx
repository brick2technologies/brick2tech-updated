import React, { useRef } from 'react';
import { motion } from "framer-motion";
import { Instagram, Linkedin, Youtube, Facebook, ArrowUpRight, type LucideIcon } from 'lucide-react';
import InfiniteClients from '../ClientCarousel';
import Client1 from "../../assets/clients/client-1.png";
import Client2 from "../../assets/clients/client-2.svg";
import Client3 from "../../assets/clients/client-3.jpeg";
import Client4 from "../../assets/clients/client-4.png";
import Client5 from "../../assets/clients/client-5.png";
// import Client6 from "../../assets/clients/client-6.png";
import Client7 from "../../assets/clients/client-7.png";
import Client8 from "../../assets/clients/client-8.jpeg";
import Client9 from "../../assets/clients/client-9.png";
import Client10 from "../../assets/clients/client-10.png";
import Client11 from "../../assets/clients/client-11.png";
import Client12 from "../../assets/clients/client-12.jpeg";
import Client13 from "../../assets/clients/client-13.png";
import Client14 from "../../assets/clients/client-14.png";
import Client15 from "../../assets/clients/client-15.png";
import Client16 from "../../assets/clients/client-16.jpeg";




interface FloatingSocialProps {
  icon: LucideIcon;
  delay?: number;
  className: string; 
  color?: string;
}

const FloatingSocial: React.FC<FloatingSocialProps> = ({
  icon: Icon,
  delay = 0,
  className,
  color = "#142c4c"
}) => (
  <motion.div
    className={`absolute pointer-events-none z-10 ${className}`}
    initial={{ y: 0 }}
    animate={{
      y: [0, -12, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }}
  >
    <div className="p-2 md:p-3 bg-white/90 rounded-2xl shadow-lg border border-white/50 backdrop-blur-sm">
      <Icon className="w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} color={color} />
    </div>
  </motion.div>
);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // const { scrollYProgress } = useScroll();

  // const xTranslation = useTransform(scrollYProgress, [0, 1], [0, -1800]);
  // const springX = useSpring(xTranslation, { stiffness: 45, damping: 18 });

  // --- UPDATE: ACTUAL CLIENT LOGO DATA ---
  const clientLogos = [
  { name: "Client 1", logo: Client1 },
  { name: "Client 2", logo: Client2 },
  { name: "Client 3", logo: Client3 },
  { name: "Client 4", logo: Client4 },
  { name: "Client 5", logo: Client5 },
  // { name: "Client 6", logo: Client6 },
  { name: "Client 7", logo: Client7 },
  { name: "Client 8", logo: Client8 },
  { name: "Client 9", logo: Client9 },
  { name: "Client 10", logo: Client10 },
  { name: "Client 11", logo: Client11 },
  { name: "Client 12", logo: Client12 },
  { name: "Client 13", logo: Client13 },
  { name: "Client 14", logo: Client14 },
  { name: "Client 15", logo: Client15 },
  { name: "Client 16", logo: Client16 },
];
  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col bg-[#c2e8ff] overflow-hidden pt-10">

      {/* 1. VIDEO CONTAINER */}
      <div className="w-full h-[200px] md:h-[340px] mt-12 md:mt-20 relative overflow-hidden bg-transparent z-20 mx-auto max-w-[90%]">
        <video className="w-full h-full object-cover rounded-[32px]" autoPlay muted loop playsInline>
          <source src="/marketing-showreel.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. CONTENT AREA */}
      <div className="flex-grow flex flex-col items-center justify-center py-12 px-6 relative z-30">
        
        <div className="text-center max-w-5xl relative">
          
          {/* HEADLINE WAVE - Arcing over the text */}
          <div className="absolute -top-12 md:-top-20 left-0 w-full h-10 pointer-events-none">
            <FloatingSocial icon={Instagram} color="#E4405F" delay={0} className="left-[5%] top-[20%] md:left-[10%] md:top-[20%]" />
            <FloatingSocial icon={Linkedin} color="#0077B5" delay={0.3} className="left-[25%] -top-[10%] md:left-[30%] md:-top-[30%]" />
            <FloatingSocial icon={Facebook} color="#1877F2" delay={0.6} className="left-[50%] -top-[20%] md:left-[50%] md:-top-[50%]" />
            <FloatingSocial icon={Youtube} color="#FF0000" delay={0.9} className="left-[75%] -top-[10%] md:left-[70%] md:-top-[30%]" />
            <FloatingSocial icon={Instagram} color="#E4405F" delay={1.2} className="left-[90%] top-[20%] md:left-[90%] md:top-[20%]" />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-[#142c4c] tracking-tight leading-[1] mb-8 font-anokha relative z-20"
          >
            Dominate The Digital <br className="hidden md:block" />
            Landscape Today
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-[#142c4c]/60 max-w-2xl mx-auto font-semibold leading-relaxed font-chillax mb-10"
          >
            We deploy data-driven digital marketing strategies that
            transform your social presence into a revenue machine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="group w-full sm:w-auto bg-[#142c4c] text-white px-10 py-4 rounded-xl font-mono text-md shadow-xl  transition-all flex items-center justify-center gap-2">
              View Work <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            <button className=" group w-full sm:w-auto bg-white text-[#142c4c] border-2 border-[#142c4c]/10 px-10 py-4 rounded-xl font-mono text-md font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              Contact Us <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>

      <InfiniteClients logos={clientLogos} />


    </section>
  );
};

export default Hero;