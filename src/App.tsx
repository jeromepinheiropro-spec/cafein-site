import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Plus,
  Globe,
  Search,
  MapPin,
  Cpu,
  UserRound,
  Zap,
  Megaphone,
  Menu,
  X,
} from "lucide-react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Cursor, Magnetic, Reveal, MaskedLine, CountUp, Marquee, Embers } from "./fx";
import Creation from "./pages/Creation";
import SeoGeo from "./pages/SeoGeo";
import Communication from "./pages/Communication";
import Lexique from "./pages/Lexique";
import LexiqueTerme from "./pages/LexiqueTerme";
import { usePageMeta } from "./pagefx";
import { useEffect } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ================= LOGO ================= */
function IDot() {
  return (
    <span className="relative inline-block">
      {"\u0131"}
      <span
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 bg-[#1FCE8A]"
        style={{ width: "0.12em", height: "0.12em", top: "0.04em", borderRadius: "0.025em" }}
      />
    </span>
  );
}

function LeafMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 41" className={className} aria-hidden fill="none">
      <path d="M0 0.558716V23.2477C0 27.7947 1.72257 32.2022 4.91942 35.4301C5.29187 35.8026 5.69536 36.1751 6.12989 36.5475C10.801 40.4739 15.9222 40.8153 17.443 40.8618V18.3902C17.443 14.2466 16.0308 10.2116 13.315 7.07675C13.1909 6.93707 13.0823 6.81292 12.9581 6.67325C8.0542 1.35019 1.62946 0.66735 0 0.558716Z" fill="#1FCE8A"/>
      <path d="M29.92 7.71301V19.492C29.92 21.8509 29.0199 24.1477 27.375 25.8238C27.1732 26.0256 26.9715 26.2118 26.7542 26.398C24.3333 28.431 21.6796 28.6173 20.8882 28.6328V16.9779C20.8882 14.8363 21.6175 12.7257 23.0297 11.1117C23.0918 11.0341 23.1539 10.972 23.216 10.91C25.7455 8.11652 29.0665 7.77509 29.92 7.71301Z" fill="#F2F7F5"/>
    </svg>
  );
}

function Logo({ className = "h-6" }: { className?: string; size?: string; mark?: string }) {
  return (
    <svg viewBox="0 0 213 43" className={className + " w-auto"} aria-label="Cafein" role="img" fill="none">
      <path d="M68.096 42.9569C65.132 42.9569 62.4317 42.4292 60.0263 41.3739C57.6054 40.3186 55.5414 38.8288 53.8033 36.8889C52.0807 34.9646 50.7461 32.6832 49.815 30.0605C48.8839 27.4378 48.4183 24.5823 48.4183 21.4784C48.4183 18.4367 48.8684 15.6122 49.7685 13.005C50.6686 10.3978 51.9876 8.1165 53.7102 6.17661C55.4328 4.23672 57.5123 2.71585 59.9487 1.62951C62.3852 0.543173 65.1475 0 68.2047 0C70.5946 0 72.7516 0.310392 74.6915 0.931156C76.6313 1.55192 78.2918 2.42099 79.6885 3.52284C81.2559 4.76437 82.5129 6.2542 83.444 7.99234C84.3752 9.71496 84.9804 11.6083 85.2442 13.6568H78.5867C78.2918 12.0894 77.7021 10.7082 76.802 9.51322C75.9019 8.33377 74.7225 7.40262 73.2638 6.71978C71.805 6.03693 70.0824 5.69552 68.1116 5.69552C65.3492 5.69552 62.9904 6.37835 61.0661 7.75955C59.1418 9.14075 57.683 11.0186 56.6898 13.393C55.6966 15.7674 55.2155 18.4677 55.2155 21.4629C55.2155 24.5823 55.7432 27.3136 56.814 29.6725C57.8847 32.0314 59.3901 33.8782 61.3299 35.2129C63.2697 36.5475 65.551 37.2148 68.1581 37.2148C70.4549 37.2148 72.3792 36.7648 73.9156 35.8491C75.4519 34.9335 76.6468 33.723 77.4849 32.2021C78.3229 30.6813 78.835 29.0207 78.9902 27.205H85.6632C85.6166 29.2535 85.1511 31.271 84.282 33.273C83.413 35.2749 82.2181 36.9975 80.6972 38.4719C79.1609 40.0083 77.3297 41.1412 75.2346 41.8706C73.1396 42.5999 70.7653 42.9569 68.096 42.9569Z" fill="#F2F7F5"/>
      <path d="M100.127 42.8017C98.2489 42.8017 96.5418 42.4758 94.9899 41.8395C93.4536 41.2032 92.2431 40.2411 91.3431 38.953C90.443 37.6649 89.9929 36.0819 89.9929 34.1731C89.9929 31.8918 90.5206 30.1381 91.5758 28.9276C92.6311 27.7016 94.1054 26.8015 95.9676 26.2273C97.8454 25.6531 100.002 25.203 102.47 24.8927C104.022 24.7064 105.341 24.4892 106.427 24.2098C107.514 23.946 108.352 23.527 108.926 22.9683C109.5 22.4096 109.795 21.6647 109.795 20.7335C109.795 19.2747 109.298 18.1108 108.289 17.2417C107.281 16.3882 105.838 15.9537 103.929 15.9537C101.756 15.9537 100.127 16.4348 99.0558 17.3814C97.9851 18.3281 97.3953 19.6162 97.3022 21.2457H91.4672C91.5603 19.5386 92.0569 17.9711 92.9725 16.5123C93.8881 15.0535 95.2382 13.8741 97.0384 12.9895C98.8386 12.0894 101.12 11.6393 103.867 11.6393C105.403 11.6393 106.8 11.7635 108.072 12.0118C109.345 12.2601 110.447 12.6791 111.409 13.2533C112.728 14.0293 113.752 15.1156 114.466 16.4968C115.18 17.878 115.537 19.5696 115.537 21.5561V34.8249C115.537 35.8802 115.692 36.6717 116.002 37.2148C116.313 37.758 116.856 38.0218 117.632 38.0218C117.818 38.0218 117.989 38.0063 118.159 37.9753C118.33 37.9442 118.485 37.9132 118.609 37.8511H118.765V42.0878C118.392 42.1965 117.927 42.3051 117.399 42.4137C116.871 42.5224 116.251 42.5689 115.537 42.5689C114.435 42.5689 113.457 42.3517 112.604 41.9171C111.75 41.4826 111.098 40.7997 110.617 39.8841C110.136 38.9685 109.919 37.7735 109.919 36.2992V35.8181L110.571 37.8822H109.981C109.096 39.2013 107.855 40.3497 106.241 41.3119C104.674 42.3206 102.625 42.8017 100.127 42.8017ZM101.818 38.4874C103.634 38.4874 105.124 38.1149 106.319 37.37C107.514 36.6251 108.414 35.694 109.003 34.5921C109.609 33.4747 109.903 32.3574 109.903 31.24V26.6308C109.453 26.9257 108.879 27.1895 108.212 27.4378C107.529 27.6861 106.815 27.9189 106.039 28.1206C105.263 28.3224 104.503 28.4931 103.742 28.6328C102.206 28.8966 100.872 29.2225 99.7697 29.5949C98.6524 29.9674 97.7988 30.4951 97.1936 31.1624C96.5884 31.8452 96.278 32.8074 96.278 34.0489C96.278 35.2129 96.5418 36.113 97.0695 36.7493C97.5971 37.3855 98.2799 37.8356 99.1334 38.0994C99.9714 38.3632 100.872 38.4874 101.818 38.4874Z" fill="#F2F7F5"/>
      <path d="M125.515 42.1499V16.7917H120.922V12.2912H125.515V8.67521C125.515 7.23194 125.701 5.99041 126.058 4.95063C126.415 3.92636 126.99 3.08833 127.734 2.45205C128.526 1.76921 129.519 1.27259 130.714 0.993249C131.893 0.698386 133.259 0.558716 134.795 0.558716C135.261 0.558716 135.758 0.574242 136.254 0.589761C136.766 0.60528 137.294 0.636318 137.822 0.698394V5.52484C137.496 5.4938 137.185 5.47828 136.89 5.47828C136.596 5.47828 136.316 5.47828 136.068 5.47828C134.392 5.47828 133.228 5.72658 132.592 6.23871C131.955 6.75084 131.645 7.66647 131.645 9.00111V12.2912H137.775V16.7917H131.645V42.1499H125.515Z" fill="#F2F7F5"/>
      <path d="M155.389 42.9414C152.3 42.9414 149.631 42.243 147.428 40.8308C145.208 39.434 143.517 37.5407 142.337 35.1663C141.158 32.7919 140.568 30.1381 140.568 27.2205C140.568 24.3029 141.174 21.6647 142.384 19.3058C143.595 16.9469 145.286 15.069 147.474 13.6568C149.662 12.2601 152.176 11.5462 155.063 11.5462C157.266 11.5462 159.222 11.9342 160.929 12.7101C162.636 13.4861 164.079 14.5724 165.305 15.9381C166.64 17.4435 167.633 19.2747 168.285 21.4629C168.937 23.6511 169.262 26.041 169.262 28.6638H146.714C146.853 30.495 147.288 32.109 147.986 33.5368C148.7 34.9645 149.662 36.0819 150.919 36.8889C152.176 37.6959 153.682 38.1149 155.482 38.1149C157.344 38.1149 158.896 37.7114 160.137 36.9044C161.379 36.0974 162.232 34.9956 162.698 33.5988H168.642C168.207 35.4146 167.4 37.0131 166.205 38.4098C165.01 39.8065 163.505 40.9084 161.689 41.7153C159.858 42.5379 157.763 42.9414 155.389 42.9414ZM146.791 24.6133H162.853C162.76 22.8441 162.403 21.3232 161.767 20.0507C161.131 18.7781 160.246 17.8159 159.113 17.1331C157.98 16.4502 156.63 16.1088 155.063 16.1088C153.387 16.1088 151.975 16.4813 150.826 17.2107C149.693 17.9401 148.778 18.9488 148.11 20.2059C147.443 21.4784 147.009 22.9527 146.791 24.6133Z" fill="#F2F7F5"/>
      <path d="M174.446 42.1499V12.2911H180.576V42.1499H174.446Z" fill="#F2F7F5"/>
      <path d="M187.28 42.1499V12.2912H193.285V16.6055H193.472C194.185 15.5347 194.977 14.6346 195.892 13.8896C196.793 13.1447 197.832 12.5705 198.981 12.167C200.145 11.7635 201.433 11.5618 202.86 11.5618C204.971 11.5618 206.787 11.9653 208.292 12.7567C209.797 13.5482 210.946 14.6966 211.768 16.202C212.575 17.7073 212.994 19.5075 212.994 21.6337V42.1499H206.911V22.5183C206.911 20.6715 206.368 19.2282 205.297 18.2039C204.226 17.1797 202.705 16.652 200.781 16.652C199.353 16.652 198.081 16.9779 196.963 17.6142C195.846 18.2505 194.977 19.1506 194.356 20.3145C193.735 21.4785 193.425 22.7976 193.425 24.303V42.1344H187.28V42.1499Z" fill="#F2F7F5"/>
      <path d="M0 0.558716V23.2477C0 27.7947 1.72257 32.2022 4.91942 35.4301C5.29187 35.8026 5.69536 36.1751 6.12989 36.5475C10.801 40.4739 15.9222 40.8153 17.443 40.8618V18.3902C17.443 14.2466 16.0308 10.2116 13.315 7.07675C13.1909 6.93707 13.0823 6.81292 12.9581 6.67325C8.0542 1.35019 1.62946 0.66735 0 0.558716Z" fill="#1FCE8A"/>
      <path d="M29.92 7.71301V19.492C29.92 21.8509 29.0199 24.1477 27.375 25.8238C27.1732 26.0256 26.9715 26.2118 26.7542 26.398C24.3333 28.431 21.6796 28.6173 20.8882 28.6328V16.9779C20.8882 14.8363 21.6175 12.7257 23.0297 11.1117C23.0918 11.0341 23.1539 10.972 23.216 10.91C25.7455 8.11652 29.0665 7.77509 29.92 7.71301Z" fill="#F2F7F5"/>
      <path d="M180.7 0.232788H174.368V6.67322H180.7V0.232788Z" fill="#1FCE8A"/>
    </svg>
  );
}

function Preloader({ onDone }: { onDone: () => void }) {
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
        setTimeout(onDone, 550);
      }
      setCount(v);
    }, 60);
    return () => clearInterval(id);
  }, [onDone, reduced]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-[#0A1212] px-6 py-8 md:px-12"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#8FA39C]">
        <Logo className="h-6" />
        <span>Luxembourg</span>
      </div>
      <div className="overflow-hidden">
        <motion.h1
          className="text-[17vw] leading-[0.9] tracking-tight text-[#F2F7F5] md:text-[12vw]"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          Cafe<IDot />n
        </motion.h1>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8FA39C]">
          Marketing web — chargement
        </span>
        <span className="font-display text-6xl tabular-nums text-[#1FCE8A] md:text-8xl">
          {count}%
        </span>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] bg-[#1FCE8A]"
        style={{ width: `${count}%` }}
      />
    </motion.div>
  );
}

/* ================= NAV ================= */
const NAV_LINKS = [
  { to: "/creation-site-web", label: "Création de site" },
  { to: "/seo-geo", label: "SEO & GEO" },
  { to: "/communication", label: "Communication" },
  { to: "/lexique", label: "Lexique" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        className="fixed inset-x-0 top-0 z-[80] mix-blend-difference"
      >
        <nav className="flex items-center justify-between px-6 py-5 md:px-12">
          <Link to="/" aria-label="Cafein — accueil">
            <Logo className="h-7" />
          </Link>
          <div className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.25em] text-[#F2F7F5] md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={
                  "transition-opacity hover:opacity-60 " +
                  (location.pathname === l.to ? "text-[#1FCE8A]" : "")
                }
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Magnetic className="hidden md:inline-block">
              <Link
                to="/#contact"
                className="border border-[#F2F7F5] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#F2F7F5] transition-colors duration-300 hover:bg-[#F2F7F5] hover:text-black"
              >
                Contact
              </Link>
            </Magnetic>
            <button
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              className="p-2 text-[#F2F7F5] md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] flex flex-col bg-[#0A1212] px-6 py-6"
          >
            <div className="flex items-center justify-between">
              <Logo className="h-6" />
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="p-2 text-[#F2F7F5]"
              >
                <X className="h-7 w-7" />
              </button>
            </div>
            <nav className="mt-16 flex flex-col gap-2">
              {[{ to: "/", label: "Accueil" }, ...NAV_LINKS].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: EASE }}
                >
                  <Link
                    to={l.to}
                    className={
                      "font-display block py-3 text-4xl uppercase " +
                      (location.pathname === l.to ? "text-[#1FCE8A]" : "text-[#F2F7F5]")
                    }
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-auto"
            >
              <Link
                to="/#contact"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center gap-3 bg-[#1FCE8A] px-8 py-5 text-sm font-bold uppercase tracking-[0.25em] text-[#0A1212]"
              >
                Parlons de votre projet
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================= HERO ================= */
function Hero({ started }: { started: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  // Fondu à verrou : une fois masqué, ne réapparaît qu'après un vrai retour en haut
  // (les sauts de mesure iOS lors de la rétraction de la barre d'adresse sont ignorés)
  const [hidden, setHidden] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const unhideTimer = useRef<number | null>(null);
  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
  }, []);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.22) {
      if (unhideTimer.current) {
        clearTimeout(unhideTimer.current);
        unhideTimer.current = null;
      }
      setHidden(true);
    } else if (v < 0.05) {
      if (!unhideTimer.current) {
        unhideTimer.current = window.setTimeout(() => {
          unhideTimer.current = null;
          setHidden(false);
        }, 250);
      }
    } else if (unhideTimer.current) {
      clearTimeout(unhideTimer.current);
      unhideTimer.current = null;
    }
  });

  const letters = ["C", "a", "f", "e", "i", "n"];

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <Embers />
      <motion.div
        style={isDesktop ? { y, scale } : undefined}
        animate={{ opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 flex flex-1 flex-col justify-center px-6 pt-28 md:px-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
          className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-[#8FA39C]"
        >
          <LeafMark className="h-4 w-auto" />
          Agence basée au Luxembourg
        </motion.div>

        <h1
          className="flex flex-wrap leading-[0.82] tracking-tight text-[#F2F7F5]"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
          aria-label="Cafein"
        >
          {letters.map((l, i) => (
            <span key={i} className="inline-block overflow-hidden" aria-hidden>
              <motion.span
                className="inline-block text-[21vw] md:text-[16vw]"
                initial={{ y: "115%", rotate: 6 }}
                animate={started ? { y: 0, rotate: 0 } : {}}
                transition={{ duration: 1, delay: 0.35 + i * 0.06, ease: EASE }}
              >
                {l === "i" ? <IDot /> : l}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            className="text-xl font-light leading-snug text-[#F2F7F5] md:col-span-6 md:text-2xl"
          >
            Votre agence de <span className="text-[#1FCE8A]">marketing web</span> au
            Luxembourg. Sites sur mesure, communication digitale et visibilité —
            SEO&nbsp;&amp;&nbsp;GEO.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
            className="flex flex-wrap gap-4 md:col-span-6 md:justify-end"
          >
            <Magnetic>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 bg-[#1FCE8A] px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#0A1212]"
              >
                Parlons de votre projet
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#work"
                className="inline-flex items-center gap-3 border border-[#32423C] px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#F2F7F5] transition-colors duration-300 hover:border-[#F2F7F5]"
              >
                Voir nos réalisations
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 1 }}
        className="relative z-10 flex items-center justify-between px-6 pb-6 text-[10px] uppercase tracking-[0.3em] text-[#8FA39C] md:px-12"
      >
        <span>Sites web — SEO/GEO — Communication</span>
        <span className="flex items-center gap-2">
          Scroll <ArrowDown className="h-3 w-3 animate-bounce" />
        </span>
        <span className="hidden md:block">FR / EN</span>
      </motion.div>
    </section>
  );
}

/* ================= MANIFESTO (scroll-driven word reveal) ================= */
const MANIFESTO =
  "Cafein conçoit des sites web sur mesure pour les entreprises luxembourgeoises, gère votre communication digitale et travaille votre visibilité : référencement naturel (SEO) et référencement pour les intelligences artificielles (GEO).";

function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = MANIFESTO.split(" ");

  return (
    <section className="relative px-6 py-20 md:px-12 md:py-32 md:py-48">
      <div className="mb-10 text-xs uppercase tracking-[0.3em] text-[#1FCE8A]">
        ( Le manifeste )
      </div>
      <div ref={ref} className="max-w-5xl">
        <p className="flex flex-wrap text-3xl font-medium leading-tight text-[#F2F7F5] md:text-6xl">
          {words.map((w, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return <Word key={i} progress={scrollYProgress} range={[start, end]} word={w} />;
          })}
        </p>
      </div>
    </section>
  );
}

function Word({
  progress,
  range,
  word,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  word: string;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const highlight = ["(SEO)", "(GEO).", "artificielles", "communication", "digitale"].includes(word);
  return (
    <span className="relative mr-[0.28em] mt-[0.1em]">
      <motion.span style={{ opacity }} className={highlight ? "text-[#1FCE8A]" : ""}>
        {word}
      </motion.span>
    </span>
  );
}

/* ================= SERVICES ================= */
const SERVICES = [
  {
    n: "01",
    title: "Création de site web",
    desc: "WordPress ou développement sur mesure, selon vos besoins et votre budget : vitrine, e-commerce ou plateforme spécifique, pensés pour le marché luxembourgeois.",
    tags: ["Vitrine", "E-commerce", "Sur mesure", "WordPress"],
    Icon: Globe,
    to: "/creation-site-web",
  },
  {
    n: "02",
    title: "SEO & GEO",
    desc: "Référencement naturel classique et optimisation pour être trouvé et cité par les intelligences artificielles (ChatGPT, Perplexity...), avec un focus local Luxembourg.",
    tags: ["SEO local", "GEO", "ChatGPT", "Perplexity"],
    Icon: Search,
    to: "/seo-geo",
  },
  {
    n: "03",
    title: "Communication digitale",
    desc: "Stratégie, réseaux sociaux, contenus et campagnes : on gère votre communication digitale de A à Z pour faire rayonner votre marque au Luxembourg.",
    tags: ["Social media", "Contenus", "Campagnes", "Stratégie"],
    Icon: Megaphone,
    to: "/communication",
  },
];

function Services() {
  return (
    <section id="services" className="relative border-t border-[#22302B]">
      <div className="px-6 pt-24 md:px-12">
        <MaskedLine>
          <h2 className="font-display text-6xl uppercase text-[#F2F7F5] md:text-[9vw]">
            Services
          </h2>
        </MaskedLine>
      </div>
      <div className="mt-16">
        {SERVICES.map((s, i) => (
          <ServiceRow key={s.n} {...s} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}

function ServiceRow({
  n,
  title,
  desc,
  tags,
  Icon,
  to,
  delay,
}: (typeof SERVICES)[number] & { delay: number }) {
  return (
    <Reveal delay={delay}>
      <Link
        to={to}
        className="group relative block overflow-hidden border-t border-[#22302B]"
      >
        <div className="absolute inset-0 origin-bottom scale-y-0 bg-[#1FCE8A] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
        <div className="relative z-10 grid items-center gap-6 px-6 py-12 md:grid-cols-12 md:px-12 md:py-16">
          <span className="font-display text-2xl text-[#1FCE8A] transition-colors duration-300 group-hover:text-[#0A1212] md:col-span-1">
            {n}
          </span>
          <div className="flex items-center gap-5 md:col-span-5">
            <Icon className="h-8 w-8 shrink-0 text-[#8FA39C] transition-colors duration-300 group-hover:text-[#0A1212]" />
            <h3 className="font-display text-3xl uppercase leading-none text-[#F2F7F5] transition-colors duration-300 group-hover:text-[#0A1212] md:text-6xl">
              {title}
            </h3>
          </div>
          <p className="text-base leading-relaxed text-[#8FA39C] transition-colors duration-300 group-hover:text-[#06301F] md:col-span-4">
            {desc}
          </p>
          <div className="flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
            <div className="flex flex-wrap gap-2 md:hidden">
              {tags.map((t) => (
                <span
                  key={t}
                  className="border border-[#32423C] px-2 py-1 text-[10px] uppercase tracking-widest text-[#8FA39C] group-hover:border-[#0A1212]/40 group-hover:text-[#06301F]"
                >
                  {t}
                </span>
              ))}
            </div>
            <ArrowUpRight className="h-10 w-10 text-[#F2F7F5] transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:text-[#0A1212]" />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/* ================= STATS (inverted light band) ================= */
function Star() {
  return <span className="text-[#1FCE8A]">✦</span>;
}

const STATS = [
  { big: "100%", label: "Sur-mesure, jamais de template revendu", counter: { to: 100, suffix: "%" } },
  { big: "3", label: "Services complémentaires : site, visibilité et communication", counter: { to: 3, suffix: "" } },
  { big: "3 sem.", label: "Délai moyen pour un site vitrine", counter: { to: 3, suffix: " sem." } },
  { big: "FR + EN", label: "Bilingue, pour le marché grand-ducal", counter: null },
];

function Stats() {
  return (
    <section className="bg-[#F2F7F5] text-[#0A1212]">
      <Marquee speed={26} className="border-b border-[#0A1212]/10 py-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="mx-6 flex items-center gap-6 text-sm font-semibold uppercase tracking-[0.3em]"
          >
            Sites web <Star /> SEO <Star /> GEO <Star /> Communication <Star /> Luxembourg <Star />
          </span>
        ))}
      </Marquee>
      <div className="grid md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.08}
            className="border-b border-[#0A1212]/10 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
          >
            <div className="flex h-full flex-col justify-between gap-8 px-6 py-10 md:px-8 md:py-14">
              <span className="font-display text-7xl leading-none md:text-8xl">
                {s.counter ? <CountUp to={s.counter.to} suffix={s.counter.suffix} /> : s.big}
              </span>
              <span className="max-w-[24ch] text-sm font-medium uppercase tracking-wider text-[#0A1212]/60">
                {s.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= PROCESS (sticky stacked cards) ================= */
const STEPS = [
  {
    n: "01",
    title: "On échange",
    desc: "Un premier appel pour cadrer votre projet, vos objectifs et votre budget.",
  },
  {
    n: "02",
    title: "On construit",
    desc: "Design, développement, contenu : on avance vite sans sacrifier la qualité.",
  },
  {
    n: "03",
    title: "On lance",
    desc: "Mise en ligne et suivi des premiers résultats, ensemble.",
  },
];

function Process() {
  return (
    <section id="process" className="relative px-6 py-20 md:px-12 md:py-32">
      <MaskedLine>
        <h2 className="font-display text-5xl uppercase text-[#F2F7F5] md:text-[7vw]">
          Comment ça marche
        </h2>
      </MaskedLine>
      <div className="mt-16 space-y-6 md:mt-24">
        {STEPS.map((s, i) => (
          <div key={s.n} className="sticky" style={{ top: `${110 + i * 28}px` }}>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="grid items-start gap-6 border border-[#22302B] bg-[#101B18] px-8 py-12 md:grid-cols-12 md:px-14 md:py-16"
            >
              <span className="font-display text-6xl text-[#1FCE8A] md:col-span-2 md:text-8xl">
                {s.n}
              </span>
              <h3 className="font-display text-4xl uppercase text-[#F2F7F5] md:col-span-4 md:text-5xl">
                {s.title}
              </h3>
              <p className="text-lg leading-relaxed text-[#8FA39C] md:col-span-6">{s.desc}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= TIMELINE ================= */
const PHASES = ["Découverte", "Design", "Développement", "Lancement"];

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] });
  const width = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 80,
    damping: 20,
  });

  return (
    <section className="border-y border-[#22302B] px-6 py-20 md:px-12 md:py-28">
      <div className="mb-4 text-xs uppercase tracking-[0.3em] text-[#1FCE8A]">
        ( Délai de livraison )
      </div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-5xl uppercase text-[#F2F7F5] md:text-7xl">
          3–4 semaines
        </h2>
        <span className="text-sm uppercase tracking-[0.3em] text-[#8FA39C]">Site vitrine</span>
      </div>
      <div ref={ref} className="mt-16">
        <div className="relative h-[2px] w-full bg-[#22302B]">
          <motion.div style={{ width }} className="absolute inset-y-0 left-0 bg-[#1FCE8A]" />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          {PHASES.map((p, i) => (
            <Reveal key={p} delay={i * 0.12}>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#8FA39C]">
                  Sem. {i + 1}
                </div>
                <div className="font-display mt-2 break-words text-2xl uppercase leading-tight text-[#F2F7F5] md:text-3xl">
                  {p}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= WORK PREVIEW ================= */
function Work() {
  return (
    <section id="work" className="px-6 py-20 md:px-12 md:py-32">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <MaskedLine>
            <h2 className="font-display text-5xl uppercase leading-none text-[#F2F7F5] md:text-6xl">
              Un aperçu de ce qu'on prépare
            </h2>
          </MaskedLine>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-[#8FA39C]">
              Nos premiers projets arrivent bientôt. En attendant, voici le type de rendu
              qu'on vise : propre, rapide et pensé pour convertir.
            </p>
            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#1FCE8A]"
            >
              Voir toutes nos réalisations
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
            </a>
          </Reveal>
        </div>
        <div className="grid gap-6 md:col-span-7 md:grid-cols-2">
          {[0, 1].map((i) => (
            <Reveal key={i} delay={0.1 + i * 0.15}>
              <div
                className="group relative aspect-[4/5] overflow-hidden border border-[#22302B]"
                data-hover
              >
                <div
                  className={
                    "absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 " +
                    (i === 0
                      ? "bg-[radial-gradient(ellipse_at_30%_20%,#16352A_0%,#101B18_60%)]"
                      : "bg-[radial-gradient(ellipse_at_70%_80%,#0E3A26_0%,#101B18_60%)]")
                  }
                />
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <span className="font-display text-8xl text-[#F2F7F5]/10">
                    {i === 0 ? "A" : "B"}
                  </span>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-[#1FCE8A]">
                      Projet {i + 1}
                    </div>
                    <div className="mt-1 text-sm uppercase tracking-widest text-[#F2F7F5]">
                      Aperçu du site, à venir
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Avant / Après */}
      <div className="mt-32">
        <MaskedLine>
          <h3 className="font-display text-4xl uppercase text-[#F2F7F5] md:text-6xl">
            Un site repensé de A à Z
          </h3>
        </MaskedLine>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg text-[#8FA39C]">
            Illustration d'une refonte type : meilleure lisibilité, UX mobile optimisée et
            structure SEO revue dès le premier jour.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="border border-[#22302B] bg-[#101B18] p-8 opacity-60 grayscale">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#8FA39C]">
                Avant : site existant
              </div>
              <div className="mt-6 space-y-3">
                <div className="h-4 w-2/3 bg-[#22302B]" />
                <div className="h-3 w-full bg-[#22302B]" />
                <div className="h-3 w-5/6 bg-[#22302B]" />
                <div className="mt-6 h-24 w-full bg-[#22302B]" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative border border-[#1FCE8A] bg-[#101B18] p-8">
              <div className="absolute -top-3 right-6 bg-[#1FCE8A] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0A1212]">
                Après Cafein
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#1FCE8A]">
                Refonte optimisée
              </div>
              <div className="mt-6 space-y-3">
                <div className="h-5 w-1/2 bg-[#F2F7F5]" />
                <div className="h-3 w-full bg-[#32423C]" />
                <div className="h-3 w-4/6 bg-[#32423C]" />
                <div className="mt-6 flex h-24 w-full items-center justify-center bg-gradient-to-br from-[#1FCE8A]/30 to-transparent">
                  <Zap className="h-8 w-8 text-[#1FCE8A]" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= RESULTS ================= */
function Results() {
  return (
    <section
      id="results"
      className="relative overflow-hidden border-t border-[#22302B] px-6 py-20 md:px-12 md:py-32"
    >
      <div
        aria-hidden
        className="font-display text-stroke pointer-events-none absolute -right-10 top-0 hidden select-none text-[28vw] leading-none md:block"
      >
        240
      </div>
      <div className="relative">
        <MaskedLine>
          <h2 className="font-display text-5xl uppercase text-[#F2F7F5] md:text-[7vw]">
            Des résultats concrets
          </h2>
        </MaskedLine>
        <div className="mt-20 grid gap-14 md:grid-cols-3">
          <Reveal>
            <div className="border-l-2 border-[#1FCE8A] pl-8">
              <div className="font-display text-7xl leading-none text-[#F2F7F5] md:text-8xl">
                <CountUp to={240} prefix="+" suffix="%" />
              </div>
              <div className="mt-4 text-lg font-semibold uppercase tracking-wider text-[#F2F7F5]">
                Trafic organique
              </div>
              <p className="mt-2 max-w-[30ch] text-[#8FA39C]">
                En 6 mois sur un projet SEO local Luxembourg
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="border-l-2 border-[#1FCE8A] pl-8">
              <div className="font-display text-7xl leading-none text-[#F2F7F5] md:text-8xl">
                &lt;&nbsp;1.5s
              </div>
              <div className="mt-4 text-lg font-semibold uppercase tracking-wider text-[#F2F7F5]">
                Temps de chargement
              </div>
              <p className="mt-2 max-w-[30ch] text-[#8FA39C]">
                Score PageSpeed &gt; 90 sur mobile après optimisation
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="border-l-2 border-[#1FCE8A] pl-8">
              <div className="font-display text-7xl leading-none text-[#F2F7F5] md:text-8xl">
                Top&nbsp;3
              </div>
              <div className="mt-4 text-lg font-semibold uppercase tracking-wider text-[#F2F7F5]">
                Sur Google
              </div>
              <p className="mt-2 max-w-[30ch] text-[#8FA39C]">
                Mots-clés locaux ciblés, résultats stables
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= WHY ================= */
const WHY = [
  {
    Icon: MapPin,
    title: "Ancrés au Luxembourg",
    desc: "Une agence locale qui comprend votre marché, pas un prestataire lointain.",
  },
  {
    Icon: Cpu,
    title: "Prêts pour l'ère de l'IA",
    desc: "En plus du SEO classique, on optimise votre présence pour les moteurs IA (GEO), un angle que peu d'agences travaillent aujourd'hui.",
  },
  {
    Icon: UserRound,
    title: "Un interlocuteur direct",
    desc: "Pas d'intermédiaire ni de compte manager : vous échangez directement avec la personne qui construit votre projet.",
  },
  {
    Icon: Zap,
    title: "Rapide et sans fioritures",
    desc: "Des sites propres et performants, livrés efficacement, sans jargon inutile.",
  },
];

function Why() {
  return (
    <section className="bg-[#F2F7F5] px-6 py-20 text-[#0A1212] md:px-12 md:py-32">
      <MaskedLine>
        <h2 className="font-display text-6xl uppercase md:text-[8vw]">Pourquoi Cafein ?</h2>
      </MaskedLine>
      <div className="mt-20 grid gap-px bg-[#0A1212]/10 md:grid-cols-2">
        {WHY.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.08}>
            <div
              className="group h-full bg-[#F2F7F5] p-10 transition-colors duration-500 hover:bg-[#0A1212] md:p-14"
              data-hover
            >
              <w.Icon className="h-8 w-8 text-[#1FCE8A]" />
              <h3 className="font-display mt-8 text-3xl uppercase transition-colors duration-500 group-hover:text-[#F2F7F5] md:text-4xl">
                {w.title}
              </h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-[#0A1212]/60 transition-colors duration-500 group-hover:text-[#8FA39C]">
                {w.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= BLOG ================= */
const POSTS = [
  {
    cat: "SEO",
    date: "Juin 2025",
    title: "Référencement local au Luxembourg : ce qui change en 2025",
    desc: "Le marché local luxembourgeois a ses particularités. On décortique les stratégies SEO qui fonctionnent vraiment dans la Grande Région.",
  },
  {
    cat: "GEO",
    date: "Mai 2025",
    title: "GEO : pourquoi votre site doit être cité par les IA",
    desc: "ChatGPT, Perplexity, Gemini... Comment optimiser son contenu pour être mentionné dans les réponses des assistants IA.",
  },
  {
    cat: "Site web",
    date: "Avril 2025",
    title: "WordPress vs sur mesure : comment choisir en 2025",
    desc: "Un guide sans jargon pour choisir entre WordPress et un développement sur mesure, selon votre budget et vos objectifs.",
  },
];

function Blog() {
  return (
    <section id="blog" className="px-6 py-20 md:px-12 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <MaskedLine>
          <h2 className="font-display text-5xl uppercase text-[#F2F7F5] md:text-7xl">
            Sur le blog
          </h2>
        </MaskedLine>
        <a
          href="#blog"
          className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#1FCE8A]"
        >
          Voir tous les articles
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
        </a>
      </div>
      <div className="mt-16 grid gap-px bg-[#22302B] md:grid-cols-3">
        {POSTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <article
              className="group flex h-full flex-col bg-[#0A1212] p-8 transition-colors duration-500 hover:bg-[#101B18]"
              data-hover
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em]">
                <span className="bg-[#1FCE8A] px-2 py-1 font-bold text-[#0A1212]">{p.cat}</span>
                <span className="text-[#8FA39C]">{p.date}</span>
              </div>
              <h3 className="mt-8 text-2xl font-semibold leading-snug text-[#F2F7F5]">
                {p.title}
              </h3>
              <p className="mt-4 flex-1 leading-relaxed text-[#8FA39C]">{p.desc}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#F2F7F5] transition-colors group-hover:text-[#1FCE8A]">
                Lire l'article
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
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
  {
    q: "Vous travaillez avec quel type d'entreprises ?",
    a: "Principalement des PME, indépendants et commerces luxembourgeois qui veulent un site professionnel et une vraie visibilité locale. Vitrine, e-commerce ou plateforme spécifique : on s'adapte à votre secteur et à votre budget.",
  },
  {
    q: "Combien coûte un site web ?",
    a: "Cela dépend du périmètre : un site vitrine sur mesure n'a pas le même budget qu'une plateforme e-commerce. Après un premier appel de cadrage, vous recevez un devis clair et détaillé — sans frais cachés.",
  },
  {
    q: "En combien de temps peut-on être visible sur Google ?",
    a: "Le SEO est un travail de fond : les premiers effets se voient généralement entre 3 et 6 mois. Sur des mots-clés locaux Luxembourg bien ciblés, les résultats peuvent arriver plus vite — comme le +240% de trafic organique obtenu en 6 mois.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-t border-[#22302B] px-6 py-20 md:px-12 md:py-32">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <MaskedLine>
            <h2 className="font-display text-5xl uppercase text-[#F2F7F5] md:text-6xl">
              Questions fréquentes
            </h2>
          </MaskedLine>
        </div>
        <div className="md:col-span-8">
          {FAQS.map((f, i) => (
            <div key={f.q} className="border-b border-[#22302B] first:border-t">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-8 text-left"
                aria-expanded={open === i}
              >
                <span className="text-xl font-semibold text-[#F2F7F5] md:text-2xl">{f.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="shrink-0"
                >
                  <Plus className="h-6 w-6 text-[#1FCE8A]" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-3xl pb-8 text-lg leading-relaxed text-[#8FA39C]">
                      {f.a}
                    </p>
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
    <section
      id="contact"
      className="relative overflow-hidden border-t border-[#22302B] px-6 py-20 md:px-12 md:py-32"
    >
      <Embers />
      <div className="relative grid gap-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <div className="text-xs uppercase tracking-[0.3em] text-[#1FCE8A]">( Contact )</div>
          <h2 className="font-display mt-6 text-6xl uppercase leading-[0.9] text-[#F2F7F5] md:text-[8vw]">
            Un projet<span className="text-[#1FCE8A]">&nbsp;?</span>
          </h2>
          <p className="mt-8 max-w-md text-xl leading-relaxed text-[#8FA39C]">
            Une question, un projet ? Écrivez-nous, on vous répond rapidement.
          </p>
        </div>
        <div className="md:col-span-6">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex h-full flex-col items-start justify-center border border-[#1FCE8A] p-10"
            >
              <span className="font-display text-4xl uppercase text-[#1FCE8A]">Merci !</span>
              <p className="mt-4 text-lg text-[#F2F7F5]">
                Votre message est prêt — ceci est une maquette : le formulaire sera branché à
                l'envoi réel lors de la mise en production.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-8"
            >
              <div>
                <label
                  htmlFor="nom"
                  className="text-[10px] uppercase tracking-[0.3em] text-[#8FA39C]"
                >
                  Nom
                </label>
                <input
                  id="nom"
                  type="text"
                  required
                  autoComplete="name"
                  className="mt-2 w-full border-b border-[#32423C] bg-transparent py-4 text-xl text-[#F2F7F5] outline-none transition-colors duration-300 focus:border-[#1FCE8A]"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-[10px] uppercase tracking-[0.3em] text-[#8FA39C]"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-2 w-full border-b border-[#32423C] bg-transparent py-4 text-xl text-[#F2F7F5] outline-none transition-colors duration-300 focus:border-[#1FCE8A]"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-[10px] uppercase tracking-[0.3em] text-[#8FA39C]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="mt-2 w-full resize-none border-b border-[#32423C] bg-transparent py-4 text-xl text-[#F2F7F5] outline-none transition-colors duration-300 focus:border-[#1FCE8A]"
                />
              </div>
              <Magnetic>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 bg-[#1FCE8A] px-10 py-5 text-sm font-bold uppercase tracking-[0.25em] text-[#0A1212]"
                >
                  Envoyer
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
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
    <footer className="relative overflow-hidden border-t border-[#22302B]">
      <div className="flex flex-wrap items-center justify-between gap-6 px-6 py-10 text-xs uppercase tracking-[0.3em] text-[#8FA39C] md:px-12">
        <span className="flex items-center gap-3">
          <Logo className="h-5" />
          <span>© 2026 — Luxembourg</span>
        </span>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <Link to="/creation-site-web" className="transition-colors hover:text-[#1FCE8A]">
            Création
          </Link>
          <Link to="/seo-geo" className="transition-colors hover:text-[#1FCE8A]">
            SEO & GEO
          </Link>
          <Link to="/communication" className="transition-colors hover:text-[#1FCE8A]">
            Communication
          </Link>
          <Link to="/lexique" className="transition-colors hover:text-[#1FCE8A]">
            Lexique
          </Link>
          <Link to="/#contact" className="transition-colors hover:text-[#1FCE8A]">
            Contact
          </Link>
        </div>
        <span>FR / EN</span>
      </div>
      <div className="px-2 pb-4">
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "60%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="font-display text-stroke select-none text-center text-[19vw] leading-[0.9]"
          >
            CAFEIN
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

/* ================= HOME ================= */
function Home({ started }: { started: boolean }) {
  usePageMeta(
    "Cafein — Agence de communication digitale au Luxembourg",
    "Création de sites web, SEO & GEO, communication digitale : Cafein rend votre entreprise visible sur Google, les réseaux sociaux et les IA génératives."
  );
  return (
    <main>
      <Hero started={started} />
      <Manifesto />
      <Services />
      <Stats />
      <Process />
      <Timeline />
      <Work />
      <Results />
      <Why />
      <Blog />
      <Faq />
      <Contact />
    </main>
  );
}



/* ================= DEFILEMENT FLUIDE (Lenis) ================= */
function SmoothScroll() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    // On garde le scroll natif sur tactile (stabilité iOS)
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.05 });
    (window as never as { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as never as { __lenis?: Lenis }).__lenis;
    };
  }, [reduced]);
  return null;
}

/* ================= TRANSITION DE PAGE (rideau) ================= */
function RouteCurtain() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setShow(true);
    const t = window.setTimeout(() => setShow(false), 600);
    return () => clearTimeout(t);
  }, [pathname]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-0 z-[150] flex items-center justify-center bg-[#1FCE8A]"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            <svg viewBox="0 0 30 41" className="h-14 w-auto" aria-hidden fill="none">
              <path d="M0 0.558716V23.2477C0 27.7947 1.72257 32.2022 4.91942 35.4301C5.29187 35.8026 5.69536 36.1751 6.12989 36.5475C10.801 40.4739 15.9222 40.8153 17.443 40.8618V18.3902C17.443 14.2466 16.0308 10.2116 13.315 7.07675C13.1909 6.93707 13.0823 6.81292 12.9581 6.67325C8.0542 1.35019 1.62946 0.66735 0 0.558716Z" fill="#0A1212"/>
              <path d="M29.92 7.71301V19.492C29.92 21.8509 29.0199 24.1477 27.375 25.8238C27.1732 26.0256 26.9715 26.2118 26.7542 26.398C24.3333 28.431 21.6796 28.6173 20.8882 28.6328V16.9779C20.8882 14.8363 21.6175 12.7257 23.0297 11.1117C23.0918 11.0341 23.1539 10.972 23.216 10.91C25.7455 8.11652 29.0665 7.77509 29.92 7.71301Z" fill="#0A1212"/>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================= SCROLL MANAGER ================= */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const lenis = (window as never as { __lenis?: Lenis }).__lenis;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        window.setTimeout(() => {
          if (lenis) lenis.scrollTo(el as HTMLElement);
          else el.scrollIntoView({ behavior: "smooth" });
        }, 80);
        return;
      }
    }
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

/* ================= APP ================= */
export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  return (
    <BrowserRouter>
      <div className="grain relative min-h-screen bg-[#0A1212] text-[#F2F7F5]">
        <Cursor />
        <motion.div
          className="fixed inset-x-0 top-0 z-[95] h-[3px] origin-left bg-[#1FCE8A]"
          style={{ scaleX: progress }}
        />
        <AnimatePresence>{loading && <Preloader onDone={() => setLoading(false)} />}</AnimatePresence>
        <SmoothScroll />
        <ScrollManager />
        <RouteCurtain />
        <Nav />
        <Routes>
          <Route path="/" element={<Home started={!loading} />} />
          <Route path="/creation-site-web" element={<Creation />} />
          <Route path="/seo-geo" element={<SeoGeo />} />
          <Route path="/communication" element={<Communication />} />
          <Route path="/lexique" element={<Lexique />} />
          <Route path="/lexique/:slug" element={<LexiqueTerme />} />
          <Route path="*" element={<Home started={!loading} />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
