# Déploiement — BDS Équipements v2

> ⚠️ **Le domaine `bdsequipements.com` sert actuellement l'ANCIEN site** (hébergé
> chez Hostinger). Le rebrancher met le nouveau site en ligne pour tous les
> clients, immédiatement. Voir l'ordre recommandé plus bas.

---

## Étape 1 — Mettre le site en ligne sur Vercel

### Méthode recommandée : import depuis GitHub (aucun terminal)

1. Aller sur **https://vercel.com/new**
2. Se connecter avec le compte GitHub **DesignPAD**
3. Importer le dépôt **`DesignPAD/SiteBDS`**
4. Vercel détecte Next.js tout seul — **ne rien changer** :
   - Framework : Next.js
   - Build : `next build`
   - Aucune variable d'environnement nécessaire (le projet n'a aucun secret)
5. **Deploy**

Avantage : chaque `git push` sur `main` redéploie automatiquement.

Résultat : une URL du type `https://sitebds.vercel.app` → **c'est celle à montrer
au patron pour validation**, sans toucher au site en production.

### Méthode alternative : en ligne de commande

```bash
cd "…/SITE QUINCAILLERIE/bds-equipements-v2"
vercel login      # connexion par code (à faire soi-même)
vercel --prod
```

---

## Étape 2 — Brancher le domaine (seulement après validation du patron)

### 2a. Déclarer le domaine dans Vercel

Projet → **Settings → Domains → Add** :
- `bdsequipements.com`
- `www.bdsequipements.com`

Vercel affiche alors les enregistrements exacts à créer.

### 2b. Modifier le DNS chez Hostinger

Panneau Hostinger → **Domaines → DNS / Nameservers → Zone DNS**.

| Type  | Nom   | Valeur actuelle (Hostinger)        | Nouvelle valeur (Vercel) |
|-------|-------|------------------------------------|--------------------------|
| A     | `@`   | `91.108.103.108`, `185.77.97.55`   | `76.76.21.21`            |
| CNAME | `www` | `www.bdsequipements.com.cdn.hstgr.net` | `cname.vercel-dns.com` |

> Vercel confirme les valeurs à l'écran au moment de l'ajout : **toujours utiliser
> celles affichées par Vercel**, elles priment sur ce tableau.

⏱️ Propagation : de quelques minutes à 24 h. Vercel émet le certificat HTTPS
automatiquement une fois le DNS propagé.

### 2c. Vérifier après bascule

```bash
nslookup bdsequipements.com          # doit renvoyer l'IP Vercel
curl -I https://www.bdsequipements.com   # doit renvoyer un header "server: Vercel"
```

---

## Ordre recommandé (important)

1. **Déployer** sur Vercel → URL de préversion
2. **Faire valider** le site au patron sur cette URL
3. **Obtenir le prix des Lustres LED** (aujourd'hui « Prix sur demande »)
4. **Puis seulement** basculer le DNS

Raison : tant que le DNS n'est pas touché, l'ancien site reste en ligne et le
commerce continue de tourner. La bascule devient une formalité sans risque.

## Revenir en arrière

En cas de problème après bascule, remettre les valeurs DNS d'origine du tableau
ci-dessus : le site Hostinger redevient actif (le temps de la propagation).
**Ne pas supprimer les fichiers sur Hostinger** tant que la v2 n'est pas
validée en production.

---

## Ce qui est déjà prêt côté code

- En-têtes de sécurité (CSP, HSTS, X-Frame-Options…) dans `next.config.ts` — appliqués par Vercel
- `sitemap.xml`, `robots.txt`, canoniques et JSON-LD pointent déjà vers
  `https://www.bdsequipements.com` (voir `lib/site.ts`)
- Images optimisées AVIF/WebP, cache long sur `/brand/*`
- Aucun secret dans le dépôt

## Après la mise en ligne

- Déclarer le site dans **Google Search Console** et y soumettre
  `https://www.bdsequipements.com/sitemap.xml`
- Mesurer les performances réelles avec **PageSpeed Insights** (chiffres fiables,
  contrairement à une mesure locale)
