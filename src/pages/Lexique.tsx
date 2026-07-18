import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { TERMES, CATS, groupByLetter, type Terme } from "../lexique-data";
import { PageHero, Corners, GiantMarquee, CtaBand, EASE, usePageMeta } from "../pagefx";
import { Reveal } from "../fx";

const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

/* ---------- Carte d'un terme ---------- */
function TermeCard({ t, i }: { t: Terme; i: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, delay: Math.min(i * 0.03, 0.3), ease: EASE }}
    >
      <Link
        to={`/lexique/${t.slug}`}
        className="group relative block h-full border border-[#22302B] bg-[#101B18] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#1FCE8A]/60 hover:shadow-[0_0_50px_rgba(31,206,138,0.12)]"
      >
        <Corners />
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl uppercase leading-tight text-[#F2F7F5] transition-colors duration-300 group-hover:text-[#1FCE8A]">
            {t.term}
          </h3>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[#8FA39C] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#1FCE8A]" />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[#8FA39C]">{t.short}</p>
        <span className="mt-4 inline-block border border-[#22302B] px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-[#8FA39C] transition-colors duration-300 group-hover:border-[#1FCE8A]/40 group-hover:text-[#1FCE8A]">
          {t.cat}
        </span>
      </Link>
    </motion.div>
  );
}

/* ---------- Liste + filtres ---------- */
function Glossaire() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [letter, setLetter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = TERMES;
    if (cat) list = list.filter((t) => t.cat === cat);
    if (query.trim()) {
      const q = norm(query);
      list = list.filter((t) => norm(t.term).includes(q) || norm(t.short).includes(q));
    }
    return list;
  }, [query, cat]);

  const groups = useMemo(() => groupByLetter(filtered), [filtered]);
  const allLetters = useMemo(() => Object.keys(groupByLetter(TERMES)), []);
  const activeLetters = Object.keys(groups);
  const shownLetters = letter && activeLetters.includes(letter) ? [letter] : activeLetters;

  return (
    <section className="relative px-6 pb-24 md:px-12">
      {/* Recherche + filtres */}
      <div className="sticky top-0 z-40 -mx-6 border-b border-[#22302B] bg-[#0A1212]/90 px-6 py-5 backdrop-blur-md md:-mx-12 md:px-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8FA39C]" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLetter(null);
              }}
              placeholder="Rechercher un terme…"
              aria-label="Rechercher un terme du lexique"
              className="w-full border-b border-[#32423C] bg-transparent py-3 pl-7 pr-8 text-base text-[#F2F7F5] outline-none transition-colors duration-300 placeholder:text-[#8FA39C]/60 focus:border-[#1FCE8A]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Effacer la recherche"
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-[#8FA39C] hover:text-[#F2F7F5]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCat(null)}
              className={
                "border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 " +
                (cat === null
                  ? "border-[#1FCE8A] bg-[#1FCE8A] text-[#0A1212]"
                  : "border-[#22302B] text-[#8FA39C] hover:border-[#1FCE8A]/50 hover:text-[#F2F7F5]")
              }
            >
              Tout
            </button>
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(cat === c ? null : c)}
                className={
                  "border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 " +
                  (cat === c
                    ? "border-[#1FCE8A] bg-[#1FCE8A] text-[#0A1212]"
                    : "border-[#22302B] text-[#8FA39C] hover:border-[#1FCE8A]/50 hover:text-[#F2F7F5]")
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        {/* A → Z */}
        <div className="mt-4 flex flex-wrap gap-1">
          {allLetters.map((l) => {
            const enabled = activeLetters.includes(l);
            return (
              <button
                key={l}
                disabled={!enabled}
                onClick={() => setLetter(letter === l ? null : l)}
                className={
                  "font-display h-8 w-8 text-sm uppercase transition-colors duration-200 " +
                  (letter === l
                    ? "bg-[#1FCE8A] text-[#0A1212]"
                    : enabled
                      ? "text-[#F2F7F5] hover:text-[#1FCE8A]"
                      : "cursor-default text-[#8FA39C]/25")
                }
              >
                {l}
              </button>
            );
          })}
        </div>
      </div>

      {/* Compteur */}
      <p className="mt-8 text-xs uppercase tracking-[0.3em] text-[#8FA39C]">
        {filtered.length} terme{filtered.length > 1 ? "s" : ""}
        {cat ? ` — ${cat}` : ""}
      </p>

      {/* Groupes par lettre */}
      <div className="mt-6 min-h-[40vh]">
        {shownLetters.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-display text-3xl uppercase text-[#F2F7F5]">Aucun résultat</p>
            <p className="mt-3 text-[#8FA39C]">
              Essayez un autre terme, ou{" "}
              <Link to="/#contact" className="text-[#1FCE8A] underline underline-offset-4">
                posez-nous la question
              </Link>
              .
            </p>
          </div>
        )}
        {shownLetters.map((l) => (
          <div key={l} className="mt-14 first:mt-8">
            <div className="flex items-center gap-6">
              <span className="font-display text-stroke select-none text-6xl uppercase leading-none md:text-7xl">
                {l}
              </span>
              <span className="h-px flex-1 bg-[#22302B]" />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {groups[l].map((t, i) => (
                  <TermeCard key={t.slug} t={t} i={i} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Bandeau pédagogique ---------- */
function Pourquoi() {
  return (
    <section className="border-t border-[#22302B] bg-[#F2F7F5] px-6 py-20 text-[#0A1212] md:px-12 md:py-28">
      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        <Reveal>
          <h2 className="font-display text-4xl uppercase leading-[0.95] md:text-6xl">
            Le jargon,
            <br />
            <span className="text-[#0A9A62]">traduit.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-5 text-lg leading-relaxed text-[#0A1212]/70">
            <p>
              SEO, GEO, Core Web Vitals, retargeting… Le digital adore les acronymes. Ce lexique
              traduit chaque terme en français clair, avec un angle concret pour les entreprises du
              Luxembourg et de la Grande Région.
            </p>
            <p>
              Chaque définition est une page dédiée que vous pouvez partager à un collègue ou un
              client. Et si un mot vous manque,{" "}
              <Link to="/#contact" className="font-semibold text-[#0A9A62] underline underline-offset-4">
                dites-le-nous
              </Link>{" "}
              — on l'ajoute.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Lexique() {
  usePageMeta(
    "Lexique du digital — SEO, GEO, web & social media | Cafein",
    "Plus de 70 termes du marketing digital expliqués en français clair : SEO, GEO, site web, social media, publicité, data. Le lexique de l'agence Cafein, Luxembourg."
  );
  return (
    <main>
      <PageHero
        label="Lexique"
        title={
          <>
            Le digital, <span className="text-[#1FCE8A]">sans jargon</span>
          </>
        }
        intro={`${TERMES.length} termes du web, du SEO, du GEO et du social media expliqués simplement. Cliquez sur un mot pour ouvrir sa définition complète.`}
        watermark="A → Z"
        number="04"
      />
      <Glossaire />
      <Pourquoi />
      <GiantMarquee word="Lexique" />
      <CtaBand
        title="Un terme vous échappe encore ?"
        sub="Posez-nous la question — ou confiez-nous carrément le sujet."
        button="Parlons-en"
      />
    </main>
  );
}
