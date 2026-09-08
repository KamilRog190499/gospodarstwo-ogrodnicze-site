import { defineConfig, globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default defineConfig([
  // docs/design holds the design prototypes and their runtime - reference material,
  // not code we maintain.
  globalIgnores(["dist/", ".astro/", "node_modules/", "docs/design/"]),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  {
    rules: {
      // An unused binding prefixed with _ is deliberate (e.g. a skipped argument).
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
]);
