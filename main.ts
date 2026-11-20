// news-image-20261120 — entry program (Node 22, standard library only).
// The entry is the PNG beside this file: a broadsheet front page summing up
// Friday 20 November 2026 in one image. This program copies it to the
// output directory the grader provides, with no network and no randomness,
// so both runs write identical bytes.
//
// Local check: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
copyFileSync(new URL("./entry.png", import.meta.url), join(outDir, "entry.png"));
