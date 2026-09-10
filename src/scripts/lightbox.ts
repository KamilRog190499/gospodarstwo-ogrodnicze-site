/** The gallery's overlay preview.
 *
 *  Progressive enhancement, all of it. Every slide in Compositions.astro is already a link
 *  to the full-size photograph; this intercepts the click and shows it in place instead.
 *  With scripting off nothing here runs and the links keep working.
 *
 *  The overlay is built here rather than rendered into every page, so a visitor who never
 *  opens the gallery never pays for the markup.
 */

const tiles = [...document.querySelectorAll<HTMLAnchorElement>("a[data-lightbox]")];
if (tiles.length > 0) {
  /** Where focus goes back to when the overlay closes. Returning it is the difference
   *  between closing a dialog and being dropped at the top of the document. */
  let opener: HTMLAnchorElement | null = null;

  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.hidden = true;
  // A dialog rather than a plain div: it tells a screen reader that the rest of the page
  // is not the subject any more, which is what the visual dimming says to everyone else.
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.innerHTML = `
    <button type="button" class="lightbox__close" aria-label="Zamknij podgląd">Zamknij</button>
    <figure class="lightbox__figure">
      <img class="lightbox__image" alt="" />
      <figcaption class="lightbox__caption"></figcaption>
    </figure>`;
  document.body.append(overlay);

  const image = overlay.querySelector<HTMLImageElement>(".lightbox__image")!;
  const caption = overlay.querySelector<HTMLElement>(".lightbox__caption")!;
  const closeButton = overlay.querySelector<HTMLButtonElement>(".lightbox__close")!;

  function open(tile: HTMLAnchorElement): void {
    const description = tile.querySelector("img")?.alt ?? "";
    opener = tile;
    image.src = tile.href;
    image.alt = description;
    caption.textContent = description;
    overlay.hidden = false;
    // The page behind must not scroll under the overlay. `scrollbar-gutter: stable` in
    // global.css is what keeps this from shifting the layout sideways.
    document.body.style.overflow = "hidden";
    // The consent bar is fixed to the bottom of the viewport and would otherwise show
    // through the backdrop and collide with the caption. global.css hides it on this flag.
    document.documentElement.classList.add("lightbox-open");
    closeButton.focus();
  }

  function close(): void {
    overlay.hidden = true;
    document.body.style.overflow = "";
    document.documentElement.classList.remove("lightbox-open");
    // Drop the source so a large photograph is not held in memory for the rest of the visit.
    image.removeAttribute("src");
    opener?.focus();
    opener = null;
  }

  for (const tile of tiles) {
    tile.addEventListener("click", (event) => {
      // Leave the modified clicks alone - a middle click or ctrl-click means "open this
      // somewhere else", and the href is a perfectly good answer to that.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      event.preventDefault();
      open(tile);
    });
  }

  closeButton.addEventListener("click", close);

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
    // The overlay holds exactly one focusable control, so trapping the focus ring is a
    // matter of putting it back rather than of walking a list.
    if (event.key === "Tab") {
      event.preventDefault();
      closeButton.focus();
    }
  });
}
