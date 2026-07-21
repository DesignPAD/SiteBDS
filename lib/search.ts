/**
 * Normalise un texte pour la recherche : minuscules + suppression des accents.
 * Indispensable en français : beaucoup de clients tapent « coloree », « decoratif »
 * ou « reference » sans accent, et doivent quand même trouver le produit.
 */
export function normalizeForSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}
