(function () {
  document.documentElement.classList.remove("no-js");

  var header = document.getElementById("site-header");
  var hero = document.querySelector(".hero");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (header && hero && "IntersectionObserver" in window) {
    new IntersectionObserver(
      function (entries) {
        header.classList.toggle("scrolled", !entries[0].isIntersecting);
      },
      { rootMargin: "-72px 0px 0px 0px" }
    ).observe(hero);
  }

  if (toggle && header && nav) {
    var closeMenu = function () {
      header.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    };

    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  /* Intro quick-links: hovering (or focusing) a link swaps the copy column for
     an overview of that page; leaving the panel restores the default copy. */
  var introLinks = document.querySelector(".intro-links");
  var introPanels = document.querySelector(".intro-panels");

  if (introLinks && introPanels) {
    var panels = {};
    [].forEach.call(introPanels.querySelectorAll("[data-panel]"), function (panel) {
      panels[panel.getAttribute("data-panel")] = panel;
    });

    var activePanel = "default";

    var showPanel = function (key) {
      if (!panels[key] || key === activePanel) return;
      panels[activePanel].classList.remove("is-active");
      panels[activePanel].hidden = true;
      panels[key].hidden = false;
      panels[key].classList.add("is-active");
      activePanel = key;
    };

    var panelFor = function (target) {
      var link = target && target.closest ? target.closest("[data-intro-panel]") : null;
      return link ? link.getAttribute("data-intro-panel") : null;
    };

    introLinks.addEventListener("mouseover", function (event) {
      var key = panelFor(event.target);
      if (key) showPanel(key);
    });

    introLinks.addEventListener("focusin", function (event) {
      var key = panelFor(event.target);
      if (key) showPanel(key);
    });

    introLinks.addEventListener("mouseleave", function () {
      if (!introLinks.contains(document.activeElement)) showPanel("default");
    });

    introLinks.addEventListener("focusout", function () {
      window.setTimeout(function () {
        if (!introLinks.contains(document.activeElement)) showPanel("default");
      }, 0);
    });
  }

  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }
})();

/* Designer Color Series — customer color picker.
   Nine factory packages assign one color to each of three surfaces (roof,
   frame, deck); decking is an independent axis the buyer may override
   without changing roof and frame. State serializes to ?p=&deck= so a
   configuration is shareable. */
(function () {
  var picker = document.getElementById("color-picker");
  if (!picker) return;

  var COLORS = {
    charcoal: { name: "Charcoal", hex: "#3f4249" },
    mouse_gray: { name: "Mouse Gray", hex: "#727272" },
    granite_gray: { name: "Granite Gray", hex: "#a09fa4" },
    burnished_slate: { name: "Burnished Slate", hex: "#47372a" },
    hearthstone: { name: "Hearthstone", hex: "#7a5540" },
    buckskin: { name: "Buckskin", hex: "#c8ae9a" },
    silverstone: { name: "Silverstone", hex: "#d5d5d5" },
    galvalume: { name: "Galvalume", hex: "#b4b0b1" },
    hawaiian: { name: "Hawaiian Blue", hex: "#2e5773" },
    brown: { name: "Brown", hex: "#532e24" },
    black: { name: "Black", hex: "#212121" }
  };

  var PACKAGES = {
    greystone: {
      name: "Greystone",
      roof: "charcoal",
      frame: "mouse_gray",
      deck: "granite_gray",
      blurb: "Cool grays in three easy steps — the signature neutral of the series."
    },
    timberline: {
      name: "Timberline",
      roof: "burnished_slate",
      frame: "burnished_slate",
      deck: "hearthstone",
      blurb: "One rich brown from roof to frame, warmed by a Hearthstone deck."
    },
    woods_n_water: {
      name: "Woods-N-Water",
      roof: "burnished_slate",
      frame: "burnished_slate",
      deck: "buckskin",
      blurb: "A deep brown shell over a light Buckskin deck — the boldest contrast in the series."
    },
    silver_ridge: {
      name: "Silver Ridge",
      roof: "galvalume",
      frame: "burnished_slate",
      deck: "granite_gray",
      blurb: "Bare Galvalume metal shimmers above Burnished Slate framing."
    },
    savannah: {
      name: "Savannah",
      roof: "hawaiian",
      frame: "granite_gray",
      deck: "granite_gray",
      blurb: "Hawaiian Blue overhead — the only true color in the series — over quiet grays."
    },
    driftwood: {
      name: "Driftwood",
      roof: "burnished_slate",
      frame: "burnished_slate",
      deck: "granite_gray",
      blurb: "A Burnished Slate shell grounded by a cool Granite Gray deck."
    },
    charleston: {
      name: "Charleston",
      roof: "galvalume",
      frame: "black",
      deck: "granite_gray",
      blurb: "Galvalume roof over a black frame — crisp, coastal, modern."
    },
    cedar_creek: {
      name: "Cedar Creek",
      roof: "brown",
      frame: "hearthstone",
      deck: "buckskin",
      blurb: "Warm browns that step lighter from roof to deck."
    },
    blackstone: {
      name: "Blackstone",
      roof: "black",
      frame: "black",
      deck: "hearthstone",
      blurb: "Black roof and frame, ready for any of the four decking colors."
    }
  };

  var state = { pkg: "greystone", deck: null };

  var els = {
    name: document.getElementById("preview-name"),
    blurb: document.getElementById("preview-blurb"),
    diagramRoof: document.getElementById("diagram-roof"),
    diagramDeck: document.getElementById("diagram-deck"),
    diagramFrame: document.getElementById("diagram-frame"),
    chipRoof: document.getElementById("chip-roof"),
    chipFrame: document.getElementById("chip-frame"),
    chipDeck: document.getElementById("chip-deck"),
    nameRoof: document.getElementById("name-roof"),
    nameFrame: document.getElementById("name-frame"),
    nameDeck: document.getElementById("name-deck"),
    deckNote: document.getElementById("deck-note"),
    plateImg: document.getElementById("plate-img"),
    plateCaption: document.getElementById("plate-caption"),
    ctaName: document.getElementById("cta-name")
  };

  function plateSrc(id) {
    return "assets/images/" + id.replace(/_/g, "-") + "-swatch.jpg";
  }

  function plateAlt(id) {
    var pkg = PACKAGES[id];
    var alt =
      pkg.name +
      " swatch plate: " +
      COLORS[pkg.roof].name +
      " roof, " +
      COLORS[pkg.frame].name +
      " frame, " +
      COLORS[pkg.deck].name +
      " decking";
    if (id === "blackstone") {
      alt += ", plus Granite Gray, Buckskin, and Silverstone decking options";
    }
    return alt + ".";
  }

  function setPressed(buttons, attr, current) {
    buttons.forEach(function (btn) {
      var on = btn.getAttribute(attr) === current;
      btn.classList.toggle("is-selected", on);
      btn.setAttribute("aria-pressed", String(on));
    });
  }

  function render(updateUrl) {
    var pkg = PACKAGES[state.pkg];
    var deckKey = state.deck || pkg.deck;
    var roof = COLORS[pkg.roof];
    var frame = COLORS[pkg.frame];
    var deck = COLORS[deckKey];
    var overridden = deckKey !== pkg.deck;

    setPressed(packageButtons, "data-package", state.pkg);
    setPressed(deckButtons, "data-deck", deckKey);

    els.name.textContent = pkg.name;
    els.blurb.textContent = pkg.blurb;
    els.ctaName.textContent = pkg.name;

    els.diagramRoof.style.background = roof.hex;
    els.diagramFrame.style.background = frame.hex;
    els.diagramDeck.style.backgroundColor = deck.hex;

    els.chipRoof.style.background = roof.hex;
    els.chipFrame.style.background = frame.hex;
    els.chipDeck.style.background = deck.hex;
    els.nameRoof.textContent = roof.name;
    els.nameFrame.textContent = frame.name;
    els.nameDeck.textContent = deck.name;
    els.deckNote.hidden = !overridden;

    els.plateImg.width = 1050;
    els.plateImg.height = state.pkg === "blackstone" ? 683 : 375;
    els.plateImg.src = plateSrc(state.pkg);
    els.plateImg.alt = plateAlt(state.pkg);
    els.plateCaption.textContent = overridden
      ? "Plate shows the standard " +
        COLORS[pkg.deck].name +
        " decking — your " +
        deck.name +
        " decking is previewed above."
      : "Factory swatch plate, shown with the standard " +
        deck.name +
        " decking.";

    if (updateUrl && "URLSearchParams" in window && history.replaceState) {
      var params = new URLSearchParams(window.location.search);
      params.set("p", state.pkg);
      if (overridden) {
        params.set("deck", deckKey);
      } else {
        params.delete("deck");
      }
      history.replaceState(
        null,
        "",
        window.location.pathname + "?" + params.toString() + window.location.hash
      );
    }
  }

  var packageButtons = [].slice.call(picker.querySelectorAll("[data-package]"));
  var deckButtons = [].slice.call(picker.querySelectorAll("[data-deck]"));
  var preloaded = {};

  picker.addEventListener("click", function (event) {
    var packageBtn = event.target.closest("[data-package]");
    if (packageBtn) {
      state.pkg = packageBtn.getAttribute("data-package");
      state.deck = null;
      render(true);
      return;
    }
    var deckBtn = event.target.closest("[data-deck]");
    if (deckBtn) {
      state.deck = deckBtn.getAttribute("data-deck");
      render(true);
    }
  });

  picker.addEventListener("pointerover", function (event) {
    var btn = event.target.closest("[data-package]");
    if (!btn) return;
    var id = btn.getAttribute("data-package");
    if (preloaded[id]) return;
    preloaded[id] = true;
    new Image().src = plateSrc(id);
  });

  if ("URLSearchParams" in window) {
    var params = new URLSearchParams(window.location.search);
    var pkgParam = params.get("p");
    var deckParam = params.get("deck");
    if (pkgParam && PACKAGES[pkgParam]) state.pkg = pkgParam;
    if (deckParam && COLORS[deckParam] && isDeckOption(deckParam)) {
      state.deck = deckParam === PACKAGES[state.pkg].deck ? null : deckParam;
    }
    if (pkgParam || deckParam) render(false);
  }

  function isDeckOption(key) {
    return deckButtons.some(function (btn) {
      return btn.getAttribute("data-deck") === key;
    });
  }
})();

/* Gallery lightbox — opens any .gallery-open button in an overlay with the
   photo's caption, prev/next arrows, keyboard (arrows + Esc) and swipe. */
(function () {
  var box = document.getElementById("lightbox");
  var triggers = [].slice.call(document.querySelectorAll(".gallery-open"));
  if (!box || !triggers.length) return;

  var img = document.getElementById("lightbox-img");
  var caption = document.getElementById("lightbox-caption");
  var counter = document.getElementById("lightbox-index");
  var prevBtn = box.querySelector("[data-lightbox-prev]");
  var nextBtn = box.querySelector("[data-lightbox-next]");
  var closeBtn = box.querySelector(".lightbox-close");

  var slides = triggers.map(function (trigger) {
    var figure = trigger.closest("figure");
    var figcaption = figure ? figure.querySelector("figcaption") : null;
    var photo = trigger.querySelector("img");
    return {
      trigger: trigger,
      src: photo ? photo.getAttribute("src") : "",
      alt: photo ? photo.getAttribute("alt") : "",
      caption: figcaption ? figcaption.innerHTML : ""
    };
  });

  var current = 0;
  var lastFocus = null;

  function preload(i) {
    var slide = slides[i];
    if (slide && !slide.preloaded) {
      slide.preloaded = true;
      new Image().src = slide.src;
    }
  }

  function show(i) {
    current = (i + slides.length) % slides.length;
    var slide = slides[current];
    img.src = slide.src;
    img.alt = slide.alt;
    caption.innerHTML = slide.caption;
    counter.textContent = String(current + 1);
    preload(current + 1 < slides.length ? current + 1 : 0);
    preload(current - 1 >= 0 ? current - 1 : slides.length - 1);
  }

  function open(i) {
    lastFocus = document.activeElement;
    box.hidden = false;
    box.classList.add("is-open");
    document.body.classList.add("lightbox-open");
    show(i);
    closeBtn.focus();
  }

  function close() {
    box.hidden = true;
    box.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
    img.removeAttribute("src");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  triggers.forEach(function (trigger, i) {
    trigger.addEventListener("click", function () {
      open(i);
    });
  });

  box.addEventListener("click", function (event) {
    if (event.target.closest("[data-lightbox-close]")) return close();
    if (event.target.closest("[data-lightbox-prev]")) return show(current - 1);
    if (event.target.closest("[data-lightbox-next]")) return show(current + 1);
  });

  document.addEventListener("keydown", function (event) {
    if (box.hidden) return;
    if (event.key === "Escape") {
      close();
    } else if (event.key === "ArrowLeft") {
      show(current - 1);
    } else if (event.key === "ArrowRight") {
      show(current + 1);
    } else if (event.key === "Tab") {
      /* Keep focus inside the overlay while it is open. */
      var focusable = [prevBtn, nextBtn, closeBtn];
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (focusable.indexOf(document.activeElement) === -1) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  var touchX = null;
  box.addEventListener(
    "touchstart",
    function (event) {
      touchX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );

  box.addEventListener(
    "touchend",
    function (event) {
      if (touchX === null) return;
      var dx = event.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 45) show(current + (dx < 0 ? 1 : -1));
    },
    { passive: true }
  );
})();
