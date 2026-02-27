import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Heading Reveal with Skew
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          y: 80,
          opacity: 0,
          skewY: 4,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 92%",
          }
        });
      }

      // 2. Info Blocks Staggered Slide
      const infoItems = infoRef.current?.children;
      if (infoItems) {
        gsap.from(infoItems, {
          x: -40,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%",
          }
        });
      }

      // 3. Form Bricks "Pop" Assembly
      const formElements = formRef.current?.querySelectorAll('.form-brick');
      if (formElements && formElements.length > 0) {
        gsap.from(formElements, {
          scale: 0.95,
          opacity: 0,
          y: 20,
          stagger: 0.08,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id='contact' 
      ref={sectionRef} 
      className="bg-white py-24 px-6 md:px-12 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background Kinetic Text */}
      <div 
        className="absolute top-10 left-0 text-[15vw] font-black text-[#142c4c]/5 whitespace-nowrap select-none pointer-events-none tracking-wider monda-swapnil will-change-transform"
        aria-hidden="true"
      >
        Build with us
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 overflow-hidden">
          <h2 
            id="contact-heading"
            ref={headingRef} 
            className="text-5xl md:text-8xl font-black text-[#142c4c] italic leading-none tracking-wider monda-swapnil"
          >
            Let’s Build Your <br />
            <span className="text-[#0098d4] drop-shadow-sm">Vision.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 font-chillax">
          
          {/* Left Side: Contact Info */}
          <div ref={infoRef} className="space-y-12">
            <address className="not-italic space-y-12">
              <div className="group cursor-pointer">
                <div className="flex items-center gap-4 text-[#142c4c]/60 mb-2 uppercase font-black text-sm tracking-widest">
                  <Mail size={18} aria-hidden="true" /> Email Support
                </div>
                <a href="mailto:hello@brick2tech.com" className="text-2xl md:text-4xl text-[#142c4c] font-bold block group-hover:translate-x-3 transition-transform duration-300">
                  hello@brick2tech.com
                </a>
              </div>

              <div className="group cursor-pointer">
                <div className="flex items-center gap-4 text-[#142c4c]/60 mb-2 uppercase font-black text-sm tracking-widest">
                  <Phone size={18} aria-hidden="true" /> Quick Call
                </div>
                <a href="tel:+919000035647" className="text-2xl md:text-4xl text-[#142c4c] font-bold block group-hover:translate-x-3 transition-transform duration-300">
                  +91 90000 35647
                </a>
              </div>

              <div className="group">
                <div className="flex items-center gap-4 text-[#142c4c]/60 mb-2 uppercase font-black text-sm tracking-widest">
                  <MapPin size={18} aria-hidden="true" /> Our Base
                </div>
                <p className="text-xl text-[#142c4c]/80 max-w-xs leading-relaxed">
                  MIG-6, Sunrise Residency 202, <br />
                  Manikonda, Hyderabad
                </p>
              </div>
            </address>
          </div>

          {/* Right Side: Animated Form */}
          <div ref={formRef} className="bg-[#142c4c] p-8 md:p-12 rounded-[40px] shadow-2xl relative">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-brick">
                  <label htmlFor="name" className="block text-[#c2e8ff] font-black uppercase text-[10px] mb-2 tracking-widest">Your Name</label>
                  <input 
                    id="name"
                    name="name"
                    type="text" 
                    required
                    className="w-full bg-white/5 border-b-2 border-[#c2e8ff]/30 p-4 text-white outline-none focus:border-[#c2e8ff] focus:bg-white/10 transition-all rounded-xl placeholder:text-white/20" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="form-brick">
                  <label htmlFor="email" className="block text-[#c2e8ff] font-black uppercase text-[10px] mb-2 tracking-widest">Email Address</label>
                  <input 
                    id="email"
                    name="email"
                    type="email" 
                    required
                    className="w-full bg-white/5 border-b-2 border-[#c2e8ff]/30 p-4 text-white outline-none focus:border-[#c2e8ff] focus:bg-white/10 transition-all rounded-xl placeholder:text-white/20" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>

              <div className="form-brick">
                <label htmlFor="project-type" className="block text-[#c2e8ff] font-black uppercase text-[10px] mb-2 tracking-widest">Project Type</label>
                <div className="relative">
                  <select 
                    id="project-type"
                    name="project-type"
                    className="w-full bg-white/5 border-b-2 border-[#c2e8ff]/30 p-4 text-white outline-none focus:border-[#c2e8ff] focus:bg-white/10 transition-all rounded-xl appearance-none cursor-pointer pr-10"
                  >
                    <option value="web-dev" className="text-black">Web Development</option>
                    <option value="app-design" className="text-black">App Design</option>
                    <option value="branding" className="text-black">Branding</option>
                    <option value="consultation" className="text-black">Consultation</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c2e8ff] pointer-events-none" size={18} />
                </div>
              </div>

              <div className="form-brick">
                <label htmlFor="message" className="block text-[#c2e8ff] font-black uppercase text-[10px] mb-2 tracking-widest">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  rows={4} 
                  required
                  className="w-full bg-white/5 border-b-2 border-[#c2e8ff]/30 p-4 text-white outline-none focus:border-[#c2e8ff] focus:bg-white/10 transition-all rounded-xl resize-none placeholder:text-white/20" 
                  placeholder="Tell us about your project..."
                />
              </div>

              <div className="form-brick pt-4">
                <button 
                  type="submit" 
                  className="w-full group bg-[#c2e8ff] text-[#142c4c] py-6 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 overflow-hidden relative outline-none focus-visible:ring-4 focus-visible:ring-[#c2e8ff]/50"
                >
                  <span className="relative z-10 group-hover:-translate-y-20 transition-transform duration-500">Send Inquiry</span>
                  <span className="absolute translate-y-20 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-3" aria-hidden="true">
                    Let's Go <ArrowRight />
                  </span>
                  <div className="absolute inset-0 bg-[#142c4c]/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" aria-hidden="true"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(ContactSection);