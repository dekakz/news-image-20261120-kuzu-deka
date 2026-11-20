// news-image-20261120 — entry program (Node 22, standard library only).
// The entry is the PNG beside this file: a broadsheet front page summing up
// Friday 20 November 2026 in one image. This program copies it to the
// output directory the grader provides, with no network and no randomness,
// so both runs write identical bytes.
//
// Local check: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, statSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = new URL("./entry.png", import.meta.url);
const dest = join(outDir, "entry.png");
copyFileSync(src, dest);

// Verify the copy is complete: source and destination must be byte-identical
// in size, so a truncated or partial write can never pass silently.
const srcSize = statSync(src).size;
const destSize = statSync(dest).size;
if (srcSize !== destSize) {
  throw new Error(
    `entry.png copy incomplete: source ${srcSize} bytes, destination ${destSize} bytes`,
  );
}
