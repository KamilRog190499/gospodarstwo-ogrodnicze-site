/** Consent for the one third-party resource on the site - the Google map.
 *
 *  The decision comes first, always: the iframe ships with `data-src` and no `src`, so
 *  nothing reaches Google until this module fills one in. `loading="lazy"` would only
 *  delay the request; it does not make it optional, and displaying the map hands the
 *  visitor's IP address to Google and lets Google set its own cookies.
 *
 *  The question is only asked where it has a consequence - on a page that actually embeds a
 *  map. Asked everywhere, as it used to be, the bar covered the foot of seven pages that
 *  embed nothing, and taught the visitor to dismiss it before the one page that needs an
 *  answer came up.
 *
 *  The answer is remembered in localStorage - the only thing this site ever writes to a
 *  browser. Storage can throw (private mode, blocked site data); every access is guarded
 *  and a failure degrades in the safe direction, which is asking again.
 */

const KEY = "saran-consent-maps";

type Decision = "granted" | "denied";

function readDecision(): Decision | null {
  try {
    const stored = localStorage.getItem(KEY);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    return null;
  }
}

function storeDecision(decision: Decision): void {
  try {
    localStorage.setItem(KEY, decision);
  } catch {
    // The map still loads for this page view; the banner returns on the next one.
  }
}

/** Fills in every map on the page. Idempotent - `data-shown` marks the ones already done. */
function showMaps(): HTMLIFrameElement | null {
  let first: HTMLIFrameElement | null = null;

  for (const frame of document.querySelectorAll<HTMLElement>("[data-map]")) {
    const iframe = frame.querySelector("iframe");
    if (!(iframe instanceof HTMLIFrameElement) || frame.dataset.shown) continue;
    // An empty `src` would resolve to this very page and the frame would embed the site
    // inside itself.
    if (!iframe.dataset.src) continue;

    // Revealed before the address is set: a browser does not defer a `loading="lazy"`
    // frame that is still `display: none`, and deferring is the point of the attribute.
    frame.dataset.shown = "true";
    iframe.src = iframe.dataset.src;
    first ??= iframe;
  }

  return first;
}

const banner = document.getElementById("consent");
const decision = readDecision();

/** Whether this page has anything to consent to. Read once: the maps are server-rendered,
 *  so nothing adds one later. */
const hasMap = document.querySelector("[data-map]") !== null;

/** The bar is fixed to the bottom of the viewport, so without this it covers the end of
 *  every page - including the footer it points at. Measured rather than guessed: it is one
 *  line tall on a desk and three or four on a phone. */
function reserveRoomForBanner(): void {
  if (!banner || banner.hidden) return;
  document.body.style.paddingBlockEnd = `${banner.offsetHeight}px`;
}

function hideBanner(): void {
  banner?.setAttribute("hidden", "");
  document.body.style.paddingBlockEnd = "";
}

if (decision === "granted") {
  // Unconditional: a no-op on a page without maps, and the whole point on one with them.
  showMaps();
} else if (decision === null && banner && hasMap) {
  banner.removeAttribute("hidden");
  // Watching the bar itself rather than the window: it is not only a narrower viewport
  // that makes it taller - a web font swapping in after first paint does too.
  new ResizeObserver(reserveRoomForBanner).observe(banner);
}

/** `moveFocus` only where the map takes the place of the button that was just pressed -
 *  the button inside the map's own placeholder. From the bar at the bottom of the screen
 *  the map can be a whole section away, and focusing it would scroll the page out from
 *  under someone who was reading something else. */
function accept(moveFocus: boolean): void {
  storeDecision("granted");
  hideBanner();
  const map = showMaps();
  if (moveFocus) map?.focus();
}

banner?.querySelector("[data-consent='accept']")?.addEventListener("click", () => accept(false));

banner?.querySelector("[data-consent='reject']")?.addEventListener("click", () => {
  storeDecision("denied");
  hideBanner();
});

// The button inside the map's own placeholder: consent given at the point of use, and the
// way back for anyone who pressed "Odrzucam" earlier.
for (const button of document.querySelectorAll("[data-map] button")) {
  button.addEventListener("click", () => accept(true));
}

// Withdrawing has to be as easy as consenting. A map already in the page cannot be
// unloaded - Google has the request by then - so the honest way back is a fresh page.
document.querySelector("[data-consent-reset]")?.addEventListener("click", () => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Nothing was stored in the first place.
  }
  location.reload();
});
