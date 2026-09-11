/** Closing behaviour for the menu's `<details>` panel.
 *
 *  `<details>` opens, closes, takes focus and reports its state on its own. What it has no
 *  opinion about is when a panel should *stop* being open: pressing Escape, clicking
 *  somewhere else on the page, tabbing past the last item. Browsers leave it open through all
 *  three, which is the one real complaint against using it for a menu.
 *
 *  Every handler here only ever sets `open = false`. That is the whole design: with this file
 *  absent, blocked or thrown, the menu still opens and still closes by its summary - the worst
 *  that happens is a panel that stays open a little longer than it should. Nothing here may
 *  ever be the thing that opens it.
 *
 *  Queries are scoped to each `<details>` rather than to the document, the same discipline
 *  `compositions.ts` needs: today there is one group, and a `document.querySelector` here
 *  would quietly attach the second group's Escape key to the first one's panel.
 */
const groups = document.querySelectorAll<HTMLDetailsElement>("[data-nav-group]");

for (const group of groups) {
  const summary = group.querySelector("summary");

  const close = (restoreFocus = false) => {
    if (!group.open) return;
    group.open = false;
    // Only when the key closed it. Moving focus after a click outside would yank it away
    // from whatever the visitor just clicked on.
    if (restoreFocus) summary?.focus();
  };

  group.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close(true);
  });

  // `focusout` fires before the new element is focused, so `relatedTarget` is where focus is
  // heading. Null means it left the document entirely - a window switch, not a reason to close.
  group.addEventListener("focusout", (event) => {
    const next = event.relatedTarget;
    if (next instanceof Node && !group.contains(next)) close();
  });

  // `pointerdown` rather than `click`: a click on a link elsewhere on the page would otherwise
  // leave the panel visibly open for the length of the navigation.
  document.addEventListener("pointerdown", (event) => {
    const target = event.target;
    if (target instanceof Node && !group.contains(target)) close();
  });
}
