// The World in One Day — Friday 20 November 2026 (v2)
// Entrypoint: copies the finished broadsheet (entry.png, rendered by
// render2.py) into the output directory the harness expects.
// Usage:  MAKEFUN_OUTPUT_DIR=<dir> node main.ts
//         (defaults to ./out when the variable is unset)

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SOURCE = join(HERE, "entry.png");
const OUT_DIR = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? join(HERE, "out"));
const DEST = join(OUT_DIR, "entry.png");

// PNG files start with this 8-byte signature; refuse anything else.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function sha256(path: string): string {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function main(): void {
  if (!existsSync(SOURCE)) {
    throw new Error(`source image missing: ${SOURCE}`);
  }
  const head = readFileSync(SOURCE).subarray(0, 8);
  if (!head.equals(PNG_MAGIC)) {
    throw new Error(`source is not a PNG: ${SOURCE}`);
  }
  mkdirSync(OUT_DIR, { recursive: true });
  copyFileSync(SOURCE, DEST);
  const srcSize = statSync(SOURCE).size;
  const dstSize = statSync(DEST).size;
  if (srcSize !== dstSize) {
    throw new Error(
      `size mismatch after copy: source ${srcSize} bytes, dest ${dstSize} bytes`,
    );
  }
  console.log(`wrote ${DEST} (${dstSize} bytes)`);
  console.log(`sha256 ${sha256(DEST)}`);
}

main();
