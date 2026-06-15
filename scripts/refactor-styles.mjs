import fs from "fs";
import path from "path";

const SRC_DIR = new URL("../packages/primitives/src", import.meta.url).pathname;
const STYLES_FILE = path.join(SRC_DIR, "styles.ts");

const stylesContent = fs.readFileSync(STYLES_FILE, "utf-8");
let remainingStylesContent = stylesContent;

// Get all component directories
const entries = fs.readdirSync(SRC_DIR, { withFileTypes: true });
const componentDirs = entries
  .filter((e) => e.isDirectory() && e.name !== "__tests__" && e.name !== "runtime")
  .map((e) => e.name);

// Find all usages
const componentStyles = new Map();

for (const dir of componentDirs) {
  const compDir = path.join(SRC_DIR, dir);
  const files = fs.readdirSync(compDir).filter((f) => f.endsWith(".tsx"));
  for (const file of files) {
    const filePath = path.join(compDir, file);
    const content = fs.readFileSync(filePath, "utf-8");

    // Match: import { a, b } from "../styles";
    const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]\.\.\/styles['"]/;
    const match = importRegex.exec(content);

    if (match) {
      const vars = match[1]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const styleVars = vars.filter((v) => v !== "mergeClass" && v !== "providerRootClass");

      if (styleVars.length > 0) {
        if (!componentStyles.has(dir)) {
          componentStyles.set(dir, new Set());
        }
        for (const v of styleVars) {
          componentStyles.get(dir).add(v);
        }
      }

      // Update the component's imports
      let newContent = content;
      if (styleVars.length > 0) {
        newContent = newContent.replace(importRegex, (fullMatch, inside) => {
          const hasMergeClass = inside.includes("mergeClass");
          const newStylesImport = `import { ${styleVars.join(", ")} } from "./styles";`;
          if (hasMergeClass) {
            return `import { mergeClass } from "../styles";\n${newStylesImport}`;
          }
          return newStylesImport;
        });
        fs.writeFileSync(filePath, newContent, "utf-8");
      }
    }
  }
}

// Extract styles
for (const [dir, vars] of componentStyles.entries()) {
  let localStyles = `// @ts-nocheck\nimport { css, cva } from "@tiny-playworks/styled-system/css";\nimport {\n  panelSurface,\n  panelSurfaceStrong,\n  line,\n  text,\n  muted,\n  accent,\n  heal,\n  danger,\n  critical,\n  loot,\n  shield,\n  mana,\n  energy,\n  stamina,\n  debuff,\n  radiusSm,\n  radiusMd,\n  radiusLg,\n  space1,\n  space2,\n  space3,\n  space4,\n  space5,\n  shadowSoft,\n  shadowGlow,\n  upperLabel\n} from "../tokens";\n\n`;

  if (dir === "runtime") {
    localStyles = localStyles.replace("../tokens", "../../tokens");
  }

  for (const v of vars) {
    // Extract the block: export const v = css({ ... }) or cva({ ... }) or just = whatever;
    const declaration = `export const ${v} = `;
    const startIndex = remainingStylesContent.indexOf(declaration);
    if (startIndex !== -1) {
      let braceCount = 0;
      let inString = false;
      let escape = false;
      let endIndex = startIndex;

      for (let i = startIndex; i < remainingStylesContent.length; i++) {
        const char = remainingStylesContent[i];

        if (escape) {
          escape = false;
          continue;
        }
        if (char === "\\") {
          escape = true;
          continue;
        }

        if (char === '"' || char === "'" || char === "`") {
          if (!inString) inString = char;
          else if (inString === char) inString = false;
        }

        if (!inString) {
          if (char === "{" || char === "(") {
            braceCount++;
          }
          if (char === "}" || char === ")") {
            braceCount--;
          }
        }

        // If it's a simple assignment like `export const A = B;`
        // It will never start braces. So if we hit a semicolon and braceCount is 0, we can break.
        if (char === ";" && braceCount === 0) {
          endIndex = i + 1;
          break;
        }

        // Semicolon might be missing, check newline + export
        if (braceCount === 0 && remainingStylesContent.substr(i, 7) === "\nexport") {
          endIndex = i;
          break;
        }
      }

      if (endIndex > startIndex) {
        const block = remainingStylesContent.slice(startIndex, endIndex);
        localStyles += block + "\n\n";
        remainingStylesContent = remainingStylesContent.replace(block, "");
      } else {
        console.warn(`Could not extract ${v}`);
      }
    } else {
      console.warn(`Could not find ${v} in styles.ts`);
    }
  }

  const destPath = path.join(SRC_DIR, dir, "styles.ts");
  // Overwrite local styles since we started fresh
  fs.writeFileSync(destPath, localStyles, "utf-8");
  console.log(`Created ${dir}/styles.ts with ${vars.size} variables.`);
}

remainingStylesContent = remainingStylesContent.replace(/\n\s*\n/g, "\n\n");
fs.writeFileSync(STYLES_FILE, remainingStylesContent, "utf-8");

console.log("Migration completed.");
