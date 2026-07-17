import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

// Same palette used across Home3 — keep everything visually consistent
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

// 👉 Swap images/fields with real product data
const PRODUCTS = [
  {
    id: 1,
    tag: "NEW",
    title: "Serene Spa Hamper",
    subtitle: "Relaxation, redefined.",
    image: "home18.png",
  },
  {
    id: 2,
    tag: "NEW",
    title: "Executive Luxe Set",
    subtitle: "Sophistication in every detail.",
    image: "home19.png",
  },
  {
    id: 3,
    tag: "NEW",
    title: "Eco Essentials Kit",
    subtitle: "Sustainable. Useful. Memorable.",
     image: "home20.png",
  },
  {
    id: 4,
    tag: "NEW",
    title: "Festive Delight Box",
    subtitle: "Celebrations made special.",
 image: "home21.png",
  },
];

function ProductCard({ product, index }) {
  return (
    <motion.div
      className="snap-start shrink-0 w-[78%] xs:w-[65%] sm:w-[46%] lg:w-[24%]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      <div className="group rounded-2xl overflow-hidden" style={{ background: C.cream }}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl" style={{ background: "#E4DED0" }}>
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span
            className="absolute top-3 right-3 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide"
            style={{ background: C.darkGreen, color: C.cream }}
          >
            {product.tag}
          </span>
        </div>

        <div className="pt-4 pb-1">
          <h3 className="text-base sm:text-lg font-bold" style={{ color: C.ink }}>
            {product.title}
          </h3>
          <p className="text-sm mt-0.5" style={{ color: C.gray }}>
            {product.subtitle}
          </p>

          <button
            className="mt-3 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-200"
            style={{ color: C.ink }}
          >
            View Details
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home4() {
  const scrollerRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const dotCount = PRODUCTS.length;

  const scrollByCard = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.firstChild ? el.firstChild.offsetWidth + 24 : 300;
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.firstChild ? el.firstChild.offsetWidth + 24 : 300;
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveDot(Math.min(idx, dotCount - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [dotCount]);

  return (
    <section className="w-full relative" style={{ background: C.creamDeep, fontFamily: "Inter, system-ui, sans-serif" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
        {/* Heading */}
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
            NEWLY LAUNCHED PRODUCTS
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ color: C.ink, fontFamily: "Georgia, serif" }}
          >
            Explore What&apos;s{" "}
            <span style={{ color: C.gold, fontStyle: "italic" }}>New</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base" style={{ color: C.gray }}>
            Fresh designs. Premium quality. Made to impress.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scrollByCard(-1)}
            aria-label="Previous"
            className="hidden sm:flex absolute -left-4 lg:-left-6 top-[38%] -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-105"
            style={{ background: C.darkGreen }}
          >
            <ChevronLeft size={20} style={{ color: C.cream }} />
          </button>

          <div
            ref={scrollerRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-2 no-scrollbar"
            style={{ scrollbarWidth: "none" }}
          >
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scrollByCard(1)}
            aria-label="Next"
            className="hidden sm:flex absolute -right-4 lg:-right-6 top-[38%] -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-105"
            style={{ background: C.darkGreen }}
          >
            <ChevronRight size={20} style={{ color: C.cream }} />
          </button>
        </div>

        {/* Dot pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {PRODUCTS.map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: activeDot === i ? "22px" : "7px",
                background: activeDot === i ? C.darkGreen : `${C.darkGreen}33`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}