import type { APIRoute } from "astro";

import { offer } from "../data/offer";
import { windowFor } from "../data/season";
import { addressOneLine, address, phones } from "../data/contact";

/**
 * `/llms.txt` - a plain-text summary of the site for language models.
 *
 * An endpoint rather than a file in `public/`, and that is the whole point: the selling
 * dates live in `src/data/season.ts` and the addresses in `src/data/offer.ts`, so a
 * hand-written copy in `public/` would be a second place selling dates are written down -
 * exactly what CLAUDE.md forbids. Here a window changes in one file and this file follows.
 *
 * What may go in: only what the site already states somewhere a visitor can read. No
 * opening hours, no e-mail, no prices - the three things the owners have not given. A model
 * quoting this file is quoting the holding, so the rule that governs `/faq/` governs it too.
 */
export const GET: APIRoute = () => {
  const groups = offer
    .map((page) => {
      const window = page.groups.map((group) => windowFor(group)?.months).filter(Boolean)[0];
      const when = window ? ` Sprzedaż: ${window}.` : "";
      return `- [${page.menuLabel}](https://gospodarstwo-saran.pl${page.href}):${when}`;
    })
    .join("\n");

  const numbers = phones.map((phone) => `${phone.person}: ${phone.display}`).join(", ");

  const body = `# Gospodarstwo Ogrodnicze „Saran”

> Rodzinne gospodarstwo ogrodnicze w Cholewiance pod Kazimierzem Dolnym (woj. lubelskie).
> Kwiaty balkonowe, rabatowe i wieloletnie oraz chryzantemy wielkokwiatowe z własnej uprawy.
> Gospodarstwo istnieje od 1991 roku, a od 1997 zajmuje się produkcją kwiatów.

Sprzedaż jest sezonowa i prowadzona wyłącznie telefonicznie oraz na miejscu.
Gospodarstwo **nie prowadzi sklepu internetowego i nie wysyła roślin kurierem**.
Cen nie publikujemy - ustalane są na miejscu lub telefonicznie.

## Oferta

${groups}

## Pozostałe strony

- [Inspiracje](https://gospodarstwo-saran.pl/inspiracje/): gotowe obsadzenia - kosze, skrzynki, donice i rabaty.
- [O nas](https://gospodarstwo-saran.pl/o-nas/): historia gospodarstwa i nagrody.
- [FAQ](https://gospodarstwo-saran.pl/faq/): najczęstsze pytania.
- [Kontakt](https://gospodarstwo-saran.pl/kontakt/): adres, telefony i dojazd.

## Kontakt

- Adres: ${addressOneLine}, ${address.region}
- Telefony: ${numbers}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
