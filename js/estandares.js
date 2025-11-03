// Estándares Section - Enhanced JavaScript
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

// Initialize standard cards with enhanced interactions
function initStandardCards() {
  const standardCards = document.querySelectorAll(".standard-card");
  
  standardCards.forEach((card) => {
    // Mark as visible initially
    card.setAttribute("data-visible", "true");
    
    card.addEventListener("click", function (e) {
      // Don't expand if clicking on a link or button inside
      if (e.target.closest("a") || e.target.closest("button")) {
        return;
      }
      
      const isExpanded = this.classList.contains("expanded");
      
      // Close all other cards (optional - remove if you want multiple open)
      // standardCards.forEach(c => {
      //   if (c !== this && c.classList.contains("expanded")) {
      //     c.classList.remove("expanded");
      //   }
      // });
      
      this.classList.toggle("expanded");
      
      // Add animation effect
      if (!isExpanded) {
        this.style.transform = "scale(0.98)";
        setTimeout(() => {
          this.style.transform = "";
        }, 200);
      }
    });

    // Add hover effect
    card.addEventListener("mouseenter", function() {
      if (!this.classList.contains("expanded")) {
        this.style.transform = "translateY(-4px)";
      }
    });

    card.addEventListener("mouseleave", function() {
      if (!this.classList.contains("expanded")) {
        this.style.transform = "";
      }
    });
  });
}

// Resource actions
function initResourceActions() {
  const resourceBtns = document.querySelectorAll(".resource-btn");
  
  resourceBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      
      const card = this.closest(".resource-card");
      const title = card.querySelector("h4")?.textContent || "Recurso";
      
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

      // Show notification
      showNotification(`Descargando: ${title}`);
    });
  });
}

// Show notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: linear-gradient(135deg, var(--primary-blue), var(--celeste));
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(47, 111, 224, 0.3);
    z-index: 10000;
    font-weight: 600;
    font-size: 0.9rem;
    animation: slideInRight 0.3s ease;
    max-width: 300px;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
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
