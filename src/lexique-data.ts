export type Terme = {
  slug: string;
  term: string;
  cat: "SEO" | "GEO & IA" | "Site web" | "Social media" | "Publicité" | "Data & mesure";
  short: string;
  def: string[];
  related: string[];
};

export const CATS = ["SEO", "GEO & IA", "Site web", "Social media", "Publicité", "Data & mesure"] as const;

export const TERMES: Terme[] = [
  {
    slug: "seo",
    term: "SEO (référencement naturel)",
    cat: "SEO",
    short: "L'art de positionner votre site en haut des résultats Google sans payer de publicité.",
    def: [
      "Le SEO (Search Engine Optimization), ou référencement naturel, regroupe toutes les techniques qui permettent à un site web d'apparaître dans les premiers résultats des moteurs de recherche comme Google, sans acheter de publicité. Il repose sur trois piliers : la technique (vitesse, structure), le contenu (mots-clés, pertinence) et la popularité (liens entrants).",
      "Pour une entreprise au Luxembourg, un bon SEO signifie être trouvé par des clients locaux au moment exact où ils cherchent vos services. C'est un investissement de fond : les résultats se construisent sur plusieurs mois mais durent dans le temps, contrairement à la publicité qui s'arrête dès que le budget est coupé.",
    ],
    related: ["serp", "mots-cles", "seo-local", "netlinking", "geo"],
  },
  {
    slug: "geo",
    term: "GEO (Generative Engine Optimization)",
    cat: "GEO & IA",
    short: "Le référencement nouvelle génération : être cité par ChatGPT, Perplexity ou Gemini.",
    def: [
      "Le GEO (Generative Engine Optimization) est la discipline émergente qui consiste à optimiser votre présence en ligne pour être cité comme source par les intelligences artificielles génératives : ChatGPT, Perplexity, Gemini, Claude... Quand un prospect demande à une IA « quelle agence web au Luxembourg ? », le GEO détermine si votre nom apparaît dans la réponse.",
      "Concrètement, le GEO passe par un contenu structuré et factuel, des données claires (schema.org), une autorité démontrée et une présence dans les sources que les IA consultent. Peu d'agences au Luxembourg travaillent ce levier aujourd'hui — c'est précisément l'une des spécialités de Cafein.",
    ],
    related: ["seo", "ia-generative", "llm", "donnees-structurees"],
  },
  {
    slug: "serp",
    term: "SERP",
    cat: "SEO",
    short: "La page de résultats de Google — le champ de bataille du référencement.",
    def: [
      "La SERP (Search Engine Results Page) est la page de résultats affichée par un moteur de recherche après une requête. Elle mélange résultats naturels, annonces payantes, cartes locales, images, extraits enrichis et, de plus en plus, réponses générées par IA.",
      "Comprendre la SERP de vos mots-clés est essentiel : elle révèle vos concurrents réels et le type de contenu que Google juge pertinent. Les trois premières positions naturelles captent à elles seules plus de la moitié des clics.",
    ],
    related: ["seo", "featured-snippet", "mots-cles"],
  },
  {
    slug: "seo-local",
    term: "SEO local",
    cat: "SEO",
    short: "Être visible auprès des clients de votre zone : « agence web Luxembourg », « restaurant Esch »...",
    def: [
      "Le SEO local vise les recherches à dimension géographique : « coiffeur Luxembourg-ville », « fiduciaire Esch-sur-Alzette ». Il s'appuie sur votre fiche Google Business Profile, des avis clients, des citations locales cohérentes et un contenu ancré dans votre territoire.",
      "Au Luxembourg et dans la Grande Région, le SEO local est souvent le levier le plus rentable pour une PME : la concurrence y est plus faible que sur les requêtes génériques, et l'intention d'achat des visiteurs est très forte.",
    ],
    related: ["seo", "google-business-profile", "avis-clients"],
  },
  {
    slug: "mots-cles",
    term: "Mots-clés",
    cat: "SEO",
    short: "Les expressions que tapent vos clients — la fondation de toute stratégie SEO.",
    def: [
      "Les mots-clés sont les termes et expressions que vos prospects saisissent dans un moteur de recherche. Une stratégie SEO commence toujours par leur étude : volume de recherche, difficulté, intention (information, comparaison, achat).",
      "Le bon mot-clé n'est pas forcément le plus recherché : un terme précis avec une forte intention d'achat (« création site e-commerce Luxembourg ») vaut souvent mieux qu'un terme générique ultra-concurrentiel (« site web »).",
    ],
    related: ["longue-traine", "seo", "serp"],
  },
  {
    slug: "longue-traine",
    term: "Longue traîne",
    cat: "SEO",
    short: "Les requêtes précises et peu concurrentielles qui, cumulées, génèrent l'essentiel du trafic qualifié.",
    def: [
      "La longue traîne désigne l'ensemble des requêtes longues et spécifiques (« combien coûte un site vitrine au Luxembourg ») qui, prises une à une, génèrent peu de recherches, mais qui cumulées représentent la majorité du trafic d'un site.",
      "Ces requêtes sont plus faciles à positionner et convertissent mieux, car elles traduisent un besoin précis. Un blog bien pensé est l'outil idéal pour les capter.",
    ],
    related: ["mots-cles", "blog", "seo"],
  },
  {
    slug: "netlinking",
    term: "Netlinking",
    cat: "SEO",
    short: "Obtenir des liens d'autres sites vers le vôtre pour renforcer votre autorité aux yeux de Google.",
    def: [
      "Le netlinking (ou link building) consiste à obtenir des backlinks — des liens depuis d'autres sites vers le vôtre. Google les interprète comme des votes de confiance : plus des sites crédibles vous citent, plus votre autorité grimpe.",
      "La qualité prime largement sur la quantité : un lien depuis un média luxembourgeois reconnu vaut plus que cent liens d'annuaires douteux, qui peuvent même vous pénaliser.",
    ],
    related: ["backlink", "autorite-domaine", "seo"],
  },
  {
    slug: "backlink",
    term: "Backlink",
    cat: "SEO",
    short: "Un lien entrant depuis un autre site — un vote de confiance aux yeux des moteurs.",
    def: [
      "Un backlink est un lien placé sur un site externe qui pointe vers le vôtre. C'est l'un des critères de classement les plus puissants de Google : il transmet de la popularité (le « jus de lien ») et de la crédibilité.",
      "Un bon backlink provient d'un site thématiquement proche, avec une vraie audience, et s'insère naturellement dans un contenu utile. Les échanges massifs ou achats de liens de mauvaise qualité sont à proscrire.",
    ],
    related: ["netlinking", "autorite-domaine"],
  },
  {
    slug: "autorite-domaine",
    term: "Autorité de domaine",
    cat: "SEO",
    short: "Le « score de crédibilité » de votre site aux yeux des moteurs de recherche.",
    def: [
      "L'autorité de domaine est un indicateur (popularisé par des outils comme Moz ou Ahrefs) qui estime la crédibilité globale d'un site, principalement sur la base de son profil de liens entrants. Plus elle est élevée, plus vos pages ont de chances de bien se positionner.",
      "Elle se construit lentement : contenu de référence, backlinks de qualité, ancienneté et régularité. C'est un actif durable de votre entreprise.",
    ],
    related: ["backlink", "netlinking", "seo"],
  },
  {
    slug: "maillage-interne",
    term: "Maillage interne",
    cat: "SEO",
    short: "L'art de relier vos pages entre elles pour guider visiteurs et moteurs de recherche.",
    def: [
      "Le maillage interne désigne l'ensemble des liens qui relient les pages de votre propre site. Bien pensé, il guide le visiteur vers l'action, répartit la popularité entre vos pages et aide Google à comprendre votre structure.",
      "Ce lexique en est un exemple : chaque terme lié renvoie vers sa définition, ce qui enrichit l'expérience tout en renforçant le référencement de l'ensemble.",
    ],
    related: ["seo", "arborescence"],
  },
  {
    slug: "balise-title",
    term: "Balise title",
    cat: "SEO",
    short: "Le titre bleu cliquable dans Google — votre première (et parfois seule) chance de convaincre.",
    def: [
      "La balise title est le titre d'une page tel qu'il apparaît dans l'onglet du navigateur et surtout dans les résultats Google. C'est l'un des signaux SEO les plus directs et le premier élément que lit votre prospect.",
      "Une bonne title contient le mot-clé principal, reste sous ~60 caractères et donne envie de cliquer. Chaque page de votre site doit avoir une title unique.",
    ],
    related: ["meta-description", "seo", "serp"],
  },
  {
    slug: "meta-description",
    term: "Méta description",
    cat: "SEO",
    short: "Le petit texte sous le titre dans Google : il ne classe pas, mais il fait cliquer.",
    def: [
      "La méta description est le résumé d'une page affiché sous son titre dans les résultats de recherche. Elle n'influence pas directement le classement, mais elle joue énormément sur le taux de clic — et donc sur le trafic réel.",
      "Rédigez-la comme une micro-annonce : bénéfice clair, mot-clé présent, appel à l'action, en 150 à 160 caractères.",
    ],
    related: ["balise-title", "taux-de-clic"],
  },
  {
    slug: "featured-snippet",
    term: "Featured snippet",
    cat: "SEO",
    short: "La « position zéro » : l'encadré de réponse que Google affiche au-dessus de tous les résultats.",
    def: [
      "Le featured snippet est l'encadré que Google place tout en haut de la page de résultats pour répondre directement à une question. Il est extrait d'une page web jugée particulièrement claire sur le sujet.",
      "Structurer son contenu en questions/réponses, listes et tableaux augmente vos chances de le décrocher. C'est aussi un excellent entraînement pour le GEO, car les IA puisent dans les mêmes contenus bien structurés.",
    ],
    related: ["serp", "geo", "donnees-structurees"],
  },
  {
    slug: "donnees-structurees",
    term: "Données structurées (schema.org)",
    cat: "SEO",
    short: "Un balisage invisible qui aide Google et les IA à comprendre précisément votre contenu.",
    def: [
      "Les données structurées sont un code standardisé (schema.org, souvent au format JSON-LD) ajouté à vos pages pour décrire explicitement leur contenu : entreprise, produit, avis, FAQ, événement... Les moteurs les utilisent pour afficher des résultats enrichis.",
      "Elles sont devenues stratégiques à l'ère des IA : un contenu balisé proprement est plus facilement compris, repris et cité par les moteurs génératifs. C'est un pilier technique du GEO.",
    ],
    related: ["geo", "featured-snippet", "seo"],
  },
  {
    slug: "indexation",
    term: "Indexation",
    cat: "SEO",
    short: "Le moment où Google enregistre votre page dans sa base — sans elle, pas de visibilité possible.",
    def: [
      "L'indexation est le processus par lequel un moteur de recherche ajoute une page à sa base de données après l'avoir explorée. Une page non indexée n'apparaîtra jamais dans les résultats, quelle que soit sa qualité.",
      "Le sitemap, le maillage interne et la Search Console permettent de vérifier et d'accélérer l'indexation. Certains blocages (robots.txt, balise noindex, contenu dupliqué) peuvent l'empêcher silencieusement.",
    ],
    related: ["crawl", "sitemap", "search-console"],
  },
  {
    slug: "crawl",
    term: "Crawl",
    cat: "SEO",
    short: "L'exploration de votre site par les robots de Google, page par page, lien par lien.",
    def: [
      "Le crawl est l'exploration automatique d'un site par les robots des moteurs de recherche (comme Googlebot), qui suivent les liens de page en page pour découvrir et actualiser le contenu.",
      "Un site rapide, bien structuré et sans pages inutiles optimise son « budget de crawl » : les robots explorent plus souvent les pages qui comptent vraiment.",
    ],
    related: ["indexation", "sitemap", "robots-txt"],
  },
  {
    slug: "sitemap",
    term: "Sitemap XML",
    cat: "SEO",
    short: "Le plan du site remis aux moteurs de recherche pour ne rater aucune page.",
    def: [
      "Le sitemap XML est un fichier qui liste toutes les URLs importantes de votre site, avec leurs dates de mise à jour. Il sert de plan directeur aux moteurs de recherche pour explorer et indexer votre contenu efficacement.",
      "Il se soumet dans la Google Search Console et devient particulièrement utile pour les sites riches en pages — comme un lexique ou un blog.",
    ],
    related: ["indexation", "crawl", "search-console"],
  },
  {
    slug: "robots-txt",
    term: "Robots.txt",
    cat: "SEO",
    short: "Le fichier qui dit aux robots ce qu'ils peuvent explorer sur votre site — à manier avec précaution.",
    def: [
      "Le robots.txt est un petit fichier placé à la racine d'un site qui indique aux robots d'exploration les zones autorisées ou interdites. Il protège les sections sans intérêt public (admin, panier...) et oriente le crawl vers l'essentiel.",
      "Mal configuré, il peut bloquer tout votre référencement : une seule ligne erronée suffit à rendre un site invisible de Google. À vérifier à chaque mise en ligne.",
    ],
    related: ["crawl", "indexation"],
  },
  {
    slug: "search-console",
    term: "Google Search Console",
    cat: "Data & mesure",
    short: "L'outil gratuit de Google pour surveiller votre indexation, vos positions et vos clics.",
    def: [
      "La Google Search Console est l'interface gratuite qui montre comment Google voit votre site : pages indexées, requêtes qui génèrent des impressions et des clics, erreurs techniques, performance mobile...",
      "C'est l'outil de pilotage SEO indispensable : il révèle les mots-clés réels sur lesquels vous apparaissez et alerte en cas de problème d'indexation. Toute stratégie sérieuse commence par sa configuration.",
    ],
    related: ["indexation", "sitemap", "analytics"],
  },
  {
    slug: "analytics",
    term: "Google Analytics",
    cat: "Data & mesure",
    short: "L'outil de mesure d'audience : qui visite votre site, d'où, et ce qu'ils y font.",
    def: [
      "Google Analytics (GA4) mesure l'audience d'un site : nombre de visiteurs, provenance (recherche, réseaux sociaux, publicité...), pages vues, conversions. Il transforme votre site en source de données exploitables.",
      "Bien configuré — avec des objectifs de conversion et le respect du RGPD — il répond à la question essentielle : qu'est-ce qui amène réellement des clients ?",
    ],
    related: ["taux-de-conversion", "taux-de-rebond", "rgpd"],
  },
  {
    slug: "ia-generative",
    term: "IA générative",
    cat: "GEO & IA",
    short: "Les intelligences artificielles qui créent du contenu — et deviennent un canal de recherche majeur.",
    def: [
      "L'IA générative désigne les modèles capables de produire du texte, des images ou du code : ChatGPT, Gemini, Claude, Midjourney... Au-delà de la création de contenu, ces outils deviennent des moteurs de réponse que vos prospects consultent à la place de Google.",
      "Pour une entreprise, l'enjeu est double : utiliser ces IA pour gagner en productivité, et surtout être présent dans leurs réponses — c'est tout l'objet du GEO.",
    ],
    related: ["geo", "llm", "chatgpt"],
  },
  {
    slug: "llm",
    term: "LLM (grand modèle de langage)",
    cat: "GEO & IA",
    short: "La technologie derrière ChatGPT et consorts : des modèles entraînés sur d'immenses corpus de textes.",
    def: [
      "Un LLM (Large Language Model) est un modèle d'intelligence artificielle entraîné sur d'énormes volumes de texte pour comprendre et générer du langage naturel. GPT, Gemini, Claude ou Llama sont des LLM.",
      "Comprendre leur fonctionnement aide à optimiser sa visibilité : les LLM privilégient les sources claires, structurées et faisant autorité — exactement ce qu'un bon travail GEO met en place.",
    ],
    related: ["ia-generative", "geo", "chatgpt"],
  },
  {
    slug: "chatgpt",
    term: "ChatGPT",
    cat: "GEO & IA",
    short: "L'assistant IA le plus utilisé au monde — et un nouveau prescripteur pour votre entreprise.",
    def: [
      "ChatGPT, développé par OpenAI, est l'assistant conversationnel qui a démocratisé l'IA générative. Des millions d'utilisateurs lui posent chaque jour des questions qui passaient hier par Google — y compris pour trouver des prestataires.",
      "Avec sa recherche web intégrée, ChatGPT cite désormais ses sources : figurer parmi elles devient un enjeu de visibilité concret. Le GEO consiste précisément à maximiser ces citations.",
    ],
    related: ["ia-generative", "geo", "perplexity"],
  },
  {
    slug: "perplexity",
    term: "Perplexity",
    cat: "GEO & IA",
    short: "Le moteur de réponse IA qui cite systématiquement ses sources — une opportunité SEO/GEO directe.",
    def: [
      "Perplexity est un moteur de recherche conversationnel : il répond aux questions en langage naturel en citant explicitement les sites sur lesquels il s'appuie. Chaque réponse est une opportunité d'être cité et de recevoir du trafic qualifié.",
      "Ses critères de sélection (fraîcheur, structure, autorité) en font un excellent baromètre de votre maturité GEO.",
    ],
    related: ["geo", "chatgpt", "ia-generative"],
  },
  {
    slug: "site-vitrine",
    term: "Site vitrine",
    cat: "Site web",
    short: "Le site qui présente votre activité et transforme les visiteurs en prises de contact.",
    def: [
      "Un site vitrine présente une entreprise, ses services et ses coordonnées, sans vente en ligne directe. C'est la carte de visite numérique — et souvent le premier point de contact avec vos futurs clients.",
      "Un bon site vitrine ne se contente pas d'exister : il est rapide, pensé pour convertir (appels, formulaires, devis) et optimisé pour le référencement local. Comptez 2 à 4 semaines de réalisation chez Cafein.",
    ],
    related: ["e-commerce", "landing-page", "cms"],
  },
  {
    slug: "e-commerce",
    term: "E-commerce",
    cat: "Site web",
    short: "La boutique en ligne : catalogue, panier, paiement — votre commerce ouvert 24h/24.",
    def: [
      "Un site e-commerce permet de vendre directement en ligne : catalogue de produits, panier, paiement sécurisé, gestion des stocks et des livraisons. WooCommerce, Shopify ou des développements sur mesure sont les solutions les plus courantes.",
      "La réussite d'une boutique tient autant à l'expérience utilisateur (fluidité, confiance, mobile) qu'à son acquisition de trafic : SEO, publicité et réseaux sociaux doivent être pensés dès la conception.",
    ],
    related: ["site-vitrine", "taux-de-conversion", "ux"],
  },
  {
    slug: "landing-page",
    term: "Landing page",
    cat: "Site web",
    short: "Une page unique, un seul objectif : convertir le visiteur venu d'une campagne.",
    def: [
      "Une landing page (page d'atterrissage) est une page conçue pour un objectif unique : récolter un contact, une inscription ou une vente, généralement en sortie d'une campagne publicitaire ou d'un e-mail.",
      "Sa force vient de sa concentration : un message, une promesse, un formulaire, zéro distraction. Les meilleures landing pages sont testées et itérées en continu (A/B testing).",
    ],
    related: ["taux-de-conversion", "cta", "sea"],
  },
  {
    slug: "cms",
    term: "CMS",
    cat: "Site web",
    short: "Le système qui vous permet de modifier votre site sans toucher au code — WordPress en tête.",
    def: [
      "Un CMS (Content Management System) est un logiciel qui permet de créer et modifier le contenu d'un site sans compétences techniques : textes, images, pages, articles. WordPress est le plus répandu au monde.",
      "Le choix du CMS conditionne votre autonomie future. Chez Cafein, nous proposons WordPress pour l'autonomie éditoriale, ou du sur mesure quand la performance et les fonctionnalités spécifiques priment.",
    ],
    related: ["wordpress", "site-vitrine", "sur-mesure"],
  },
  {
    slug: "wordpress",
    term: "WordPress",
    cat: "Site web",
    short: "Le CMS qui propulse plus de 40% du web — souple, éprouvé, facile à prendre en main.",
    def: [
      "WordPress est le système de gestion de contenu le plus utilisé au monde. Sa force : une interface d'édition accessible, un écosystème d'extensions immense et une communauté gigantesque.",
      "Bien construit — thème sur mesure, extensions triées, maintenance suivie — un site WordPress est rapide, sécurisé et parfaitement référençable. Mal construit, il devient lent et vulnérable : le savoir-faire fait toute la différence.",
    ],
    related: ["cms", "site-vitrine", "maintenance"],
  },
  {
    slug: "sur-mesure",
    term: "Développement sur mesure",
    cat: "Site web",
    short: "Un site codé spécifiquement pour vos besoins : performance maximale et zéro compromis.",
    def: [
      "Le développement sur mesure consiste à coder un site ou une application spécifiquement pour un projet, avec des technologies modernes (React, Next.js...), sans partir d'un CMS générique.",
      "Il s'impose pour les plateformes complexes, les SaaS et les projets où la performance, la scalabilité ou des fonctionnalités métier spécifiques sont critiques. Comptez 4 à 10 semaines selon le périmètre.",
    ],
    related: ["cms", "saas", "core-web-vitals"],
  },
  {
    slug: "saas",
    term: "SaaS",
    cat: "Site web",
    short: "Un logiciel accessible en ligne par abonnement — sans installation, toujours à jour.",
    def: [
      "Le SaaS (Software as a Service) est un modèle où un logiciel est hébergé dans le cloud et accessible par abonnement via un navigateur : pas d'installation, mises à jour automatiques, accès partout.",
      "Créer un SaaS demande un développement sur mesure : interface applicative, comptes utilisateurs, facturation récurrente, sécurité. C'est un projet d'entreprise à part entière, que nous accompagnons de la conception au lancement.",
    ],
    related: ["sur-mesure", "ux"],
  },
  {
    slug: "responsive",
    term: "Responsive design",
    cat: "Site web",
    short: "Un site qui s'adapte parfaitement à tous les écrans : mobile, tablette, ordinateur.",
    def: [
      "Le responsive design garantit qu'un site s'affiche et fonctionne parfaitement sur tous les formats d'écran. Ce n'est plus une option : plus de 60% du trafic web est mobile, et Google indexe d'abord la version mobile des sites.",
      "Un vrai responsive ne se limite pas à « rétrécir » : il repense la hiérarchie, les tailles de texte, les zones tactiles et la vitesse pour chaque contexte d'usage.",
    ],
    related: ["ux", "core-web-vitals", "seo"],
  },
  {
    slug: "ux",
    term: "UX (expérience utilisateur)",
    cat: "Site web",
    short: "Tout ce que ressent votre visiteur : fluidité, clarté, confiance — et son envie de rester.",
    def: [
      "L'UX (User Experience) englobe la qualité globale de l'expérience vécue par un visiteur : facilité de navigation, clarté des informations, vitesse, sentiment de confiance. Une bonne UX se remarque à peine ; une mauvaise fait fuir.",
      "L'UX impacte directement le business : chaque friction (menu confus, formulaire trop long, page lente) fait chuter les conversions. Elle influence aussi le SEO, Google mesurant les signaux de satisfaction des visiteurs.",
    ],
    related: ["ui", "taux-de-conversion", "responsive"],
  },
  {
    slug: "ui",
    term: "UI (interface utilisateur)",
    cat: "Site web",
    short: "La partie visible du design : couleurs, typographies, boutons — l'esthétique au service de l'usage.",
    def: [
      "L'UI (User Interface) désigne l'aspect visuel et interactif d'un site : palette de couleurs, typographies, boutons, animations, espacements. C'est l'incarnation graphique de votre marque à l'écran.",
      "Une UI réussie n'est pas seulement belle : elle hiérarchise l'information, guide l'œil vers l'action et reste cohérente sur toutes les pages. UI et UX travaillent main dans la main.",
    ],
    related: ["ux", "charte-graphique", "branding"],
  },
  {
    slug: "core-web-vitals",
    term: "Core Web Vitals",
    cat: "Site web",
    short: "Les indicateurs de vitesse et de stabilité que Google mesure — et récompense.",
    def: [
      "Les Core Web Vitals sont les métriques de performance officielles de Google : vitesse d'affichage (LCP), réactivité (INP) et stabilité visuelle (CLS). Elles influencent le classement et, surtout, l'expérience réelle des visiteurs.",
      "Un site qui charge en moins de 2 secondes convertit sensiblement mieux. L'optimisation passe par des images compressées, un code propre, un bon hébergement et de la mise en cache.",
    ],
    related: ["pagespeed", "seo", "ux"],
  },
  {
    slug: "pagespeed",
    term: "PageSpeed",
    cat: "Site web",
    short: "L'outil de Google qui note la vitesse de votre site sur 100 — visez 90+.",
    def: [
      "PageSpeed Insights est l'outil gratuit de Google qui analyse la vitesse d'une page sur mobile et desktop, attribue un score sur 100 et liste des recommandations concrètes d'optimisation.",
      "Un score élevé n'est pas une fin en soi, mais il reflète une réalité : chaque seconde de chargement en plus fait perdre des visiteurs. Nos sites visent systématiquement un score supérieur à 90 sur mobile.",
    ],
    related: ["core-web-vitals", "cache", "cdn"],
  },
  {
    slug: "cache",
    term: "Cache",
    cat: "Site web",
    short: "Une mémoire tampon qui ressert les pages déjà générées — pour un site instantané.",
    def: [
      "Le cache stocke temporairement des versions prêtes à l'emploi de vos pages ou fichiers, pour les servir instantanément au lieu de tout recalculer à chaque visite. C'est l'un des leviers de vitesse les plus efficaces.",
      "Il existe plusieurs niveaux : cache navigateur, cache serveur, CDN. Leur bonne configuration relève de la maintenance technique d'un site professionnel.",
    ],
    related: ["cdn", "pagespeed", "core-web-vitals"],
  },
  {
    slug: "cdn",
    term: "CDN",
    cat: "Site web",
    short: "Un réseau de serveurs répartis dans le monde qui rapproche votre site de chaque visiteur.",
    def: [
      "Un CDN (Content Delivery Network) est un réseau mondial de serveurs qui stocke des copies de vos fichiers (images, scripts...) au plus près de vos visiteurs, réduisant drastiquement les temps de chargement.",
      "Pour un site visé à la fois au Luxembourg et à l'international, le CDN garantit la même rapidité partout, tout en soulageant votre serveur principal et en absorbant les pics de trafic.",
    ],
    related: ["cache", "hebergement", "pagespeed"],
  },
  {
    slug: "hebergement",
    term: "Hébergement web",
    cat: "Site web",
    short: "Le serveur qui fait tourner votre site — sa fiabilité conditionne tout le reste.",
    def: [
      "L'hébergement est le service qui stocke votre site et le rend accessible en ligne 24h/24. Sa qualité influence la vitesse, la disponibilité et la sécurité de votre présence web.",
      "Le choix dépend du projet : hébergement mutualisé pour un site vitrine simple, serveur dédié ou cloud pour les plateformes exigeantes. La localisation des serveurs (Europe, RGPD) compte aussi.",
    ],
    related: ["nom-de-domaine", "https", "maintenance"],
  },
  {
    slug: "nom-de-domaine",
    term: "Nom de domaine",
    cat: "Site web",
    short: "Votre adresse sur internet (votresociete.lu) — un actif à choisir et protéger avec soin.",
    def: [
      "Le nom de domaine est l'adresse unique de votre site (par exemple cafein.lu). Il porte votre marque, participe à votre crédibilité et, dans une moindre mesure, à votre référencement local (.lu pour le Luxembourg).",
      "Court, mémorisable, sans tiret superflu : les bonnes adresses partent vite. Pensez aussi à protéger les variantes (.com, .lu) et à garder la main sur son renouvellement — perdre son domaine, c'est perdre son adresse.",
    ],
    related: ["hebergement", "https"],
  },
  {
    slug: "https",
    term: "HTTPS / Certificat SSL",
    cat: "Site web",
    short: "Le cadenas dans la barre d'adresse : connexion chiffrée, confiance et SEO.",
    def: [
      "Le HTTPS chiffre les échanges entre votre site et ses visiteurs grâce à un certificat SSL/TLS. Le fameux cadenas rassure, protège les données des formulaires et il est exigé pour les paiements en ligne.",
      "Google favorise les sites en HTTPS et les navigateurs affichent des avertissements dissuasifs sur les sites non sécurisés. C'est un standard non négociable, inclus dans tout projet sérieux.",
    ],
    related: ["hebergement", "rgpd", "nom-de-domaine"],
  },
  {
    slug: "rgpd",
    term: "RGPD",
    cat: "Site web",
    short: "Le règlement européen sur les données personnelles — une obligation, et un gage de confiance.",
    def: [
      "Le RGPD (Règlement Général sur la Protection des Données) encadre la collecte et l'usage des données personnelles en Europe. Pour un site web : bandeau cookies conforme, politique de confidentialité, formulaires transparents, outils de mesure paramétrés correctement.",
      "Au Luxembourg, la CNPD veille à son application. Au-delà de l'obligation légale, une conformité propre renforce la confiance de vos visiteurs — et évite des amendes substantielles.",
    ],
    related: ["cookies", "analytics", "https"],
  },
  {
    slug: "cookies",
    term: "Cookies",
    cat: "Site web",
    short: "Les petits fichiers qui mémorisent les préférences et mesurent l'audience — encadrés par le RGPD.",
    def: [
      "Les cookies sont de petits fichiers déposés dans le navigateur du visiteur pour mémoriser des informations : session de connexion, panier, préférences, mesure d'audience, publicité ciblée.",
      "Le RGPD impose de recueillir le consentement pour les cookies non essentiels, via un bandeau clair où refuser doit être aussi simple qu'accepter. Une configuration soignée concilie conformité et données exploitables.",
    ],
    related: ["rgpd", "analytics"],
  },
  {
    slug: "maintenance",
    term: "Maintenance web",
    cat: "Site web",
    short: "Mises à jour, sauvegardes, sécurité : l'entretien qui garde votre site rapide et sûr.",
    def: [
      "La maintenance web regroupe les opérations régulières qui gardent un site en bonne santé : mises à jour du CMS et des extensions, sauvegardes, surveillance de la sécurité, correctifs, petites évolutions.",
      "Un site sans maintenance se dégrade : failles de sécurité, lenteurs, incompatibilités. Nos formules incluent un mois de support après chaque lancement, puis des forfaits adaptés à votre rythme.",
    ],
    related: ["wordpress", "hebergement", "https"],
  },
  {
    slug: "blog",
    term: "Blog d'entreprise",
    cat: "SEO",
    short: "Le moteur de contenu qui attire du trafic qualifié et nourrit votre référencement mois après mois.",
    def: [
      "Un blog d'entreprise publie des articles utiles pour vos prospects : guides, conseils, actualités du secteur. Chaque article bien pensé cible une requête et devient une porte d'entrée durable vers votre site.",
      "C'est l'outil roi de la longue traîne et un signal de fraîcheur pour Google — et pour les IA génératives, qui puisent volontiers dans les contenus experts et récents.",
    ],
    related: ["longue-traine", "seo", "ligne-editoriale"],
  },
  {
    slug: "arborescence",
    term: "Arborescence",
    cat: "Site web",
    short: "L'organisation des pages de votre site — la colonne vertébrale de la navigation et du SEO.",
    def: [
      "L'arborescence est la structure hiérarchique des pages d'un site : accueil, rubriques, sous-pages. Elle détermine la facilité de navigation des visiteurs et la compréhension du site par les moteurs.",
      "Une bonne arborescence est pensée depuis les besoins des utilisateurs et les requêtes visées, pas depuis l'organigramme interne de l'entreprise. Elle se définit en amont, à l'étape de conception.",
    ],
    related: ["maillage-interne", "ux", "seo"],
  },
  {
    slug: "cta",
    term: "CTA (appel à l'action)",
    cat: "Site web",
    short: "Le bouton qui dit quoi faire : « Demander un devis », « Prendre rendez-vous »...",
    def: [
      "Le CTA (Call To Action) est l'élément qui invite le visiteur à passer à l'action : bouton, lien, formulaire. « Parlons de votre projet », « Demander un audit » — c'est le pivot entre la visite et le contact commercial.",
      "Un bon CTA est visible, formulé du point de vue du bénéfice client et placé aux bons moments du parcours. Son libellé et sa position se testent : quelques mots peuvent changer un taux de conversion.",
    ],
    related: ["taux-de-conversion", "landing-page", "ux"],
  },
  {
    slug: "taux-de-conversion",
    term: "Taux de conversion",
    cat: "Data & mesure",
    short: "Le pourcentage de visiteurs qui passent à l'action — l'indicateur qui compte vraiment.",
    def: [
      "Le taux de conversion mesure la part des visiteurs qui accomplissent l'action visée : demande de devis, achat, inscription. C'est l'indicateur qui relie votre site à votre chiffre d'affaires.",
      "Doubler son taux de conversion a le même effet que doubler son trafic — pour bien moins d'efforts. UX, vitesse, réassurance et CTA sont ses principaux leviers.",
    ],
    related: ["cta", "ux", "analytics"],
  },
  {
    slug: "taux-de-rebond",
    term: "Taux de rebond",
    cat: "Data & mesure",
    short: "La part des visiteurs qui repartent sans interagir — un symptôme à interpréter avec nuance.",
    def: [
      "Le taux de rebond est le pourcentage de visiteurs qui quittent le site après une seule page, sans interaction. Un taux élevé peut signaler un contenu décevant, une lenteur ou un ciblage inadapté.",
      "Mais tout dépend du contexte : sur un article de blog qui répond parfaitement à une question, un « rebond » peut être une visite réussie. L'analyse doit toujours croiser plusieurs indicateurs.",
    ],
    related: ["analytics", "ux", "taux-de-conversion"],
  },
  {
    slug: "taux-de-clic",
    term: "Taux de clic (CTR)",
    cat: "Data & mesure",
    short: "La part des personnes qui cliquent après avoir vu votre lien ou votre annonce.",
    def: [
      "Le CTR (Click-Through Rate) mesure le rapport entre le nombre de clics et le nombre d'affichages d'un lien, d'une annonce ou d'un résultat de recherche. C'est le baromètre de l'attractivité de vos titres et visuels.",
      "Dans Google, améliorer le CTR d'un résultat (meilleure title, méta description plus persuasive) augmente le trafic sans changer de position — le gain le plus rapide du SEO.",
    ],
    related: ["balise-title", "meta-description", "sea"],
  },
  {
    slug: "sea",
    term: "SEA (publicité Google)",
    cat: "Publicité",
    short: "Les annonces payantes en haut de Google : visibilité immédiate, au coût par clic.",
    def: [
      "Le SEA (Search Engine Advertising) désigne la publicité sur les moteurs de recherche, principalement via Google Ads : vos annonces s'affichent au-dessus des résultats naturels et vous payez au clic.",
      "Sa force est l'immédiateté : visible dès le premier jour, mesurable au centime près. SEO et SEA se complètent : la publicité teste et occupe le terrain pendant que le référencement naturel se construit.",
    ],
    related: ["google-ads", "seo", "retargeting"],
  },
  {
    slug: "google-ads",
    term: "Google Ads",
    cat: "Publicité",
    short: "La régie publicitaire de Google : recherche, display, YouTube et shopping.",
    def: [
      "Google Ads est la plateforme publicitaire de Google. Elle couvre les annonces sur le moteur de recherche, les bannières display, YouTube et Google Shopping, avec un ciblage par mots-clés, audiences et zones géographiques.",
      "Une campagne rentable exige un pilotage rigoureux : bons mots-clés, annonces testées, landing pages dédiées et suivi des conversions. Le budget média se règle ensuite sur les données, pas sur l'intuition.",
    ],
    related: ["sea", "landing-page", "retargeting"],
  },
  {
    slug: "social-ads",
    term: "Social ads",
    cat: "Publicité",
    short: "La publicité sur les réseaux sociaux : toucher précisément votre audience là où elle passe son temps.",
    def: [
      "Les social ads sont les campagnes publicitaires diffusées sur les réseaux sociaux : Meta (Facebook, Instagram), LinkedIn, TikTok... Leur atout majeur est la précision du ciblage : zone, âge, centres d'intérêt, poste occupé.",
      "Au Luxembourg et dans la Grande Région, elles excellent pour la notoriété locale et la génération de contacts B2B (LinkedIn) comme B2C (Instagram/Facebook), avec des budgets tests maîtrisés.",
    ],
    related: ["retargeting", "community-management", "reach"],
  },
  {
    slug: "retargeting",
    term: "Retargeting",
    cat: "Publicité",
    short: "Recibler les visiteurs qui n'ont pas converti — la deuxième chance publicitaire.",
    def: [
      "Le retargeting (ou remarketing) consiste à rediffuser des publicités auprès des personnes qui ont déjà visité votre site sans passer à l'action. Un rappel au bon moment, souvent décisif.",
      "Comme la majorité des visiteurs ne convertit pas à la première visite, le retargeting affiche parmi les meilleurs retours sur investissement — à condition de doser la pression publicitaire et de respecter le consentement RGPD.",
    ],
    related: ["social-ads", "google-ads", "cookies"],
  },
  {
    slug: "community-management",
    term: "Community management",
    cat: "Social media",
    short: "Animer vos réseaux sociaux : publier, répondre, fédérer une communauté autour de votre marque.",
    def: [
      "Le community management est la gestion quotidienne de la présence d'une marque sur les réseaux sociaux : création et publication de contenus, réponses aux messages et commentaires, animation de la communauté, veille.",
      "La régularité prime sur l'intensité : mieux vaut trois publications pertinentes par semaine, tenues dans la durée, qu'un mois d'euphorie suivi de six mois de silence. C'est le cœur de notre offre communication digitale.",
    ],
    related: ["ligne-editoriale", "calendrier-editorial", "engagement"],
  },
  {
    slug: "ligne-editoriale",
    term: "Ligne éditoriale",
    cat: "Social media",
    short: "Le fil rouge de vos contenus : ton, thèmes, valeurs — pour une communication cohérente.",
    def: [
      "La ligne éditoriale définit ce que votre marque dit et comment elle le dit : thématiques abordées, ton (expert, complice, audacieux...), formats privilégiés, sujets exclus. C'est la boussole de tous vos contenus.",
      "Elle garantit la cohérence entre votre site, vos réseaux et vos campagnes — condition pour qu'une marque devienne reconnaissable et digne de confiance.",
    ],
    related: ["community-management", "storytelling", "branding"],
  },
  {
    slug: "calendrier-editorial",
    term: "Calendrier éditorial",
    cat: "Social media",
    short: "La planification de vos publications : qui publie quoi, où et quand.",
    def: [
      "Le calendrier éditorial organise la production et la diffusion de vos contenus semaine par semaine : sujets, formats, canaux, responsables, échéances. Il transforme les bonnes intentions en régularité réelle.",
      "C'est aussi un outil d'anticipation : temps forts du secteur, événements locaux, lancements produits s'y préparent des semaines à l'avance, sans stress de dernière minute.",
    ],
    related: ["community-management", "ligne-editoriale", "blog"],
  },
  {
    slug: "engagement",
    term: "Engagement",
    cat: "Social media",
    short: "Likes, commentaires, partages : le signe que votre contenu touche vraiment votre audience.",
    def: [
      "L'engagement regroupe les interactions générées par vos contenus : mentions j'aime, commentaires, partages, enregistrements, clics. Le taux d'engagement (interactions ÷ portée) mesure la résonance réelle de votre communication.",
      "Les algorithmes des réseaux amplifient les contenus qui engagent : un bon taux d'engagement crée un cercle vertueux de visibilité gratuite. Il vaut mieux une petite communauté engagée qu'une grande audience muette.",
    ],
    related: ["reach", "community-management", "social-ads"],
  },
  {
    slug: "reach",
    term: "Portée (reach)",
    cat: "Social media",
    short: "Le nombre de personnes uniques qui ont vu votre contenu.",
    def: [
      "La portée (reach) compte les personnes uniques exposées à un contenu ou une campagne, à distinguer des impressions qui comptent chaque affichage. C'est l'indicateur de base de la visibilité sociale.",
      "La portée organique des pages d'entreprise ayant fortement baissé, la combinaison contenu de qualité + amplification publicitaire ciblée est devenue la stratégie standard.",
    ],
    related: ["engagement", "social-ads", "impressions"],
  },
  {
    slug: "impressions",
    term: "Impressions",
    cat: "Data & mesure",
    short: "Le nombre total d'affichages de votre contenu ou annonce — répétitions comprises.",
    def: [
      "Les impressions comptabilisent chaque affichage d'un contenu, d'une annonce ou d'un résultat de recherche, y compris lorsque la même personne le voit plusieurs fois. Divisées par la portée, elles donnent la répétition moyenne.",
      "Dans la Search Console, les impressions révèlent votre potentiel SEO : beaucoup d'impressions avec peu de clics signale un problème de position ou d'attractivité du résultat — donc une opportunité.",
    ],
    related: ["reach", "taux-de-clic", "search-console"],
  },
  {
    slug: "branding",
    term: "Branding",
    cat: "Social media",
    short: "La construction de votre marque : identité, valeurs, perception — ce qui reste quand on vous a vu.",
    def: [
      "Le branding est le travail de construction et de gestion d'une marque : positionnement, identité visuelle et verbale, valeurs, promesse. Il détermine la perception qu'ont vos publics de votre entreprise.",
      "Un branding fort simplifie tout le reste : la publicité coûte moins cher, les contenus sont reconnaissables, la confiance s'installe plus vite. C'est le socle sur lequel s'appuient site web et communication.",
    ],
    related: ["charte-graphique", "storytelling", "ligne-editoriale"],
  },
  {
    slug: "charte-graphique",
    term: "Charte graphique",
    cat: "Site web",
    short: "Le document de référence de votre identité visuelle : logo, couleurs, typographies, usages.",
    def: [
      "La charte graphique consigne les règles d'utilisation de votre identité visuelle : déclinaisons du logo, palette de couleurs, typographies, iconographie, exemples d'application. Elle garantit la cohérence sur tous les supports.",
      "Du site web aux réseaux sociaux en passant par les présentations commerciales, la charte est le garde-fou qui empêche votre image de se diluer au fil des créations.",
    ],
    related: ["branding", "ui"],
  },
  {
    slug: "storytelling",
    term: "Storytelling",
    cat: "Social media",
    short: "Raconter votre entreprise comme une histoire — parce qu'on retient les récits, pas les arguments.",
    def: [
      "Le storytelling consiste à communiquer à travers des récits : l'histoire de votre fondation, les coulisses d'un projet, la transformation d'un client. Le cerveau retient les histoires bien mieux que les listes d'arguments.",
      "Appliqué avec justesse — sans artifice — il humanise la marque et crée un lien émotionnel durable. C'est un ingrédient clé des contenus qui engagent réellement.",
    ],
    related: ["branding", "ligne-editoriale", "copywriting"],
  },
  {
    slug: "copywriting",
    term: "Copywriting",
    cat: "Social media",
    short: "L'écriture qui fait agir : titres, pages de vente, publicités — chaque mot travaille.",
    def: [
      "Le copywriting est l'art d'écrire pour convaincre et faire agir : titres qui accrochent, arguments qui répondent aux objections, appels à l'action qui déclenchent. C'est l'écriture au service de la conversion.",
      "Sur un site, quelques phrases bien pensées font souvent plus que des pages entières : clarté de la promesse, preuve, bénéfice client. Le copywriting irrigue landing pages, publicités et e-mails.",
    ],
    related: ["cta", "landing-page", "storytelling"],
  },
  {
    slug: "newsletter",
    term: "Newsletter",
    cat: "Social media",
    short: "L'e-mail régulier à votre communauté : le seul canal dont vous êtes vraiment propriétaire.",
    def: [
      "La newsletter est un e-mail envoyé régulièrement à une liste d'abonnés volontaires : conseils, actualités, offres. Contrairement aux réseaux sociaux, votre liste vous appartient — aucun algorithme ne s'interpose.",
      "Avec un excellent retour sur investissement, elle fidélise et réactive vos contacts dans la durée. Les clés : une vraie valeur à chaque envoi, une fréquence tenable et une conformité RGPD irréprochable.",
    ],
    related: ["rgpd", "copywriting", "taux-de-clic"],
  },
  {
    slug: "google-business-profile",
    term: "Google Business Profile",
    cat: "SEO",
    short: "Votre fiche sur Google Maps et la recherche locale — l'outil n°1 de visibilité de proximité.",
    def: [
      "Google Business Profile (ex Google My Business) est la fiche d'établissement qui apparaît sur Google Maps et dans les résultats locaux : horaires, photos, avis, itinéraire, téléphone. Souvent le premier contact avec un client local.",
      "Une fiche complète, active et riche en avis positifs peut générer autant de contacts qu'un site web pour une activité de proximité. Elle se travaille : publications, réponses aux avis, photos récentes, catégories précises.",
    ],
    related: ["seo-local", "avis-clients", "seo"],
  },
  {
    slug: "avis-clients",
    term: "Avis clients",
    cat: "SEO",
    short: "La preuve sociale qui rassure les prospects et booste votre référencement local.",
    def: [
      "Les avis clients — sur Google, Facebook ou des plateformes spécialisées — sont devenus un réflexe de vérification avant tout achat ou prise de contact. Leur note, leur volume et leur fraîcheur influencent aussi le classement local.",
      "La collecte doit être organisée : demander l'avis au bon moment, faciliter le geste (lien direct, QR code) et répondre systématiquement, y compris aux critiques — avec professionnalisme.",
    ],
    related: ["google-business-profile", "seo-local"],
  },
  {
    slug: "conversion-funnel",
    term: "Tunnel de conversion",
    cat: "Data & mesure",
    short: "Le parcours du visiteur jusqu'à l'action : chaque étape perd du monde, chaque friction coûte.",
    def: [
      "Le tunnel de conversion représente les étapes qu'un visiteur franchit jusqu'à l'objectif : arrivée, découverte, considération, action. À chaque étape, une partie des visiteurs abandonne — l'analyse du tunnel révèle où et pourquoi.",
      "Optimiser un tunnel, c'est réduire les frictions une à une : page trop lente, formulaire trop long, doute non levé. Des gains de quelques pourcents à chaque étape se multiplient à l'arrivée.",
    ],
    related: ["taux-de-conversion", "ux", "analytics"],
  },
  {
    slug: "ab-testing",
    term: "A/B testing",
    cat: "Data & mesure",
    short: "Tester deux versions d'une page pour laisser les données décider — fin des débats d'opinion.",
    def: [
      "L'A/B testing consiste à présenter simultanément deux variantes d'une page ou d'un élément (titre, bouton, image) à deux groupes de visiteurs, puis à mesurer laquelle convertit le mieux.",
      "C'est la méthode reine de l'optimisation continue : les décisions se prennent sur des résultats mesurés, pas sur des goûts personnels. À réserver aux pages avec suffisamment de trafic pour des résultats fiables.",
    ],
    related: ["taux-de-conversion", "landing-page", "cta"],
  },
];

export function getTerme(slug: string): Terme | undefined {
  return TERMES.find((t) => t.slug === slug);
}

export function groupByLetter(termes: Terme[]): Record<string, Terme[]> {
  const groups: Record<string, Terme[]> = {};
  const norm = (s: string) =>
    s.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();
  for (const t of [...termes].sort((a, b) => norm(a.term).localeCompare(norm(b.term)))) {
    const letter = norm(t.term)[0];
    (groups[letter] ||= []).push(t);
  }
  return groups;
}
