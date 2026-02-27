import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "./types";
import ServiceItem from "./ServiceItem";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // gsap.context handles automatic cleanup of ScrollTriggers
    // preventing memory leaks and animation glitches on re-renders
    const ctx = gsap.context(() => {
      if (sectionTitleRef.current) {
        gsap.fromTo(
          sectionTitleRef.current,
          { 
            y: 100, 
            opacity: 0, 
            rotate: 2 
          },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionTitleRef.current,
              start: "top 90%",
              toggleActions: "play none none none", // Ensures animation only runs once for performance
            },
          }
        );
      }
    }, sectionRef); // Scope the context to the section

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="w-full bg-white overflow-x-hidden"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 overflow-hidden text-center">
        <h2
          id="services-heading"
          ref={sectionTitleRef}
          className="text-5xl md:text-8xl font-semibold text-[#142c4c] tracking-wider monda-swapnil will-change-transform"
        >
          we are <span className="text-[#0098d4]">experts</span> in
        </h2>
      </div>

      {/* Service list container */}
      <div className="flex flex-col gap-0" role="list">
        {services.map((service, index) => (
          <div key={index} role="listitem">
            <ServiceItem service={service} />
          </div>
        ))}
      </div>
    </section>
  );
}