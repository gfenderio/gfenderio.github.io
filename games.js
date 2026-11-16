// Games section (Fenderio Games): the studio splash, the dark page and the hover clips.
//
// 1. The first time the splash stage comes on screen in a visit, the Fenderio Games splash plays there
//    (studio/, copied from the Putus repo, silent on the site). It never closes to black: it stays on its
//    finished logo, still animating. Later in the same visit it starts on the finished logo.
// 2. While the Games section fills the middle of the screen, the page takes the splash's night colours
//    (html.games-dark, style.css); it goes back to white when the section scrolls away. On the first
//    play it waits until the logo has come together, so the splash leads into it.
// 3. The stage is playable: letters hop under the cursor, a click bounces one, a click elsewhere replays
//    the splash with the next game's cameo.
// 4. Each game's cover plays a 10 second silent clip on hover, or on touch screens while it is in view.
import { createSplash, layout, T, VARIANTS } from './studio/splash.js?v=20261116e';
import { PAL, drawSmall } from './studio/logo.js?v=20261116e';

const root = document.documentElement;
const section = document.getElementById('play');
const canvas = section && section.querySelector('.studio-stage canvas');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse = matchMedia('(pointer: coarse)').matches;
const SEEN = 'fenderio_site_splash'; // per visit (sessionStorage)

const seen = () => { try { return sessionStorage.getItem(SEEN) === '1'; } catch (e) { return false; } };
const markSeen = () => { try { sessionStorage.setItem(SEEN, '1'); } catch (e) {} };

if (section && canvas) {
  const ctx = canvas.getContext('2d');
  let splash = null, started = false, ready = seen(), inSection = false;
  // After the logo is together, a small blinking hint invites a click that replays with another cameo.
  const hint = coarse ? 'TAP TO REPLAY' : 'CLICK TO REPLAY';
  const draw = () => {
    ctx.imageSmoothingEnabled = false;
    splash.render(ctx, canvas.width, canvas.height);
    if (elapsed < T.wave + 0.6) return;
    const { s } = layout(canvas.width, canvas.height, splash.variant), k = Math.max(1, Math.round(s / 2));
    const px = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(canvas.width / 2 + x * k), Math.round(canvas.height - 9 * k + y * k), k, k); };
    if (Math.floor((elapsed - T.wave) * 1.6) % 4 !== 3) drawSmall(px, hint, 0, 0, PAL.dim2, false); // blinks off one beat in four
  };
  // The canvas matches the stage's real size in device pixels, so the splash picks a whole-number pixel scale
  // and every logo pixel is the same size (stretching a small canvas made them uneven).
  const fit = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2), r = canvas.getBoundingClientRect();
    const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
    if (w && h && (canvas.width !== w || canvas.height !== h)) { canvas.width = w; canvas.height = h; if (splash) draw(); }
  };
  fit(); addEventListener('resize', fit);
  const setDark = () => root.classList.toggle('games-dark', inSection && ready);

  // hold: the splash never closes; once its logo is together it keeps living (stars, shine, Gian waving).
  // It only animates while the stage is on screen.
  let visible = false, raf = 0, last = 0, elapsed = 0;
  const frame = now => {
    raf = 0;
    const dt = Math.min(0.1, last ? (now - last) / 1000 : 1 / 60); last = now;
    elapsed += dt;
    splash.update(dt); draw();
    if (!ready && elapsed >= T.type0) { ready = true; setDark(); markSeen(); } // the logo is together: the page follows
    if (visible) raf = requestAnimationFrame(frame);
  };
  function play(variant) {
    started = true; elapsed = 0;
    splash = createSplash({ reducedMotion: reduce, hold: true, variant });
    if (!variant && (seen() || reduce)) { splash.seek(T.wave); splash.unfreeze(); elapsed = T.wave; ready = true; setDark(); markSeen(); } // seen this visit: straight to the logo
  }

  // Play with it: hovering a letter makes it hop, clicking one bounces it hard and ripples to its
  // neighbours; clicking anywhere else replays the splash with the next studio game's cameo.
  const at = e => { const r = canvas.getBoundingClientRect(); return [(e.clientX - r.left) * canvas.width / r.width, (e.clientY - r.top) * canvas.height / r.height]; };
  const letter = e => splash && elapsed > T.type0 ? splash.letterAt(...at(e), canvas.width, canvas.height) : -1;
  let hovered = -1;
  canvas.addEventListener('pointermove', e => {
    const i = letter(e);
    canvas.style.cursor = elapsed > T.type0 ? 'pointer' : '';
    if (i !== hovered && i >= 0 && e.pointerType === 'mouse') splash.poke(i);
    hovered = i;
  });
  canvas.addEventListener('pointerleave', () => { hovered = -1; });
  canvas.addEventListener('click', e => {
    if (!splash || elapsed < T.type0) return;
    const i = letter(e);
    if (i >= 0) { splash.poke(i, true); return; }
    play(VARIANTS[(VARIANTS.indexOf(splash.variant) + 1) % VARIANTS.length]);
  });

  new IntersectionObserver(es => es.forEach(e => {
    visible = e.isIntersecting;
    if (visible && !started) play();
    if (visible && started && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }), { threshold: 0.6 }).observe(canvas.parentElement);
  // "fills the middle of the screen": the section crosses a thin band at the viewport's centre
  new IntersectionObserver(es => es.forEach(e => { inSection = e.isIntersecting; setDark(); }), { rootMargin: '-45% 0px -45% 0px' })
    .observe(section);
}

if (!reduce) {
  for (const visual of document.querySelectorAll('.game-visual')) {
    const clip = visual.querySelector('.game-clip');
    if (!clip) continue;
    const on = () => { const p = clip.play(); if (p) p.catch(() => {}); };
    const off = () => { clip.pause(); visual.classList.remove('is-playing'); };
    clip.addEventListener('playing', () => visual.classList.add('is-playing'));
    if (coarse) {
      new IntersectionObserver(es => es.forEach(e => (e.isIntersecting ? on() : off())), { threshold: 0.6 }).observe(visual);
    } else {
      visual.addEventListener('mouseenter', on);
      visual.addEventListener('mouseleave', off);
      visual.addEventListener('focus', on);
      visual.addEventListener('blur', off);
    }
  }
}
