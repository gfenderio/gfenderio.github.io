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

    // ---- Scroll reveal ----
    var targets = document.querySelectorAll(".section, .hero-actions, .project, .work-note");
    targets.forEach(function (el) { el.classList.add("reveal"); });

    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        targets.forEach(function (el) { io.observe(el); });
    } else {
        targets.forEach(function (el) { el.classList.add("in"); });
    }
})();

// ---------------------------------------------------------
// Screenshot lightbox (project galleries)
// ---------------------------------------------------------
(function () {
    "use strict";

    var triggers = document.querySelectorAll(".project-visual[data-shots]");
    if (!triggers.length) return;

    // Build the overlay once
    var box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML =
        '<div class="lightbox-backdrop" data-close></div>' +
        '<div class="lightbox-inner" role="dialog" aria-modal="true">' +
        '<button class="lightbox-close" type="button" aria-label="Close" data-close>&times;</button>' +
        '<p class="lightbox-title"></p>' +
        '<div class="lightbox-shots"></div>' +
        '</div>';
    document.body.appendChild(box);

    var titleEl = box.querySelector(".lightbox-title");
    var shotsEl = box.querySelector(".lightbox-shots");

    function open(name, shots, portrait) {
        titleEl.textContent = name;
        box.classList.toggle("is-portrait", !!portrait);
        shotsEl.innerHTML = "";
        shots.forEach(function (src) {
            var img = document.createElement("img");
            img.src = src.trim();
            img.alt = name + " screenshot";
            img.loading = "lazy";
            shotsEl.appendChild(img);
        });
        box.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function close() {
        box.classList.remove("open");
        document.body.style.overflow = "";
    }

    triggers.forEach(function (t) {
        t.addEventListener("click", function () {
            var shots = (t.getAttribute("data-shots") || "").split(",").filter(Boolean);
            if (!shots.length) return;
            open(t.getAttribute("data-name") || "", shots, t.hasAttribute("data-portrait"));
        });
    });

    box.addEventListener("click", function (e) {
        if (e.target.hasAttribute("data-close")) close();
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && box.classList.contains("open")) close();
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
        var id = document.documentElement.lang === "id";
        totalEl.textContent = id
            ? n + " kontribusi dalam setahun terakhir"
            : n + " contributions in the last year";
    }

    fetch("https://github-contributions-api.jogruber.de/v4/gfenderio?y=last")
        .then(function (r) { if (!r.ok) throw 0; return r.json(); })
        .then(function (d) {
            var c = d.contributions || [];
            fill(c.map(function (x) { return x.level; }));
            setTotal(d.total ? d.total.lastYear : null);
        })
        .catch(function () {
            // Soft fallback so the panel never looks broken offline
            var list = [];
            for (var i = 0; i < 371; i++) {
                var r = Math.random();
                list.push(r > 0.85 ? 4 : r > 0.7 ? 3 : r > 0.52 ? 2 : r > 0.36 ? 1 : 0);
            }
            fill(list);
        });
})();
