import { motion } from "framer-motion";
import CTABG from "../../assets/cta-bg.svg";


const AgencyCTA = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 px-6 flex justify-center items-center min-h-[600px] md:min-h-[800px] bg-white">
      
      {/* --- BACKGROUND IMAGE LAYER --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src={CTABG}
          alt="Background Gradient"
          className="w-full h-full object-cover"
        />
        {/* Optional: Add a small overlay if you need to adjust image contrast */}
        <div className="absolute inset-0 bg-[#c2e8ff]/10" />
      </div>

      {/* --- CONTENT --- */}
      <div className="max-w-4xl w-full text-center relative z-20">
        
        <motion.p 
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-[10px] md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-[#142c4c]/50 mb-6 md:mb-8"
        >
          Elevate Your Presence
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#142c4c] mb-6 md:mb-8 leading-[1.1] tracking-wider monda-swapnil"
        >
          Discover a new dawn <br className="hidden md:block" /> for your content.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-base md:text-xl text-[#142c4c]/70 mb-10 md:mb-12 max-w-lg mx-auto leading-relaxed px-4 font-chillax"
        >
          Scale your content strategy with a data-driven approach 
          that captures attention and drives growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-4 md:px-6 py-2 bg-white text-[#142c4c] rounded-xl font-bold text-base md:text-lg shadow-xl hover:shadow-2xl transition-all font-roboto"
          >
            Get started
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default AgencyCTA;





// import { motion } from "framer-motion";

// const AgencyCTA = () => {
//   return (
//     <section className="relative overflow-hidden py-32 px-6 md:px-12 flex justify-center items-center min-h-[750px] bg-[#c2e8ff]">

//       {/* --- MESH INTEGRATION LAYER --- */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">

//         {/* 1. TOP SHIELD - Solid #c2e8ff to blend with section above */}
//         <div className="absolute top-0 left-0 w-full h-[20%] bg-[#c2e8ff] z-10" />
//         <div className="absolute top-[20%] left-0 w-full h-[20%] bg-gradient-to-b from-[#c2e8ff] to-transparent z-10" />

//         {/* 2. BOTTOM SHIELD - Solid #142c4c to blend with Footer below */}
//         <div className="absolute bottom-0 left-0 w-full h-[20%] bg-[#142c4c] z-10" />
//         <div className="absolute bottom-[20%] left-0 w-full h-[25%] bg-gradient-to-t from-[#142c4c] via-[#142c4c]/80 to-transparent z-10" />

//         {/* 3. THE MESH CORE - The "Bleed" area */}
//         <div className="absolute inset-0 z-0">
//           {/* Main Glow */}
//           <div
//             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[100%] rounded-[100%] blur-[120px] opacity-60"
//             style={{
//               background: `radial-gradient(circle, #ffffff 0%, #7baee1 30%, #1e6697 60%, #142c4c 100%)`
//             }}
//           />

//           {/* Lavender Accent to prevent it from looking too flat blue */}
//           <div
//             className="absolute top-[30%] right-[5%] w-[40%] h-[40%] rounded-full blur-[100px] opacity-40"
//             style={{ background: '#cad3f0' }}
//           />

//           {/* Deep Navy Pulse at the bottom of the mesh */}
//           <div
//             className="absolute bottom-[30%] left-[10%] w-[50%] h-[40%] rounded-full blur-[110px] opacity-30"
//             style={{ background: '#1a3e64' }}
//           />
//         </div>
//       </div>

//       {/* --- CONTENT --- */}
//       {/* --- CONTENT --- */}
// <div className="max-w-4xl w-full text-center relative z-20">

//   <motion.p 
//     initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
//     whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//     transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
//     viewport={{ once: true }}
//     className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold text-[#142c4c]/40 mb-8"
//   >
//     Elevate Your Presence
//   </motion.p>

//   <motion.h2
//   initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
//   whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//   transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
//   viewport={{ once: false, amount: 0.4 }}
//   className="text-5xl md:text-7xl font-bold text-[#142c4c] mb-8 leading-[1.1] tracking-tighter font-anokha"
// >

//     Discover a new dawn <br /> for your content.
//   </motion.h2>

//   <motion.p 
//     initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
//     whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//     transition={{ duration: 1.3, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
//     viewport={{ once: true }}
//     className="text-lg md:text-xl text-[#142c4c]/60 mb-12 max-w-xl mx-auto leading-relaxed"
//   >
//     Scale your content strategy with a data-driven approach 
//     that captures attention and drives growth.
//   </motion.p>

//   <motion.div
//     initial={{ opacity: 0, y: 60 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
//     viewport={{ once: true }}
//     className="flex justify-center"
//   >
//     <motion.button
//       whileHover={{ y: -4, scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       className="px-12 py-4 bg-white text-[#142c4c] rounded-full font-bold text-lg shadow-2xl transition-all"
//     >
//       Get started
//     </motion.button>
//   </motion.div>

// </div>

//     </section>
//   );
// };

// export default AgencyCTA;