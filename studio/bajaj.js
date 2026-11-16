// Orange Jakarta bajaj, side view facing right, drawn by code in the studio palette.
// Reference: the classic orange Bajaj RE of Jakarta (photo "Jakarta bajaj.jpg", Wikimedia Commons):
// black canvas roof sloping down at the back with a side curtain, open see-through sides with a door rail,
// the passenger seat and the driver's handlebar inside,
// upright windshield, orange tub with a white beltline, headlamp on the front panel, a flower
// sticker on the side, small front and rear wheels.
// Same rules as the characters: ink outline, light from the upper left, shade right and bottom.
import { PAL } from './logo.js?v=20261117a';

const C = {
  K: PAL.ink, O: PAL.orange, L: PAL.orangeL, D: PAL.orangeD, G: PAL.glass, g: PAL.glassD,
  W: PAL.cream, T: PAL.tire, N: PAL.night, C: PAL.canvas, c: PAL.canvasL, P: PAL.sparks[2], H: PAL.dim2,
};

// body (shudders with the engine); the wheels sit up inside its wheel arches
const BODY = [
  '.....KKKKKKKKKKKKKK...',
  '...KKccccccccccccccK..',
  '..KCCCCCCCCCCCCCCCCCK.',
  '.KCCCCKKKKKKKKKKKKKGK.',
  '.KCCCK......K....KGGK.',
  '.KCCCK......K....KGGK.',
  '.KCCCKDDDD..K....KGgGK',
  '.KCCCKDDDD..K..K.KGggK',
  '.KWWWWWWWWWWWWWWWWWWWK',
  '.KLOOOOOOOPOOOOOOOOOWK',
  '.KOOKKKOOPWPOOOKKKOODK',
  '.KDK...KDDPDDDDK...KK.',
  '..K.....KKKKKKK.......',
];
const WHEELS = [
  '....KKK........KKK....',
  '...KTTTK......KTTTK...',
  '...KTTTK......KTTTK...',
  '...KTTTK......KTTTK...',
  '....KKK........KKK....',
];
const WHEEL_Y = 11; // wheel top row, inside the arches
export const BAJAJ_W = 22, BAJAJ_H = WHEEL_Y + WHEELS.length; // 22 x 16

const paint = (px, rows, x0, y0) => rows.forEach((r, y) => { for (let x = 0; x < r.length; x++) if (r[x] !== '.') px(x0 + x, y0 + y, C[r[x]]); });

// x, feet: left edge and road line in logo pixels. bob lifts the body 1 px (engine shudder);
// spin rolls the wheels (the hub flips between a dot and a diagonal pair).
export function drawBajaj(px, x, feet, bob = 0, spin = 0) {
  const top = feet - BAJAJ_H, wy = top + WHEEL_Y;
  paint(px, WHEELS, x, wy);            // wheels first, the body's arches overlap them
  for (const cx of [5, 17]) {
    if (spin & 1) { px(x + cx - 1, wy + 1, C.H); px(x + cx + 1, wy + 3, C.H); }
    else px(x + cx, wy + 2, C.H);
  }
  paint(px, BODY, x, top - bob);
}
