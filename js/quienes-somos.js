// Quiénes Somos Section - Enhanced JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality for Quiénes Somos page
  initQuienesSomosAnimations();
});

// Initialize animations and interactions for Quiénes Somos page
function initQuienesSomosAnimations() {
  // Add any specific animations or interactions for the Quiénes Somos page here
  // This section can be expanded with specific functionality as needed
  
  // Example: Smooth scroll animations for sections
  const sections = document.querySelectorAll('.section-quienes-somos, .section-mv, .section-org, .section-valores');
  
  sections.forEach((section, index) => {
    // Add fade-in animation on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1
    });
    
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}

