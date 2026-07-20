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
  Stamp,
  Sun,
  Printer,
  Sticker,
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
// e.g. "/products/fidgety/1.jpg"
const GALLERY = ["", "", "", ""];

const BRANDING_OPTIONS = [
  { id: "engrave", label: "Engrave", icon: Stamp, desc: "Laser etched, permanent" },
  { id: "uv", label: "UV Printing", icon: Sun, desc: "Full colour, glossy finish" },
  { id: "screen", label: "Screen Printing", icon: Printer, desc: "Bold single-tone logo" },
  { id: "dtf", label: "DTF Sticker", icon: Sticker, desc: "Peel & stick, quick turnaround" },
];

const COLORS = [
  { id: "navy", label: "Navy", hex: "#0B1B3A" },
  { id: "black", label: "Black", hex: "#1C2333" },
  { id: "gold", label: "Gold", hex: "#C9A227" },
];

const RELATED = [
  { name: "Tango", price: 1099, code: "UG-GS13" },
  { name: "Buzz", price: 1999, code: "UG-GS16" },
  { name: "Rove", price: 1299, code: "UG-GS27" },
  { name: "Volt 10K", price: 999, code: "UG-PB10" },
];

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

export default function Product1() {
  const [activeImg, setActiveImg] = useState(0);
  const [branding, setBranding] = useState("engrave");
  const [color, setColor] = useState("navy");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: C.paper, minHeight: "100vh" }}>
      {/* ---- Breadcrumb ---- */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 pt-6">
        <div className="flex items-center gap-1.5 text-[12.5px]" style={{ color: "#7A8092" }}>
          <span>Home</span>
          <ChevronRight size={13} />
          <span>Speakers & Audio</span>
          <ChevronRight size={13} />
          <span style={{ color: C.ink, fontWeight: 600 }}>Fidgety</span>
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
              BESTSELLER
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
            Fidgety
          </h1>
          <p className="mt-1 text-[13.5px]" style={{ color: "#7A8092" }}>
            3-in-1 Wireless Charger + Mobile Holder + Fidget Toy · Item Code UG-GC34
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
              Rs.1099.00
            </span>
            <span className="text-[15px] line-through" style={{ color: "#B8BCC2" }}>
              Rs.1399.00
            </span>
            <span className="text-[12.5px] font-semibold" style={{ color: "#2F7D46" }}>
              21% off
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
                  {color === c.id && <Check size={14} color={c.id === "gold" ? C.navy : C.white} />}
                </button>
              ))}
            </div>
          </div>

          {/* ============ SECTION 2 — FILTER (4 branding options) ============ */}
          <div className="mt-6">
            <p className="text-[13px] font-semibold mb-2" style={{ color: C.ink }}>
              Branding Option
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {BRANDING_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const active = branding === opt.id;
                return (
                  <motion.button
                    key={opt.id}
                    onClick={() => setBranding(opt.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex flex-col items-center gap-1.5 rounded-xl px-2.5 py-3 text-center transition-colors"
                    style={{
                      border: active ? `1.5px solid ${C.gold}` : "1px solid rgba(11,27,58,0.12)",
                      background: active ? "rgba(201,162,39,0.08)" : C.white,
                    }}
                  >
                    <Icon size={18} style={{ color: active ? C.gold : "#7A8092" }} />
                    <span className="text-[11.5px] font-semibold" style={{ color: active ? C.ink : "#7A8092" }}>
                      {opt.label}
                    </span>
                    <span className="text-[10px] leading-tight" style={{ color: "#9CA0AA" }}>
                      {opt.desc}
                    </span>
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
                <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: C.gold }} />
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
            {tab === "description" && (
              <p>
                Fidgety is a 3-in-1 wireless charging station that keeps your desk clutter-free. Charge your phone,
                earbuds and watch together, use the built-in stand to prop up your device for calls, and keep restless
                hands busy with the fidget toy base — all wrapped in a warm bamboo finish that fits any workspace.
              </p>
            )}
            {tab === "specifications" && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <li>Dimensions: 10 x 8 x 3cm</li>
                <li>Output: 15W fast wireless charging</li>
                <li>Material: Bamboo + ABS</li>
                <li>Charging ports: 1x USB-C input</li>
                <li>Compatibility: Qi-enabled devices</li>
                <li>Branding space: Top panel, 4 x 2cm</li>
              </ul>
            )}
            {tab === "reviews" && (
              <div className="flex flex-col gap-3">
                <p>4.8 out of 5 based on 126 reviews. Customers highlight the sturdy build and fast charging speed.</p>
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