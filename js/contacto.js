// Contacto Section Content
document.addEventListener("DOMContentLoaded", () => {
    // Form submission
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Validar checkbox de términos
            const agreeTerms = document.getElementById("agreeTerms");
            if (!agreeTerms.checked) {
                showNotification("Debes aceptar la política de privacidad y los términos de servicio.", "error");
                return;
            }

            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;
            const email = document.getElementById("email").value;
            const subject = document.getElementById("subject").value;
            const message = document.getElementById("message").value;

            // Simulate form submission
            console.log("Formulario enviado:", { 
                firstName, 
                lastName, 
                email, 
                subject, 
                message 
            });

            // Add ripple effect to button
            const submitBtn = contactForm.querySelector('.btn-primary');
            const ripple = document.createElement("span");
            ripple.style.cssText = `
                position: absolute;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: translate(-50%, -50%);
                left: 50%;
                top: 50%;
                animation: ripple 0.6s ease-out;
            `;
            submitBtn.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Show success notification
            showNotification("¡Correo enviado exitosamente! Nos pondremos en contacto pronto.", "success");

            // Reset form after a short delay
            setTimeout(() => {
                contactForm.reset();
            }, 500);
        });
    }
});

// Show notification function
// Usa la función global de main.js si está disponible, sino usa esta implementación local
function showNotification(message, type = "success") {
    // Si la función global existe, usarla
    if (typeof window.showNotification === 'function' && window.showNotification !== showNotification) {
        return window.showNotification(message, type);
    }
    
    // Implementación local (fallback)
    // Remove existing notifications
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
    
    // Auto-remove after 4 seconds
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
    
    // Close on click
    notification.addEventListener("click", () => {
        clearTimeout(removeTimeout);
        notification.style.animation = "slideOutBottom 0.4s ease-in";
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    });
}