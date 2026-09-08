/** Which of the three seasonal cards is the one happening now.
 *
 *  Resolved while the site is built, not from a prop as in the prototype and not in the
 *  browser: the pages are static, so what reaches a visitor is plain HTML.
 *
 *  The consequence is the trap worth knowing about: **the season does not change by
 *  itself.** A build made in August keeps saying "Trwa teraz: wiosna" until something
 *  pushes to `main` again. The deploy workflow therefore needs a monthly `schedule:`
 *  trigger alongside `push:`, or on 1 October the site is still selling spring.
 */

export type Season = "early-spring" | "spring" | "autumn" | "winter";

export interface SeasonState {
  season: Season;
  /** Which card is "Trwa teraz", or null when none is - see `winter` below. */
  activeCard: 1 | 2 | 3 | null;
}

/**
 * The handoff (docs/design/README.md, section 3) proposes two windows: 1.03-31.08
 * spring/summer and 1.09-30.11 autumn.
 *
 * **The spring one is deliberately split here.** The owners sell pansies in March and April
 * and everything else from May, which are two different things on two different pages; one
 * block covering both meant a visitor in March read a card whose photograph was a tunnel of
 * balcony flowers and whose only link led away from what was actually on sale. September
 * onwards is untouched.
 *
 * Winter deliberately has no message of its own. The handoff proposes "Sprzedaż wznawiamy
 * w marcu" but marks that state as **not designed** and says to ask the owners first, so all
 * three cards simply go quiet and their eyebrows name the season instead of claiming it is
 * now. Nothing is invented on the owners' behalf.
 */
export function seasonOn(date: Date): SeasonState {
  const month = date.getMonth() + 1;

  if (month >= 3 && month <= 4) return { season: "early-spring", activeCard: 1 };
  if (month >= 5 && month <= 8) return { season: "spring", activeCard: 2 };
  if (month >= 9 && month <= 11) return { season: "autumn", activeCard: 3 };
  return { season: "winter", activeCard: null };
}

/** The state baked into this build. */
export const currentSeason: SeasonState = seasonOn(new Date());
