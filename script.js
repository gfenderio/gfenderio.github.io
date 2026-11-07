// ---------------------------------------------------------
// Gilang Fenderio — portfolio interactions
// Language toggle (EN/ID) and the screenshot viewer. Scroll motion
// lives in motion.js.
// ---------------------------------------------------------

(function () {
    "use strict";

    // Current year in footer
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ---- Language ----
    // persist = false for a language that came from the link (?lang=), so a
    // shared link never overwrites the visitor's own saved choice.
    function applyLanguage(lang, persist) {
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
            if (val == null) return;
            el.placeholder = val;
            el.setAttribute("aria-label", val);
        });

        if (dict["doc.title"]) document.title = dict["doc.title"];
        document.documentElement.lang = lang;
        if (persist !== false) {
            try { localStorage.setItem("lang", lang); } catch (e) { }
        }
        updateLangButton(lang);

        document.documentElement.classList.remove("lang-pending");
        document.dispatchEvent(new CustomEvent("langToggled", { detail: lang }));
    }

    function updateLangButton(lang) {
        var btn = document.getElementById("lang-btn");
        if (!btn) return;
        var enCls = lang === "en" ? "on" : "off";
        var idCls = lang === "id" ? "on" : "off";
        btn.innerHTML = '<span class="' + enCls + '">EN</span> / <span class="' + idCls + '">ID</span>';
        // Screen readers hear the current language and what the button does.
        btn.setAttribute("aria-label", lang === "id"
            ? "Bahasa: Indonesia. Ganti ke English"
            : "Language: English. Switch to Indonesian");
    }

    // ?lang=id in the link wins, so an Indonesian version can be shared.
    var saved = "en";
    try { saved = localStorage.getItem("lang") || "en"; } catch (e) { }
    var asked = (location.search.match(/[?&]lang=(en|id)(?![a-z])/) || [])[1];
    applyLanguage(asked || saved, !asked);

    var langBtn = document.getElementById("lang-btn");
    if (langBtn) {
        langBtn.addEventListener("click", function () {
            var next = (document.documentElement.lang === "id") ? "en" : "id";
            applyLanguage(next);
            // A manual choice wins over the link: drop ?lang= so a reload keeps it.
            if (asked && window.history && history.replaceState) {
                var q = location.search.replace(/([?&])lang=(en|id)(?![a-z])&?/, "$1").replace(/[?&]$/, "");
                history.replaceState(null, "", location.pathname + q + location.hash);
                asked = null;
            }
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
        '<div class="lightbox-inner" data-lenis-prevent role="dialog" aria-modal="true" aria-labelledby="lightbox-title">' +
        '<button class="lightbox-close" type="button" aria-label="Close" data-close>&times;</button>' +
        '<p class="lightbox-title" id="lightbox-title"></p>' +
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
        '<div class="lightbox-dots"></div>' +
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

    // The viewer's own labels follow the page language.
    var WORDS = {
        en: { close: "Close", prev: "Previous screenshot", next: "Next screenshot", shot: "screenshot", go: "Go to screenshot" },
        id: { close: "Tutup", prev: "Screenshot sebelumnya", next: "Screenshot berikutnya", shot: "screenshot", go: "Ke screenshot" }
    };

    function words() {
        return WORDS[document.documentElement.lang] || WORDS.en;
    }

    function render() {
        trackEl.style.transform = "translateX(-" + (index * 100) + "%)";
        var dots = dotsEl.children;
        for (var i = 0; i < dots.length; i++) {
            dots[i].classList.toggle("is-active", i === index);
            if (i === index) dots[i].setAttribute("aria-current", "true");
            else dots[i].removeAttribute("aria-current");
        }
        if (counterEl) counterEl.textContent = total ? (index + 1) + " / " + total : "";
    }

    function goTo(i) {
        if (total < 1) return;
        index = (i + total) % total;
        render();
    }

    // The button that opened the gallery, so focus can go back to it.
    var opener = null;

    function open(name, shots, portrait) {
        var w = words();
        opener = document.activeElement;
        titleEl.textContent = name;
        box.querySelector(".lightbox-close").setAttribute("aria-label", w.close);
        prevBtn.setAttribute("aria-label", w.prev);
        nextBtn.setAttribute("aria-label", w.next);
        // A wide shot that pans on phones always starts at its left edge.
        viewportEl.scrollLeft = 0;
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
            img.alt = name + " " + w.shot + " " + (i + 1);
            img.loading = i === 0 ? "eager" : "lazy";
            slide.appendChild(img);
            trackEl.appendChild(slide);

            var dot = document.createElement("button");
            dot.type = "button";
            dot.className = "lightbox-dot";
            dot.setAttribute("aria-label", w.go + " " + (i + 1));
            (function (j) { dot.addEventListener("click", function () { goTo(j); }); })(i);
            dotsEl.appendChild(dot);
        });

        box.classList.toggle("is-single", total < 2);
        render();
        box.classList.add("open");
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        // Momentum scrolling ignores body overflow, so it has to be told.
        if (window.__lenis) window.__lenis.stop();
        // Keyboard users start inside the dialog, on its close button.
        var closeBtn = box.querySelector(".lightbox-close");
        if (closeBtn) closeBtn.focus({ preventScroll: true });
    }

    // Tab and Shift+Tab cycle through the dialog's own buttons only.
    function trapFocus(e) {
        var items = Array.prototype.filter.call(
            box.querySelectorAll("button"),
            function (b) { return b.offsetParent !== null && !b.disabled; }
        );
        if (!items.length) return;
        var first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        else if (!box.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    }

    function close() {
        box.classList.remove("open");
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        if (window.__lenis) window.__lenis.start();
        if (opener && opener.focus) opener.focus({ preventScroll: true });
        opener = null;
    }

    triggers.forEach(function (t) {
        t.addEventListener("click", function () {
            var shots = (t.getAttribute("data-shots") || "").split(",").filter(Boolean);
            if (!shots.length) return;
            var lang = document.documentElement.lang;
            var name = t.getAttribute("data-name-" + lang) || t.getAttribute("data-name") || "";
            open(name, shots, t.hasAttribute("data-portrait"));
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
        else if (e.key === "Tab") trapFocus(e);
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
// Contact form: sent in place, with the result shown under the
// button, instead of leaving the site for Formspree's own page.
// Without script the form still posts the normal way.
// ---------------------------------------------------------
(function () {
    "use strict";

    var form = document.querySelector(".contact-form");
    if (!form || !form.getAttribute("action") || !window.fetch || !window.FormData) return;

    var status = form.querySelector(".form-status");
    var button = form.querySelector('button[type="submit"]');

    function say(key, state) {
        var dict = (typeof translations !== "undefined" && translations[document.documentElement.lang]) || {};
        var fallback = { "contact.sending": "Sending…", "contact.sent": "Thanks, your message is on its way.", "contact.failed": "The message did not go through. Please email gilang@fenderio.com." };
        if (status) {
            status.textContent = dict[key] || fallback[key];
            status.setAttribute("data-state", state);
        }
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        // A bot filled the hidden field: act as if it worked, send nothing.
        var trap = form.querySelector('input[name="_gotcha"]');
        if (trap && trap.value) { form.reset(); say("contact.sent", "ok"); return; }

        if (button) button.disabled = true;
        say("contact.sending", "busy");
        fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { Accept: "application/json" }
        }).then(function (res) {
            if (!res.ok) throw new Error(String(res.status));
            form.reset();
            say("contact.sent", "ok");
        }).catch(function () {
            say("contact.failed", "error");
        }).then(function () {
            if (button) button.disabled = false;
        });
    });
})();
