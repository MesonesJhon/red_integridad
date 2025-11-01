// Inicio Section Content
document.addEventListener("DOMContentLoaded", () => {
  const inicioSection = document.getElementById("inicio")

  inicioSection.innerHTML = `
        <div class="hero">
            <div class="hero-content">
                <h1 class="hero-title">Construyendo organizaciones íntegras y transparentes</h1>
                <p class="hero-subtitle">Acompañamos a instituciones públicas y privadas en la implementación de sistemas robustos de integridad, transparencia y prevención de la corrupción.</p>
                <div class="hero-buttons">
                    <button class="btn btn-primary">Agendar consultoría</button>
                    <button class="btn btn-secondary">Conocer más</button>
                </div>
            </div>
        </div>

        <div class="stats-section">
            <div class="stats-container">
                <div class="stat-card">
                    <div class="stat-number">150+</div>
                    <div class="stat-label">Organizaciones asesoradas</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">98%</div>
                    <div class="stat-label">Índice de satisfacción</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">12</div>
                    <div class="stat-label">Años de experiencia</div>
                </div>
            </div>
        </div>

        <div class="services-section">
            <div class="section-header">
                <h2>Nuestros servicios</h2>
                <p>Soluciones integrales para fortalecer la cultura de integridad en su organización</p>
            </div>

            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                    </div>
                    <h3>Sistemas de Integridad</h3>
                    <p>Diseño e implementación de sistemas de gestión de integridad adaptados a su organización</p>
                </div>

                <div class="service-card">
                    <div class="service-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    </div>
                    <h3>Capacitación</h3>
                    <p>Programas de formación para equipos en ética, compliance y prevención de corrupción</p>
                </div>

                <div class="service-card">
                    <div class="service-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                    </div>
                    <h3>Auditorías</h3>
                    <p>Evaluación independiente de controles internos y procesos de transparencia</p>
                </div>

                <div class="service-card">
                    <div class="service-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 17"></polyline>
                            <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                    </div>
                    <h3>Análisis de Riesgos</h3>
                    <p>Identificación y mapeo de riesgos de corrupción y conflictos de interés</p>
                </div>

                <div class="service-card">
                    <div class="service-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <h3>Compliance</h3>
                    <p>Implementación de programas de cumplimiento normativo y mejores prácticas</p>
                </div>

                <div class="service-card">
                    <div class="service-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                    </div>
                    <h3>Certificaciones</h3>
                    <p>Acompañamiento en procesos de certificación internacional en integridad</p>
                </div>
            </div>
        </div>
    `
})
