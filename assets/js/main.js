document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-navigation]");
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = [...document.querySelectorAll("main section[id]")];

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
};

const closeMenu = () => {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

menuToggle?.addEventListener("click", () => {
  const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  navigation?.classList.toggle("is-open", willOpen);
  document.body.classList.toggle("menu-open", willOpen);
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -5%" },
);

document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-30% 0px -60%", threshold: 0 },
);

sections.forEach((section) => sectionObserver.observe(section));

document.querySelector("[data-year]").textContent = new Date().getFullYear();
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
