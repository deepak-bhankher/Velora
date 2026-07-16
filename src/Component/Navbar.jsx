import { useState, useEffect, useRef } from "react";
import {
  Search,
  User,
  Menu,
  X,
  ChevronDown,
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

const CATEGORIES = [
  { label: "New Arrivals", href: "#" },
  { label: "Women", href: "#" },
  { label: "Men", href: "#" },
  { label: "Accessories", href: "#" },
  { label: "Home & Living", href: "#" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);

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

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* ---- Main navbar ---- */}
      <nav
        className="sticky top-0 z-50 transition-shadow duration-300"
        style={{
          background: C.navy,
          boxShadow: scrolled ? "0 6px 20px rgba(0,0,0,0.28)" : "0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex h-16 items-center gap-4">
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
            <a href="#" className="flex items-center gap-2 shrink-0">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-lg font-serif text-base font-bold"
                style={{
                  background: `linear-gradient(135deg, ${C.goldLight}, ${C.gold})`,
                  color: C.navy,
                }}
              >
                V
              </span>
              <span className="font-serif text-xl tracking-wide" style={{ color: C.white }}>
                VELORA
              </span>
            </a>

            {/* Search — desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <div
                className="flex w-full items-center gap-2 rounded-full px-4 py-2 transition-colors"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <Search size={17} style={{ color: C.silver }} />
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[13px]"
                  style={{ color: C.white }}
                />
              </div>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-1 ml-auto">
              {/* mobile search toggle */}
              <button
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Search"
                className="md:hidden flex h-10 w-10 items-center justify-center rounded-full"
                style={{ color: C.silver }}
              >
                <Search size={20} />
              </button>

              <a
                href="#"
                className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                style={{ color: C.silver }}
                aria-label="Account"
              >
                <User size={20} />
              </a>
            </div>
          </div>

          {/* Mobile search — collapsible */}
          <div
            className="md:hidden overflow-hidden transition-all duration-300"
            style={{ maxHeight: searchOpen ? "56px" : "0px" }}
          >
            <div
              className="flex items-center gap-2 rounded-full px-4 py-2 mb-3"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
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

        {/* ---- Category strip — desktop ---- */}
        <div
          className="hidden lg:block"
          style={{ background: C.navyDeep, borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="mx-auto max-w-7xl px-10">
            <ul className="flex items-center gap-8">
              {CATEGORIES.map((c) => (
                <li key={c.label} className="relative">
                  <a
                    href={c.href}
                    className="group relative flex items-center gap-1 py-3 text-[13px] font-medium tracking-wide transition-colors"
                    style={{ color: c.accent ? C.goldLight : "rgba(255,255,255,0.82)" }}
                  >
                    {c.label}
                    <ChevronDown
                      size={13}
                      className="opacity-50 transition-transform duration-200 group-hover:rotate-180"
                    />
                    <span
                      className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-[85%]"
                      style={{ background: C.gold }}
                    />
                  </a>
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
          <span className="flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg font-serif text-sm font-bold"
              style={{ background: `linear-gradient(135deg, ${C.goldLight}, ${C.gold})`, color: C.navy }}
            >
              V
            </span>
            <span className="font-serif text-lg" style={{ color: C.white }}>VELORA</span>
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
          {CATEGORIES.map((c) => (
            <a
              key={c.label}
              href={c.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-3.5 text-base font-medium"
              style={{ color: c.accent ? C.goldLight : "rgba(255,255,255,0.9)" }}
            >
              {c.label}
              <ChevronDown size={16} className="-rotate-90" style={{ color: C.silver }} />
            </a>
          ))}
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

      {/* ---- Page content goes below the navbar ---- */}
      <div
        className="min-h-[60vh]"
        style={{ background: `linear-gradient(180deg, ${C.white}, #F4F5F7)` }}
      />
    </div>
  );
}