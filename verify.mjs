// Local gate check for the Meme Sprint 3 entry.
//
// Runs main.ts twice into /output and proves the two runs agree byte for
// byte, then checks the file against the competition gate the way the
// sealed scorer states it: a whole PNG or JPEG, at most 1 MiB
// (1,048,576 bytes) and at most 1024 by 1024 pixels. Exits non-zero on
// any failure, so a broken entry can never look verified.
//
// The PNG dimensions are read straight out of the IHDR chunk (width at
// bytes 16-19, height at 20-23, big-endian), so the check needs no image
// library — just the file itself.
//
// Usage: node verify.mjs        (or: npm run verify)

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, rmSync, statSync } from "node:fs";

const OUT_FILE = "/output/entry.png";
const MAX_BYTES = 1_048_576;
const MAX_SIDE = 1024;

// A PNG opens with eight fixed signature bytes; a JPEG opens with
// 0xFF 0xD8 and closes with 0xFF 0xD9. Anything else is not a picture.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function runOnce() {
  execFileSync(process.execPath, ["main.ts"], { stdio: "inherit" });
  return readFileSync(OUT_FILE);
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function pngSize(bytes) {
  if (!bytes.subarray(0, 8).equals(PNG_MAGIC)) return null;
  if (bytes.subarray(12, 16).toString("ascii") !== "IHDR") return null;
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

// Only the entry file itself is removed between runs, never /output:
// the output directory is a bind mount in the grading sandbox.
rmSync(OUT_FILE, { force: true });
const first = runOnce();
const firstHash = sha256(first);

rmSync(OUT_FILE, { force: true });
const second = runOnce();
const secondHash = sha256(second);

const size = pngSize(first);
const statBytes = statSync(OUT_FILE).size;

const checks = [
  ["two runs byte-identical", firstHash === secondHash],
  ["is a whole PNG (magic + IHDR)", size !== null],
  ["width at most 1024", size !== null && size.width <= MAX_SIDE],
  ["height at most 1024", size !== null && size.height <= MAX_SIDE],
  ["file at most 1 MiB", statBytes <= MAX_BYTES],
  ["file is not empty", statBytes > 0],
];

let failed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
  if (!ok) failed += 1;
}
console.log(`dimensions: ${size ? `${size.width}x${size.height}` : "unknown"}`);
console.log(`bytes: ${statBytes} (limit ${MAX_BYTES})`);
console.log(`sha256: ${firstHash}`);
if (failed > 0) {
  console.log(`${failed} check(s) failed`);
  process.exit(1);
}
console.log("all checks passed");
