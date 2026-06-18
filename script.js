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
            // Soft fallback so the panel never looks broken offline
            var list = [];
            for (var i = 0; i < 182; i++) {
                var r = Math.random();
                list.push(r > 0.85 ? 4 : r > 0.7 ? 3 : r > 0.52 ? 2 : r > 0.36 ? 1 : 0);
            }
            fill(list);
        });
})();

// ---------------------------------------------------------
// Rotating Impact Metrics
// ---------------------------------------------------------
(function () {
    "use strict";
    var numEl = document.getElementById("impact-num");
    var labelEl = document.getElementById("impact-label");
    if (!numEl || !labelEl) return;

    var index = 0;
    var totalMetrics = 3;
    var raf = 0;
    var reduceMotion = window.matchMedia
        && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Parse an authored value like "1,000+", "1.000+", "100%", "<1%" into
    // its numeric target and locale separator, so we can roll the number up
    // and then snap back to the exact authored string (prefix/suffix intact).
    function parse(str) {
        var raw = String(str).replace(/[^0-9.,]/g, "");
        var sep = raw.indexOf(",") > -1 ? "," : (raw.indexOf(".") > -1 ? "." : "");
        var num = parseInt(raw.replace(/[.,]/g, ""), 10);
        // A "less than" value (e.g. "<1%") reads better counting DOWN —
        // it tells the "error rate dropped to under 1%" story.
        var down = /^\s*</.test(String(str));
        return { num: isNaN(num) ? 0 : num, sep: sep, full: str, down: down };
    }

    function group(n, sep) {
        if (!sep) return String(n);
        return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    }

    // Roll the number toward its target, then settle on the exact authored
    // string. Up-counts start at 0; "<" values count down from ~30.
    function countTo(target, sep, full, down) {
        if (raf) cancelAnimationFrame(raf);
        var from = down ? Math.max(target + 25, 30) : 0;
        if (reduceMotion || (!down && target <= 0)) { numEl.textContent = full; return; }

        var dur = 1000, start = 0;
        function tick(now) {
            if (!start) start = now;
            var t = Math.min(1, (now - start) / dur);
            var eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            if (t < 1) {
                var v = Math.round(from + (target - from) * eased);
                numEl.textContent = group(v, sep);
                raf = requestAnimationFrame(tick);
            } else {
                numEl.textContent = full; // exact prefix/suffix/format
            }
        }
        raf = requestAnimationFrame(tick);
    }

    function render(dict, animate) {
        var meta = parse(dict["act.impact_" + index + "_num"]);
        var label = dict["act.impact_" + index + "_label"];

        if (animate === false) {
            numEl.textContent = meta.full;
            labelEl.textContent = label;
            return;
        }

        // Label cross-fades; number rolls up.
        labelEl.classList.remove("swap-in");
        labelEl.classList.add("swap-out");
        setTimeout(function () {
            labelEl.textContent = label;
            labelEl.classList.remove("swap-out");
            void labelEl.offsetWidth;
            labelEl.classList.add("swap-in");
        }, 200);

        countTo(meta.num, meta.sep, meta.full, meta.down);
    }

    function updateMetric(langOverride, animate) {
        if (typeof translations === "undefined") return;
        var lang = langOverride || document.documentElement.lang || "en";
        var dict = translations[lang] || translations["en"];
        render(dict, animate);
    }

    // First paint without animating
    setTimeout(function () { updateMetric(undefined, false); }, 100);

    // Rotate — long enough to read, short enough to feel alive
    setInterval(function () {
        index = (index + 1) % totalMetrics;
        updateMetric();
    }, 4000);

    // Re-render current metric in the new language (keeps separator correct)
    document.addEventListener("langToggled", function (e) {
        updateMetric(e.detail, false);
    });
})();
