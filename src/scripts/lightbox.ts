/** The gallery's overlay preview.
 *
 *  Progressive enhancement, all of it. Every slide in Compositions.astro and every frame in
 *  PhotoStrip.astro is already a link to the full-size photograph; this intercepts the click
 *  and shows it in place instead. With scripting off nothing here runs and the links keep
 *  working.
 *
 *  The overlay is built here rather than rendered into every page, so a visitor who never
 *  opens the gallery never pays for the markup.
 *
 *  ## Moving between photographs
 *
 *  The overlay used to be a dead end: it opened one photograph and the only way to the next
 *  was to close it and aim at the next thumbnail. With 24 frames under `/kwiaty-balkonowe/`
 *  that is 23 round trips to see the strip, so the overlay now walks the set.
 *
 *  **The set is the openers that share a container, in document order, and it wraps.** The
 *  container is the nearest ancestor carrying `data-lightbox-group`; an opener with no such
 *  ancestor falls back to the whole document, so a page that never marks a group behaves
 *  exactly as it did when the set was "every `a[data-lightbox]` on the page".
 *
 *  It used to be the whole page, and that was safe only while no page mixed two groups - a
 *  category page had its strip and nothing else, `/inspiracje/` and the home page had the
 *  slideshow and nothing else. The home page gallery ends that: it puts a second set of
 *  openers on the page that already carries the slideshow's, and without the grouping
 *  "Następne" would step out of the gallery into the plantings without saying so.
 *
 *  The set is resolved **at click time**, not once at load: it costs one `querySelectorAll`
 *  per opening rather than one per page, and it survives a group whose openers are filtered,
 *  added or reordered after this script has run.
 *
 *  Wrapping rather than stopping at the ends is deliberate: buttons that go dead at the edges
 *  of a 24-frame row read as broken more often than they read as informative, and the position
 *  indicator already says where in the set you are.
 */

const openers = [...document.querySelectorAll<HTMLAnchorElement>("a[data-lightbox]")];
if (openers.length > 0) {
  /** The openers that share `opener`'s group, in document order. */
  function setFor(opener: HTMLAnchorElement): HTMLAnchorElement[] {
    const group = opener.closest<HTMLElement>("[data-lightbox-group]");
    const scope: ParentNode = group ?? document;
    return [...scope.querySelectorAll<HTMLAnchorElement>("a[data-lightbox]")];
  }

  /** The set the overlay is currently walking. Empty while it is closed. */
  let tiles: HTMLAnchorElement[] = [];
  /** The frame that was clicked, kept for the case where the one being looked at cannot take
   *  focus back - see `close`. */
  let opened: HTMLAnchorElement | null = null;
  /** Which tile is showing. `-1` while the overlay is closed. Replaces the old `opener`
   *  reference: focus still has to go back to the tile that was clicked, but the overlay now
   *  also has to know where it is in the set, and one index answers both. */
  let current = -1;

  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.hidden = true;
  // A dialog rather than a plain div: it tells a screen reader that the rest of the page
  // is not the subject any more, which is what the visual dimming says to everyone else.
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  // No caption. It used to print the same sentence the `<img>` already carries in its `alt`,
  // which a screen reader then read twice and everyone else read once too many - the point of
  // opening a photograph is to look at the photograph. Removed in September 2026 at the
  // owner's request; the description is not lost, it is on the image where it belongs.
  //
  // The controls sit in a bar above the photograph and a bar below it, never on it: this site
  // does not put text on a photograph, and an arrow floating over the image would be the first
  // place it did. The chevrons are the site's one mark for direction - two 1px edges turned 45
  // degrees, the same construction the menu and the FAQ use, because the design forbids icons.
  overlay.innerHTML = `
    <div class="lightbox__bar">
      <p class="lightbox__position" aria-live="polite"></p>
      <button type="button" class="lightbox__button lightbox__close" aria-label="Zamknij podgląd">Zamknij</button>
    </div>
    <div class="lightbox__figure">
      <img class="lightbox__image" alt="" />
    </div>
    <div class="lightbox__nav">
      <button type="button" class="lightbox__button lightbox__prev">Poprzednie</button>
      <button type="button" class="lightbox__button lightbox__next">Następne</button>
    </div>`;
  document.body.append(overlay);

  const image = overlay.querySelector<HTMLImageElement>(".lightbox__image")!;
  const closeButton = overlay.querySelector<HTMLButtonElement>(".lightbox__close")!;
  const prevButton = overlay.querySelector<HTMLButtonElement>(".lightbox__prev")!;
  const nextButton = overlay.querySelector<HTMLButtonElement>(".lightbox__next")!;
  const position = overlay.querySelector<HTMLParagraphElement>(".lightbox__position")!;
  const navigation = overlay.querySelector<HTMLDivElement>(".lightbox__nav")!;

  /** A single photograph is a set of one: there is nowhere to go and nothing to count, so
   *  both readouts come off rather than sitting there inert. `/bratki/` is seven frames and
   *  never hits this, but a page with one pending photograph would - and now so would a group
   *  of one on a page whose other group is long, which is why this is decided per opening. */
  let walkable = false;

  /** Point the overlay at one tile. Everything that changes per photograph changes here, so
   *  opening and stepping are the same operation with a different starting index. */
  function show(index: number): void {
    // Wrap in both directions. The modulo is written the long way because `-1 % n` is `-1`
    // in JavaScript, not `n - 1`.
    current = (index + tiles.length) % tiles.length;
    const tile = tiles[current];
    image.src = tile.href;
    /* The thumbnail's own `alt` first, which is what every frame in a strip and every slide
       in the slideshow carries. `data-alt` is the fallback, and it exists for one case: a
       Facebook post with text beside its photograph gives that photograph an empty `alt` on
       purpose - the words next to it do the describing - and in the overlay those words are
       gone. An unnamed image filling the screen is worse than a plain statement of what it
       is, so `FacebookPost.astro` writes one there. See the note at `caption` in that file. */
    image.alt = tile.querySelector("img")?.alt || (tile.dataset.alt ?? "");
    position.textContent = `${current + 1} z ${tiles.length}`;
  }

  /** Open at `opener`, walking the group it belongs to. The set is read here rather than at
   *  load, so which photographs "Następne" reaches is decided by the frame that was clicked. */
  function open(opener: HTMLAnchorElement): void {
    tiles = setFor(opener);
    opened = opener;
    walkable = tiles.length > 1;
    navigation.hidden = !walkable;
    position.hidden = !walkable;
    show(tiles.indexOf(opener));
    overlay.hidden = false;
    // The page behind must not scroll under the overlay. `scrollbar-gutter: stable` in
    // global.css is what keeps this from shifting the layout sideways.
    document.body.style.overflow = "hidden";
    // The consent bar is fixed to the bottom of the viewport and would otherwise show
    // through the backdrop and sit on top of the photograph. global.css hides it on this flag.
    document.documentElement.classList.add("lightbox-open");
    closeButton.focus();
  }

  function close(): void {
    overlay.hidden = true;
    document.body.style.overflow = "";
    document.documentElement.classList.remove("lightbox-open");
    // Drop the source so a large photograph is not held in memory for the rest of the visit.
    image.removeAttribute("src");
    // Focus goes back to the tile the visitor is actually looking at, which after stepping
    // through the set is not the one they clicked. Returning it to the opener would scroll
    // them back up the page to a photograph they have already left.
    //
    // Unless that tile is not on the page any more: the home page show keeps all 51 frames in
    // the DOM and `hidden` on all but three, so stepping the overlay onto one of the hidden
    // ones and closing would drop focus to the body. Second choice is the frame that was
    // clicked - which is usually still on screen, because opening a photograph stops the show -
    // and last is whatever of the group is visible, so focus lands somewhere in the set the
    // visitor was looking at rather than at the top of the document.
    // Both tests are needed and neither implies the other: `offsetParent` catches the frames
    // inside `display: none`, and `closest("[inert]")` catches the ones that are laid out but
    // waiting their turn - an inert subtree refuses focus silently, which is how this landed
    // on the body the first time.
    const shown = (tile: HTMLAnchorElement | null | undefined) =>
      tile && tile.offsetParent !== null && tile.closest("[inert]") === null ? tile : null;
    const back =
      shown(tiles[current]) ?? shown(opened) ?? tiles.find((tile) => shown(tile)) ?? null;
    back?.focus();
    current = -1;
    tiles = [];
    opened = null;
  }

  for (const opener of openers) {
    opener.addEventListener("click", (event) => {
      // Leave the modified clicks alone - a middle click or ctrl-click means "open this
      // somewhere else", and the href is a perfectly good answer to that.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      event.preventDefault();
      open(opener);
    });
  }

  closeButton.addEventListener("click", close);
  prevButton.addEventListener("click", () => show(current - 1));
  nextButton.addEventListener("click", () => show(current + 1));

  // Clicking the backdrop closes; clicking the photograph itself does not.
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });

  document.addEventListener("keydown", (event) => {
    if (overlay.hidden) return;
    if (event.key === "Escape") {
      close();
      return;
    }
    if (walkable && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
      event.preventDefault();
      show(current + (event.key === "ArrowLeft" ? -1 : 1));
      return;
    }
    // The focus ring stays inside the overlay. This used to be a one-liner - there was one
    // control, so trapping it was a matter of putting focus back on it - and it is a real
    // cycle now that there are three.
    if (event.key === "Tab") {
      event.preventDefault();
      const controls = walkable ? [closeButton, prevButton, nextButton] : [closeButton];
      const at = controls.indexOf(document.activeElement as HTMLButtonElement);
      const step = event.shiftKey ? -1 : 1;
      controls[(at + step + controls.length) % controls.length].focus();
    }
  });
}
