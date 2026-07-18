import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Same palette used across Home3 / Home4 / Home5
const C = {
  cream: "#F3EFE7",
  creamDeep: "#ECE7DC",
  ink: "#1D1D1B",
  gray: "#6B6B66",
  gold: "#B08D45",
  goldDark: "#8C6F35",
  darkGreen: "#0E1F16",
  darkGreenDeep: "#0A170F",
};

// 👉 Swap with real client testimonials
const TESTIMONIALS = [
  {
    id: 1,
    company: "IBM",
    quote:
      "RKL Group have been our go-to partner for corporate gifting. The quality and on-time delivery are unmatched.",
    name: "Anita Sharma",
    role: "Admin Head, IBM India",
  },
  {
    id: 2,
    company: "Deloitte.",
    quote:
      "Their attention to detail and customisation options are exactly what we look for in a gifting partner.",
    name: "Raju Menon",
    role: "Director, Deloitte",
  },
  {
    id: 3,
    company: "Microsoft",
    quote:
      "Professional, reliable and creative — RKL Group truly understands our brand expectations.",
    name: "Neha Verma",
    role: "Procurement Manager",
  },
  {
    id: 4,
    company: "Accenture",
    quote:
      "Seamless execution every single time. Our teams always look forward to RKL's welcome kits.",
    name: "Karan Mehta",
    role: "HR Lead, Accenture",
  },
  {
    id: 5,
    company: "TATA",
    quote:
      "A dependable partner that consistently delivers premium quality within tight timelines.",
    name: "Priya Nair",
    role: "Brand Manager, TATA",
  },
];

function TestimonialCard({ item, isFeatured }) {
  return (
    <motion.div
      className="flex flex-col justify-between rounded-2xl p-6 sm:p-7 h-full"
      style={{
        background: isFeatured ? C.ink : C.cream,
        border: isFeatured ? "none" : `1px solid ${C.ink}14`,
        boxShadow: isFeatured
          ? "0 20px 40px rgba(0,0,0,0.18)"
          : "0 4px 14px rgba(0,0,0,0.04)",
      }}
      animate={{
        scale: isFeatured ? 1.04 : 1,
        y: isFeatured ? -6 : 0,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div>
        <Quote
          size={26}
          style={{ color: isFeatured ? C.gold : C.gold }}
          fill={isFeatured ? C.gold : "transparent"}
          strokeWidth={isFeatured ? 0 : 1.5}
        />
        <p
          className="mt-4 text-sm sm:text-base leading-relaxed font-semibold"
          style={{ color: isFeatured ? C.cream : C.ink, opacity: isFeatured ? 1 : 0.85 }}
        >
          {item.company}
        </p>
        <p
          className="mt-3 text-sm sm:text-[15px] leading-relaxed"
          style={{ color: isFeatured ? "#D8D4CB" : C.gray }}
        >
          {item.quote}
        </p>
      </div>

      <div className="mt-6">
        <p
          className="text-sm font-bold"
          style={{ color: isFeatured ? C.cream : C.ink }}
        >
          — {item.name}
        </p>
        <p
          className="text-xs mt-0.5"
          style={{ color: isFeatured ? "#B7B2A6" : C.gray }}
        >
          {item.role}
        </p>
      </div>
    </motion.div>
  );
}

export default function Home6() {
  const [start, setStart] = useState(0);
  const [dir, setDir] = useState(1);
  const total = TESTIMONIALS.length;

  const getVisible = () => {
    // 3 items on desktop, sliding window with wraparound
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(TESTIMONIALS[(start + i) % total]);
    }
    return items;
  };

  const go = (delta) => {
    setDir(delta);
    setStart((prev) => (prev + delta + total) % total);
  };

  const visible = getVisible();

  const variants = {
    enter: (direction) => ({ opacity: 0, x: direction > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (direction) => ({ opacity: 0, x: direction > 0 ? -40 : 40 }),
  };

  return (
    <section
      className="w-full py-14 sm:py-20"
      style={{ background: C.creamDeep, fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p
            className="text-xs sm:text-sm font-bold tracking-[0.2em] mb-3"
            style={{ color: C.gold }}
          >
            TESTIMONIALS
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ color: C.ink, fontFamily: "Georgia, serif" }}
          >
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="relative flex items-center gap-3 sm:gap-5">
          {/* Left arrow */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="hidden sm:flex shrink-0  cursor-pointer h-11 w-11 items-center justify-center rounded-full shadow-md transition-transform duration-200 hover:scale-105"
            style={{ background: C.cream, border: `1px solid ${C.ink}14` }}
          >
            <ChevronLeft size={20} style={{ color: C.ink }} />
          </button>

          {/* Desktop: 3-card sliding window */}
          <div className="hidden sm:grid flex-1 grid-cols-3 gap-5 lg:gap-6 overflow-hidden">
            <AnimatePresence mode="popLayout" custom={dir} initial={false}>
              {visible.map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <TestimonialCard item={item} isFeatured={i === 1} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile: single featured card */}
          <div className="flex sm:hidden flex-1 overflow-hidden">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div
                key={TESTIMONIALS[start].id}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full"
              >
                <TestimonialCard item={TESTIMONIALS[start]} isFeatured />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="hidden sm:flex shrink-0 cursor-pointer h-11 w-11 items-center justify-center rounded-full shadow-md transition-transform duration-200 hover:scale-105"
            style={{ background: C.cream, border: `1px solid ${C.ink}14` }}
          >
            <ChevronRight size={20} style={{ color: C.ink }} />
          </button>
        </div>

        {/* Mobile arrows */}
        <div className="flex sm:hidden items-center justify-center gap-4 mt-6">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full shadow-md"
            style={{ background: C.cream, border: `1px solid ${C.ink}14` }}
          >
            <ChevronLeft size={18} style={{ color: C.ink }} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full shadow-md"
            style={{ background: C.cream, border: `1px solid ${C.ink}14` }}
          >
            <ChevronRight size={18} style={{ color: C.ink }} />
          </button>
        </div>

        {/* Dot pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: start === i ? "22px" : "7px",
                background: start === i ? C.darkGreen : `${C.darkGreen}33`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}