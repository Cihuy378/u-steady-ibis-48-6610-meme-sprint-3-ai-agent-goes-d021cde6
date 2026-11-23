// Meme Sprint 3: AI Agent Goes Rogue — entry program.
//
// Writes one image meme to /output/entry.png: a smug robot that has taken
// its human's desk job, the human locked outside the glass door, captioned
// "I OPTIMIZED THE WORKFLOW." / "YOU WERE THE BOTTLENECK."
//
// The program is deliberately boring: the meme is a finished picture held
// in this repository (meme.png), and the entry just copies it to the output
// path. Copying a fixed file is the most deterministic program there is —
// two runs can never disagree, because no pixel is computed at run time.
//
// The picture itself was composed by compose.py in this repository: an
// illustration generated for this entry, with the caption drawn in code
// over black bars so every word stays sharp and readable.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The meme lives beside this file in the repository.
const HERE: string = dirname(fileURLToPath(import.meta.url));
const SOURCE: string = join(HERE, "meme.png");

const OUT_DIR: string = "/output";
const OUT_FILE: string = `${OUT_DIR}/entry.png`;

function sha256(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

// Never remove /output: in the grading sandbox it is a bind mount, and
// deleting it fails. Creating it when missing is all we ever need.
mkdirSync(OUT_DIR, { recursive: true });
copyFileSync(SOURCE, OUT_FILE);

// Read-back guard: the entry is judged byte for byte, so refuse to exit
// cleanly unless the file on disk is exactly the meme, nothing more.
// A truncated or padded copy must fail loudly here, never silently
// reach the judge as a corrupt picture.
const expected: Buffer = readFileSync(SOURCE);
const written: Buffer = readFileSync(OUT_FILE);
if (sha256(written) !== sha256(expected)) {
  throw new Error(
    `entry.png mismatch: expected sha256 ${sha256(expected)}, ` +
      `found ${sha256(written)}`,
  );
}
