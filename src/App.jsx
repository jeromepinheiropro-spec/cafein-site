import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import Lenis from "lenis";
import {
  Cursor,
  Magnetic,
  Reveal,
  MaskedLine,
  CountUp,
  Scramble,
  Marquee,
  Tilt,
  Embers,
  EASE,
} from "./fx.jsx";

/* ================= LOGO (repris du site original) ================= */
function IDot() {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {"ı"}
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#1FCE8A",
          width: "0.12em",
          height: "0.12em",
          top: "0.04em",
          borderRadius: "0.025em",
        }}
      />
    </span>
  );
}

function LeafMark({ height = 18 }) {
  return (
    <svg viewBox="0 0 30 41" style={{ height, width: "auto" }} aria-hidden fill="none">
      <path d="M0 0.558716V23.2477C0 27.7947 1.72257 32.2022 4.91942 35.4301C5.29187 35.8026 5.69536 36.1751 6.12989 36.5475C10.801 40.4739 15.9222 40.8153 17.443 40.8618V18.3902C17.443 14.2466 16.0308 10.2116 13.315 7.07675C13.1909 6.93707 13.0823 6.81292 12.9581 6.67325C8.0542 1.35019 1.62946 0.66735 0 0.558716Z" fill="#1FCE8A" />
      <path d="M29.92 7.71301V19.492C29.92 21.8509 29.0199 24.1477 27.375 25.8238C27.1732 26.0256 26.9715 26.2118 26.7542 26.398C24.3333 28.431 21.6796 28.6173 20.8882 28.6328V16.9779C20.8882 14.8363 21.6175 12.7257 23.0297 11.1117C23.0918 11.0341 23.1539 10.972 23.216 10.91C25.7455 8.11652 29.0665 7.77509 29.92 7.71301Z" fill="#F2F7F5" />
    </svg>
  );
}

function Logo({ height = 26 }) {
  return (
    <svg viewBox="0 0 213 43" style={{ height, width: "auto" }} aria-label="Cafein" role="img" fill="none">
      <path d="M68.096 42.9569C65.132 42.9569 62.4317 42.4292 60.0263 41.3739C57.6054 40.3186 55.5414 38.8288 53.8033 36.8889C52.0807 34.9646 50.7461 32.6832 49.815 30.0605C48.8839 27.4378 48.4183 24.5823 48.4183 21.4784C48.4183 18.4367 48.8684 15.6122 49.7685 13.005C50.6686 10.3978 51.9876 8.1165 53.7102 6.17661C55.4328 4.23672 57.5123 2.71585 59.9487 1.62951C62.3852 0.543173 65.1475 0 68.2047 0C70.5946 0 72.7516 0.310392 74.6915 0.931156C76.6313 1.55192 78.2918 2.42099 79.6885 3.52284C81.2559 4.76437 82.5129 6.2542 83.444 7.99234C84.3752 9.71496 84.9804 11.6083 85.2442 13.6568H78.5867C78.2918 12.0894 77.7021 10.7082 76.802 9.51322C75.9019 8.33377 74.7225 7.40262 73.2638 6.71978C71.805 6.03693 70.0824 5.69552 68.1116 5.69552C65.3492 5.69552 62.9904 6.37835 61.0661 7.75955C59.1418 9.14075 57.683 11.0186 56.6898 13.393C55.6966 15.7674 55.2155 18.4677 55.2155 21.4629C55.2155 24.5823 55.7432 27.3136 56.814 29.6725C57.8847 32.0314 59.3901 33.8782 61.3299 35.2129C63.2697 36.5475 65.551 37.2148 68.1581 37.2148C70.4549 37.2148 72.3792 36.7648 73.9156 35.8491C75.4519 34.9335 76.6468 33.723 77.4849 32.2021C78.3229 30.6813 78.835 29.0207 78.9902 27.205H85.6632C85.6166 29.2535 85.1511 31.271 84.282 33.273C83.413 35.2749 82.2181 36.9975 80.6972 38.4719C79.1609 40.0083 77.3297 41.1412 75.2346 41.8706C73.1396 42.5999 70.7653 42.9569 68.096 42.9569Z" fill="#F2F7F5" />
      <path d="M100.127 42.8017C98.2489 42.8017 96.5418 42.4758 94.9899 41.8395C93.4536 41.2032 92.2431 40.2411 91.3431 38.953C90.443 37.6649 89.9929 36.0819 89.9929 34.1731C89.9929 31.8918 90.5206 30.1381 91.5758 28.9276C92.6311 27.7016 94.1054 26.8015 95.9676 26.2273C97.8454 25.6531 100.002 25.203 102.47 24.8927C104.022 24.7064 105.341 24.4892 106.427 24.2098C107.514 23.946 108.352 23.527 108.926 22.9683C109.5 22.4096 109.795 21.6647 109.795 20.7335C109.795 19.2747 109.298 18.1108 108.289 17.2417C107.281 16.3882 105.838 15.9537 103.929 15.9537C101.756 15.9537 100.127 16.4348 99.0558 17.3814C97.9851 18.3281 97.3953 19.6162 97.3022 21.2457H91.4672C91.5603 19.5386 92.0569 17.9711 92.9725 16.5123C93.8881 15.0535 95.2382 13.8741 97.0384 12.9895C98.8386 12.0894 101.12 11.6393 103.867 11.6393C105.403 11.6393 106.8 11.7635 108.072 12.0118C109.345 12.2601 110.447 12.6791 111.409 13.2533C112.728 14.0293 113.752 15.1156 114.466 16.4968C115.18 17.878 115.537 19.5696 115.537 21.5561V34.8249C115.537 35.8802 115.692 36.6717 116.002 37.2148C116.313 37.758 116.856 38.0218 117.632 38.0218C117.818 38.0218 117.989 38.0063 118.159 37.9753C118.33 37.9442 118.485 37.9132 118.609 37.8511H118.765V42.0878C118.392 42.1965 117.927 42.3051 117.399 42.4137C116.871 42.5224 116.251 42.5689 115.537 42.5689C114.435 42.5689 113.457 42.3517 112.604 41.9171C111.75 41.4826 111.098 40.7997 110.617 39.8841C110.136 38.9685 109.919 37.7735 109.919 36.2992V35.8181L110.571 37.8822H109.981C109.096 39.2013 107.855 40.3497 106.241 41.3119C104.674 42.3206 102.625 42.8017 100.127 42.8017ZM101.818 38.4874C103.634 38.4874 105.124 38.1149 106.319 37.37C107.514 36.6251 108.414 35.694 109.003 34.5921C109.609 33.4747 109.903 32.3574 109.903 31.24V26.6308C109.453 26.9257 108.879 27.1895 108.212 27.4378C107.529 27.6861 106.815 27.9189 106.039 28.1206C105.263 28.3224 104.503 28.4931 103.742 28.6328C102.206 28.8966 100.872 29.2225 99.7697 29.5949C98.6524 29.9674 97.7988 30.4951 97.1936 31.1624C96.5884 31.8452 96.278 32.8074 96.278 34.0489C96.278 35.2129 96.5418 36.113 97.0695 36.7493C97.5971 37.3855 98.2799 37.8356 99.1334 38.0994C99.9714 38.3632 100.872 38.4874 101.818 38.4874Z" fill="#F2F7F5" />
      <path d="M125.515 42.1499V16.7917H120.922V12.2912H125.515V8.67521C125.515 7.23194 125.701 5.99041 126.058 4.95063C126.415 3.92636 126.99 3.08833 127.734 2.45205C128.526 1.76921 129.519 1.27259 130.714 0.993249C131.893 0.698386 133.259 0.558716 134.795 0.558716C135.261 0.558716 135.758 0.574242 136.254 0.589761C136.766 0.60528 137.294 0.636318 137.822 0.698394V5.52484C137.496 5.4938 137.185 5.47828 136.89 5.47828C136.596 5.47828 136.316 5.47828 136.068 5.47828C134.392 5.47828 133.228 5.72658 132.592 6.23871C131.955 6.75084 131.645 7.66647 131.645 9.00111V12.2912H137.775V16.7917H131.645V42.1499H125.515Z" fill="#F2F7F5" />
      <path d="M155.389 42.9414C152.3 42.9414 149.631 42.243 147.428 40.8308C145.208 39.434 143.517 37.5407 142.337 35.1663C141.158 32.7919 140.568 30.1381 140.568 27.2205C140.568 24.3029 141.174 21.6647 142.384 19.3058C143.595 16.9469 145.286 15.069 147.474 13.6568C149.662 12.2601 152.176 11.5462 155.063 11.5462C157.266 11.5462 159.222 11.9342 160.929 12.7101C162.636 13.4861 164.079 14.5724 165.305 15.9381C166.64 17.4435 167.633 19.2747 168.285 21.4629C168.937 23.6511 169.262 26.041 169.262 28.6638H146.714C146.853 30.495 147.288 32.109 147.986 33.5368C148.7 34.9645 149.662 36.0819 150.919 36.8889C152.176 37.6959 153.682 38.1149 155.482 38.1149C157.344 38.1149 158.896 37.7114 160.137 36.9044C161.379 36.0974 162.232 34.9956 162.698 33.5988H168.642C168.207 35.4146 167.4 37.0131 166.205 38.4098C165.01 39.8065 163.505 40.9084 161.689 41.7153C159.858 42.5379 157.763 42.9414 155.389 42.9414ZM146.791 24.6133H162.853C162.76 22.8441 162.403 21.3232 161.767 20.0507C161.131 18.7781 160.246 17.8159 159.113 17.1331C157.98 16.4502 156.63 16.1088 155.063 16.1088C153.387 16.1088 151.975 16.4813 150.826 17.2107C149.693 17.9401 148.778 18.9488 148.11 20.2059C147.443 21.4784 147.009 22.9527 146.791 24.6133Z" fill="#F2F7F5" />
      <path d="M174.446 42.1499V12.2911H180.576V42.1499H174.446Z" fill="#F2F7F5" />
      <path d="M187.28 42.1499V12.2912H193.285V16.6055H193.472C194.185 15.5347 194.977 14.6346 195.892 13.8896C196.793 13.1447 197.832 12.5705 198.981 12.167C200.145 11.7635 201.433 11.5618 202.86 11.5618C204.971 11.5618 206.787 11.9653 208.292 12.7567C209.797 13.5482 210.946 14.6966 211.768 16.202C212.575 17.7073 212.994 19.5075 212.994 21.6337V42.1499H206.911V22.5183C206.911 20.6715 206.368 19.2282 205.297 18.2039C204.226 17.1797 202.705 16.652 200.781 16.652C199.353 16.652 198.081 16.9779 196.963 17.6142C195.846 18.2505 194.977 19.1506 194.356 20.3145C193.735 21.4785 193.425 22.7976 193.425 24.303V42.1344H187.28V42.1499Z" fill="#F2F7F5" />
      <path d="M0 0.558716V23.2477C0 27.7947 1.72257 32.2022 4.91942 35.4301C5.29187 35.8026 5.69536 36.1751 6.12989 36.5475C10.801 40.4739 15.9222 40.8153 17.443 40.8618V18.3902C17.443 14.2466 16.0308 10.2116 13.315 7.07675C13.1909 6.93707 13.0823 6.81292 12.9581 6.67325C8.0542 1.35019 1.62946 0.66735 0 0.558716Z" fill="#1FCE8A" />
      <path d="M29.92 7.71301V19.492C29.92 21.8509 29.0199 24.1477 27.375 25.8238C27.1732 26.0256 26.9715 26.2118 26.7542 26.398C24.3333 28.431 21.6796 28.6173 20.8882 28.6328V16.9779C20.8882 14.8363 21.6175 12.7257 23.0297 11.1117C23.0918 11.0341 23.1539 10.972 23.216 10.91C25.7455 8.11652 29.0665 7.77509 29.92 7.71301Z" fill="#F2F7F5" />
      <path d="M180.7 0.232788H174.368V6.67322H180.7V0.232788Z" fill="#1FCE8A" />
    </svg>
  );
}

const Arrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
    <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ================= PRELOADER ================= */
function Preloader({ onDone }) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    let v = 0;
    const id = setInterval(() => {
      v += Math.floor(Math.random() * 9) + 4;
      if (v >= 100) {
        v = 100;
        clearInterval(id);
        setTimeout(onDone, 500);
      }
      setCount(v);
    }, 55);
    return () => clearInterval(id);
  }, [onDone, reduced]);

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0A1212",
        padding: "clamp(24px, 4vw, 48px)",
      }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#8FA39C", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>
        <Logo height={24} />
        <span>Luxembourg</span>
      </div>
      <div style={{ overflow: "hidden" }}>
        <motion.div
          aria-hidden
          className="display"
          style={{ fontSize: "clamp(80px, 15vw, 230px)", lineHeight: 0.9 }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          Cafe<IDot />n
        </motion.div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <span style={{ color: "#8FA39C", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>
          Marketing web — chargement
        </span>
        <span className="display" style={{ fontSize: "clamp(56px, 8vw, 120px)", color: "#1FCE8A", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
          {count}%
        </span>
      </div>
      <motion.div style={{ position: "absolute", bottom: 0, left: 0, height: 3, background: "#1FCE8A", width: `${count}%` }} />
    </motion.div>
  );
}

/* ================= NAV ================= */
function Nav() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
      style={{ position: "fixed", insetInline: 0, top: 0, zIndex: 80, mixBlendMode: "difference" }}
    >
      <nav className="px-page" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 22, paddingBottom: 22 }}>
        <a href="#top" aria-label="Cafein — accueil" data-cursor="link">
          <Logo height={26} />
        </a>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 32, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 500 }}>
          {[
            ["#services", "Services"],
            ["#process", "Méthode"],
            ["#results", "Résultats"],
            ["#blog", "Blog"],
          ].map(([href, label]) => (
            <a key={href} href={href} data-cursor="link" style={{ opacity: 0.9 }} className="nav-link">
              <Scramble text={label} />
            </a>
          ))}
          <Magnetic>
            <a href="#contact" data-cursor="link" style={{ border: "1px solid #F2F7F5", padding: "10px 20px", fontWeight: 600 }}>
              Contact
            </a>
          </Magnetic>
        </div>
      </nav>
    </motion.header>
  );
}

/* ================= HERO ================= */
const HERO_WORDS = ["sites web", "SEO & GEO", "communication", "social media"];

function WordRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % HERO_WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ display: "inline-flex", overflow: "hidden", verticalAlign: "bottom", color: "#1FCE8A" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "-110%" }}
          transition={{ duration: 0.45, ease: EASE }}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {HERO_WORDS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Hero({ started }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // mouse parallax on the big title
  const px = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const py = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 26);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 18);
  };

  const letters = ["C", "a", "f", "e", "i", "n"];

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={onMove}
      style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      <Embers density={70} />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 70% 15%, rgba(31,206,138,0.09) 0%, rgba(10,18,18,0) 55%)",
        }}
      />
      <motion.div
        style={{ y, scale, opacity: fade, position: "relative", zIndex: 10, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 110 }}
        className="px-page"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#8FA39C", fontWeight: 500 }}
        >
          <LeafMark height={16} />
          Agence basée au Luxembourg
        </motion.div>

        <motion.h1
          className="display"
          style={{ x: px, rotateY: useTransform(px, (v) => v * 0.12), display: "flex", flexWrap: "wrap", lineHeight: 0.82, letterSpacing: "-0.04em" }}
          data-cursor="view"
          data-cursor-label="Hello ☕"
        >
          <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
            Cafein — agence de communication digitale au Luxembourg : création de sites web, SEO & GEO, social media
          </span>
          {letters.map((l, i) => (
            <span key={i} style={{ display: "inline-block", overflow: "hidden" }} aria-hidden>
              <motion.span
                style={{ display: "inline-block", fontSize: "clamp(58px, 16vw, 300px)" }}
                initial={{ y: "115%", rotate: 6 }}
                animate={started ? { y: 0, rotate: 0 } : {}}
                whileHover={{ y: -14, color: "#1FCE8A", transition: { duration: 0.25 } }}
                transition={{ duration: 1, delay: 0.35 + i * 0.06, ease: EASE }}
              >
                {l === "i" ? <IDot /> : l}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <div style={{ marginTop: 44, display: "flex", flexWrap: "wrap", gap: 40, alignItems: "flex-end", justifyContent: "space-between" }}>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            style={{ fontSize: "clamp(19px, 2vw, 26px)", fontWeight: 300, lineHeight: 1.4, maxWidth: 560 }}
          >
            Votre agence de <span style={{ color: "#1FCE8A" }}>marketing web</span> au Luxembourg.
            <br />
            On s'occupe de vos <WordRotator />.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
            style={{ display: "flex", flexWrap: "wrap", gap: 16 }}
          >
            <Magnetic>
              <a href="#contact" className="btn btn-solid" data-cursor="link">
                <span className="fill" />
                Parlons de votre projet <Arrow />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#services" className="btn btn-ghost" data-cursor="link">
                <span className="fill" />
                Découvrir
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 1 }}
        className="px-page"
        style={{ position: "relative", zIndex: 10, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", paddingBottom: 24, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.3em", color: "#8FA39C" }}
      >
        <span>Sites web — SEO/GEO — Communication</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          Scroll ↓
        </motion.span>
        <span>FR / EN</span>
      </motion.div>
    </section>
  );
}

/* ================= MANIFESTO ================= */
const MANIFESTO =
  "Cafein conçoit des sites web sur mesure pour les entreprises luxembourgeoises, gère votre communication digitale et travaille votre visibilité : référencement naturel (SEO) et référencement pour les intelligences artificielles (GEO).";
const HIGHLIGHT = ["(SEO)", "(GEO).", "artificielles", "communication", "digitale"];

function Word({ progress, range, word }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <span style={{ marginRight: "0.28em", marginTop: "0.1em", position: "relative" }}>
      <motion.span style={{ opacity }} className={undefined}>
        <span style={{ color: HIGHLIGHT.includes(word) ? "#1FCE8A" : "inherit" }}>{word}</span>
      </motion.span>
    </span>
  );
}

function Manifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = MANIFESTO.split(" ");
  return (
    <section className="px-page" style={{ position: "relative", padding: "clamp(90px, 12vw, 200px) clamp(24px, 6vw, 96px)" }}>
      <div className="kicker" style={{ marginBottom: 40 }}>( Le manifeste )</div>
      <div ref={ref} style={{ maxWidth: 1100 }}>
        <p style={{ display: "flex", flexWrap: "wrap", fontSize: "clamp(28px, 4vw, 60px)", fontWeight: 500, lineHeight: 1.15 }}>
          {words.map((w, i) => {
            const start = i / words.length;
            return <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]} word={w} />;
          })}
        </p>
      </div>
    </section>
  );
}

/* ================= SERVICES (cursor-follow preview) ================= */
const SERVICES = [
  {
    n: "01",
    title: "Création de site web",
    desc: "WordPress ou développement sur mesure, selon vos besoins et votre budget : vitrine, e-commerce ou plateforme spécifique, pensés pour le marché luxembourgeois.",
    tags: ["Vitrine", "E-commerce", "Sur mesure", "WordPress"],
    grad: "radial-gradient(ellipse at 30% 20%, #16352A 0%, #101B18 70%)",
  },
  {
    n: "02",
    title: "SEO & GEO",
    desc: "Référencement naturel classique et optimisation pour être trouvé et cité par les intelligences artificielles (ChatGPT, Perplexity...), avec un focus local Luxembourg.",
    tags: ["SEO local", "GEO", "ChatGPT", "Perplexity"],
    grad: "radial-gradient(ellipse at 70% 30%, #0E3A26 0%, #101B18 70%)",
  },
  {
    n: "03",
    title: "Communication digitale",
    desc: "Stratégie, réseaux sociaux, contenus et campagnes : on gère votre communication digitale de A à Z pour faire rayonner votre marque au Luxembourg.",
    tags: ["Social media", "Contenus", "Campagnes", "Stratégie"],
    grad: "radial-gradient(ellipse at 40% 80%, #123B2C 0%, #101B18 70%)",
  },
];

function Services() {
  const [hover, setHover] = useState(null);
  const secRef = useRef(null);
  const pvx = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const pvy = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  const onMove = (e) => {
    const r = secRef.current.getBoundingClientRect();
    pvx.set(e.clientX - r.left);
    pvy.set(e.clientY - r.top);
  };

  return (
    <section id="services" ref={secRef} onPointerMove={onMove} style={{ position: "relative", borderTop: "1px solid #22302B" }}>
      <div className="px-page" style={{ paddingTop: 100 }}>
        <MaskedLine>
          <h2 className="display" style={{ fontSize: "clamp(56px, 9vw, 160px)", textTransform: "uppercase", lineHeight: 1 }}>
            Services
          </h2>
        </MaskedLine>
      </div>

      {/* floating preview card that chases the cursor */}
      <motion.div
        aria-hidden
        style={{
          x: pvx,
          y: pvy,
          translateX: "-50%",
          translateY: "-120%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 30,
          width: 300,
          height: 200,
          pointerEvents: "none",
          overflow: "hidden",
          border: "1px solid #22302B",
        }}
        animate={{ opacity: hover !== null ? 1 : 0, scale: hover !== null ? 1 : 0.7, rotate: hover !== null ? -3 : 4 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        {hover !== null && (
          <div style={{ position: "absolute", inset: 0, background: SERVICES[hover].grad, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 20 }}>
            <span className="display" style={{ fontSize: 64, color: "rgba(242,247,245,0.12)", lineHeight: 1 }}>{SERVICES[hover].n}</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {SERVICES[hover].tags.map((t) => (
                <span key={t} style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid #32423C", color: "#8FA39C", padding: "4px 8px" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      <div style={{ marginTop: 60 }}>
        {SERVICES.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <a
              href="#contact"
              className="svc-row"
              data-cursor="view"
              data-cursor-label="Explorer"
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
            >
              <div className="svc-fill" />
              <div className="svc-in px-page" style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", gap: "clamp(16px, 3vw, 48px)", alignItems: "center", padding: "clamp(40px, 5vw, 70px) clamp(24px, 6vw, 96px)" }}>
                <span className="display" style={{ fontSize: 22, color: "#1FCE8A" }}>{s.n}</span>
                <div>
                  <h3 className="display" style={{ fontSize: "clamp(30px, 4.5vw, 64px)", textTransform: "uppercase", lineHeight: 1 }}>
                    {s.title}
                  </h3>
                  <p style={{ marginTop: 14, maxWidth: 620, color: "#8FA39C", lineHeight: 1.6, fontSize: 15 }}>{s.desc}</p>
                </div>
                <span style={{ color: "#F2F7F5" }}>
                  <Arrow size={38} />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= STATS ================= */
const Star = () => <span style={{ color: "#1FCE8A", margin: "0 18px" }}>✦</span>;

const STATS = [
  { render: () => <CountUp to={100} suffix="%" />, label: "Sur-mesure, jamais de template revendu" },
  { render: () => <CountUp to={3} />, label: "Services complémentaires : site, visibilité et communication" },
  { render: () => <><CountUp to={3} /> sem.</>, label: "Délai moyen pour un site vitrine" },
  { render: () => "FR + EN", label: "Bilingue, pour le marché grand-ducal" },
];

function Stats() {
  return (
    <section style={{ background: "#F2F7F5", color: "#0A1212" }}>
      <Marquee baseSpeed={70} style={{ borderBottom: "1px solid rgba(10,18,18,0.1)", padding: "16px 0" }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", paddingRight: 8 }}>
            Sites web <Star /> SEO <Star /> GEO <Star /> Communication <Star /> Luxembourg <Star />
          </span>
        ))}
      </Marquee>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div style={{ borderRight: "1px solid rgba(10,18,18,0.1)", padding: "clamp(36px, 4vw, 60px) clamp(24px, 3vw, 40px)", display: "flex", flexDirection: "column", gap: 32, height: "100%" }} data-cursor="link">
              <span className="display" style={{ fontSize: "clamp(60px, 6vw, 96px)", lineHeight: 1 }}>{s.render()}</span>
              <span style={{ fontSize: 13, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(10,18,18,0.6)", maxWidth: "26ch" }}>{s.label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= PROCESS — horizontal pinned scroll ================= */
const STEPS = [
  { n: "01", title: "On échange", desc: "Un premier appel pour cadrer votre projet, vos objectifs et votre budget." },
  { n: "02", title: "On construit", desc: "Design, développement, contenu : on avance vite sans sacrifier la qualité." },
  { n: "03", title: "On lance", desc: "Mise en ligne et suivi des premiers résultats, ensemble." },
  { n: "→", title: "3–4 semaines", desc: "C'est le délai moyen pour un site vitrine : découverte, design, développement, lancement." },
];

function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["4%", "-64%"]);
  const bar = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  return (
    <section id="process" ref={ref} style={{ position: "relative", height: "320vh" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
        <div className="px-page" style={{ marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div className="kicker" style={{ marginBottom: 16 }}>( La méthode )</div>
            <h2 className="display" style={{ fontSize: "clamp(40px, 6vw, 100px)", textTransform: "uppercase", lineHeight: 0.95 }}>
              Comment ça marche
            </h2>
          </div>
          <span style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#8FA39C" }}>Scrollez —</span>
        </div>
        <motion.div style={{ x, display: "flex", gap: "clamp(20px, 2.5vw, 40px)", paddingLeft: "clamp(24px, 6vw, 96px)", width: "max-content" }}>
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              data-cursor="view"
              data-cursor-label={`Étape ${i + 1 <= 3 ? i + 1 : "☕"}`}
              style={{
                width: "min(78vw, 560px)",
                border: i === 3 ? "1px solid #1FCE8A" : "1px solid #22302B",
                background: i === 3 ? "linear-gradient(135deg, rgba(31,206,138,0.12), #101B18 60%)" : "#101B18",
                padding: "clamp(32px, 4vw, 64px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "46vh",
              }}
            >
              <span className="display" style={{ fontSize: "clamp(64px, 7vw, 120px)", color: "#1FCE8A", lineHeight: 1 }}>{s.n}</span>
              <div>
                <h3 className="display" style={{ fontSize: "clamp(30px, 3.4vw, 52px)", textTransform: "uppercase" }}>{s.title}</h3>
                <p style={{ marginTop: 16, color: "#8FA39C", fontSize: 17, lineHeight: 1.6, maxWidth: 420 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
        <div className="px-page" style={{ marginTop: 48 }}>
          <div style={{ height: 2, background: "#22302B", position: "relative" }}>
            <motion.div style={{ width: bar, position: "absolute", insetBlock: 0, left: 0, background: "#1FCE8A" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= RESULTS ================= */
function Results() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  const items = [
    { big: <CountUp to={240} prefix="+" suffix="%" />, t: "Trafic organique", d: "En 6 mois sur un projet SEO local Luxembourg" },
    { big: "< 1.5s", t: "Temps de chargement", d: "Score PageSpeed > 90 sur mobile après optimisation" },
    { big: "Top 3", t: "Sur Google", d: "Mots-clés locaux ciblés, résultats stables" },
  ];

  return (
    <section id="results" ref={ref} style={{ position: "relative", overflow: "hidden", borderTop: "1px solid #22302B", padding: "clamp(90px, 10vw, 160px) 0" }}>
      <motion.div
        aria-hidden
        className="display stroke-text"
        style={{ y, position: "absolute", right: "-4%", top: "-6%", fontSize: "28vw", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}
      >
        240
      </motion.div>
      <div className="px-page" style={{ position: "relative" }}>
        <MaskedLine>
          <h2 className="display" style={{ fontSize: "clamp(44px, 7vw, 120px)", textTransform: "uppercase", lineHeight: 0.95 }}>
            Des résultats concrets
          </h2>
        </MaskedLine>
        <div style={{ marginTop: 80, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 56 }}>
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.12}>
              <div style={{ borderLeft: "2px solid #1FCE8A", paddingLeft: 32 }} data-cursor="link">
                <div className="display" style={{ fontSize: "clamp(56px, 6vw, 96px)", lineHeight: 1 }}>{it.big}</div>
                <div style={{ marginTop: 16, fontSize: 17, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{it.t}</div>
                <p style={{ marginTop: 8, color: "#8FA39C", maxWidth: "30ch", lineHeight: 1.6 }}>{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= WHY (tilt cards) ================= */
const WHY = [
  { icon: "📍", title: "Ancrés au Luxembourg", desc: "Une agence locale qui comprend votre marché, pas un prestataire lointain." },
  { icon: "🤖", title: "Prêts pour l'ère de l'IA", desc: "En plus du SEO classique, on optimise votre présence pour les moteurs IA (GEO), un angle que peu d'agences travaillent aujourd'hui." },
  { icon: "🤝", title: "Un interlocuteur direct", desc: "Pas d'intermédiaire ni de compte manager : vous échangez directement avec la personne qui construit votre projet." },
  { icon: "⚡", title: "Rapide et sans fioritures", desc: "Des sites propres et performants, livrés efficacement, sans jargon inutile." },
];

function Why() {
  return (
    <section style={{ background: "#F2F7F5", color: "#0A1212", padding: "clamp(90px, 10vw, 160px) 0" }}>
      <div className="px-page">
        <MaskedLine>
          <h2 className="display" style={{ fontSize: "clamp(48px, 8vw, 140px)", textTransform: "uppercase", lineHeight: 0.95 }}>
            Pourquoi Cafein ?
          </h2>
        </MaskedLine>
        <div style={{ marginTop: 70, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <Tilt max={7} style={{ height: "100%" }}>
                <div
                  data-cursor="view"
                  data-cursor-label="Oui !"
                  style={{ background: "#0A1212", color: "#F2F7F5", padding: "clamp(32px, 3.5vw, 56px)", height: "100%", display: "flex", flexDirection: "column", gap: 20, border: "1px solid #22302B" }}
                >
                  <span style={{ fontSize: 30 }} aria-hidden>{w.icon}</span>
                  <h3 className="display" style={{ fontSize: "clamp(24px, 2.4vw, 38px)", textTransform: "uppercase", lineHeight: 1.05 }}>{w.title}</h3>
                  <p style={{ color: "#8FA39C", lineHeight: 1.65, fontSize: 16 }}>{w.desc}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= BLOG ================= */
const POSTS = [
  { cat: "SEO", date: "Juin 2025", title: "Référencement local au Luxembourg : ce qui change en 2025", desc: "Le marché local luxembourgeois a ses particularités. On décortique les stratégies SEO qui fonctionnent vraiment dans la Grande Région." },
  { cat: "GEO", date: "Mai 2025", title: "GEO : pourquoi votre site doit être cité par les IA", desc: "ChatGPT, Perplexity, Gemini... Comment optimiser son contenu pour être mentionné dans les réponses des assistants IA." },
  { cat: "Site web", date: "Avril 2025", title: "WordPress vs sur mesure : comment choisir en 2025", desc: "Un guide sans jargon pour choisir entre WordPress et un développement sur mesure, selon votre budget et vos objectifs." },
];

function Blog() {
  return (
    <section id="blog" className="px-page" style={{ padding: "clamp(90px, 10vw, 160px) clamp(24px, 6vw, 96px)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
        <MaskedLine>
          <h2 className="display" style={{ fontSize: "clamp(44px, 6vw, 100px)", textTransform: "uppercase" }}>Sur le blog</h2>
        </MaskedLine>
        <a href="#blog" data-cursor="link" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.25em", color: "#1FCE8A" }}>
          Voir tous les articles <Arrow />
        </a>
      </div>
      <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 1, background: "#22302B" }}>
        {POSTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <article
              data-cursor="view"
              data-cursor-label="Lire"
              style={{ background: "#0A1212", padding: 36, height: "100%", display: "flex", flexDirection: "column", transition: "background 0.4s" }}
              onPointerEnter={(e) => (e.currentTarget.style.background = "#101B18")}
              onPointerLeave={(e) => (e.currentTarget.style.background = "#0A1212")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.3em" }}>
                <span style={{ background: "#1FCE8A", color: "#0A1212", fontWeight: 700, padding: "4px 8px" }}>{p.cat}</span>
                <span style={{ color: "#8FA39C" }}>{p.date}</span>
              </div>
              <h3 style={{ marginTop: 30, fontSize: 23, fontWeight: 600, lineHeight: 1.3 }}>{p.title}</h3>
              <p style={{ marginTop: 16, flex: 1, color: "#8FA39C", lineHeight: 1.65 }}>{p.desc}</p>
              <span style={{ marginTop: 30, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em" }}>
                Lire l'article <Arrow size={14} />
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= FAQ ================= */
const FAQS = [
  { q: "Vous travaillez avec quel type d'entreprises ?", a: "Principalement des PME, indépendants et commerces luxembourgeois qui veulent un site professionnel et une vraie visibilité locale. Vitrine, e-commerce ou plateforme spécifique : on s'adapte à votre secteur et à votre budget." },
  { q: "Combien coûte un site web ?", a: "Cela dépend du périmètre : un site vitrine sur mesure n'a pas le même budget qu'une plateforme e-commerce. Après un premier appel de cadrage, vous recevez un devis clair et détaillé — sans frais cachés." },
  { q: "En combien de temps peut-on être visible sur Google ?", a: "Le SEO est un travail de fond : les premiers effets se voient généralement entre 3 et 6 mois. Sur des mots-clés locaux Luxembourg bien ciblés, les résultats peuvent arriver plus vite — comme le +240% de trafic organique obtenu en 6 mois." },
];

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="px-page" style={{ borderTop: "1px solid #22302B", padding: "clamp(90px, 10vw, 160px) clamp(24px, 6vw, 96px)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48 }}>
        <MaskedLine>
          <h2 className="display" style={{ fontSize: "clamp(40px, 4.5vw, 72px)", textTransform: "uppercase", lineHeight: 1 }}>
            Questions fréquentes
          </h2>
        </MaskedLine>
        <div>
          {FAQS.map((f, i) => (
            <div key={f.q} className="faq-q">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                data-cursor="link"
                aria-expanded={open === i}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, padding: "30px 0", textAlign: "left" }}
              >
                <span style={{ fontSize: "clamp(18px, 1.6vw, 24px)", fontWeight: 600 }}>{f.q}</span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE }} style={{ color: "#1FCE8A", fontSize: 26, lineHeight: 1, flexShrink: 0 }}>
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <p style={{ paddingBottom: 30, color: "#8FA39C", fontSize: 17, lineHeight: 1.7, maxWidth: "60ch" }}>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= CONTACT ================= */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" style={{ position: "relative", overflow: "hidden", borderTop: "1px solid #22302B", padding: "clamp(90px, 10vw, 160px) 0" }}>
      <Embers density={45} />
      <div className="px-page" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 64 }}>
        <div>
          <div className="kicker">( Contact )</div>
          <h2 className="display" style={{ marginTop: 24, fontSize: "clamp(56px, 8vw, 140px)", textTransform: "uppercase", lineHeight: 0.9 }}>
            Un projet<span style={{ color: "#1FCE8A" }}> ?</span>
          </h2>
          <p style={{ marginTop: 32, maxWidth: 420, fontSize: 20, color: "#8FA39C", lineHeight: 1.6 }}>
            Une question, un projet ? Écrivez-nous, on vous répond rapidement.
          </p>
        </div>
        <div>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ border: "1px solid #1FCE8A", padding: 40, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}
            >
              <span className="display" style={{ fontSize: 40, textTransform: "uppercase", color: "#1FCE8A" }}>Merci !</span>
              <p style={{ marginTop: 16, fontSize: 18 }}>
                Votre message est prêt — ceci est une maquette : le formulaire sera branché à l'envoi réel lors de la mise en production.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              style={{ display: "flex", flexDirection: "column", gap: 32 }}
            >
              {[
                { id: "nom", label: "Nom", type: "text", auto: "name" },
                { id: "email", label: "Email", type: "email", auto: "email" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.3em", color: "#8FA39C" }}>
                    {f.label}
                  </label>
                  <input id={f.id} type={f.type} required autoComplete={f.auto} />
                </div>
              ))}
              <div>
                <label htmlFor="message" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.3em", color: "#8FA39C" }}>
                  Message
                </label>
                <textarea id="message" rows={4} required style={{ resize: "none" }} />
              </div>
              <Magnetic>
                <button type="submit" className="btn btn-solid" data-cursor="link">
                  <span className="fill" />
                  Envoyer <Arrow />
                </button>
              </Magnetic>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ================= FOOTER ================= */
function Footer() {
  return (
    <footer style={{ position: "relative", overflow: "hidden", borderTop: "1px solid #22302B" }}>
      <div className="px-page" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24, padding: "40px clamp(24px, 6vw, 96px)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.3em", color: "#8FA39C" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Logo height={20} />
          <span>© 2026 — Luxembourg</span>
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 32px" }}>
          {["Création", "SEO & GEO", "Communication", "Blog", "Lexique", "Contact"].map((l) => (
            <a key={l} href="#top" data-cursor="link">
              <Scramble text={l} />
            </a>
          ))}
        </div>
        <span>FR / EN</span>
      </div>
      <div style={{ padding: "0 8px 16px" }}>
        <div style={{ overflow: "hidden" }}>
          <motion.div
            initial={{ y: "60%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="display stroke-text"
            data-cursor="view"
            data-cursor-label="☕ Cafein"
            style={{ textAlign: "center", fontSize: "19vw", lineHeight: 0.9, userSelect: "none" }}
          >
            CAFEIN
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

/* ================= SMOOTH SCROLL ================= */
function SmoothScroll() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.05, anchors: true });
    let raf = 0;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduced]);
  return null;
}

/* ================= APP ================= */
export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  return (
    <div className="grain" style={{ position: "relative", minHeight: "100vh" }}>
      <Cursor />
      <motion.div style={{ scaleX: progress, position: "fixed", insetInline: 0, top: 0, zIndex: 95, height: 3, transformOrigin: "left", background: "#1FCE8A" }} />
      <AnimatePresence>{loading && <Preloader onDone={() => setLoading(false)} />}</AnimatePresence>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero started={!loading} />
        <Manifesto />
        <Services />
        <Stats />
        <Process />
        <Results />
        <Why />
        <Blog />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
