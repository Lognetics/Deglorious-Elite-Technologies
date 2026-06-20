/* ==========================================================================
   Deglorious Elite Technologies — site interactions
   ========================================================================== */
(function () {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const PHONE = "09076742767";
  const WA = "2349076742767"; // Nigeria intl format for wa.me
  const EMAIL = "deglorioustechnologies@gmail.com";

  /* ---------- Sticky header shadow ---------- */
  const header = $(".site-header");
  const onScroll = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 10);
    const tt = $(".to-top");
    if (tt) tt.classList.toggle("show", window.scrollY > 520);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  const toggle = $(".nav__toggle");
  const scrim = $(".nav__scrim");
  const closeNav = () => document.body.classList.remove("nav-open");
  if (toggle) {
    toggle.addEventListener("click", () => document.body.classList.toggle("nav-open"));
  }
  if (scrim) scrim.addEventListener("click", closeNav);
  $$(".nav__links a").forEach((a) => a.addEventListener("click", closeNav));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeNav(); });

  /* ---------- Active nav link by filename ---------- */
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$(".nav__links a").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === page || (page === "" && href === "index.html")) a.classList.add("active");
  });

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Testimonials slider ---------- */
  const track = $(".ttrack");
  if (track) {
    const cards = $$(".tcard", track);
    const dotsWrap = $(".tnav");
    let i = 0, timer;
    cards.forEach((_, idx) => {
      const b = document.createElement("button");
      b.className = "tdot" + (idx === 0 ? " active" : "");
      b.setAttribute("aria-label", "Go to testimonial " + (idx + 1));
      b.addEventListener("click", () => { go(idx); rest(); });
      if (dotsWrap) dotsWrap.appendChild(b);
    });
    const dots = $$(".tdot");
    const go = (n) => {
      i = (n + cards.length) % cards.length;
      track.style.transform = `translateX(-${i * 100}%)`;
      dots.forEach((d, k) => d.classList.toggle("active", k === i));
    };
    const next = () => go(i + 1);
    const prev = () => go(i - 1);
    const auto = () => { timer = setInterval(next, 6000); };
    const rest = () => { clearInterval(timer); auto(); };
    const nb = $(".tarrows .next"), pb = $(".tarrows .prev");
    if (nb) nb.addEventListener("click", () => { next(); rest(); });
    if (pb) pb.addEventListener("click", () => { prev(); rest(); });
    track.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
    auto();
  }

  /* ---------- FAQ accordion ---------- */
  $$(".faq-item").forEach((item) => {
    const q = $(".faq-q", item);
    const a = $(".faq-a", item);
    if (!q || !a) return;
    q.addEventListener("click", () => {
      const open = item.classList.contains("open");
      if (open) { item.classList.remove("open"); a.style.maxHeight = null; }
      else { item.classList.add("open"); a.style.maxHeight = a.scrollHeight + "px"; }
    });
  });

  /* ---------- FAQ search ---------- */
  const faqSearch = $("#faqSearch");
  if (faqSearch) {
    const empty = $(".faq-empty");
    faqSearch.addEventListener("input", () => {
      const term = faqSearch.value.trim().toLowerCase();
      let visible = 0;
      $$(".faq-item").forEach((item) => {
        const txt = item.textContent.toLowerCase();
        const show = txt.includes(term);
        item.style.display = show ? "" : "none";
        if (show) visible++;
      });
      $$(".faq-cat").forEach((cat) => {
        const any = $$(".faq-item", cat).some((it) => it.style.display !== "none");
        cat.style.display = any ? "" : "none";
      });
      if (empty) empty.style.display = visible === 0 ? "block" : "none";
    });
  }

  /* ---------- Project / gallery filters ---------- */
  const filterBtns = $$(".filters button");
  if (filterBtns.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter;
        $$(".gitem, .filterable").forEach((it) => {
          const show = f === "all" || it.dataset.cat === f;
          it.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---------- Lightbox ---------- */
  const lb = $(".lightbox");
  if (lb) {
    const lbImg = $("img", lb);
    const lbCap = $(".lightbox__cap", lb);
    let items = [], cur = 0;
    const open = (idx) => {
      items = $$(".gitem:not([style*='display: none']) img");
      cur = idx; show(); lb.classList.add("open"); document.body.style.overflow = "hidden";
    };
    const show = () => {
      const el = items[cur];
      if (!el) return;
      lbImg.src = el.src;
      if (lbCap) lbCap.textContent = el.getAttribute("data-cap") || el.alt || "";
    };
    const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
    $$(".gitem").forEach((g, idx) => g.addEventListener("click", () => {
      const visibleImgs = $$(".gitem:not([style*='display: none']) img");
      const target = $("img", g);
      open(Math.max(0, visibleImgs.indexOf(target)));
    }));
    $(".lightbox__close", lb).addEventListener("click", close);
    $(".lightbox__nav .next", lb).addEventListener("click", () => { cur = (cur + 1) % items.length; show(); });
    $(".lightbox__nav .prev", lb).addEventListener("click", () => { cur = (cur - 1 + items.length) % items.length; show(); });
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") { cur = (cur + 1) % items.length; show(); }
      if (e.key === "ArrowLeft") { cur = (cur - 1 + items.length) % items.length; show(); }
    });
  }

  /* ---------- Forms (book + contact) -> open WhatsApp/email with prefilled message ---------- */
  $$("form[data-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const data = new FormData(form);
      const type = form.dataset.form;
      let lines = [];
      if (type === "book") {
        lines.push("*New Service Booking — Deglorious Elite Technologies*");
        lines.push("Name: " + (data.get("name") || ""));
        lines.push("Phone: " + (data.get("phone") || ""));
        lines.push("Email: " + (data.get("email") || ""));
        lines.push("Service: " + (data.get("service") || ""));
        lines.push("Preferred contact: " + (data.get("contact") || ""));
        lines.push("Details: " + (data.get("message") || ""));
      } else {
        lines.push("*New Enquiry — Deglorious Elite Technologies*");
        lines.push("Name: " + (data.get("name") || ""));
        lines.push("Email: " + (data.get("email") || ""));
        lines.push("Phone: " + (data.get("phone") || ""));
        lines.push("Message: " + (data.get("message") || ""));
      }
      const text = encodeURIComponent(lines.join("\n"));
      const success = $(".form-success", form);
      if (success) {
        success.classList.add("show");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      // Open WhatsApp chat prefilled (primary channel for this business)
      window.open(`https://wa.me/${WA}?text=${text}`, "_blank", "noopener");
      form.reset();
    });
  });

  /* ---------- Product / project inquiry buttons ---------- */
  $$("[data-inquire]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const item = btn.dataset.inquire;
      const text = encodeURIComponent(`Hello Deglorious Elite Technologies, I'd like to enquire about: ${item}.`);
      window.open(`https://wa.me/${WA}?text=${text}`, "_blank", "noopener");
    });
  });

  /* ---------- Footer year ---------- */
  const yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Pause off-screen showcase videos to save resources ---------- */
  const vids = $$(".vframe video");
  if (vids.length && "IntersectionObserver" in window) {
    const vio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const v = en.target;
        if (en.isIntersecting) { v.play().catch(() => {}); }
        else { v.pause(); }
      });
    }, { threshold: 0.25 });
    vids.forEach((v) => vio.observe(v));
  }
})();
