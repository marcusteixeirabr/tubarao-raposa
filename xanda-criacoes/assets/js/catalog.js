(function catalogFilter() {
  const grid = document.getElementById("catalog-grid");
  const cards = grid ? grid.querySelectorAll(".product-col") : [];
  const buttons = document.querySelectorAll(".filter-btn");
  const noResults = document.getElementById("no-results");
  const counter = document.getElementById("results-count");

  if (!grid || !cards.length) return; // sai se não estiver na página de produtos

  /* ── Aplica o filtro ── */
  function applyFilter(tag) {
    let visible = 0;

    cards.forEach((card) => {
      const tags = card.dataset.tags ? card.dataset.tags.split(" ") : [];
      const match = tag === "all" || tags.includes(tag);

      if (match) {
        card.classList.remove("hidden");
        const inner = card.querySelector(".card-catalogo");
        if (inner) {
          inner.classList.remove("fade-in");
          void inner.offsetWidth;
          inner.classList.add("fade-in");
        }
        visible++;
      } else {
        card.classList.add("hidden");
        const inner = card.querySelector(".card-catalogo");
        if (inner) inner.classList.remove("fade-in");
      }
    });

    /* Atualiza o contador */
    if (counter) {
      counter.textContent =
        tag === "all"
          ? `${visible} produtos`
          : `${visible} produto${visible !== 1 ? "s" : ""} encontrado${visible !== 1 ? "s" : ""}`;
    }

    /* Exibe/oculta mensagem de "sem resultados" */
    if (noResults) {
      noResults.classList.toggle("visible", visible === 0);
    }
  }

  /* ── Atualiza botão ativo ── */
  function setActiveButton(clicked) {
    buttons.forEach((btn) => btn.classList.remove("active"));
    clicked.classList.add("active");
  }

  /* ── Eventos dos botões ── */
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tag = btn.dataset.filter || "all";
      setActiveButton(btn);
      applyFilter(tag);
    });
  });

  /* ── Função global para filtrar por tag ── */
  window.filterByTag = function (tag) {
    const target = document.querySelector(`[data-filter="${tag}"]`);
    if (target) {
      target.click();
      /* Rola até a barra de filtros */
      document
        .querySelector(".filter-bar")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* Função global para resetar (usada no link "Ver todos") */
  window.resetFilters = function () {
    const allBtn = document.querySelector('[data-filter="all"]');
    if (allBtn) allBtn.click();
    return false; // impede o href="#" de rolar para o topo
  };

  /* ── Inicializa o contador com todos os produtos ── */
  applyFilter("all");
})();
