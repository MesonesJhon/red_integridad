// Navbar Toggle for Mobile
document.addEventListener("DOMContentLoaded", () => {
  const navbarToggle = document.getElementById("navbarToggle")
  const navbarMenu = document.getElementById("navbarMenu")

  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener("click", () => {
      navbarMenu.classList.toggle("active")
      navbarToggle.classList.toggle("active")
    })

    // Cerrar menú cuando se hace clic en un enlace de navegación
    const navLinks = navbarMenu.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navbarMenu.classList.remove("active")
        navbarToggle.classList.remove("active")
      })
    })
  }

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (navbarMenu && navbarToggle && !e.target.closest(".navbar")) {
      navbarMenu.classList.remove("active")
      navbarToggle.classList.remove("active")
    }
  })
})
