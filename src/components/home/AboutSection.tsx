import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomButton } from '../Button';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageStackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Title Reveal
      gsap.from(".about-title", {
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      });

      // 2. Image "Brick" Stacking Effect
      const images = gsap.utils.toArray<HTMLElement>(".brick-image");
      images.forEach((img,i) => {
        gsap.from(img, {
          scrollTrigger: {
            trigger: img,
            start: "top 90%",
            toggleActions: "play none none reverse"
          },
          x: i % 2 === 0 ? -100 : 100, // Alternate left/right
          opacity: 0,
          scale: 0.8,
          duration: 1.2,
          delay: i * 0.2,
          ease: "expo.out"
        });
      });

      // 3. Counter Animation for Stats
      gsap.from(".stat-number", {
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 85%",
        },
        textContent: 0,
        duration: 2,
        ease: "power1.inOut",
        snap: { textContent: 1 },
        stagger: 0.2,
      });

    }, sectionRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#c2e8ff] overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Visual "Bricks" */}
          <div ref={imageStackRef} className="relative h-[500px] md:h-[600px]">
            {/* Main Image */}
            <div className="brick-image absolute top-0 left-0 w-4/5 h-4/5 z-20 rounded-3xl overflow-hidden shadow-2xl">
              <img src="/api/placeholder/600/800" alt="Building Digital" className="w-full h-full object-cover" />
            </div>
            {/* Accent Image 1 */}
            <div className="brick-image absolute bottom-0 right-0 w-1/2 h-1/2 z-30 rounded-3xl overflow-hidden shadow-xl border-8 border-white">
              <img src="/api/placeholder/400/400" alt="Strategy" className="w-full h-full object-cover" />
            </div>
            {/* Decorative Background Brick */}
            <div className="brick-image absolute top-20 right-10 w-24 h-24 bg-[#c2e8ff] -z-10 rounded-2xl rotate-12" />
          </div>

          {/* Right Side: Content */}
          <div ref={textRef}>
            <h2 className="about-title text-sm font-mono text-[#142c4c] uppercase tracking-widest mb-4">
              // Why Brick2Tech
            </h2>
            <h3 className="about-title text-4xl md:text-6xl font-black text-[#142c4c] leading-[1.1] mb-8 font-anokha">
              Constructing Digital <br /> 
              <span className="text-blue-500 italic">Excellence</span> One 
              Layer At A Time.
            </h3>
            
            <p className="text-lg text-slate-600 font-chillax mb-10 leading-relaxed max-w-lg">
              At Brick2Tech, we don't just launch campaigns; we engineer digital foundations. 
              By blending robust data strategy with creative intuition, we build brands that 
              stand tall in the ever-shifting social landscape.
            </p>

            {/* Stats Grid */}
            <div className="stats-container grid grid-cols-2 gap-8 border-t border-slate-100 pt-10">
              <div>
                <div className="text-4xl font-black text-[#142c4c] mb-2">
                  <span className="stat-number">98</span>%
                </div>
                <p className="text-sm uppercase tracking-wider text-slate-400 font-mono">Client Retention</p>
              </div>
              <div>
                <div className="text-4xl font-black text-[#142c4c] mb-2">
                  <span className="stat-number">50</span>+
                </div>
                <p className="text-sm uppercase tracking-wider text-slate-400 font-mono">Projects Built</p>
              </div>
            </div>

            <CustomButton className="group px-8 py-3 text-xl rounded-xl mt-3">
          Learn More <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
        </CustomButton>
          </div>

        </div>
      </div>

      {/* Background Floating Elements */}
      <div className="absolute top-1/4 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -z-20" />
    </section>
  );
};

export default About;