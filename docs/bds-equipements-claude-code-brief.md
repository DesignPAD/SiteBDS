# BDS Équipements v2 — Brief de rebuild pour Claude Code

## Mission

Transformer BDS Équipements en une plateforme de quincaillerie moderne, crédible, mobile-first, performante et sécurisée pour Dakar.

Ne pas trop copier Mat-Outils, ne pas se baser sur le BDS actuel. S'inspirer seulement des principes utiles de mat-outils ou des sites de vente les plus utilisés : navigation claire, catégories, fiches produit, panier, devis et commande assistée. Des CTA clairs.

## Problèmes actuels à corriger

- Positionnement dispersé : éclairage, mobilier, aménagement, bricolage et quincaillerie.
- Hero trop générique : une seule promesse forte doit être visible au chargement.
- Chiffres à vérifier : ne pas afficher "Depuis 2024" et "5+ années d'expérience" si cela crée une contradiction.
- Manque de photos réelles : utiliser produits, magasin, équipe, livraisons, chantiers et marques BDS.
- Catalogue à enrichir : prix, stock, marque, caractéristiques, galerie, livraison et CTA.

## Positionnement proposé

> La quincaillerie fiable pour vos projets de construction, d'aménagement et de bricolage à Dakar.

Audiences :

1. Particuliers : trouver un produit, un prix et une livraison.
2. Artisans : rechercher rapidement par produit, marque ou référence.
3. Entreprises et chantiers : demander un devis, commander une quantité, organiser une livraison.

## Architecture cible

```text
Accueil
├── Boutique
│   ├── Catégories
│   ├── Sous-catégories
│   ├── Recherche et filtres
│   └── Fiche produit
├── Services
│   ├── Livraison
│   ├── Conseil expert
│   ├── Découpe sur mesure
│   └── Demande de devis
├── À propos
├── Contact
├── Panier
└── Checkout / commande assistée
```

Header : `Boutique` · `Catégories` · `Services` · `À propos` · `Contact`
Actions persistantes : recherche, panier et WhatsApp.

## Homepage

Ordre des sections :

1. Barre livraison, téléphone, WhatsApp et horaires.
2. Header responsive.
3. Hero unique : promesse BDS, vraie image, CTA `Voir le catalogue`, CTA `Demander un devis`.
4. Catégories principales : 6 à 8 maximum.
5. Produits populaires ou promotions.
6. Bénéfices : stock, livraison, conseil, commande assistée.
7. Services BDS.
8. Marques partenaires et preuves de confiance réelles.
9. Bloc devis / WhatsApp.
10. Footer.

À éviter : carrousel autoplay lourd, plusieurs H1, textes vagues, chiffres fictifs, collections vides.

## Boutique et catégories

- Breadcrumbs.
- Recherche par nom, référence, marque et catégorie.
- Filtres : catégorie, marque, prix, disponibilité.
- Tri : pertinence, récent, prix croissant/décroissant.
- Cartes produit : image, nom, catégorie, prix, promo, stock, badge, action.
- États explicites : chargement, aucun résultat, indisponible, erreur.
- Pagination ou `Charger plus` sans perdre les filtres.

## Fiche produit

- Galerie image optimisée.
- Nom, référence, marque, prix, promotion, disponibilité.
- Sélecteur de quantité et ajout au panier.
- Bouton WhatsApp avec nom, référence et quantité.
- Livraison, retours et délai.
- Description, caractéristiques, avis réels.
- Produits similaires.

## Direction artistique

- Professionnelle, rassurante, chaleureuse, locale et nette.
- Beaucoup d'espace, grille régulière, cartes sobres.
- Fond neutre, texte foncé, une couleur accent BDS.
- Une police très lisible pour l'interface.
- Photos BDS authentiques ; ne pas étirer les images.
- Mobile-first : navigation, recherche, filtres et panier faciles à utiliser au pouce.

## Sécurité — obligatoire

- HTTPS forcé.
- Prix, total, remises, livraison et stock recalculés côté serveur.
- Ne jamais faire confiance au prix dans le navigateur, URL ou `localStorage`.
- Validation serveur de tous les champs ; protection XSS, injection et CSRF.
- Rate limiting et anti-spam sur contact, devis et commande.
- Mots de passe hachés, sessions sécurisées, rôles admin séparés.
- CORS limité au domaine BDS.
- Secrets uniquement dans les variables d'environnement.
- En-têtes HTTP : CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
- Utiliser un prestataire de paiement ; ne jamais stocker de carte bancaire.
- Logs sans données personnelles sensibles.

## Performance et SEO

Objectifs :

- LCP < 2,5 s.
- INP < 200 ms.
- CLS < 0,1.
- Lighthouse mobile : 90+.

Règles :

- Images WebP/AVIF, `srcset`, dimensions fixes, lazy-loading.
- Précharger uniquement l'image hero et les polices critiques.
- Réduire et différer le JavaScript non essentiel.
- Minifier CSS/JS, utiliser Brotli/Gzip, cache et CDN si nécessaire.
- Une seule balise H1 par page.
- Titres et descriptions uniques.
- `sitemap.xml`, `robots.txt`, Open Graph, Search Console.
- Schema `LocalBusiness`, `Product` et `BreadcrumbList`.

## Données produit

Le catalogue ne doit pas être codé directement dans le HTML.

```ts
type Product = {
  id: string;
  slug: string;
  sku: string;
  name: string;
  categoryId: string;
  brand?: string;
  price: number;
  salePrice?: number;
  currency: 'XOF';
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  images: { src: string; alt: string }[];
  shortDescription: string;
  description: string;
  specifications: Record<string, string>;
};
```

## Priorités

### P0

1. Clarifier le positionnement.
2. Corriger chiffres, dates, contacts et promesses.
3. Refaire hero, header, catégories et footer.
4. Structurer le catalogue et les fiches produit.
5. Sécuriser serveur, formulaires et calculs de panier.

### P1

1. Recherche, filtres, tri et pagination.
2. WhatsApp contextualisé et demande de devis avec pièce jointe.
3. Optimisation images, performance et SEO.
4. Tests mobile, clavier, accessibilité et navigateurs.

### P2

1. Compte client et suivi de commande.
2. Avis vérifiés.
3. Paiement en ligne.
4. Recommandations produit et analytics.

## Critères d'acceptation

- L'offre BDS est comprise en moins de cinq secondes.
- Un produit est trouvé en moins de trois clics.
- Chaque produit a photo, nom, prix, stock, référence et CTA.
- Aucun prix modifié côté navigateur n'est accepté.
- Le site est utilisable au clavier et sur mobile.
- Aucun chiffre, avis ou marque n'est fictif.

## Contraintes d'exécution

- Pas de hero carousel générique.
- Une seule promesse BDS claire.
- Catalogue structuré, sans données codées dans le HTML.
- Prix, stock et commande validés côté serveur.
- Accessibilité clavier et responsive mobile.
- Images optimisées WebP/AVIF.
- Tests, lint et build exécutés après chaque phase.
- Aucun secret dans Git.
- Les images dans docs/design-references/ sont des références de principes visuels seulement. Ne copier ni logo, ni texte, ni images, ni code.
- Avant chaque changement majeur, indiquer les fichiers concernés.
