// ---------------------------------------------------------
// Scroll behaviour: momentum, staggered reveals, and motion
// tied to scroll position.
//
// The old reveal moved a whole section 14px as one block, on
// a generic half-second ease. Everything arrived at once,
// which is what makes a page feel templated. Here each child
// arrives on its own beat, over a longer, slower settle.
//
// Everything is off under prefers-reduced-motion, and the
// smoothing is off on touch, where the platform's own scroll
// is already good and hijacking it only causes trouble.
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
    var lenis = null;
    if (!reduce && !coarse && typeof window.Lenis === "function") {
        lenis = new window.Lenis({
            duration: 1.05,
            // Expo-out: quick to start, long to settle. The settle is the part
            // that reads as expensive.
            easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.6
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
                lenis.scrollTo(el, { offset: -72, duration: 1.15 });
            });
        });
    }

    // ---- Staggered reveals ---------------------------------------------
    // Children animate in sequence rather than the parent moving as a slab.
    var STAGGER = 70; // ms between siblings

    function prepare(section) {
        var kids = section.querySelectorAll(
            ".section-head, .section-intro, .tier-head, .project, " +
            ".about-text > p, .about-side > *, .activity-card, .tl-item, " +
            ".contact-lead, .contact-form, .contact-direct, " +
            ".hero-title, .hero-lead, .hero-actions, .hero-socials, .eyebrow"
        );
        var list = kids.length ? kids : [section];
        list.forEach(function (el, i) {
            el.classList.add("rv");
            el.style.setProperty("--rv-delay", (i * STAGGER) + "ms");
        });
        return list;
    }

    var scopes = document.querySelectorAll(".hero, .section");
    var all = [];
    scopes.forEach(function (s) {
        Array.prototype.push.apply(all, Array.prototype.slice.call(prepare(s)));
    });

    if (reduce || !("IntersectionObserver" in window)) {
        all.forEach(function (el) { el.classList.add("rv-in"); });
    } else {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("rv-in");
                io.unobserve(entry.target);
            });
        }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
        all.forEach(function (el) { io.observe(el); });
    }

    // ---- Scroll-linked effects -----------------------------------------
    var hero = document.querySelector(".hero");
    var nav = document.querySelector(".nav");
    var ticking = false;

    function onScroll(y) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, y / h) : 0) + ")";

        if (nav) nav.classList.toggle("is-scrolled", y > 12);

        // The hero panel eases back and fades as it leaves, so the page has
        // depth rather than one flat plane sliding past.
        if (hero && !reduce) {
            var vh = window.innerHeight || 1;
            var p = Math.min(1, y / vh);
            root.style.setProperty("--hero-out", p.toFixed(3));
        }

        // Let the backdrop drift with the scroll.
        root.style.setProperty("--scroll-y", y.toFixed(1) + "px");
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
})();
