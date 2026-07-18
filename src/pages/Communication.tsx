import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Megaphone,
  PenTool,
  Target,
  CalendarDays,
} from "lucide-react";
import { PageHero, FaqList, CtaBand, useSeen } from "../pagefx";
import { Reveal, MaskedLine, Marquee } from "../fx";

/* ============ Démo : feed social vivant ============ */
const POSTS = [
  { author: "Cafein · Agence", text: "Nouveau site en ligne pour un client luxembourgeois 🚀 propre, rapide, efficace.", likes: 128 },
  { author: "Cafein · Agence", text: "3 conseils pour une marque qui rayonne sur LinkedIn — thread de la semaine.", likes: 96 },
  { author: "Cafein · Agence", text: "Campagne locale : +212% de portée en un mois pour un commerce de la Grande Région.", likes: 154 },
];

function PhoneDemo() {
  const { ref, seen } = useSeen();
  const [idx, setIdx] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!seen) return;
    const id = setInterval(() => {
      setLiked(false);
      setIdx((i) => (i + 1) % POSTS.length);
      window.setTimeout(() => setLiked(true), 1400);
    }, 3200);
    window.setTimeout(() => setLiked(true), 1400);
    return () => clearInterval(id);
  }, [seen]);

  const post = POSTS[idx];

  return (
    <div ref={ref} className="relative mx-auto mt-16 w-full max-w-[340px]">
      {/* halos flottants */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute -left-16 top-10 hidden border border-[#22302B] bg-[#101B18] px-4 py-3 md:block"
      >
        <div className="flex items-center gap-2 text-xs text-[#F2F7F5]">
          <Heart className="h-4 w-4 fill-[#1FCE8A] text-[#1FCE8A]" /> +1,2k
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
        className="absolute -right-20 bottom-24 hidden border border-[#22302B] bg-[#101B18] px-4 py-3 md:block"
      >
        <div className="flex items-center gap-2 text-xs text-[#F2F7F5]">
          <Share2 className="h-4 w-4 text-[#1FCE8A]" /> 340 partages
        </div>
      </motion.div>

      {/* téléphone */}
      <div className="overflow-hidden rounded-[2rem] border-2 border-[#22302B] bg-[#0D1614]">
        <div className="flex justify-center py-3">
          <span className="h-1.5 w-16 rounded-full bg-[#22302B]" />
        </div>
        <div className="space-y-3 px-4 pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.45 }}
              className="border border-[#22302B] bg-[#101B18] p-4"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1FCE8A] text-xs font-bold text-[#0A1212]">
                  C
                </span>
                <div>
                  <div className="text-sm font-semibold text-[#F2F7F5]">{post.author}</div>
                  <div className="text-[10px] uppercase tracking-widest text-[#8FA39C]">
                    à l'instant
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#F2F7F5]">{post.text}</p>
              <div className="mt-3 h-24 bg-gradient-to-br from-[#16352A] to-transparent" />
              <div className="mt-3 flex items-center gap-5 text-[#8FA39C]">
                <motion.span
                  animate={liked ? { scale: [1, 1.5, 1] } : {}}
                  className="flex items-center gap-1.5 text-sm"
                >
                  <Heart
                    className={
                      "h-4 w-4 transition-colors " +
                      (liked ? "fill-[#1FCE8A] text-[#1FCE8A]" : "")
                    }
                  />
                  {post.likes + (liked ? 1 : 0)}
                </motion.span>
                <span className="flex items-center gap-1.5 text-sm">
                  <MessageCircle className="h-4 w-4" /> 24
                </span>
                <span className="flex items-center gap-1.5 text-sm">
                  <Share2 className="h-4 w-4" /> 12
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="border border-[#22302B] p-4 opacity-40">
            <div className="h-3 w-1/2 bg-[#22302B]" />
            <div className="mt-2 h-3 w-3/4 bg-[#22302B]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ Services grid ============ */
const SERVICES = [
  {
    Icon: Target,
    t: "Stratégie",
    d: "Positionnement, ligne éditoriale, choix des canaux : un plan clair avant de publier quoi que ce soit.",
  },
  {
    Icon: Megaphone,
    t: "Social media",
    d: "Gestion de vos réseaux (LinkedIn, Instagram, Facebook...) : publications, communauté, réputation.",
  },
  {
    Icon: PenTool,
    t: "Contenus",
    d: "Textes, visuels et formats courts qui portent votre voix — cohérents avec votre marque et votre marché.",
  },
  {
    Icon: CalendarDays,
    t: "Campagnes",
    d: "Campagnes sponsorisées ciblées Luxembourg et Grande Région, pilotées aux résultats.",
  },
];

function ServicesGrid() {
  return (
    <section className="px-6 py-16 md:px-12 md:py-24">
      <MaskedLine>
        <h2 className="font-display text-3xl uppercase text-[#F2F7F5] md:text-5xl">
          Ce qu'on gère pour vous
        </h2>
      </MaskedLine>
      <div className="mt-12 grid gap-px bg-[#22302B] sm:grid-cols-2">
        {SERVICES.map((s, i) => (
          <Reveal key={s.t} delay={i * 0.08}>
            <div
              className="group h-full bg-[#0A1212] p-8 transition-colors duration-500 hover:bg-[#1FCE8A] md:p-12"
              data-hover
            >
              <s.Icon className="h-7 w-7 text-[#1FCE8A] transition-colors duration-500 group-hover:text-[#0A1212]" />
              <h3 className="font-display mt-6 text-2xl uppercase text-[#F2F7F5] transition-colors duration-500 group-hover:text-[#0A1212] md:text-3xl">
                {s.t}
              </h3>
              <p className="mt-3 leading-relaxed text-[#8FA39C] transition-colors duration-500 group-hover:text-[#06301F]">
                {s.d}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============ Semaine type ============ */
const WEEK = [
  { d: "Lun", a: "Post LinkedIn" },
  { d: "Mar", a: "Story coulisses" },
  { d: "Mer", a: "Article blog" },
  { d: "Jeu", a: "Réel produit" },
  { d: "Ven", a: "Newsletter" },
];

function WeekPlan() {
  return (
    <section className="border-y border-[#22302B] bg-[#101B18] px-6 py-16 md:px-12 md:py-24">
      <MaskedLine>
        <h2 className="font-display text-3xl uppercase text-[#F2F7F5] md:text-5xl">
          Une semaine type, orchestrée
        </h2>
      </MaskedLine>
      <p className="mt-4 max-w-2xl text-[#8FA39C]">
        Un calendrier éditorial régulier, pensé pour rester visible sans vous épuiser.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-5">
        {WEEK.map((w, i) => (
          <Reveal key={w.d} delay={i * 0.08}>
            <div className="border border-[#22302B] bg-[#0A1212] p-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#8FA39C]">{w.d}</div>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="mt-3 h-1 origin-left bg-[#1FCE8A]"
              />
              <div className="mt-3 font-semibold text-[#F2F7F5]">{w.a}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============ Page ============ */
export default function Communication() {
  return (
    <main>
      <PageHero
        label="Communication digitale"
        title={
          <>
            Une marque qui <span className="text-[#1FCE8A]">rayonne</span> sur tous les canaux
          </>
        }
        intro="Stratégie, réseaux sociaux, contenus et campagnes : Cafein gère votre communication digitale de A à Z pour faire exister votre marque auprès de vos clients, au Luxembourg et dans la Grande Région."
      >
        <PhoneDemo />
      </PageHero>

      <Marquee speed={26} className="border-y border-[#22302B] bg-[#F2F7F5] py-4 text-[#0A1212]">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="mx-6 flex items-center gap-6 text-sm font-semibold uppercase tracking-[0.3em]"
          >
            Stratégie <span className="text-[#0A9A62]">✦</span> Social media{" "}
            <span className="text-[#0A9A62]">✦</span> Contenus{" "}
            <span className="text-[#0A9A62]">✦</span> Campagnes{" "}
            <span className="text-[#0A9A62]">✦</span>
          </span>
        ))}
      </Marquee>

      <ServicesGrid />
      <WeekPlan />

      <FaqList
        faqs={[
          {
            q: "Sur quels réseaux intervenez-vous ?",
            a: "Principalement LinkedIn, Instagram et Facebook — les canaux les plus pertinents pour les entreprises luxembourgeoises. Le choix final dépend de votre cible : on ne vous fera jamais publier partout pour publier partout.",
          },
          {
            q: "Créez-vous aussi les visuels et les textes ?",
            a: "Oui, la production de contenus fait partie de l'accompagnement : textes, visuels, formats courts. Vous validez, on publie — vous gardez toujours la main sur votre image.",
          },
          {
            q: "Quel budget prévoir pour les campagnes sponsorisées ?",
            a: "Le budget média dépend de vos objectifs et de votre marché. On démarre généralement avec un budget test maîtrisé, puis on réalloue vers ce qui performe. Vous recevez un reporting clair chaque mois.",
          },
        ]}
      />

      <CtaBand
        title="Votre marque mérite d'être vue"
        sub="Parlons de votre communication, sans engagement."
        button="Parlons-en"
      />
    </main>
  );
}
