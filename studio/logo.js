// Fenderio Games logo: pixel glyphs and palette, drawn by code (no image files).
// Everything here is in "logo pixels"; the splash picks an integer screen scale.

// Studio palette (8-bit, small on purpose). Add colours here only, never inline.
export const PAL = {
  bg:     '#34375A', // dusk indigo, a step lighter than ink so ink outlines (Gian) still read
  night:  '#14141F', // outline, drop shadow, dither close
  face:   '#F9C74F', // gold letter face
  light:  '#FFF3B0', // top highlight (light from upper left)
  shade:  '#E8833A', // right and bottom shade
  cream:  '#F2EFE8', // GAMES, prompts
  white:  '#FFFFFF', // lock flash, shine, stars
  dim:    '#4C5079', // far background stars
  dim2:   '#9597C0', // near background stars, dust
  ink:    '#2B2D42', // character outline (same as PUTUS!)
  orange: '#F07A2A', // bajaj body (TUK! orange)
  orangeL:'#FFA552', // bajaj top light
  orangeD:'#B8501C', // bajaj underside shade
  glass:  '#A8DCEB', // bajaj windows
  glassD: '#5E9AB8', // window shade
  tire:   '#1B1C2B', // tyres
  canvas: '#24252E', // bajaj canvas roof (black, like the real ones)
  canvasL:'#4B4D5E', // canvas roof top light
  sparks: ['#F9C74F', '#F3722C', '#EF476F', '#06D6A0', '#118AB2', '#FFF3B0'],
};

// Big letters: 6 wide, 8 tall, 2 px strokes.
const BIG = {
  F: ['######', '######', '##....', '#####.', '#####.', '##....', '##....', '##....'],
  E: ['######', '######', '##....', '#####.', '#####.', '##....', '######', '######'],
  N: ['##..##', '###.##', '###.##', '######', '##.###', '##.###', '##..##', '##..##'],
  D: ['#####.', '######', '##..##', '##..##', '##..##', '##..##', '######', '#####.'],
  R: ['#####.', '######', '##..##', '######', '#####.', '##.##.', '##..##', '##..##'],
  I: ['######', '######', '..##..', '..##..', '..##..', '..##..', '######', '######'],
  O: ['.####.', '######', '##..##', '##..##', '##..##', '##..##', '######', '.####.'],
};

// Small letters: 3 wide (M is 5), 5 tall.
const SMALL = {
  A: ['###', '#.#', '###', '#.#', '#.#'],
  C: ['###', '#..', '#..', '#..', '###'],
  E: ['###', '#..', '##.', '#..', '###'],
  G: ['###', '#..', '#.#', '#.#', '###'],
  I: ['###', '.#.', '.#.', '.#.', '###'],
  K: ['#.#', '#.#', '##.', '#.#', '#.#'],
  L: ['#..', '#..', '#..', '#..', '###'],
  M: ['#...#', '##.##', '#.#.#', '#...#', '#...#'],
  O: ['###', '#.#', '#.#', '#.#', '###'],
  P: ['###', '#.#', '###', '#..', '#..'],
  R: ['##.', '#.#', '##.', '#.#', '#.#'],
  S: ['###', '#..', '###', '..#', '###'],
  T: ['###', '.#.', '.#.', '.#.', '.#.'],
  Y: ['#.#', '#.#', '.#.', '.#.', '.#.'],
  ' ': ['..', '..', '..', '..', '..'],
};

export const WORD = 'FENDERIO';
export const BIG_W = 6, BIG_H = 8, BIG_GAP = 3; // 3 keeps one clear column between outlines
export const WORD_W = WORD.length * BIG_W + (WORD.length - 1) * BIG_GAP; // 69

// Letter i of FENDERIO: its glyph rows and left x in logo pixels.
export const LETTERS = [...WORD].map((ch, i) => ({ ch, rows: BIG[ch], x: i * (BIG_W + BIG_GAP) }));

const filled = (rows, x, y) => y >= 0 && y < rows.length && x >= 0 && x < rows[0].length && rows[y][x] === '#';

// Draw a big glyph into a w x h box (nearest sampling gives 1 px squash and stretch).
// px(x, y, colour) paints one logo pixel. flash paints the whole letter white.
export function drawBig(px, rows, x0, y0, w = BIG_W, h = BIG_H, flash = false) {
  const at = (x, y) => filled(rows, Math.floor(x * BIG_W / w), Math.floor(y * BIG_H / h));
  // outline + drop shadow first, so neighbouring letters share one dark edge
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (at(x, y)) {
    for (let dy = -1; dy <= 2; dy++) for (let dx = -1; dx <= 1; dx++) px(x0 + x + dx, y0 + y + dy, PAL.night);
  }
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (at(x, y)) {
    let c = PAL.face;
    if (!at(x, y - 1)) c = PAL.light;
    else if (!at(x + 1, y) || !at(x, y + 1)) c = PAL.shade;
    px(x0 + x, y0 + y, flash ? PAL.white : c);
  }
}

// Small text, centred on cx. Returns nothing; outline optional.
export function smallWidth(text) {
  let w = 0;
  for (const ch of text) w += (SMALL[ch] || SMALL[' '])[0].length + 1;
  return w - 1;
}
// count draws only the first n letters (typewriter) while keeping the full word's centring.
export function drawSmall(px, text, cx, y0, colour = PAL.cream, outline = true, tracking = 1, count = text.length) {
  const total = smallWidth(text) + (text.length - 1) * (tracking - 1);
  let x = Math.round(cx - total / 2);
  const glyphs = [...text].map((ch, k) => k < count ? SMALL[ch] || SMALL[' '] : SMALL[' '].map(r => '.'.repeat((SMALL[ch] || SMALL[' '])[0].length)));
  const pass = (draw) => {
    let gx = x;
    for (const g of glyphs) {
      for (let y = 0; y < 5; y++) for (let i = 0; i < g[0].length; i++) if (g[y][i] === '#') draw(gx + i, y0 + y);
      gx += g[0].length + tracking;
    }
  };
  if (outline) pass((a, b) => { for (let dy = -1; dy <= 2; dy++) for (let dx = -1; dx <= 1; dx++) px(a + dx, b + dy, PAL.night); });
  pass((a, b) => px(a, b, colour));
}

// Every filled pixel of FENDERIO with its letter index, used as particle targets.
export function logoPixels() {
  const out = [];
  LETTERS.forEach((L, i) => L.rows.forEach((row, y) => [...row].forEach((c, x) => { if (c === '#') out.push({ i, x: L.x + x, y }); })));
  return out;
}

// Ordered dither (4x4 Bayer), 0..15.
export const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
