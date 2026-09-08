/** Build stamp. Everything here resolves once, while the site is being built - the pages
 *  are static, so what reaches the browser is plain text and no client JS is involved.
 */

import { execFileSync } from "node:child_process";
import pkg from "../../package.json";

/** Semantic version, bumped by hand in package.json on every push to `main`:
 *  patch for copy and styling fixes, minor for a new section or page.
 */
export const version: string = pkg.version;

/** Short hash of the commit the site was built from. `null` where git is unavailable
 *  (a tarball, some CI images) - the same fallback as `lastmod` in astro.config.mjs. */
export const commit: string | null = (() => {
  try {
    return execFileSync("git", ["rev-parse", "--short", "HEAD"], { encoding: "utf8" }).trim();
  } catch {
    return null;
  }
})();

/** Date of the build, YYYY-MM-DD in UTC - labelled as UTC below, so a build made late in
 *  the evening does not read as yesterday's. */
export const buildDate: string = new Date().toISOString().slice(0, 10);

/** What the footer shows. Deliberately just the number - the footer belongs to the
 *  visitor, not to whoever is checking a deployment. */
export const versionLabel = `v${version}`;

/** The part that answers "which build is actually live?". Hidden in the footer's `title`,
 *  so it stays out of the way but survives into the page source. */
export const buildStamp: string = commit
  ? `commit ${commit} · build ${buildDate} UTC`
  : `build ${buildDate} UTC`;
