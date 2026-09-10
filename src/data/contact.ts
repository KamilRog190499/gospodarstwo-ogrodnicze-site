/** Contact details of the holding. Single source of truth - the intro CTA, the contact
 *  section, the footer and the LocalBusiness JSON-LD all read from here, so a number
 *  changes in one place.
 *
 *  Taken from http://gospodarstwo-saran.pl/kontakt-2/ and confirmed by the design handoff.
 */

export interface Phone {
  /** Name of the person the number belongs to. */
  person: string;
  /** Display form, with spaces - as the old site writes it. */
  display: string;
  /** Form for href="tel:" - no spaces, with the country prefix. */
  href: string;
}

export const phones: Phone[] = [
  { person: "Tadeusz", display: "602 518 401", href: "tel:+48602518401" },
  { person: "Mateusz", display: "722 238 987", href: "tel:+48722238987" },
  { person: "Łukasz", display: "514 505 431", href: "tel:+48514505431" },
  { person: "Jolanta", display: "662 760 375", href: "tel:+48662760375" },
];

/** The number shown where only one fits - the intro CTA. First on the old site's list. */
export const primaryPhone = phones[0]!;

export const address = {
  street: "Cholewianka 36",
  postalCode: "24-120",
  city: "Kazimierz Dolny",
  region: "woj. lubelskie",
  country: "PL",
} as const;

/** Postal code and town as one string.
 *
 *  It exists because it has to. Written in a template as two neighbouring expressions,
 *  `{address.postalCode}` and `{address.city}` collapse to `24-120Kazimierz Dolny` the
 *  moment Prettier puts them on separate source lines - the Astro compiler drops the
 *  whitespace between two expressions, and both `Contact.astro` and `Directions.astro`
 *  shipped that way. Keeping the space on this side of the boundary makes it immune to
 *  how any template happens to be wrapped. Use this rather than writing the pair out.
 */
export const postalCity = `${address.postalCode} ${address.city}`;

/** Full address on one line - footer and structured data. */
export const addressOneLine = `${address.street}, ${address.postalCode} ${address.city}`;

/** What the "Wyznacz trasę" link points at. A search by address rather than by
 *  coordinates: the holding has no confirmed pin, and a wrong pin sends someone down a
 *  field track. Swap for `?api=1&destination=<lat>,<lng>` once the owners confirm one. */
export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${address.street} ${address.city}`,
)}`;

export const facebook = "https://www.facebook.com/p/Gospodarstwo-Ogrodnicze-Saran-100070553132348/";

/** Not published yet - the owners have not given an address (docs/design/README.md,
 *  "Braki do uzupełnienia"). `null` rather than a guess; the contact section simply does
 *  not offer an e-mail, and what is missing is tracked in docs/inwentaryzacja.md rather
 *  than shown to visitors. */
export const email: string | null = null;

/** Selling hours in season - likewise unconfirmed. While this is null the JSON-LD omits
 *  `openingHoursSpecification` entirely, which is the right thing: guessed hours are the
 *  version search engines quote back at a visitor standing at a closed gate. */
export const openingHours: string | null = null;
