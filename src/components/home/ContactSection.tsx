import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!infoRef.current || !formRef.current || !headingRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Heading Reveal
      gsap.from(headingRef.current, {
        y: 100,
        opacity: 0,
        skewY: 7,
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 90%",
        }
      });

      // 2. Info Blocks Stacking
      const infoItems = infoRef.current?.children;
      if (infoItems) {
        gsap.from(infoItems, {
          x: -50,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%",
          }
        });
      }

      // 3. Form Assembly
      const formElements = formRef.current?.querySelectorAll('.form-brick');
      if (formElements && formElements.length > 0) {
        gsap.from(formElements, {
          scale: 0.8,
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.6,
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
    <section ref={sectionRef} className="bg-[#c2e8ff] py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Kinetic Text - Swapped to Navy with low opacity */}
      <div className="absolute top-10 left-0 text-[15vw] font-black text-[#142c4c]/5 whitespace-nowrap select-none pointer-events-none uppercase italic font-anokha">
        Build with us
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 overflow-hidden">
          <h2 ref={headingRef} className="text-5xl md:text-8xl font-black text-[#142c4c] uppercase italic leading-none tracking-tighter font-anokha">
            Let’s Build Your <br />
            <span className="text-white drop-shadow-sm">Vision.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 font-chillax">
          
          {/* Left Side: Contact Info (Now Navy) */}
          <div ref={infoRef} className="space-y-12">
            <div className="group cursor-pointer">
              <div className="flex items-center gap-4 text-[#142c4c]/60 mb-2 uppercase font-black text-sm tracking-widest">
                <Mail size={18} /> Email Support
              </div>
              <p className="text-2xl md:text-4xl text-[#142c4c] font-bold group-hover:translate-x-3 transition-transform duration-300">
                hello@brick2tech.com
              </p>
            </div>

            <div className="group cursor-pointer">
              <div className="flex items-center gap-4 text-[#142c4c]/60 mb-2 uppercase font-black text-sm tracking-widest">
                <Phone size={18} /> Quick Call
              </div>
              <p className="text-2xl md:text-4xl text-[#142c4c] font-bold group-hover:translate-x-3 transition-transform duration-300">
                +1 (555) 000-TECH
              </p>
            </div>

            <div className="group cursor-pointer">
              <div className="flex items-center gap-4 text-[#142c4c]/60 mb-2 uppercase font-black text-sm tracking-widest">
                <MapPin size={18} /> Our Base
              </div>
              <p className="text-xl text-[#142c4c]/80 max-w-xs leading-relaxed">
                123 Innovation Street, <br />
                Silicon Valley, CA 94025
              </p>
            </div>
          </div>

          {/* Right Side: Animated Form (Now Navy) */}
          <div ref={formRef} className="bg-[#142c4c] p-8 md:p-12 rounded-[40px] shadow-2xl relative">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-brick">
                  <label className="block text-[#c2e8ff] font-black uppercase text-[10px] mb-2 tracking-widest">Your Name</label>
                  <input type="text" className="w-full bg-white/5 border-b-2 border-[#c2e8ff]/30 p-4 text-white outline-none focus:border-[#c2e8ff] focus:bg-white/10 transition-all rounded-xl placeholder:text-white/20" placeholder="John Doe" />
                </div>
                <div className="form-brick">
                  <label className="block text-[#c2e8ff] font-black uppercase text-[10px] mb-2 tracking-widest">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border-b-2 border-[#c2e8ff]/30 p-4 text-white outline-none focus:border-[#c2e8ff] focus:bg-white/10 transition-all rounded-xl placeholder:text-white/20" placeholder="john@example.com" />
                </div>
              </div>

              <div className="form-brick">
                <label className="block text-[#c2e8ff] font-black uppercase text-[10px] mb-2 tracking-widest">Project Type</label>
                <div className="relative">
                  <select className="w-full bg-white/5 border-b-2 border-[#c2e8ff]/30 p-4 text-white outline-none focus:border-[#c2e8ff] focus:bg-white/10 transition-all rounded-xl appearance-none cursor-pointer">
                    <option className="text-black">Web Development</option>
                    <option className="text-black">App Design</option>
                    <option className="text-black">Branding</option>
                    <option className="text-black">Consultation</option>
                  </select>
                </div>
              </div>

              <div className="form-brick">
                <label className="block text-[#c2e8ff] font-black uppercase text-[10px] mb-2 tracking-widest">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border-b-2 border-[#c2e8ff]/30 p-4 text-white outline-none focus:border-[#c2e8ff] focus:bg-white/10 transition-all rounded-xl resize-none placeholder:text-white/20" placeholder="Tell us about your project..."></textarea>
              </div>

              <div className="form-brick pt-4">
                <button type="submit" className="w-full group bg-[#c2e8ff] text-[#142c4c] py-6 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 overflow-hidden relative">
                  <span className="relative z-10 group-hover:-translate-y-20 transition-transform duration-500">Send Inquiry</span>
                  <span className="absolute translate-y-20 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-3">
                    Let's Go <ArrowRight />
                  </span>
                  <div className="absolute inset-0 bg-[#142c4c]/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}