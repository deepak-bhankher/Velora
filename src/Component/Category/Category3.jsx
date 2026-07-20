import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Eye, X, ChevronRight, SlidersHorizontal, ImageOff } from "lucide-react";

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

const ACCENT = "#C9791A";
const ACCENT_LIGHT = "#E8A94A";

// 👉 Image path yaha daalna — public folder me file rakh ke path likh dena
// e.g. image: "/products/fidgety.jpg"
const PRODUCTS = [
  {
    "name": "Buzz",
    "code": "UG-GS16",
    "price": 1999,
    "desc": "A Bluetooth speaker and loud alarm clock in one \u2014 wakes you up in style.",
    "image": ""
  },
  {
    "name": "Loop",
    "code": "UG-CL04",
    "price": 899,
    "desc": "Minimal analog desk clock that suits any workspace or bedside table.",
    "image": ""
  },
  {
    "name": "Wristline",
    "code": "UG-CL11",
    "price": 1799,
    "desc": "Smart fitness band that tracks steps, sleep and heart rate on your wrist.",
    "image": ""
  },
  {
    "name": "Solstice",
    "code": "UG-CL08",
    "price": 1299,
    "desc": "Bold LED digital wall clock, easy to read from across the room.",
    "image": ""
  },
  {
    "name": "DriftAlarm",
    "code": "UG-CL02",
    "price": 749,
    "desc": "Wooden-finish alarm clock that brings warmth to any bedside setup.",
    "image": ""
  },
  {
    "name": "Chrono",
    "code": "UG-CL19",
    "price": 2499,
    "desc": "Classic analog wrist watch with a brushed steel strap for everyday wear.",
    "image": ""
  },
  {
    "name": "Snoozer",
    "code": "UG-CL06",
    "price": 999,
    "desc": "Dual alarm clock with a built-in USB port to charge your phone overnight.",
    "image": ""
  },
  {
    "name": "Pebble Time",
    "code": "UG-CL01",
    "price": 549,
    "desc": "A tiny travel alarm clock that folds flat and slips into any bag.",
    "image": ""
  },
  {
    "name": "Orbit",
    "code": "UG-CL14",
    "price": 1599,
    "desc": "Projection alarm clock that casts the time onto your ceiling at night.",
    "image": ""
  }
];

function ProductImage({ image, name }) {
  if (!image) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1.5" style={{ background: "#ECECEC" }}>
        <ImageOff size={22} style={{ color: "#B8BCC2" }} />
        <span className="text-[10.5px]" style={{ color: "#9CA0AA" }}>Image coming soon</span>
      </div>
    );
  }
  return <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" />;
}

function ProductCard({ product, index, onPreview }) {
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
      <div className="relative overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
        <ProductImage image={product.image} name={product.name} />
        <span
          className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide"
          style={{ background: ACCENT, color: C.white }}
        >
          CLOCKS
        </span>
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => onPreview(product)}
          className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold"
          style={{ background: "rgba(11,27,58,0.85)", color: C.goldLight }}
        >
          <Eye size={13} />
          Preview
        </motion.button>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 px-4 pt-3.5 pb-4">
        <h3 className="text-[15px] font-bold" style={{ color: C.ink }}>
          {product.name}
        </h3>
        <p className="text-[12.5px] leading-snug line-clamp-2" style={{ color: "#6B7180" }}>
          {product.desc}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-[16px] font-bold" style={{ color: C.navy }}>
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

function PreviewModal({ product, onClose }) {
  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60]"
            style={{ background: "rgba(7,18,39,0.65)" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 z-[70] -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-lg overflow-hidden rounded-2xl"
            style={{ background: C.white }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full"
              style={{ background: "rgba(11,27,58,0.75)", color: C.white }}
            >
              <X size={16} />
            </button>
            <div style={{ aspectRatio: "1 / 1" }}>
              <ProductImage image={product.image} name={product.name} />
            </div>
            <div className="p-5">
              <h3 className="text-[19px] font-bold" style={{ color: C.ink }}>
                {product.name}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: "#6B7180" }}>
                {product.desc}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[19px] font-bold" style={{ color: C.navy }}>
                  Rs.{product.price}.00
                </span>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-semibold"
                  style={{ background: ACCENT, color: C.white }}
                >
                  <ShoppingBag size={15} />
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ClocksCategory() {
  const [sort, setSort] = useState("popular");
  const [previewProduct, setPreviewProduct] = useState(null);

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
            <span style={{ color: C.goldLight }}>Clocks & Timepieces</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-[32px] sm:text-[42px] font-extrabold leading-tight"
            style={{ color: C.white }}
          >
            Clocks & Timepieces
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-2 max-w-xl text-[14.5px]"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            Rise and shine — alarm clocks, watches & desk timers
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
              <ProductCard key={p.code} product={p} index={i} onPreview={setPreviewProduct} />
            ))}
        </div>
      </div>

      <PreviewModal product={previewProduct} onClose={() => setPreviewProduct(null)} />
    </div>
  );
}