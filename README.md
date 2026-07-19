# Cafein — Site vitrine v2 (showcase)

Version 2 du site one-page de l'agence Cafein (Luxembourg) — React + Vite + Framer Motion + Lenis.

Nouveautés v2 : cursor custom multi-états (anneau à ressort, traînée de particules, labels contextuels), préloader, kinetic typography avec parallaxe souris, champ de particules interactif, section méthode en scroll horizontal épinglé, marquee réactif à la vélocité du scroll, cartes tilt 3D, texte scramble, grain animé.

## Développement local

```bash
npm install --legacy-peer-deps
npm run dev
```

## Build

```bash
npm run build     # génère dist/ (index.html autonome + assets public/)
npm run start     # sert dist/ (utilisé par Railway)
```

## Déploiement Railway

`railway.json` est déjà configuré : Railway rebuild et redéploie automatiquement à chaque push sur la branche connectée.
