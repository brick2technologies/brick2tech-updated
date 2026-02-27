import React, { useEffect, useState, useRef } from "react";
// Removed Link import as we are using standard anchor tags
import SideMenu from "./SideMenu";
import { ArrowUpRight } from "lucide-react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isLogoHovered: boolean;
  scrolled: boolean;
}
interface NavbarProps {
  onContactClick: () => void;
  // onNavigate: (href: string) => void;
}

const NavLink = ({ href, children, isLogoHovered, scrolled }: NavLinkProps) => (
  <a
    href={href}
    className={`group/link relative py-1 px-2 flex items-center whitespace-nowrap transition-all duration-500 
      ${scrolled ? "text-white" : "text-black"} 
      ${isLogoHovered ? "scale-95 opacity-50" : "scale-100 opacity-100"}`}
  >
    <span className="absolute left-0 opacity-0 -translate-x-2 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0">
      →
    </span>
    <span className="transition-transform duration-300 group-hover/link:translate-x-3">
      {children}
    </span>
  </a>
);

const Navbar = ({ onContactClick }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const lastScrollY = useRef(0);

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [menuOpen]);

  // Handle scroll logic for the "Pill" animation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isPastThreshold = currentScrollY > 50;
      setScrolled(isPastThreshold);

      if (currentScrollY < lastScrollY.current && isPastThreshold) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
        setIsExpanded(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showFullPill = isExpanded || isScrollingUp;
  const smoothTransition = "transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]";

  return (
    <>
      {!menuOpen && (
        <header className="fixed top-6 md:top-8 left-0 w-full z-50 flex justify-center px-4 font-chillax">

          {/* --- DESKTOP & TABLET NAVBAR --- */}
          <nav
            className={`hidden md:flex ${smoothTransition} relative items-center justify-between px-6 h-14 overflow-hidden
              ${!scrolled ? "bg-transparent w-full" : showFullPill ? "bg-[#142c4c] backdrop-blur-xl shadow-2xl rounded-2xl w-[900px]" : "bg-[#142c4c] backdrop-blur-xl shadow-lg rounded-3xl w-[160px]"}
            `}
          >
            {/* Left: Menu */}
            <div className={`shrink-0 flex items-center ${smoothTransition} ${scrolled && !showFullPill ? "opacity-0 translate-x-10 pointer-events-none" : "opacity-100 translate-x-0"}`}>
              <button onClick={() => setMenuOpen(true)} className={`group/menu w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-500 shadow-sm ${!scrolled ? "border-black/20 hover:border-black" : "border-white/20 hover:border-white"}`}>
                <div className="flex flex-col gap-1.5 transition-all duration-500 group-hover/menu:gap-1">
                  <span className={`block w-5 h-[1.5px] ${!scrolled ? "bg-black" : "bg-white"}`}></span>
                  <span className={`block w-5 h-[1.5px] ${!scrolled ? "bg-black" : "bg-white"}`}></span>
                </div>
              </button>
            </div>

            {/* Center: Logo & ID Links */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center font-roboto" onMouseEnter={() => scrolled && setIsExpanded(true)}>
              <div className={`flex items-center transition-all duration-700 ${scrolled && !showFullPill ? "opacity-0 scale-50 pointer-events-none" : "opacity-100 scale-100"} ${isLogoHovered ? "gap-2 mr-4" : "gap-8 mr-12"}`}>
                <NavLink href="#services" isLogoHovered={isLogoHovered} scrolled={scrolled}>Services</NavLink>
                <NavLink href="#work" isLogoHovered={isLogoHovered} scrolled={scrolled}>Work</NavLink>
              </div>

              <a href="#hero" className="group/logo relative w-24 h-12 flex items-center justify-center shrink-0 z-50" onMouseEnter={() => setIsLogoHovered(true)} onMouseLeave={() => setIsLogoHovered(false)}>
                <img src="/logo-default.png" alt="Logo" className="absolute h-full w-auto object-contain transition-all duration-700 group-hover/logo:opacity-0" />
                <img src="/logo-hover.png" alt="Logo Hover" className="absolute h-full w-auto object-contain opacity-0 transition-all duration-700 group-hover/logo:opacity-100" />
              </a>

              <div className={`flex items-center transition-all duration-700 ${scrolled && !showFullPill ? "opacity-0 scale-50 pointer-events-none" : "opacity-100 scale-100"} ${isLogoHovered ? "gap-2 ml-4" : "gap-8 ml-12"}`}>
                <NavLink href="#about" isLogoHovered={isLogoHovered} scrolled={scrolled}>About</NavLink>
                <NavLink href="#contact" isLogoHovered={isLogoHovered} scrolled={scrolled}>Contact</NavLink>
              </div>
            </div>

            {/* Right: CTA */}
            <div className={`shrink-0 flex items-center ${smoothTransition} ${scrolled && !showFullPill ? "opacity-0 -translate-x-10 pointer-events-none" : "opacity-100 translate-x-0"}`}>
              <button
                onClick={onContactClick}

                className={`group relative h-10 px-6 flex items-center gap-2 justify-center rounded-xl text-sm uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg 
                ${!scrolled ? "bg-[#142c4c] text-white" : "bg-white text-[#142c4c]"}`}
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1">Reach Us</span>
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </nav>

          {/* --- MOBILE NAVBAR --- */}
          <nav
            onClick={() => { if (scrolled && !showFullPill) setMenuOpen(true); }}
            className={`md:hidden ${smoothTransition} relative flex items-center mx-auto will-change-all
              ${!scrolled
                ? "bg-transparent w-full justify-between px-4"
                : showFullPill
                  ? "bg-[#142c4c] backdrop-blur-xl shadow-2xl rounded-2xl min-w-[240px] w-auto justify-between px-4 gap-8 h-14 border border-white/10"
                  : "bg-[#142c4c] backdrop-blur-xl shadow-lg text-white rounded-xl w-[140px] justify-center gap-3 px-2 h-14 border border-black/10"
              }
            `}
          >
            <div className="shrink-0 flex items-center z-10">
              <button
                onClick={(e) => { e.stopPropagation(); setMenuOpen(true); }}
                className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-500 active:scale-90
                  ${!scrolled ? "bg-transparent" : "bg-white/10 border border-white/20 shadow-sm"}
                `}
              >
                <div className="flex flex-col gap-1.5">
                  <span className={`block w-6 h-[2.5px] rounded-full transition-colors duration-500 ${!scrolled ? "bg-black" : "bg-white"}`}></span>
                  <span className={`block w-6 h-[2.5px] rounded-full transition-colors duration-500 ${!scrolled ? "bg-black" : "bg-white"}`}></span>
                </div>
              </button>
            </div>

            <div className="flex items-center justify-center flex-1">
              <a href="#hero" className="flex items-center justify-center">
                <img
                  src={(scrolled && !showFullPill) ? "/logo-hover.png" : "/logo-default.png"}
                  alt="Logo"
                  className="h-10 w-auto object-contain transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                />
              </a>
            </div>

            {showFullPill && <div className="w-11 shrink-0" />}
          </nav>

        </header>
      )}
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar;