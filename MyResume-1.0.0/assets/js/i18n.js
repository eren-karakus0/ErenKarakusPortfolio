/**
 * Bilingual toggle (EN / TR) + typed.js re-init
 *
 * - Default: EN
 * - Lang state persists in localStorage
 * - Accepts ?lang=tr URL param on first load
 * - Drives html[data-lang] which CSS uses to show/hide lang="en|tr" blocks
 */
(function () {
    "use strict";

    var STORAGE_KEY = "mek-lang";
    var DEFAULT_LANG = "en";
    var SUPPORTED = ["en", "tr"];

    function resolveInitialLang() {
        var urlLang = new URLSearchParams(window.location.search).get("lang");
        if (SUPPORTED.indexOf(urlLang) !== -1) return urlLang;
        var saved = localStorage.getItem(STORAGE_KEY);
        if (SUPPORTED.indexOf(saved) !== -1) return saved;
        return DEFAULT_LANG;
    }

    function updateButtons(lang) {
        document.querySelectorAll(".lang-btn").forEach(function (btn) {
            var target = btn.getAttribute("data-lang-target");
            btn.classList.toggle("active", target === lang);
        });
    }

    var typedInstance = null;
    function reinitTyped(lang) {
        var el = document.querySelector(".typed");
        if (!el || typeof Typed === "undefined") return;
        var raw = el.getAttribute("data-typed-items-" + lang);
        if (!raw) return;
        var strings = raw.split(",").map(function (s) { return s.trim(); });
        if (typedInstance && typeof typedInstance.destroy === "function") {
            typedInstance.destroy();
            el.textContent = "";
        }
        typedInstance = new Typed(".typed", {
            strings: strings,
            loop: true,
            typeSpeed: 70,
            backSpeed: 40,
            backDelay: 2500
        });
    }

    function applyLang(lang, opts) {
        if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
        document.documentElement.setAttribute("data-lang", lang);
        document.documentElement.lang = lang;
        localStorage.setItem(STORAGE_KEY, lang);
        updateButtons(lang);
        if (!opts || opts.reinitTyped !== false) {
            reinitTyped(lang);
        }
    }

    // Apply as early as possible (avoid FOUC). Script is at end of <body>.
    var initial = resolveInitialLang();
    applyLang(initial, { reinitTyped: false });

    // Wire up buttons + typed on load
    window.addEventListener("load", function () {
        updateButtons(document.documentElement.getAttribute("data-lang"));

        document.querySelectorAll(".lang-btn").forEach(function (btn) {
            btn.addEventListener("click", function () {
                var target = btn.getAttribute("data-lang-target");
                if (target) applyLang(target);
            });
        });

        reinitTyped(document.documentElement.getAttribute("data-lang"));

        // Initialize AOS on sub-pages (main page initializes AOS via main.js)
        if (typeof AOS !== "undefined" && !window.__aosInited) {
            AOS.init({
                duration: 650,
                easing: "ease-out-cubic",
                once: true,
                mirror: false,
                offset: 80
            });
            window.__aosInited = true;
        }
    });
})();
