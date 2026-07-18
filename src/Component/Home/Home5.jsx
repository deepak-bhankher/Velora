import { motion } from "framer-motion";
import {
  MessageCircle,
  Lightbulb,
  PackageCheck,
  Truck,
  ArrowRight,
} from "lucide-react";

// Same palette used across Home3 / Home4
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

const STEPS = [
  {
    icon: MessageCircle,
    step: "1. Understand",
    desc: "We understand your needs, budget and objectives.",
  },
  {
    icon: Lightbulb,
    step: "2. Design",
    desc: "We create customised concepts and product options.",
  },
  {
    icon: PackageCheck,
    step: "3. Produce",
    desc: "We source, customise and package with utmost care.",
  },
  {
    icon: Truck,
    step: "4. Deliver",
    desc: "We deliver across locations, on time, every time.",
  },
];

// 👉 Swap images with real work-gallery photos
const GALLERY = [
  { title: "Festival Hampers", image: "home14.png" },
  { title: "Employee Welcome Kits", image: "home13.png" },
  { title: "Client Appreciation", image: "home15.png" },
  { title: "Branded Merchandise", image: "home16.png" },
  { title: "Bespoke Creations", image: "home17.png" },
];

function ProcessSteps() {
  return (
    <div className="w-full" style={{ background: C.cream }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p
            className="text-xs sm:text-sm font-bold tracking-[0.2em] mb-3"
            style={{ color: C.gold }}
          >
            HOW WE WORK
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ color: C.ink, fontFamily: "Georgia, serif" }}
          >
            Simple Process.{" "}
            <span style={{ color: C.gold, fontStyle: "italic" }}>
              Exceptional Results.
            </span>
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          {/* connecting dotted line — desktop only */}
          <div
            className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px"
            style={{
              backgroundImage: `linear-gradient(to right, ${C.gray}66 40%, transparent 0%)`,
              backgroundSize: "10px 1px",
              backgroundRepeat: "repeat-x",
            }}
          />

          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                className="relative flex flex-col items-center text-center gap-3 px-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              >
                <motion.div
                  className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ background: C.darkGreen }}
                  whileHover={{ scale: 1.08, rotate: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Icon size={22} style={{ color: C.gold }} strokeWidth={1.7} />
                </motion.div>
                <h3 className="text-sm sm:text-base font-bold" style={{ color: C.ink }}>
                  {s.step}
                </h3>
                <p
                  className="text-xs sm:text-sm leading-relaxed max-w-[180px]"
                  style={{ color: C.gray }}
                >
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OurWork() {
  return (
    <div className="w-full" style={{ background: C.creamDeep }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
        <motion.div
          className="flex items-end justify-between mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div>
            <p
              className="text-xs sm:text-sm font-bold tracking-[0.2em] mb-2"
              style={{ color: C.gold }}
            >
              OUR WORK
            </p>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold"
              style={{ color: C.ink, fontFamily: "Georgia, serif" }}
            >
              A Glimpse of Our Creations
            </h2>
          </div>

          <button
            className="hidden sm:inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold tracking-wide uppercase transition-transform duration-200 hover:translate-x-1"
            style={{ color: C.ink }}
          >
            View Gallery
            <ArrowRight size={16} />
          </button>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {GALLERY.map((item, i) => (
            <motion.div
              key={item.title}
              className="group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <div
                className="relative aspect-square overflow-hidden rounded-xl"
                style={{ background: "#E4DED0" }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,23,15,0.55), transparent 55%)",
                  }}
                />
              </div>
              <p
                className="mt-2.5 flex items-center gap-1 text-xs sm:text-sm font-medium"
                style={{ color: C.ink }}
              >
                {item.title}
                <ArrowRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  style={{ opacity: 0.6 }}
                />
              </p>
            </motion.div>
          ))}
        </div>

        <button
          className="sm:hidden mt-8 inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide uppercase"
          style={{ color: C.ink }}
        >
          View Gallery
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function Home5() {
  return (
    <section style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <ProcessSteps />
      <OurWork />
    </section>
  );
}