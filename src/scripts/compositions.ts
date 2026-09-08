/** The plantings strip - `/inspiracje/` in full, and the home page in a reduced variant.
 *
 *  Supersedes `slideshow.ts`, whose whole job it keeps: progressive enhancement over a
 *  scroll-snap track. Without this file the page is still a scrollable strip of complete
 *  panels, every one with its name, its plants and the phone number, and the rail below is
 *  still a list of anchors that jumps to them. All this adds is the buttons, the counter,
 *  the filter and the auto-advance.
 *
 *  The advance stays deliberately timid - it stops for good on the first press of a button,
 *  on a click into a photograph and on any scroll the visitor makes themselves; it pauses
 *  while the pointer or the keyboard focus is inside the strip; and it never runs at all for
 *  someone who has asked for reduced motion.
 *
 *  Two things are carried over verbatim because they were right: reading the current slide
 *  off `scrollLeft` rather than keeping it in a variable (a swipe, a shift-scroll and a
 *  button press cannot then disagree), and the `programmatic` flag that lets the scroll
 *  handler tell our own smooth scroll apart from a swipe.
 *
 *  `visible`: the filter hides panels, so "next" means the next *shown* panel and the
 *  counter counts within the filtered set. Everything indexes into `panels`; `visible` is
 *  the list of indices currently on show.
 *
 *  ## One strip per root, not one per document
 *
 *  Every query below is scoped to the `[data-comp]` element `init` was called with, because
 *  the site now has more than one strip: `/inspiracje/` carries the full one and the home
 *  page a reduced one. The previous version reached for `document.querySelector`, so a
 *  second strip would have been driven by the buttons of the first and would have moved the
 *  wrong track.
 *
 *  Which parts exist is up to the markup, not to this file: `Compositions.astro` can be
 *  asked for a strip with no filters, no rail, or no controls at all. The only thing `init`
 *  insists on is a track with panels in it - everything else degrades to "that feature is
 *  not on this page".
 */

function init(root: HTMLElement): void {
  const track = root.querySelector<HTMLElement>("[data-track]");
  if (!track) return;

  const panels = [...track.querySelectorAll<HTMLElement>("[data-panel]")];
  if (panels.length === 0) return;

  /** Absent in a variant rendered without buttons. The strip is then the scroll-snap track
   *  and the arrow keys - the no-JavaScript experience plus keyboard steps. */
  const controls = root.querySelector<HTMLElement>("[data-controls]");
  const thumbItems = [...root.querySelectorAll<HTMLElement>("[data-thumb-item]")];
  const thumbs = [...root.querySelectorAll<HTMLAnchorElement>("[data-thumb]")];
  const filters = [...root.querySelectorAll<HTMLButtonElement>("[data-filter]")];

  const indexLabel = controls?.querySelector<HTMLElement>("[data-index]") ?? null;
  const totalLabel = controls?.querySelector<HTMLElement>("[data-total]") ?? null;
  const toggle = controls?.querySelector<HTMLButtonElement>("[data-toggle]") ?? null;
  const previous = controls?.querySelector<HTMLButtonElement>("[data-prev]") ?? null;
  const next = controls?.querySelector<HTMLButtonElement>("[data-next]") ?? null;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const INTERVAL = 6000;

  let timer: ReturnType<typeof setInterval> | null = null;
  /** True once the visitor has taken over. The slideshow does not restart itself. */
  let stopped = reducedMotion.matches;
  /** Set around a scroll this file starts, so the scroll handler can tell it apart from a
   *  swipe or a shift-scroll the visitor made. */
  let programmatic = false;
  /** Indices into `panels` that the current filter shows. */
  let visible = panels.map((_, index) => index);

  /** Which panel is in view - the nearest shown one to the centre of the scrollport. */
  function currentIndex(): number {
    const middle = track!.scrollLeft + track!.clientWidth / 2;
    let nearest = visible[0] ?? 0;
    let best = Infinity;
    for (const index of visible) {
      const panel = panels[index]!;
      const centre = panel.offsetLeft - track!.offsetLeft + panel.clientWidth / 2;
      const distance = Math.abs(centre - middle);
      if (distance < best) {
        best = distance;
        nearest = index;
      }
    }
    return nearest;
  }

  function render(): void {
    const current = currentIndex();
    const position = visible.indexOf(current);
    if (indexLabel) indexLabel.textContent = String(position + 1);
    if (totalLabel) totalLabel.textContent = String(visible.length);
    for (const [index, thumb] of thumbs.entries()) {
      if (index === current) thumb.setAttribute("aria-current", "true");
      else thumb.removeAttribute("aria-current");
    }
  }

  function show(index: number): void {
    const panel = panels[index];
    if (!panel) return;
    programmatic = true;
    // Centred, to agree with `scroll-snap-align: center`. Clamped by the browser at the two
    // ends of the track, which is why no Math.max is needed here.
    track!.scrollTo({
      left: panel.offsetLeft - track!.offsetLeft - (track!.clientWidth - panel.clientWidth) / 2,
      behavior: reducedMotion.matches ? "auto" : "smooth",
    });
    window.setTimeout(() => {
      programmatic = false;
      render();
    }, 700);
  }

  /** Whether the strip is on screen. The advance does not run while it is not.
   *
   *  On `/inspiracje/` the strip is the page and this changes nothing. On the home page it
   *  is one section among five, and the counter is a `role="status"` live region: without
   *  this, a screen reader sitting on the hero announces "3 z 23", "4 z 23" every six
   *  seconds about a strip several screens below that the visitor has not reached. It is
   *  the same restraint the pointer and focus handlers already apply - do not move under
   *  someone who is not looking.
   *
   *  Starts `true` where `IntersectionObserver` is missing, so an old browser gets the
   *  previous behaviour rather than a strip that never advances. */
  let onScreen = true;

  function start(): void {
    if (stopped || timer !== null || !onScreen) return;
    timer = setInterval(() => {
      const position = visible.indexOf(currentIndex());
      const following = visible[(position + 1) % visible.length];
      if (following !== undefined) show(following);
    }, INTERVAL);
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
    const position = visible.indexOf(currentIndex());
    const target = visible[(position + delta + visible.length) % visible.length];
    if (target !== undefined) show(target);
  }

  /** `kind` is a container type, or "all".
   *
   *  Hides rather than removes, so the panels keep their ids and a link to a filtered-out
   *  planting still works - the filter is a way to look, not a different page. */
  function applyFilter(kind: string): void {
    for (const [index, panel] of panels.entries()) {
      const matches = kind === "all" || panel.dataset.kind === kind;
      panel.hidden = !matches;
      const item = thumbItems[index];
      if (item) item.hidden = !matches;
    }
    visible = panels.flatMap((panel, index) => (panel.hidden ? [] : [index]));
    for (const button of filters) {
      button.setAttribute("aria-pressed", String(button.dataset.filter === kind));
    }
    const first = visible[0];
    if (first !== undefined) show(first);
    render();
  }

  previous?.addEventListener("click", () => go(-1));
  next?.addEventListener("click", () => go(1));

  toggle?.addEventListener("click", () => {
    if (!stopped) {
      stop();
      return;
    }
    stopped = false;
    start();
  });

  for (const button of filters) {
    button.addEventListener("click", () => {
      // Choosing a group is taking over: the strip must not wander off the group.
      stop();
      applyFilter(button.dataset.filter ?? "all");
    });
  }

  // The rail is anchors, so it works without this; with it, the same click scrolls the strip
  // instead of jumping the page, which keeps the heading and the filter in view.
  for (const [index, thumb] of thumbs.entries()) {
    thumb.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      stop();
      show(index);
      // The address bar should still name what is on screen - a link someone copies has to
      // point at this planting.
      history.replaceState(null, "", thumb.getAttribute("href") ?? location.pathname);
    });
  }

  // Opening a photograph counts as taking over: the strip must not move on behind the
  // overlay lightbox.ts puts up.
  for (const link of track.querySelectorAll("[data-lightbox]")) {
    link.addEventListener("click", stop);
  }

  track.addEventListener(
    "scroll",
    () => {
      render();
      if (!programmatic) stop();
    },
    { passive: true },
  );

  track.addEventListener("pointerenter", pause);
  track.addEventListener("pointerleave", start);
  track.addEventListener("focusin", pause);
  track.addEventListener("focusout", start);

  // Arrow keys while the strip has focus. The browser would scroll it by an arbitrary step;
  // this makes the step exactly one panel.
  track.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    go(event.key === "ArrowRight" ? 1 : -1);
  });

  /** Someone who asks for reduced motion gets the strip, the filter and the buttons, but no
   *  automatic movement and no control offering to start some - a button that would do
   *  nothing is worse than no button. */
  function applyMotionPreference(): void {
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

  // A visitor who arrived on `/inspiracje/#kosz-z-petuniami-i-srebrem` is already looking at
  // that planting: the browser scrolled the track to it. Do not move, and do not start the
  // advance under someone who came for one thing.
  //
  // Guarded on `length > 1` and on the panel having an id at all: a bare "#" is a hash too,
  // and in a variant rendered without ids every panel would match `#${panel.id}` and stop
  // the strip on the first one.
  if (location.hash.length > 1) {
    const target = panels.findIndex((panel) => panel.id && `#${panel.id}` === location.hash);
    if (target !== -1) {
      stopped = true;
      if (toggle) {
        toggle.setAttribute("aria-pressed", "true");
        toggle.textContent = "Odtwórz";
      }
    }
  }

  render();

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
      // A quarter of the section: enough that the strip is genuinely being looked at, not
      // just clipping the bottom of the viewport.
      { threshold: 0.25 },
    ).observe(root);
  } else {
    start();
  }
}

for (const root of document.querySelectorAll<HTMLElement>("[data-comp]")) {
  init(root);
}
