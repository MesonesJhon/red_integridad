// Estándares Section Content
const standards = [
  {
    number: 1,
    title: "Participación Multiactor",
    risks: "Falta de inclusión de actores relevantes en la toma de decisiones",
    indicators: "Número de actores participantes, frecuencia de reuniones, representatividad",
    actions: "Establecer espacios de participación, documentar decisiones, garantizar transparencia",
  },
  {
    number: 2,
    title: "Transparencia en Procesos",
    risks: "Información no accesible o incompleta sobre procesos de inversión",
    indicators: "Disponibilidad de información pública, acceso a documentos, claridad de procesos",
    actions: "Publicar información, crear portales de transparencia, capacitar en acceso a información",
  },
  {
    number: 3,
    title: "Rendición de Cuentas",
    risks: "Falta de responsabilidad en la ejecución de proyectos",
    indicators: "Reportes de avance, auditorías realizadas, respuesta a denuncias",
    actions: "Establecer mecanismos de reporte, realizar auditorías periódicas, crear canales de denuncia",
  },
  {
    number: 4,
    title: "Gestión de Conflictos de Interés",
    risks: "Decisiones sesgadas por intereses particulares",
    indicators: "Declaraciones de interés, conflictos identificados, resoluciones documentadas",
    actions: "Implementar políticas de conflicto de interés, capacitar funcionarios, documentar decisiones",
  },
  {
    number: 5,
    title: "Selección Transparente de Contratistas",
    risks: "Favoritismo en la selección de proveedores",
    indicators: "Procesos de selección documentados, criterios claros, participantes registrados",
    actions: "Publicar convocatorias, establecer criterios objetivos, documentar evaluaciones",
  },
  {
    number: 6,
    title: "Gestión de Presupuesto",
    risks: "Desviación de recursos, gastos no justificados",
    indicators: "Presupuesto ejecutado vs. planificado, justificación de gastos, auditorías",
    actions: "Establecer presupuestos detallados, realizar seguimiento, auditar gastos",
  },
  {
    number: 7,
    title: "Monitoreo de Ejecución",
    risks: "Proyectos no ejecutados según lo planificado",
    indicators: "Avance físico, cumplimiento de cronograma, calidad de obra",
    actions: "Establecer indicadores, realizar inspecciones, documentar avances",
  },
  {
    number: 8,
    title: "Gestión de Riesgos",
    risks: "Identificación tardía de problemas en proyectos",
    indicators: "Riesgos identificados, planes de mitigación, seguimiento de riesgos",
    actions: "Realizar análisis de riesgos, crear planes de contingencia, monitorear riesgos",
  },
  {
    number: 9,
    title: "Protección de Denunciantes",
    risks: "Represalias contra personas que denuncian irregularidades",
    indicators: "Denuncias recibidas, protección implementada, seguimiento de casos",
    actions: "Crear canales seguros de denuncia, proteger identidad, investigar denuncias",
  },
  {
    number: 10,
    title: "Capacitación en Integridad",
    risks: "Falta de conocimiento sobre estándares de integridad",
    indicators: "Personal capacitado, cobertura de capacitación, evaluación de conocimiento",
    actions: "Diseñar programas de capacitación, capacitar regularmente, evaluar aprendizaje",
  },
  {
    number: 11,
    title: "Gestión de Información",
    risks: "Pérdida o manipulación de información importante",
    indicators: "Sistemas de información implementados, acceso controlado, respaldos realizados",
    actions: "Implementar sistemas seguros, controlar acceso, realizar respaldos periódicos",
  },
  {
    number: 12,
    title: "Evaluación de Impacto",
    risks: "Proyectos que no generan impacto esperado",
    indicators: "Impacto medido, beneficiarios identificados, resultados documentados",
    actions: "Establecer línea base, medir impacto, documentar resultados",
  },
  {
    number: 13,
    title: "Sostenibilidad",
    risks: "Proyectos que no se mantienen en el tiempo",
    indicators: "Capacidad de mantenimiento, recursos asignados, planes de sostenibilidad",
    actions: "Planificar sostenibilidad, asignar recursos, capacitar en mantenimiento",
  },
  {
    number: 14,
    title: "Equidad y Acceso",
    risks: "Beneficios no llegan a poblaciones vulnerables",
    indicators: "Cobertura en poblaciones vulnerables, acceso equitativo, participación inclusiva",
    actions: "Diseñar acciones inclusivas, monitorear cobertura, garantizar participación",
  },
  {
    number: 15,
    title: "Mejora Continua",
    risks: "Falta de aprendizaje de experiencias previas",
    indicators: "Lecciones aprendidas documentadas, mejoras implementadas, retroalimentación",
    actions: "Documentar lecciones, implementar mejoras, crear ciclos de retroalimentación",
  },
]

document.addEventListener("DOMContentLoaded", () => {
  const estandaresSection = document.getElementById("estandares")

  let standardsHTML = `
        <div class="section-header">
            <h2>Estándares de Integridad</h2>
            <p>Los 15 Estándares de Integridad son principios fundamentales que guían la veeduría multiactor en proyectos de inversión pública.</p>
        </div>

        <div class="standards-grid" id="standardsGrid">
    `

  standards.forEach((standard) => {
    standardsHTML += `
            <div class="standard-card" data-standard="${standard.number}">
                <div class="standard-header">
                    <div class="standard-number">${standard.number}</div>
                    <div class="standard-title">${standard.title}</div>
                </div>
                <div class="standard-content">
                    <div class="standard-detail">
                        <h4>Riesgos</h4>
                        <p>${standard.risks}</p>
                    </div>
                    <div class="standard-detail">
                        <h4>Indicadores</h4>
                        <p>${standard.indicators}</p>
                    </div>
                    <div class="standard-detail">
                        <h4>Acciones para Veedores</h4>
                        <p>${standard.actions}</p>
                    </div>
                </div>
            </div>
        `
  })

  standardsHTML += `
        </div>

        <div class="resources-section">
            <h3>Recursos Complementarios</h3>
            <div class="resources-grid">
                <div class="resource-card">
                    <h4>Guía Completa de Estándares</h4>
                    <p>Documento integral con todos los estándares, marco legal, indicadores y mejores prácticas.</p>
                    <button class="btn btn-link">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Descargar PDF
                    </button>
                </div>
                <div class="resource-card">
                    <h4>Matriz de Cumplimiento</h4>
                    <p>Herramienta para evaluar el cumplimiento de estándares en proyectos específicos.</p>
                    <button class="btn btn-link">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Descargar Excel
                    </button>
                </div>
            </div>
        </div>
    `

  estandaresSection.innerHTML = standardsHTML

  // Add click handlers for expanding standards
  const standardCards = document.querySelectorAll(".standard-card")
  standardCards.forEach((card) => {
    card.addEventListener("click", function () {
      this.classList.toggle("expanded")
    })
  })
})
