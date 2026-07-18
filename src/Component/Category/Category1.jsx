import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ChevronRight, SlidersHorizontal } from "lucide-react";

const C = {
  navy: "#0B1B3A",
  navyDeep: "#071227",
  gold: "#C9A227",
  goldLight: "#E8C874",
  maroon: "#7A1F2B",
  silver: "#B8BCC2",
  white: "#FFFFFF",
  ink: "#1C2333",
  paper: "#F7F5F1",
};

const ACCENT = "#8A8A2B";
const ACCENT_LIGHT = "#B8B840";

const PRODUCTS = [
  {
    "name": "Fidgety",
    "tagline": "3-in-1 Wireless Charger + Holder",
    "code": "UG-GC34",
    "price": 1099,
    "seed": "speaker-UG-GC34"
  },
  {
    "name": "Tango",
    "tagline": "Water Resistant Bluetooth Speaker",
    "code": "UG-GS13",
    "price": 1099,
    "seed": "speaker-UG-GS13"
  },
  {
    "name": "Boom Pod",
    "tagline": "10W Party Speaker with RGB Lights",
    "code": "UG-GS21",
    "price": 1699,
    "seed": "speaker-UG-GS21"
  },
  {
    "name": "Echo Mini",
    "tagline": "Pocket Bluetooth Speaker",
    "code": "UG-GS08",
    "price": 799,
    "seed": "speaker-UG-GS08"
  },
  {
    "name": "Rove",
    "tagline": "TWS Earbuds with Charging Case",
    "code": "UG-GS27",
    "price": 1299,
    "seed": "speaker-UG-GS27"
  },
  {
    "name": "Cadence",
    "tagline": "Soundbar Style Desktop Speaker",
    "code": "UG-GS31",
    "price": 1899,
    "seed": "speaker-UG-GS31"
  },
  {
    "name": "Pulse Mic",
    "tagline": "Wireless Karaoke Mic Speaker",
    "code": "UG-GS19",
    "price": 1499,
    "seed": "speaker-UG-GS19"
  },
  {
    "name": "Drift",
    "tagline": "Waterproof Shower Speaker",
    "code": "UG-GS05",
    "price": 899,
    "seed": "speaker-UG-GS05"
  },
  {
    "name": "Nova Bass",
    "tagline": "Deep Bass Bluetooth Speaker",
    "code": "UG-GS42",
    "price": 2199,
    "seed": "speaker-UG-GS42"
  }
];

function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: C.white,
        border: "1px solid rgba(11,27,58,0.08)",
        boxShadow: "0 2px 10px rgba(11,27,58,0.05)",
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "1 / 1", background: "#EFEFEF" }}>
        <img
          src={`https://picsum.photos/seed/${product.seed}/500/500`}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <span
          className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide"
          style={{ background: ACCENT, color: C.white }}
        >
          SPEAKERS
        </span>
        <span
          className="absolute bottom-3 right-3 rounded-md px-2 py-1 text-[11px] font-semibold"
          style={{ background: "rgba(11,27,58,0.85)", color: C.goldLight }}
        >
          MRP ₹{product.price}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1 px-4 pt-3.5 pb-4">
        <h3 className="text-[15px] font-bold" style={{ color: C.ink }}>
          {product.name}
        </h3>
        <p className="text-[12.5px]" style={{ color: ACCENT }}>
          {product.tagline}
        </p>
        <p className="text-[11.5px]" style={{ color: "#8A8F9C" }}>
          Item Code {product.code}
        </p>
        <p className="text-[11.5px]" style={{ color: "#8A8F9C" }}>
          Brand Urban Gear
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[15px] font-bold" style={{ color: C.navy }}>
            Rs.{product.price}.00
          </span>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold"
            style={{ border: `1.5px solid ${ACCENT}`, color: ACCENT }}
          >
            <ShoppingBag size={14} />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function SpeakersCategory() {
  const [sort, setSort] = useState("popular");

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: C.paper, minHeight: "100vh" }}>
      {/* ---- Hero ---- */}
      <div
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(120deg, ${C.navyDeep} 0%, ${C.navy} 55%, ${ACCENT} 160%)` }}
      >
        <div
          className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full"
          style={{ background: `radial-gradient(circle, ${ACCENT_LIGHT}55, transparent 70%)`, filter: "blur(20px)" }}
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 text-[12.5px] mb-4"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            <span>Home</span>
            <ChevronRight size={13} />
            <span>Categories</span>
            <ChevronRight size={13} />
            <span style={{ color: C.goldLight }}>Speakers & Audio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-[32px] sm:text-[42px] font-extrabold leading-tight"
            style={{ color: C.white }}
          >
            Speakers & Audio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-2 max-w-xl text-[14.5px]"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            Sound that travels — wireless speakers, party lights & mics
          </motion.p>
        </div>
      </div>

      {/* ---- Toolbar ---- */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 -mt-6 relative z-10">
        <div
          className="flex items-center justify-between rounded-2xl px-4 sm:px-5 py-3.5"
          style={{ background: C.white, boxShadow: "0 8px 24px rgba(11,27,58,0.12)" }}
        >
          <span className="text-[13px] font-semibold" style={{ color: C.ink }}>
            {PRODUCTS.length} products
          </span>
          <div className="flex items-center gap-2 text-[12.5px]" style={{ color: "#5B6072" }}>
            <SlidersHorizontal size={14} />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent outline-none font-medium"
            >
              <option value="popular">Sort: Popular</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* ---- 3x3 responsive product grid ---- */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {[...PRODUCTS]
            .sort((a, b) => (sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : 0))
            .map((p, i) => (
              <ProductCard key={p.code} product={p} index={i} />
            ))}
        </div>
      </div>
    </div>
  );
}