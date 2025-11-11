// Script para toggle entre tabla y línea de tiempo
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('togglePSSection');
    const tablePS = document.getElementById('tableViewPS');
    const timelinePS = document.getElementById('timelineViewPS');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            if (tablePS.style.display === '' || tablePS.style.display === 'block') {
                tablePS.style.display = 'none';
                timelinePS.style.display = 'block';
                this.textContent = 'Ver en Tabla';
            } else {
                tablePS.style.display = 'block';
                timelinePS.style.display = 'none';
                this.textContent = 'Ver en Línea de Tiempo';
            }
        });
    }
    
    // Añadir efecto de aparición suave a los elementos de la tabla
    const tableRows = document.querySelectorAll('.secretarios-table tbody tr');
    tableRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        row.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Añadir efecto de aparición suave a los elementos de la línea de tiempo horizontal
    const timelineItems = document.querySelectorAll('.timeline-item-horizontal');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 150 * index);
    });
});