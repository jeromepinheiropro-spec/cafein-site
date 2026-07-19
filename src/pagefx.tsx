import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useVelocity, useSpring as useFmSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Plus, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Magnetic, Reveal, MaskedLine, Marquee } from "./fx";

export const EASE = [0.22, 1, 0.36, 1] as const;



/* ---------- Texte "scramble" (décodage) ---------- */
export function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const { ref, seen } = useSeen("-40px");
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!seen) return;
    const chars = "#%&@$AKXZRW";
    let frame = 0;
    const total = Math.max(18, text.length * 2);
    const iv = window.setInterval(() => {
      frame++;
      const reveal = Math.floor((frame / total) * text.length);
      setOut(
        text
          .split("")
          .map((c, i) => (c === " " ? " " : i <= reveal ? c : chars[Math.floor(Math.random() * chars.length)]))
          .join("")
      );
      if (frame >= total) {
        setOut(text);
        clearInterval(iv);
      }
    }, 35);
    return () => clearInterval(iv);
  }, [seen, text]);
  return (
    <span ref={ref as never} className={className}>
      {out}
    </span>
  );
}

/* ---------- Coins "viseur" ---------- */
export function Corners() {
  return (
    <>
      {["-top-[5px] -left-[5px]", "-top-[5px] -right-[5px]", "-bottom-[5px] -left-[5px]", "-bottom-[5px] -right-[5px]"].map(
        (pos) => (
          <span
            key={pos}
            aria-hidden
            className={"pointer-events-none absolute z-10 select-none text-xs leading-none text-[#1FCE8A] " + pos}
          >
            +
          </span>
        )
      )}
    </>
  );
}

/* ---------- Marquee de titre géant ---------- */
export function GiantMarquee({ word }: { word: string }) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skew = useFmSpring(useTransform(velocity, [-1600, 1600], [6, -6]), {
    stiffness: 120,
    damping: 25,
  });
  return (
    <section className="overflow-hidden border-t border-[#22302B] py-8 md:py-12">
      <motion.div style={{ skewX: skew }}>
      <Marquee speed={30}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="font-display mx-6 inline-flex items-center gap-10 text-7xl uppercase leading-none md:text-[9rem]"
          >
            <span className={i % 2 ? "text-stroke" : "text-[#F2F7F5]"}>{word}</span>
            <span className="text-4xl text-[#1FCE8A] md:text-6xl">✦</span>
          </span>
        ))}
      </Marquee>
      </motion.div>
    </section>
  );
}

/* ---------- Halos lumineux animés ---------- */
export function Glow({ variant = 0 }: { variant?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ x: [0, 60, -40, 0], y: [0, -50, 30, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#1FCE8A]/[0.14] blur-[110px]"
      />
      <motion.div
        animate={{ x: [0, -70, 40, 0], y: [0, 40, -40, 0] }}
        transition={{ repeat: Infinity, duration: 22, ease: "easeInOut", delay: variant }}
        className="absolute right-[-140px] top-1/4 h-[380px] w-[380px] rounded-full bg-[#0A9A62]/[0.13] blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, 50, -30, 0], y: [0, -30, 50, 0] }}
        transition={{ repeat: Infinity, duration: 26, ease: "easeInOut", delay: variant * 2 }}
        className="absolute bottom-[-160px] left-1/3 h-[360px] w-[360px] rounded-full bg-[#F2F7F5]/[0.05] blur-[120px]"
      />
    </div>
  );
}

/* ---------- Page hero (shared) ---------- */
export function PageHero({
  label,
  title,
  intro,
  watermark,
  number,
  children,
}: {
  label: string;
  title: React.ReactNode;
  intro: string;
  watermark?: string;
  number?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-32 md:px-12 md:pb-24 md:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(242,247,245,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(242,247,245,0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 90% 70% at 40% 30%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 40% 30%, black 30%, transparent 75%)",
        }}
      />
      <Glow />
      {number && (
        <motion.span
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
          aria-hidden
          className="font-display pointer-events-none absolute bottom-6 right-6 select-none text-8xl leading-none text-[#1FCE8A]/15 md:right-12 md:text-[12rem]"
        >
          {number}
        </motion.span>
      )}
      {watermark && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 0.7, x: 0 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="font-display text-stroke pointer-events-none absolute -right-8 top-20 hidden select-none text-[15vw] uppercase leading-none md:block"
        >
          {watermark}
        </motion.div>
      )}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#1FCE8A]"
        >
          <span className="h-[2px] w-10 bg-[#1FCE8A]" />
          <ScrambleText text={label} />
        </motion.div>
        <h1 className="font-display mt-8 max-w-5xl text-5xl uppercase leading-[0.95] text-[#F2F7F5] md:text-[6.5vw]">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            >
              {title}
            </motion.span>
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-[#8FA39C] md:text-xl"
        >
          {intro}
        </motion.p>
        {children}
      </div>
    </section>
  );
}

/* ---------- Feature card with list ---------- */
export function OfferCard({
  tag,
  title,
  desc,
  items,
  accent = false,
  delay = 0,
}: {
  tag: string;
  title: string;
  desc: string;
  items: string[];
  accent?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({
      x: ((e.clientY - r.top) / r.height - 0.5) * -6,
      y: ((e.clientX - r.left) / r.width - 0.5) * 6,
    });
  };

  return (
    <Reveal delay={delay}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformPerspective: 900 }}
        className={
          "relative h-full border p-8 transition-[box-shadow,border-color] duration-500 hover:border-[#1FCE8A]/70 hover:shadow-[0_0_70px_rgba(31,206,138,0.18)] md:p-10 " +
          (accent ? "border-[#1FCE8A] bg-[#0E1F1A]" : "border-[#22302B] bg-[#101B18]")
        }
        data-hover
      >
        <Corners />
        <span
          className={
            "inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] " +
            (accent ? "bg-[#1FCE8A] text-[#0A1212]" : "border border-[#32423C] text-[#8FA39C]")
          }
        >
          {tag}
        </span>
        <h3 className="font-display mt-6 text-3xl uppercase text-[#F2F7F5] md:text-4xl">{title}</h3>
        <p className="mt-4 leading-relaxed text-[#8FA39C]">{desc}</p>
        <ul className="mt-8 space-y-4">
          {items.map((it) => (
            <li key={it} className="flex items-start gap-3 text-[#F2F7F5]">
              <Plus className="mt-1 h-4 w-4 shrink-0 text-[#1FCE8A]" />
              <span className="leading-snug">{it}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </Reveal>
  );
}

/* ---------- Checklist grid ---------- */
export function Checklist({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="border-y border-[#22302B] bg-[#101B18] px-6 py-16 md:px-12 md:py-24">
      <MaskedLine>
        <h2 className="font-display text-3xl uppercase text-[#F2F7F5] md:text-5xl">{title}</h2>
      </MaskedLine>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it} delay={i * 0.06}>
            <div className="flex items-center gap-4 border border-[#22302B] bg-[#0A1212] px-5 py-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#1FCE8A]">
                <Check className="h-4 w-4 text-[#0A1212]" />
              </span>
              <span className="text-[#F2F7F5]">{it}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Numbered steps ---------- */
export function Steps({
  title,
  steps,
}: {
  title: string;
  steps: { n: string; t: string; d: string }[];
}) {
  return (
    <section className="px-6 py-16 md:px-12 md:py-24">
      <MaskedLine>
        <h2 className="font-display text-3xl uppercase text-[#F2F7F5] md:text-5xl">{title}</h2>
      </MaskedLine>
      <div className="mt-12 grid gap-px bg-[#22302B] md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <div className="h-full bg-[#0A1212] p-8">
              <span className="font-display text-5xl text-[#1FCE8A]">{s.n}</span>
              <h3 className="mt-6 text-xl font-semibold uppercase tracking-wide text-[#F2F7F5]">
                {s.t}
              </h3>
              <p className="mt-3 leading-relaxed text-[#8FA39C]">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- FAQ (shared) ---------- */
export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-t border-[#22302B] px-6 py-16 md:px-12 md:py-24">
      <MaskedLine>
        <h2 className="font-display text-3xl uppercase text-[#F2F7F5] md:text-5xl">
          Questions fréquentes
        </h2>
      </MaskedLine>
      <div className="mt-10 max-w-4xl">
        {faqs.map((f, i) => (
          <div key={f.q} className="border-b border-[#22302B] first:border-t">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={open === i}
            >
              <span className="text-lg font-semibold text-[#F2F7F5] md:text-xl">{f.q}</span>
              <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="shrink-0">
                <Plus className="h-5 w-5 text-[#1FCE8A]" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 leading-relaxed text-[#8FA39C]">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- CTA band (shared) ---------- */
export function CtaBand({ title, sub, button }: { title: string; sub: string; button: string }) {
  return (
    <section className="relative overflow-hidden border-t border-[#22302B] px-6 py-20 text-center md:px-12 md:py-32">
      <Glow variant={2} />
      <Reveal>
        <h2 className="font-display mx-auto max-w-4xl text-4xl uppercase leading-tight text-[#F2F7F5] md:text-6xl">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-[#8FA39C]">{sub}</p>
        <div className="mt-10 flex justify-center">
          <Magnetic>
            <Link
              to="/#contact"
              className="group inline-flex items-center gap-3 bg-[#1FCE8A] px-10 py-5 text-sm font-bold uppercase tracking-[0.25em] text-[#0A1212]"
            >
              {button}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Magnetic>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Typing text hook ---------- */
export function useTypewriter(phrases: string[], speed = 55, pause = 1600) {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    let char = 0;
    let timer: number;
    let cancelled = false;

    const type = () => {
      if (cancelled) return;
      const phrase = phrases[idx.current % phrases.length];
      if (char <= phrase.length) {
        setText(phrase.slice(0, char));
        setDone(char === phrase.length);
        char++;
        timer = window.setTimeout(type, speed);
      } else {
        timer = window.setTimeout(() => {
          char = 0;
          idx.current++;
          setDone(false);
          type();
        }, pause);
      }
    };
    type();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [phrases, speed, pause]);

  return { text, done };
}

/* ---------- In-view gate (plays demos only when visible) ---------- */
export function useSeen(margin = "-80px") {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: margin as never });
  return { ref, seen };
}

/* ---------- Meta par page (SEO) ---------- */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);
}
