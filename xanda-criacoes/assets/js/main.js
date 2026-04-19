
(function markActiveNavLink() {
  const links = document.querySelectorAll("nav a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const linkPage = href.split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("nav-active");
      link.setAttribute("aria-current", "page");
    }
  });
})();

  /* Injeta o CSS de animação apenas uma vez */
  if (!document.getElementById("scroll-reveal-styles")) {
    const style = document.createElement("style");
    style.id = "scroll-reveal-styles";
    style.textContent = `
      [data-reveal] {
        opacity: 0;
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      [data-reveal],
      [data-reveal="up"]    { transform: translateY(32px); }
      [data-reveal="left"]  { transform: translateX(-32px); }
      [data-reveal="right"] { transform: translateX(32px);  }

      [data-reveal].revealed {
        opacity: 1;
        transform: translate(0, 0);
      }
    `;
    document.head.appendChild(style);
  }

  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          /* Pequeno delay escalonado para grupos de elementos */
          const siblings = Array.from(
            entry.target.parentElement.querySelectorAll("[data-reveal]"),
          );
          const index = siblings.indexOf(entry.target);
          setTimeout(() => entry.target.classList.add("revealed"), index * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  targets.forEach((el) => observer.observe(el));
})();
