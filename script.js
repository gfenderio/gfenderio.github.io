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
