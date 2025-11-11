// Main Global Functions
document.addEventListener("DOMContentLoaded", () => {
  // initializeNavigation()
  // loadSections()
  
  let currentFullPath = window.location.pathname; // Usar pathname directamente
  const navLinks = document.querySelectorAll('.header-link');

  navLinks.forEach(link => {
      let linkPath = new URL(link.href).pathname;

      // Normalizar rutas: quitar 'index.html' y asegurar barra final para comparación
      if (linkPath.endsWith('/index.html')) {
          linkPath = linkPath.substring(0, linkPath.lastIndexOf('/'));
      }
      if (currentFullPath.endsWith('/index.html')) {
          currentFullPath = currentFullPath.substring(0, currentFullPath.lastIndexOf('/'));
      }
      
      // Asegurar que ambas rutas terminan con '/' si no están vacías (para raíz)
      if (linkPath !== '' && !linkPath.endsWith('/')) {
          linkPath += '/';
      }
      if (currentFullPath !== '' && !currentFullPath.endsWith('/')) {
          currentFullPath += '/';
      }

      // Special handling for the root path (e.g., /red_integridad/)
      // If currentFullPath is just the base directory, it should match linkPath for index
      const baseDir = '/red_integridad/'; // Adjust this if your base directory changes

      let normalizedCurrentPath = currentFullPath;
      if (normalizedCurrentPath === baseDir || normalizedCurrentPath === '/') {
          normalizedCurrentPath = baseDir; // Treat root as base directory
      }

      let normalizedLinkPath = linkPath;
      if (normalizedLinkPath === baseDir || normalizedLinkPath === '/') {
          normalizedLinkPath = baseDir; // Treat root as base directory
      }

      console.log('Normalized Current Path:', normalizedCurrentPath);
      console.log('Normalized Link Path:', normalizedLinkPath);
      console.log('Comparison Result:', normalizedCurrentPath === normalizedLinkPath);

      // Eliminar clase activa de todos los enlaces primero
      link.classList.remove('active');

      if (normalizedCurrentPath === normalizedLinkPath) {
          link.classList.add('active');
      } else {
          // Additional check for nested pages like /red_integridad/pages/quienes-somos.html
          // This handles cases where the link path might be a direct file path and current is also a direct file path
          const currentFile = currentFullPath.split('/').pop();
          const linkFile = linkPath.split('/').pop();

          if (currentFile && linkFile && currentFile === linkFile && currentFile.includes('html')) {
              link.classList.add('active');
          }
      }
  });
})

// function initializeNavigation() {
//   const navLinks = document.querySelectorAll(".nav-link")
//   const sections = document.querySelectorAll(".section")

//   navLinks.forEach((link) => {
//     link.addEventListener("click", function (e) {
//       const sectionId = this.getAttribute("data-section")
      
//       // Solo interceptar si tiene data-section (navegación interna SPA)
//       // Si no tiene data-section, permitir navegación normal (enlaces externos)
//       if (sectionId) {
//         e.preventDefault()
        
//         // Update active nav link
//         navLinks.forEach((l) => l.classList.remove("active"))
//         this.classList.add("active")

//         // Show active section
//         sections.forEach((s) => s.classList.remove("active"))
//         const targetSection = document.getElementById(sectionId)
//         if (targetSection) {
//           targetSection.classList.add("active")
//         }

//         // Close mobile menu
//         const navbarMenu = document.getElementById("navbarMenu")
//         const navbarToggle = document.getElementById("navbarToggle")
//         if (navbarMenu && navbarMenu.classList.contains("active")) {
//           navbarMenu.classList.remove("active")
//           navbarToggle.classList.remove("active")
//         }
//       }
//       // Si no tiene data-section, el enlace navegará normalmente
//     })
//   })
// }

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

// document.addEventListener("DOMContentLoaded", function() {
//   const currentPath = window.location.pathname;
//   const navLinks = document.querySelectorAll(".header-nav .header-link");
//
//   console.log("Current Path:", currentPath);
//
//   navLinks.forEach(link => {
//     let linkPath = new URL(link.href).pathname;
//     console.log("Link href:", link.href, "- Extracted linkPath:", linkPath);
//
//     // Adjust paths for root and nested pages
//     if (linkPath.endsWith('/red_integridad/') || linkPath.endsWith('/red_integridad/index.html')) {
//       linkPath = '/red_integridad/';
//     } else if (linkPath.includes('/red_integridad/pages/')) {
//       linkPath = linkPath.substring(linkPath.indexOf('/red_integridad/pages/'));
//     } else if (linkPath.endsWith('/index.html')) {
//       linkPath = '/index.html';
//     }
//
//     console.log("Adjusted linkPath:", linkPath);
//
//     if (currentPath.includes(linkPath) && linkPath !== '/') {
//       link.classList.add("active-nav");
//     } else if (currentPath === '/' && linkPath === '/red_integridad/') { // Handle root index
//       link.classList.add("active-nav");
//     }
//   });
// });