import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Scratch output dir for isolated verification builds (see
    // BUILD_VERIFY_DIR in next.config.ts) — never committed, but its
    // generated type files shouldn't be linted as project source.
    ".next-verify/**",
  ]),
]);

export default eslintConfig;
