import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useVelocity,
  useInView,
  useReducedMotion,
  animate,
} from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

/* ================= CURSOR SYSTEM =================
   Multi-layer custom cursor:
   - core dot (instant)
   - spring ring (lags, morphs per data-cursor state)
   - contextual label ("Voir", "Lire", …)
   - canvas particle trail + click burst
   States via data-cursor / data-cursor-label attributes. */
export function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState({ mode: "default", label: "" });
  const [pressed, setPressed] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const rx = useSpring(mx, { stiffness: 260, damping: 24, mass: 0.6 });
  const ry = useSpring(my, { stiffness: 260, damping: 24, mass: 0.6 });

  const canvasRef = useRef(null);
  const particles = useRef([]);
  const raf = useRef(0);
  const last = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("cursor-on");
    return () => document.body.classList.remove("cursor-on");
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!reduced) {
        const dx = e.clientX - last.current.x;
        const dy = e.clientY - last.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 6 && particles.current.length < 90) {
          particles.current.push({
            x: e.clientX + (Math.random() - 0.5) * 6,
            y: e.clientY + (Math.random() - 0.5) * 6,
            vx: -dx * 0.06 + (Math.random() - 0.5) * 0.7,
            vy: -dy * 0.06 - Math.random() * 0.6,
            life: 1,
            r: 1 + Math.random() * 2.2,
          });
          last.current = { x: e.clientX, y: e.clientY };
        }
      }
    };

    const over = (e) => {
      const el = e.target.closest("[data-cursor]");
      if (el) {
        setState({
          mode: el.getAttribute("data-cursor") || "link",
          label: el.getAttribute("data-cursor-label") || "",
        });
      } else if (e.target.closest("a, button, input, textarea, label, [role='button']")) {
        setState({ mode: "link", label: "" });
      } else {
        setState({ mode: "default", label: "" });
      }
    };

    const down = (e) => {
      setPressed(true);
      if (!reduced) {
        for (let i = 0; i < 14; i++) {
          const a = (Math.PI * 2 * i) / 14 + Math.random() * 0.4;
          const s = 2 + Math.random() * 3.5;
          particles.current.push({
            x: e.clientX,
            y: e.clientY,
            vx: Math.cos(a) * s,
            vy: Math.sin(a) * s,
            life: 1,
            r: 1.5 + Math.random() * 2.5,
          });
        }
      }
    };
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseover", over);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, reduced, mx, my]);

  // particle trail loop
  useEffect(() => {
    if (!enabled || reduced) return;
    const cv = canvasRef.current;
    const ctx = cv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = () => {
      cv.width = window.innerWidth * dpr;
      cv.height = window.innerHeight * dpr;
    };
    size();
    window.addEventListener("resize", size);
    const loop = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      particles.current = particles.current.filter((p) => p.life > 0.02);
      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.015;
        p.life *= 0.94;
        ctx.globalAlpha = p.life * 0.85;
        ctx.fillStyle = "#1FCE8A";
        ctx.beginPath();
        ctx.arc(p.x * dpr, p.y * dpr, p.r * p.life * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", size);
    };
  }, [enabled, reduced]);

  if (!enabled) return null;

  const big = state.mode === "view";
  const ringSize = big ? 96 : state.mode === "link" ? 58 : 36;

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 998, pointerEvents: "none" }}
      />
      {/* spring ring / label */}
      <motion.div
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 999,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          mixBlendMode: big ? "normal" : "difference",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          scale: pressed ? 0.75 : 1,
          backgroundColor: big ? "#1FCE8A" : "rgba(31,206,138,0)",
          border: big ? "1.5px solid rgba(31,206,138,0)" : "1.5px solid rgba(242,247,245,0.9)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        <motion.span
          animate={{ opacity: big ? 1 : 0, scale: big ? 1 : 0.5 }}
          transition={{ duration: 0.25 }}
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#0A1212",
            whiteSpace: "nowrap",
          }}
        >
          {state.label}
        </motion.span>
      </motion.div>
      {/* core dot */}
      <motion.div
        style={{
          x: mx,
          y: my,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          pointerEvents: "none",
          borderRadius: "50%",
          background: "#1FCE8A",
        }}
        animate={{ width: pressed ? 14 : big ? 0 : 7, height: pressed ? 14 : big ? 0 : 7 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}

/* ================= MAGNETIC ================= */
export function Magnetic({ children, strength = 0.35, className, style }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });
  const reduced = useReducedMotion();

  const onMove = useCallback(
    (e) => {
      if (reduced) return;
      const r = ref.current.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * strength);
      y.set((e.clientY - (r.top + r.height / 2)) * strength);
    },
    [x, y, strength, reduced]
  );
  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x, y, display: "inline-block", ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ================= REVEALS ================= */
export function Reveal({ children, delay = 0, y = 50, className, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function MaskedLine({ children, delay = 0 }) {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "110%", rotate: 2 }}
        whileInView={{ y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ================= COUNT UP ================= */
export function CountUp({ to, prefix = "", suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (x) => setV(Math.round(x)),
    });
    return () => c.stop();
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {v}
      {suffix}
    </span>
  );
}

/* ================= SCRAMBLE TEXT ================= */
const GLYPHS = "!<>-_\\/[]{}—=+*^?#";
export function Scramble({ text, as: Tag = "span", trigger = "hover", className, style }) {
  const [out, setOut] = useState(text);
  const frame = useRef(0);
  const raf = useRef(0);
  const reduced = useReducedMotion();

  const run = useCallback(() => {
    if (reduced) return;
    cancelAnimationFrame(raf.current);
    frame.current = 0;
    const total = text.length * 3 + 8;
    const step = () => {
      frame.current++;
      const p = frame.current / total;
      setOut(
        text
          .split("")
          .map((c, i) => {
            if (c === " ") return " ";
            if (i / text.length < p * 1.4 - 0.2) return c;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      if (frame.current < total) raf.current = requestAnimationFrame(step);
      else setOut(text);
    };
    raf.current = requestAnimationFrame(step);
  }, [text, reduced]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <Tag
      className={className}
      style={style}
      onMouseEnter={trigger === "hover" ? run : undefined}
    >
      {out}
    </Tag>
  );
}

/* ================= MARQUEE (velocity-reactive) ================= */
export function Marquee({ children, baseSpeed = 60, className, style }) {
  const x = useRef(0);
  const el = useRef(null);
  const raf = useRef(0);
  const { scrollY } = useScroll();
  const vel = useVelocity(scrollY);
  const smooth = useSpring(vel, { stiffness: 60, damping: 18 });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let lastT = performance.now();
    const loop = (t) => {
      const dt = (t - lastT) / 1000;
      lastT = t;
      const boost = 1 + Math.min(Math.abs(smooth.get()) / 900, 3);
      x.current -= baseSpeed * boost * dt;
      const w = el.current ? el.current.scrollWidth / 2 : 1000;
      if (x.current <= -w) x.current += w;
      if (el.current) el.current.style.transform = `translateX(${x.current}px)`;
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [baseSpeed, smooth, reduced]);

  return (
    <div className={className} style={{ overflow: "hidden", whiteSpace: "nowrap", ...style }}>
      <div ref={el} style={{ display: "inline-flex", willChange: "transform" }}>
        <span style={{ display: "inline-flex" }}>{children}</span>
        <span style={{ display: "inline-flex" }} aria-hidden>
          {children}
        </span>
      </div>
    </div>
  );
}

/* ================= 3D TILT ================= */
export function Tilt({ children, max = 10, className, style }) {
  const ref = useRef(null);
  const rX = useSpring(0, { stiffness: 160, damping: 18 });
  const rY = useSpring(0, { stiffness: 160, damping: 18 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const reduced = useReducedMotion();

  const onMove = (e) => {
    if (reduced) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rY.set((px - 0.5) * max * 2);
    rX.set((0.5 - py) * max * 2);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };
  const onLeave = () => {
    rX.set(0);
    rY.set(0);
  };

  const glow = useTransform(
    [glowX, glowY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(31,206,138,0.14) 0%, rgba(31,206,138,0) 55%)`
  );

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d", perspective: 900, position: "relative", ...style }}
      className={className}
    >
      <motion.div
        aria-hidden
        style={{ position: "absolute", inset: 0, background: glow, pointerEvents: "none", zIndex: 2 }}
      />
      {children}
    </motion.div>
  );
}

/* ================= EMBERS / STEAM FIELD ================= */
export function Embers({ density = 60, interactive = true }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const cv = ref.current;
    const ctx = cv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W, H;
    const mouse = { x: -9999, y: -9999 };
    const size = () => {
      const r = cv.parentElement.getBoundingClientRect();
      W = r.width;
      H = r.height;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const ps = Array.from({ length: density }, () => ({
      x: Math.random() * (W || 1200),
      y: Math.random() * (H || 800),
      vx: (Math.random() - 0.5) * 0.25,
      vy: -0.2 - Math.random() * 0.55,
      r: 0.6 + Math.random() * 1.9,
      o: 0.15 + Math.random() * 0.5,
      tw: Math.random() * Math.PI * 2,
    }));
    const onMove = (e) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    if (interactive) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", size);
    let raf;
    const loop = (t) => {
      ctx.clearRect(0, 0, W, H);
      for (const p of ps) {
        // gentle mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 16000) {
          const d = Math.sqrt(d2) || 1;
          p.vx += (dx / d) * 0.12;
          p.vy += (dy / d) * 0.12;
        }
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 - 0.004;
        p.x += p.vx + Math.sin(t / 1600 + p.tw) * 0.18;
        p.y += p.vy;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; p.vy = -0.2 - Math.random() * 0.55; }
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        const flicker = 0.75 + Math.sin(t / 300 + p.tw * 3) * 0.25;
        ctx.globalAlpha = p.o * flicker;
        ctx.fillStyle = "#1FCE8A";
        ctx.shadowColor = "#1FCE8A";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      if (interactive) window.removeEventListener("pointermove", onMove);
    };
  }, [density, interactive, reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}
