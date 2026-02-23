
import { Link } from "react-router-dom";
import { Linkedin, Instagram, Facebook } from "lucide-react";

import AgencyCTA from "./AgencyCTA"; // Import your separate CTA component here

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative">
      {/* --- INTEGRATED CTA COMPONENT --- */}
      {/* This replaces the previous manual section */}
      <AgencyCTA />

      {/* --- MAIN FOOTER LINKS --- */}
      <div className="bg-[#142c4c]/90 text-white pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            {/* Brand Column */}
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="inline-block mb-8">
                <img
                  src="/logo-default.png"
                  alt="Logo"
                  className="h-16 w-auto brightness-0 invert"
                />
              </Link>
              <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-xs font-medium">
                Full-service digital marketing agency specializing in high-performance content strategy and brand growth.
              </p>
              <div className="flex gap-5">
                {[
                  { icon: <Facebook size={16} />, link: "https://twitter.com" },
                  { icon: <Linkedin size={16} />, link: "https://linkedin.com" },
                  { icon: <Instagram size={16} />, link: "https://instagram.com" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 hover:bg-white hover:text-[#142c4c] transition-all"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

            </div>

            {/* Layout Spacer */}
            <div className="hidden md:block"></div>

            {/* Services Column */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white/30 mb-10">What We Do</h4>
              <ul className="space-y-5 text-sm text-white/70">
                <li><Link to="/seo" className="hover:text-white transition-colors">Digital Marketing</Link></li>
                <li><Link to="/content" className="hover:text-white transition-colors">Web Development</Link></li>
                <li><Link to="/ads" className="hover:text-white transition-colors">Graphic Design</Link></li>
                
              </ul>
            </div>

            {/* Agency Column */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white/30 mb-10">Agency</h4>
              <ul className="space-y-5 text-sm text-white/70">
                <li><Link to="/work" className="hover:text-white transition-colors">Our Work</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li className="pt-6 text-xs text-white/40 leading-relaxed uppercase tracking-widest">
                  MIG-6, Sunrise Residency 202,<br />
                  Manikonda, Hyderabad
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/10 text-[10px] uppercase tracking-[0.25em] text-white/20 font-bold">
            <p>©{currentYear} BRICK2TECH. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-10 mt-6 md:mt-0">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;