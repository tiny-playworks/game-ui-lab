import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = resolve(import.meta.dirname, "../../..");
const packageDir = resolve(import.meta.dirname, "..");
const distDir = resolve(packageDir, "dist");
const pandaCssPath = resolve(distDir, "panda.css");
const outputPath = resolve(distDir, "styles.css");
const tokenCssPath = resolve(repoRoot, "packages/tokens/dist/index.css");

if (!existsSync(tokenCssPath)) {
  const result = spawnSync("pnpm", ["--filter", "@tiny-playworks/tokens", "build"], {
    cwd: repoRoot,
    shell: process.platform === "win32",
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

mkdirSync(distDir, { recursive: true });

const cssgen = spawnSync(
  "pnpm",
  ["exec", "panda", "cssgen", "./packages/primitives/src/**/*.{ts,tsx}", "--outfile", pandaCssPath],
  {
    cwd: repoRoot,
    shell: process.platform === "win32",
    stdio: "inherit",
  },
);

if (cssgen.status !== 0) {
  process.exit(cssgen.status ?? 1);
}

const tokenCss = readFileSync(tokenCssPath, "utf8");
const pandaCss = readFileSync(pandaCssPath, "utf8");

writeFileSync(outputPath, `${tokenCss}\n${pandaCss}`);
rmSync(pandaCssPath, { force: true });
