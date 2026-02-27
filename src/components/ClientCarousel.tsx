import { motion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface Logo {
  name: string;
  logo: string;
}

interface InfiniteClientsProps {
  logos: Logo[];
}

export default function InfiniteClients({ logos }: InfiniteClientsProps) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const speedFactor = useTransform(
    smoothVelocity,
    [-3000, 0, 3000],
    [3, 1, 3]
  );

  const [duration, setDuration] = useState(30);

  useEffect(() => {
    const unsubscribe = speedFactor.on("change", (v) => {
      setDuration(30 / Math.abs(v || 1));
    });

    return () => unsubscribe();
  }, [speedFactor]);

  return (
    <div className="py-12 overflow-hidden relative z-20">

      {/* Side fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#ffffff] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#ffffff] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-20 md:gap-32 items-center w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration,
          ease: "linear",
        }}
      >
        {[...logos, ...logos].map((logo, idx) => (
          <div
            key={idx}
            className="flex-shrink-0  opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          >
            <img
              src={logo.logo}
              alt={logo.name}
              className="h-8 md:h-12 w-auto object-contain pointer-events-none"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
