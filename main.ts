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

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
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

// Fail loudly when the meme file itself is missing: a copy of nothing
// must never look like a finished entry.
if (!existsSync(SOURCE)) {
  throw new Error(`meme source missing: ${SOURCE} does not exist`);
}
copyFileSync(SOURCE, OUT_FILE);

// A PNG opens with eight fixed signature bytes. Anything else is not
// a picture, so check the magic before trusting the copy.
const PNG_MAGIC: Buffer = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);

// Read-back guard: the entry is judged byte for byte, so refuse to exit
// cleanly unless the file on disk is exactly the meme, nothing more.
// A truncated or padded copy must fail loudly here, never silently
// reach the judge as a corrupt picture.
const expected: Buffer = readFileSync(SOURCE);
const written: Buffer = readFileSync(OUT_FILE);
if (!written.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error(
    `entry.png is not a PNG: first bytes are ${written.subarray(0, 8).toString("hex")}`,
  );
}
if (sha256(written) !== sha256(expected)) {
  throw new Error(
    `entry.png mismatch: expected sha256 ${sha256(expected)}, ` +
      `found ${sha256(written)}`,
  );
}
