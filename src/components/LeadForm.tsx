import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadModal = ({ isOpen, onClose }: LeadModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const services = [
    "Google Ads", "Meta Ads", "Strategy", 
    "Web Dev", "Design", "SEO"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 400, staggerChildren: 0.05 }
    },
    exit: { opacity: 0, y: 50 }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }
  return () => { document.body.style.overflow = "unset"; };
}, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#142c4c]/30 backdrop-blur-md z-[100]"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-md bg-white md:rounded-[2.5rem] rounded-t-[2.5rem] shadow-2xl z-[101] overflow-hidden font-chillax"
          >
            <div className="p-8 md:p-10 relative">
              <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-300 hover:text-[#142c4c] transition-colors">
                <X size={20} />
              </button>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div key="form" className="space-y-8">
                    <motion.div variants={itemVariants}>
                      <h2 className="text-3xl font-bold text-[#142c4c] tracking-tight">
                        Start a <span className="text-[#0098d4]">Project</span>
                      </h2>
                    </motion.div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                      {/* Compact Inputs */}
                      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                        <div className="group border-b border-gray-100 focus-within:border-[#0098d4] transition-all">
                          <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Name</label>
                          <input required type="text" className="w-full bg-transparent pb-2 text-sm text-[#142c4c] outline-none" placeholder="Required" />
                        </div>
                        <div className="group border-b border-gray-100 focus-within:border-[#0098d4] transition-all">
                          <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Phone</label>
                          <input required type="tel" className="w-full bg-transparent pb-2 text-sm text-[#142c4c] outline-none" placeholder="Optional" />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants} className="group border-b border-gray-100 focus-within:border-[#0098d4] transition-all">
                        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Work Email</label>
                        <input required type="email" className="w-full bg-transparent pb-2 text-sm text-[#142c4c] outline-none" placeholder="email@company.com" />
                      </motion.div>

                      {/* Custom Modern Radio Grid */}
                      <motion.div variants={itemVariants} className="space-y-3">
                        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Select Service</label>
                        <div className="grid grid-cols-3 gap-2">
                          {services.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setSelectedService(s)}
                              className={`py-2 px-1 text-[11px] font-medium rounded-lg border transition-all duration-300 ${
                                selectedService === s 
                                ? "bg-[#142c4c] text-white border-[#142c4c]" 
                                : "bg-gray-50 text-gray-500 border-gray-100 hover:border-gray-300"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </motion.div>

                      <motion.button 
                        variants={itemVariants}
                        whileTap={{ scale: 0.97 }}
                        type="submit" 
                        className="w-full bg-[#142c4c] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg shadow-[#142c4c]/10"
                      >
                        Submit Request
                        <ArrowRight size={16} className="text-[#0098d4]" />
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-12 text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#142c4c]">Thank You.</h3>
                    <p className="text-gray-400 text-sm">Our strategist will contact you shortly.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeadModal;