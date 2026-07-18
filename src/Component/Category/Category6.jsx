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

const ACCENT = "#5B5E66";
const ACCENT_LIGHT = "#8A8D96";

const PRODUCTS = [
  {
    "name": "Crestcap",
    "tagline": "Embroidered Baseball Cap",
    "code": "UG-AP03",
    "price": 499,
    "seed": "apparel-UG-AP03"
  },
  {
    "name": "Coreline",
    "tagline": "Cotton Crew Neck T-Shirt",
    "code": "UG-AP11",
    "price": 649,
    "seed": "apparel-UG-AP11"
  },
  {
    "name": "Layerup",
    "tagline": "Zip-Up Hoodie Jacket",
    "code": "UG-AP19",
    "price": 1599,
    "seed": "apparel-UG-AP19"
  },
  {
    "name": "Wristband",
    "tagline": "Silicone Fitness Wristband",
    "code": "UG-AP02",
    "price": 199,
    "seed": "apparel-UG-AP02"
  },
  {
    "name": "Toteform",
    "tagline": "Canvas Tote Bag",
    "code": "UG-AP07",
    "price": 449,
    "seed": "apparel-UG-AP07"
  },
  {
    "name": "Beanie",
    "tagline": "Ribbed Knit Winter Beanie",
    "code": "UG-AP14",
    "price": 399,
    "seed": "apparel-UG-AP14"
  },
  {
    "name": "PoloLine",
    "tagline": "Pique Cotton Polo Shirt",
    "code": "UG-AP21",
    "price": 899,
    "seed": "apparel-UG-AP21"
  },
  {
    "name": "SockSet",
    "tagline": "Ankle Socks Pack of 3",
    "code": "UG-AP05",
    "price": 299,
    "seed": "apparel-UG-AP05"
  },
  {
    "name": "Scarfline",
    "tagline": "Lightweight Printed Scarf",
    "code": "UG-AP16",
    "price": 549,
    "seed": "apparel-UG-AP16"
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
          APPAREL
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

export default function ApparelCategory() {
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
            <span style={{ color: C.goldLight }}>Apparel & Wearables</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-[32px] sm:text-[42px] font-extrabold leading-tight"
            style={{ color: C.white }}
          >
            Apparel & Wearables
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-2 max-w-xl text-[14.5px]"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            Wear the brand — caps, tees & everyday merch
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