// ---------------------------------------------------------
// Interactive backdrop
//
// A dot grid behind the page that reacts to the cursor: dots
// near the pointer grow and darken, the rest stay almost
// invisible. The page's design language is precision and
// hairlines, so this stays monochrome and restrained — the
// aim is a surface that feels alive when you move across it,
// not a screensaver competing with the writing.
//
// It bows out entirely where it would be wrong or wasteful:
// reduced-motion preferences, coarse pointers (a phone has no
// cursor to follow), and small screens.
// ---------------------------------------------------------
(function () {
    "use strict";

    var reduceMotion = window.matchMedia
        && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var coarse = window.matchMedia
        && window.matchMedia("(pointer: coarse)").matches;

    if (reduceMotion || coarse || window.innerWidth < 900) return;

    var canvas = document.createElement("canvas");
    canvas.className = "backdrop";
    canvas.setAttribute("aria-hidden", "true");
    document.body.insertBefore(canvas, document.body.firstChild);

    var ctx = canvas.getContext("2d", { alpha: true });

    // Colour follows the theme token, so a change to --ink carries over.
    var ink = getComputedStyle(document.documentElement)
        .getPropertyValue("--ink").trim() || "#171717";
    ctx.fillStyle = ink;

    var GAP = 28;          // px between dots
    var RADIUS = 210;      // how far the cursor's influence reaches
    var BASE_R = 1.0;      // dot radius at rest
    var PEAK_R = 2.9;      // dot radius directly under the cursor
    // The grid has to be visible before anyone moves the mouse, or the page
    // looks blank on arrival and the whole effect is a secret.
    var BASE_A = 0.11;
    var PEAK_A = 0.5;
    // A soft light under the cursor, drawn behind the dots. It is what makes
    // the surface feel lit rather than merely dotted.
    var GLOW = 260;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var cols = 0, rows = 0, w = 0, h = 0;

    // Pointer position, plus the eased position actually drawn. Easing the
    // drawn value keeps the highlight from snapping when the mouse jumps.
    var target = { x: -9999, y: -9999 };
    var eased = { x: -9999, y: -9999 };
    var raf = 0, idleFrames = 0;

    function resize() {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        cols = Math.ceil(w / GAP) + 1;
        rows = Math.ceil(h / GAP) + 1;
        draw();
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);

        if (eased.x > -9000) {
            var g = ctx.createRadialGradient(eased.x, eased.y, 0, eased.x, eased.y, GLOW);
            g.addColorStop(0, "rgba(0,0,0,0.045)");
            g.addColorStop(0.55, "rgba(0,0,0,0.018)");
            g.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = g;
            ctx.fillRect(eased.x - GLOW, eased.y - GLOW, GLOW * 2, GLOW * 2);
            ctx.fillStyle = ink;
        }

        // Dots are drawn in the page's ink colour; only alpha varies, so the
        // grid reads as one material rather than a scatter of tints.
        var px = eased.x, py = eased.y;
        var r2 = RADIUS * RADIUS;

        for (var i = 0; i < cols; i++) {
            var x = i * GAP;
            var dx = x - px;
            // Skip whole columns outside the cursor's reach: at rest this is
            // the difference between drawing 3,000 dots and drawing a band.
            var farCol = dx * dx > r2;

            for (var j = 0; j < rows; j++) {
                var y = j * GAP;
                var a = BASE_A, r = BASE_R;

                if (!farCol) {
                    var dy = y - py;
                    var d2 = dx * dx + dy * dy;
                    if (d2 < r2) {
                        // Smooth falloff, strongest at the centre.
                        var t = 1 - Math.sqrt(d2) / RADIUS;
                        t = t * t * (3 - 2 * t);
                        a = BASE_A + (PEAK_A - BASE_A) * t;
                        r = BASE_R + (PEAK_R - BASE_R) * t;
                    }
                }

                ctx.globalAlpha = a;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, 6.283185307179586);
                ctx.fill();
            }
        }
        ctx.globalAlpha = 1;
    }

    function tick() {
        var dx = target.x - eased.x;
        var dy = target.y - eased.y;

        // Once the highlight has caught up and stopped, stop drawing. An idle
        // page should not hold a frame loop open.
        if (Math.abs(dx) < 0.4 && Math.abs(dy) < 0.4) {
            idleFrames++;
            if (idleFrames > 6) { raf = 0; return; }
        } else {
            idleFrames = 0;
        }

        eased.x += dx * 0.14;
        eased.y += dy * 0.14;
        draw();
        raf = requestAnimationFrame(tick);
    }

    function wake() {
        if (!raf) { idleFrames = 0; raf = requestAnimationFrame(tick); }
    }

    window.addEventListener("pointermove", function (e) {
        target.x = e.clientX;
        target.y = e.clientY;
        // First move: start the highlight where the cursor is, so it fades up
        // in place instead of flying in from the corner.
        if (eased.x < -9000) { eased.x = target.x; eased.y = target.y; }
        wake();
    }, { passive: true });

    window.addEventListener("pointerleave", function () {
        target.x = -9999;
        target.y = -9999;
        wake();
    }, { passive: true });

    var resizeTimer = 0;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 150);
    }, { passive: true });

    resize();
})();
