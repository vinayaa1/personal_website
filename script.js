const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");
const validPages = ["home", "organizations", "projects", "resume", "contact"];

function showPage(name) {
  const target = validPages.includes(name) ? name : "home";
  pages.forEach(function (page) {
    page.classList.toggle("is-active", page.dataset.page === target);
  });
  navLinks.forEach(function (link) {
    link.classList.toggle("is-active", link.dataset.page === target);
  });
  window.scrollTo(0, 0);
}

function currentHash() {
  return window.location.hash.replace("#", "").trim();
}

window.addEventListener("hashchange", function () {
  showPage(currentHash());
});

document.addEventListener("DOMContentLoaded", function () {
  showPage(currentHash());
});

const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;
const storedTheme = localStorage.getItem("theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

if (storedTheme) {
  root.setAttribute("data-theme", storedTheme);
} else if (prefersLight) {
  root.setAttribute("data-theme", "light");
} else {
  root.setAttribute("data-theme", "dark");
}

themeToggle.setAttribute("aria-pressed", root.getAttribute("data-theme") === "light");
themeToggle.setAttribute("aria-label", root.getAttribute("data-theme") === "light" ? "switch to dark mode!!" : "switch to light mode!!");

themeToggle.addEventListener("click", function () {
  const isLight = root.getAttribute("data-theme") === "light";
  const next = isLight ? "dark" : "light";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  themeToggle.setAttribute("aria-pressed", next === "light");
  themeToggle.setAttribute("aria-label", next === "light" ? "switch to dark mode!!" : "switch to light mode!!");
});

const orgCards = document.querySelectorAll(".org-card");

orgCards.forEach(function (card) {
  card.addEventListener("click", function () {
    const alreadyOpen = card.classList.contains("is-open");
    orgCards.forEach(function (other) {
      other.classList.remove("is-open");
    });
    if (!alreadyOpen) {
      card.classList.add("is-open");
    }
  });
});

document.addEventListener("click", function (event) {
  if (!event.target.closest(".org-card")) {
    orgCards.forEach(function (card) {
      card.classList.remove("is-open");
    });
  }
});