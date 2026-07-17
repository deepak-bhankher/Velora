import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import img1 from "/home1.png";
import img2 from "/home2.png";
import img3 from "/home3.png";
import img4 from "/home4.png";
import img5 from "/home5.png";
import img6 from "/home6.png";

const SLIDES = [img1, img2, img3, img4, img5, img6];

const AUTO_DELAY = 2000; // ms

// Same palette as Navbar.jsx
const C = {
  navy: "#0B1B3A",
  navyDeep: "#071227",
  gold: "#C9A227",
  goldLight: "#E8C874",
  maroon: "#7A1F2B",
  silver: "#B8BCC2",
  white: "#FFFFFF",
};

const variants = {
  enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export default function Home1() {
  const [[index, direction], setIndex] = useState([0, 0]);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef(null);

  const paginate = useCallback((newDir) => {
    setIndex(([prev]) => {
      const next = (prev + newDir + SLIDES.length) % SLIDES.length;
      return [next, newDir];
    });
  }, []);

  const goTo = (i) => {
    setIndex(([prev]) => [i, i > prev ? 1 : -1]);
  };

  useEffect(() => {
    if (isHovering) return;
    timerRef.current = setInterval(() => paginate(1), AUTO_DELAY);
    return () => clearInterval(timerRef.current);
  }, [isHovering, paginate]);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: C.navyDeep }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* ambient glow blobs, same accent colors as navbar */}
      <div
        className="pointer-events-none absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl -z-0"
        style={{ background: `${C.gold}22` }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl -z-0"
        style={{ background: `${C.maroon}22` }}
      />

      <div
        className="rkl-hero-slide-wrap relative w-full flex items-center justify-center overflow-hidden
          aspect-[4/3] sm:aspect-[16/8] md:aspect-auto"
        style={{ minHeight: "260px" }}
      >
        <style>{`
          @media (min-width: 768px) {
            .rkl-hero-slide-wrap { height: calc(100vh - 114px) !important; aspect-ratio: auto !important; }
          }
        `}</style>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 32 }, opacity: { duration: 0.25 } }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={SLIDES[index]}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover select-none"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Left arrow */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => paginate(-1)}
          aria-label="Previous slide"
          className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-10
            w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full
            flex items-center justify-center cursor-pointer backdrop-blur-md
            transition-all duration-300"
          style={{
            background: `${C.navy}99`,
            border: `1px solid ${C.gold}40`,
            color: C.white,
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `${C.gold}b0`;
            e.currentTarget.style.boxShadow = `0 0 18px ${C.gold}55`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `${C.gold}40`;
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
          }}
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </motion.button>

        {/* Right arrow */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => paginate(1)}
          aria-label="Next slide"
          className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-10
            w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full
            flex items-center justify-center cursor-pointer backdrop-blur-md
            transition-all duration-300"
          style={{
            background: `${C.navy}99`,
            border: `1px solid ${C.maroon}55`,
            color: C.white,
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `${C.maroon}b0`;
            e.currentTarget.style.boxShadow = `0 0 18px ${C.maroon}55`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `${C.maroon}55`;
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
          }}
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6" />
        </motion.button>

        {/* Dot indicators */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === index ? 24 : 8,
                background:
                  i === index
                    ? `linear-gradient(90deg, ${C.goldLight}, ${C.gold})`
                    : "rgba(255,255,255,0.35)",
                boxShadow: i === index ? `0 0 10px ${C.gold}80` : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* thin gold rule to match navbar's bottom accent line */}
      <div
        className="h-[2px] w-full"
        style={{ background: `linear-gradient(90deg, ${C.maroon}, ${C.gold} 45%, ${C.goldLight} 55%, ${C.silver})` }}
      />
    </section>
  );
}