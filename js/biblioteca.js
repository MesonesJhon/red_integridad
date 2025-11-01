// Biblioteca Section Content
const documents = [
  {
    id: 1,
    title: "Guía de Estándares de Integridad",
    type: "PDF",
    description: "Documento completo con los 15 estándares de integridad y su aplicación",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Matriz de Cumplimiento",
    type: "Datos",
    description: "Herramienta Excel para evaluar cumplimiento de estándares",
    date: "2024-01-10",
  },
  {
    id: 3,
    title: "Informe de Transparencia 2023",
    type: "PDF",
    description: "Reporte anual sobre transparencia en proyectos de inversión pública",
    date: "2024-01-05",
  },
  {
    id: 4,
    title: "Video: Introducción a Integridad",
    type: "Video",
    description: "Capacitación introductoria sobre conceptos de integridad",
    date: "2023-12-20",
  },
  {
    id: 5,
    title: "Casos de Éxito",
    type: "Imagen",
    description: "Galería de proyectos exitosos implementando estándares",
    date: "2023-12-15",
  },
  {
    id: 6,
    title: "Manual de Veeduría",
    type: "PDF",
    description: "Guía práctica para veedores en la supervisión de proyectos",
    date: "2023-12-10",
  },
  {
    id: 7,
    title: "Estadísticas de Cumplimiento",
    type: "Datos",
    description: "Datos sobre cumplimiento de estándares por sector",
    date: "2023-12-05",
  },
  {
    id: 8,
    title: "Webinar: Gestión de Conflictos",
    type: "Video",
    description: "Sesión en línea sobre gestión de conflictos de interés",
    date: "2023-11-30",
  },
  {
    id: 9,
    title: "Infografía: Estándares Clave",
    type: "Imagen",
    description: "Resumen visual de los estándares más importantes",
    date: "2023-11-25",
  },
  {
    id: 10,
    title: "Política de Transparencia",
    type: "PDF",
    description: "Política institucional de transparencia y acceso a información",
    date: "2023-11-20",
  },
]

const dashboardData = [
  { project: "Proyecto A", standards: 14, total: 15 },
  { project: "Proyecto B", standards: 12, total: 15 },
  { project: "Proyecto C", standards: 15, total: 15 },
  { project: "Proyecto D", standards: 11, total: 15 },
  { project: "Proyecto E", standards: 13, total: 15 },
]

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

document.addEventListener("DOMContentLoaded", () => {
  const bibliotecaSection = document.getElementById("biblioteca")

  let bibliotecaHTML = `
        <div class="section-header">
            <h2>Biblioteca</h2>
            <p>Repositorio de documentos, guías, reportes y multimedia de la Red de Integridad</p>
        </div>

        <div class="filters-container">
            <span class="filter-label">Filtrar por:</span>
            <div class="filter-buttons">
                <button class="filter-btn active" data-filter="todos">Todos</button>
                <button class="filter-btn" data-filter="PDF">PDF</button>
                <button class="filter-btn" data-filter="Imagen">Imagen</button>
                <button class="filter-btn" data-filter="Video">Video</button>
                <button class="filter-btn" data-filter="Datos">Datos</button>
            </div>
        </div>

        <div class="documents-grid" id="documentsGrid">
    `

  documents.forEach((doc) => {
    const iconSVG = getDocumentIcon(doc.type)
    bibliotecaHTML += `
            <div class="document-card" data-type="${doc.type}">
                <div class="document-icon">
                    ${iconSVG}
                </div>
                <div class="document-info">
                    <span class="document-type">${doc.type}</span>
                    <h3 class="document-title">${doc.title}</h3>
                    <p class="document-description">${doc.description}</p>
                    <span class="document-date">${formatDate(doc.date)}</span>
                </div>
            </div>
        `
  })

  bibliotecaHTML += `
        </div>

        <div class="dashboard-section">
            <h3>Dashboard de Transparencia</h3>
            <div class="dashboard-table">
                <table>
                    <thead>
                        <tr>
                            <th>Proyecto</th>
                            <th>Estándares Cumplidos</th>
                            <th>Porcentaje</th>
                        </tr>
                    </thead>
                    <tbody id="dashboardBody">
                    </tbody>
                </table>
            </div>
        </div>
    `

  bibliotecaSection.innerHTML = bibliotecaHTML

  // Populate dashboard
  const dashboardBody = document.getElementById("dashboardBody")
  dashboardData.forEach((data) => {
    const percentage = (data.standards / data.total) * 100
    const row = document.createElement("tr")
    row.innerHTML = `
            <td>${data.project}</td>
            <td>${data.standards}/${data.total}</td>
            <td>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                ${percentage.toFixed(0)}%
            </td>
        `
    dashboardBody.appendChild(row)
  })

  // Filter functionality
  const filterBtns = document.querySelectorAll(".filter-btn")
  const documentCards = document.querySelectorAll(".document-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      filterBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      documentCards.forEach((card) => {
        if (filter === "todos" || card.getAttribute("data-type") === filter) {
          card.style.display = "flex"
        } else {
          card.style.display = "none"
        }
      })
    })
  })
})

function getDocumentIcon(type) {
  const icons = {
    PDF: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>',
    Imagen:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
    Video:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>',
    Datos:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
  }
  return icons[type] || icons["PDF"]
}
