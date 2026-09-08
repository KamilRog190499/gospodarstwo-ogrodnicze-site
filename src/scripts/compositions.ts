/** `/inspiracje/` - the plantings strip.
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
 *  New: `visible`. The filter hides panels, so "next" means the next *shown* panel and the
 *  counter counts within the filtered set. Everything indexes into `panels`; `visible` is
 *  the list of indices currently on show.
 */

const track = document.querySelector<HTMLElement>("[data-track]");
const controls = document.querySelector<HTMLElement>("[data-controls]");

if (track && controls) {
  const panels = [...track.querySelectorAll<HTMLElement>("[data-panel]")];
  const thumbItems = [...document.querySelectorAll<HTMLElement>("[data-thumb-item]")];
  const thumbs = [...document.querySelectorAll<HTMLAnchorElement>("[data-thumb]")];
  const filters = [...document.querySelectorAll<HTMLButtonElement>("[data-filter]")];

  const indexLabel = controls.querySelector<HTMLElement>("[data-index]");
  const totalLabel = controls.querySelector<HTMLElement>("[data-total]");
  const toggle = controls.querySelector<HTMLButtonElement>("[data-toggle]");
  const previous = controls.querySelector<HTMLButtonElement>("[data-prev]");
  const next = controls.querySelector<HTMLButtonElement>("[data-next]");

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

  function start(): void {
    if (stopped || timer !== null) return;
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
  if (location.hash) {
    const target = panels.findIndex((panel) => `#${panel.id}` === location.hash);
    if (target !== -1) {
      stopped = true;
      if (toggle) {
        toggle.setAttribute("aria-pressed", "true");
        toggle.textContent = "Odtwórz";
      }
    }
  }

  render();
  start();
}
