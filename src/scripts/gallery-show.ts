/** The home page photo show: a row of photographs at a time, advancing on its own.
 *
 *  This is the old site's slideshow rebuilt. `gospodarstwo-saran.pl` runs MetaSlider on Nivo
 *  Slider - 49 slides, `pauseTime: 3000`, `effect: "random"`, arrows on the picture and a row
 *  of dots underneath - and the owners asked for the same thing here, fitted to this design and
 *  to these photographs.
 *
 *  ## A slide is a row, not a picture
 *
 *  That is the whole of the fitting. The old band is about 2:1 and can be, because its slides
 *  are dedicated banner crops WordPress made for it. Here 53 of the 55 photographs of the
 *  holding are portrait, so one of them in a wide band is either cropped to 42% of its height
 *  or marooned in empty paper. **Several portrait frames side by side fill the same band and
 *  crop nothing** - and how many fit is measured here rather than declared in CSS, because it
 *  follows the width and this project has no breakpoints.
 *
 *  ## A row never straddles two groups
 *
 *  `homeGallery` is 69 frames in three groups - pansies, balcony flowers, chrysanthemums, in
 *  the order of the growing year - and the row prints the name of the group it is showing, so
 *  a row of one pansy and two petunias under the word "Bratki" would be a lie. **The rows are
 *  therefore cut inside each group**, never across the whole list, and the group is spread over
 *  them evenly rather than filled row by row: the groups are 9, 38 and 22, so none divides into
 *  fours and a remainder is the ordinary case here, not the exception. Nine pansy frames four
 *  across are three rows of three - filled row by row they were four, four and **one**, which
 *  is a single photograph beside three empty columns and reads as a fault rather than as the
 *  end of a group. No row is ever shorter than one frame less than the row above it.
 *
 *  The ticks below the row are **one per group**, not one per row. With 69 frames and a width
 *  that decides how many fit, a tick per row would be anything from 19 to 69 squares; three
 *  jumps - beside a count that says where in the nineteen you are - say more and take one line.
 *
 *  ## Sixty-nine photographs, five rows mounted
 *
 *  Every frame is in the markup, which is what makes the no-script fallback complete - and if
 *  all 69 were laid out at once the browser would fetch all 69 the moment the section scrolled
 *  into view, because `loading="lazy"` measures intersection and they all share one grid cell.
 *  So everything outside **the row leaving, the row before, the row showing and the two rows
 *  after** is `hidden`, and an image inside `display: none` is never fetched. The rows after
 *  are mounted but transparent, which is what fetches and decodes them before they slide in;
 *  the advance also waits for that decode (up to one more interval), so a row never arrives
 *  blank on a slow phone.
 *
 *  ## The row slides, as one piece
 *
 *  It faded, row by row and then frame by frame, until October 2026, when the owner found it
 *  static and asked for movement. **The row now travels sideways, like the carousel it is:**
 *  the leaving row goes out one side as the next comes in from the other, both a full track
 *  width (plus a gap) apart, so they move edge to edge and never overlap. Backwards - the
 *  "Poprzednie" button, the left arrow, a dot further back - runs it the other way.
 *
 *  **The frames of a row move together, never staggered**, and that was tried rather than
 *  assumed: a frame that starts late is still standing where an earlier one, moving, has to
 *  pass through it - two frames of the same row, or a frame of each row, drawn over each other
 *  mid-slide. A row moving as one cannot collide with anything.
 *
 *  The section clips it (`overflow: clip` on `.show`), so a row slides out to the edge of the
 *  band rather than across the page. The motion is the Web Animations API rather than CSS
 *  transitions: a transition needs a "from" style committed before the "to", which across a
 *  `hidden` toggle and a grid column change is three forced reflows and a race; `animate()`
 *  takes both ends at once. What keeps the movement smooth rather than merely correct - the
 *  curve, the timing, the layers and the work held back until the row has landed - is written
 *  at `SLIDE`, `EASING` and `settle`. Reduced motion skips the animation and swaps the row.
 *
 *  ## It does not stop for good any more
 *
 *  **The owner reported in October 2026 that the show stopped for good, and it did, on
 *  purpose**: like the plantings slideshow, it stopped permanently on the first arrow, dot or
 *  photograph touched, and paused whenever the mouse was over it. To a visitor that is a show
 *  that has broken. Now:
 *
 *  - **"Zatrzymaj" is the only thing that stops it**, and "Odtwórz" starts it again. That
 *    button is what satisfies WCAG 2.2.2 (pause, stop, hide), not the hover.
 *  - **An arrow, a dot, an arrow key or a swipe moves the row and restarts the clock** - a full
 *    interval to look at what the visitor chose, then it carries on.
 *  - **An enlarged photograph holds it**: while the lightbox is open the show does not advance
 *    underneath, and it carries on once the lightbox is closed.
 *  - **Focus reached with Tab holds it**; clicks, taps and the focus the lightbox hands back
 *    on closing do not (see `tabbed` below). Someone tabbing through the frames should not
 *    have them change under the focus ring; someone who clicked "Następne" or closed a photo
 *    should not have frozen the show by doing so.
 *  - The hover pause is gone.
 *
 *  This is a deliberate parting from `compositions.ts`, which still stops for good: a slideshow
 *  of 23 plantings that a visitor reads one by one is a different thing from a show of 69
 *  photographs that is meant to keep moving.
 *
 *  Also unchanged: it never runs under `prefers-reduced-motion`, does not advance while the
 *  section is off screen, and puts no control on a photograph - the old slider floats its
 *  arrows over the picture, this site keeps them underneath, as the lightbox does.
 *
 *  Every query is scoped to the `[data-show]` root.
 */
function initShow(root: HTMLElement): void {
  const track = root.querySelector<HTMLElement>("[data-show-track]");
  if (!track) return;

  const slides = [...track.querySelectorAll<HTMLElement>("[data-show-slide]")];
  if (slides.length < 2) return;

  const ticks = [...root.querySelectorAll<HTMLButtonElement>("[data-show-tick]")];
  const previous = root.querySelector<HTMLButtonElement>("[data-show-prev]");
  const next = root.querySelector<HTMLButtonElement>("[data-show-next]");
  const toggle = root.querySelector<HTMLButtonElement>("[data-show-toggle]");
  const indexLabel = root.querySelector<HTMLElement>("[data-show-index]");
  const totalLabel = root.querySelector<HTMLElement>("[data-show-total]");
  const groupLabel = root.querySelector<HTMLElement>("[data-show-label]");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  /** Time on screen per row, counted from the moment it has arrived. The old site's slider
   *  ran at 3000; half a second more, because a slide here is a row of up to four. */
  const INTERVAL = 3500;
  /** How long a row takes to cross. A whole track width is up to 1200px, and at 750ms with a
   *  steep curve the middle of the slide ran at over 3000px a second - fast enough to strobe on
   *  a 60Hz screen rather than glide. A second halves that peak. */
  const SLIDE = 1000;
  /** A gentle start and a long, soft landing: the row eases off its mark rather than being
   *  yanked, and spends most of the second settling into place, which is where the eye is.
   *  The symmetric ease-in-out it replaced (0.65, 0, 0.35, 1) started and stopped equally
   *  hard, and the hard start is what reads as a jerk. */
  const EASING = "cubic-bezier(0.45, 0.05, 0.2, 1)";
  /** The narrowest a portrait frame may get before the row drops one. Measured against the
   *  track's own width and its gap, not against the viewport - the section sits inside `--edge`
   *  and the gap is a `clamp`, so a viewport number would be wrong at both ends. */
  const FRAME_WIDTH = 250;
  /** Four fills the 1200px band; a fifth would take these frames below the width the category
   *  strips already settled as the floor. */
  const MAX_PER_ROW = 4;

  let timer: ReturnType<typeof setTimeout> | null = null;
  /** Bumped by every pause, so an advance that was waiting for photographs to decode can tell
   *  that it has been called off in the meantime. */
  let generation = 0;
  /** True only after "Zatrzymaj", or under reduced motion. Nothing else sets it. */
  let stopped = reducedMotion.matches;
  /** Keyboard focus is inside the section. */
  let held = false;
  let onScreen = true;
  let current = 0;
  /** Slide indices, row by row. Rebuilt whenever the width changes how many fit. */
  let rows: number[][] = [];
  /** Which group each row belongs to, parallel to `rows`. */
  let rowGroups: number[] = [];
  /** How many frames a full row holds at the current width. A short row is centred against
   *  this, so `render` needs it too. */
  let perRow = 1;

  /** Where each group starts and ends in `slides`, read off the markup so the grouping is
   *  stated once, in the data, and not a second time here. */
  const bounds: { start: number; end: number }[] = [];
  for (const [at, slide] of slides.entries()) {
    const group = Number(slide.dataset.group ?? 0);
    const bound = bounds[group];
    if (bound) bound.end = at + 1;
    else bounds[group] = { start: at, end: at + 1 };
  }

  function measure(): void {
    const gap = Number.parseFloat(getComputedStyle(track!).columnGap) || 0;
    const fits = Math.floor((track!.clientWidth + gap) / (FRAME_WIDTH + gap));
    perRow = Math.max(1, Math.min(MAX_PER_ROW, fits));

    rows = [];
    rowGroups = [];
    for (const [group, bound] of bounds.entries()) {
      // Spread the group over its rows evenly instead of filling each one and leaving the
      // remainder behind. Nine pansy frames four across were a row of four, a row of four and
      // **a row of one** - a single photograph with three empty columns beside it, which reads
      // as a fault rather than as the end of a group. Evenly they are three rows of three. The
      // number of rows is the same either way, so nothing else in here changes.
      const total = bound.end - bound.start;
      const count = Math.ceil(total / perRow);
      const base = Math.floor(total / count);
      // The first `extra` rows take one more, so the longer rows come first and the row that
      // is one short is the last one a visitor sees of that group.
      const extra = total % count;
      let at = bound.start;
      for (let row = 0; row < count; row += 1) {
        const length = base + (row < extra ? 1 : 0);
        rows.push(Array.from({ length }, (_, step) => at + step));
        rowGroups.push(group);
        at += length;
      }
    }

    // **Twice as many columns as frames, and every frame spans two of them.** A row that is
    // one frame short has to be centred, and half a frame of free space on each side is not
    // something a grid of whole columns can express: three frames in four columns can only
    // start at column 1 or column 2, both of them off-centre. In half-columns the same row
    // starts at column 2 of eight and ends at column 7, leaving one half-column either side.
    // The frame keeps the width it had - `(W - 3G) / 4` either way - because a frame spanning
    // two half-columns also swallows the gap between them.
    track!.style.gridTemplateColumns = `repeat(${perRow * 2}, 1fr)`;
    if (totalLabel) totalLabel.textContent = String(rows.length);
  }

  /** Everything that does not have to happen while a row is moving, done once it has stopped:
   *  the frames that left rejoin the waiting stack, the rows either side are mounted (which is
   *  what starts their download and decode), and everything further away is unmounted.
   *
   *  **This is the half of the smoothness that is not the curve.** Mounting a row means a
   *  `display` change, a layout, a network request and an image decode, and doing it in the same
   *  frame the slide starts - as this did until October 2026 - spends the first frames of the
   *  movement on work nobody can see. On a fast machine that is invisible; on a phone it is the
   *  hitch at the start of every slide that the owner described as the show "tearing". */
  function settle(): void {
    const showing = rows[current] ?? [];
    const upcoming = rows[(current + 1) % rows.length] ?? [];
    const mounted = new Set([
      ...(rows[(current - 1 + rows.length) % rows.length] ?? []),
      ...showing,
      ...upcoming,
      ...(rows[(current + 2) % rows.length] ?? []),
    ]);
    for (const [at, slide] of slides.entries()) {
      // The row on screen and the row that moves in next keep their own compositor layer
      // between slides, so the first frame of the next slide has nothing to rasterise. Two rows
      // is at most eight layers; promoting every mounted frame would be twenty.
      slide.style.willChange = showing.includes(at) || upcoming.includes(at) ? "transform" : "";
      if (showing.includes(at)) continue;
      slide.removeAttribute("data-leaving");
      slide.style.gridColumn = "1 / span 2";
      slide.hidden = !mounted.has(at);
    }
  }

  /** Lays the current row out and, given a direction, slides it in over `leaving`. Direction
   *  0 is a plain swap - the first paint, a resize, reduced motion. */
  function render(direction: -1 | 0 | 1, leaving: number[]): void {
    // A slide still under way is cut short, so a quick second click starts from a settled row
    // instead of from two half-crossed ones. Its `finished` rejects and its `settle` never runs;
    // this render's does.
    for (const slide of slides) {
      for (const animation of slide.getAnimations()) animation.cancel();
    }

    const showing = rows[current] ?? [];
    const animate = direction !== 0 && !reducedMotion.matches;
    const outgoing = animate ? leaving.filter((at) => !showing.includes(at)) : [];

    // Half-columns of free space to the left of a short row, so it sits in the middle of the
    // band rather than against its left edge. A full row gets nought.
    const offset = perRow - showing.length;

    // Only what the slide needs is touched here: the incoming frames get their columns and the
    // outgoing ones keep theirs. Mounting and unmounting the rows around them waits for
    // `settle`, after the movement - see there for why.
    for (const [at, slide] of slides.entries()) {
      const column = showing.indexOf(at);
      const isShowing = column !== -1;
      const isLeaving = outgoing.includes(at);
      if (isShowing) {
        slide.hidden = false;
        slide.style.gridColumn = `${offset + 1 + column * 2} / span 2`;
      } else if (!isLeaving) {
        slide.removeAttribute("data-leaving");
        slide.style.gridColumn = "1 / span 2";
      }
      slide.toggleAttribute("data-current", isShowing);
      slide.toggleAttribute("data-leaving", isLeaving);
      // Keeps the mounted-but-invisible frames out of the tab order and out of the
      // accessibility tree while leaving them in the DOM. `querySelectorAll` still finds every
      // frame, hidden ones included, so the lightbox steps through all sixty-nine.
      slide.toggleAttribute("inert", !isShowing);
    }

    const group = rowGroups[current] ?? 0;
    for (const [at, tick] of ticks.entries()) {
      if (at === group) tick.setAttribute("aria-current", "true");
      else tick.removeAttribute("aria-current");
    }
    if (indexLabel) indexLabel.textContent = String(current + 1);
    if (groupLabel) {
      const label = slides[showing[0] ?? 0]?.dataset.groupLabel;
      if (label) groupLabel.textContent = label;
    }

    if (!animate) {
      settle();
      return;
    }

    // `transform` only - the one property a browser can move on the compositor without a
    // layout or a repaint per frame - and the incoming row and the outgoing row a whole track
    // width (plus a gap) apart, so they travel edge to edge and never overlap.
    const gap = Number.parseFloat(getComputedStyle(track!).columnGap) || 0;
    const distance = (track!.clientWidth + gap) * direction;
    const timing: KeyframeAnimationOptions = { duration: SLIDE, easing: EASING, fill: "both" };
    const moves: Animation[] = [];
    for (const at of showing) {
      const slide = slides[at];
      if (!slide) continue;
      slide.style.willChange = "transform";
      moves.push(
        slide.animate(
          [
            { transform: `translate3d(${distance}px, 0, 0)` },
            { transform: "translate3d(0, 0, 0)" },
          ],
          timing,
        ),
      );
    }
    for (const at of outgoing) {
      const slide = slides[at];
      if (!slide) continue;
      slide.style.willChange = "transform";
      moves.push(
        slide.animate(
          [
            { transform: "translate3d(0, 0, 0)" },
            { transform: `translate3d(${-distance}px, 0, 0)` },
          ],
          timing,
        ),
      );
    }
    Promise.all(moves.map((move) => move.finished))
      .then(() => {
        // `fill: both` holds both rows at their ends until this point, so nothing snaps back for
        // a frame between the end of the movement and the tidy-up.
        settle();
        for (const move of moves) move.cancel();
      })
      .catch(() => undefined);
  }

  function show(index: number, direction: -1 | 0 | 1): void {
    const leaving = rows[current] ?? [];
    current = (index + rows.length) % rows.length;
    render(direction, leaving);
  }

  /** Resolves once every photograph of a row is decoded, or after `limit` ms, whichever comes
   *  first - a file that never arrives must not hold the show up for good. */
  function ready(index: number, limit: number): Promise<void> {
    const images = (rows[index] ?? []).flatMap((at) => [
      ...(slides[at]?.querySelectorAll<HTMLImageElement>("img") ?? []),
    ]);
    return Promise.race([
      Promise.all(images.map((image) => image.decode().catch(() => undefined))).then(() => {}),
      new Promise<void>((resolve) => setTimeout(resolve, limit)),
    ]);
  }

  /** The lightbox is one overlay for the whole page, added by `lightbox.ts`; open is simply
   *  "present and not hidden". */
  function lightboxOpen(): boolean {
    return document.querySelector(".lightbox:not([hidden])") !== null;
  }

  /** One advance at a time, each scheduled by the last - a `setTimeout` chain rather than a
   *  `setInterval`, because an advance may have to wait for its photographs and the clock
   *  restarts whenever the visitor moves the row. */
  function schedule(): void {
    const token = generation;
    timer = setTimeout(async () => {
      if (lightboxOpen()) {
        // Wait the lightbox out, then a full interval from the moment it closed - so the row
        // the visitor comes back to does not leave the instant they see it again.
        while (lightboxOpen()) {
          await new Promise((resolve) => setTimeout(resolve, 250));
          if (token !== generation) return;
        }
        schedule();
        return;
      }
      const target = (current + 1) % rows.length;
      await ready(target, INTERVAL);
      if (token !== generation) return;
      show(target, 1);
      schedule();
    }, INTERVAL + SLIDE);
  }

  function start(): void {
    if (stopped || held || timer !== null || !onScreen || document.hidden) return;
    schedule();
  }

  /** Temporary - whatever paused it starts it again. */
  function pause(): void {
    if (timer === null) return;
    clearTimeout(timer);
    timer = null;
    generation += 1;
  }

  function setToggle(): void {
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", String(stopped));
    toggle.textContent = stopped ? "Odtwórz" : "Zatrzymaj";
  }

  /** The visitor moved the row: go there, then give them a full interval before carrying on. */
  function go(index: number, direction: -1 | 1): void {
    pause();
    show(index, direction);
    start();
  }

  previous?.addEventListener("click", () => go(current - 1, -1));
  next?.addEventListener("click", () => go(current + 1, 1));
  toggle?.addEventListener("click", () => {
    stopped = !stopped;
    setToggle();
    if (stopped) pause();
    else start();
  });

  for (const [group, tick] of ticks.entries()) {
    tick.addEventListener("click", () => {
      const target = rowGroups.indexOf(group);
      if (target === -1 || target === current) return;
      go(target, target > current ? 1 : -1);
    });
  }

  // **Only focus that arrived by Tab holds the show**, and `:focus-visible` alone was not
  // enough to say so: closing the lightbox hands focus back to the frame that opened it, the
  // browser counts that as visible focus, and the show stood still until the visitor clicked
  // somewhere else - the very "stops for good" this rewrite was for. Tab is the one key that
  // means "I am walking through this with the keyboard".
  let tabbed = false;
  document.addEventListener("keydown", (event) => {
    tabbed = event.key === "Tab";
  });
  document.addEventListener("pointerdown", () => {
    tabbed = false;
  });
  root.addEventListener("focusin", () => {
    if (!tabbed) return;
    held = true;
    pause();
  });
  root.addEventListener("focusout", (event) => {
    if (event.relatedTarget instanceof Node && root.contains(event.relatedTarget)) return;
    held = false;
    start();
  });

  track.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    if (event.key === "ArrowRight") go(current + 1, 1);
    else go(current - 1, -1);
  });

  // **A swipe moves the row**, which is the first thing a thumb tries on a phone and did
  // nothing until October 2026. Touch and pen only - a mouse drag across a photograph is a
  // selection, not a gesture. `touch-action: pan-y` on the track (GalleryShow.astro) is what
  // lets this work at all: it hands the vertical scroll to the browser and keeps the horizontal
  // movement for us, so the page still scrolls through the band with a finger.
  //
  // 40px and mostly sideways counts; anything shorter or steeper is a tap or a scroll. A swipe
  // that ends on a photograph would also fire that photograph's click and open the lightbox,
  // so the click right after a swipe is swallowed - in the capture phase, before the link's
  // own handler in lightbox.ts sees it.
  const SWIPE = 40;
  let swipeFrom: { x: number; y: number } | null = null;
  let swiped = false;
  track.addEventListener("pointerdown", (event) => {
    swiped = false;
    swipeFrom = event.pointerType === "mouse" ? null : { x: event.clientX, y: event.clientY };
  });
  track.addEventListener("pointercancel", () => {
    swipeFrom = null;
  });
  track.addEventListener("pointerup", (event) => {
    if (!swipeFrom) return;
    const dx = event.clientX - swipeFrom.x;
    const dy = event.clientY - swipeFrom.y;
    swipeFrom = null;
    if (Math.abs(dx) < SWIPE || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    swiped = true;
    if (dx < 0) go(current + 1, 1);
    else go(current - 1, -1);
  });
  track.addEventListener(
    "click",
    (event) => {
      if (!swiped) return;
      swiped = false;
      event.preventDefault();
      event.stopPropagation();
    },
    true,
  );

  /** A wider window fits another frame, which changes what a row is and how many there are.
   *  The visitor keeps the photograph they were looking at rather than the row number, so a
   *  resize does not move them to a different part of the year. */
  if ("ResizeObserver" in window) {
    let lastCount = 0;
    new ResizeObserver(() => {
      const first = rows[current]?.[0] ?? 0;
      measure();
      if (rows.length === lastCount) return;
      lastCount = rows.length;
      const target = rows.findIndex((row) => row.includes(first));
      current = target === -1 ? 0 : target;
      render(0, []);
    }).observe(track);
  }

  /** Reduced motion means no automatic advance, no control offering to start one and no
   *  slide - `render` checks the same query - the same bargain `compositions.ts` strikes. */
  function applyMotionPreference(): void {
    if (reducedMotion.matches) {
      pause();
      stopped = true;
      if (toggle) toggle.hidden = true;
    } else if (toggle) {
      toggle.hidden = false;
    }
    setToggle();
  }
  reducedMotion.addEventListener("change", applyMotionPreference);
  applyMotionPreference();

  /** Switch the row layout on. Until this runs the slides are an ordinary list, which is what a
   *  visitor without this script keeps. */
  root.dataset.ready = "";
  measure();
  render(0, []);

  if ("IntersectionObserver" in window) {
    onScreen = false;
    new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          onScreen = entry.isIntersecting;
          if (onScreen) start();
          else pause();
        }
      },
      { threshold: 0.25 },
    ).observe(root);
  } else {
    start();
  }

  // A background tab throttles timers and skips frames, so a slide that started there would
  // be shown as a jump - or as half a slide - when the visitor comes back. Pause instead, and
  // give them a full interval on their return.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pause();
    else start();
  });
}

for (const root of document.querySelectorAll<HTMLElement>("[data-show]")) {
  initShow(root);
}
