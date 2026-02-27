import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import type { Service } from "./types";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceItem({ service }: { service: Service }) {
  const itemContainerRef = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const textSideRef = useRef<HTMLDivElement | null>(null);
  const revealContentRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);

  const [activeSub, setActiveSub] = useState<string | null>(null);

  // Memoize static content to prevent re-parsing
  const subServiceDetails: Record<string, string> = useMemo(() => ({
    "Social Media": "Drive engagement and brand loyalty with platform-specific content strategies and community management.",
    "Pay Per Click": "Immediate results through precision-targeted search and display advertising that converts.",
    "SEO": "Long-term organic growth driven by technical excellence and authority-building content.",
    "Ads Campaigns": "Comprehensive multi-channel ad management designed to scale your brand reach rapidly.",
    "Brochure Design": "Tactile marketing assets that leave a lasting impression of quality and professionalism.",
    "Logo Design": "Iconic visual identities that capture your brand's essence in a single, scalable mark.",
    "Branding": "A complete visual and verbal ecosystem that defines how the world perceives your business.",
    "Web Apps": "High-performance, interactive digital products built with scalable modern architectures.",
    "Website Design": "Immersive digital experiences that blend aesthetic beauty with seamless user journeys."
  }), []);

  // 1. Main Scroll Animation (Using matchMedia for better responsiveness)
  useEffect(() => {
    if (!itemContainerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isDesktop } = context.conditions as { isDesktop: boolean };
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: itemContainerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          onToggle: (self) => !self.isActive && setActiveSub(null), // Reset on leave
        },
      });

      if (!isDesktop) {
        tl.to(imageWrapperRef.current, { height: "96%", width: "96%", left: "2%", top: "2%", borderRadius: "24px" }, 0)
          .to(textSideRef.current, { opacity: 0, y: -100, filter: "blur(10px)" }, 0);
      } else {
        tl.to(imageWrapperRef.current, { width: "96%", left: "2%", borderRadius: "40px" }, 0)
          .to(textSideRef.current, { opacity: 0, x: -100, filter: "blur(10px)" }, 0);
      }

      if (imageRef.current) tl.to(imageRef.current, { scale: 1.15 }, 0);
      tl.fromTo(revealContentRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, "-=0.5");
    });

    return () => mm.revert();
  }, []);

  // 2. Parallel Sub-Service Transition
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const tl = gsap.timeline({ defaults: { duration: 0.7, ease: "power4.inOut" } });

    if (activeSub) {
      if (isMobile) {
        tl.to(leftColRef.current, { y: -80, scale: 0.8, opacity: 1 }, 0);
        tl.fromTo(rightColRef.current, { autoAlpha: 0, y: 100 }, { autoAlpha: 1, y: 0 }, 0);
      } else {
        tl.to(leftColRef.current, { xPercent: -25, scale: 0.7, opacity: 1 }, 0);
        tl.fromTo(rightColRef.current, { autoAlpha: 0, x: 100 }, { autoAlpha: 1, x: 0 }, 0);
      }
    } else {
      tl.to(leftColRef.current, { xPercent: 0, y: 0, scale: 1, opacity: 1 }, 0);
      tl.to(rightColRef.current, { autoAlpha: 0, x: isMobile ? 0 : 50, y: isMobile ? 50 : 0 }, 0);
    }

    return () => { tl.kill(); };
  }, [activeSub]);

  return (
    <div ref={itemContainerRef} className="relative h-screen w-full overflow-hidden bg-white" role="region" aria-label={service.title}>

      {/* 1. BACKGROUND SCROLL TEXT */}
      <div ref={textSideRef} className="absolute z-10 flex flex-col items-center text-center px-6 w-full top-[15%] md:w-1/2 md:right-0 md:top-0 md:h-full md:px-12 md:justify-center will-change-transform">
        <h3 className="text-4xl md:text-8xl font-semibold text-[#142c4c] monda-swapnil tracking-wider">
          {service.title}
        </h3>
        <p className="mt-6 text-gray-400 text-lg md:text-xl font-light max-w-sm font-roboto italic">
          {service.description}
        </p>
      </div>

      {/* 2. THE EXPANDING CARD */}
      <div ref={imageWrapperRef} className="absolute z-20 overflow-hidden bg-[#0a0a0a] w-[85%] left-[7.5%] bottom-10 h-[45%] rounded-[40px] md:w-[45%] md:left-6 md:top-[5vh] md:h-[90vh] md:rounded-[60px] shadow-2xl will-change-[width,left,height,top]">
        <img 
          ref={imageRef} 
          src={service.image} 
          className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none" 
          alt="" // Decorative since the title is in the H4
          loading="lazy" 
        />

        {/* 3. INTERACTIVE OVERLAY */}
        <div className="absolute inset-0 z-30 flex items-center justify-center p-6 md:p-20">
          <div className="relative w-full max-w-7xl flex flex-col md:flex-row items-center justify-center h-full">

            {/* LEFT SIDE (Main Content) */}
            <div ref={leftColRef} className="flex flex-col items-center text-center w-full z-10 will-change-transform">
              <div ref={revealContentRef} className="w-full">
                <h4 className="text-4xl md:text-[7vw] font-black text-white monda-swapnil leading-[0.9] tracking-wider mb-8 md:mb-12">
                  {service.title}
                </h4>

                <div className="flex flex-wrap gap-2 md:gap-4 justify-center" role="group" aria-label="Sub-services">
                  {service.subServices.map((item, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSub(activeSub === item ? null : item);
                      }}
                      aria-expanded={activeSub === item}
                      className={`px-4 py-2 md:px-10 md:py-4 border rounded-xl text-[10px] md:text-xl font-semibold transition-all duration-300 uppercase outline-none focus-visible:ring-2 focus-visible:ring-[#0098d4] ${activeSub === item
                          ? "bg-[#0098d4] border-[#0098d4] text-white scale-110"
                          : "bg-white/10 text-white border-white/20 hover:bg-white hover:text-black"
                        }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE (Details) */}
            <div
              ref={rightColRef}
              aria-hidden={!activeSub}
              className="absolute invisible opacity-0 bottom-4 md:bottom-auto md:right-0 w-[94%] md:w-[45%] text-white text-left 
                flex flex-col justify-center p-6 md:p-14 
                bg-white/[0.08] backdrop-blur-[40px] border-2 border-white/20 
                rounded-[2.5rem] md:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] will-change-[transform,opacity]"
            >
              <div className="space-y-4 md:space-y-6 px-2 md:px-0">
                <div className="space-y-1 md:space-y-2">
                  <span className="text-[#0098d4] font-black tracking-[0.4em] uppercase text-[9px] md:text-xs">
                    Expertise / {service.title}
                  </span>
                  <div className="h-1 w-12 md:w-16 bg-[#0098d4] rounded-full" />
                </div>

                <h5 className="text-2xl md:text-6xl font-bold text-white monda-swapnil tracking-wide leading-tight">
                  {activeSub}
                </h5>

                <p className="text-white/90 text-xs md:text-xl font-light leading-snug md:leading-relaxed max-w-md">
                  {activeSub ? subServiceDetails[activeSub] : ""}
                </p>

                <button
                  onClick={() => setActiveSub(null)}
                  className="group inline-flex items-center gap-4 text-white hover:text-[#0098d4] transition-all uppercase text-[10px] md:text-sm font-bold tracking-widest pt-2 md:pt-6 outline-none focus-visible:underline"
                >
                  <div className="relative flex items-center">
                    <span className="w-8 md:w-10 h-[1px] bg-white group-hover:bg-[#0098d4] group-hover:w-16 transition-all duration-500"></span>
                  </div>
                  Back
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}