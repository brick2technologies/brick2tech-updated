import { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageStackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // gsap.context ensures all ScrollTriggers are killed on unmount
    const ctx = gsap.context(() => {
      // 1. Title Reveal
      gsap.from(".about-animate-up", {
        scrollTrigger: {
          trigger: ".about-title-container",
          start: "top 85%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out"
      });

      // 2. Image "Brick" Stacking Effect
      const images = gsap.utils.toArray<HTMLElement>(".brick-image");
      images.forEach((img, i) => {
        gsap.from(img, {
          scrollTrigger: {
            trigger: img,
            start: "top 92%",
            toggleActions: "play none none reverse"
          },
          x: i % 2 === 0 ? -60 : 60, 
          opacity: 0,
          scale: 0.9,
          duration: 1.4,
          delay: i * 0.1,
          ease: "expo.out"
        });
      });

      // 3. Counter Animation for Stats (Refined for Performance)
      const stats = gsap.utils.toArray<HTMLElement>(".stat-number");
      stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || "0");
        gsap.to(stat, {
          scrollTrigger: {
            trigger: ".stats-container",
            start: "top 90%",
          },
          innerText: target,
          duration: 2.5,
          snap: { innerText: 1 },
          ease: "power2.out",
        });
      });

    }, sectionRef);

    return () => ctx.revert(); 
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative py-24 bg-white overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Visual "Bricks" */}
          <div 
            ref={imageStackRef} 
            className="relative h-[500px] md:h-[600px] will-change-transform"
            role="img" 
            aria-label="Visual representation of our building process"
          >
            {/* Main Image */}
            <div className="brick-image absolute top-0 left-0 w-4/5 h-4/5 z-20 rounded-3xl overflow-hidden shadow-2xl bg-slate-100">
              <img 
                src="/about.jpeg" 
                alt="Digital engineering office" 
                className="w-full h-full object-cover"
                loading="lazy" 
              />
            </div>
            {/* Accent Image 1 */}
            <div className="brick-image absolute bottom-0 right-0 w-1/2 h-1/2 z-30 rounded-3xl overflow-hidden shadow-xl border-8 border-[#0098d4] bg-slate-200">
              <img 
                src="/about1.jpeg" 
                alt="Strategy planning session" 
                className="w-full h-full object-cover"
                loading="lazy" 
              />
            </div>
            {/* Decorative Background Brick */}
            {/* <div className="brick-image absolute top-20 right-10 w-24 h-24 bg-[#c2e8ff] -z-10 rounded-2xl rotate-12" aria-hidden="true" /> */}
          </div>

          {/* Right Side: Content */}
          <div ref={textRef} className="about-title-container">
            <h2 id="about-heading" className="about-animate-up text-sm font-mono text-[#142c4c] uppercase tracking-widest mb-4">
              // Why Brick2Tech
            </h2>
            <h3 className="about-animate-up text-4xl md:text-6xl font-black text-[#142c4c] tracking-wider mb-8 monda-swapnil leading-tight">
              Constructing Digital <br /> 
              <span className="text-[#0098d4] italic">Excellence</span> One 
              Layer At A Time.
            </h3>
            
            <p className="about-animate-up text-lg text-slate-600 font-chillax mb-10 leading-relaxed max-w-lg">
              At Brick2Tech, we don't just launch campaigns; we engineer digital foundations. 
              By blending robust data strategy with creative intuition, we build brands that 
              stand tall in the ever-shifting social landscape.
            </p>

            {/* Stats Grid */}
            <div className="stats-container grid grid-cols-2 gap-8 border-t border-slate-100 pt-10 monda-swapnil">
              <div className="about-animate-up">
                <div className="text-4xl font-black text-[#142c4c] mb-2">
                  <span className="stat-number" data-target="98">0</span>%
                </div>
                <p className="text-sm uppercase tracking-wider text-slate-400 font-mono">Client Retention</p>
              </div>
              <div className="about-animate-up">
                <div className="text-4xl font-black text-[#142c4c] mb-2">
                  <span className="stat-number" data-target="50">0</span>+
                </div>
                <p className="text-sm uppercase tracking-wider text-slate-400 font-mono">Projects Built</p>
              </div>
            </div>

            {/* <div className="about-animate-up">
              <CustomButton className="group px-8 py-3 text-xl rounded-xl mt-8">
                Learn More <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </CustomButton>
            </div> */}
          </div>

        </div>
      </div>

      {/* Background Floating Elements */}
      {/* <div className="absolute top-1/4 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -z-20 pointer-events-none" /> */}
    </section>
  );
};

export default memo(About);