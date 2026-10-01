/**
 * Prepares the hero portrait.
 *
 *   node scripts/portrait.mjs <source-image> [outfile] [keep]
 *
 * `keep` is the fraction of the figure to retain from the head down — 1 for the
 * whole subject, ~0.63 to cut around mid-thigh. Defaults to 1.
 *
 * The source may already carry an alpha channel, or be a cut-out sitting on the
 * panel colour (--panel, #f7b32b), in which case it is keyed here. Then:
 *
 *   1. the subject is located (by alpha, or by what is not the panel colour),
 *   2. the background is flooded to transparency from the border inward, so the
 *      cut-out sits on the slab whatever colour the slab becomes,
 *   3. the JPEG halo a flat key leaves behind is eroded off the edges,
 *   4. the subject is composited onto a transparent canvas of the slab's ratio.
 *
 * Step 4 pads rather than crops. A source already framed tight — the subject
 * filling most of the height, touching an edge — would otherwise lose the top
 * of the head to a centre crop.
 *
 * Output goes to src/assets/, where Astro's image pipeline emits responsive
 * AVIF/WebP. Do not put it in public/ — that ships the original bytes untouched.
 */
import sharp from 'sharp';

const PANEL = [0xf7, 0xb3, 0x2b]; // tracks --panel in src/styles/tokens.css
const RATIO = 5 / 6;              // .panel aspect-ratio in Hero.astro
const FILL = 0.92;                // subject height as a share of the canvas
const ABOVE = 0.45;               // share of the leftover height placed above the head
const OUT_WIDTH = 1240;

const src = process.argv[2];
const out = process.argv[3] ?? 'src/assets/aksh.png';
const KEEP = Number(process.argv[4] ?? 1);
if (!src) {
  console.error('usage: node scripts/portrait.mjs <source-image> [outfile] [keep]');
  process.exit(1);
}

const near = (d, i, tol) =>
  Math.abs(d[i] - PANEL[0]) <= tol &&
  Math.abs(d[i + 1] - PANEL[1]) <= tol &&
  Math.abs(d[i + 2] - PANEL[2]) <= tol;

const hasAlpha = (await sharp(src).metadata()).hasAlpha;
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W0 = info.width, H0 = info.height;
console.log(`source ${W0}x${H0}, alpha=${hasAlpha}`);

// 1 + 2 — alpha for every pixel
const alpha = new Uint8Array(W0 * H0);
for (let p = 0; p < W0 * H0; p++) alpha[p] = hasAlpha ? data[p * 4 + 3] : 255;

if (!hasAlpha) {
  // Flood inward from the border rather than keying globally, so anything
  // inside the subject that sits near the panel colour survives.
  const seen = new Uint8Array(W0 * H0);
  const stack = [];
  for (let x = 0; x < W0; x++) stack.push(x, (H0 - 1) * W0 + x);
  for (let y = 0; y < H0; y++) stack.push(y * W0, y * W0 + W0 - 1);
  while (stack.length) {
    const p = stack.pop();
    if (seen[p]) continue;
    seen[p] = 1;
    if (!near(data, p * 4, 34)) continue;
    alpha[p] = 0;
    const x = p % W0, y = (p - x) / W0;
    if (x > 0) stack.push(p - 1);
    if (x < W0 - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - W0);
    if (y < H0 - 1) stack.push(p + W0);
  }

  // 3 — de-fringe, restricted to pixels already touching transparency
  let removed = 0;
  for (let i = 0; i < 3; i++) {
    const kill = [];
    for (let p = 0; p < W0 * H0; p++) {
      if (!alpha[p]) continue;
      const x = p % W0, y = (p - x) / W0;
      const edge =
        (x > 0 && !alpha[p - 1]) || (x < W0 - 1 && !alpha[p + 1]) ||
        (y > 0 && !alpha[p - W0]) || (y < H0 - 1 && !alpha[p + W0]);
      if (edge && near(data, p * 4, 88)) kill.push(p);
    }
    if (!kill.length) break;
    kill.forEach((p) => { alpha[p] = 0; });
    removed += kill.length;
  }
  console.log(`keyed the panel colour, de-fringed ${removed} edge pixels`);
}

// locate the subject
let minX = W0, minY = H0, maxX = -1, maxY = -1;
for (let p = 0; p < W0 * H0; p++) {
  if (alpha[p] <= 16) continue;
  const x = p % W0, y = (p - x) / W0;
  if (x < minX) minX = x; if (x > maxX) maxX = x;
  if (y < minY) minY = y; if (y > maxY) maxY = y;
}
const full = { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
const S = { ...full, h: Math.round(full.h * KEEP) };
console.log(`subject ${full.w}x${full.h} at ${full.x},${full.y}` +
            (KEEP < 1 ? ` — keeping the top ${Math.round(KEEP * 100)}% (${S.h}px)` : ''));

// 4 — composite onto a transparent canvas of the slab's ratio
const CH = Math.round(S.h / FILL);
const CW = Math.round(CH * RATIO);
const offX = Math.round(CW / 2 - (S.x + S.w / 2));
const offY = Math.round((CH - S.h) * ABOVE - S.y);
console.log(`canvas ${CW}x${CH} (${RATIO.toFixed(3)}), subject offset ${offX},${offY}`);

const canvas = Buffer.alloc(CW * CH * 4); // transparent
for (let y = 0; y < H0; y++) {
  const ty = y + offY;
  if (ty < 0 || ty >= CH) continue;
  for (let x = 0; x < W0; x++) {
    const tx = x + offX;
    if (tx < 0 || tx >= CW) continue;
    const s = (y * W0 + x), t = (ty * CW + tx) * 4;
    if (!alpha[s]) continue;
    canvas[t] = data[s * 4];
    canvas[t + 1] = data[s * 4 + 1];
    canvas[t + 2] = data[s * 4 + 2];
    canvas[t + 3] = alpha[s];
  }
}

await sharp(canvas, { raw: { width: CW, height: CH, channels: 4 } })
  .resize({ width: OUT_WIDTH })
  .png({ compressionLevel: 9 })
  .toFile(out);

const m = await sharp(out).metadata();
console.log(`wrote ${out} ${m.width}x${m.height}`);
