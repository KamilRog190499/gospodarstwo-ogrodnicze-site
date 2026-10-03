// @ts-check
import { execFileSync } from "node:child_process";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

/**
 * `lastmod` for every entry in the sitemap: the date of the last commit rather than the
 * moment of the build. A build runs on every deploy, and stamping "changed today" on
 * pages nobody touched teaches a crawler to stop believing the field.
 *
 * Falls back to the build time where git is unavailable (a tarball, some CI images).
 */
const lastCommit = (() => {
  try {
    return new Date(
      execFileSync("git", ["log", "-1", "--format=%cI"], { encoding: "utf8" }).trim(),
    );
  } catch {
    return new Date();
  }
})();

export default defineConfig({
  /* The site replaces the WordPress install at the same address. Note that the server
     currently answers on HTTP only - a certificate and an HTTP→HTTPS redirect are needed
     before this goes live, or every canonical here points at a host that does not answer. */
  site: "https://gospodarstwo-saran.pl",
  /* Out of node_modules, where Astro puts it by default, and into a directory of its own.
     Both workflows check out with `clean: false` and skip `npm ci` whenever the lockfile has
     not moved, so the processed images now survive from one run to the next instead of being
     thrown away with node_modules - which is the whole point, because re-encoding 117
     photographs is most of what a build here costs.

     It also gives the "Discard the image cache after an interrupted build" step in both
     workflows something to delete. Astro writes into this directory with a plain writeFile
     and copies back out of it without checking anything, so a build killed mid-write leaves a
     truncated photograph that every later build would carry on to the site. That step was
     pointing at a path that did not exist while the cache lived under node_modules. */
  cacheDir: "./.astro-cache",
  /* astro-icon inlines each icon's SVG into the page at build time, straight from the
     @iconify-json packages in node_modules and from src/icons/. Nothing is fetched at
     runtime and no client JavaScript ships with it, so an icon costs a visitor exactly
     what a hand-written <path> would - which is the only reason this design, which
     otherwise has no icons at all, can afford the ones in the news cards. */
  integrations: [sitemap({ lastmod: lastCommit }), icon()],
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      // A quality ladder per format instead of sharp's defaults (webp 80, avif 50,
      // jpeg 80). The same number means different things to different encoders: avif 40
      // looks about like webp 68 looks about like jpeg 78. Left at the defaults, avif -
      // which is what almost every visitor gets - carries roughly a third more bytes
      // than it needs across a 23-photograph gallery.
      //
      // Careful: these numbers reach neither the build cache nor the emitted filenames.
      // The cache in .astro-cache/assets is keyed by the transform alone, so changing a
      // number here does nothing until that directory is deleted.
      config: {
        avif: { quality: 40 },
        webp: { quality: 68 },
        jpeg: { quality: 78 },
      },
    },
  },
  build: {
    // Trailing-slash URLs, as in WordPress, so the redirect map in
    // docs/przekierowania.md stays accurate.
    format: "directory",
    // The whole page's CSS is small enough that two extra round trips before first paint
    // cost more than repeating it per page.
    inlineStylesheets: "always",
  },
  trailingSlash: "always",
});
