// Nosotros Section Content
document.addEventListener("DOMContentLoaded", () => {
  const nosotrosSection = document.getElementById("nosotros")

  nosotrosSection.innerHTML = `
        <div class="section-header">
            <h2>Sobre Nosotros</h2>
            <p>Conoce nuestra misión, visión y valores</p>
        </div>

        <div class="about-content">
            <div class="about-card">
                <h3>Misión</h3>
                <p>Promover la integridad, transparencia y combate a la corrupción en organizaciones públicas y privadas a través de soluciones innovadoras y acompañamiento especializado.</p>
            </div>

            <div class="about-card">
                <h3>Visión</h3>
                <p>Ser la red de referencia en América Latina para la promoción de estándares de integridad y transparencia en la gestión pública y privada.</p>
            </div>

            <div class="about-card">
                <h3>Valores</h3>
                <ul class="values-list">
                    <li>Integridad en todas nuestras acciones</li>
                    <li>Transparencia en procesos y resultados</li>
                    <li>Excelencia en la calidad de nuestro trabajo</li>
                    <li>Inclusión y participación multiactor</li>
                    <li>Compromiso con el cambio social</li>
                </ul>
            </div>
        </div>
    `
})
