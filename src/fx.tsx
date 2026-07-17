import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
  animate,
  useReducedMotion,
} from "framer-motion";

/* ---------- Custom cursor ---------- */
export function Cursor() {
  const reduced = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.8 });
  const ringY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.8 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.body.classList.add("custom-cursor-active");
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [data-hover]"));
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [reduced, x, y]);

  if (reduced) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[100] pointer-events-none rounded-full bg-[#1FCE8A]"
        style={{
          x,
          y,
          width: 8,
          height: 8,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      />
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[100] pointer-events-none rounded-full border border-[#1FCE8A]"
        animate={{ scale: hovering ? 2.4 : 1, opacity: visible ? (hovering ? 0.9 : 0.5) : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        style={{
          x: ringX,
          y: ringY,
          width: 36,
          height: 36,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}

/* ---------- Magnetic wrapper ---------- */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={"inline-block " + className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Reveal on scroll (clip-path wipe) ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  once = true,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Per-line masked reveal for big titles ---------- */
export function MaskedLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={"block overflow-hidden " + className}>
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ---------- Count up ---------- */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className = "",
  decimals = 0,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduced) {
      ref.current.textContent = prefix + to.toFixed(decimals) + suffix;
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current)
          ref.current.textContent = prefix + v.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, prefix, suffix, duration, reduced, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

/* ---------- Infinite marquee ---------- */
export function Marquee({
  children,
  speed = 30,
  className = "",
  reverse = false,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  reverse?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <div className={"overflow-hidden whitespace-nowrap " + className}>
      <motion.div
        className="inline-flex will-change-transform"
        animate={reduced ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        <div className="inline-flex shrink-0">{children}</div>
        <div className="inline-flex shrink-0" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Ember / steam particle canvas ---------- */
export function Embers({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let W = 0,
      H = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type P = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      life: number;
      max: number;
      hot: boolean;
    };
    const parts: P[] = [];
    const spawn = () => {
      const hot = Math.random() < 0.4;
      parts.push({
        x: Math.random() * W,
        y: H + 10,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(0.4 + Math.random() * 1.1),
        r: hot ? 1 + Math.random() * 2 : 8 + Math.random() * 22,
        life: 0,
        max: 260 + Math.random() * 200,
        hot,
      });
    };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      if (parts.length < 70 && Math.random() < 0.5) spawn();
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life++;
        p.x += p.vx + Math.sin((p.life + p.y) * 0.01) * 0.25;
        p.y += p.vy;
        const t = p.life / p.max;
        const a = Math.sin(Math.PI * Math.min(t, 1));
        if (p.hot) {
          ctx.fillStyle = `rgba(31, 206, 138, ${0.55 * a})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          g.addColorStop(0, `rgba(242, 247, 245, ${0.05 * a})`);
          g.addColorStop(1, "rgba(242, 247, 245, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        if (t >= 1 || p.y < -30) parts.splice(i, 1);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={"pointer-events-none absolute inset-0 h-full w-full " + className}
    />
  );
}
