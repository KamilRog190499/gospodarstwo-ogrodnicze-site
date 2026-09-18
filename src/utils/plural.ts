/** Polish plurals.
 *
 *  Polish picks one of three forms by the number in front of it: "1 reakcja",
 *  "2 reakcje", "5 reakcji". The plural form returns for 2-4, except in the teens,
 *  where 12-14 take the genitive like everything above four.
 *
 *  `Intl.PluralRules("pl")` knows all of this - it returns "one", "few", "many" and
 *  "other" - so the rule itself is the platform's job and this only maps its answer onto
 *  the three words a caller supplies. ("other" covers fractions, which no counter here
 *  produces; it falls in with "many" so the function is total.)
 */

const rules = new Intl.PluralRules("pl-PL");

export interface PluralForms {
  /** 1 */
  one: string;
  /** 2-4, 22-24, … */
  few: string;
  /** 0, 5-21, 25-31, … */
  many: string;
}

/** The right form of the word for `count` - the number itself is not included. */
export function plural(count: number, forms: PluralForms): string {
  switch (rules.select(count)) {
    case "one":
      return forms.one;
    case "few":
      return forms.few;
    default:
      return forms.many;
  }
}

/** "87 reakcji" - the number and the matching form, which is what a counter needs. */
export function counted(count: number, forms: PluralForms): string {
  return `${count} ${plural(count, forms)}`;
}
