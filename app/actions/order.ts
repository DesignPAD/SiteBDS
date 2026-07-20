'use server';

// Commande assistée WhatsApp — SÉCURITÉ :
// le client n'envoie que des couples { id, qty }. Les prix, libellés et totaux
// sont recalculés ici à partir du catalogue serveur. Aucun prix venant du
// navigateur n'est accepté.

import { getProduct } from '@/data/products';
import { formatFCFA } from '@/lib/format';
import { site } from '@/lib/site';

const MAX_QTY = 99;
const MAX_LINES = 50;

export type OrderInput = { id: string; qty: number }[];

export type OrderResult =
  | {
      ok: true;
      whatsappUrl: string;
      total: number;
      lines: { name: string; sku: string; qty: number; lineTotal: number | null }[];
    }
  | { ok: false; error: string };

export async function buildWhatsappOrder(input: OrderInput): Promise<OrderResult> {
  if (!Array.isArray(input) || input.length === 0) {
    return { ok: false, error: 'Votre panier est vide.' };
  }
  if (input.length > MAX_LINES) {
    return { ok: false, error: 'Trop d’articles dans le panier.' };
  }

  const lines: { name: string; sku: string; qty: number; lineTotal: number | null }[] = [];
  let total = 0;

  for (const raw of input) {
    if (typeof raw?.id !== 'string' || typeof raw?.qty !== 'number') continue;
    const product = getProduct(raw.id);
    if (!product) continue; // identifiant inconnu : ignoré
    const qty = Math.max(1, Math.min(MAX_QTY, Math.floor(raw.qty)));
    const unit = product.salePrice ?? product.price;
    const lineTotal = product.priceOnRequest ? null : unit * qty;
    if (lineTotal !== null) total += lineTotal;
    lines.push({ name: product.name, sku: product.sku, qty, lineTotal });
  }

  if (lines.length === 0) {
    return { ok: false, error: 'Aucun article valide dans le panier.' };
  }

  const messageLines = [
    `Bonjour ${site.name}, je souhaite commander :`,
    ...lines.map(
      (l) =>
        `• ${l.qty} × ${l.name} (${l.sku})${
          l.lineTotal !== null ? ` — ${formatFCFA(l.lineTotal)}` : ' — prix à confirmer'
        }`,
    ),
    `Total estimé : ${formatFCFA(total)}${lines.some((l) => l.lineTotal === null) ? ' (hors articles à confirmer)' : ''}`,
    'Merci de me confirmer la disponibilité et la livraison.',
  ];

  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(messageLines.join('\n'))}`;

  return { ok: true, whatsappUrl, total, lines };
}
