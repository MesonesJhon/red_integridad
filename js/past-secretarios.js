// Script mejorado y simplificado para toggle
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - Inicializando toggle...');
    
    const toggleBtn = document.getElementById('togglePSSection');
    const tablePS = document.getElementById('tableViewPS');
    const timelinePS = document.getElementById('timelineViewPS');
    
    // Verificar que los elementos existen
    if (!toggleBtn || !tablePS || !timelinePS) {
        console.error('No se encontraron todos los elementos necesarios');
        return;
    }
    
    console.log('Todos los elementos encontrados correctamente');
    
    // Estado inicial explícito
    let isTableView = true;
    
    // Función para cambiar entre vistas
    function toggleView() {
        console.log('Cambiando vista. Estado actual:', isTableView ? 'Tabla' : 'Timeline');
        
        if (isTableView) {
            // Cambiar a línea de tiempo
            tablePS.style.display = 'none';
            timelinePS.style.display = 'block';
            toggleBtn.textContent = 'Ver en Tabla';
            toggleBtn.classList.add('btn-timeline-active');
            isTableView = false;
            
            console.log('Mostrando línea de tiempo');
            
        } else {
            // Cambiar a tabla
            tablePS.style.display = 'block';
            timelinePS.style.display = 'none';
            toggleBtn.textContent = 'Ver en Línea de Tiempo';
            toggleBtn.classList.remove('btn-timeline-active');
            isTableView = true;
            
            console.log('Mostrando tabla');
        }
        
        // Animar la transición
        animateTransition();
    }
    
    // Función para animar la transición
    function animateTransition() {
        const activeView = isTableView ? tablePS : timelinePS;
        const inactiveView = isTableView ? timelinePS : tablePS;
        
        // Efecto de fade in/out
        activeView.style.opacity = '0';
        activeView.style.transform = 'scale(0.95)';
        activeView.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            activeView.style.opacity = '1';
            activeView.style.transform = 'scale(1)';
        }, 50);
    }
    
    // Función para animar elementos individuales
    function animateElements(selector, delay) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `opacity 0.5s ease ${index * delay}ms, transform 0.5s ease ${index * delay}ms`;
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * delay);
        });
    }
    
    // Inicializar animaciones
    function initAnimations() {
        console.log('Inicializando animaciones...');
        animateElements('.secretarios-table tbody tr', 100);
    }
    
    // Event listener para el botón
    toggleBtn.addEventListener('click', toggleView);
    
    // Inicializar
    initAnimations();
    
    console.log('Toggle inicializado correctamente');
});

// Script de respaldo - se ejecuta si el principal falla
setTimeout(function() {
    const toggleBtn = document.getElementById('togglePSSection');
    const tablePS = document.getElementById('tableViewPS');
    const timelinePS = document.getElementById('timelineViewPS');
    
    if (toggleBtn && !toggleBtn.hasAttribute('data-listener-added')) {
        console.log('Ejecutando script de respaldo...');
        
        toggleBtn.setAttribute('data-listener-added', 'true');
        let isTableView = true;
        
        toggleBtn.addEventListener('click', function() {
            console.log('Botón clickeado (respaldo)');
            
            if (isTableView) {
                tablePS.style.display = 'none';
                timelinePS.style.display = 'block';
                this.textContent = 'Ver en Tabla';
                isTableView = false;
            } else {
                tablePS.style.display = 'block';
                timelinePS.style.display = 'none';
                this.textContent = 'Ver en Línea de Tiempo';
                isTableView = true;
            }
        });
    }
}, 1000);