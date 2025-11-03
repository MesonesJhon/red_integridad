// Main Global Functions
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  loadSections()
})

function initializeNavigation() {
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll(".section")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const sectionId = this.getAttribute("data-section")
      
      // Solo interceptar si tiene data-section (navegación interna SPA)
      // Si no tiene data-section, permitir navegación normal (enlaces externos)
      if (sectionId) {
        e.preventDefault()
        
        // Update active nav link
        navLinks.forEach((l) => l.classList.remove("active"))
        this.classList.add("active")

        // Show active section
        sections.forEach((s) => s.classList.remove("active"))
        const targetSection = document.getElementById(sectionId)
        if (targetSection) {
          targetSection.classList.add("active")
        }

        // Close mobile menu
        const navbarMenu = document.getElementById("navbarMenu")
        const navbarToggle = document.getElementById("navbarToggle")
        if (navbarMenu && navbarMenu.classList.contains("active")) {
          navbarMenu.classList.remove("active")
          navbarToggle.classList.remove("active")
        }
      }
      // Si no tiene data-section, el enlace navegará normalmente
    })
  })
}

function loadSections() {
  // This will be called by individual section scripts
}

// Utility function to format dates
function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(date).toLocaleDateString("es-ES", options)
}

// Función global unificada para mostrar notificaciones de descarga
// Detecta automáticamente el tipo de archivo (PDF, Excel, etc.)
window.showDownloadNotification = function(fileName, fileType = null) {
  // Remover notificaciones existentes
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => {
    notification.remove();
  });

  // Detectar tipo de archivo si no se proporciona
  if (!fileType && fileName) {
    const extension = fileName.toLowerCase().split('.').pop();
    const typeMap = {
      'pdf': 'PDF',
      'xlsx': 'Excel',
      'xls': 'Excel',
      'doc': 'Word',
      'docx': 'Word',
      'jpg': 'Imagen',
      'jpeg': 'Imagen',
      'png': 'Imagen',
      'gif': 'Imagen',
      'mp4': 'Video',
      'avi': 'Video',
      'mov': 'Video',
      'zip': 'Archivo comprimido',
      'rar': 'Archivo comprimido'
    };
    fileType = typeMap[extension] || 'Archivo';
  }

  // Crear mensaje según el tipo
  let message = `Descargando ${fileType}`;
  if (fileName) {
    message = `Descargando ${fileType}: ${fileName}`;
  }

  // Crear notificación
  const notification = document.createElement("div");
  notification.className = 'notification success';
  
  const icon = '✓';
  notification.innerHTML = `
    <div class="notification-icon">${icon}</div>
    <div style="flex: 1;">${message}</div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remover después de 4 segundos
  const removeTimeout = setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOutBottom 0.4s ease-in";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 400);
    }
  }, 4000);
  
  // Cerrar al hacer clic
  notification.addEventListener("click", () => {
    clearTimeout(removeTimeout);
    notification.style.animation = "slideOutBottom 0.4s ease-in";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 400);
  });
};

// Función para notificaciones generales (mantener compatibilidad)
window.showNotification = function(message, type = "success") {
  // Remover notificaciones existentes
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => {
    notification.remove();
  });

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  
  const icon = type === "success" ? "✓" : "✕";
  notification.innerHTML = `
    <div class="notification-icon">${icon}</div>
    <div style="flex: 1;">${message}</div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remover después de 4 segundos
  const removeTimeout = setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOutBottom 0.4s ease-in";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 400);
    }
  }, 4000);
  
  // Cerrar al hacer clic
  notification.addEventListener("click", () => {
    clearTimeout(removeTimeout);
    notification.style.animation = "slideOutBottom 0.4s ease-in";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 400);
  });
};
