import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { PageHero, OfferCard, Checklist, Steps, FaqList, CtaBand, GiantMarquee, EASE, useSeen } from "../pagefx";
import { Reveal, MaskedLine, Marquee } from "../fx";

/* ============ Démo : le site qui se construit tout seul ============ */
const CODE_LINES = [
  "<header> Cafein · Studio </header>",
  "<h1> Votre site, sur mesure </h1>",
  '<p class="intro"> Rapide. Propre. Efficace. </p>',
  '<section class="cards"> · · · </section>',
  '<button class="cta"> Contactez-nous </button>',
];

function BuildDemo() {
  const { ref, seen } = useSeen();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!seen) return;
    const id = setInterval(() => {
      setStep((s) => (s >= CODE_LINES.length ? 0 : s + 1));
    }, 1300);
    return () => clearInterval(id);
  }, [seen]);

  return (
    <div ref={ref} className="mt-16 grid gap-6 lg:grid-cols-2">
      {/* Éditeur de code */}
      <div className="overflow-hidden border border-[#22302B] bg-[#0D1614]">
        <div className="flex items-center gap-2 border-b border-[#22302B] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#32423C]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#32423C]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#1FCE8A]" />
          <span className="ml-3 text-[10px] uppercase tracking-[0.2em] text-[#8FA39C]">
            cafein.studio — index.html
          </span>
        </div>
        <div className="min-h-[260px] p-5 font-mono text-sm leading-7">
          {CODE_LINES.slice(0, step).map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="whitespace-pre text-[#8FA39C]"
            >
              <span className="mr-4 select-none text-[#32423C]">{i + 1}</span>
              <span className="text-[#1FCE8A]">{l.match(/<[^>]+>/)?.[0]}</span>
              <span className="text-[#F2F7F5]">{l.replace(/<[^>]+>/g, " ").trim()}</span>
            </motion.div>
          ))}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="ml-9 inline-block h-4 w-2 bg-[#1FCE8A] align-middle"
          />
        </div>
      </div>

      {/* Aperçu qui se construit */}
      <div className="relative overflow-hidden border border-[#22302B] bg-[#101B18]">
        <div className="flex items-center gap-2 border-b border-[#22302B] px-4 py-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#8FA39C]">
            https://votre-site.lu
          </span>
        </div>
        <div className="min-h-[260px] space-y-4 p-6">
          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                key="h"
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between border-b border-[#22302B] pb-3"
              >
                <span className="text-sm font-bold text-[#F2F7F5]">● Cafein Studio</span>
                <span className="flex gap-3 text-[10px] uppercase tracking-widest text-[#8FA39C]">
                  <span>Accueil</span>
                  <span>Services</span>
                </span>
              </motion.div>
            )}
            {step >= 2 && (
              <motion.div
                key="t"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-2xl font-bold leading-tight text-[#F2F7F5]"
              >
                Votre site, sur mesure
              </motion.div>
            )}
            {step >= 3 && (
              <motion.div
                key="p"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-[#8FA39C]"
              >
                Rapide. Propre. Efficace.
              </motion.div>
            )}
            {step >= 4 && (
              <motion.div key="c" className="grid grid-cols-3 gap-3" exit={{ opacity: 0 }}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.12 }}
                    className="h-16 border border-[#22302B] bg-gradient-to-br from-[#16352A] to-transparent"
                  />
                ))}
              </motion.div>
            )}
            {step >= 5 && (
              <motion.div
                key="b"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="relative inline-flex items-center bg-[#1FCE8A] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#0A1212]"
              >
                Contactez-nous
                <motion.span
                  initial={{ x: 40, y: 30, opacity: 0 }}
                  animate={{ x: 8, y: 6, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
                  className="absolute right-0 top-full text-[#F2F7F5]"
                >
                  <MousePointer2 className="h-5 w-5 fill-[#F2F7F5]" />
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}


/* ============ Types de sites — vitrine photo ============ */
const SITE_TYPES = [
  {
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    t: "Site vitrine",
    d: "Restaurants, cabinets, artisans : votre activité présentée avec soin.",
  },
  {
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    t: "E-commerce",
    d: "Vendez en ligne avec une boutique rapide et rassurante.",
  },
  {
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    t: "Plateforme",
    d: "SaaS, portails métier, outils internes : du sur mesure qui scale.",
  },
];

function SiteTypes() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
  }, []);
  return isDesktop ? <SiteTypesHorizontal /> : <SiteTypesGrid />;
}

/* Version desktop : le scroll vertical fait défiler les cartes horizontalement */
function SiteTypesHorizontal() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.08, 0.92], ["4%", "-52%"]);

  return (
    <section ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="flex items-end justify-between px-12">
          <h2 className="font-display text-4xl uppercase text-[#F2F7F5] md:text-6xl">
            Pour chaque type de projet
          </h2>
          <span className="hidden text-xs uppercase tracking-[0.3em] text-[#8FA39C] md:block">
            Scrollez ↓ pour explorer →
          </span>
        </div>
        <motion.div style={{ x }} className="mt-12 flex gap-8 pl-12">
          {SITE_TYPES.map((st, i) => (
            <div
              key={st.t}
              className="group relative w-[46vw] shrink-0 overflow-hidden border border-[#22302B]"
              data-hover
            >
              <div className="overflow-hidden">
                <img
                  src={st.img}
                  alt={st.t}
                  className="h-[52vh] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1212] via-[#0A1212]/25 to-transparent" />
              <span className="font-display absolute right-6 top-4 text-7xl text-[#F2F7F5]/20">
                0{i + 1}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-8">
                <span className="font-display text-4xl uppercase text-[#F2F7F5]">{st.t}</span>
                <p className="mt-2 max-w-md leading-relaxed text-[#8FA39C]">{st.d}</p>
              </div>
            </div>
          ))}
          <div className="flex w-[30vw] shrink-0 items-center justify-center">
            <span className="font-display text-stroke select-none text-6xl uppercase">
              Et le vôtre ?
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* Version mobile : grille classique */
function SiteTypesGrid() {
  return (
    <section className="px-6 py-16 md:px-12 md:py-24">
      <MaskedLine>
        <h2 className="font-display text-3xl uppercase text-[#F2F7F5] md:text-5xl">
          Pour chaque type de projet
        </h2>
      </MaskedLine>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {SITE_TYPES.map((st, i) => (
          <Reveal key={st.t} delay={i * 0.1}>
            <div className="group relative overflow-hidden border border-[#22302B]" data-hover>
              <div className="overflow-hidden">
                <img
                  src={st.img}
                  alt={st.t}
                  className="h-56 w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 md:h-64"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1212] via-[#0A1212]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="font-display text-2xl uppercase text-[#F2F7F5] md:text-3xl">
                  {st.t}
                </span>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#8FA39C]">{st.d}</p>
              </div>
              <span className="absolute right-4 top-4 bg-[#1FCE8A] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0A1212]">
                0{i + 1}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============ Comparatif animé ============ */
const COMPARE = [
  { c: "Budget", w: "Plus accessible", s: "Plus élevé" },
  { c: "Délai de livraison", w: "2 à 4 semaines", s: "4 à 10 semaines" },
  { c: "Autonomie d'édition", w: "Très simple", s: "Selon intégration CMS" },
  { c: "Performance", w: "Bonne", s: "Excellente" },
  { c: "Flexibilité", w: "Standard", s: "Illimitée" },
  { c: "Idéal pour", w: "Vitrines, blogs", s: "SaaS, plateformes" },
];

function Compare() {
  return (
    <section className="border-t border-[#22302B] px-6 py-16 md:px-12 md:py-24">
      <MaskedLine>
        <h2 className="font-display text-3xl uppercase text-[#F2F7F5] md:text-5xl">
          WordPress ou sur mesure : en un coup d'œil
        </h2>
      </MaskedLine>
      <div className="mt-12 overflow-hidden border border-[#22302B]">
        <div className="grid grid-cols-3 bg-[#101B18] text-[10px] uppercase tracking-[0.2em] text-[#8FA39C] md:text-xs">
          <div className="p-4">Critère</div>
          <div className="border-l border-[#22302B] p-4">WordPress</div>
          <div className="border-l border-[#22302B] p-4 text-[#1FCE8A]">Sur mesure</div>
        </div>
        {COMPARE.map((r, i) => (
          <Reveal key={r.c} delay={i * 0.05}>
            <div className="grid grid-cols-3 border-t border-[#22302B] text-sm md:text-base">
              <div className="p-4 font-semibold text-[#F2F7F5]">{r.c}</div>
              <div className="border-l border-[#22302B] p-4 text-[#8FA39C]">{r.w}</div>
              <div className="border-l border-[#22302B] p-4 text-[#F2F7F5]">{r.s}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============ Page ============ */
export default function Creation() {
  return (
    <main>
      <PageHero
        label="Création de site web"
        watermark="Sites"
        number="01"
        title={
          <>
            Un site qui vous ressemble,{" "}
            <span className="text-[#1FCE8A]">pensé pour convertir</span>
          </>
        }
        intro="Que vous ayez besoin d'un site vitrine, d'une boutique en ligne ou d'une plateforme sur mesure, Cafein conçoit des sites rapides, propres et pensés pour transformer vos visiteurs en clients, pour les entreprises basées au Luxembourg comme à l'international."
      >
        <BuildDemo />
      </PageHero>

      <Marquee speed={28} className="border-y border-[#22302B] bg-[#101B18] py-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="mx-6 flex items-center gap-6 text-sm font-semibold uppercase tracking-[0.3em] text-[#F2F7F5]"
          >
            Vitrine <span className="text-[#1FCE8A]">✦</span> E-commerce{" "}
            <span className="text-[#1FCE8A]">✦</span> Plateforme{" "}
            <span className="text-[#1FCE8A]">✦</span> WordPress{" "}
            <span className="text-[#1FCE8A]">✦</span> Sur mesure{" "}
            <span className="text-[#1FCE8A]">✦</span>
          </span>
        ))}
      </Marquee>

      <SiteTypes />

      <section className="border-t border-[#22302B] px-6 py-16 md:px-12 md:py-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <OfferCard
            tag="Rapide à lancer"
            title="WordPress"
            desc="Un site professionnel, simple à mettre à jour vous-même, sur la plateforme la plus utilisée au monde."
            items={[
              "Design sur mesure, pas de template générique",
              "Interface d'édition simple pour gérer votre contenu",
              "Hébergement et maintenance possibles",
              "Idéal pour sites vitrine et blogs",
            ]}
          />
          <OfferCard
            tag="100% personnalisé"
            title="Sur mesure"
            accent
            delay={0.12}
            desc="Un développement entièrement sur mesure pour les projets qui ont besoin de performance, de fonctionnalités spécifiques ou d'une scalabilité particulière."
            items={[
              "Performance et vitesse de chargement optimales",
              "Fonctionnalités et intégrations spécifiques à votre métier",
              "Architecture pensée pour grandir avec votre activité",
              "Idéal pour SaaS, plateformes et projets complexes",
            ]}
          />
        </div>
      </section>

      <Checklist
        title="Inclus dans chaque projet"
        items={[
          "Design responsive (mobile, tablette, desktop)",
          "Structure SEO optimisée dès le départ",
          "Conformité RGPD de base",
          "Vitesse de chargement optimisée",
          "Formation à la prise en main",
          "Un mois de support après lancement",
        ]}
      />

      <Steps
        title="Comment on travaille"
        steps={[
          { n: "01", t: "Découverte", d: "On échange sur vos objectifs, votre cible et vos contraintes pour cadrer le projet." },
          { n: "02", t: "Design", d: "Maquettes et parcours utilisateur, alignés avec votre identité de marque." },
          { n: "03", t: "Développement", d: "Intégration et développement, avec des points d'étape réguliers." },
          { n: "04", t: "Lancement", d: "Mise en ligne, puis accompagnement pour le référencement et les évolutions." },
        ]}
      />

      <Compare />

      <FaqList
        faqs={[
          {
            q: "Puis-je modifier le contenu moi-même après livraison ?",
            a: "Oui. Sur WordPress, vous disposez d'une interface d'édition simple et d'une formation à la prise en main. Sur un développement sur mesure, un CMS peut être intégré selon vos besoins d'autonomie.",
          },
          {
            q: "La maintenance est-elle incluse ?",
            a: "Un mois de support est inclus après le lancement. Ensuite, nous proposons des formules de maintenance (mises à jour, sauvegardes, sécurité) adaptées à votre site.",
          },
          {
            q: "Vous intervenez aussi sur des sites existants ?",
            a: "Oui : refonte complète, optimisation des performances, ajout de fonctionnalités ou reprise d'un site abandonné par un autre prestataire — on commence par un audit de l'existant.",
          },
        ]}
      />

      <GiantMarquee word="Création" />

      <CtaBand
        title="Un projet de site web en tête ?"
        sub="Discutons-en, sans engagement."
        button="Demander un devis"
      />
    </main>
  );
}
