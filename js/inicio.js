// modal.js - Sistema de modales para información detallada
document.addEventListener('DOMContentLoaded', function() {
    const modalOverlay = document.getElementById('modalOverlay');
    const modals = {
        eje1: document.getElementById('modalEje1'),
        eje2: document.getElementById('modalEje2'),
        eje3: document.getElementById('modalEje3')
    };

    // Función para abrir modal
    window.openModal = function(modalId) {
        console.log('Abriendo modal:', modalId); // Para debug
        
        // Cerrar todos los modales primero
        Object.values(modals).forEach(modal => {
            if (modal) {
                modal.style.display = 'none';
                console.log('Cerrando modal:', modal.id);
            }
        });

        // Mostrar el modal específico
        const modal = modals[modalId];
        if (modal) {
            modal.style.display = 'block';
            modalOverlay.style.display = 'flex';
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Mostrando modal:', modal.id);
        }
    }

    // Función para cerrar modal
    window.closeModal = function() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Ocultar después de la animación
        setTimeout(() => {
            modalOverlay.style.display = 'none';
            Object.values(modals).forEach(modal => {
                if (modal) modal.style.display = 'none';
            });
        }, 300);
    }

    // Cerrar modal al hacer clic fuera del contenido
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Prevenir que el clic dentro del modal cierre el overlay
    Object.values(modals).forEach(modal => {
        if (modal) {
            modal.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    });
});

// ⛔ ELIMINA COMPLETAMENTE ESTA FUNCIÓN ⛔
// function togglePanel(panelNumber) { ... }