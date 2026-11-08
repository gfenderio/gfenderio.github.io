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

    // The nav's height, for everything that pins under it. On phones the nav
    // wraps to two rows, so it is measured rather than assumed.
    var navEl = document.querySelector(".nav");
    var navH = 64;
    function measureNav() {
        navH = navEl ? navEl.offsetHeight : 64;
        root.style.setProperty("--nav-h", navH + "px");
    }
    measureNav();

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

    // With motion allowed, the work flow pins (if the screen has room for it,
    // checked below once laid out). Its stages then animate themselves, so
    // they are left out of the reveals.
    var flowBox = document.querySelector(".flow");
    var pinWanted = !!flowBox && !reduce;

    function blocks(section) {
        var kids = section.querySelectorAll(
            ".section-head, .flow-side, .flow-main, .game-visual, .game-body, .itch-card, .card, " +
            ".about-text > p, .facts, .tools, .tl-item, " +
            ".contact-form, .contact-card"
        );
        kids = Array.prototype.filter.call(kids, function (el) {
            return !(pinWanted && el.closest(".flow, .hscroll, .exp"));
        });
        return kids.length ? kids : [section];
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

    // ---- The work flow ---------------------------------------------------
    // Two modes. Pinned: the flow holds under the nav for a run of scroll,
    // one stretch per stage; the stage whose stretch you are in is current,
    // earlier ones have left upward, later ones wait below. Listed (reduced
    // motion, short screens, or a stage too long to fit): a line 60% of the
    // way down the screen is "now", and every step it has passed is lit.
    // In both, the rail fills and the dot moves with the scroll, both ways.
    var flow = flowBox;
    var flowGeo = null;
    var flowPin = flow && flow.querySelector(".flow-pin");
    var flowFill = flow && flow.querySelector(".flow-fill");
    var flowDot = flow && flow.querySelector(".flow-dot");
    var flowNow = flow && flow.querySelector(".flow-count-now");
    var flowSteps = flow ? Array.prototype.slice.call(flow.querySelectorAll(".flow-step")) : [];
    var flowState = [];
    var pinned = false;
    var lastW = 0, lastH = 0;

    flowSteps.forEach(function (s, i) { s.style.setProperty("--i", i); });

    function pageTop(el) {
        var top = 0;
        while (el) { top += el.offsetTop; el = el.offsetParent; }
        return top;
    }

    function setPinned(on) {
        pinned = on;
        flow.classList.toggle("is-pinned", on);
        if (!on) {
            flow.style.height = "";
            flow.style.removeProperty("--pin-h");
        }
        flowState = [];
    }

    function measureFlow() {
        if (!flow) return;
        measureNav();
        var vh = window.innerHeight;
        if (pinWanted) {
            setPinned(vh >= 560);
            if (pinned) {
                var pinH = vh - navH;
                var stepLen = Math.round(vh * (window.innerWidth <= 760 ? 0.6 : 0.72));
                flow.style.setProperty("--pin-h", pinH + "px");
                flow.style.height = (pinH + stepLen * flowSteps.length) + "px";
                // A stage that does not fit the screen would be cut off:
                // list them instead.
                // Layout boxes, not transformed ones: waiting stages sit
                // shifted down, which must not count as overflow.
                var tooTall = flowSteps.some(function (s) {
                    var side = s.querySelector(".flow-side");
                    var main = s.querySelector(".flow-main");
                    var top = Math.min(side.offsetTop, main.offsetTop);
                    var bottom = Math.max(side.offsetTop + side.offsetHeight, main.offsetTop + main.offsetHeight);
                    return top < 8 || bottom > s.clientHeight - 8;
                });
                if (tooTall) setPinned(false);
            }
        }
        var rail = flow.querySelector(".flow-rail");
        flowGeo = {
            top: pageTop(flow),
            railTop: pageTop(rail),
            h: rail.offsetHeight,
            run: pinned ? flow.offsetHeight - flowPin.offsetHeight : 0,
            nodes: flowSteps.map(function (s) {
                var n = s.querySelector(".flow-node");
                return pageTop(n) + n.offsetHeight / 2;
            })
        };
        lastW = window.innerWidth;
        lastH = vh;
    }

    function setStep(s, i, state) {
        if (flowState[i] === state) return;
        flowState[i] = state;
        s.classList.toggle("is-on", state !== "after");
        s.classList.toggle("is-current", state === "current");
        s.classList.toggle("is-past", state === "past");
    }

    function updateFlow(y) {
        if (!flowGeo) return;
        var n = flowSteps.length, p;
        if (pinned) {
            var t = Math.max(0, Math.min(1, (y + navH - flowGeo.top) / flowGeo.run));
            var cur = Math.min(n - 1, Math.floor(t * n));
            // The dot reaches each node halfway through that stage's stretch.
            p = Math.max(0, Math.min(1, (t * n - 0.5) / (n - 1)));
            flowSteps.forEach(function (s, i) {
                setStep(s, i, i < cur ? "past" : i === cur ? "current" : "after");
            });
            if (flowNow) flowNow.textContent = "0" + (cur + 1);
        } else {
            var now = y + window.innerHeight * 0.6;
            p = reduce ? 1 : Math.max(0, Math.min(1, (now - flowGeo.railTop) / flowGeo.h));
            flowSteps.forEach(function (s, i) {
                setStep(s, i, reduce || now >= flowGeo.nodes[i] ? "on" : "after");
            });
        }
        flowFill.style.transform = "scaleY(" + p.toFixed(4) + ")";
        flowDot.style.transform = "translateY(" + (p * flowGeo.h).toFixed(1) + "px)";
    }

    if (flow) {
        measureFlow();
        var remeasure = function () {
            measureFlow();
            updateFlow(window.scrollY || window.pageYOffset || 0);
        };
        window.addEventListener("load", remeasure);
        // A phone's toolbar sliding away resizes the window by a little;
        // re-pinning then would shift the page under the thumb.
        window.addEventListener("resize", function () {
            if (coarse && window.innerWidth === lastW && Math.abs(window.innerHeight - lastH) < 140) return;
            remeasure();
        });
        // The language switch changes how long each stage is.
        document.addEventListener("langToggled", function () {
            requestAnimationFrame(remeasure);
        });
        if ("ResizeObserver" in window) {
            var lastFlowW = 0;
            new ResizeObserver(function () {
                // Only width changes matter; setting the height ourselves
                // must not trigger another measure.
                if (flow.offsetWidth === lastFlowW) return;
                lastFlowW = flow.offsetWidth;
                remeasure();
            }).observe(flow);
        }
    }

    // ---- Websites & apps: sideways gallery -------------------------------
    // Pinned, the row of projects slides left as the page scrolls down, one
    // pixel across for each pixel down. With scroll timelines the CSS does
    // the moving from the numbers set here; otherwise it is moved here.
    var hs = document.querySelector(".hscroll");
    var hsPin = hs && hs.querySelector(".hscroll-pin");
    var hsTrack = hs && hs.querySelector(".grid");
    var hsBar = hs && hs.querySelector(".hscroll-bar > span");
    var hsNow = hs && hs.querySelector(".hscroll-now");
    var hsCards = hsTrack ? Array.prototype.slice.call(hsTrack.querySelectorAll(".card")) : [];
    var hsGeo = null, hsCur = -1;
    var timelines = !!(window.CSS && CSS.supports && CSS.supports("animation-timeline: scroll()"));

    function unpinHs() {
        hs.classList.remove("is-pinned");
        hs.style.height = "";
        hsTrack.style.transform = "";
        hsGeo = null;
    }

    function measureHs() {
        if (!hs) return;
        if (!pinWanted || window.innerHeight < 520) { unpinHs(); return; }
        hs.classList.add("is-pinned");
        var pinH = window.innerHeight - navH;
        hs.style.setProperty("--pin-h", pinH + "px");
        var pinW = hsPin.clientWidth;
        var dist = Math.max(0, hsTrack.offsetWidth - pinW);
        var meta = hs.querySelector(".hscroll-meta").offsetHeight;
        // Nothing to slide, or the cards would not fit the screen: a grid.
        if (dist < 40 || hsTrack.offsetHeight + meta + 32 > pinH) { unpinHs(); return; }
        hs.style.height = (pinH + dist) + "px";
        var start = pageTop(hs) - navH;
        hs.style.setProperty("--hs-dist", -dist + "px");
        hs.style.setProperty("--hs-start", start + "px");
        hs.style.setProperty("--hs-end", (start + dist) + "px");
        hsGeo = {
            start: start,
            dist: dist,
            pinW: pinW,
            xs: hsCards.map(function (c) { return c.offsetLeft + c.offsetWidth / 2; })
        };
        hsCur = -1;
    }

    // Tabbing to a card that is still off to the side: scroll the page to
    // where that card sits in view, or the focus ring lands out of sight.
    if (hs) {
        hsTrack.addEventListener("focusin", function (e) {
            if (!hsGeo) return;
            var card = e.target.closest(".card");
            if (!card) return;
            var x = card.offsetLeft - (hsGeo.pinW - card.offsetWidth) / 2;
            x = Math.max(0, Math.min(hsGeo.dist, x));
            var y = hsGeo.start + x;
            if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true });
            else window.scrollTo(0, y);
        });
    }

    function updateHs(y) {
        if (!hsGeo) return;
        var x = Math.max(0, Math.min(hsGeo.dist, y - hsGeo.start));
        if (!timelines) {
            hsTrack.style.transform = "translate3d(" + (-x).toFixed(1) + "px,0,0)";
            hsBar.style.transform = "scaleX(" + (x / hsGeo.dist).toFixed(4) + ")";
        }
        // The counter names the card nearest the middle; at the end, the last.
        var mid = x + hsGeo.pinW / 2, cur = 0, best = Infinity;
        hsGeo.xs.forEach(function (cx, i) {
            var d = Math.abs(cx - mid);
            if (d < best) { best = d; cur = i; }
        });
        if (x >= hsGeo.dist - 2) cur = hsCards.length - 1;
        if (x <= 2) cur = 0;
        if (cur !== hsCur) {
            hsCur = cur;
            hsNow.textContent = "0" + (cur + 1);
        }
    }

    // ---- Experience: stacking cards -------------------------------------
    // The cards pin under the nav (CSS sticky, each a little lower than the
    // one before). A card counts as covered once the next one has reached
    // its own pinned place; covered cards step back and dim.
    var exp = document.querySelector(".exp");
    var expItems = exp ? Array.prototype.slice.call(exp.querySelectorAll(".tl-item")) : [];
    var expStuck = [], expUnder = [];
    if (exp && !reduce) {
        exp.classList.add("is-stack");
        expItems.forEach(function (it, i) { it.style.setProperty("--i", i); });
    }

    function measureExp() {
        if (!exp || reduce) return;
        expStuck = expItems.map(function (it) { return parseFloat(getComputedStyle(it).top) || 0; });
        expUnder = [];
    }

    function updateExp() {
        if (!exp || reduce || !expStuck.length) return;
        for (var i = 0; i < expItems.length; i++) {
            var next = expItems[i + 1];
            var under = !!next && next.getBoundingClientRect().top <= expStuck[i + 1] + 1;
            if (under !== expUnder[i]) {
                expUnder[i] = under;
                expItems[i].classList.toggle("is-under", under);
            }
        }
    }

    function measureMore() {
        measureHs();
        measureExp();
        var y = window.scrollY || window.pageYOffset || 0;
        updateHs(y);
        updateExp();
    }
    measureMore();
    window.addEventListener("load", measureMore);
    window.addEventListener("resize", function () {
        if (coarse && window.innerWidth === lastW && Math.abs(window.innerHeight - lastH) < 140) return;
        measureMore();
    });
    document.addEventListener("langToggled", function () { requestAnimationFrame(measureMore); });
    if ("ResizeObserver" in window) {
        // Pictures and fonts arriving move what comes after them. Measuring
        // again sets the same heights, so this settles after one pass.
        var moreQueued = false;
        new ResizeObserver(function () {
            if (moreQueued) return;
            moreQueued = true;
            requestAnimationFrame(function () { moreQueued = false; measureMore(); });
        }).observe(document.body);
    }

    // ---- Scroll-linked effects -----------------------------------------
    var nav = navEl;
    var ticking = false;

    function onScroll(y) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, y / h) : 0) + ")";

        if (nav) nav.classList.toggle("is-scrolled", y > 12);

        updateFlow(y);
        updateHs(y);
        updateExp();
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
