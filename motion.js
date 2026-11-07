// ---------------------------------------------------------
// Scroll behaviour: momentum, staggered reveals, and motion
// tied to scroll position.
//
// The old reveal moved a whole section 14px as one block, on
// a generic half-second ease. Everything arrived at once,
// which is what makes a page feel templated. Here each child
// arrives on its own beat, over a longer, slower settle.
//
// Everything is off under prefers-reduced-motion. Phones keep
// their own scrolling; Lenis only smooths the mouse wheel.
// ---------------------------------------------------------
(function () {
    "use strict";

    var reduce = window.matchMedia
        && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var coarse = window.matchMedia
        && window.matchMedia("(pointer: coarse)").matches;

    var root = document.documentElement;

    // ---- Progress bar -------------------------------------------------
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    // ---- Momentum scrolling -------------------------------------------
    // Native wheel scrolling steps in ~100px jumps. Smoothing it is what
    // makes the rest of the motion read as deliberate rather than jittery.
    // Inside an iframe (a preview, an embed) touch smoothing fights the host
    // page's own scrolling, so phones get native scroll there.
    var framed = true;
    try { framed = window.self !== window.top; } catch (e) { }

    var lenis = null;
    if (!reduce && !(framed && coarse) && typeof window.Lenis === "function") {
        lenis = new window.Lenis({
            duration: 1.05,
            // Expo-out: quick to start, long to settle. The settle is the part
            // that reads as expensive.
            easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
            smoothWheel: true,
            wheelMultiplier: 0.9,
            // Touch screens keep the phone's own scrolling (momentum, bounce,
            // Safari's collapsing toolbar). Lenis only smooths the mouse wheel.
            syncTouch: false
        });

        // Exposed so the lightbox can pause scrolling while it is open.
        window.__lenis = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Anchor links have to go through Lenis or they fight it.
        document.querySelectorAll('a[href^="#"]').forEach(function (a) {
            a.addEventListener("click", function (e) {
                var id = a.getAttribute("href");
                if (!id || id === "#") return;
                var el = document.querySelector(id);
                if (!el) return;
                e.preventDefault();
                // No offset here: Lenis honours the section's scroll-margin-top,
                // which already clears the sticky nav (see style.css).
                lenis.scrollTo(el, { duration: 1.15 });
                // preventDefault also stops the browser moving keyboard focus,
                // so do it here; otherwise the next Tab starts from the top.
                if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
                el.focus({ preventScroll: true });
            });
        });
    }

    // ---- Reveals ---------------------------------------------------------
    // Two ways, same look, and both run again when you scroll back.
    // With a mouse and scroll timelines, the scroll position plays each
    // block's entrance (style.css, .sr): it reverses exactly as you scroll
    // back and runs off the main thread. On phones a flick is too fast for
    // that to be seen, so blocks play on time as they arrive and are reset
    // once they drop below the screen (.rv); browsers without scroll
    // timelines get the same.
    var STAGGER = 90;   // ms between blocks that arrive together
    var MAX_STEPS = 4;  // so the fifth card in a row does not wait half a second
    var SETTLE = 1500;  // the longest transition (the game picture), plus a margin

    function blocks(section) {
        var kids = section.querySelectorAll(
            ".section-head, .flow-side, .flow-main, .game-visual, .game-body, .itch-card, .card, " +
            ".about-text > p, .facts, .tools, .tl-item, " +
            ".contact-form, .contact-card"
        );
        return kids.length ? Array.prototype.slice.call(kids) : [section];
    }

    // The hero is animated in CSS (style.css), so it never flashes before
    // this script runs.
    var all = [];
    document.querySelectorAll(".section").forEach(function (s) {
        Array.prototype.push.apply(all, blocks(s));
    });

    var scrub = !reduce && !coarse && window.CSS && CSS.supports
        && CSS.supports("animation-timeline: view()");

    if (scrub) {
        // Each block's reveal runs over the first stretch of scroll after its
        // top crosses the bottom edge. Blocks side by side (a row of cards)
        // start a little apart, so the row fills in left to right as you
        // scroll. Near the end of the page there may not be enough scroll
        // left, so those ranges are shortened to finish on screen.
        var STEP = 56;                    // px of scroll between blocks in a row
        var layout = function () {
            var vh = window.innerHeight;
            var maxScroll = document.documentElement.scrollHeight - vh;
            // Layout positions, not on-screen ones: a block part-way through
            // its own reveal is moved and scaled, which must not count.
            var items = all.map(function (el) {
                var top = 0, left = 0, n = el;
                while (n) { top += n.offsetTop; left += n.offsetLeft; n = n.offsetParent; }
                return { el: el, top: top, left: left };
            }).sort(function (a, b) { return a.top - b.top || a.left - b.left; });

            var row = [];
            var flush = function () {
                row.sort(function (a, b) { return a.left - b.left; });
                row.forEach(function (it, i) {
                    var big = it.el.classList.contains("game-visual");
                    var len = big ? vh * (coarse ? 0.45 : 0.6) : (coarse ? 150 : 220);
                    var from = row.length > 1 ? Math.min(i, 3) * STEP : 0;
                    // How far above the bottom edge this block's top can get.
                    var room = vh - (it.top - maxScroll) - 8;
                    if (from + len > room) {
                        from = Math.min(from, Math.max(0, room * 0.3));
                        len = Math.max(1, room - from);
                    }
                    it.el.style.setProperty("--sr-from", from.toFixed(0) + "px");
                    it.el.style.setProperty("--sr-to", (from + len).toFixed(0) + "px");
                });
                row = [];
            };
            items.forEach(function (it) {
                if (row.length && Math.abs(it.top - row[0].top) > 6) flush();
                row.push(it);
            });
            flush();
        };

        all.forEach(function (el) { el.classList.add("sr"); });
        layout();

        // Pictures load and fonts swap after this runs; redo the numbers
        // whenever the page changes height or width.
        var queued = false;
        var relayout = function () {
            if (queued) return;
            queued = true;
            requestAnimationFrame(function () { queued = false; layout(); });
        };
        window.addEventListener("load", relayout);
        window.addEventListener("resize", relayout);
        if ("ResizeObserver" in window) new ResizeObserver(relayout).observe(document.body);
    } else if (reduce || !("IntersectionObserver" in window)) {
        // Nothing to animate: blocks are shown as they are.
    } else {
        all.forEach(function (el) { el.classList.add("rv"); });

        var play = function (el, delay) {
            clearTimeout(el.__rvTimer);
            el.style.setProperty("--rv-delay", delay + "ms");
            el.classList.add("rv-play", "rv-in");
            el.__rvTimer = setTimeout(function () { el.classList.remove("rv-play"); }, delay + SETTLE);
        };
        // In place at once, no motion: for blocks the visitor is not looking at.
        var showNow = function (el) {
            clearTimeout(el.__rvTimer);
            el.classList.remove("rv-play");
            el.classList.add("rv-in");
        };
        var reset = function (el) {
            clearTimeout(el.__rvTimer);
            el.classList.remove("rv-play", "rv-in");
        };

        // Arrival: a block plays once its top is 8% inside the bottom edge,
        // so the visitor sees it come in. Blocks that arrive together play
        // one after another, in page order.
        var enter = new IntersectionObserver(function (entries) {
            var arriving = [];
            entries.forEach(function (entry) {
                var el = entry.target;
                if (!entry.isIntersecting || el.classList.contains("rv-in")) return;
                if (entry.boundingClientRect.top < 0) showNow(el);
                else arriving.push(el);
            });
            arriving.sort(function (a, b) {
                return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
            });
            arriving.forEach(function (el, i) {
                play(el, Math.min(i, MAX_STEPS) * STAGGER);
            });
        }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });

        // Leaving: fully below the screen (scrolling back up) it is reset,
        // out of sight, to play again. Fully above it stays in place, and a
        // block a fast flick carried past without arriving is put in place.
        var leave = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) return;
                if (entry.boundingClientRect.top > 0) reset(entry.target);
                else showNow(entry.target);
            });
        }, { threshold: 0 });

        all.forEach(function (el) {
            enter.observe(el);
            leave.observe(el);
        });
    }

    // ---- Figures roll up --------------------------------------------------
    // The numbers in About come up digit by digit from behind an invisible
    // line, like an odometer. Each character is its own clipped box; the
    // whole figure stays in one hidden span for screen readers. It plays
    // once each time the box comes into view (see style.css).
    var rolling = !reduce && (scrub || "IntersectionObserver" in window);
    var esc = function (c) {
        return c === " " ? "&nbsp;" : c.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    };
    var splitFigures = function () {
        document.querySelectorAll(".facts dt, .flow-stat").forEach(function (dt, f) {
            // Already split, and not rewritten by the language switch.
            if (dt.querySelector(".roll")) return;
            var text = dt.textContent.replace(/\s+/g, " ").trim();
            if (!text) return;
            var digits = "";
            for (var i = 0; i < text.length; i++) {
                digits += '<span class="dg" style="--d:' + i + '"><span>' + esc(text[i]) + "</span></span>";
            }
            if (dt.tagName === "DT") dt.style.setProperty("--f", f);
            dt.innerHTML = '<span class="sr-only">' + esc(text) + "</span>" +
                '<span class="roll" aria-hidden="true">' + digits + "</span>";
        });
    };
    var factsBox = document.querySelector(".facts");
    if (rolling && factsBox) {
        splitFigures();
        // The language switch rewrites the figures (2,300+ / 2.300+).
        document.addEventListener("langToggled", splitFigures);

        // Roll once the box is mostly on screen; reset once it has gone
        // below the screen (scrolling back up), so the next pass replays it.
        // Leaving off the top keeps the figures up.
        new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) factsBox.classList.add("is-rolled");
                else if (entry.boundingClientRect.top > 0) factsBox.classList.remove("is-rolled");
            });
        }, { threshold: 0.6 }).observe(factsBox);
    }

    // ---- The work flow's rail ------------------------------------------
    // A line 60% of the way down the screen is "now". The rail fills down to
    // it, the dot (the item on its trip) sits on it, and every step whose
    // node it has passed is lit. All of it follows the scroll both ways.
    var flow = document.querySelector(".flow");
    var flowGeo = null;
    var flowFill = flow && flow.querySelector(".flow-fill");
    var flowDot = flow && flow.querySelector(".flow-dot");
    var flowSteps = flow ? Array.prototype.slice.call(flow.querySelectorAll(".flow-step")) : [];
    var flowOn = [];

    function pageTop(el) {
        var top = 0;
        while (el) { top += el.offsetTop; el = el.offsetParent; }
        return top;
    }

    function measureFlow() {
        if (!flow) return;
        var rail = flow.querySelector(".flow-rail");
        flowGeo = {
            top: pageTop(rail),
            h: rail.offsetHeight,
            nodes: flowSteps.map(function (s) {
                var n = s.querySelector(".flow-node");
                return pageTop(n) + n.offsetHeight / 2;
            })
        };
    }

    function updateFlow(y) {
        if (!flowGeo) return;
        var now = y + window.innerHeight * 0.6;
        var p = reduce ? 1 : Math.max(0, Math.min(1, (now - flowGeo.top) / flowGeo.h));
        flowFill.style.transform = "scaleY(" + p.toFixed(4) + ")";
        flowDot.style.transform = "translateY(" + (p * flowGeo.h).toFixed(1) + "px)";
        flowSteps.forEach(function (s, i) {
            var on = reduce || now >= flowGeo.nodes[i];
            if (on !== flowOn[i]) {
                flowOn[i] = on;
                s.classList.toggle("is-on", on);
            }
        });
    }

    if (flow) {
        measureFlow();
        var remeasure = function () {
            measureFlow();
            updateFlow(window.scrollY || window.pageYOffset || 0);
        };
        window.addEventListener("load", remeasure);
        window.addEventListener("resize", remeasure);
        if ("ResizeObserver" in window) new ResizeObserver(remeasure).observe(flow);
    }

    // ---- Scroll-linked effects -----------------------------------------
    var hero = document.querySelector(".hero");
    var nav = document.querySelector(".nav");
    var ticking = false;

    function onScroll(y) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, y / h) : 0) + ")";

        if (nav) nav.classList.toggle("is-scrolled", y > 12);

        updateFlow(y);

        // The hero panel eases back and fades as it leaves, so the page has
        // depth rather than one flat plane sliding past. Not on phones: the
        // page scrolls on its own thread there, and a panel restyled from
        // script on every frame trails behind it and looks jerky.
        if (hero && !reduce && !coarse) {
            var vh = window.innerHeight || 1;
            var p = Math.min(1, y / vh);
            // Set on the hero only, so each frame restyles the hero, not the page.
            hero.style.setProperty("--hero-out", p.toFixed(3));
        }
    }

    function request(y) {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
            onScroll(y);
            ticking = false;
        });
    }

    if (lenis) {
        lenis.on("scroll", function (e) { request(e.scroll); });
    } else {
        window.addEventListener("scroll", function () {
            request(window.scrollY || window.pageYOffset || 0);
        }, { passive: true });
    }

    onScroll(window.scrollY || 0);

    // If the visitor turns on reduced motion mid-visit, stop the smoothing.
    if (lenis && window.matchMedia) {
        var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        var onChange = function (e) { if (e.matches) { lenis.destroy(); window.__lenis = null; } };
        if (mq.addEventListener) mq.addEventListener("change", onChange);
        else if (mq.addListener) mq.addListener(onChange);
    }
})();
