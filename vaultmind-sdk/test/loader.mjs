/**
 * Registers an ESM resolver hook so the CHP unit tests can run the SDK's
 * bundler-style extensionless TypeScript sources (e.g. `from "./walrus"`)
 * directly with Node's built-in type-stripping — no external test runner
 * or bundler required. Used via:
 *   node --import ./test/loader.mjs --test test/*.test.ts
 *
 * The hook appends `.ts` (or `/index.ts`) to bare relative specifiers that
 * lack an extension, which Node's ESM resolver cannot resolve on its own.
 */
import { registerHooks } from "node:module";
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve as pathResolve } from "node:path";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith(".") && !/\.[cm]?[jt]sx?$/.test(specifier)) {
      const parentPath = context.parentURL
        ? dirname(fileURLToPath(context.parentURL))
        : process.cwd();
      const base = pathResolve(parentPath, specifier);
      for (const candidate of [`${base}.ts`, `${base}/index.ts`]) {
        if (existsSync(candidate)) {
          return { url: pathToFileURL(candidate).href, shortCircuit: true };
        }
      }
    }
    return nextResolve(specifier, context);
  },
});
