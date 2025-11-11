// Observatorio Section - Enhanced JavaScript (igual que estandares.js y biblioteca.js)
document.addEventListener("DOMContentLoaded", () => {
  // Mark all cards as visible initially
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.setAttribute("data-visible", "true");
    card.style.display = "block";
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  });
  
  // Initialize all functionality
  initSearch();
  initFilters();
  updateFilterCounts();
  
  // Initialize results counter
  const resultsCount = document.getElementById("resultsCount");
  if (resultsCount) {
    resultsCount.textContent = cards.length;
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

    filterAndSearchCards(searchTerm, filterActive);
  });

  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    clearSearch.style.display = "none";
    const filterActive = document.querySelector(".filter-btn.active")?.getAttribute("data-filter") || "all";
    filterAndSearchCards("", filterActive);
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

      // Filter cards
      filterAndSearchCards(searchTerm, filter);
    });
  });
}

// Filter and search cards
function filterAndSearchCards(searchTerm, filterType) {
  const cards = document.querySelectorAll(".card");
  const noResults = document.getElementById("noResults");
  const resultsCount = document.getElementById("resultsCount");
  let visibleCount = 0;

  cards.forEach((card, index) => {
    const cardCategory = card.getAttribute("data-category") || "";
    const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
    const description = card.querySelector("p")?.textContent.toLowerCase() || "";
    const tag = card.querySelector(".card-tag")?.textContent.toLowerCase() || "";
    
    const matchesFilter = filterType === "all" || cardCategory === filterType;
    const matchesSearch = !searchTerm || 
                         title.includes(searchTerm) || 
                         description.includes(searchTerm) ||
                         tag.includes(searchTerm);
    
    if (matchesFilter && matchesSearch) {
      // Mark as visible
      card.setAttribute("data-visible", "true");
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      
      setTimeout(() => {
        card.style.transition = "all 0.4s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
        card.style.display = "block";
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

  // Update filter counts only if not filtering
  if (!searchTerm) {
    updateFilterCounts(filterType);
  }
}

// Update filter counts
function updateFilterCounts(activeFilter = null) {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".card");
  
  filterBtns.forEach((btn) => {
    const filterType = btn.getAttribute("data-filter");
    let count = 0;

    if (filterType === "all") {
      count = cards.length;
    } else {
      cards.forEach((card) => {
        const category = card.getAttribute("data-category") || "";
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

// Add CSS animations dynamically
const style = document.createElement("style");
style.textContent = `
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
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
