// Fenderio Games studio splash for LittleJS games.
// Each launch picks one variant at random (a cameo from one of the studio's games),
// except a game's very first launch, which plays its own cameo: createSplash({ home: 'gian' }).
//   gian  - Gian (PUTUS!) sprints in and headbutts the F
//   bajaj - an orange bajaj (NUSAPURA DRIVE) zooms past and its wind lifts the letters
// hold: true never closes: it stays on the finished logo, still animating (stars, shine, Gian), as on fenderio.com.
// Drop-in: createSplash(), then each frame splash.update(dt) and splash.render(ctx, w, h)
// with a Canvas 2D context, and splash.tap() on any click, touch or key.
// Browsers only allow sound after the first input, so it waits on "TAP TO START"
// unless audio is already running.
import { Sound, audioIsRunning } from './littlejs-shim.js'; // site copy: silent stand-in for LittleJS (the page's CSP allows no import map)
import { PAL, LETTERS, WORD_W, BIG_W, BIG_H, drawBig, drawSmall, logoPixels, BAYER } from './logo.js';
import { GIAN_SHEET, GIAN_W, GIAN_H, GF, GIAN_RUN } from './gian-sheet.js';
import { drawBajaj, BAJAJ_W } from './bajaj.js';

export const VARIANTS = ['gian', 'bajaj'];

// Timeline in seconds after the start tap. Tune here.
export const T = {
  blinks: [0, .15], blinkOn: .08,
  burst: .3, burstSpeed: [25, 70], drag: 4, shock: .3,
  home: .6,                          // particles turn back toward their letter
  lock0: .78, lockStep: .06,         // letter i locks at lock0 + i * lockStep
  flash: .06, pop: .16,              // white flash and ring when a letter locks
  run0: 1.04, push: 1.36,              // Gian runs in from the left and headbutts the F at full speed
  hitstop: .07,                        // real seconds the world freezes on impact
  recoil: 1.42, recoilLand: 1.58,      // bounces off, lands
  dizzy: [1.58, 1.98],                 // stars circle his head
  domino: .04,                         // letters hop one after another, left to right
  bajajMid: 1.55, bajajCruise: 45, bajajZoom: 200, // centred on the word at bajajMid; zooms in, cruises past slowly, zooms off
  honk: [1.47, 1.6],
  crouch: .05, air: .2, land: .07, hop: 3,
  type0: 1.92, typeStep: .05,          // GAMES types in
  motif: [2.05, 2.14, 2.23],           // the studio's three notes: G, C, E
  shine: 2.23, shineLen: .35, shineEvery: .8,
  cheer: [2.05, 2.45], wave: 2.5, blinkG: 2.8,
  starFrom: 2.25, starEvery: .22, starLife: .3,
  outro: 3.05, outroLen: .35, skipLen: .2,
};
// Arpeggio for F-E-N-D-E-R-I-O, semitones above C4.
const NOTES = [0, 4, 7, 12, 16, 19, 24, 28];
const MOTIF = [0, 5, 9];         // G5, C6, E6 as semitones above G5
const CHORD = [0, 4, 7, 12];     // C5 E5 G5 C6
const semi = n => 2 ** (n / 12);

let SFX; // built on first use, after the engine is up
// play(zzfxArray, volume, rate), when given, sends every sound to the host game's own audio instead of LittleJS's
// (PUTUS keeps LittleJS sound off and mixes everything through its own WebAudio master).
function sounds(play) {
  const mk = (a, r) => play ? { play: (pos, vol = 1, rate = 1) => play(a, vol, rate) } : new Sound(a, r);
  return SFX ||= {
    blip:  mk([.15, 0, 1320, 0, .02, .03, 5, .5], 0),
    burst: mk([.35, 0, 330, 0, .05, .3, 4, 1, -3, 0, 0, 0, 0, 0, 0, .06], 0),
    note:  mk([.2, 0, 261.63, .005, .05, .14, 5, .25], 0),
    bass:  mk([.35, 0, 130.81, .005, .12, .3, 1, 1], 0),
    step:  mk([.07, 0, 260, 0, .005, .025, 4, 1], 0),
    bonk:  mk([.35, 0, 240, 0, .02, .12, 5, .5, -4], 0),
    crunch: mk([.3, 0, 150, 0, .02, .14, 4, 1, -1, 0, 0, 0, 0, 0, 0, .1], 0),
    pew:   mk([.12, 0, 1300, 0, .01, .09, 5, .5, -9], 0),
    tweet: mk([.06, 0, 2200, 0, .03, .05, 5, .5, 0, 0, 0, 0, 0, 0, 30], 0),
    hop:   mk([.06, 0, 160, 0, .02, .04, 5, .5, 3], 0),
    land:  mk([.16, 0, 110, 0, .02, .06, 5, .5, -2], 0),
    tick:  mk([.05, 0, 2400, 0, .003, .012, 4, 1], 0),
    lead:  mk([.22, 0, 783.99, .005, .07, .32, 5, .5, 0, 0, 0, 0, 0, 0, 0, 0, .11], 0),
    pad:   mk([.08, 0, 523.25, .01, .25, .7, 5, .25, 0, 0, 0, 0, 0, 0, 0, 0, .16], 0),
    ting:  mk([.12, 0, 2093, .005, .08, .5, 5, .125, 0, 0, 0, 0, 0, 0, 0, 0, .13], 0),
    star:  mk([.04, 0, 2637, 0, .01, .04, 5, .5], 0),
    putt:  mk([.1, 0, 70, 0, .01, .03, 5, .3, 0, 0, 0, 0, 0, .4], 0),
    honk:  mk([.16, 0, 494, .005, .07, .04, 5, .5, 0, 0, 0, 0, 0, 0, 0, 0, .04], 0),
    whoosh: mk([.14, 0, 900, .05, .1, .25, 4, 1, -4], 0),
    close: mk([.12, 0, 700, 0, .05, .25, 5, .5, -5], 0),
  };
}

let gianImg;
function gian() {
  if (!gianImg && typeof Image != 'undefined') { gianImg = new Image(); gianImg.src = GIAN_SHEET; }
  return gianImg;
}

const rand = (a, b) => a + Math.random() * (b - a);
const pick = a => a[Math.random() * a.length | 0];

// True only the first time a game (named by its home variant) shows the splash. The key holds the
// variant because itch serves every HTML game from one origin. Blocked storage counts as seen.
function firstLaunch(home) {
  try {
    const key = 'fenderio_splash_seen_' + home;
    if (localStorage.getItem(key)) return false;
    localStorage.setItem(key, '1');
    return true;
  } catch { return false; }
}
const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
const lockAt = i => T.lock0 + i * T.lockStep;
const CX = (WORD_W - 1) / 2, CY = BIG_H / 2 - 1; // word centre in logo pixels
const GX = -GIAN_W - 3, FEET = 18;              // Gian stands left of the word; feet (and the road) level with the bottom of GAMES
// bajaj: rear edge x at time t. Offset from the word centre is cruise*u + zoom*u^3 (u = t - bajajMid),
// so it rushes in, slows right down while it crosses the word (easy to see), then rushes off.
const bajajOff = u => T.bajajCruise * u + T.bajajZoom * u * u * u;
const bajajX = t => CX - BAJAJ_W / 2 + bajajOff(t - T.bajajMid);
const bajajWhen = d => { let a = -3, b = 3; for (let k = 0; k < 40; k++) { const m = (a + b) / 2; bajajOff(m) < d ? a = m : b = m; } return T.bajajMid + a; }; // inverse
// Final lockup per variant (x0, w, y0, h in logo pixels): Gian's includes him, the bajaj has driven off.
const LOCKS = { gian: [GX, WORD_W - GX, FEET - GIAN_H, 21], bajaj: [-1, WORD_W + 2, -1, 20] };
const lockOf = v => { const [x0, w, y0, h] = LOCKS[v] || LOCKS.gian; return { x0, w, y0, h, cx: x0 + w / 2, cy: y0 + h / 2 }; };
// letter i starts its hop: knocked by Gian in a domino, or lifted by the bajaj's wind once its rear passes the letter
const hopAt = (i, v) => v === 'bajaj' ? bajajWhen(LETTERS[i].x + BIG_W + 1 - (CX - BAJAJ_W / 2)) : T.push + i * T.domino;

// Integer scale and the screen position of logo pixel (0, 0) for a w x h canvas.
export function layout(w, h, variant = 'gian') {
  const L = lockOf(variant);
  const s = Math.max(1, Math.floor(Math.min(w * (h > w ? .85 : .6) / L.w, h * .4 / Math.max(L.h, 21)))); // wider on portrait phones
  return { s, ox: Math.floor(w / 2 - L.cx * s), oy: Math.floor(h / 2 - L.cy * s) };
}

// Background stars, placed once, in fractions of the screen.
const SKY = Array.from({ length: 70 }, () => ({ fx: Math.random(), fy: Math.random(), ph: rand(0, 6.3), sp: rand(1, 3), near: Math.random() < .3 }));

export function createSplash({ onDone, reducedMotion, autoStart = true, variant, variants = VARIANTS, home, play, hold = false } = {}) {
  variant = VARIANTS.includes(variant) ? variant : VARIANTS.includes(home) && firstLaunch(home) ? home : pick(variants);
  const G = variant === 'gian', B = variant === 'bajaj', LK = lockOf(variant);
  const reduced = reducedMotion ?? (typeof matchMedia != 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const touch = typeof navigator != 'undefined' && navigator.maxTouchPoints > 0 && matchMedia('(pointer: coarse)').matches;
  const targets = logoPixels();
  const sfx = sounds(play);
  gian();
  let state = 'wait', t = 0, clock = 0, outroAt = T.outro, outroLen = T.outroLen;
  let parts = [], bits = [], rings = [], stars = [], shake = 0, kick = 0, nextStar = 0;

  function start() { state = 'play'; t = 0; parts = []; bits = []; rings = []; stars = []; outroAt = hold ? Infinity : T.outro; outroLen = T.outroLen; nextStar = T.starFrom; }
  if (autoStart && audioIsRunning()) start();

  function tap() {
    if (state === 'wait') start();
    else if (state === 'play' && t > .2 && t < outroAt && !hold) { outroAt = t; outroLen = T.skipLen; } // skip: close now
  }

  // hop phase of letter i: box offsets for squash and stretch
  function letterBox(i) {
    const L = LETTERS[i], box = { x: L.x, y: 0, w: BIG_W, h: BIG_H };
    if (reduced) return box;
    const s0 = hopAt(i, variant), a = s0 + T.crouch, b = a + T.air, c = b + T.land;
    if (G && i === 0 && t >= s0 && t < a) {                // the F takes the hit: shoved right and squashed hard
      box.x += 1; box.w += 1; box.h -= 2; box.y += 2;
    } else if (t >= s0 && t < a || t >= b && t < c) { // crouch / land squash: 1 px wider each side, 1 px shorter
      box.x -= 1; box.w += 2; box.h -= 1; box.y += 1;
    } else if (t >= a && t < b) {
      const u = (t - a) / T.air;
      box.y = -Math.round(T.hop * 4 * u * (1 - u));
      if (u < .35) { box.h += 1; box.y -= 1; }        // stretch on the way up
    }
    return box;
  }

  // Gian's pose at time t: frame, x, feet lift y, and squash/stretch in pixels (dw wider, dh taller).
  // left is the screen edge in logo pixels.
  function gianPose(left) {
    const P = (f, x, y = 0, dw = 0, dh = 0) => ({ f, x, y, dw, dh });
    const wave = t >= T.wave;
    const rest = () => t >= T.blinkG && t < T.blinkG + .1 ? GF.blink : wave ? (((t - T.wave) / .14 | 0) % 2 ? GF.idle : GF.wave) : GF.idle;
    if (reduced) return t < T.type0 ? null : P(rest(), GX);
    if (t < T.run0) return null;
    if (t < T.push) { // sprint in, leaning forward, straight into the F
      const u = (t - T.run0) / (T.push - T.run0), x0 = left - GIAN_W;
      return P(GIAN_RUN[((t - T.run0) / .06 | 0) % 6], x0 + (GX + 2 - x0) * u, 0, u > .8 ? 2 : 1, u > .8 ? -1 : 0);
    }
    if (t < T.recoil) return P(GF.brace, GX + 3, 0, -2, 1);                                                                    // flattened on the F
    if (t < T.recoilLand) { // bounce off backwards in a little arc
      const u = (t - T.recoil) / (T.recoilLand - T.recoil);
      return P(GF.air, GX + 3 - 4 * u, -Math.round(4 * 4 * u * (1 - u)), 0, u < .3 ? 1 : 0);
    }
    if (t < T.recoilLand + .06) return P(GF.land, GX - 1, 0, 1, -1);
    if (t < T.dizzy[1]) return P((t * 6 | 0) % 2 ? GF.ouch : GF.idle, GX - (t * 6 | 0) % 2); // woozy sway
    if (t < T.cheer[1]) { // the sheet's jump frame clips his ears, so the hop is cheer up, land down
      const up = ((t - T.cheer[0]) / .1 | 0) % 2 === 0;
      return P(up ? GF.cheer : GF.land, GX, up ? -2 : 0, up ? 0 : 1, up ? 1 : -1);
    }
    return P(rest(), GX);
  }

  function dust(x, y, n, spread = 1) {
    for (let k = 0; k < n; k++) {
      const dir = k % 2 ? 1 : -1;
      bits.push({ x, y, vx: dir * rand(10, 28) * spread, vy: rand(-12, -2), g: 20, life: rand(.18, .3), c: k % 3 ? PAL.dim2 : PAL.cream });
    }
  }

  let stop = 0, ox0 = 60, sw0 = 200; // screen left edge and width in logo pixels, refreshed by render
  function update(dt) {
    clock += dt;
    if (state !== 'play') return;
    shake = Math.max(0, shake - dt);
    if (stop > 0) { stop -= dt; dt *= .06; } // hitstop: the world nearly freezes
    const t0 = t; t += dt;
    const cross = at => t0 <= at && t > at;

    if (!reduced) {
      T.blinks.forEach(b => cross(b) && sfx.blip.play());
      if (cross(T.burst)) {
        sfx.burst.play(); shake = .15;
        rings.push({ x: CX, y: CY, born: t, life: T.shock, r0: 1, r1: 42, n: 48, c: PAL.white });
        parts = targets.map(p => {
          const a = rand(0, Math.PI * 2), v = rand(...T.burstSpeed);
          return { i: p.i, tx: p.x, ty: p.y, x: CX, y: CY, lx: CX, ly: CY, vx: Math.cos(a) * v, vy: Math.sin(a) * v * .7,
            c: pick(PAL.sparks), arc: rand(-8, 8) };
        });
      }
      if (cross(T.home)) parts.forEach(p => { p.sx = p.x; p.sy = p.y; });
      for (const p of parts) {
        p.lx = p.x; p.ly = p.y; // last position, drawn as a short trail
        if (t < T.home) { const k = Math.exp(-T.drag * dt); p.vx *= k; p.vy *= k; p.x += p.vx * dt; p.y += p.vy * dt; }
        else {
          const u = clamp01((t - T.home) / (lockAt(p.i) - T.home)), e = u * u; // accelerate into the slot
          const dx = p.tx - p.sx, dy = p.ty - p.sy, len = Math.hypot(dx, dy) || 1, bend = Math.sin(Math.PI * u) * p.arc;
          p.x = p.sx + dx * e - dy / len * bend; p.y = p.sy + dy * e + dx / len * bend;
        }
      }
      if (G) for (let st = T.run0; st < T.push; st += .12) if (cross(st)) { // footsteps with a puff behind each
        sfx.step.play(undefined, 1, rand(.9, 1.1));
        const u = (st - T.run0) / (T.push - T.run0), x0 = -ox0 - GIAN_W;
        bits.push({ x: x0 + (GX + 2 - x0) * u + 2, y: FEET - 1, vx: rand(-25, -10), vy: rand(-10, -3), g: 30, life: .25, c: PAL.dim2 });
      }
      if (G && cross(T.push)) { // BONK
        sfx.bonk.play(); sfx.crunch.play(); sfx.pew.play();
        stop = T.hitstop; shake = .25; kick = 2;
        rings.push({ x: -2, y: 4, born: t, life: .22, r0: 1, r1: 11, n: 20, c: PAL.white });
        for (let k = 0; k < 10; k++) {
          const a = rand(-1.4, 1.4) + (k % 2 ? Math.PI : 0), v = rand(25, 60);
          bits.push({ x: -2, y: rand(1, 7), vx: Math.cos(a) * v, vy: Math.sin(a) * v - 15, g: 90, life: rand(.25, .4), c: pick(PAL.sparks) });
        }
      }
      if (G && cross(T.recoilLand)) { sfx.land.play(); dust(GX + 2, FEET, 4); dust(GX + 9, FEET, 4); }
      if (G) [T.dizzy[0] + .05, T.dizzy[0] + .17].forEach(at => cross(at) && sfx.tweet.play(undefined, 1, at > T.dizzy[0] + .1 ? 1.2 : 1));
      if (B) { // engine putt-putt with a little doppler, exhaust puffs, two honks, a whoosh as it passes
        const x = bajajX(t), on = x > -ox0 - BAJAJ_W - 4 && x < -ox0 + sw0 + 4;
        if (on && (t * 22 | 0) !== (t0 * 22 | 0)) {
          const near = clamp01(1 - Math.abs(x + BAJAJ_W / 2 - CX) / 90);
          sfx.putt.play(undefined, .35 + near * .65, x + BAJAJ_W / 2 < CX ? 1.12 : .88);
        }
        if (on && (t * 18 | 0) !== (t0 * 18 | 0))
          bits.push({ x: x - 1, y: FEET - 3 - rand(0, 1), vx: rand(-14, -4), vy: rand(-9, -3), g: -4, life: rand(.3, .5), c: Math.random() < .6 ? PAL.dim2 : PAL.cream, puff: 1 });
        T.honk.forEach((hk, k) => cross(hk) && sfx.honk.play(undefined, 1, k ? 1.26 : 1));
        if (cross(T.bajajMid + .45)) sfx.whoosh.play(); // revs and zooms off
      }
    }

    LETTERS.forEach((L, i) => {
      if (cross(lockAt(i))) {
        sfx.note.play(undefined, 1, semi(NOTES[i]));
        if (i === 0) sfx.bass.play();
        if (i === 4) sfx.bass.play(undefined, 1, semi(-5));
        if (!reduced) {
          rings.push({ x: L.x + 2.5, y: 3.5, born: t, life: T.pop, r0: 3, r1: 8, n: 12, c: PAL.light });
          for (let k = 0; k < 4; k++)
            bits.push({ x: L.x + rand(0, BIG_W), y: -1, vx: rand(-15, 15), vy: rand(-45, -20), g: 120, life: .3, c: PAL.sparks[k % PAL.sparks.length] });
        }
      }
      if (!reduced) {
        const s0 = hopAt(i, variant), landAt = s0 + T.crouch + T.air;
        if (cross(s0 + T.crouch)) sfx.hop.play(undefined, B ? .6 : 1, semi(i)); // the wave climbs in pitch
        if (cross(landAt)) {
          const last = i === LETTERS.length - 1;
          sfx.land.play(undefined, last ? 1 : .4);
          if (last) shake = .12;
          dust(L.x - 1, BIG_H, 2); dust(L.x + BIG_W, BIG_H, 2);
        }
      }
    });

    for (let k = 0; k < 5; k++) if (cross(T.type0 + k * T.typeStep)) sfx.tick.play(undefined, 1, semi(k * 2));
    T.motif.forEach((m, k) => cross(m) && sfx.lead.play(undefined, 1, semi(MOTIF[k])));
    if (cross(T.motif[2])) { CHORD.forEach(n => sfx.pad.play(undefined, 1, semi(n))); sfx.bass.play(undefined, 1, .5); }
    if (cross(T.shine + .05)) sfx.ting.play();

    for (const b of bits) { b.vy += b.g * dt; b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt; }
    bits = bits.filter(b => b.life > 0);
    rings = rings.filter(r => t - r.born < r.life);

    if (t >= nextStar && t < outroAt) {
      nextStar = t + T.starEvery;
      const a = rand(0, Math.PI * 2);
      stars.push({ x: Math.round(LK.cx + Math.cos(a) * (LK.w / 2 + rand(5, 11))), y: Math.round(LK.cy + Math.sin(a) * rand(14, 18)), born: t });
      sfx.star.play(undefined, 1, rand(.9, 1.2));
    }
    stars = stars.filter(s => t - s.born < T.starLife);

    kick = Math.max(0, kick - dt * 30);
    if (cross(outroAt)) sfx.close.play();
    if (t >= outroAt + outroLen) { state = 'done'; onDone?.(); }
  }

  function render(ctx, w, h) {
    const { s, ox: bx, oy: by } = layout(w, h, variant);
    const jig = () => shake > 0 && !reduced ? Math.round(rand(-1, 1)) * s : 0;
    const ox = bx + jig() + Math.round(kick) * s, oy = by + jig();
    const px = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(ox + Math.round(x) * s, oy + Math.round(y) * s, s, s); };
    const cols = Math.ceil(w / s) + 1, rows = Math.ceil(h / s) + 1, gx0 = bx % s - s, gy0 = by % s - s;
    const cell = (cx, cy, c) => { ctx.fillStyle = c; ctx.fillRect(gx0 + cx * s, gy0 + cy * s, s, s); };

    ctx.fillStyle = PAL.bg; ctx.fillRect(0, 0, w, h);
    if (state === 'done') { ctx.fillStyle = PAL.night; ctx.fillRect(0, 0, w, h); return; }

    // sky: far stars drift slowly and twinkle; near ones are brighter and drift faster
    for (const st of SKY) {
      const drift = reduced ? 0 : clock * (st.near ? .008 : .003);
      const cx = Math.floor(((st.fx - drift) % 1 + 1) % 1 * cols), cy = Math.floor(st.fy * rows);
      const tw = Math.sin(clock * st.sp + st.ph);
      if (tw > -.2) cell(cx, cy, st.near && tw > .7 ? PAL.dim2 : PAL.dim);
    }
    // dithered vignette toward the edges
    ctx.fillStyle = PAL.night;
    for (let cy = 0; cy < rows; cy++) for (let cx = 0; cx < cols; cx++) {
      const d = Math.hypot((cx + .5) / cols * 2 - 1, (cy + .5) / rows * 2 - 1); // round, heaviest in the corners
      if (d > .9 && BAYER[(cy & 3) * 4 + (cx & 3)] < (d - .9) / .5 * 9) ctx.fillRect(gx0 + cx * s, gy0 + cy * s, s, s);
    }

    if (state === 'wait') {
      if (clock % 1 < .5) px(Math.round(LK.cx), CY, PAL.white);
      if (clock % 1.2 < .9) drawSmall(px, touch ? 'TAP TO START' : 'CLICK TO START', LK.cx, 14, PAL.cream, true);
      return;
    }

    if (!reduced && t < T.burst && T.blinks.some(b => t >= b && t < b + T.blinkOn)) px(CX, CY, PAL.white);

    LETTERS.forEach((L, i) => {
      const at = lockAt(i);
      if (t < at) return;
      const b = letterBox(i);
      const hit = G && !reduced && i === 0 && t >= T.push && t < T.push + .05;
      drawBig(px, L.rows, b.x, b.y, b.w, b.h, hit || !reduced && t - at < T.flash);
    });

    ox0 = ox / s; sw0 = w / s;
    // Gian beside the word, drawn from his sheet at the logo's pixel scale
    const pose = G ? gianPose(-ox / s) : null;
    const img = gianImg;
    if (pose && img && img.complete && img.naturalWidth) {
      const gw = GIAN_W + pose.dw, gh = GIAN_H + pose.dh; // squash and stretch, feet stay planted
      ctx.drawImage(img, pose.f * GIAN_W, 0, GIAN_W, GIAN_H,
        ox + Math.round(pose.x - pose.dw / 2) * s, oy + (FEET - gh + pose.y) * s, gw * s, gh * s);
      if (!reduced && t >= T.dizzy[0] && t < T.dizzy[1]) { // three stars circling his head
        for (let k = 0; k < 3; k++) {
          const a = t * 11 + k * 2.09, sx = pose.x + 6 + Math.cos(a) * 6, sy = FEET - GIAN_H - 2 + Math.sin(a) * 1.5;
          px(sx, sy, k ? PAL.light : PAL.face);
          if ((t * 10 + k) % 2 < 1) { px(sx - 1, sy, PAL.light); px(sx + 1, sy, PAL.light); }
        }
      }
    }
    if (G && !reduced && t >= T.push && t < T.push + .06) { // impact star at the point of contact
      for (let k = -3; k <= 3; k++) { px(-2 + k, 4, PAL.white); px(-2, 4 + k, PAL.white); }
      for (let k = -2; k <= 2; k++) { px(-2 + k, 4 + k, PAL.light); px(-2 + k, 4 - k, PAL.light); }
    }

    if (t >= T.type0) {
      const n = Math.min(5, Math.floor((t - T.type0) / T.typeStep) + 1);
      drawSmall(px, 'GAMES', CX, 12, PAL.cream, true, 3, reduced ? 5 : n);
    }
    if (t >= T.shine) { // gloss sweeps across the word, then again every so often
      const u = ((t - T.shine) % T.shineEvery) / T.shineLen;
      if (u < 1) {
        const band = -10 + u * (WORD_W + 20);
        for (const p of targets) { const d = p.x + p.y - band; if (d >= 0 && d < 3) px(p.x, p.y, PAL.white); }
      }
    }

    if (B && !reduced) { // the bajaj passes in front of the word, with speed lines behind it
      const x = bajajX(t);
      if (x > -ox0 - BAJAJ_W - 4 && x < -ox0 + sw0 + 4) {
        for (const [ly, len] of [[FEET - 12, 6], [FEET - 8, 9], [FEET - 4, 5]])
          for (let k = 0; k < len; k++) px(Math.round(x) - 3 - k - (t * 40 | 0) % 2, ly, k < 2 ? PAL.cream : PAL.dim2);
        drawBajaj(px, Math.round(x), FEET, (t * 24 | 0) % 2, t * 30 | 0);
      }
    }

    ctx.globalAlpha = .4;
    for (const p of parts) if (t < lockAt(p.i)) px(p.lx, p.ly, p.c);
    ctx.globalAlpha = 1;
    for (const p of parts) if (t < lockAt(p.i)) px(p.x, p.y, p.c);
    for (const b of bits) { px(b.x, b.y, b.c); if (b.puff && b.life < .3) { px(b.x + 1, b.y, b.c); px(b.x, b.y - 1, b.c); } } // exhaust puffs grow
    for (const r of rings) {
      const u = (t - r.born) / r.life, rad = r.r0 + (r.r1 - r.r0) * (1 - (1 - u) ** 2);
      for (let k = 0; k < r.n; k++) { const a = k / r.n * Math.PI * 2; px(r.x + Math.cos(a) * rad, r.y + Math.sin(a) * rad * .8, u < .5 ? r.c : PAL.light); }
    }
    for (const st of stars) {
      const a = (t - st.born) / T.starLife;
      px(st.x, st.y, PAL.white);
      if (a > .33 && a < .66) { px(st.x - 1, st.y, PAL.light); px(st.x + 1, st.y, PAL.light); px(st.x, st.y - 1, PAL.light); px(st.x, st.y + 1, PAL.light); }
    }

    if (t >= outroAt) { // ordered-dither close, one cell per logo pixel, aligned to the logo grid
      const level = clamp01((t - outroAt) / outroLen) * 16;
      ctx.fillStyle = PAL.night;
      for (let cy = 0; cy < rows; cy++) for (let cx = 0; cx < cols; cx++)
        if (BAYER[(cy & 3) * 4 + (cx & 3)] < level) ctx.fillRect(gx0 + cx * s, gy0 + cy * s, s, s);
    }
  }

  // testing aid: jump to a time after the start tap and hold the frame there
  let frozen = false;
  function seek(time) { start(); frozen = false; while (t < time && state === 'play') update(1 / 60); frozen = true; }

  return { tap, render, start, seek, variant,
    update: dt => { if (!frozen) update(dt); else clock += dt; },
    unfreeze() { frozen = false; },
    get done() { return state === 'done'; }, get state() { return state; } };
}
