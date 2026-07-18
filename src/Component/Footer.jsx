import { ArrowRight, Heart } from "lucide-react";

// Lightweight inline social icons — avoids relying on lucide-react's
// brand icons, which vary/are removed across versions
function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.24h4.5V23H.24V8.24zM8.5 8.24h4.32v2.01h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.4c0-1.53-.03-3.5-2.13-3.5-2.14 0-2.47 1.67-2.47 3.39V23H8.5V8.24z" />
    </svg>
  );
}
function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="17" height="17" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" {...props}>
      <path d="M13.5 22v-8.4h2.8l.42-3.3h-3.22V8.1c0-.95.26-1.6 1.63-1.6h1.74V3.56C16.56 3.4 15.5 3.3 14.3 3.3c-2.5 0-4.2 1.53-4.2 4.34v2.66H7.3v3.3h2.8V22h3.4z" />
    </svg>
  );
}
function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" {...props}>
      <path d="M22.5 6.6a2.9 2.9 0 0 0-2-2C18.7 4.1 12 4.1 12 4.1s-6.7 0-8.5.5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 1 12a30 30 0 0 0 .5 5.4 2.9 2.9 0 0 0 2 2c1.8.5 8.5.5 8.5.5s6.7 0 8.5-.5a2.9 2.9 0 0 0 2-2A30 30 0 0 0 23 12a30 30 0 0 0-.5-5.4zM9.8 15.5v-7l6.1 3.5-6.1 3.5z" />
    </svg>
  );
}

// Same red / blue / gold palette as the Navbar — for a matching premium look
const C = {
  navy: "#0B1B3A",
  navyDeep: "#071227",
  maroon: "#7A1F2B",
  maroonDeep: "#4A2038",
  gold: "#C9A227",
  goldLight: "#E8C874",
  cream: "#F3EFE7",
  gray: "#B8BCC2",
};

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Categories", href: "#category" },
  { label: "Product", href: "#product" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(100deg, #9A2338 0%, #7A1F2B 20%, #4A2038 42%, #16244A 64%, #0B1B3A 100%)",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* soft gold glow accent, echoes the navbar */}
      <div
        className="pointer-events-none absolute -top-16 left-0 h-56 w-96"
        style={{
          background: "radial-gradient(circle, rgba(201,162,39,0.18), transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      {/* thin gold rule up top, matching navbar's bottom rule */}
      <div
        className="h-[2px] w-full"
        style={{ background: `linear-gradient(90deg, ${C.maroon}, ${C.gold} 45%, ${C.goldLight} 55%, ${C.gray})` }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.2fr] gap-10 lg:gap-14">
          {/* Logo + tagline + socials */}
          <div>
            <img
              src="/logo.png"
              alt="RKL Group"
              className="h-16 sm:h-20 hover:scale-110 transition-all duration-300 w-auto object-contain mb-4 drop-shadow-[0_0_12px_rgba(201,162,39,0.35)]"
            />
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: C.cream, opacity: 0.7 }}
            >
              Premium customised hampers and branded products for MNCs and
              leading companies.
            </p>

            <div className="flex items-center gap-3 mt-6">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200"
                  style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.16)", color: C.cream }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = C.gold;
                    e.currentTarget.style.color = C.navyDeep;
                    e.currentTarget.style.borderColor = C.gold;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.10)";
                    e.currentTarget.style.color = C.cream;
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
                  }}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-sm font-bold tracking-wide mb-5"
              style={{ color: C.goldLight }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: C.cream, opacity: 0.75 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = C.goldLight;
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = C.cream;
                      e.currentTarget.style.opacity = "0.75";
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              className="text-sm font-bold tracking-wide mb-5"
              style={{ color: C.goldLight }}
            >
              Newsletter
            </h4>
            <p
              className="text-sm leading-relaxed max-w-xs mb-4"
              style={{ color: C.cream, opacity: 0.75 }}
            >
              Stay updated with our latest products &amp; offers.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-xs items-center rounded-full pl-5 pr-1.5 py-1.5"
              style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)" }}
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-60"
                style={{ color: C.cream }}
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${C.goldLight}, ${C.gold})`, color: C.navyDeep }}
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px my-10" style={{ background: "rgba(255,255,255,0.14)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs sm:text-sm" style={{ color: C.cream, opacity: 0.6 }}>
            © {year} RKL Group. All Rights Reserved.
          </p>
          <p
            className="flex items-center gap-1.5 text-xs sm:text-sm"
            style={{ color: C.cream, opacity: 0.6 }}
          >
            Designed with <Heart size={14} style={{ color: C.goldLight }} fill={C.goldLight} />
          </p>
        </div>
      </div>
    </footer>
  );
}