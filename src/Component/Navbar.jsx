import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  Menu,
  X,
  ChevronDown,
  Volume2,
  BatteryCharging,
  Watch,
  Briefcase,
  PenTool,
  Shirt,
  Leaf,
} from "lucide-react";

// Palette lifted straight from the reference swatches
const C = {
  navy: "#0B1B3A",
  navyDeep: "#071227",
  gold: "#C9A227",
  goldLight: "#E8C874",
  maroon: "#7A1F2B",
  silver: "#B8BCC2",
  white: "#FFFFFF",
  ink: "#1C2333",
};

const MotionLink = motion(Link);

// 7 category verticals — each maps to its own Category page + accent color
const CATEGORIES = [
  { label: "Speakers & Audio", href: "/category/speakers", icon: Volume2, desc: "Bluetooth & wireless sound", accent: "#8A8A2B" },
  { label: "Power & Charging", href: "/category/power", icon: BatteryCharging, desc: "Chargers, banks & cables", accent: "#1F7A6B" },
  { label: "Clocks & Timepieces", href: "/category/clocks", icon: Watch, desc: "Alarm clocks & wearables", accent: "#C9791A" },
  { label: "Bags & Travel", href: "/category/bags", icon: Briefcase, desc: "Backpacks & travel gear", accent: "#7A1F2B" },
  { label: "Desk & Office", href: "/category/office", icon: PenTool, desc: "Stationery & desk essentials", accent: "#16244A" },
  { label: "Apparel & Wearables", href: "/category/apparel", icon: Shirt, desc: "Caps, tees & merch", accent: "#5B5E66" },
  { label: "Eco & Lifestyle", href: "/category/eco", icon: Leaf, desc: "Sustainable everyday picks", accent: "#2F7D46" },
];

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Categories", href: "/category", isMega: true },
  { label: "Product", href: "/product" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const searchRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* ---- Main navbar ---- */}
      <nav
        className="sticky top-0 z-50 transition-shadow duration-300 relative overflow-visible"
        style={{
          background:
            "linear-gradient(90deg, #9A2338 0%, #7A1F2B 22%, #4A2038 42%, #16244A 62%, #0B1B3A 100%)",
          boxShadow: scrolled ? "0 6px 24px rgba(0,0,0,0.35)" : "0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* premium diagonal shine */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.10) 48%, rgba(255,255,255,0.02) 55%, transparent 65%)",
          }}
        />
        {/* soft red glow accent behind the logo */}
        <div
          className="pointer-events-none absolute -top-10 left-0 h-40 w-72"
          style={{
            background: "radial-gradient(circle, rgba(154,35,56,0.45), transparent 70%)",
            filter: "blur(10px)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex h-20 items-center gap-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden -ml-1 flex h-10 w-10 items-center justify-center rounded-md focus:outline-none focus-visible:ring-2"
              style={{ color: C.goldLight, outlineColor: C.gold }}
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <a href="#" className="flex items-center justify-center h-16 w-16 sm:h-[68px] sm:w-[68px] shrink-0 py-1.5">
              <motion.img
                src="/logo.png"
                alt="Company Logo"
                className="h-full w-full object-contain drop-shadow-[0_0_10px_rgba(201,162,39,0.35)]"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: [0, -3, 0] }}
                transition={{
                  opacity: { duration: 0.5, ease: "easeOut" },
                  y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
                }}
                whileHover={{ scale: 1.08, rotate: -2 }}
              />
            </a>

            {/* Right side: search (desktop) + icons */}
            <div className="hidden md:flex items-center gap-3 ml-auto">
              <div
                className="flex items-center gap-2 rounded-full px-3.5 py-2 w-48 lg:w-64 transition-colors"
                style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.16)" }}
              >
                <Search size={15} style={{ color: C.silver }} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[13px]"
                  style={{ color: C.white }}
                />
              </div>

              <a
                href="#"
                className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                style={{ color: C.silver }}
                aria-label="Account"
              >
                <User size={20} />
              </a>
            </div>

            {/* Mobile-only: search toggle + spacer */}
            <div className="flex md:hidden items-center gap-1 ml-auto">
              <button
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Search"
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ color: C.silver }}
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Mobile search — collapsible */}
          <div
            className="md:hidden overflow-hidden transition-all duration-300"
            style={{ maxHeight: searchOpen ? "56px" : "0px" }}
          >
            <div
              className="flex items-center gap-2 rounded-full px-4 py-2 mb-3"
              style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.16)" }}
            >
              <Search size={16} style={{ color: C.silver }} />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search products..."
                className="w-full bg-transparent text-sm outline-none"
                style={{ color: C.white }}
              />
            </div>
          </div>
        </div>

        {/* ---- Section strip — desktop, centered ---- */}
        <div
          className="hidden lg:block relative"
          style={{ background: C.navyDeep, borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="mx-auto max-w-7xl px-10">
            <ul className="flex items-center justify-center gap-10">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={item.isMega ? handleEnter : undefined}
                  onMouseLeave={item.isMega ? handleLeave : undefined}
                >
                  <Link
                    to={item.href}
                    className="group relative flex items-center gap-1 py-3 text-[13px] font-medium tracking-wide transition-colors"
                    style={{ color: megaOpen && item.isMega ? C.goldLight : "rgba(255,255,255,0.82)" }}
                    onMouseEnter={(e) => { if (!item.isMega) e.currentTarget.style.color = C.goldLight; }}
                    onMouseLeave={(e) => { if (!item.isMega) e.currentTarget.style.color = "rgba(255,255,255,0.82)"; }}
                  >
                    {item.label}
                    {item.isMega && (
                      <motion.span
                        animate={{ rotate: megaOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown size={13} />
                      </motion.span>
                    )}
                    <span
                      className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-[85%]"
                      style={{ background: C.gold }}
                    />
                  </Link>

                  {/* ---- Mega dropdown: 7 category sections ---- */}
                  {item.isMega && (
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.98 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className="fixed left-1/2 top-[104px] -translate-x-1/2 z-50"
                          style={{ width: "min(880px, 92vw)" }}
                        >
                          <div
                            className="rounded-2xl p-3 grid grid-cols-4 gap-2"
                            style={{
                              background: C.navyDeep,
                              border: `1px solid rgba(201,162,39,0.25)`,
                              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                            }}
                          >
                            {CATEGORIES.map((cat, i) => {
                              const Icon = cat.icon;
                              return (
                                <MotionLink
                                  key={cat.label}
                                  to={cat.href}
                                  onClick={() => setMegaOpen(false)}
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.04, duration: 0.2 }}
                                  whileHover={{ y: -3 }}
                                  className="flex flex-col gap-2 rounded-xl p-3.5 transition-colors"
                                  style={{ background: "rgba(255,255,255,0.03)" }}
                                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                                >
                                  <span
                                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                                    style={{ background: `${cat.accent}33`, color: cat.accent }}
                                  >
                                    <Icon size={17} />
                                  </span>
                                  <span className="text-[13px] font-semibold" style={{ color: C.white }}>
                                    {cat.label}
                                  </span>
                                  <span className="text-[11px] leading-tight" style={{ color: C.silver }}>
                                    {cat.desc}
                                  </span>
                                </MotionLink>
                              );
                            })}
                            <Link
                              to="/category"
                              onClick={() => setMegaOpen(false)}
                              className="flex flex-col items-center justify-center gap-1 rounded-xl p-3.5 text-center transition-colors"
                              style={{
                                background: `linear-gradient(135deg, ${C.gold}22, ${C.maroon}22)`,
                                border: `1px dashed ${C.gold}55`,
                              }}
                            >
                              <span className="text-[13px] font-semibold" style={{ color: C.goldLight }}>
                                View All
                              </span>
                              <span className="text-[11px]" style={{ color: C.silver }}>
                                Browse everything →
                              </span>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* thin gold rule under everything */}
        <div
          className="h-[2px] w-full"
          style={{ background: `linear-gradient(90deg, ${C.maroon}, ${C.gold} 45%, ${C.goldLight} 55%, ${C.silver})` }}
        />
      </nav>

      {/* ---- Mobile drawer ---- */}
      <div
        className="fixed inset-0 z-50 lg:hidden transition-opacity duration-300"
        style={{
          background: "rgba(7,18,39,0.6)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={() => setOpen(false)}
      />
      <div
        className="fixed top-0 left-0 z-50 h-full w-[80%] max-w-xs flex flex-col transform transition-transform duration-300 ease-out lg:hidden"
        style={{
          background: C.navyDeep,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          boxShadow: "8px 0 30px rgba(0,0,0,0.4)",
        }}
      >
        <div
          className="flex items-center justify-between px-5 pt-5 pb-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="flex items-center h-9">
            <img src="/logo.png" alt="Company Logo" className="h-full w-auto object-contain" />
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ color: C.goldLight }}
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-col gap-1 px-3 pt-4 overflow-y-auto">
          {NAV_ITEMS.map((item) =>
            item.isMega ? (
              <div key={item.label}>
                <button
                  onClick={() => setMobileCatOpen((v) => !v)}
                  className="w-full flex items-center justify-between rounded-lg px-3 py-3.5 text-base font-medium"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  {item.label}
                  <motion.span animate={{ rotate: mobileCatOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={16} style={{ color: C.silver }} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {mobileCatOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden pl-2"
                    >
                      {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <Link
                            key={cat.label}
                            to={cat.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm"
                            style={{ color: "rgba(255,255,255,0.75)" }}
                          >
                            <span
                              className="flex h-7 w-7 items-center justify-center rounded-md"
                              style={{ background: `${cat.accent}33`, color: cat.accent }}
                            >
                              <Icon size={13} />
                            </span>
                            {cat.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-3.5 text-base font-medium"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {item.label}
                <ChevronDown size={16} className="-rotate-90" style={{ color: C.silver }} />
              </Link>
            )
          )}
        </div>

        <div className="mt-auto p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <a
            href="#"
            className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
              style={{
                background: `linear-gradient(135deg, ${C.goldLight}, ${C.gold})`,
                color: C.navy,
              }}
            >
              <User size={18} />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold" style={{ color: C.white }}>
                My Account
              </span>
              <span className="text-xs" style={{ color: C.silver }}>
                Sign in or view profile
              </span>
            </span>
            <ChevronDown
              size={16}
              className="-rotate-90 ml-auto opacity-70 transition-transform duration-200 group-hover:translate-x-0.5"
              style={{ color: C.silver }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}