import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const technologies = [
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "Sass", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg" },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
  { name: "MUI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg" },
  { name: "Golang", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { name: "Razorpay", icon: "inline-razorpay" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
];

const RazorpayIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 640 640" className={className} aria-label="Razorpay" role="img">
    <g fill="none" fillRule="evenodd">
      <path fill="#3395FF" d="M299.6 262.7l-15.7 58 90-58.3-59 220h60l87-325" />
      <path fill="#072654" className="dark:fill-white" d="M202.6 390l-24.8 92.4h122.7l50.2-188-148 95.5" />
    </g>
  </svg>
);

const TechStackSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDown: false, startX: 0, startScroll: 0 });
  const pauseRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  // Auto-scroll infinite marquee (rAF) + seamless wrap
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    const SPEED = 55; // px per second

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!dragState.current.isDown && !pauseRef.current) {
        el.scrollLeft += SPEED * dt;
        // seamless wrap: content is duplicated 2x, wrap at half
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    dragState.current.isDown = true;
    dragState.current.startX = e.clientX;
    dragState.current.startScroll = el.scrollLeft;
    setIsDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el || !dragState.current.isDown) return;
    const dx = e.clientX - dragState.current.startX;
    el.scrollLeft = dragState.current.startScroll - dx;
    // wrap both directions for infinite feel while dragging
    const half = el.scrollWidth / 2;
    if (half > 0) {
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      else if (el.scrollLeft < 0) el.scrollLeft += half;
    }
  };

  const endDrag = () => {
    dragState.current.isDown = false;
    setIsDragging(false);
  };

  // 2x duplication is enough for the half-wrap trick; use 4x on wide screens
  // by rendering 2 sets and letting wrap handle it — render 2 copies here,
  // but ensure min width by repeating until it overflows (4 copies total).
  const loopItems = [...technologies, ...technologies, ...technologies, ...technologies];

  return (
    <div className="w-full py-6 border-t border-b border-foreground/10 bg-foreground/[0.02] flex flex-col items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full overflow-hidden relative flex items-center"
      >
        {/* Gradients to fade edges */}
        <div className="absolute left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Cursor drag-enabled infinite marquee — no arrows */}
        <div
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={() => { if (!dragState.current.isDown) pauseRef.current = false; }}
          onMouseEnter={() => { pauseRef.current = true; }}
          onMouseLeave={() => { pauseRef.current = false; }}
          className={`flex w-full overflow-hidden whitespace-nowrap items-center py-1 gap-0 select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ touchAction: "pan-y", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {loopItems.map((tech, i) => (
            <div 
              key={`${tech.name}-${i}`} 
              onDragStart={(e) => e.preventDefault()}
              className="mx-3 px-5 py-2.5 rounded-full border border-foreground/10 bg-background/80 text-foreground font-medium text-sm flex items-center gap-3 transition-[border-color,background-color,transform] hover:scale-105 hover:border-primary/50 hover:bg-foreground/5 shadow-sm group shrink-0"
            >
              {tech.icon === "inline-razorpay" ? (
                <RazorpayIcon className="w-5 h-5 object-contain group-hover:scale-110 transition-transform duration-300 shrink-0 pointer-events-none" />
              ) : (
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-5 h-5 object-contain group-hover:scale-110 transition-transform duration-300 dark:invert-0 shrink-0 pointer-events-none" 
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              )}
              <span className="tracking-wide text-xs md:text-sm pointer-events-none">{tech.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TechStackSection;
