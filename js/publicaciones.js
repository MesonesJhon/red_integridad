// Publicaciones Section - Enhanced JavaScript CORREGIDO
document.addEventListener("DOMContentLoaded", () => {
  // Mark all cards as visible initially
  const documentCards = document.querySelectorAll(".document-card");
  documentCards.forEach(card => {
    card.setAttribute("data-visible", "true");
    card.style.display = "flex";
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  });
  
  // Initialize all functionality
  initSearch();
  initFilters();
  initDocumentActions();
  initDashboardAnimations();
  initPagination();
  updateFilterCounts();
  
  // Initialize results counter
  const resultsCount = document.getElementById("resultsCount");
  if (resultsCount) {
    resultsCount.textContent = documentCards.length;
  }
});

// Search functionality
function initSearch() {
  const searchInput = document.getElementById("searchInput");
  const clearSearch = document.getElementById("clearSearch");
  const noResults = document.getElementById("noResults");

  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const filterActive = document.querySelector(".filter-btn.active")?.getAttribute("data-filter") || "all";
    
    if (searchTerm.length > 0) {
      clearSearch.style.display = "flex";
    } else {
      clearSearch.style.display = "none";
    }

    filterAndSearchDocuments(searchTerm, filterActive);
  });

  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    clearSearch.style.display = "none";
    const filterActive = document.querySelector(".filter-btn.active")?.getAttribute("data-filter") || "all";
    filterAndSearchDocuments("", filterActive);
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

      // Filter documents
      filterAndSearchDocuments(searchTerm, filter);
    });
  });
}

// Filter and search documents - CORREGIDO
function filterAndSearchDocuments(searchTerm, filterType) {
  const documentCards = document.querySelectorAll(".document-card");
  const noResults = document.getElementById("noResults");
  const resultsCount = document.getElementById("resultsCount");
  let visibleCount = 0;

  documentCards.forEach((card, index) => {
    const cardType = card.getAttribute("data-type") || "";
    const title = card.querySelector(".document-title")?.textContent.toLowerCase() || "";
    const description = card.querySelector(".document-description")?.textContent.toLowerCase() || "";
    
    // CORRECCIÓN: Cambiar "todos" por "all"
    const matchesFilter = filterType === "all" || cardType === filterType;
    const matchesSearch = !searchTerm || 
                         title.includes(searchTerm) || 
                         description.includes(searchTerm);
    
    if (matchesFilter && matchesSearch) {
      // Mark as visible
      card.setAttribute("data-visible", "true");
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      
      setTimeout(() => {
        card.style.transition = "all 0.4s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
        card.style.display = "flex";
      }, 50 * visibleCount);
      
      visibleCount++;
    } else {
      // Mark as hidden
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

  // Update results counter
  if (resultsCount) {
    resultsCount.textContent = visibleCount;
  }

  // Update pagination after filtering
  setTimeout(() => {
    currentPage = 1; // Reset to first page when filtering
    updatePagination();
  }, 500);

  // Update filter counts only if not filtering
  if (!searchTerm) {
    updateFilterCounts(filterType);
  }
}

// Update filter counts - CORREGIDO
function updateFilterCounts(activeFilter = null) {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const documentCards = document.querySelectorAll(".document-card");
  
  filterBtns.forEach((btn) => {
    const filterType = btn.getAttribute("data-filter");
    let count = 0;

    // CORRECCIÓN: Cambiar "todos" por "all"
    if (filterType === "all") {
      count = documentCards.length;
    } else {
      documentCards.forEach((card) => {
        const cardType = card.getAttribute("data-type") || "";
        if (cardType === filterType) {
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

// Document actions (download, view, play)
function initDocumentActions() {
  const actionBtns = document.querySelectorAll(".document-action");
  
  actionBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      
      const card = this.closest(".document-card");
      const title = card.querySelector(".document-title")?.textContent || "Documento";
      const type = card.getAttribute("data-type") || "";
      const action = this.getAttribute("title") || "Descargar";
      
      // Determinar nombre de archivo según el tipo
      let fileName = title;
      let fileType = type;
      
      // Agregar extensión según el tipo
      if (type === "PDF") {
        fileName = `${title}.pdf`;
        fileType = "PDF";
      } else if (type === "Informe") {
        fileName = `${title}.pdf`;
        fileType = "PDF";
      } else if (type === "Video") {
        fileName = `${title}.mp4`;
        fileType = "Video";
      } else if (type === "Imagen") {
        fileName = `${title}.jpg`;
        fileType = "Imagen";
      }
      
      // Add ripple effect
      const ripple = document.createElement("span");
      ripple.style.position = "absolute";
      ripple.style.width = "0";
      ripple.style.height = "0";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(146, 180, 89, 0.3)"; // Color verde
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
        if (action.toLowerCase().includes("descargar") || action.toLowerCase().includes("download")) {
          showDownloadNotification(fileName, fileType);
        } else {
          // Para acciones como "Ver" o "Reproducir"
          if (typeof showNotification === 'function') {
            showNotification(`${action}: ${title}`, "success");
          }
        }
      } else if (typeof showNotification === 'function') {
        showNotification(`${action}: ${title}`, "success");
      } else {
        // Fallback simple
        console.log(`${action}: ${title}`);
      }
    });

    // Card click handler
    const card = btn.closest(".document-card");
    if (card) {
      card.addEventListener("click", function (e) {
        if (e.target.closest(".document-action")) return;
        
        // Add subtle pulse animation
        this.style.transform = "scale(0.98)";
        setTimeout(() => {
          this.style.transform = "";
        }, 150);
      });
    }
  });
}

// Dashboard animations
function initDashboardAnimations() {
  // Animate stat cards on scroll
  const statCards = document.querySelectorAll(".stat-card-large");
  const typeCards = document.querySelectorAll(".type-card");
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "0";
        entry.target.style.transform = "translateY(20px)";
        
        setTimeout(() => {
          entry.target.style.transition = "all 0.5s ease";
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, 50 * index);
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statCards.forEach((card) => observer.observe(card));
  typeCards.forEach((card) => observer.observe(card));

  // Animate table rows
  const tableRows = document.querySelectorAll(".dashboard-table tbody tr");
  tableRows.forEach((row, index) => {
    row.style.opacity = "0";
    row.style.transform = "translateX(-10px)";
    
    setTimeout(() => {
      row.style.transition = "all 0.4s ease";
      row.style.opacity = "1";
      row.style.transform = "translateX(0)";
    }, 100 * index);
  });
}

// Pagination functionality
let currentPage = 1;
let itemsPerPage = 9;
let totalItems = 0;

function initPagination() {
  // Initialize pagination after a short delay to ensure DOM is ready
  setTimeout(() => {
    updatePagination();
    setupPaginationListeners();
  }, 100);
}

function setupPaginationListeners() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const paginationNumbers = document.getElementById("paginationNumbers");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        updatePagination();
        scrollToTop();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
        scrollToTop();
      }
    });
  }

  if (paginationNumbers) {
    paginationNumbers.addEventListener("click", (e) => {
      const pageBtn = e.target.closest(".pagination-number");
      if (pageBtn) {
        const page = parseInt(pageBtn.getAttribute("data-page"));
        if (page && page !== currentPage) {
          currentPage = page;
          updatePagination();
          scrollToTop();
        }
      }
    });
  }
}

function updatePagination() {
  // Get all document cards that are visible (not hidden by filters/search)
  const allCards = document.querySelectorAll(".document-card");
  const documentCards = Array.from(allCards).filter(card => {
    // Only include cards marked as visible by filters/search
    const isVisible = card.getAttribute("data-visible") !== "false";
    return isVisible;
  });
  
  totalItems = documentCards.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Hide pagination if no items
  const paginationContainer = document.getElementById("paginationContainer");
  if (totalItems === 0 && paginationContainer) {
    paginationContainer.style.display = "none";
    return;
  }
  
  if (totalItems <= itemsPerPage && paginationContainer) {
    // Show all cards if they fit in one page
    documentCards.forEach(card => {
      card.style.display = "flex";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    });
    if (paginationContainer) paginationContainer.style.display = "none";
    return;
  }
  
  if (paginationContainer) {
    paginationContainer.style.display = "flex";
  }
  
  // Calculate visible range
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  // Show/hide cards based on pagination
  documentCards.forEach((card, index) => {
    if (index >= startIndex && index < endIndex) {
      card.style.display = "flex";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    } else {
      card.style.display = "none";
    }
  });
  
  // Update pagination buttons
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  
  if (prevBtn) {
    prevBtn.disabled = currentPage === 1;
  }
  
  if (nextBtn) {
    nextBtn.disabled = currentPage >= totalPages;
  }
  
  // Update pagination numbers
  updatePaginationNumbers(totalPages);
  
  // Update info text
  updatePaginationInfo(startIndex + 1, endIndex, totalItems);
}

function updatePaginationNumbers(totalPages) {
  const paginationNumbers = document.getElementById("paginationNumbers");
  if (!paginationNumbers) return;
  
  let html = "";
  const maxVisible = 5; // Number of page buttons to show before ellipsis
  
  if (totalPages <= maxVisible + 2) {
    // Show all pages if not too many
    for (let i = 1; i <= totalPages; i++) {
      html += `<button class="pagination-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
  } else {
    // Show first page
    html += `<button class="pagination-number ${currentPage === 1 ? 'active' : ''}" data-page="1">1</button>`;
    
    if (currentPage <= 3) {
      // Show pages 2-5
      for (let i = 2; i <= 5; i++) {
        html += `<button class="pagination-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
      }
      html += `<span class="pagination-ellipsis">...</span>`;
      html += `<button class="pagination-number" data-page="${totalPages}">${totalPages}</button>`;
    } else if (currentPage >= totalPages - 2) {
      // Show pages near the end
      html += `<span class="pagination-ellipsis">...</span>`;
      for (let i = totalPages - 4; i <= totalPages; i++) {
        html += `<button class="pagination-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
      }
    } else {
      // Show pages around current page
      html += `<span class="pagination-ellipsis">...</span>`;
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        html += `<button class="pagination-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
      }
      html += `<span class="pagination-ellipsis">...</span>`;
      html += `<button class="pagination-number" data-page="${totalPages}">${totalPages}</button>`;
    }
  }
  
  paginationNumbers.innerHTML = html;
}

function updatePaginationInfo(from, to, total) {
  const showingFrom = document.getElementById("showingFrom");
  const showingTo = document.getElementById("showingTo");
  const totalItems = document.getElementById("totalItems");
  
  if (showingFrom) showingFrom.textContent = from;
  if (showingTo) showingTo.textContent = to;
  if (totalItems) totalItems.textContent = total;
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
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
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);



//PARA DESCARGAR REPORTES EN PDF
function descargarPDF(event, url, filename) {
    event.preventDefault();
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
}
