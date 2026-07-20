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

const ACCENT = "#1F7A6B";
const ACCENT_LIGHT = "#3FB09D";

// 👉 Image path yaha daalna — public folder me file rakh ke path likh dena
// e.g. image: "/products/fidgety.jpg"
const PRODUCTS = [
  {
    "name": "Volt 10K",
    "code": "UG-PB10",
    "price": 999,
    "desc": "A slim 10000mAh power bank that fits in a pocket but charges like a full-size one.",
    "image": ""
  },
  {
    "name": "Strand",
    "code": "UG-PC03",
    "price": 349,
    "desc": "Braided USB-C cable built to survive daily tangles, bends and bag-life.",
    "image": ""
  },
  {
    "name": "Wattage",
    "code": "UG-PW20",
    "price": 799,
    "desc": "20W PD wall charger that gets your phone from empty to full in record time.",
    "image": ""
  },
  {
    "name": "Solarix",
    "code": "UG-PB15",
    "price": 1399,
    "desc": "Solar-panel power bank for travellers who don't want to hunt for outlets.",
    "image": ""
  },
  {
    "name": "Dockline",
    "code": "UG-PD04",
    "price": 1899,
    "desc": "4-in-1 wireless charging dock for phone, earbuds, watch and more, all at once.",
    "image": ""
  },
  {
    "name": "Trio Cable",
    "code": "UG-PC07",
    "price": 499,
    "desc": "One cable, three tips \u2014 Type-C, Lightning and Micro USB covered in a single cord.",
    "image": ""
  },
  {
    "name": "CarVolt",
    "code": "UG-PC12",
    "price": 649,
    "desc": "Dashboard fast charger that keeps your phone topped up on every drive.",
    "image": ""
  },
  {
    "name": "MagPuck",
    "code": "UG-PW09",
    "price": 1199,
    "desc": "Magnetic wireless charging puck that snaps on and charges without the fuss.",
    "image": ""
  },
  {
    "name": "PowerStrip",
    "code": "UG-PS02",
    "price": 899,
    "desc": "Portable extension board with multiple USB ports for desks, hostels and travel.",
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
          POWER
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

export default function PowerCategory() {
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
            <span style={{ color: C.goldLight }}>Power & Charging</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-[32px] sm:text-[42px] font-extrabold leading-tight"
            style={{ color: C.white }}
          >
            Power & Charging
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-2 max-w-xl text-[14.5px]"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            Never run flat — power banks, cables & fast chargers
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