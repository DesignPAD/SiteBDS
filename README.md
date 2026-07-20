# BDS Équipements v2

Plateforme e-commerce de quincaillerie moderne pour Dakar — rebuild complet du site
[bdsequipements.com](https://www.bdsequipements.com).

> **Brief complet** : [docs/bds-equipements-claude-code-brief.md](docs/bds-equipements-claude-code-brief.md)
> **Références visuelles** : [docs/design-references/](docs/design-references/)

## Stack

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS**
- Déploiement cible : **Vercel** (domaine `bdsequipements.com` pointé dessus)
- Catalogue : fichiers de données typés (`data/`) — **jamais codé dans le HTML**
- Validation prix/commandes : **côté serveur** (Server Actions / Route Handlers)

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
```

## Structure

```
bds-equipements-v2/
├── app/            ← Pages (App Router)
├── data/
│   ├── categories.ts   ← 5 catégories BDS
│   └── products.ts     ← 36 produits réels, prix officiels du magasin (juillet 2026)
├── public/
│   └── products/       ← 36 photos produits
├── docs/
│   ├── bds-equipements-claude-code-brief.md  ← Le brief de référence
│   └── design-references/                    ← Captures d'inspiration (principes seulement)
└── ...
```

## Règles du projet (résumé du brief)

- Une seule promesse BDS, un seul H1 par page, pas de carrousel autoplay.
- Prix, totaux et stock **recalculés côté serveur** — jamais confiance au navigateur.
- Aucun chiffre, avis ou marque fictif.
- Mobile-first, accessible au clavier, images optimisées (WebP/AVIF via `next/image`).
- Aucun secret dans Git.

## Données produits

Les prix viennent des photos officielles du magasin (juillet 2026).
Produit sans prix communiqué : `priceOnRequest: true` (ex. Lustres LED — prix à demander au magasin).

## Sites liés

- **v1 (en ligne actuellement)** : site statique dans
  `..\Site_Officiel_bds (2)\Mon Site Quincaillerie - Copie\youuu2` — reste en production
  sur Hostinger jusqu'à la mise en ligne de la v2.
