// Contacto Section Content
document.addEventListener("DOMContentLoaded", () => {
  const contactoSection = document.getElementById("contacto")

  contactoSection.innerHTML = `
        <div class="section-header">
            <h2>Contacto</h2>
            <p>¿Listo para fortalecer la integridad de su organización?</p>
        </div>

        <div class="contact-container">
            <form class="contact-form" id="contactForm">
                <div class="form-group">
                    <label for="name">Nombre</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Correo Electrónico</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="organization">Organización</label>
                    <input type="text" id="organization" name="organization" required>
                </div>
                <div class="form-group">
                    <label for="message">Mensaje</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
            </form>

            <div class="contact-info">
                <div class="info-item">
                    <h4>Correo Electrónico</h4>
                    <p>info@redintegridad.org</p>
                </div>
                <div class="info-item">
                    <h4>Teléfono</h4>
                    <p>+51 (74) 123-4567</p>
                </div>
                <div class="info-item">
                    <h4>Ubicación</h4>
                    <p>Chiclayo, Lambayeque, Perú</p>
                </div>
                <div class="info-item">
                    <h4>Redes Sociales</h4>
                    <div class="social-links">
                        <a href="#" class="social-link">Facebook</a>
                        <a href="#" class="social-link">Twitter</a>
                        <a href="#" class="social-link">LinkedIn</a>
                    </div>
                </div>
            </div>
        </div>
    `

  // Form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const organization = document.getElementById("organization").value
      const message = document.getElementById("message").value

      // Simulate form submission
      console.log("Formulario enviado:", { name, email, organization, message })

      // Declare showNotification function
      function showNotification(message, type) {
        alert(message)
      }

      showNotification("¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.", "success")

      // Reset form
      contactForm.reset()
    })
  }
})
