/** The news section's three pieces of progressive enhancement.
 *
 *  Reproduced from `src/scripts/news.ts` on the sibling site alpaki-kazimierzdolny.pl
 *  together with the card it drives. All three are additions to something that already works
 *  without them, which is the rule every script on this site follows - the same rule
 *  `nav.ts` states and the same one the plantings slideshow keeps:
 *
 *  - The cards ship an absolute date ("9 września 2026"). Here it becomes "3 dni temu",
 *    computed against the moment someone is reading. The relative form cannot be baked
 *    into the build: the pages are static and rebuilt a few times a day, so "2 dni temu"
 *    written at six in the morning is wrong by the following night. Without this script
 *    the card shows the full date, which is correct, just longer.
 *  - A post with several photographs ships as a strip that scrolls with a finger and with
 *    the keyboard - `scroll-snap` does that on its own. Here it gains position dots,
 *    arrows on a precise pointer, an announcement for screen readers, and slides that
 *    advance by themselves until somebody takes over.
 *  - A long post ships whole, and the stylesheet clamps it to four lines only once this
 *    file has run - the clamp is gated on `html.js`. Here it gains the way back out: the
 *    overflow is measured, and a card that really has more to show gets a button for it.
 *    Without this script nothing is hidden, so nothing needs revealing.
 */

/* ------------------------------------------------------------------ dates ---------- */

/** Largest unit first: the loop takes the first one the gap fills at least once, so four
 *  days reads as "4 dni temu" rather than "96 godzin temu". */
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31_557_600],
  ["month", 2_629_800],
  ["week", 604_800],
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
];

/** `numeric: "always"` on purpose. The default would turn seven days into "w zeszłym
 *  tygodniu", which reads as a different kind of statement than "1 tydzień temu" - and
 *  the cards next to it would still be counting. */
function relative(date: Date): string | null {
  if (typeof Intl.RelativeTimeFormat !== "function") return null;

  const seconds = (Date.now() - date.getTime()) / 1000;
  // A post published a minute ago would otherwise read "0 minut temu".
  if (seconds < 60) return "przed chwilą";

  const format = new Intl.RelativeTimeFormat("pl-PL", { numeric: "always" });
  for (const [unit, size] of UNITS) {
    const value = seconds / size;
    if (value >= 1) return format.format(-Math.round(value), unit);
  }
  return "przed chwilą";
}

for (const node of document.querySelectorAll<HTMLTimeElement>(".post__meta time")) {
  const stamp = node.dateTime;
  if (!stamp) continue;

  const date = new Date(stamp);
  if (Number.isNaN(date.getTime())) continue;

  const text = relative(date);
  if (!text) continue;

  // The full date is not thrown away - it moves into the tooltip, so the exact day is
  // still one hover from the visitor and stays in the page for anyone reading the source.
  node.title = node.textContent ?? "";
  node.textContent = text;
}

/* ---------------------------------------------------------------- carousel --------- */

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/** Jumping rather than gliding where the visitor asked for less motion. */
const scrollBehavior: ScrollBehavior = reducedMotion.matches ? "auto" : "smooth";

/** How long one slide holds. Long enough to look at a photograph rather than merely notice
 *  that something moved, short enough that an album of five is not a commitment. */
const INTERVAL = 6000;

/** Every carousel's `sync`, so the one document-level listener at the bottom of this file
 *  can reach all of them. One listener for the page, not one per card. */
const syncs: (() => void)[] = [];

function enhance(root: HTMLElement): void {
  const rail = root.querySelector<HTMLElement>(".post__rail");
  const dots = root.querySelector<HTMLElement>(".post__dots");
  const live = root.querySelector<HTMLElement>("[aria-live]");
  const previous = root.querySelector<HTMLButtonElement>(".post__arrow--prev");
  const next = root.querySelector<HTMLButtonElement>(".post__arrow--next");
  const toggle = root.querySelector<HTMLButtonElement>(".post__toggle");

  if (!rail || !dots || !live || !previous || !next || !toggle) return;

  const slides = Array.from(rail.children) as HTMLElement[];
  if (slides.length < 2) return;

  let current = 0;

  const paint = (index: number): void => {
    current = index;
    /* The dots by name, not by position in the chip: the pause button shares it with
       them and is not one. */
    const marks = dots.querySelectorAll(".post__dot");
    for (const [position, dot] of Array.from(marks).entries()) {
      dot.setAttribute("aria-current", String(position === index));
    }
    // The arrows are removed at the ends rather than disabled: a control that is there
    // but refuses is a worse answer than one that is not there. But removing the button
    // somebody is standing on drops focus to <body>, and their next Tab restarts from the
    // top of the page - so hand focus to the arrow that is still there first.
    const losingFocus =
      (index === 0 && document.activeElement === previous) ||
      (index === slides.length - 1 && document.activeElement === next);

    previous.hidden = index === 0;
    next.hidden = index === slides.length - 1;

    if (losingFocus) {
      const survivor = index === 0 ? next : previous;
      (survivor.hidden ? rail : survivor).focus();
    }

    live.textContent = `Zdjęcie ${index + 1} z ${slides.length}`;
  };

  /* Arrow functions, not declarations: a `function` is hoisted above the guard above, so
     TypeScript will not carry the narrowing of these five elements into it. */
  const go = (index: number): void => {
    const clamped = Math.min(Math.max(index, 0), slides.length - 1);
    const slide = slides[clamped];
    if (!slide) return;
    /* Painted straight away rather than waiting for the observer below. Smooth scrolling
       takes a moment to start, and until it does the observer has not fired - so two quick
       presses of "next" both computed the same `current + 1` and the carousel stayed where
       it was. The observer still has the last word; this only stops the interface from
       lagging behind the person using it. */
    paint(clamped);
    rail.scrollTo({ left: slide.offsetLeft - rail.offsetLeft, behavior: scrollBehavior });
  };

  /* ------------------------------------------------------------- autoplay -------- */

  /* Four separate reasons the slides can be standing still, and they are not the same
     thing. `stopped` is the visitor having taken the strip over - a swipe, an arrow, a
     dot, a film they pressed play on - and it never lifts on its own, because a slideshow
     that starts itself again under somebody's hands is arguing with them. `paused` is the
     button, which they can undo. The other two are circumstance rather than anyone's
     decision: advancing while the section is off screen or the tab is in the background
     only means the album is half over by the time it is looked at. */
  let stopped = reducedMotion.matches;
  let paused = false;
  let onScreen = false;
  let held = false;
  let timer: number | undefined;

  const sync = (): void => {
    const run = !stopped && !paused && onScreen && !held && !document.hidden;

    if (run && timer === undefined) {
      timer = window.setInterval(() => go((current + 1) % slides.length), INTERVAL);
    } else if (!run && timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };

  /** The visitor has taken over, for good. The button goes with it: there is nothing left
   *  for it to stop, and a control that is there but no longer does anything is the worse
   *  answer of the two - the same argument the arrows make at the ends of the strip. */
  const surrender = (): void => {
    stopped = true;
    toggle.hidden = true;
    sync();
  };

  toggle.addEventListener("click", () => {
    paused = !paused;
    toggle.toggleAttribute("data-paused", paused);
    toggle.setAttribute("aria-label", paused ? "Wznów pokaz slajdów" : "Wstrzymaj pokaz slajdów");
    sync();
  });

  /* A finger on the strip counts as taking over; a finger on the button does not. The chip
     holding the dots and the button sits on top of the strip but is its sibling rather than
     its child, so this listener never hears about a press on either. */
  rail.addEventListener("pointerdown", surrender);
  for (const video of rail.querySelectorAll("video")) {
    video.addEventListener("play", surrender);
  }

  root.addEventListener("mouseenter", () => {
    held = true;
    sync();
  });
  root.addEventListener("mouseleave", () => {
    held = false;
    sync();
  });
  root.addEventListener("focusin", () => {
    held = true;
    sync();
  });
  root.addEventListener("focusout", () => {
    held = false;
    sync();
  });

  /* A different question from the observer further down, which asks which slide is showing.
     This one asks whether the card is on the visitor's screen at all. */
  new IntersectionObserver(
    (entries) => {
      for (const entry of entries) onScreen = entry.isIntersecting;
      sync();
    },
    { threshold: 0.3 },
  ).observe(root);

  /* ------------------------------------------------------------- controls -------- */

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "post__dot";
    dot.setAttribute("aria-label", `Zdjęcie ${index + 1}`);
    dot.addEventListener("click", () => {
      surrender();
      go(index);
    });
    dots.append(dot);
  });

  previous.addEventListener("click", () => {
    surrender();
    go(current - 1);
  });
  next.addEventListener("click", () => {
    surrender();
    go(current + 1);
  });

  rail.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      surrender();
      go(current - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      surrender();
      go(current + 1);
    }
  });

  // The scroll position is the source of truth, not the last button pressed: a finger
  // swipe has to move the dots too, and a snap can land somewhere nobody clicked for.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) paint(slides.indexOf(entry.target as HTMLElement));
      }
    },
    { root: rail, threshold: 0.6 },
  );
  for (const slide of slides) observer.observe(slide);

  dots.removeAttribute("hidden");
  // Hidden where there is nothing to stop, which is where the visitor asked for less
  // motion and the slides therefore never start.
  toggle.hidden = stopped;
  paint(0);

  syncs.push(sync);
  sync();
}

for (const root of document.querySelectorAll<HTMLElement>("[data-carousel]")) {
  enhance(root);
}

/* A carousel in a background tab is spending a visitor's battery on slides nobody is
   watching, and on returning they would find the album somewhere in the middle. */
document.addEventListener("visibilitychange", () => {
  for (const sync of syncs) sync();
});

/* ------------------------------------------------------------ full text ----------- */

/** How long a card takes to reach its new height.
 *
 *  Long enough to read as one movement rather than a flinch, short enough that a control
 *  someone may press twice does not start feeling like a wait. The two cards that are not
 *  being opened move as well - see `glide` - and past about 300ms they hold the eye longer
 *  than the card the visitor actually asked for, which is the wrong way round. */
const EXPAND_MS = 260;
const EXPAND_EASE = "cubic-bezier(.2, .7, .3, 1)";

const grid = document.querySelector<HTMLElement>(".news__grid");

/** Cards currently open. The grid gives up its shared rows while this is not empty, and takes
 *  them back when the last card closes - see the note in FacebookNews.astro. A boolean here
 *  would put the rows back as soon as any one card closed, with another still open. */
const opened = new Set<HTMLElement>();

/** Every card's height right now, in the order the grid holds them. */
function heights(cards: HTMLElement[]): number[] {
  return cards.map((card) => card.getBoundingClientRect().height);
}

/** Animates the cards, and the grid under them, from the heights they had to the heights
 *  they have.
 *
 *  Heights in pixels through the Web Animations API rather than a CSS transition, because
 *  `height: auto` is not animatable and the properties that would make it so are not
 *  everywhere yet. Two measurements - one before the classes change, one after - give two
 *  plain numbers, and everything between them animates in every browser.
 *
 *  Not `transform: scale()`, which is the usual shortcut: these cards have photographs in
 *  them and a scaled card squashes its own photograph on the way.
 *
 *  The grid is animated too. Without it everything below the section jumps to the new
 *  position in one frame while the cards are still travelling.
 */
async function glide(
  cards: HTMLElement[],
  before: number[],
  after: number[],
  gap: [number, number],
): Promise<void> {
  const runs: Promise<unknown>[] = [];

  cards.forEach((card, index) => {
    if (Math.abs(before[index] - after[index]) < 0.5) return;
    card.classList.add("is-moving");
    const run = card.animate([{ height: `${before[index]}px` }, { height: `${after[index]}px` }], {
      duration: EXPAND_MS,
      easing: EXPAND_EASE,
    });
    void run.finished.finally(() => card.classList.remove("is-moving"));
    runs.push(run.finished);
  });

  if (grid && Math.abs(gap[0] - gap[1]) > 0.5) {
    grid.style.overflow = "hidden";
    const run = grid.animate([{ height: `${gap[0]}px` }, { height: `${gap[1]}px` }], {
      duration: EXPAND_MS,
      easing: EXPAND_EASE,
    });
    void run.finished.finally(() => {
      grid.style.overflow = "";
    });
    runs.push(run.finished);
  }

  // A card whose animation is cancelled - a second click mid-flight - rejects. That is not
  // a failure worth propagating; the height it was heading for is already set.
  await Promise.all(runs).catch(() => undefined);
}

function expandable(card: HTMLElement): void {
  const text = card.querySelector<HTMLElement>(".post__text");
  const button = card.querySelector<HTMLButtonElement>(".post__expand");
  if (!text || !button || !grid) return;

  // The clamp is a CSS box; the only way to learn whether anything is hidden behind it is
  // to ask the browser. A post that fits keeps no button at all, because a control that
  // reveals nothing is worse than none.
  if (text.scrollHeight <= text.clientHeight + 1) return;

  button.hidden = false;

  let busy = false;

  button.addEventListener("click", () => {
    if (busy) return;

    const cards = [...grid.querySelectorAll<HTMLElement>(".post")];
    const before = heights(cards);
    const gridBefore = grid.getBoundingClientRect().height;
    const open = card.hasAttribute("data-open");

    if (open) {
      card.removeAttribute("data-open");
      opened.delete(card);
      button.textContent = "Pokaż więcej";
      button.setAttribute("aria-expanded", "false");
    } else {
      card.setAttribute("data-open", "");
      opened.add(card);
      button.textContent = "Pokaż mniej";
      button.setAttribute("aria-expanded", "true");
    }

    /* The target is measured in the state the card will actually settle into, shared rows
       and all. Only then does the grid go loose for the flight: animating while the rows
       are still shared would have them stretching the cards from underneath, and letting
       the rows return at the end would pop every card into a different height in the last
       frame. */
    const loose = opened.size > 0;
    if (loose) grid.setAttribute("data-loose", "");
    else grid.removeAttribute("data-loose");

    const after = heights(cards);
    const gridAfter = grid.getBoundingClientRect().height;

    if (reducedMotion.matches) return;

    if (!loose) grid.setAttribute("data-loose", "");
    busy = true;
    void glide(cards, before, after, [gridBefore, gridAfter]).then(() => {
      if (!loose) grid.removeAttribute("data-loose");
      busy = false;
    });
  });
}

/* After the fonts, not before. The clamp is four lines of Public Sans, which is self-hosted
   and swapped in after first paint - measured against the system fallback the line count comes
   out different, so a post near the boundary would get a button on one load and not on the
   next, depending on what was in the browser's cache. */
const measure = (): void => {
  for (const card of document.querySelectorAll<HTMLElement>(".post")) expandable(card);
};

if (document.fonts?.status === "loaded") measure();
else void (document.fonts?.ready ?? Promise.resolve()).then(measure);
