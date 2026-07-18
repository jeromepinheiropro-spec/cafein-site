import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getTerme, TERMES } from "../lexique-data";
import { ScrambleText, Corners, Glow, CtaBand, EASE, usePageMeta } from "../pagefx";
import { Reveal, Magnetic } from "../fx";

const SERVICE_BY_CAT: Record<string, { to: string; label: string }> = {
  SEO: { to: "/seo-geo", label: "Notre offre SEO & GEO" },
  "GEO & IA": { to: "/seo-geo", label: "Notre offre SEO & GEO" },
  "Site web": { to: "/creation-site-web", label: "Notre offre création de site" },
  "Social media": { to: "/communication", label: "Notre offre communication" },
  Publicité: { to: "/communication", label: "Notre offre communication" },
  "Data & mesure": { to: "/seo-geo", label: "Notre offre SEO & GEO" },
};

export default function LexiqueTerme() {
  const { slug } = useParams<{ slug: string }>();
  const terme = slug ? getTerme(slug) : undefined;

  usePageMeta(
    terme
      ? `${terme.term} — Définition | Lexique Cafein`
      : "Lexique du digital | Cafein",
    terme ? terme.short : "Le lexique du marketing digital par Cafein, Luxembourg."
  );

  if (!terme) return <Navigate to="/lexique" replace />;

  const related = terme.related
    .map((s) => getTerme(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const idx = TERMES.findIndex((t) => t.slug === terme.slug);
  const service = SERVICE_BY_CAT[terme.cat];

  return (
    <main>
      {/* En-tête */}
      <section className="relative overflow-hidden px-6 pb-14 pt-32 md:px-12 md:pb-20 md:pt-44">
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
        <Glow variant={1} />
        <motion.span
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
          aria-hidden
          className="font-display pointer-events-none absolute bottom-4 right-6 select-none text-7xl leading-none text-[#1FCE8A]/15 md:right-12 md:text-[10rem]"
        >
          {String(idx + 1).padStart(2, "0")}
        </motion.span>
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-wrap items-center gap-x-4 gap-y-3"
          >
            <Link
              to="/lexique"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#8FA39C] transition-colors hover:text-[#1FCE8A]"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              Lexique
            </Link>
            <span className="text-[#22302B]">/</span>
            <span className="border border-[#22302B] px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-[#1FCE8A]">
              <ScrambleText text={terme.cat} />
            </span>
          </motion.div>
          <h1 className="font-display mt-8 max-w-5xl text-4xl uppercase leading-[0.98] text-[#F2F7F5] md:text-7xl">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
              >
                {terme.term}
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-[#1FCE8A] md:text-xl"
          >
            {terme.short}
          </motion.p>
        </div>
      </section>

      {/* Définition */}
      <section className="px-6 pb-20 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            className="relative border border-[#22302B] bg-[#101B18] p-7 md:p-12"
          >
            <Corners />
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#8FA39C]">
              Définition
            </span>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-[#F2F7F5]/85 md:text-xl">
              {terme.def.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {service && (
              <div className="mt-10 border-t border-[#22302B] pt-8">
                <Magnetic>
                  <Link
                    to={service.to}
                    className="group inline-flex items-center gap-3 border border-[#1FCE8A] px-7 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[#1FCE8A] transition-colors duration-300 hover:bg-[#1FCE8A] hover:text-[#0A1212]"
                  >
                    {service.label}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </Magnetic>
              </div>
            )}
          </motion.article>

          {/* Termes liés */}
          <aside>
            <Reveal>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8FA39C]">
                Termes liés
              </span>
              <div className="mt-5 flex flex-col gap-3">
                {related.map((r, i) => (
                  <Reveal key={r.slug} delay={0.05 * i}>
                    <Link
                      to={`/lexique/${r.slug}`}
                      className="group block border border-[#22302B] p-4 transition-all duration-300 hover:border-[#1FCE8A]/60 hover:bg-[#101B18]"
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-display text-base uppercase text-[#F2F7F5] transition-colors group-hover:text-[#1FCE8A]">
                          {r.term}
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#8FA39C] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1FCE8A]" />
                      </span>
                      <span className="mt-1.5 block text-xs leading-relaxed text-[#8FA39C]">
                        {r.short}
                      </span>
                    </Link>
                  </Reveal>
                ))}
                <Reveal delay={0.05 * related.length}>
                  <Link
                    to="/lexique"
                    className="mt-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#1FCE8A] hover:underline hover:underline-offset-4"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Tout le lexique
                  </Link>
                </Reveal>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <CtaBand
        title={`Besoin d'aide sur le sujet « ${terme.term.replace(/\s*\(.*\)$/, "")} » ?`}
        sub="On traduit, on conseille, on exécute. Parlons de votre projet."
        button="Contacter Cafein"
      />
    </main>
  );
}
