/* ================= QUE-HACEMOS.JS (reemplazo completo) ================= */

/* Rutas candidatas del JSON */
const JSON_URL_CANDIDATES = [
  "../data/estandares_integridad.json",
  "estandares_integridad.json",
];

const IMAGES_BY_ID = {
  // Ejemplos si tienes archivos específicos:
    1: "../img/Estandar_01.png",
    2: "../img/Estandar_02.png",
    3: "../img/Estandar_03.png",
    4: "../img/Estandar_04.png",
    5: "../img/Estandar_05.png",
    6: "../img/Estandar_06.png",
    7: "../img/Estandar_07.png",
    8: "../img/Estandar_08.png",
    9: "../img/Estandar_09.png",
    10: "../img/Estandar_10.png",
    11: "../img/Estandar_11.png",
    12: "../img/Estandar_12.png",
    13: "../img/Estandar_13.png",
    14: "../img/Estandar_14.png",
    15: "../img/Estandar_15.png",
};

let ESTANDARES_DATA = null;

/* Carga única del JSON con fallbacks */
async function ensureDataLoaded() {
  if (ESTANDARES_DATA) return ESTANDARES_DATA;
  let lastError;
  for (const url of JSON_URL_CANDIDATES) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      ESTANDARES_DATA = await res.json();
      return ESTANDARES_DATA;
    } catch (e) { lastError = e; }
  }
  console.error("No se pudo cargar estandares_integridad.json", lastError);
  throw lastError;
}

/* ===== Inicialización ===== */
document.addEventListener("DOMContentLoaded", () => {
  initSearch();
  initFilters();
  initStandardCards();
  initResourceActions();
  updateFilterCounts();
});

/* ===== Búsqueda ===== */
function initSearch() {
  const searchInput = document.getElementById("searchInput");
  const clearSearch = document.getElementById("clearSearch");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const filterActive = document.querySelector(".filter-btn.active")?.getAttribute("data-filter") || "todos";
    clearSearch.style.display = searchTerm.length > 0 ? "flex" : "none";
    filterAndSearchStandards(searchTerm, filterActive);
  });

  clearSearch?.addEventListener("click", () => {
    searchInput.value = ""; clearSearch.style.display = "none";
    const filterActive = document.querySelector(".filter-btn.active")?.getAttribute("data-filter") || "todos";
    filterAndSearchStandards("", filterActive); searchInput.focus();
  });
}

/* ===== Filtros ===== */
function initFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");
      const searchInput = document.getElementById("searchInput");
      const searchTerm = searchInput?.value.toLowerCase().trim() || "";

      filterBtns.forEach((b) => { b.classList.remove("active"); b.style.transform = "scale(1)"; });
      this.classList.add("active"); this.style.transform = "scale(0.95)";
      setTimeout(() => (this.style.transform = "scale(1)"), 150);

      filterAndSearchStandards(searchTerm, filter);
    });
  });
}

/* ===== Filtrar + Buscar ===== */
function filterAndSearchStandards(searchTerm, filterType) {
  const standardCards = document.querySelectorAll(".standard-card");
  const noResults = document.getElementById("noResults");
  let visibleCount = 0;

  standardCards.forEach((card) => {
    const category = card.getAttribute("data-category") || "otros";
    const title = card.querySelector(".standard-title")?.textContent.toLowerCase() || "";
    const risks = card.querySelector(".standard-detail:nth-child(1) p")?.textContent.toLowerCase() || "";
    const indicators = card.querySelector(".standard-detail:nth-child(2) p")?.textContent.toLowerCase() || "";
    const actions = card.querySelector(".standard-detail:nth-child(3) p")?.textContent.toLowerCase() || "";

    const matchesFilter = filterType === "todos" || category === filterType;
    const matchesSearch = !searchTerm || title.includes(searchTerm) || risks.includes(searchTerm) || indicators.includes(searchTerm) || actions.includes(searchTerm);

    if (matchesFilter && matchesSearch) {
      card.setAttribute("data-visible", "true");
      card.style.display = "block"; card.style.opacity = "0"; card.style.transform = "translateY(20px)";
      setTimeout(() => { card.style.transition = "all 0.4s ease"; card.style.opacity = "1"; card.style.transform = "translateY(0)"; }, 50 * visibleCount);
      visibleCount++;
    } else {
      card.setAttribute("data-visible", "false");
      card.style.transition = "all 0.3s ease"; card.style.opacity = "0"; card.style.transform = "scale(0.9)";
      setTimeout(() => (card.style.display = "none"), 300);
    }
  });

  setTimeout(() => {
    if (visibleCount === 0 && noResults) { noResults.style.display = "flex"; noResults.style.animation = "fadeInUp 0.5s ease"; }
    else if (noResults) { noResults.style.display = "none"; }
  }, 400);

  if (!searchTerm) updateFilterCounts();
}

/* ===== Contadores ===== */
function updateFilterCounts() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".standard-card");
  filterBtns.forEach((btn) => {
    const type = btn.getAttribute("data-filter");
    let count = 0;
    if (type === "todos") count = cards.length;
    else cards.forEach((c) => { const cat = c.getAttribute("data-category") || "otros"; if (cat === type) count++; });
    const el = btn.querySelector(".filter-count"); if (el) el.textContent = count;
  });
}

/* ===== Cards + Modal ===== */
function initStandardCards() {
  const standardCards = document.querySelectorAll(".standard-card");
  standardCards.forEach((card) => {
    card.setAttribute("data-visible", "true");
    card.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.closest("button")) return;
      openStandardModal(this);
    });
    card.addEventListener("mouseenter", function () { this.style.transform = "translateY(-4px)"; });
    card.addEventListener("mouseleave", function () { this.style.transform = ""; });
  });
  initModal();
}

function initModal() {
  const modalContainer = document.getElementById("modalContainer");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");
  modalOverlay?.addEventListener("click", closeModal);
  modalClose?.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer?.classList.contains("active")) closeModal();
  });
}
/* ===== Render del modal compacto ===== */
function renderModalFromData(modalContentNew, item) {
  // Header
  modalContentNew.querySelector(".estandar-integridad-label").textContent = "ESTÁNDAR DE INTEGRIDAD";
  modalContentNew.querySelector(".modal-number-new").textContent = item.id;
  modalContentNew.querySelector(".modal-title-new").innerHTML = item.titulo_corto;

  // Estándar y Riesgo (lado a lado)
  const std = modalContentNew.querySelector('.section-new[data-kind="estandar"] .section-text');
  const risk = modalContentNew.querySelector('.section-new[data-kind="riesgo"] .section-text');
  if (std) std.textContent = item.estandar;
  if (risk) risk.textContent = item.riesgo;

  // Indicadores
  const indicadoresList = modalContentNew.querySelector(".indicadores-list");
  if (indicadoresList) {
    indicadoresList.innerHTML = item.indicadores.map(txt => `<p>${txt}</p>`).join("");
  }

  // Globo/condición (frase del personaje)
  const bubble = document.getElementById("bubbleBox");
  if (bubble) {
    bubble.innerHTML = item.condicion;
    bubble.className = "speech-bubble";
  }

  // Medios de verificación en grid - SIEMPRE visible
  const verGrid = modalContentNew.querySelector(".verificacion-grid");
  if (verGrid) {
    verGrid.innerHTML = item.medios_verificacion.map((txt, i) => `
      <div class="verificacion-item-new">
        <span class="verificacion-number-new">${i + 1}</span>
        <p class="verificacion-text-new">${txt}</p>
      </div>
    `).join('');
  }
}

/* ===== Abre el modal y aplica tema por grupo ===== */
async function openStandardModal(card) {
  const modalContainer = document.getElementById("modalContainer");
  const modalContentNew = document.getElementById("modalContentNew");
  if (!modalContainer || !modalContentNew) return;

  const id = Number(card.getAttribute("data-standard"));
  try {
    const data = await ensureDataLoaded();
    const item = data.find((x) => Number(x.id) === id);
    if (!item) return;

    renderModalFromData(modalContentNew, item);

    // Tema por grupos
    modalContainer.classList.remove("modal-theme--blue","modal-theme--red","modal-theme--green");
    let theme = "green";
    if (id >= 1 && id <= 5) { theme = "blue";  modalContainer.classList.add("modal-theme--blue"); }
    else if (id >= 6 && id <= 9) { theme = "red"; modalContainer.classList.add("modal-theme--red"); }
    else { theme = "green"; modalContainer.classList.add("modal-theme--green"); }

    // Ilustración
    const img = document.getElementById("modalIllustration");
    if (img) {
      const byId = IMAGES_BY_ID[id];
      //const byTheme = IMAGES_BY_THEME[theme] || "../img/placeholder.png";
      img.src = byId;
      img.alt = `Ilustración Estándar ${id}`;
    }

    modalContainer.classList.add("active");
    document.body.style.overflow = "hidden";
  } catch (err) {
    console.error("Error al abrir modal:", err);
  }
}

function closeModal() {
  const modalContainer = document.getElementById("modalContainer");
  if (modalContainer) { modalContainer.classList.remove("active"); document.body.style.overflow = ""; }
}

/* ===== Recursos (ripple y aviso) ===== */
function initResourceActions() {
  const resourceBtns = document.querySelectorAll(".resource-btn");
  resourceBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation(); e.preventDefault();
      const title = this.closest(".resource-card")?.querySelector("h4")?.textContent || "Recurso";
      const ripple = document.createElement("span");
      ripple.style.position="absolute"; ripple.style.width="0"; ripple.style.height="0";
      ripple.style.borderRadius="50%"; ripple.style.background="rgba(255,255,255,0.5)";
      ripple.style.transform="translate(-50%,-50%)"; ripple.style.left="50%"; ripple.style.top="50%";
      ripple.style.animation="ripple 0.6s ease-out"; this.style.position="relative"; this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
      if (typeof showDownloadNotification === "function") showDownloadNotification(`${title}`, "");
      else if (typeof showNotification === "function") showNotification(`Descargando: ${title}`, "success");
    });
  });
  const style = document.createElement("style");
  style.textContent = `@keyframes ripple{to{width:200px;height:200px;opacity:0}}`;
  document.head.appendChild(style);
}
