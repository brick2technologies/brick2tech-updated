import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";
import { ArrowUpRight } from "lucide-react";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  isLogoHovered: boolean;
}

const NavLink = ({ to, children, isLogoHovered }: NavLinkProps) => (
  <Link
    to={to}
    className={`group/link relative py-1 px-2 flex items-center hover:text-black whitespace-nowrap transition-all duration-500 ${isLogoHovered ? "scale-95 opacity-50" : "scale-100 opacity-100"
      }`}
  >
    <span className="absolute left-0 opacity-0 -translate-x-2 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0">
      →
    </span>
    <span className="transition-transform duration-300 group-hover/link:translate-x-3">
      {children}
    </span>
  </Link>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [menuOpen]);

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

          {/* --- DESKTOP & TABLET NAVBAR (Hidden on Mobile) --- */}
          <nav
            className={`hidden md:flex ${smoothTransition} relative items-center justify-between px-6 h-14 overflow-hidden
              ${!scrolled ? "bg-transparent w-full" : showFullPill ? "bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl w-[900px]" : "bg-white/80 backdrop-blur-xl shadow-lg rounded-3xl w-[160px]"}
            `}
          >
            {/* Left: Menu */}
            <div className={`shrink-0 flex items-center ${smoothTransition} ${scrolled && !showFullPill ? "opacity-0 translate-x-10 pointer-events-none" : "opacity-100 translate-x-0"}`}>
              <button onClick={() => setMenuOpen(true)} className="group/menu w-10 h-10 flex items-center justify-center rounded-xl border border-gray-300 hover:border-black transition-all duration-500 shadow-sm">
                <div className="flex flex-col gap-1.5 transition-all duration-500 group-hover/menu:gap-1">
                  <span className="block w-5 h-[1.5px] bg-black"></span>
                  <span className="block w-5 h-[1.5px] bg-black"></span>
                </div>
              </button>
            </div>

            {/* Center: Logo & Links */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center" onMouseEnter={() => scrolled && setIsExpanded(true)}>
              <div className={`flex items-center transition-all duration-700 ${scrolled && !showFullPill ? "opacity-0 scale-50 pointer-events-none" : "opacity-100 scale-100"} ${isLogoHovered ? "gap-2 mr-4" : "gap-8 mr-12"}`}>
                <NavLink to="/services" isLogoHovered={isLogoHovered}>Services</NavLink>
                <NavLink to="/work" isLogoHovered={isLogoHovered}>Work</NavLink>
              </div>
              <Link to="/" className="group/logo relative w-24 h-12 flex items-center justify-center shrink-0 z-50" onMouseEnter={() => setIsLogoHovered(true)} onMouseLeave={() => setIsLogoHovered(false)}>
                <img src="/logo-default.png" alt="Logo" className="absolute h-full w-auto object-contain transition-all duration-700 group-hover/logo:opacity-0" />
                <img src="/logo-hover.png" alt="Logo Hover" className="absolute h-full w-auto object-contain opacity-0 transition-all duration-700 group-hover/logo:opacity-100" />
              </Link>
              <div className={`flex items-center transition-all duration-700 ${scrolled && !showFullPill ? "opacity-0 scale-50 pointer-events-none" : "opacity-100 scale-100"} ${isLogoHovered ? "gap-2 ml-4" : "gap-8 ml-12"}`}>
                <NavLink to="/about" isLogoHovered={isLogoHovered}>About</NavLink>
                <NavLink to="/contact" isLogoHovered={isLogoHovered}>Contact</NavLink>
              </div>
            </div>

            {/* Right: CTA */}
            <div
  className={`shrink-0 flex items-center ${smoothTransition} ${
    scrolled && !showFullPill
      ? "opacity-0 -translate-x-10 pointer-events-none"
      : "opacity-100 translate-x-0"
  }`}
>
  <Link
    to="/reach-us"
    className="group relative h-10 px-6 flex items-center gap-2 justify-center rounded-xl bg-[#142c4c] text-white text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg"
  >
    <span className="transition-transform duration-300 group-hover:translate-x-1">
      Reach Us
    </span>

    <ArrowUpRight
      size={16}
      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
    />
  </Link>
</div>

          </nav>

          {/* --- MOBILE NAVBAR (Hidden on Desktop) --- */}
          <nav
            onClick={() => { if (scrolled && !showFullPill) setMenuOpen(true); }}
            /* will-change-all ensures the browser prepares for width/color changes */
            className={`md:hidden ${smoothTransition} relative flex items-center mx-auto will-change-all
    ${!scrolled
                ? "bg-transparent w-full justify-between px-4 border-transparent"
                : showFullPill
                  ? "bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl min-w-[240px] w-auto justify-between px-4 gap-8 h-14 border border-black/10"
                  : "bg-white/90 backdrop-blur-xl shadow-lg rounded-xl w-[140px] justify-center gap-3 px-2 h-14 border border-black/10"
              }
  `}
          >
            {/* Menu Icon Container */}
            <div className="shrink-0 flex items-center z-10">
              <button
                onClick={(e) => { e.stopPropagation(); setMenuOpen(true); }}
                /* border-transparent on the button helps it blend in when the nav is transparent */
                className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-500 active:scale-90
        ${!scrolled ? "bg-transparent border-transparent" : "bg-white border border-gray-200 shadow-sm"}
      `}
              >
                <div className="flex flex-col gap-1.5">
                  {/* Thicker lines: 2.5px */}
                  <span className={`block w-6 h-[2.5px] rounded-full transition-colors duration-500 ${!scrolled ? "bg-white" : "bg-black"}`}></span>
                  <span className={`block w-6 h-[2.5px] rounded-full transition-colors duration-500 ${!scrolled ? "bg-white" : "bg-black"}`}></span>
                </div>
              </button>
            </div>

            {/* Logo Container */}
            <div className="flex items-center justify-center flex-1">
              <Link to="/" className="flex items-center justify-center">
                <img
                  src={(scrolled && !showFullPill) ? "/logo-hover.png" : "/logo-default.png"}
                  alt="Logo"
                  /* Added transition-all and a cubic-bezier for the logo swap itself */
                  className="h-10 w-auto object-contain transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                />
              </Link>
            </div>

            {/* Symmetrical Spacer */}
            {showFullPill && <div className="w-11 shrink-0" />}
          </nav>

        </header>
      )}
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar;