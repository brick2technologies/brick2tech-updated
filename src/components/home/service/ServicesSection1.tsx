import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// --- Types ---
type Service = {
  title: string;
  image: string;
  description: string; // Added separate description
  subServices: string[];
};

const services: Service[] = [
  {
    title: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
    description: "Accelerating your online growth through data-driven strategies and creative campaigns.",
    subServices: ["Social Media", "Pay Per Click", "SEO", "Ads Campaigns"],
  },
  {
    title: "Graphic Design",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=2070",
    description: "Crafting visual identities that tell your brand's unique story through modern aesthetics.",
    subServices: ["Brochure Design", "Logo Design", "Poster Design", "Branding"],
  },
  {
    title: "Web Development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072",
    description: "Building high-performance, scalable web applications with cutting-edge technologies.",
    subServices: ["Web Apps", "Landing Pages", "E-commerce", "website design "],
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionTitleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const titleChars = sectionTitleRef.current;
    if (titleChars) {
      gsap.fromTo(
        titleChars,
        { y: 100, opacity: 0, rotate: 2 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: titleChars,
            start: "top 90%",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-white overflow-x-hidden">
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 overflow-hidden text-center">
        <h2
          ref={sectionTitleRef}
          className="text-5xl md:text-8xl font-semibold text-[#142c4c] tracking-wider monda-swapnil"
        >
          we are <span className="text-[#0098d4]">experts</span> in
        </h2>
      </div>

      {/* SERVICES LIST */}
      <div className="flex flex-col gap-0">
        {services.map((service, index) => (
          <ServiceItem key={index} service={service} />
        ))}
      </div>
      
      {/* <div className="h-[10vh]" /> */}
    </section>
  );
}

function ServiceItem({ service }: { service: Service }) {
  const itemContainerRef = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const textSideRef = useRef<HTMLDivElement | null>(null);
  const revealContentRef = useRef<HTMLDivElement | null>(null);
  const tagsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!itemContainerRef.current || !imageWrapperRef.current || !revealContentRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: itemContainerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // 1. BASE ANIMATION: Image Card Expansion
      if (isMobile) {
        tl.to(imageWrapperRef.current, {
          height: "96%",
          width: "96%",
          left: "2%",
          top: "2%",
          borderRadius: "30px",
          ease: "power2.inOut",
        })
        .to(textSideRef.current, { 
          opacity: 0, 
          y: -100, 
          filter: "blur(10px)", 
          ease: "power2.in" 
        }, 0);
      } else {
        tl.to(imageWrapperRef.current, {
          width: "96%",
          left: "2%",
          borderRadius: "40px",
          ease: "power3.inOut",
        })
        .to(textSideRef.current, { 
          opacity: 0, 
          x: -100, 
          filter: "blur(10px)", 
          ease: "power2.in" 
        }, 0);
      }

      // 2. Parallax
      if (imageRef.current) {
        tl.to(imageRef.current, { scale: 1.15, ease: "none" }, 0);
      }

      // 3. CINEMATIC CONTENT REVEAL
      const titleElement = revealContentRef.current?.querySelector('h4');
      
      if (titleElement) {
        tl.fromTo(titleElement,
          { 
            opacity: 0, 
            y: 120, 
            skewY: 7,
            clipPath: "inset(100% 0% 0% 0%)" 
          },
          { 
            opacity: 1, 
            y: 0, 
            skewY: 0, 
            clipPath: "inset(0% 0% 0% 0%)", 
            duration: 1.2, 
            ease: "expo.out" 
          },
          "-=0.5"
        );
      }

      // Tags Stagger
      if (tagsRef.current && tagsRef.current.children.length > 0) {
        tl.fromTo(
          Array.from(tagsRef.current.children),
          { 
            opacity: 0, 
            scale: 0.4, 
            y: 40, 
            rotate: 10 
          },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            rotate: 0,
            stagger: 0.08, 
            duration: 0.8, 
            ease: "back.out(2)" 
          },
          "-=0.8" 
        );
      }
    }, itemContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={itemContainerRef} className="relative h-screen w-full overflow-hidden bg-white">
      
      {/* 1. INITIAL TEXT SIDE (Dynamic Description) */}
      <div
        ref={textSideRef}
        className="absolute z-10 flex flex-col items-center text-center px-6 w-full top-[15%] md:w-1/2 md:right-0 md:top-0 md:h-full md:px-12 md:justify-center"
      >
        <h3 className="text-4xl md:text-7xl font-bold text-[#142c4c] tracking-wider  monda-swapnil">
          {service.title}
        </h3>
        {/* Render separate description here */}
        <p className="mt-6 md:mt-8 text-gray-700/80 text-lg md:text-xl font-light max-w-sm leading-relaxed font-chillax">
          {service.description}
        </p>
        <p className="mt-4 text-xs md:text-sm font-bold uppercase tracking-widest text-[#142c4c]/40">
          Scroll to explore
        </p>
      </div>

      {/* 2. EXPANDING IMAGE SIDE */}
      <div
        ref={imageWrapperRef}
        className="absolute z-20 overflow-hidden  bg-gray-200 w-[85%] left-[7.5%] bottom-10 h-[45%] rounded-[40px] md:w-[45%] md:left-6 md:top-[5vh] md:h-[90vh] md:rounded-[60px]"
      >
        <img
          ref={imageRef}
          src={service.image}
          alt={service.title}
          className="w-full h-full md:w-[110vw] object-cover scale-100"
        />

        {/* 3. OVERLAY CONTENT (Tags) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/70 to-black/90 flex flex-col items-center justify-center text-white p-6 md:p-12">
          <div ref={revealContentRef} className="text-center w-full">
            <h4 className="text-6xl md:text-[10vw] font-black mb-8 md:mb-14 tracking-wider italic leading-[0.9] monda-swapnil">
              {service.title}
            </h4>

            <div ref={tagsRef} className="flex flex-wrap justify-center gap-3 md:gap-6 max-w-5xl mx-auto">
              {service.subServices.map((item, i) => (
                <span
                  key={i}
                  className="px-6 py-3 md:px-12 md:py-5 border border-white/20 rounded-full text-sm md:text-3xl font-medium backdrop-blur-3xl bg-white/10 hover:bg-white hover:text-black transition-all duration-500 cursor-default uppercase font-chillax"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}