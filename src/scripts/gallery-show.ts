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
 *  ## Sixty-nine photographs, three rows mounted
 *
 *  Every frame is in the markup, which is what makes the no-script fallback complete - and if
 *  all 69 were laid out at once the browser would fetch all 69 the moment the section scrolled
 *  into view, because `loading="lazy"` measures intersection and they all share one grid cell.
 *  So everything outside **the row before, the row showing and the row after** is `hidden`, and
 *  an image inside `display: none` is never fetched. The row after is mounted but transparent,
 *  which is what fetches it in time to be faded in rather than to appear blank; and because it
 *  is already mounted, the fade has a previous computed style to transition from. A jump
 *  straight to a group the ticks were not next to appears without a fade, which is the right
 *  answer to a deliberate action.
 *
 *  ## What was and was not carried over
 *
 *  - **The transition is a cascade of opacity.** Nivo's `random` slices the picture into 15
 *    strips or 35 boxes and wipes between them; this design has no animation at all, so what
 *    ships is the most restrained thing that still reads as a change: the frames of a row fade
 *    in one after another, `CASCADE_STEP` apart. Two other readings - the whole row at once,
 *    and a fade with 16px of rise - were built and shown, and this is the one that was kept.
 *  - **The duration is set from here, not from CSS.** A `prefers-reduced-motion` block in a
 *    component would be the project's second media query and the first is a deliberate
 *    singleton (CLAUDE.md). The script already has to ask about motion to decide whether to
 *    advance at all, so it writes `--show-fade` on the root and the CSS reads it. Reduced
 *    motion gets `0ms`, which is a swap rather than a fade.
 *  - **No arrows on the photograph.** The old slider floats them over the picture; this site
 *    puts no text or control on a photograph, so the controls sit underneath, as the lightbox's
 *    do.
 *  - **3 seconds becomes 6.** Three is faster than a row of four can be looked at, and it is
 *    the interval the plantings slideshow next door already runs at.
 *
 *  The rules it shares with `compositions.ts`, because two shows on one site that behaved
 *  differently would be worse than either behaviour alone: it pauses on hover and on focus,
 *  stops **for good** on the first real interaction, never runs under `prefers-reduced-motion`,
 *  and does not advance while the section is off screen.
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
  const INTERVAL = 6000;
  /** The narrowest a portrait frame may get before the row drops one. Measured against the
   *  track's own width and its gap, not against the viewport - the section sits inside `--edge`
   *  and the gap is a `clamp`, so a viewport number would be wrong at both ends. */
  const FRAME_WIDTH = 250;
  /** Four fills the 1200px band; a fifth would take these frames below the width the category
   *  strips already settled as the floor. */
  const MAX_PER_ROW = 4;
  /** How far apart the frames of one row start fading. */
  const CASCADE_STEP = 90;

  let timer: ReturnType<typeof setInterval> | null = null;
  /** True once the visitor has taken over. The show does not restart itself. */
  let stopped = reducedMotion.matches;
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

  function render(): void {
    const showing = rows[current] ?? [];
    // The row before and the row after stay mounted: the one after so its photographs are
    // fetched before they are needed, the one before so it has somewhere to fade from.
    const mounted = new Set([
      ...(rows[(current - 1 + rows.length) % rows.length] ?? []),
      ...showing,
      ...(rows[(current + 1) % rows.length] ?? []),
    ]);

    // Half-columns of free space to the left of a short row, so it sits in the middle of the
    // band rather than against its left edge. A full row gets nought.
    const offset = perRow - showing.length;

    for (const [at, slide] of slides.entries()) {
      const column = showing.indexOf(at);
      const isShowing = column !== -1;
      slide.hidden = !mounted.has(at);
      // The hidden frames stack on the first two half-columns underneath the row on screen.
      slide.style.gridColumn = `${isShowing ? offset + 1 + column * 2 : 1} / span 2`;
      slide.style.transitionDelay = isShowing ? `${column * CASCADE_STEP}ms` : "0ms";
      slide.toggleAttribute("data-current", isShowing);
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
  }

  function show(index: number): void {
    current = (index + rows.length) % rows.length;
    render();
  }

  function start(): void {
    if (stopped || timer !== null || !onScreen) return;
    timer = setInterval(() => show(current + 1), INTERVAL);
    toggle?.setAttribute("aria-pressed", "false");
    if (toggle) toggle.textContent = "Zatrzymaj";
  }

  /** Temporary - hovering out or blurring resumes. */
  function pause(): void {
    if (timer === null) return;
    clearInterval(timer);
    timer = null;
  }

  /** Permanent, until the visitor presses play again. */
  function stop(): void {
    pause();
    stopped = true;
    toggle?.setAttribute("aria-pressed", "true");
    if (toggle) toggle.textContent = "Odtwórz";
  }

  function go(delta: number): void {
    stop();
    show(current + delta);
  }

  previous?.addEventListener("click", () => go(-1));
  next?.addEventListener("click", () => go(1));
  toggle?.addEventListener("click", () => {
    if (timer === null) {
      stopped = false;
      start();
    } else {
      stop();
    }
  });

  for (const [group, tick] of ticks.entries()) {
    tick.addEventListener("click", () => {
      stop();
      const target = rowGroups.indexOf(group);
      if (target !== -1) show(target);
    });
  }

  // Opening a photograph is the visitor saying what they came for.
  for (const link of track.querySelectorAll("[data-lightbox]")) {
    link.addEventListener("click", stop);
  }

  root.addEventListener("pointerenter", pause);
  root.addEventListener("pointerleave", start);
  root.addEventListener("focusin", pause);
  root.addEventListener("focusout", start);

  track.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    go(event.key === "ArrowRight" ? 1 : -1);
  });

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
      render();
    }).observe(track);
  }

  /** The fade lives in CSS but its duration is decided here - see the note at the top on why
   *  this is not a media query. Reduced motion also means no automatic advance and no control
   *  offering to start one, the same bargain `compositions.ts` strikes. */
  function applyMotionPreference(): void {
    root.style.setProperty("--show-fade", reducedMotion.matches ? "0ms" : "420ms");
    if (reducedMotion.matches) {
      pause();
      stopped = true;
      if (toggle) toggle.hidden = true;
    } else if (toggle) {
      toggle.hidden = false;
    }
  }
  reducedMotion.addEventListener("change", applyMotionPreference);
  applyMotionPreference();

  /** Switch the row layout on. Until this runs the slides are an ordinary list, which is what a
   *  visitor without this script keeps. */
  root.dataset.ready = "";
  measure();
  show(0);

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
}

for (const root of document.querySelectorAll<HTMLElement>("[data-show]")) {
  initShow(root);
}
