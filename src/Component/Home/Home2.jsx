import { ShoppingBag, Sparkles } from "lucide-react";

// Same palette as Navbar — keep everything visually consistent
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

// 👉 Replace image + fields with real product data
const PRODUCTS = [
  {
    id: 1,
    name: "Sip-On",
    category: "Drink ware",
    tag: "DRINKWARE",
    itemCode: "UG-DB95",
    brand: "Urban Gear",
    price: 450,
    image: "home7.png",
  },
  {
    id: 2,
    name: "GLOWCHRG PRO",
    category: "Charging Cables",
    tag: "TECH",
    itemCode: "UG-G435",
    brand: "Urban Gear",
    price: 499,
    image: "home8.png",
  },
  {
    id: 3,
    name: "Power Mag 2.0",
    category: "Power Banks",
    tag: "TECH & GADGETS",
    itemCode: "UG-PB10",
    brand: "Urban Gear",
    price: 2999,
    image: "home9.png",
  },
  {
    id: 4,
    name: "Metal Pen Set",
    category: "Executive Metal Pens",
    tag: "DRINKWARE",
    itemCode: "UG-MP37",
    brand: "Urban Gear",
    price: 450,
    image: "home10.png",
  },
   {
    id: 5,
    name: "Moosi",
    category: "Gadget",
    tag: "TECH & GADGETS",
    itemCode: "UG-GM25",
    brand: "Urban Gear",
    price: 550,
    image: "home11.png",
  },
   {
    id: 6,
    name: "Blue Mirror Lens",
    category: "Gadget",
    tag: "TECH & GADGETS",
    itemCode: "UG-GT03",
    brand: " Urban Gear",
    price: 1099,
    image: "home12.png",
  },
];

function ProductCard({ product }) {
  return (
    <div
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: C.white,
        border: `1px solid ${C.navy}1A`,
        boxShadow: "0 2px 10px rgba(11,27,58,0.06)",
      }}
    >
      {/* Image + vertical category strip */}
      <div className="relative flex">
        <div
          className="flex items-center justify-center py-4 shrink-0"
          style={{ background: C.navyDeep, width: "28px" }}
        >
          <span
            className="text-[10px] font-semibold tracking-[0.25em] whitespace-nowrap"
            style={{
              color: C.goldLight,
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            {product.tag}
          </span>
        </div>

        <div
          className="relative flex-1 aspect-[4/5] overflow-hidden"
          style={{ background: "#F3F4F6" }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* MRP ribbon like reference */}
          <div
            className="absolute bottom-2 right-2 rounded-md px-2 py-1 text-[11px] font-bold"
            style={{ background: C.ink, color: C.goldLight }}
          >
            MRP ₹{product.price}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col items-center gap-1.5 px-4 pt-5 pb-4 text-center">
        <h3
          className="text-base sm:text-lg font-bold"
          style={{ color: C.navy }}
        >
          {product.name}
        </h3>
        <p className="text-sm" style={{ color: C.ink, opacity: 0.6 }}>
          {product.category}
        </p>
        <p className="text-sm">
          <span style={{ color: C.ink, opacity: 0.55 }}>Item Code </span>
          <span className="font-semibold" style={{ color: C.ink }}>
            {product.itemCode}
          </span>
        </p>
        <p className="text-sm">
          <span style={{ color: C.ink, opacity: 0.55 }}>Brand </span>
          <span className="font-semibold" style={{ color: C.ink }}>
            {product.brand}
          </span>
        </p>

        <p
          className="mt-3 text-xl sm:text-2xl font-extrabold"
          style={{ color: C.maroon }}
        >
          Rs.{product.price.toFixed(2)}
        </p>

        <button
          className="mt-3 inline-flex items-center gap-2 cursor-pointer rounded-full border-2 px-5 py-2 text-xs sm:text-sm font-semibold tracking-wide uppercase transition-colors duration-200"
          style={{ borderColor: C.gold, color: C.gold, background: "transparent" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = C.gold;
            e.currentTarget.style.color = C.white;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = C.gold;
          }}
        >
          <ShoppingBag size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function Home2() {
  return (
    <section
      className="w-full py-14 sm:py-20"
      style={{ background: C.white, fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] sm:text-xs font-semibold tracking-[0.2em] mb-4"
            style={{
              background: `${C.navy}0D`,
              color: C.maroon,
              border: `1px solid ${C.gold}55`,
            }}
          >
            <Sparkles size={13} style={{ color: C.gold }} />
            JUST LANDED
          </span>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold"
            style={{ color: C.navy }}
          >
            New Arrivals
          </h2>

          <div
            className="mt-4 h-[3px] w-24 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${C.maroon}, ${C.gold} 45%, ${C.goldLight} 55%, ${C.silver})`,
            }}
          />

          <p
            className="mt-4 max-w-xl text-sm sm:text-base"
            style={{ color: C.ink, opacity: 0.65 }}
          >
            Fresh drops, handpicked and ready to ship — the latest additions to the Urban Gear lineup.
          </p>
        </div>

        {/* Product grid — fully responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 sm:gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}