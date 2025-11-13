document.addEventListener('DOMContentLoaded', function () {
    const navbarToggle = document.getElementById('navbarToggle'); // botón toggle
    const navbarMenu = document.getElementById('navbarMenu');     // contenedor de links
    const headerLinks = document.querySelectorAll('.header-link'); // todos los links del menú

    // Crear overlay para menú móvil
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);

    // Toggle del menú principal con overlay
    navbarToggle.addEventListener('click', function () {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = navbarMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Cerrar menú al hacer clic en overlay
    menuOverlay.addEventListener('click', function () {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Cerrar menú al hacer clic en enlaces (solo en móvil)
    headerLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});
