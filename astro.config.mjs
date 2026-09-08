// @ts-check
import { execFileSync } from "node:child_process";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

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
  integrations: [sitemap({ lastmod: lastCommit })],
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
      // The cache in node_modules/.astro/assets is keyed by the transform alone, so
      // changing a number here does nothing until that directory is deleted.
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
