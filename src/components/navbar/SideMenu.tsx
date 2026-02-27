import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, Youtube, Facebook, Instagram, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { x: -20, opacity: 0 },
  show: { 
    x: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  },
};

const SideMenu = ({ isOpen, onClose }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Helper to handle link clicks: close menu then navigate
  const handleLinkClick = () => {
    onClose();
  };

  const panelVariants: Variants = {
    hidden: { 
      x: isMobile ? 0 : "-110%", 
      y: isMobile ? "-110%" : 0, 
      scale: 0.95, 
      opacity: 0 
    },
    show: { 
      x: 0, 
      y: 0, 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", damping: 25, stiffness: 200 }
    },
    exit: { 
      x: isMobile ? 0 : "-110%", 
      y: isMobile ? "-110%" : 0, 
      scale: 0.9, 
      opacity: 0,
      transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] }
    }
  };

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const subServices = [
    { name: "Google Ads", href: "#google-ads" },
    { name: "Meta Ads", href: "#meta-ads" },
    { name: "Brand Strategy", href: "#strategy" },
    { name: "Web Development", href: "#web-dev" },
    { name: "Graphic Design", href: "#design" },
    { name: "SEO Optimization", href: "#seo" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[60]"
          />

          {/* Side Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="
              fixed top-4 left-4 right-4
              md:right-auto md:w-[90%] md:max-w-[420px]
              h-[calc(100vh-2rem)]
              bg-[#f3f4f6]
              rounded-[2.5rem]
              z-[70]
              p-6 md:p-10
              flex flex-col
              shadow-2xl
              border border-white/20 font-chillax
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8 md:mb-12">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm"
              >
                <X size={20} />
              </motion.button>

              <a href="#hero" onClick={handleLinkClick}>
                <motion.img
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  src="/logo-default.png"
                  alt="Logo"
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </a>
              <div className="w-10 md:w-12" />
            </div>

            {/* Navigation Links */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex-1 overflow-y-auto pr-2 scrollbar-hide"
            >
              <div className="space-y-4 mb-10">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={handleLinkClick}
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    className="flex items-center justify-between group cursor-pointer p-2 -ml-2 rounded-2xl hover:bg-white/50 transition-colors duration-300"
                  >
                    <span className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
                      {item.name}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-400 flex items-center justify-center transition-all duration-300 group-hover:bg-black group-hover:text-white">
                      <span className="text-xl">→</span>
                    </div>
                  </motion.a>
                ))}
              </div>

              <motion.div variants={itemVariants} className="border-t border-gray-300 my-8" />

              {/* Sub-services Grid */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-y-4 text-gray-500 font-medium">
                {subServices.map((item) => (
                  <motion.a 
                    key={item.name} 
                    href={item.href}
                    onClick={handleLinkClick}
                    whileHover={{ x: 5, color: "#000" }} 
                    className="flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    <span>{item.name}</span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Footer / Socials */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 bg-white rounded-[2rem] p-4 flex items-center justify-between shadow-sm border border-gray-100"
            >
              <span className="text-[10px] tracking-[0.2em] font-bold text-gray-400 ml-2">FOLLOW US</span>
              <div className="flex gap-2">
                {[Youtube, Instagram, Facebook, Twitter].map((Icon, idx) => (
                  <motion.a 
                    href="#" 
                    key={idx} 
                    whileHover={{ y: -3 }} 
                    className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-gray-600"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideMenu;