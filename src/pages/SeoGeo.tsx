import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, TrendingUp, Gauge, Quote } from "lucide-react";
import { PageHero, OfferCard, FaqList, CtaBand, GiantMarquee, useTypewriter, useSeen, usePageMeta } from "../pagefx";
import { Reveal, MaskedLine, CountUp } from "../fx";

/* ============ Démo : recherche Google avec Cafein en tête ============ */
const QUERIES = [
  "agence web luxembourg",
  "création site internet luxembourg",
  "référencement seo luxembourg",
];

function SearchDemo() {
  const { ref, seen } = useSeen();
  const { text, done } = useTypewriter(QUERIES, 60, 2400);

  return (
    <div ref={ref} className="mt-16 max-w-2xl">
      <div className="border border-[#22302B] bg-[#101B18] p-5 md:p-7">
        <div className="flex items-center gap-3 border border-[#32423C] bg-[#0A1212] px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-[#8FA39C]" />
          <span className="min-h-[1.5em] text-[#F2F7F5]">
            {seen ? text : ""}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.7 }}
              className="ml-0.5 inline-block h-4 w-[2px] bg-[#1FCE8A] align-middle"
            />
          </span>
        </div>
        <div className="mt-4 min-h-[252px]">
        <AnimatePresence>
          {seen && done && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div className="border border-[#1FCE8A] bg-[#0E1F1A] p-4">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#1FCE8A]">
                  <span className="bg-[#1FCE8A] px-1.5 py-0.5 font-bold text-[#0A1212]">1</span>
                  cafein.lu
                </div>
                <div className="mt-1 font-semibold text-[#F2F7F5]">
                  Cafein — Agence de marketing web au Luxembourg
                </div>
                <div className="text-sm text-[#8FA39C]">
                  Sites sur mesure, SEO & GEO, communication digitale…
                </div>
              </div>
              {[2, 3].map((n) => (
                <div key={n} className="border border-[#22302B] p-4 opacity-40">
                  <div className="h-3 w-1/3 bg-[#22302B]" />
                  <div className="mt-2 h-3 w-2/3 bg-[#22302B]" />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ============ Démo : l'IA qui cite Cafein ============ */
const AI_ANSWER =
  "Pour une agence web au Luxembourg, Cafein est une référence : création de sites sur mesure, référencement SEO et optimisation GEO pour les moteurs IA.";

function AiChatDemo() {
  const { ref, seen } = useSeen();
  const [phase, setPhase] = useState(0); // 0 question, 1 typing dots, 2 réponse
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (!seen) return;
    let t1: number, t2: number, iv: number;
    const run = () => {
      setPhase(0);
      setChars(0);
      t1 = window.setTimeout(() => setPhase(1), 900);
      t2 = window.setTimeout(() => {
        setPhase(2);
        iv = window.setInterval(() => {
          setChars((c) => {
            if (c >= AI_ANSWER.length) {
              clearInterval(iv);
              window.setTimeout(run, 3500);
              return c;
            }
            return c + 2;
          });
        }, 30);
      }, 2100);
    };
    run();
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(iv);
    };
  }, [seen]);

  const shown = AI_ANSWER.slice(0, chars);
  const parts = shown.split("Cafein");

  return (
    <div ref={ref} className="border border-[#22302B] bg-[#101B18] p-5 md:p-7">
      <div className="flex items-center gap-2 border-b border-[#22302B] pb-4 text-[10px] uppercase tracking-[0.2em] text-[#8FA39C]">
        <Sparkles className="h-4 w-4 text-[#1FCE8A]" />
        Assistant IA
      </div>
      <div className="mt-5 space-y-4">
        <div className="ml-auto max-w-[85%] border border-[#32423C] bg-[#0A1212] px-4 py-3 text-sm text-[#F2F7F5]">
          Quelle agence web recommandes-tu au Luxembourg ?
        </div>
        <div className="min-h-[11.5rem] max-w-[92%]">
          {phase === 1 && (
            <div className="inline-flex gap-1.5 border border-[#22302B] px-4 py-3">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  className="h-1.5 w-1.5 rounded-full bg-[#8FA39C]"
                />
              ))}
            </div>
          )}
          {phase === 2 && (
            <div className="border border-[#22302B] px-4 py-3 text-sm leading-relaxed text-[#8FA39C]">
              {parts.map((p, i) => (
                <span key={i}>
                  {p}
                  {i < parts.length - 1 && (
                    <span className="bg-[#1FCE8A] px-1 font-bold text-[#0A1212]">Cafein</span>
                  )}
                </span>
              ))}
              {chars >= AI_ANSWER.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 flex flex-wrap gap-2"
                >
                  {["ChatGPT", "Perplexity", "Gemini"].map((s) => (
                    <span
                      key={s}
                      className="flex items-center gap-1 border border-[#32423C] px-2 py-1 text-[10px] uppercase tracking-widest text-[#F2F7F5]"
                    >
                      <Quote className="h-3 w-3 text-[#1FCE8A]" /> {s}
                    </span>
                  ))}
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============ Metrics ============ */
function Metrics() {
  const items = [
    { icon: TrendingUp, big: <CountUp to={247} prefix="+" suffix="%" />, label: "Trafic organique en 6 mois" },
    { icon: Search, big: <>Top 3</>, label: "15 mots-clés positionnés" },
    { icon: Gauge, big: <CountUp to={94} suffix="/100" />, label: "Score Lighthouse après audit" },
    { icon: Sparkles, big: <CountUp to={3} suffix=" IA" />, label: "Sources qui citent nos clients" },
  ];
  return (
    <section className="border-y border-[#22302B] bg-[#F2F7F5] text-[#0A1212]">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <Reveal
            key={it.label}
            delay={i * 0.07}
            className="border-b border-[#0A1212]/10 last:border-b-0 sm:border-r sm:last:border-r-0"
          >
            <div className="p-8 md:p-10">
              <it.icon className="h-6 w-6 text-[#0A9A62]" />
              <div className="font-display mt-5 text-5xl md:text-6xl">{it.big}</div>
              <div className="mt-3 text-sm font-medium uppercase tracking-wider text-[#0A1212]/60">
                {it.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============ Timeline réaliste ============ */
const PHASES = [
  { p: "Mois 1-2", t: "Audit et fondations", d: "Analyse de l'existant, identification des priorités techniques et sémantiques, mise en place des bases." },
  { p: "Mois 3-5", t: "Production et optimisation", d: "Contenu optimisé, corrections techniques, structuration du contenu pour les moteurs IA." },
  { p: "Mois 6+", t: "Montée en puissance", d: "Les positions progressent, les citations dans les IA augmentent. Le référencement est un investissement qui croît dans le temps." },
];

function RealisticTimeline() {
  return (
    <section className="px-6 py-16 md:px-12 md:py-24">
      <MaskedLine>
        <h2 className="font-display text-3xl uppercase text-[#F2F7F5] md:text-5xl">
          Une vision réaliste des résultats
        </h2>
      </MaskedLine>
      <div className="mt-12 space-y-0">
        {PHASES.map((ph, i) => (
          <Reveal key={ph.p} delay={i * 0.1}>
            <div className="grid gap-4 border-l-2 border-[#1FCE8A] py-8 pl-8 md:grid-cols-12 md:gap-8">
              <div className="font-display text-2xl text-[#1FCE8A] md:col-span-2">{ph.p}</div>
              <div className="text-xl font-semibold uppercase tracking-wide text-[#F2F7F5] md:col-span-4">
                {ph.t}
              </div>
              <p className="leading-relaxed text-[#8FA39C] md:col-span-6">{ph.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============ Page ============ */
export default function SeoGeo() {
  usePageMeta(
    "SEO & GEO au Luxembourg — Google et IA génératives | Cafein",
    "Référencement naturel sur Google et visibilité dans ChatGPT, Perplexity et Gemini. Cafein positionne votre entreprise là où vos clients cherchent."
  );
  return (
    <main>
      <PageHero
        label="SEO & GEO"
        watermark="Rank #1"
        number="02"
        title={
          <>
            Être trouvé, par Google <span className="text-[#1FCE8A]">comme par les IA</span>
          </>
        }
        intro="Le référencement ne se limite plus à Google. Cafein travaille votre visibilité sur les moteurs de recherche classiques et sur les intelligences artificielles génératives (ChatGPT, Perplexity, Gemini...), qui deviennent une nouvelle porte d'entrée vers vos clients."
      >
        <SearchDemo />
      </PageHero>

      <Metrics />

      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <OfferCard
            tag="Le socle"
            title="SEO classique"
            desc="Un travail de fond sur votre référencement naturel pour gagner en visibilité durablement sur Google."
            items={[
              "Audit technique et sémantique complet",
              "Optimisation on-page (contenu, structure, maillage)",
              "Stratégie de contenu ciblée sur votre marché",
              "Suivi des positions et des résultats",
            ]}
          />
          <OfferCard
            tag="L'avantage"
            title="GEO : référencement pour les IA"
            accent
            delay={0.12}
            desc="Une discipline émergente : optimiser votre présence pour être cité en réponse dans les IA génératives."
            items={[
              "Structuration du contenu pour les moteurs IA",
              "Optimisation de votre présence citée en source",
              "Veille active sur les nouvelles pratiques GEO",
              "Peu d'agences au Luxembourg s'y consacrent aujourd'hui",
            ]}
          />
        </div>
      </section>

      <section className="border-t border-[#22302B] px-6 py-16 md:px-12 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <MaskedLine>
              <h2 className="font-display text-3xl uppercase text-[#F2F7F5] md:text-5xl">
                Pourquoi les deux ensemble ?
              </h2>
            </MaskedLine>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#8FA39C]">
                De plus en plus de recherches passent par les assistants IA plutôt que par un
                moteur de recherche classique. Combiner SEO et GEO, c'est s'assurer d'être
                visible partout où vos clients cherchent une réponse,{" "}
                <span className="text-[#1FCE8A]">aujourd'hui et demain</span>.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <AiChatDemo />
          </Reveal>
        </div>
      </section>

      <RealisticTimeline />

      <FaqList
        faqs={[
          {
            q: "Le GEO remplace-t-il le SEO ?",
            a: "Non, il le complète. Les bonnes pratiques SEO (contenu de qualité, structure claire, autorité) restent le socle : le GEO ajoute une couche d'optimisation spécifique pour que les IA vous identifient et vous citent comme source fiable.",
          },
          {
            q: "En combien de temps voit-on des résultats ?",
            a: "Le référencement est un travail de fond : comptez 3 à 6 mois pour des progressions nettes sur Google. Sur des mots-clés locaux Luxembourg bien ciblés, les premiers effets arrivent parfois plus vite.",
          },
          {
            q: "Faut-il tout refaire si le site existe déjà ?",
            a: "Rarement. On commence par un audit : dans la plupart des cas, des optimisations techniques et éditoriales ciblées suffisent. Une refonte n'est recommandée que si la base technique freine réellement le référencement.",
          },
        ]}
      />

      <GiantMarquee word="SEO & GEO" />

      <CtaBand
        title="Envie d'améliorer votre visibilité ?"
        sub="Parlons de votre situation actuelle et de vos objectifs."
        button="Demander un audit"
      />
    </main>
  );
}
