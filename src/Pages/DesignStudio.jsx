import { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Type,
  ImagePlus,
  Shapes,
  Undo2,
  Redo2,
  Eye,
  X,
  Plus,
  Minus,
  Settings,
  UploadCloud,
  Contrast,
  Palette,
  RotateCcw,
  RotateCw,
  Check,
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

const RECOLOR_SWATCHES = [
  { id: "black", label: "Black", hex: "#1C2333" },
  { id: "blue", label: "Blue", hex: "#2b3a9e" },
  { id: "green", label: "Green", hex: "#1fa97a" },
  { id: "red", label: "Red", hex: "#d33f3f" },
];

// 👉 Box / basket material colors — like choosing leather color.
// This is separate from the logo recolor above (that recolors the
// uploaded design; this recolors the actual product/box itself).
const BOX_COLORS = [
  { id: "yellow", label: "Yellow", hex: "#F0B429" },
  { id: "kraft", label: "Kraft", hex: "#B9863F" },
  { id: "green", label: "Green", hex: "#2F7D46" },
  { id: "red", label: "Red", hex: "#A93226" },
  { id: "navy", label: "Navy", hex: "#0B1B3A" },
  { id: "black", label: "Black", hex: "#1C2333" },
];

function shade(hex, percent) {
  // percent: negative = darker, positive = lighter
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) + Math.round(255 * (percent / 100));
  let g = ((num >> 8) & 0x00ff) + Math.round(255 * (percent / 100));
  let b = (num & 0x0000ff) + Math.round(255 * (percent / 100));
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `rgb(${r},${g},${b})`;
}

const TOOLS = [
  { id: "text", label: "Text", icon: Type },
  { id: "uploads", label: "Uploads", icon: ImagePlus },
  { id: "graphics", label: "Graphics", icon: Shapes },
];

export default function DesignStudio() {
  const navigate = useNavigate();
  const location = useLocation();
  const productInfo = location.state || { name: "Your Product", unitPrice: 0, qty: 1 };
  const [activeTool, setActiveTool] = useState("uploads");
  const [dragOver, setDragOver] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showAdjust, setShowAdjust] = useState(false);
  const [contrast, setContrast] = useState(100);
  const [recolor, setRecolor] = useState(null);
  const [inverted, setInverted] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isBaking, setIsBaking] = useState(false);
  const [boxColor, setBoxColor] = useState(BOX_COLORS[0].hex);
  const fileInputRef = useRef(null);
  const safeAreaRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setUploadedImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const resetAdjustments = () => {
    setContrast(100);
    setRecolor(null);
    setInverted(false);
  };

  const removeImage = () => {
    setUploadedImage(null);
    resetAdjustments();
    setZoom(100);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const rotateLeft = () => setRotation((r) => r - 90);
  const rotateRight = () => setRotation((r) => r + 90);
  const resetTransform = () => {
    setZoom(100);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const clampPosition = (x, y) => {
    if (!safeAreaRef.current) return { x, y };
    const rect = safeAreaRef.current.getBoundingClientRect();
    const maxX = rect.width / 2;
    const maxY = rect.height / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  };

  const handlePointerDown = (e) => {
    if (!uploadedImage) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const nextX = e.clientX - dragStartRef.current.x;
    const nextY = e.clientY - dragStartRef.current.y;
    setPosition(clampPosition(nextX, nextY));
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
  };

  const bakeFinalImage = () =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const CANVAS_SIZE = 1000;
        const canvas = document.createElement("canvas");
        canvas.width = CANVAS_SIZE;
        canvas.height = CANVAS_SIZE;
        const ctx = canvas.getContext("2d");

        const fitScale = Math.min(CANVAS_SIZE / img.width, CANVAS_SIZE / img.height);
        const drawW = img.width * fitScale;
        const drawH = img.height * fitScale;

        const rect = safeAreaRef.current?.getBoundingClientRect();
        const posScale = rect ? CANVAS_SIZE / rect.width : 1;

        ctx.save();
        ctx.translate(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
        ctx.translate(position.x * posScale, position.y * posScale);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(zoom / 100, zoom / 100);
        ctx.filter = `contrast(${contrast}%) ${inverted ? "invert(1)" : ""}`;
        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);

        if (recolor) {
          ctx.filter = "none";
          ctx.globalCompositeOperation = "color";
          ctx.globalAlpha = 0.85;
          ctx.fillStyle = recolor;
          ctx.fillRect(-drawW / 2, -drawH / 2, drawW, drawH);
          ctx.globalCompositeOperation = "source-over";
          ctx.globalAlpha = 1;
        }
        ctx.restore();

        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = reject;
      img.src = uploadedImage;
    });

  const handleNext = async () => {
    if (!uploadedImage) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2500);
      return;
    }
    setIsBaking(true);
    try {
      const finalImage = await bakeFinalImage();
      navigate("/review-design", {
        state: { ...productInfo, image: finalImage, boxColor, contrast, recolor, inverted, zoom, rotation, position },
      });
    } catch {
      navigate("/review-design", {
        state: { ...productInfo, image: uploadedImage, boxColor, contrast, recolor, inverted, zoom, rotation, position },
      });
    } finally {
      setIsBaking(false);
    }
  };

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#FAFAF8", minHeight: "100vh" }}>
      {/* ============ SECTION A — TOP BAR ============ */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-3 sticky top-0 z-40"
        style={{ background: C.white, borderBottom: "1px solid rgba(11,27,58,0.08)" }}
      >
        <div className="flex items-center gap-3 sm:gap-5">
          <Link to="/" className="flex h-8 w-8 items-center justify-center rounded-full font-bold text-[13px]" style={{ background: C.navy, color: C.goldLight }}>
            V
          </Link>
          <span className="hidden sm:block text-[15px] font-bold" style={{ color: C.ink }}>
            {productInfo.name}
          </span>
          <div className="hidden sm:flex items-center gap-1 pl-2" style={{ borderLeft: "1px solid rgba(11,27,58,0.12)" }}>
            <button className="flex h-8 w-8 items-center justify-center rounded-md opacity-40">
              <Undo2 size={16} style={{ color: C.ink }} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-md opacity-40">
              <Redo2 size={16} style={{ color: C.ink }} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <button className="hidden sm:flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: C.ink }}>
            <Eye size={16} />
            Preview
          </button>
          <span className="text-[14px] font-bold" style={{ color: C.navy }}>
            ₹{((productInfo.unitPrice || 0) * (productInfo.qty || 1)).toLocaleString("en-IN")}.00
          </span>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleNext}
            disabled={isBaking}
            className="rounded-full px-4 sm:px-5 py-2 text-[13px] font-semibold disabled:opacity-60"
            style={{ background: C.navy, color: C.goldLight }}
          >
            {isBaking ? "Preparing..." : "Next"}
          </motion.button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* ============ SECTION B — LEFT TOOL PANEL ============ */}
        <div className="flex lg:flex-col lg:w-24 shrink-0 border-b lg:border-b-0 lg:border-r" style={{ borderColor: "rgba(11,27,58,0.08)", background: C.white }}>
          {TOOLS.map((t) => {
            const Icon = t.icon;
            const active = activeTool === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTool(t.id)}
                className="flex flex-1 lg:flex-none flex-col items-center justify-center gap-1.5 py-4"
                style={{ background: active ? "rgba(201,162,39,0.1)" : "transparent", borderRight: active ? `2px solid ${C.gold}` : "2px solid transparent" }}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ background: active ? C.gold : "#F1F0EC", color: active ? C.navy : "#7A8092" }}
                >
                  <Icon size={17} />
                </span>
                <span className="text-[11px] font-medium" style={{ color: active ? C.navy : "#7A8092" }}>
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tool sub-panel */}
        <div className="w-full lg:w-72 shrink-0 p-5" style={{ background: C.white, borderRight: "1px solid rgba(11,27,58,0.08)" }}>
          {/* ---- Box / basket color — separate from the design's own color ---- */}
          <div className="mb-6 pb-6" style={{ borderBottom: "1px solid rgba(11,27,58,0.08)" }}>
            <h3 className="text-[13px] font-bold mb-1" style={{ color: C.ink }}>
              Box Color
            </h3>
            <p className="text-[11.5px] mb-3" style={{ color: "#7A8092" }}>
              Choose the box/basket's own color
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              {BOX_COLORS.map((c) => {
                const active = boxColor === c.hex;
                return (
                  <button key={c.id} onClick={() => setBoxColor(c.hex)} title={c.label} className="flex flex-col items-center gap-1">
                    <span
                      className="relative flex h-8 w-8 items-center justify-center rounded-full"
                      style={{ background: c.hex, border: active ? `3px solid ${C.gold}` : "3px solid transparent", boxShadow: "0 0 0 1px rgba(11,27,58,0.15)" }}
                    >
                      {active && <Check size={13} style={{ color: c.id === "yellow" ? C.navy : C.white }} />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {activeTool === "uploads" && (
            <>
              <h3 className="text-[16px] font-bold mb-3" style={{ color: C.ink }}>
                Uploads
              </h3>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-[13.5px] font-semibold"
                style={{ background: C.gold, color: C.navy }}
              >
                <Plus size={16} />
                Upload Image
              </motion.button>
              <p className="mt-3 text-[12px] leading-relaxed" style={{ color: "#7A8092" }}>
                Or drag and drop an image straight onto the box on the right. PNG or JPG, up to 25MB.
              </p>
              {uploadedImage && (
                <p className="mt-2 text-[12px] leading-relaxed font-medium" style={{ color: C.navy }}>
                  Tip: click and drag the logo on the box to move it — center, left, right, wherever you want.
                </p>
              )}
            </>
          )}

          {activeTool === "text" && (
            <>
              <h3 className="text-[16px] font-bold mb-3" style={{ color: C.ink }}>
                Text
              </h3>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-[13.5px] font-semibold" style={{ background: "#EFEDE7", color: C.ink }}>
                <Plus size={16} />
                Add text
              </button>
            </>
          )}

          {activeTool === "graphics" && (
            <>
              <h3 className="text-[16px] font-bold mb-3" style={{ color: C.ink }}>
                Graphics
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square rounded-lg flex items-center justify-center" style={{ background: "#EFEDE7" }}>
                    <Shapes size={16} style={{ color: "#B8BCC2" }} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ============ SECTION C — CANVAS (3D box/cuboid preview) ============ */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 relative" style={{ minHeight: "70vh" }}>
          <div className="relative w-full max-w-xl" style={{ paddingTop: 36, paddingRight: 36 }}>
            {/* TOP face — gives the cuboid its 3D "lid" look */}
            <div
              className="absolute rounded-sm"
              style={{
                top: 0,
                left: 18,
                right: 54,
                height: 36,
                background: shade(boxColor, 22),
                transform: "skewX(-38deg)",
                transformOrigin: "bottom left",
              }}
            />
            {/* SIDE face — gives the cuboid its depth on the right */}
            <div
              className="absolute rounded-sm"
              style={{
                top: 18,
                right: 0,
                bottom: 36,
                width: 36,
                background: shade(boxColor, -22),
                transform: "skewY(-38deg)",
                transformOrigin: "top left",
              }}
            />

            {/* FRONT face — this is the actual design/upload area, unchanged logic */}
            <div
              className="relative w-full overflow-hidden rounded-md"
              style={{
                aspectRatio: "16 / 10",
                background: boxColor,
                boxShadow: "0 16px 36px rgba(11,27,58,0.22)",
              }}
            >
              {/* guide labels */}
              <span className="absolute top-3 right-24 rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ background: "rgba(47,125,70,0.15)", color: "#2F7D46" }}>
                Safety Area
              </span>
              <span className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ background: "rgba(11,27,58,0.1)", color: C.navy }}>
                Bleed
              </span>

              {/* safe area / drop zone */}
              <div
                ref={safeAreaRef}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                className="absolute inset-[14%] rounded-sm flex items-center justify-center overflow-hidden"
                style={{ border: `2px dashed ${dragOver ? C.gold : "#7FB8D9"}`, background: dragOver ? "rgba(201,162,39,0.12)" : "transparent" }}
              >
                {!uploadedImage ? (
                  <div className="flex flex-col items-center gap-2 text-center px-4">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold"
                      style={{ background: C.white, color: C.ink }}
                    >
                      <UploadCloud size={16} />
                      Upload design
                    </button>
                    <span className="text-[12.5px]" style={{ color: C.white, textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}>
                      or drag and drop here
                    </span>
                  </div>
                ) : (
                  <div className="relative h-full w-full group flex items-center justify-center">
                    <img
                      src={uploadedImage}
                      alt="Your design"
                      draggable={false}
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      className="max-h-full max-w-full object-contain select-none"
                      style={{
                        filter: `contrast(${contrast}%) ${inverted ? "invert(1)" : ""}`,
                        transform: `translate(${position.x}px, ${position.y}px) scale(${zoom / 100}) rotate(${rotation}deg)`,
                        transition: isDragging ? "none" : "transform 0.2s ease",
                        cursor: isDragging ? "grabbing" : "grab",
                        touchAction: "none",
                      }}
                    />
                    {recolor && (
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: recolor,
                          mixBlendMode: "color",
                          opacity: 0.85,
                          transform: `translate(${position.x}px, ${position.y}px) scale(${zoom / 100}) rotate(${rotation}deg)`,
                          transition: isDragging ? "none" : "transform 0.2s ease",
                        }}
                      />
                    )}
                    {!isDragging && (
                      <span
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-1 text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                        style={{ background: "rgba(11,27,58,0.7)", color: C.white }}
                      >
                        Drag to move
                      </span>
                    )}
                    <div className="absolute top-2 right-2 flex gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setShowAdjust(true)}
                        className="flex h-8 w-8 sm:h-7 sm:w-7 items-center justify-center rounded-full"
                        style={{ background: "rgba(11,27,58,0.8)", color: C.white }}
                      >
                        <Settings size={14} />
                      </button>
                      <button
                        onClick={removeImage}
                        className="flex h-8 w-8 sm:h-7 sm:w-7 items-center justify-center rounded-full"
                        style={{ background: "rgba(122,31,43,0.85)", color: C.white }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px]" style={{ color: "#9CA0AA" }}>
              <span>3cm</span>
              <span>8cm</span>
            </div>
          </div>

          {/* ============ SECTION D — ZOOM + ROTATE BAR ============ */}
          <div
            className="mt-6 flex items-center gap-3 rounded-full px-4 py-2"
            style={{ background: C.white, boxShadow: "0 4px 16px rgba(11,27,58,0.12)" }}
          >
            <button onClick={() => setZoom((z) => Math.max(50, z - 10))} className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "#F1F0EC" }}>
              <Minus size={13} style={{ color: C.ink }} />
            </button>
            <span className="text-[12.5px] font-semibold w-10 text-center" style={{ color: C.ink }}>
              {zoom}%
            </span>
            <button onClick={() => setZoom((z) => Math.min(200, z + 10))} className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "#F1F0EC" }}>
              <Plus size={13} style={{ color: C.ink }} />
            </button>

            <div className="w-px h-5" style={{ background: "rgba(11,27,58,0.12)" }} />

            <button onClick={rotateLeft} title="Rotate left" className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "#F1F0EC" }}>
              <RotateCcw size={13} style={{ color: C.ink }} />
            </button>
            <span className="text-[12.5px] font-semibold w-9 text-center" style={{ color: C.ink }}>
              {rotation % 360}°
            </span>
            <button onClick={rotateRight} title="Rotate right" className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "#F1F0EC" }}>
              <RotateCw size={13} style={{ color: C.ink }} />
            </button>

            <div className="w-px h-5" style={{ background: "rgba(11,27,58,0.12)" }} />
            <button onClick={resetTransform} title="Reset zoom, rotation & position" className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "#F1F0EC" }}>
              <Settings size={13} style={{ color: C.ink }} />
            </button>
          </div>
        </div>
      </div>

      {/* ============ SECTION E — ADJUST IMAGE MODAL ============ */}
      <AnimatePresence>
        {showAdjust && uploadedImage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdjust(false)}
              className="fixed inset-0 z-[60]"
              style={{ background: "rgba(7,18,39,0.55)" }}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="fixed left-1/2 top-1/2 z-[70] -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-md rounded-2xl p-6"
              style={{ background: C.white }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[19px] font-bold" style={{ color: C.ink }}>
                  Adjust image
                </h3>
                <button onClick={() => setShowAdjust(false)}>
                  <X size={18} style={{ color: "#7A8092" }} />
                </button>
              </div>

              {/* Contrast */}
              <div className="mb-5">
                <p className="flex items-center gap-1.5 text-[13px] font-semibold mb-2" style={{ color: C.ink }}>
                  <Contrast size={14} />
                  Contrast
                </p>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: C.navy }}
                />
              </div>

              {/* Rotate */}
              <div className="mb-5">
                <p className="flex items-center gap-1.5 text-[13px] font-semibold mb-2" style={{ color: C.ink }}>
                  <RotateCw size={14} />
                  Rotate design
                </p>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={rotateLeft}
                    className="flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-[12.5px] font-semibold"
                    style={{ background: "#F1F0EC", color: C.ink }}
                  >
                    <RotateCcw size={13} />
                    Left
                  </button>
                  <button
                    onClick={rotateRight}
                    className="flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-[12.5px] font-semibold"
                    style={{ background: "#F1F0EC", color: C.ink }}
                  >
                    <RotateCw size={13} />
                    Right
                  </button>
                  <span className="text-[12.5px] font-semibold ml-auto" style={{ color: "#7A8092" }}>
                    {rotation % 360}°
                  </span>
                </div>
              </div>

              {/* Recolor design */}
              <div className="mb-5 rounded-xl p-3.5" style={{ background: "#F7F5F1", border: "1px solid rgba(11,27,58,0.08)" }}>
                <p className="flex items-center gap-1.5 text-[13px] font-semibold mb-1" style={{ color: C.ink }}>
                  <Palette size={14} />
                  Change design color
                </p>
                <p className="text-[11.5px] mb-3" style={{ color: "#7A8092" }}>
                  Tap a swatch to recolor your uploaded design
                </p>
                <div className="flex items-center gap-3">
                  {RECOLOR_SWATCHES.map((s) => {
                    const active = recolor === s.hex;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setRecolor(active ? null : s.hex)}
                        title={s.label}
                        className="flex flex-col items-center gap-1"
                      >
                        <span
                          className="relative flex h-9 w-9 items-center justify-center rounded-full"
                          style={{
                            background: s.hex,
                            border: active ? `3px solid ${C.gold}` : "3px solid transparent",
                            boxShadow: "0 0 0 1px rgba(11,27,58,0.15)",
                          }}
                        >
                          {active && <Check size={14} style={{ color: C.white }} />}
                        </span>
                        <span className="text-[10px] font-medium" style={{ color: active ? C.navy : "#9CA0AA" }}>
                          {s.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Invert + reset */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setInverted((v) => !v)}
                  className="flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-[12.5px] font-semibold"
                  style={{ background: inverted ? C.navy : "#F1F0EC", color: inverted ? C.goldLight : C.ink }}
                >
                  Invert colors
                </button>
                <button
                  onClick={() => { resetAdjustments(); resetTransform(); }}
                  className="flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-[12.5px] font-semibold"
                  style={{ background: "#F1F0EC", color: C.ink }}
                >
                  <RotateCcw size={13} />
                  Reset all
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAdjust(false)}
                className="mt-6 w-full rounded-full py-3 text-[13.5px] font-semibold"
                style={{ background: C.gold, color: C.navy }}
              >
                Done
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ---- Warning toast: no design uploaded yet ---- */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full px-5 py-3 text-[13px] font-semibold"
            style={{ background: C.maroon, color: C.white, boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
          >
            Please upload a design before continuing
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}