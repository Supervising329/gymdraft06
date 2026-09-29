(() => {
  "use strict";

  const trackEvent = (name, data = {}) => {
    if (typeof window.va === "function") window.va("event", { name, data });
  };

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const closeNav = () => {
    if (!navToggle || !navMenu) return;
    navToggle.classList.remove("open");
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  };

  navToggle?.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") !== "true";
    navToggle.classList.toggle("open", open);
    navMenu?.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  navMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeNav();
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      button.closest(".faq-item")?.classList.toggle("open", !expanded);
    });
  });

  const backToTop = document.querySelector(".back-to-top");
  const updateBackToTop = () => backToTop?.classList.toggle("show", window.scrollY > 500);
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  const form = document.querySelector("[data-consultation-form]");
  if (!form) return;

  const status = form.querySelector(".form-status");
  const submit = form.querySelector('[type="submit"]');
  const params = new URLSearchParams(window.location.search);
  const selectedProgram = params.get("program");
  const focus = form.querySelector('[name="training_focus"]');
  if (selectedProgram && focus) {
    const matchingOption = Array.from(focus.options).find((option) => option.textContent.toLowerCase().includes(selectedProgram.toLowerCase().replace(" coaching", "").replace(" training", "")));
    if (matchingOption) focus.value = matchingOption.value;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    submit.disabled = true;
    submit.textContent = "Sending...";
    status.textContent = "Sending your consultation request.";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      status.textContent = "Thank you for requesting a consultation. Tory and John received your information and will contact you by email to discuss your goals and next steps.";
      status.classList.add("success");
      status.focus();
      trackEvent("consultation_submitted", { page: window.location.pathname || "/" });
    } catch {
      status.textContent = "We could not send the form. Please email torycurtismassage@comcast.net instead.";
      status.classList.remove("success");
      status.focus();
    } finally {
      submit.disabled = false;
      submit.textContent = "Send consultation request";
    }
  });
})();
