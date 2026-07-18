import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
      className="w-full"
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

        <div className="pt-4 pb-1 text-center">
          <h3 className="text-base sm:text-lg font-bold" style={{ color: C.ink }}>
            {product.title}
          </h3>
          <p className="text-sm mt-0.5" style={{ color: C.gray }}>
            {product.subtitle}
          </p>

          <div className="flex justify-center pb-3">
            <button
              className="mt-3 inline-flex items-center gap-2 cursor-pointer rounded-full border-2 px-5 py-2 text-xs sm:text-sm font-semibold tracking-wide uppercase transition-colors duration-200"
              style={{ borderColor: C.gold, color: C.gold, background: "transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = C.gold;
                e.currentTarget.style.color = C.cream;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = C.gold;
              }}
            >
              View Details
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home4() {
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

        {/* Grid — no scroll, all 4 visible */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}