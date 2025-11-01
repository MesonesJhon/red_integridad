// Navbar Toggle for Mobile
document.addEventListener("DOMContentLoaded", () => {
  const navbarToggle = document.getElementById("navbarToggle")
  const navbarMenu = document.getElementById("navbarMenu")

  if (navbarToggle) {
    navbarToggle.addEventListener("click", () => {
      navbarMenu.classList.toggle("active")
      navbarToggle.classList.toggle("active")
    })
  }

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar")) {
      navbarMenu.classList.remove("active")
      navbarToggle.classList.remove("active")
    }
  })
})
