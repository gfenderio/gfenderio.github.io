// ---------------------------------------------------------
// Gilang Fenderio — portfolio interactions
// Language toggle (EN/ID) + scroll reveal. Kept intentionally small.
// ---------------------------------------------------------

(function () {
    "use strict";

    // Current year in footer
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ---- Language ----
    function applyLanguage(lang) {
        if (typeof translations === "undefined" || !translations[lang]) return;
        var dict = translations[lang];

        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            var val = dict[el.getAttribute("data-i18n")];
            if (val == null) return;
            // Values are our own trusted strings and may contain HTML / entities.
            el.innerHTML = val;
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
            var val = dict[el.getAttribute("data-i18n-placeholder")];
            if (val != null) el.placeholder = val;
        });

        document.documentElement.lang = lang;
        try { localStorage.setItem("lang", lang); } catch (e) { }
        updateLangButton(lang);

        document.querySelectorAll("[data-i18n-gh]").forEach(function (el) {
            var n = el.getAttribute("data-gh-total");
            if (!n) return;
            var enStr = n + " contributions in the last 6 months";
            var idStr = n + " kontribusi dalam 6 bulan terakhir";
            el.textContent = lang === "id" ? idStr : enStr;
        });

        document.dispatchEvent(new CustomEvent("langToggled", { detail: lang }));
    }

    function updateLangButton(lang) {
        var btn = document.getElementById("lang-btn");
        if (!btn) return;
        var enCls = lang === "en" ? "on" : "off";
        var idCls = lang === "id" ? "on" : "off";
        btn.innerHTML = '<span class="' + enCls + '">EN</span> / <span class="' + idCls + '">ID</span>';
    }

    var saved = "en";
    try { saved = localStorage.getItem("lang") || "en"; } catch (e) { }
    applyLanguage(saved);

    var langBtn = document.getElementById("lang-btn");
    if (langBtn) {
        langBtn.addEventListener("click", function () {
            var next = (document.documentElement.lang === "id") ? "en" : "id";
            applyLanguage(next);
        });
    }

    // Scroll reveal now lives in motion.js, which staggers each child rather
    // than moving a whole section as one block.
})();

// ---------------------------------------------------------
// Screenshot lightbox — carousel (project galleries)
// One shot at a time; prev/next + dots + swipe + keyboard.
// ---------------------------------------------------------
(function () {
    "use strict";

    var triggers = document.querySelectorAll(".project-visual[data-shots]");
    if (!triggers.length) return;

    var box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML =
        '<div class="lightbox-backdrop" data-close></div>' +
        '<div class="lightbox-inner" role="dialog" aria-modal="true">' +
        '<button class="lightbox-close" type="button" aria-label="Close" data-close>&times;</button>' +
        '<p class="lightbox-title"></p>' +
        '<div class="lightbox-carousel">' +
        '<button class="lightbox-nav lightbox-prev" type="button" aria-label="Previous screenshot">' +
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>' +
        '</button>' +
        '<div class="lightbox-viewport"><div class="lightbox-track"></div></div>' +
        '<button class="lightbox-nav lightbox-next" type="button" aria-label="Next screenshot">' +
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>' +
        '</button>' +
        '</div>' +
        '<div class="lightbox-meta">' +
        '<div class="lightbox-dots" role="tablist"></div>' +
        '<span class="lightbox-counter" aria-live="polite"></span>' +
        '</div>' +
        '</div>';
    document.body.appendChild(box);

    var titleEl = box.querySelector(".lightbox-title");
    var trackEl = box.querySelector(".lightbox-track");
    var viewportEl = box.querySelector(".lightbox-viewport");
    var dotsEl = box.querySelector(".lightbox-dots");
    var counterEl = box.querySelector(".lightbox-counter");
    var prevBtn = box.querySelector(".lightbox-prev");
    var nextBtn = box.querySelector(".lightbox-next");

    var index = 0;
    var total = 0;

    function render() {
        trackEl.style.transform = "translateX(-" + (index * 100) + "%)";
        var dots = dotsEl.children;
        for (var i = 0; i < dots.length; i++) {
            dots[i].classList.toggle("is-active", i === index);
            dots[i].setAttribute("aria-selected", i === index ? "true" : "false");
        }
        if (counterEl) counterEl.textContent = total ? (index + 1) + " / " + total : "";
    }

    function goTo(i) {
        if (total < 1) return;
        index = (i + total) % total;
        render();
    }

    function open(name, shots, portrait) {
        titleEl.textContent = name;
        box.classList.toggle("is-portrait", !!portrait);
        trackEl.innerHTML = "";
        dotsEl.innerHTML = "";
        total = shots.length;
        index = 0;

        shots.forEach(function (src, i) {
            var slide = document.createElement("div");
            slide.className = "lightbox-slide";
            var img = document.createElement("img");
            img.src = src.trim();
            img.alt = name + " screenshot " + (i + 1);
            img.loading = i === 0 ? "eager" : "lazy";
            slide.appendChild(img);
            trackEl.appendChild(slide);

            var dot = document.createElement("button");
            dot.type = "button";
            dot.className = "lightbox-dot";
            dot.setAttribute("role", "tab");
            dot.setAttribute("aria-label", "Go to screenshot " + (i + 1));
            (function (j) { dot.addEventListener("click", function () { goTo(j); }); })(i);
            dotsEl.appendChild(dot);
        });

        box.classList.toggle("is-single", total < 2);
        render();
        box.classList.add("open");
        document.body.style.overflow = "hidden";
        // Momentum scrolling ignores body overflow, so it has to be told.
        if (window.__lenis) window.__lenis.stop();
    }

    function close() {
        box.classList.remove("open");
        document.body.style.overflow = "";
        if (window.__lenis) window.__lenis.start();
    }

    triggers.forEach(function (t) {
        t.addEventListener("click", function () {
            var shots = (t.getAttribute("data-shots") || "").split(",").filter(Boolean);
            if (!shots.length) return;
            open(t.getAttribute("data-name") || "", shots, t.hasAttribute("data-portrait"));
        });
    });

    prevBtn.addEventListener("click", function () { goTo(index - 1); });
    nextBtn.addEventListener("click", function () { goTo(index + 1); });

    box.addEventListener("click", function (e) {
        if (e.target.hasAttribute("data-close")) close();
    });
    document.addEventListener("keydown", function (e) {
        if (!box.classList.contains("open")) return;
        if (e.key === "Escape") close();
        else if (e.key === "ArrowLeft") goTo(index - 1);
        else if (e.key === "ArrowRight") goTo(index + 1);
    });

    // Touch swipe
    var startX = 0;
    var deltaX = 0;
    var swiping = false;
    viewportEl.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
        deltaX = 0;
        swiping = true;
    }, { passive: true });
    viewportEl.addEventListener("touchmove", function (e) {
        if (!swiping) return;
        deltaX = e.touches[0].clientX - startX;
    }, { passive: true });
    viewportEl.addEventListener("touchend", function () {
        if (!swiping) return;
        swiping = false;
        if (Math.abs(deltaX) > 40) goTo(deltaX < 0 ? index + 1 : index - 1);
    });
})();

// ---------------------------------------------------------
// Real GitHub contribution calendar (public API, no token)
// Source: github-contributions-api.jogruber.de (CORS enabled)
// ---------------------------------------------------------
(function () {
    "use strict";
    var cal = document.getElementById("gh-cal");
    if (!cal) return;
    var totalEl = document.getElementById("gh-total");
    var shades = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

    function cell(level) {
        var s = document.createElement("span");
        s.style.background = shades[level] || shades[0];
        return s;
    }

    function fill(levels) {
        var frag = document.createDocumentFragment();
        levels.forEach(function (lvl) { frag.appendChild(cell(lvl)); });
        cal.innerHTML = "";
        cal.appendChild(frag);
    }

    function setTotal(n) {
        if (!totalEl || n == null) return;
        totalEl.setAttribute("data-gh-total", n);
        totalEl.setAttribute("data-i18n-gh", "true");
        var lang = document.documentElement.lang || "en";
        var enStr = n + " contributions in the last 6 months";
        var idStr = n + " kontribusi dalam 6 bulan terakhir";
        totalEl.textContent = lang === "id" ? idStr : enStr;
    }

    fetch("https://github-contributions-api.jogruber.de/v4/gfenderio?y=last")
        .then(function (r) { if (!r.ok) throw 0; return r.json(); })
        .then(function (d) {
            var c = d.contributions || [];
            var half = c.slice(-182);
            fill(half.map(function (x) { return x.level; }));
            var halfTotal = half.reduce(function(sum, x) { return sum + (x.count || 0); }, 0);
            setTotal(halfTotal);
        })
        .catch(function () {
            // The API is down, rate-limited, or blocked. Draw an empty grid and
            // say so.
            //
            // This previously filled the calendar with Math.random() levels so
            // the panel "never looks broken" — which meant a visitor could be
            // shown invented activity presented as a real GitHub history. A
            // blank week is honest; a fabricated one is not.
            var empty = [];
            for (var i = 0; i < 182; i++) empty.push(0);
            fill(empty);

            if (totalEl) {
                var lang = document.documentElement.lang || "en";
                totalEl.removeAttribute("data-gh-total");
                totalEl.textContent = lang === "id"
                    ? "Data kontribusi tidak bisa dimuat"
                    : "Contribution data unavailable";
            }
        });
})();

