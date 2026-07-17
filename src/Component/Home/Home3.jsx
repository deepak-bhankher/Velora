import {
  Gift,
  ShoppingBag,
  User,
  Box,
  Package,
  Building2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

// Palette pulled from the reference design
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

const COMPANIES = [
  "Microsoft",
  "Deloitte.",
  "Google",
  "IBM",
  "accenture",
  "TATA",
  "CISCO",
];

const SOLUTIONS = [
  {
    icon: Gift,
    title: "Corporate Hampers",
    desc: "Premium hampers for festivals, celebrations and special occasions.",
  },
  {
    icon: ShoppingBag,
    title: "Branded Merchandise",
    desc: "High-quality branded products that keep your brand top of mind.",
  },
  {
    icon: User,
    title: "Welcome Kits",
    desc: "Warm welcomes for employees, clients and partners.",
  },
  {
    icon: Box,
    title: "Custom Creations",
    desc: "Bespoke products designed around your unique requirements.",
  },
];

const STATS = [
  { icon: Gift, value: "500+", label: "Happy Clients" },
  { icon: Package, value: "10K+", label: "Hampers Delivered" },
  { icon: Building2, value: "Large Scale", label: "Bulk Orders Handled" },
  { icon: ShieldCheck, value: "100%", label: "On-Time Delivery" },
];

function LogoStrip() {
  const track = [...COMPANIES, ...COMPANIES]; // duplicated for seamless loop

  return (
    <div className="w-full overflow-hidden" style={{ background: C.cream }}>
      <style>{`
        @keyframes logoMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logo-marquee-track {
          animation: logoMarquee 22s linear infinite;
        }
        .logo-marquee-wrap:hover .logo-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
        <p
          className="text-center text-[11px] sm:text-xs font-bold tracking-[0.2em] mb-5"
          style={{ color: C.ink }}
        >
          TRUSTED BY LEADING COMPANIES
        </p>

        <div
          className="logo-marquee-wrap relative w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="logo-marquee-track flex items-center gap-12 sm:gap-20 w-max">
            {track.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="shrink-0 text-lg sm:text-2xl font-semibold tracking-tight whitespace-nowrap transition-opacity duration-200 hover:!opacity-100"
                style={{ color: C.ink, opacity: 0.72, fontFamily: "Georgia, serif" }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SolutionCard({ item }) {
  const Icon = item.icon;
  return (
    <div
      className="group flex flex-col gap-4 rounded-xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1"
      style={{ background: C.creamDeep, border: `1px solid ${C.ink}12` }}
    >
      <Icon size={26} style={{ color: C.gold }} strokeWidth={1.5} />
      <div>
        <h3 className="text-base sm:text-lg font-bold mb-1.5" style={{ color: C.ink }}>
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: C.gray }}>
          {item.desc}
        </p>
      </div>
      <ArrowRight
        size={18}
        className="mt-1 transition-transform duration-300 group-hover:translate-x-1.5"
        style={{ color: C.ink, opacity: 0.55 }}
      />
    </div>
  );
}

function WhatWeDo() {
  return (
    <div className="w-full" style={{ background: C.cream }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-start">
          {/* Left copy block */}
          <div>
            <p
              className="text-xs sm:text-sm font-bold tracking-[0.2em] mb-3"
              style={{ color: C.gold }}
            >
              WHAT WE DO
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight mb-2"
              style={{ color: C.ink }}
            >
              Customized Products.
            </h2>
            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight mb-5"
              style={{ color: C.gold, fontStyle: "italic" }}
            >
              Meaningful Connections.
            </h2>
            <p
              className="text-sm sm:text-base leading-relaxed mb-7 max-w-md"
              style={{ color: C.gray }}
            >
              From festive gifting to employee welcome kits and client
              appreciation hampers — we help brands build stronger
              relationships through thoughtful gifting.
            </p>

            <button
              className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-xs sm:text-sm font-bold tracking-wide uppercase transition-transform duration-200 hover:scale-[1.03]"
              style={{ background: C.ink, color: C.cream }}
            >
              View All Solutions
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right solutions grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {SOLUTIONS.map((item) => (
              <SolutionCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsBar() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 pb-12 sm:pb-16" style={{ background: C.cream }}>
      <div
        className="mx-auto max-w-7xl rounded-2xl px-6 sm:px-10 py-8 sm:py-10"
        style={{
          background: `linear-gradient(135deg, ${C.darkGreen}, ${C.darkGreenDeep})`,
        }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3 sm:gap-4">
                <Icon
                  size={28}
                  strokeWidth={1.5}
                  className="shrink-0"
                  style={{ color: C.gold }}
                />
                <div>
                  <p className="text-lg sm:text-2xl font-bold" style={{ color: C.cream }}>
                    {stat.value}
                  </p>
                  <p className="text-[11px] sm:text-sm" style={{ color: C.cream, opacity: 0.65 }}>
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Home3() {
  return (
    <section style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <LogoStrip />
      <div className="w-full h-px" style={{ background: `${C.ink}12` }} />
      <WhatWeDo />
      <StatsBar />
    </section>
  );
}