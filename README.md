# Cafein — Site vitrine

Site one-page de l'agence Cafein (Luxembourg) — React + Vite + Tailwind + Framer Motion.

## Développement local

```bash
npm install --legacy-peer-deps
npm run dev
```

## Build

```bash
npm run build     # génère dist/
npm run start     # sert dist/ (utilisé par Railway)
```

## Déploiement Railway

Le fichier `railway.json` est déjà configuré : connecter ce repo GitHub dans Railway → New Project → Deploy from GitHub repo, et c'est tout.

`bundle.html` à la racine est une version autonome du site (un seul fichier, ouvrable partout).
