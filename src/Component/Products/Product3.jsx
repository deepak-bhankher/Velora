import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Star,
  ChevronRight,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  Undo2,
  Check,
  ImageOff,
  Palette,
} from "lucide-react";

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

// 👉 Image paths yaha daalna — public folder me files rakh ke path likh dena
// e.g. "/products/buzz/1.jpg"
const GALLERY = ["", "", "", ""];

// Pill-style filter — occasion / use-case options for this product
const FILTER_OPTIONS = [
  { id: "all", label: "All" },
  { id: "festive", label: "Festive" },
  { id: "corporate", label: "Corporate" },
  { id: "employee", label: "Employee" },
];

const COLORS = [{"id": "white", "label": "White", "hex": "#F5F5F0"}, {"id": "black", "label": "Black", "hex": "#1C2333"}];

const RELATED = [{"name": "Loop", "code": "UG-CL04", "price": 899}, {"name": "Snoozer", "code": "UG-CL06", "price": 999}, {"name": "Chrono", "code": "UG-CL19", "price": 2499}, {"name": "Tango", "code": "UG-GS13", "price": 1099}];

function GalleryImage({ src }) {
  if (!src) {
    return (
      <div className="flex h-full w-full items-center justify-center" style={{ background: "#ECECEC" }}>
        <ImageOff size={28} style={{ color: "#B8BCC2" }} />
      </div>
    );
  }
  return <img src={src} alt="Product" className="h-full w-full object-cover" />;
}

export default function Product3() {
  const [activeImg, setActiveImg] = useState(0);
  const [filter, setFilter] = useState("all");
  const [color, setColor] = useState(COLORS[0].id);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: C.paper, minHeight: "100vh" }}>
      {/* ---- Breadcrumb ---- */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 pt-6">
        <div className="flex items-center gap-1.5 text-[12.5px]" style={{ color: "#7A8092" }}>
          <span>Home</span>
          <ChevronRight size={13} />
          <span>Clocks & Timepieces</span>
          <ChevronRight size={13} />
          <span style={{ color: C.ink, fontWeight: 600 }}>Buzz</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* ============ SECTION 1 — GALLERY ============ */}
        <div>
          <motion.div
            key={activeImg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-2xl"
            style={{ aspectRatio: "1 / 1", border: "1px solid rgba(11,27,58,0.08)" }}
          >
            <GalleryImage src={GALLERY[activeImg]} />
            <span
              className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide"
              style={{ background: C.gold, color: C.navy }}
            >
              NEW
            </span>
          </motion.div>

          <div className="mt-3 grid grid-cols-4 gap-3">
            {GALLERY.map((src, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveImg(i)}
                whileHover={{ y: -2 }}
                className="relative overflow-hidden rounded-xl"
                style={{
                  aspectRatio: "1 / 1",
                  border: activeImg === i ? `2px solid ${C.gold}` : "1px solid rgba(11,27,58,0.1)",
                }}
              >
                <GalleryImage src={src} />
              </motion.button>
            ))}
          </div>
        </div>

        {/* ============ Info panel + SECTION 2 — FILTER ============ */}
        <div>
          <h1 className="text-[26px] sm:text-[30px] font-extrabold" style={{ color: C.ink }}>
            Buzz
          </h1>
          <p className="mt-1 text-[13.5px]" style={{ color: "#7A8092" }}>
            Bluetooth Speaker with Alarm Clock · Item Code UG-GS16
          </p>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={15} fill={C.gold} style={{ color: C.gold }} />
              ))}
            </div>
            <span className="text-[12.5px]" style={{ color: "#7A8092" }}>
              4.8 (126 reviews)
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-[28px] font-extrabold" style={{ color: C.navy }}>
              Rs.1999.00
            </span>
            <span className="text-[15px] line-through" style={{ color: "#B8BCC2" }}>
              Rs.2499.00
            </span>
            <span className="text-[12.5px] font-semibold" style={{ color: "#2F7D46" }}>
              20% off
            </span>
          </div>

          {/* ---- Color swatches ---- */}
          <div className="mt-6">
            <p className="text-[13px] font-semibold mb-2" style={{ color: C.ink }}>
              Color — {COLORS.find((c) => c.id === color)?.label}
            </p>
            <div className="flex items-center gap-2.5">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id)}
                  className="h-8 w-8 rounded-full flex items-center justify-center"
                  style={{ background: c.hex, border: color === c.id ? `2px solid ${C.navy}` : "2px solid transparent", boxShadow: "0 0 0 1px rgba(11,27,58,0.15)" }}
                >
                  {color === c.id && <Check size={14} color={c.id === "gold" || c.id === "white" ? C.navy : C.white} />}
                </button>
              ))}
            </div>
          </div>

          {/* ============ SECTION 2 — FILTER (pill-style, 4 items) ============ */}
          <div className="mt-6">
            <p className="text-[13px] font-semibold mb-2" style={{ color: C.ink }}>
              Best Suited For
            </p>
            <div className="inline-flex flex-wrap items-center gap-1 rounded-full p-1" style={{ background: "#EFEDE7" }}>
              {FILTER_OPTIONS.map((opt) => {
                const active = filter === opt.id;
                return (
                  <motion.button
                    key={opt.id}
                    onClick={() => setFilter(opt.id)}
                    whileTap={{ scale: 0.96 }}
                    className="relative rounded-full px-4 py-2 text-[12.5px] font-semibold"
                    style={{ color: active ? C.white : "#6B7180" }}
                  >
                    {active && (
                      <motion.span
                        layoutId="filterPill-Product3"
                        className="absolute inset-0 rounded-full"
                        style={{ background: C.navy }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{opt.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ---- Quantity + actions ---- */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-full" style={{ border: "1px solid rgba(11,27,58,0.15)" }}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-9 w-9 items-center justify-center">
                <Minus size={14} style={{ color: C.ink }} />
              </button>
              <span className="w-8 text-center text-[13px] font-semibold" style={{ color: C.ink }}>
                {qty}
              </span>
              <button onClick={() => setQty((q) => q + 1)} className="flex h-9 w-9 items-center justify-center">
                <Plus size={14} style={{ color: C.ink }} />
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-[13.5px] font-semibold"
              style={{ background: C.navy, color: C.goldLight }}
            >
              <ShoppingBag size={16} />
              Add to Cart
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{ border: "1px solid rgba(11,27,58,0.15)" }}
            >
              <Heart size={17} style={{ color: C.maroon }} />
            </motion.button>
          </div>

          {/* ---- Upload your own design ---- */}
          <Link to="/design-studio">
            <motion.div
              whileHover={{ y: -2 }}
              className="mt-3 flex items-center justify-center gap-2 rounded-full py-3 text-[13.5px] font-semibold"
              style={{ border: `1.5px dashed ${C.gold}`, color: C.ink, background: "rgba(201,162,39,0.06)" }}
            >
              <Palette size={16} style={{ color: C.gold }} />
              Upload Your Design
            </motion.div>
          </Link>

          {/* ---- Trust badges ---- */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { icon: Truck, label: "Bulk delivery in 7-10 days" },
              { icon: ShieldCheck, label: "1 year warranty" },
              { icon: Undo2, label: "Easy 7-day returns" },
            ].map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="flex flex-col items-center gap-1.5 rounded-xl py-3 text-center" style={{ background: C.white, border: "1px solid rgba(11,27,58,0.08)" }}>
                  <Icon size={17} style={{ color: C.navy }} />
                  <span className="text-[10.5px] leading-tight" style={{ color: "#5B6072" }}>
                    {b.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============ SECTION 3 — DETAILS TABS ============ */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-10">
        <div className="flex gap-6 border-b" style={{ borderColor: "rgba(11,27,58,0.1)" }}>
          {["description", "specifications", "reviews"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="relative pb-3 text-[13.5px] font-semibold capitalize"
              style={{ color: tab === t ? C.navy : "#9CA0AA" }}
            >
              {t}
              {tab === t && (
                <motion.div layoutId="tabLine-Product3" className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: C.gold }} />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="pt-5 text-[13.5px] leading-relaxed"
            style={{ color: "#5B6072" }}
          >
            {tab === "description" && <p>Buzz combines a loud, reliable alarm clock with a full-bodied Bluetooth speaker in one desk-ready unit. Large LED digits, dual alarms and a USB-C port make mornings easier and evenings louder.</p>}
            {tab === "specifications" && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <li>Dimensions: 10.5 x 5.5 x 7.5cm</li>
                <li>Output: 5W</li>
                <li>Bluetooth version: 5.3</li>
                <li>Power: USB-C powered</li>
                <li>Battery backup: Up to 8 hours</li>
                <li>Extras: Dual alarm, auto time-sync</li>
              </ul>
            )}
            {tab === "reviews" && (
              <div className="flex flex-col gap-3">
                <p>4.8 out of 5 based on 126 reviews. Customers highlight the build quality and finish.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ============ SECTION 4 — YOU MAY ALSO LIKE ============ */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 pb-14">
        <h2 className="text-[19px] font-bold mb-4" style={{ color: C.ink }}>
          You may also like
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {RELATED.map((p, i) => (
            <motion.div
              key={p.code}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: C.white, border: "1px solid rgba(11,27,58,0.08)" }}
            >
              <div style={{ aspectRatio: "1 / 1" }}>
                <GalleryImage src="" />
              </div>
              <div className="p-3">
                <p className="text-[13px] font-bold" style={{ color: C.ink }}>
                  {p.name}
                </p>
                <p className="text-[13px] font-bold mt-0.5" style={{ color: C.navy }}>
                  Rs.{p.price}.00
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}