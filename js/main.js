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
      e.preventDefault()
      const sectionId = this.getAttribute("data-section")

      // Update active nav link
      navLinks.forEach((l) => l.classList.remove("active"))
      this.classList.add("active")

      // Show active section
      sections.forEach((s) => s.classList.remove("active"))
      document.getElementById(sectionId).classList.add("active")

      // Close mobile menu
      const navbarMenu = document.getElementById("navbarMenu")
      const navbarToggle = document.getElementById("navbarToggle")
      if (navbarMenu.classList.contains("active")) {
        navbarMenu.classList.remove("active")
        navbarToggle.classList.remove("active")
      }
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

// Utility function to show notifications
function showNotification(message, type = "success") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === "success" ? "#10b981" : "#ef4444"};
        color: white;
        border-radius: 8px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease"
    setTimeout(() => notification.remove(), 300)
  }, 3000)
}
