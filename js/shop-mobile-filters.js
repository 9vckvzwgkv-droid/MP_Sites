(() => {
  "use strict";

  const layout = document.querySelector(".shop-layout");
  const openButton = document.querySelector("[data-shop-filter-open]");
  const overlay = document.querySelector("[data-shop-filter-overlay]");
  const closeButton = document.querySelector("[data-shop-filter-close]");
  const filters = document.querySelector(".filters");

  if (!layout || !openButton || !overlay || !filters) return;

  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  function setOpen(open) {
    if (!isMobile()) open = false;
    layout.classList.toggle("filter-drawer-open", open);
    openButton.setAttribute("aria-expanded", String(open));
    overlay.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("shop-filter-lock", open);
  }

  openButton.addEventListener("click", () => setOpen(true));
  closeButton.addEventListener("click", () => setOpen(false));
  overlay.addEventListener("click", () => setOpen(false));

  filters.addEventListener("click", (event) => {
    if (event.target.closest(".filters::after")) return;
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  window.addEventListener("resize", () => {
    if (!isMobile()) setOpen(false);
  });

  filters.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      if (isMobile()) setOpen(false);
    });
  });
})();
