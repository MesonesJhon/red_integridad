// Qué hacemos Section - Enhanced JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initSearch();
  initFilters();
  initStandardCards();
  initResourceActions();
  updateFilterCounts();
});

// Search functionality
function initSearch() {
  const searchInput = document.getElementById("searchInput");
  const clearSearch = document.getElementById("clearSearch");
  const noResults = document.getElementById("noResults");

  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const filterActive = document.querySelector(".filter-btn.active")?.getAttribute("data-filter") || "todos";
    
    if (searchTerm.length > 0) {
      clearSearch.style.display = "flex";
    } else {
      clearSearch.style.display = "none";
    }

    filterAndSearchStandards(searchTerm, filterActive);
  });

  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    clearSearch.style.display = "none";
    const filterActive = document.querySelector(".filter-btn.active")?.getAttribute("data-filter") || "todos";
    filterAndSearchStandards("", filterActive);
    searchInput.focus();
  });
}

// Filter functionality with enhanced animations
function initFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");
      const searchInput = document.getElementById("searchInput");
      const searchTerm = searchInput?.value.toLowerCase().trim() || "";

      // Remove active class from all buttons
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.style.transform = "scale(1)";
      });

      // Add active class and animation to clicked button
      this.classList.add("active");
      this.style.transform = "scale(0.95)";
      
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);

      // Filter standards
      filterAndSearchStandards(searchTerm, filter);
    });
  });
}

// Filter and search standards
function filterAndSearchStandards(searchTerm, filterType) {
  const standardCards = document.querySelectorAll(".standard-card");
  const noResults = document.getElementById("noResults");
  let visibleCount = 0;

  standardCards.forEach((card, index) => {
    const standardNumber = card.getAttribute("data-standard");
    const category = card.getAttribute("data-category") || "otros";
    const title = card.querySelector(".standard-title")?.textContent.toLowerCase() || "";
    const risks = card.querySelector(".standard-detail:nth-child(1) p")?.textContent.toLowerCase() || "";
    const indicators = card.querySelector(".standard-detail:nth-child(2) p")?.textContent.toLowerCase() || "";
    const actions = card.querySelector(".standard-detail:nth-child(3) p")?.textContent.toLowerCase() || "";
    
    const matchesFilter = filterType === "todos" || category === filterType;
    const matchesSearch = !searchTerm || 
                         title.includes(searchTerm) || 
                         risks.includes(searchTerm) || 
                         indicators.includes(searchTerm) || 
                         actions.includes(searchTerm);
    
    if (matchesFilter && matchesSearch) {
      card.setAttribute("data-visible", "true");
      card.style.display = "block";
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      
      setTimeout(() => {
        card.style.transition = "all 0.4s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 50 * visibleCount);
      
      visibleCount++;
    } else {
      card.setAttribute("data-visible", "false");
      card.style.transition = "all 0.3s ease";
      card.style.opacity = "0";
      card.style.transform = "scale(0.9)";
      
      setTimeout(() => {
        card.style.display = "none";
      }, 300);
    }
  });

  // Show/hide no results message
  setTimeout(() => {
    if (visibleCount === 0 && noResults) {
      noResults.style.display = "flex";
      noResults.style.animation = "fadeInUp 0.5s ease";
    } else if (noResults) {
      noResults.style.display = "none";
    }
  }, 400);

  // Update filter counts only if not filtering
  if (!searchTerm) {
    updateFilterCounts(filterType);
  }
}

// Update filter counts
function updateFilterCounts(activeFilter = null) {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const standardCards = document.querySelectorAll(".standard-card");
  
  filterBtns.forEach((btn) => {
    const filterType = btn.getAttribute("data-filter");
    let count = 0;

    if (filterType === "todos") {
      count = standardCards.length;
    } else {
      standardCards.forEach((card) => {
        const category = card.getAttribute("data-category") || "otros";
        if (category === filterType) {
          count++;
        }
      });
    }

    const countElement = btn.querySelector(".filter-count");
    if (countElement) {
      countElement.textContent = count;
    }
  });
}

// Initialize standard cards with modal interactions
function initStandardCards() {
  const standardCards = document.querySelectorAll(".standard-card");
  
  standardCards.forEach((card) => {
    // Mark as visible initially
    card.setAttribute("data-visible", "true");
    
    card.addEventListener("click", function (e) {
      // Don't open modal if clicking on a link or button inside
      if (e.target.closest("a") || e.target.closest("button")) {
        return;
      }
      
      openStandardModal(this);
    });

    // Keep hover effects
    card.addEventListener("mouseenter", function() {
      this.style.transform = "translateY(-4px)";
    });

    card.addEventListener("mouseleave", function() {
      this.style.transform = "";
    });
  });
  
  // Initialize modal functionality
  initModal();
}

// Initialize modal functionality
function initModal() {
  const modalContainer = document.getElementById("modalContainer");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");
  
  // Close modal when clicking overlay or close button
  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModal);
  }
  
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }
  
  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("active")) {
      closeModal();
    }
  });
}

// Function to get modal image (returns placeholder or image if available)
function getModalImage(standardNumber) {
  // Lista de imágenes disponibles - agrega aquí las rutas de tus imágenes cuando las tengas
  const availableImages = {
    // Ejemplo: "1": "../img/estandar-1.png",
    // "2": "../img/estandar-2.png",
    // Agrega más según tengas imágenes
  };
  
  if (availableImages[standardNumber]) {
    return `<img src="${availableImages[standardNumber]}" alt="Ilustración Estándar ${standardNumber}" class="modal-illustration">`;
  }
  
  // Placeholder si no hay imagen
  return `
    <div class="modal-image-placeholder">
      <p>Espacio para ilustración</p>
      <small>Puedes agregar una imagen en: ../img/estandar-${standardNumber}.png</small>
    </div>
  `;
}

// Open modal with standard details
function openStandardModal(card) {
  const modalContainer = document.getElementById("modalContainer");
  const modalContentNew = document.getElementById("modalContentNew"); // Reference the new content container
  
  if (!modalContainer || !modalContentNew) {
    console.error("Modal elements not found");
    return;
  }
  
  // Get card data
  const standardNumber = card.getAttribute("data-standard");
  const standardTitle = card.querySelector(".standard-title").textContent;
  const phase = card.getAttribute("data-phase") || "ejecucion";

  // Dynamic content from the clicked card
  const standardDescription = standardTitle; // The card title is the "Estándar" description in the modal
  const riskDescription = card.querySelector(".standard-detail:nth-child(1) p").textContent;
  const indicatorDescription = card.querySelector(".standard-detail:nth-child(2) p").textContent;
  const actionsDescription = card.querySelector(".standard-detail:nth-child(3) p").textContent;

  // Update static elements (from the image)
  modalContentNew.querySelector(".estandar-integridad-label").textContent = "ESTÁNDAR DE INTEGRIDAD";
  modalContentNew.querySelector(".modal-number-new").textContent = standardNumber;
  modalContentNew.querySelector(".modal-title-new").innerHTML = `El proyecto de inversión pública<br>cierra brechas y es de interés público`;

  // Update dynamic elements
  modalContentNew.querySelector(".section-new:nth-child(1) p").textContent = standardDescription; // "Estándar" description
  modalContentNew.querySelector(".section-new:nth-child(2) p").textContent = riskDescription; // "Riesgo" description

  // "Indicador del estándar de integridad" descriptions (partially static, partially dynamic based on requirements)
  // For now, I'll keep them as static based on the provided image, as the card's indicators are generic.
  modalContentNew.querySelector(".indicador-section-new p:nth-of-type(1)").innerHTML = `<strong>1.1</strong> El proyecto de inversión contribuye a <u>reducir brechas</u> de un sector priorizado para la región.`;
  modalContentNew.querySelector(".indicador-section-new p:nth-of-type(2)").innerHTML = `<strong>1.2</strong> El porcentaje que aporta la inversión pública al cierre de brechas en un sector priorizado <u>es mayor a 0%</u>.`;

  // Medio de verificación (partially static, partially dynamic)
  // The first item (Registro de proyecto...) is static in structure but its content comes from card's actions
  modalContentNew.querySelector(".verificacion-item-new:nth-child(1) .verificacion-text-new p").textContent = "Registro de proyecto de inversión (Formato N° 12-A)";
  modalContentNew.querySelector(".verificacion-item-new:nth-child(1) .verificacion-text-new ul").innerHTML = `
    <li>Indicador de brecha (Formato N° F4-A)</li>
    <li>Seguimiento de cierre de brechas (Formato N° F12-A)</li>
    <li>Ver: Directiva N° 001-2019-EF/63.01</li>
  `;
  modalContentNew.querySelector(".verificacion-item-new:nth-child(2) .verificacion-text-new").textContent = "Solicitud de Acceso a Información Pública (SAIP)"; // This appears static in the image
  modalContentNew.querySelector(".verificacion-item-new:nth-child(3) .verificacion-text-new").textContent = "Revisión del Sistema de Seguimiento de Inversión Pública (SSI-MEF)"; // This appears static in the image

  // Update placeholder image
  modalContentNew.querySelector(".modal-image-new img").src = `../img/placeholder.png`; // Local placeholder image
  modalContentNew.querySelector(".modal-image-new img").alt = `Placeholder image for character - Estándar ${standardNumber}`;

  // Update modal close button color based on phase
  const modalClose = document.getElementById("modalClose");
  if (modalClose) {
    modalClose.setAttribute("data-phase", phase);
  }
  
  // Show modal
  modalContainer.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

// Close modal
function closeModal() {
  const modalContainer = document.getElementById("modalContainer");
  if (modalContainer) {
    modalContainer.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  }
}

// Resource actions
function initResourceActions() {
  const resourceBtns = document.querySelectorAll(".resource-btn");
  
  resourceBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      
      const card = this.closest(".resource-card");
      const title = card.querySelector("h4")?.textContent || "Recurso";
      const btnText = this.querySelector("span")?.textContent || "";
      
      // Detectar tipo de archivo desde el texto del botón
      let fileType = null;
      let fileName = title;
      
      if (btnText.toLowerCase().includes("pdf")) {
        fileType = "PDF";
        fileName = `${title}.pdf`;
      } else if (btnText.toLowerCase().includes("excel")) {
        fileType = "Excel";
        fileName = `${title}.xlsx`;
      } else if (btnText.toLowerCase().includes("checklist")) {
        fileType = "PDF";
        fileName = `${title}.pdf`;
      }
      
      // Add ripple effect
      const ripple = document.createElement("span");
      ripple.style.position = "absolute";
      ripple.style.width = "0";
      ripple.style.height = "0";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255, 255, 255, 0.5)";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.left = "50%";
      ripple.style.top = "50%";
      ripple.style.animation = "ripple 0.6s ease-out";
      this.style.position = "relative";
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);

      // Mostrar notificación usando la función global unificada
      if (typeof showDownloadNotification === 'function') {
        showDownloadNotification(fileName, fileType);
      } else if (typeof showNotification === 'function') {
        showNotification(`Descargando: ${title}`, "success");
      }
    });
  });
}

// Add CSS animations dynamically
const style = document.createElement("style");
style.textContent = `
  @keyframes ripple {
    to {
      width: 200px;
      height: 200px;
      opacity: 0;
    }
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);