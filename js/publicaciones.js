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

      // CORRECCIÓN: Resetear siempre a página 1 al cambiar filtro
      currentPage = 1;
      
      // Filter documents
      filterAndSearchDocuments(searchTerm, filter);
    });
  });
}

// Filter and search documents - CORREGIDO
// Filter and search documents - CORREGIDO CON PAGINACIÓN
// Filter and search documents - VERSIÓN CORREGIDA
// Filter and search documents - VERSIÓN CORREGIDA CON ANIMACIONES Y PAGINACIÓN
function filterAndSearchDocuments(searchTerm, filterType) {
  console.log(`🔍 Filtrando: "${searchTerm}", Categoría: "${filterType}"`);
  
  const documentCards = document.querySelectorAll(".document-card");
  const noResults = document.getElementById("noResults");
  const resultsCount = document.getElementById("resultsCount");
  let visibleCount = 0;

  documentCards.forEach((card, index) => {
    const cardType = card.getAttribute("data-type") || "";
    const title = card.querySelector(".document-title")?.textContent.toLowerCase() || "";
    const description = card.querySelector(".document-description")?.textContent.toLowerCase() || "";
    
    const matchesFilter = filterType === "all" || cardType === filterType;
    const matchesSearch = !searchTerm || 
                         title.includes(searchTerm) || 
                         description.includes(searchTerm);
    
    if (matchesFilter && matchesSearch) {
      // Marcar como visible y MOSTRAR con animación
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
      // Marcar como oculto y OCULTAR con animación
      card.setAttribute("data-visible", "false");
      card.style.transition = "all 0.3s ease";
      card.style.opacity = "0";
      card.style.transform = "scale(0.9)";
      
      setTimeout(() => {
        card.style.display = "none";
      }, 300);
    }
  });

  console.log(`✅ Elementos visibles después de filtrar: ${visibleCount}`);

  // Mostrar/ocultar mensaje de no resultados
  setTimeout(() => {
    if (noResults) {
      if (visibleCount === 0) {
        noResults.style.display = "flex";
        noResults.style.animation = "fadeInUp 0.5s ease";
      } else {
        noResults.style.display = "none";
      }
    }
  }, 400);

  // Actualizar contador de resultados
  if (resultsCount) {
    resultsCount.textContent = visibleCount;
  }

  // CORRECCIÓN: Resetear a página 1 y actualizar paginación después de las animaciones
  setTimeout(() => {
    currentPage = 1;
    updatePagination();
  }, 500);

  // Actualizar contadores de filtros solo si no hay búsqueda
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
  console.log('🚀 Inicializando paginación...');
  
  // Inicializar variables
  currentPage = 1;
  itemsPerPage = 9;
  
  // Configurar event listeners
  setupPaginationListeners();
  
  // Aplicar paginación inicial (después de un pequeño delay para asegurar que el DOM esté listo)
  setTimeout(() => {
    updatePagination();
  }, 100);
}

function setupPaginationListeners() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

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
      const totalItems = document.querySelectorAll('.document-card[data-visible="true"]').length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      
      if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
        scrollToTop();
      }
    });
  }
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
//maneja mejor los cmabios de filtro y busqueda
function updatePagination() {
  console.log('🔄 Actualizando paginación...');
  
  // Obtener SOLO las tarjetas visibles (que pasaron el filtro)
  const allCards = document.querySelectorAll(".document-card");
  const visibleCards = Array.from(allCards).filter(card => {
    const isVisible = card.getAttribute("data-visible") === "true";
    return isVisible;
  });
  
  totalItems = visibleCards.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  console.log(`📊 Total visible: ${totalItems}, Páginas: ${totalPages}, Página actual: ${currentPage}`);
  
  // Ocultar paginación si no hay elementos o solo una página
  const paginationContainer = document.getElementById("paginationContainer");
  
  if (totalItems === 0) {
    if (paginationContainer) paginationContainer.style.display = "none";
    console.log('❌ No hay elementos, ocultando paginación');
    return;
  }
  
  // Mostrar u ocultar paginación según sea necesario
  if (totalPages <= 1) {
    if (paginationContainer) paginationContainer.style.display = "none";
    // Mostrar todas las tarjetas visibles
    visibleCards.forEach((card, index) => {
      card.style.display = "flex";
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 50 * index);
    });
    console.log('✅ Una sola página, mostrando todos los elementos');
    return;
  } else {
    if (paginationContainer) paginationContainer.style.display = "flex";
  }
  
  // Calcular rango visible para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  console.log(`📖 Mostrando elementos ${startIndex + 1} a ${endIndex} de ${totalItems}`);
  
  // Aplicar paginación: mostrar solo los elementos de la página actual
  visibleCards.forEach((card, index) => {
    if (index >= startIndex && index < endIndex) {
      // Elemento está en la página actual - MOSTRAR con animación
      card.style.display = "flex";
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 50 * (index - startIndex));
    } else {
      // Elemento NO está en la página actual - OCULTAR con animación
      card.style.opacity = "0";
      card.style.transform = "translateY(10px)";
      setTimeout(() => {
        card.style.display = "none";
      }, 300);
    }
  });
  
  // Actualizar controles de paginación
  updatePaginationControls(totalPages);
  updatePaginationInfo(startIndex + 1, endIndex, totalItems);
}

function updatePaginationControls(totalPages) {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const paginationNumbers = document.getElementById("paginationNumbers");
  
  if (!prevBtn || !nextBtn || !paginationNumbers) return;
  
  // Actualizar botones anterior/siguiente
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage >= totalPages;
  
  // Actualizar números de página
  let paginationHTML = '';
  const maxVisiblePages = 5;
  
  if (totalPages <= maxVisiblePages) {
    // Mostrar todas las páginas
    for (let i = 1; i <= totalPages; i++) {
      paginationHTML += `<button class="pagination-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
  } else {
    // Lógica para mostrar páginas con elipsis
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        paginationHTML += `<button class="pagination-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
      }
      paginationHTML += `<span class="pagination-ellipsis">...</span>`;
      paginationHTML += `<button class="pagination-number" data-page="${totalPages}">${totalPages}</button>`;
    } else if (currentPage >= totalPages - 2) {
      paginationHTML += `<button class="pagination-number" data-page="1">1</button>`;
      paginationHTML += `<span class="pagination-ellipsis">...</span>`;
      for (let i = totalPages - 3; i <= totalPages; i++) {
        paginationHTML += `<button class="pagination-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
      }
    } else {
      paginationHTML += `<button class="pagination-number" data-page="1">1</button>`;
      paginationHTML += `<span class="pagination-ellipsis">...</span>`;
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        paginationHTML += `<button class="pagination-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
      }
      paginationHTML += `<span class="pagination-ellipsis">...</span>`;
      paginationHTML += `<button class="pagination-number" data-page="${totalPages}">${totalPages}</button>`;
    }
  }
  
  paginationNumbers.innerHTML = paginationHTML;
  
  // Agregar event listeners a los nuevos botones de página
  const pageButtons = paginationNumbers.querySelectorAll('.pagination-number');
  pageButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const page = parseInt(e.target.getAttribute('data-page'));
      if (page && page !== currentPage) {
        currentPage = page;
        updatePagination();
        scrollToTop();
      }
    });
  });
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


// Funciones para el modal de video
function abrirVideo(videoUrl) {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    // Establecer la URL del video
    videoFrame.src = videoUrl;
    
    // Mostrar el modal
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

function cerrarVideo() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    // Ocultar el modal
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    
    // Pausar el video y limpiar la URL
    videoFrame.src = '';
    
    // Restaurar scroll del body
    document.body.style.overflow = '';
}

// Cerrar modal al hacer clic fuera del contenido
document.getElementById('videoModal').addEventListener('click', function(e) {
    if (e.target === this) {
        cerrarVideo();
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        cerrarVideo();
    }
});



// Función para mostrar notificación de descarga

// SOLUCIÓN DIRECTA PARA MINIATURAS PDF
console.log('=== INICIANDO CARGA DE MINIATURAS PDF ===');

// Esperar a que PDF.js esté completamente cargado
function initializePDFMiniatures() {
    if (typeof pdfjsLib === 'undefined') {
        console.log('❌ PDF.js no cargado, reintentando...');
        setTimeout(initializePDFMiniatures, 500);
        return;
    }
    
    console.log('✅ PDF.js cargado, configurando...');
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
    
    // Cargar miniaturas de TODOS los PDFs
    loadAllPDFThumbnails();
}

function loadAllPDFThumbnails() {
    // Array con la información de todos los PDFs
    const pdfs = [
        {
            containerId: 'pdfThumbnail1',
            pdfUrl: '../pdf/ReporteN01.pdf',
            pageNumber: 1
        },
        {
            containerId: 'pdfThumbnail2', 
            pdfUrl: '../pdf/ReporteN02.pdf',
            pageNumber: 1
        },
                {
            containerId: 'pdfThumbnail3', 
            pdfUrl: '../pdf/ReporteN03.pdf',
            pageNumber: 1
        },
              {
            containerId: 'pdfThumbnail4', 
            pdfUrl: '../pdf/ReporteN04.pdf',
            pageNumber: 1
        },
                {
            containerId: 'pdfThumbnail5', 
            pdfUrl: '../pdf/ReporteN05.pdf',
            pageNumber: 1
        },
          {
            containerId: 'pdfThumbnail6', 
            pdfUrl: '../pdf/ReporteN06.pdf',
            pageNumber: 1
        },
        {
            containerId: 'pdfThumbnail7', 
            pdfUrl: '../pdf/ReporteN07.pdf',
            pageNumber: 1
        },
        {
            containerId: 'pdfThumbnail8', 
            pdfUrl: '../pdf/ReporteN08.pdf',
            pageNumber: 1
        },
        {
            containerId: 'pdfThumbnail9', 
            pdfUrl: '../pdf/ReporteN09.pdf',
            pageNumber: 1
        },
        {
            containerId: 'pdfThumbnail10', 
            pdfUrl: '../pdf/BOLETIN_INTEGRIDAD.pdf',
            pageNumber: 1
        }
        

    ];
    
    // Cargar cada PDF
    pdfs.forEach(pdf => {
        loadPDFThumbnailDirect(pdf.containerId, pdf.pdfUrl, pdf.pageNumber);
    });
}

function loadPDFThumbnailDirect(containerId, pdfUrl, pageNumber = 1) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('❌ No se encuentra el contenedor:', containerId);
        return;
    }
    
    console.log('🔄 Cargando miniatura para:', pdfUrl);
    
    container.innerHTML = `
        <div class="pdf-loading">
            <div class="pdf-spinner"></div>
            <span>Cargando PDF...</span>
        </div>
    `;
    
    // Cargar PDF directamente
    pdfjsLib.getDocument(pdfUrl).promise
        .then(pdfDoc => {
            console.log('✅ PDF cargado:', pdfUrl, 'Páginas:', pdfDoc.numPages);
            return pdfDoc.getPage(pageNumber);
        })
        .then(page => {
            const viewport = page.getViewport({ scale: 0.6 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            canvas.className = 'pdf-thumbnail';
            
            return page.render({
                canvasContext: context,
                viewport: viewport
            }).promise.then(() => {
                container.innerHTML = '';
                container.appendChild(canvas);
                console.log('🎉 Miniatura cargada exitosamente para:', containerId);
            });
        })
        .catch(error => {
            console.error('❌ Error cargando PDF:', pdfUrl, error);
            container.innerHTML = `
                <div class="pdf-error">
                    <div>❌ Error al cargar PDF</div>
                    <small>${error.message}</small>
                </div>
            `;
        });
}

// Iniciar cuando la página cargue
document.addEventListener('DOMContentLoaded', initializePDFMiniatures);



// FUNCIÓN SIMPLE Y CONFIABLE PARA DESCARGAR
function descargarPDF(pdfUrl) {
    console.log('🔄 Iniciando descarga:', pdfUrl);
    
    // Verificar si la URL es válida
    if (!pdfUrl || !pdfUrl.includes('.pdf')) {
        console.error('❌ URL de PDF inválida:', pdfUrl);
        alert('Error: URL de archivo inválida');
        return;
    }
    
    // Crear enlace temporal
    const link = document.createElement('a');
    link.href = pdfUrl;
    
    // Extraer nombre del archivo de la URL
    const nombreArchivo = pdfUrl.split('/').pop() || 'documento.pdf';
    link.download = nombreArchivo;
    
    // Configurar para abrir en nueva pestaña si falla
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Agregar al DOM y hacer clic
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('✅ Descarga iniciada para:', nombreArchivo);
    
    // Verificar después de un tiempo si se descargó
    setTimeout(() => {
        verificarDescarga(pdfUrl);
    }, 2000);
}

// Verificar si el archivo se puede descargar
function verificarDescarga(url) {
    fetch(url, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                console.log('✅ Archivo accesible:', url);
            } else {
                console.error('❌ Archivo no accesible:', url, 'Status:', response.status);
                alert('El archivo no está disponible. Código: ' + response.status);
            }
        })
        .catch(error => {
            console.error('❌ Error verificando archivo:', url, error);
            alert('Error al acceder al archivo: ' + error.message);
        });
}

// Verificar TODOS los archivos al cargar la página
function verificarTodosLosArchivos() {
    const archivos = [
        '../pdf/ReporteN01.pdf',
        '../pdf/ReporteN02.pdf', 
        '../pdf/ReporteN03.pdf',
        '../pdf/ReporteN04.pdf',
        '../pdf/ReporteN05.pdf',
        '../pdf/ReporteN06.pdf',
        '../pdf/ReporteN07.pdf',
        '../pdf/ReporteN08.pdf',
        '../pdf/ReporteN09.pdf',
        '../pdf/BOLETIN_INTEGRIDAD.pdf',
        '../pdf/Instituto%20L%C3%B3pez%20Alb%C3%BAjar%20-%20reporte%201%20-%20junio%202023.pdf'
    ];
    
    console.log('🔍 Verificando archivos PDF...');
    archivos.forEach(archivo => {
        fetch(archivo, { method: 'HEAD' })
            .then(response => {
                console.log(response.ok ? '✅' : '❌', archivo, '- Status:', response.status);
            })
            .catch(error => {
                console.log('❌', archivo, '- Error:', error.message);
            });
    });
}

// Ejecutar cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Página cargada - Iniciando verificaciones');
    verificarTodosLosArchivos();
});


// abrir panel de imagenes
function abrirImagen(imagenUrl, titulo) {
    const modal = document.getElementById('imageModal');
    const imagen = document.getElementById('imageModalImg');
    const tituloElement = document.getElementById('imageModalTitle');
    
    imagen.src = imagenUrl;
    imagen.alt = titulo;
    tituloElement.textContent = titulo;
    
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
}

function cerrarImagen() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}