// Qué hacemos Section - Enhanced JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initSearch();
  initFilters();
  initStandardCards();
  initResourceActions();
  updateFilterCounts();
});

const standardsData = {
  "1": {
    title: "El proyecto de inversión pública cierra brechas y es de interés público",
    standardDescription: "El proyecto de inversión pública cierra brechas de infraestructura y busca brindar servicios públicos oportunamente a la población beneficiaria.",
    riskDescription: "El proyecto de inversión pública no contribuye a cerrar brechas de infraestructura o servicios públicos, por lo que no atiende o resuelve la necesidad de los beneficiarios.",
    indicators: [
      "1.1 El proyecto de inversión contribuye a reducir brechas de un sector priorizado para la región.",
      "1.2 El porcentaje que aporta la inversión pública al cierre de brechas en un sector priorizado es mayor a 0 %."
    ],
    verifications: [
      "1 Registro de proyecto de inversión (Formato N° 12-A)<br>Indicador de brecha (Formato N° F4-A)<br>Seguimiento de cierre de brechas (Formato N° F12-A)<br>Ver: Directiva N° 001-2019-EF/63.01",
      "2 Solicitud de Acceso a Información Pública (SAIP)",
      "3 Revisión del Sistema de Seguimiento de Inversión Pública (SSI-MEF)",
    ],
    cumplimiento: "Si se cumplen estos verificadores / indicadores,\n¡ya cumplimos el ESTÁNDAR 1!",
  },
  "2": {
    title: "Gestión integral de riesgos durante la ejecución de la inversión pública",
    standardDescription: "La entidad cuenta con una matriz o plan de acción de mitigación de riesgos a fin de prevenir suspensiones, paralizaciones o retrasos durante la ejecución de la inversión.",
    riskDescription: "Las áreas vinculadas a la ejecución de la inversión no identifican riesgos ni los mitigan, lo que afecta la continuidad y culminación oportuna.",
    indicators: [
      "2.1 La entidad cuenta con una matriz de riesgos aplicable al proyecto de inversión pública en ejecución.",
      "2.2 El porcentaje de avance de la implementación del plan de acción de mitigación de los riesgos identificado en el proyecto de inversión en ejecución es mayor o igual a 50 %.* (*): Este indicador, en algunas inversiones, será verificado en la ejecución contractual."
    ],
    verifications: [
      "Matriz o plan de acción de mitigación de riesgos identificados o equivalente (Ver: Directiva de Gestión de Riesgos del OSCE).",
      "Solicitud de Acceso a Información Pública (SAIP) a la Unidad Ejecutora de Inversiones."
    ],
    cumplimiento: "Si se cumplen ambos verificadores / indicadores,\n¡ya cumplimos el ESTÁNDAR 2!\nSi solo se cumple con el verificador 2.1, se cumple parcialmente.",
  },
  "3": {
    title: "Presentación oportuna de la Declaración Jurada de Intereses (DJI)",
    standardDescription: "La entidad verifica que los funcionarios y servidores vinculados a la gestión de la contratación pública presenten su DJI y no incurran en conflictos de interés.",
    riskDescription: "El interés personal de los funcionarios y servidores interfiere con el interés público, lo que influye en el cumplimiento de sus funciones y responsabilidades.",
    indicators: [
      "3.1 El porcentaje de funcionarios y servidores vinculados al proceso de contratación de la obra que presentan su DJI es mayor o igual al 50 %.",
      "3.2 Funcionarios que presentaron su DJI no incurren en conflicto de intereses con el ganador de la buena pro y/o el contratista. La entidad y sociedad civil verifican este indicador mediante el cruce de las declaraciones juradas presentadas por los funcionarios indicados en la lista con el ganador de la buena pro y/o contratista."
    ],
    verifications: [
      "Lista de funcionarios vinculados a las contrataciones públicas. Se adjunta la lista al final de la guía.",
      "Plataforma de la Contraloría General de la República: Sistema de Declaraciones Juradas para la Gestión de Conflicto de Intereses."
    ],
    cumplimiento: "Si se cumplen estos verificadores / indicadores,\n¡ya cumplimos el ESTÁNDAR 3!\nSi solo se cumple con el indicador 3.1, se cumple parcialmente. (Ver lista en la última página)",
  },
  "4": {
    title: "Calidad del Expediente Técnico de Obra (ETO)",
    standardDescription: "El ETO se elabora bajo criterios de calidad, eficiencia, oportunidad y costo razonable.",
    riskDescription: "Existen deficiencias en la elaboración y aprobación del ETO al no contener los estudios técnicos y componentes completos, lo que limita la pluralidad de proveedores y conlleva a que la obra no culmine oportunamente.",
    indicators: [
      "4.1 La entidad identifica las interferencias en el ETO y establece medidas de mitigación.",
      "4.2 La entidad cuenta con la libre disponibilidad del terreno donde se va a construir la obra.",
      "4.3 La inversión pública cuenta con información actualizada en el Sistema de Seguimiento de Inversiones (SSI) sobre el avance de la ejecución.",
      "4.4 La entidad informa a la población beneficiaria acerca del alcance del proyecto de inversión pública.",
      "4.5 El área usuaria adjunta en su requerimiento una lista de contenido mínimo del ETO."
    ],
    verifications: [
      "Resolución de aprobación del ETO.",
      "Expediente Técnico de Obra.",
      "SSI del MEF.",
      "Checklist de contenido mínimo de ETO adoptada por las áreas usuarias en sus requerimientos."
    ],
    cumplimiento: "Si se cumplen estos verificadores\n¡ya cumplimos el ESTÁNDAR 4!\nSi solo se cumple con los verificadores 4.1, 4.2 y 4.3, se cumple parcialmente.",
  },
  "5": {
    title: "Acuerdos de colaboración público-privada",
    standardDescription: "La entidad suscribe acuerdos de colaboración público-privada para mejorar la elaboración del ETO, la integridad y la transparencia en la ejecución de la inversión pública.",
    riskDescription: "Los limitados espacios de diálogo y colaboración público-privada no permiten mejorar la calidad del expediente técnico y promover pluralidad, lo que genera mayores costos y retrasos en la ejecución contractual.",
    indicators: [
      "5.1 La entidad conforma una mesa técnica público-privada y aprueba un plan de trabajo para la elaboración del ETO.",
      "5.2 La entidad suscribe un compromiso de colaboración público-privada para ejecutar la inversión pública bajo un enfoque de integridad, transparencia y eficiencia.",
      "5.3 La entidad socializa el Formato de Inversión Pública y comparte el alcance del proyecto con potenciales proveedores a través de la página web, en reuniones abiertas o eventos institucionales participativos (formato disponible para descarga en el código QR al final de la guía)."
    ],
    verifications: [
      "Acuerdo de conformación de una mesa técnica público-privada.",
      "Plan de trabajo para la elaboración del ETO.",
      "Acuerdo de colaboración público-privada para ejecutar la inversión pública.",
      "Publicación de Formato de Inversión Pública en las plataformas estatales, reuniones o eventos institucionales."
    ],
    cumplimiento: "Si se cumple al menos uno de estos verificadores,\n¡ya cumplimos el ESTÁNDAR 5!",
  },
  "6": {
    title: "La convocatoria contiene reglas de juego transparentes",
    standardDescription: "La convocatoria del procedimiento de selección se realiza oportunamente en el SEACE, o una plataforma equivalente de acuerdo con las condiciones normativas, y promueve la competencia.",
    riskDescription: "La convocatoria del procedimiento de selección contiene información parcial, incompleta o incoherente que limita la participación de proveedores y transgrede los principios de competencia, igualdad e integridad.",
    indicators: [
      "6.1 El tiempo transcurrido desde la fecha de la aprobación del ETO hasta la fecha de la convocatoria es menor o igual a 9 meses.",
      "6.2 La entidad publica el ETO completo y la resolución que lo aprueba en el SEACE.",
      "6.3 El procedimiento de selección no es declarado nulo debido a una inobservancia de la normativa aplicable.",
      "6.4 La entidad implementa todas las observaciones formuladas por el OSCE sobre los documentos del procedimiento de selección como resultado de sus acciones de supervisión."
    ],
    verifications: [
      "Resolución de aprobación del ETO.",
      "Registro de publicación del ETO en el SEACE, en la sección del procedimiento de selección.",
      "Bases administrativas del procedimiento de selección publicadas en el SEACE."
    ],
    cumplimiento: "Si se cumplen estos verificadores/indicadores,\n¡ya cumplimos el ESTÁNDAR 6!\nSi solo se cumple con el indicador 6.1 y los verificadores 6.2 y 6.3, se cumple parcialmente.",
  },
  "7": {
    title: "Absolución motivada de consultas y observaciones",
    standardDescription: "La entidad absuelve las consultas y observaciones de los documentos del procedimiento de selección de manera motivada a fin de promover la competencia y pluralidad.",
    riskDescription: "La absolución de consultas y observaciones no es motivada o transgrede la normativa de contrataciones públicas, lo que limita la pluralidad de postores y la elección de la mejor propuesta.",
    indicators: [
      "7.1 El comité de selección y el área usuaria absuelven de manera motivada las consultas y observaciones formuladas por los participantes."
    ],
    verifications: [
      "Pliego de absolución de consultas y observaciones elaborado por el comité de selección, publicado en el SEACE."
    ],
    cumplimiento: "Si se cumple el verificador,\n¡ya cumplimos el ESTÁNDAR 7!",
  },
  "8": {
    title: "Pluralidad de propuestas y trato igualitario",
    standardDescription: "Existe pluralidad de propuestas en el procedimiento de selección a fin de generar competencia efectiva y transparente.",
    riskDescription: "En muchos procesos de selección se presenta solamente una propuesta, lo que podría deberse a posibles deficiencias en las bases, indicios de direccionamiento o valores referenciales que no se ajustan al mercado. Si bien la norma permite adjudicar ante una sola propuesta presentada, con el estándar se busca generar competencia y pluralidad.",
    indicators: [
      "8.1 El número de propuestas presentadas en el procedimiento de selección es mayor o igual a 2."
    ],
    verifications: [
      "Acta de presentación y evaluación de propuestas suscrita por los miembros del comité de selección, publicada en la ficha del procedimiento de selección del SEACE."
    ],
    cumplimiento: "Si se cumple el indicador,\n¡ya cumplimos el ESTÁNDAR 8!",
  },
  "9": {
    title: "Fiscalización posterior oportuna de la propuesta ganadora",
    standardDescription: "La entidad fiscaliza la propuesta del postor ganador a fin de verificar que no existan documentos falsos o inexactos.",
    riskDescription: "Algunos postores presentan documentos falsos o inexactos para ganar la buena pro de manera indebida, situación que podría generar la nulidad del contrato y, por ende, la demora en la atención de una necesidad de interés público.",
    indicators: [
      "9.1 La entidad realiza la fiscalización posterior a los documentos presentados por el postor ganador, una vez consentida la buena pro.",
      "9.2 El número de documentos falsos o inexactos que se identificó en la propuesta técnica del postor ganador es igual a 0.",
      "9.3 La entidad emite el informe de resultados de fiscalización posterior hasta antes de la entrega del adelanto al contratista."
    ],
    verifications: [
      "Oficio o carta de fiscalización posterior remitida a instituciones públicas o privadas por parte del Órgano Encargado de las Contrataciones (OEC).",
      "Informe de resultado de fiscalización posterior de documentos."
    ],
    cumplimiento: "Si se cumplen estos verificadores/indicadores,\n¡ya cumplimos el ESTÁNDAR 9!\nSi solo se cumple con el indicador 9.2, se cumple parcialmente.",
  },
  "10": {
    title: "Suscripción de contrato de acuerdo a requisitos legales",
    standardDescription: "La entidad suscribe el contrato de acuerdo con los requisitos establecidos y publica el contrato en el SEACE.",
    riskDescription: "La entidad dilata injustificadamente la firma del contrato o no verifica adecuadamente los requisitos exigibles en las bases administrativas, lo que afecta el cumplimiento de plazos y el inicio de la obra.",
    indicators: [
      "10.1 La entidad suscribe el contrato de acuerdo con los requisitos previstos en las bases y lo publica en el SEACE como máximo a los 10 días hábiles de suscrito.",
      "10.2 La entidad verifica la veracidad de la garantía de fiel cumplimiento presentada por el postor ganador y que haya sido emitida por una entidad supervisada y autorizada por la SBS.",
      "10.3 El contrato incluye la cláusula sobre la Junta de Resolución de Disputas como mecanismo de solución de controversias."
    ],
    verifications: [
      "Contrato suscrito y publicado en el SEACE dentro del plazo.",
      "Nombre de la entidad financiera que emite la garantía (cartas fianza).",
      "Verificación en el portal web de la SBS de que la entidad financiera tiene autorización para emitir cartas fianza."
    ],
    cumplimiento: "Si se cumplen estos verificadores,\n¡ya cumplimos el ESTÁNDAR 10!\nSi solo se cumple con los verificadores 10.1 y 10.2, se cumple parcialmente.",
  },
  "11": {
    title: "Supervisión de obra permanente y preventiva",
    standardDescription: "La supervisión de la obra es permanente, está orientada a asegurar su calidad y a prevenir situaciones que afecten su continuidad.",
    riskDescription: "En algunas obras, la supervisión no es permanente ni ayuda a verificar la calidad y cumplimiento del ETO. No existe una adecuada articulación entre el contratista y supervisión a fin de prevenir, alertar y tomar decisiones oportunas que permitan continuar con la ejecución de la obra.",
    indicators: [
      "11.1 La obra cuenta con un supervisor contratado por la entidad que monitorea la ejecución de la obra desde el inicio del plazo del contrato hasta su culminación.",
      "11.2 La obra cuenta con cuaderno de obra físico o digital actualizado que registra ocurrencias, órdenes, consultas y respuestas.",
      "11.3 No existen quejas o reclamos del contratista o entidad sobre la ausencia del supervisor en la ejecución de la obra según el cuaderno de obra.",
      "11.4 La supervisión desarrolla su consultoría sin incurrir en causales de penalidad o incumplimientos pasibles de resolución de contrato."
    ],
    verifications: [
      "Contrato de supervisión de la obra.",
      "Anotaciones del estado de la ejecución de la obra a través del SSI del MEF.",
      "Anotaciones y ocurrencias en el cuaderno digital o físico de la obra sobre la labor de la supervisión."
    ],
    cumplimiento: "Si se cumplen estos verificadores,\n¡ya cumplimos el ESTÁNDAR 11!\nSi solo se cumple con los verificadores 11.1, 11.2 y 11.3, se cumple parcialmente.",
  },
  "12": {
    title: "Adicionales y ampliaciones de plazo motivados",
    standardDescription: "La entidad justifica la aprobación de adicionales o autorización de ampliaciones de plazo de manera oportuna.",
    riskDescription: "La aprobación de adicionales de prestación de obra o ampliaciones de plazo no son comunicados en los plazos legales o no aseguran el cumplimiento de la finalidad pública de la contratación.",
    indicators: [
      "12.1 La entidad comunica la aprobación de un adicional de obra al ejecutor de obra máximo a los 12 días hábiles, contados desde la conformidad del supervisor.",
      "12.2 La entidad comunica la aprobación de la solicitud de ampliación de plazo al ejecutor de obra máximo a los 15 días hábiles, contados desde el día siguiente de la recepción del informe del supervisor.",
      "12.3 La entidad absuelve la totalidad de situaciones adversas identificadas por la Contraloría General de la República (CGR) relacionadas a la aprobación de adicionales o ampliaciones de plazo."
    ],
    verifications: [
      "Resolución que aprueba adicional y comunicación al contratista dentro del plazo.",
      "Informe de la entidad mediante el cual comunica a la CGR la absolución de las situaciones adversas relacionadas a la aprobación de adicionales o ampliaciones de plazo."
    ],
    cumplimiento: "Si se cumplen estos verificadores / indicadores,\n¡ya cumplimos el ESTÁNDAR 12!\nSi solo se cumple con el indicador 12.1 o el 12.2, se cumple parcialmente.",
  },
  "13": {
    title: "Valorización de obra y pago oportuno y transparente",
    standardDescription: "La valorización y el pago se emiten dentro de los plazos previstos y de acuerdo con los requisitos establecidos en la normativa de contrataciones públicas.",
    riskDescription: "La valorización y el pago no son tramitados en los plazos previstos en la normativa, aspecto que puede generar suspensión por falta de pago o espacios antiéticos entre los funcionarios y contratistas a fin de agilizar dichos trámites.",
    indicators: [
      "13.1 La entidad devenga más del 70 % de la Programación Financiera Actualizada según el Sistema de Seguimiento de Inversiones (SSI) dentro del mes programado.",
      "13.2 El contratista no suspende la ejecución de la obra debido a falta de pago atribuible a la entidad.",
      "13.3 La entidad cuenta con un lineamiento para realizar el procedimiento de valorizaciones y pagos aplicable a obras públicas."
    ],
    verifications: [
      "Formato 12 B (SSI del MEF). Consultar ejecución financiera en la parte final de dicho formato, en donde aparece el devengado por mes respecto de la programación financiera actualizada.",
      "Consulta Amigable del MEF, que permite ver en tiempo real el presupuesto de la inversión pública y su nivel de ejecución.",
      "Acta de suspensión de obra por falta de pago por parte de la entidad.",
      "Lineamiento sobre procedimiento de valorización y pago aprobado por la entidad."
    ],
    cumplimiento: "Si se cumplen estos verificadores / indicadores,\n¡ya cumplimos el ESTÁNDAR 13!\nSi solo se cumple con el indicador 13.1 y el verificador 13.2, se cumple parcialmente.",
  },
  "14": {
    title: "Entidad absuelve las situaciones adversas de la CGR oportunamente",
    standardDescription: "Las situaciones adversas identificadas en los informes de la Contraloría General de la República (CGR) son corregidas y la entidad adopta acciones preventivas o correctivas.",
    riskDescription: "Las entidades no adoptan acciones para superar las situaciones adversas identificadas por la CGR o no las comunican, lo que puede generar responsabilidad administrativa, civil o penal en los funcionarios vinculados.",
    indicators: [
      "14.1 La entidad notifica a la CGR la implementación de las situaciones adversas como máximo a los 90 días calendario de recibido el informe de control.",
      "14.2 El porcentaje de situaciones adversas corregidas de acuerdo a la evaluación de la CGR es mayor o igual al 50 %.",
      "14.3 No existen funcionarios o servidores con responsabilidad administrativa, civil o penal identificados en informes de control por la CGR."
    ],
    verifications: [
      "Oficio de respuesta al informe de control de la CGR por parte de la entidad.",
      "Informe de control que indica qué situaciones adversas han sido corregidas por parte de la entidad.",
      "Informes de control específico a hechos con presunta irregularidad (identifica presuntos responsables de la entidad)."
    ],
    cumplimiento: "Si se cumplen estos indicadores,\n¡ya cumplimos el ESTÁNDAR 14!\nSi solo se cumple con el verificador 14.1 y el indicador 14.2, se cumple parcialmente.",
  },
  "15": {
    title: "Recepción de obra de acuerdo con el ETO",
    standardDescription: "La obra es recibida por la entidad, cumple con lo establecido en el ETO y con las modificaciones aprobadas por la entidad a fin de que esté al servicio de los usuarios.",
    riskDescription: "La conformación del comité de recepción e instalación demora más de lo previsto, no se comparte la documentación completa al comité o las observaciones formuladas no son levantadas por el contratista oportunamente, lo que afecta la puesta en funcionamiento de la obra.",
    indicators: [
      "15.1 El comité de recepción de obra se instala y revisa la documentación necesaria para la adecuada verificación de la obra dentro de 20 días hábiles.",
      "15.2 El comité de recepción suscribe el acta de recepción dentro de los plazos establecidos en el reglamento.",
      "15.3 El Colegio de Ingenieros, el Colegio de Arquitectos o un representante del órgano de control institucional de la entidad participan en calidad de veedores en el proceso de recepción."
    ],
    verifications: [
      "Resolución de la entidad que conforma el comité de recepción de obra.",
      "Acta de recepción de la obra."
    ],
    cumplimiento: "Si se cumplen estos verificadores / indicadores,\n¡ya cumplimos el ESTÁNDAR 15!\nSi solo se cumple con el verificador 15.2, se cumple parcialmente.",
  }
};

// Search functionality
function initSearch() {
  const searchInput = document.getElementById("searchInput");
  const clearSearch = document.getElementById("clearSearch");
  const noResults = document.getElementById("noResults");

  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const filterActive = document.querySelector(".filter-btn.active")?.getAttribute("data-filter") || "todos";
    
    if (searchTerm.length > 0) {
      clearSearch.style.display = "flex";
    } else {
      clearSearch.style.display = "none";
    }

    filterAndSearchStandards(searchTerm, filterActive);
  });

  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    clearSearch.style.display = "none";
    const filterActive = document.querySelector(".filter-btn.active")?.getAttribute("data-filter") || "todos";
    filterAndSearchStandards("", filterActive);
    searchInput.focus();
  });
}

// Filter functionality with enhanced animations
function initFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");
      const searchInput = document.getElementById("searchInput");
      const searchTerm = searchInput?.value.toLowerCase().trim() || "";

      // Remove active class from all buttons
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.style.transform = "scale(1)";
      });

      // Add active class and animation to clicked button
      this.classList.add("active");
      this.style.transform = "scale(0.95)";
      
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);

      // Filter standards
      filterAndSearchStandards(searchTerm, filter);
    });
  });
}

// Filter and search standards
function filterAndSearchStandards(searchTerm, filterType) {
  const standardCards = document.querySelectorAll(".standard-card");
  const noResults = document.getElementById("noResults");
  let visibleCount = 0;

  standardCards.forEach((card, index) => {
    const standardNumber = card.getAttribute("data-standard");
    const category = card.getAttribute("data-category") || "otros";
    const title = card.querySelector(".standard-title")?.textContent.toLowerCase() || "";
    const risks = card.querySelector(".standard-detail:nth-child(1) p")?.textContent.toLowerCase() || "";
    const indicators = card.querySelector(".standard-detail:nth-child(2) p")?.textContent.toLowerCase() || "";
    const actions = card.querySelector(".standard-detail:nth-child(3) p")?.textContent.toLowerCase() || "";
    
    const matchesFilter = filterType === "todos" || category === filterType;
    const matchesSearch = !searchTerm || 
                         title.includes(searchTerm) || 
                         risks.includes(searchTerm) || 
                         indicators.includes(searchTerm) || 
                         actions.includes(searchTerm);
    
    if (matchesFilter && matchesSearch) {
      card.setAttribute("data-visible", "true");
      card.style.display = "block";
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      
      setTimeout(() => {
        card.style.transition = "all 0.4s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 50 * visibleCount);
      
      visibleCount++;
    } else {
      card.setAttribute("data-visible", "false");
      card.style.transition = "all 0.3s ease";
      card.style.opacity = "0";
      card.style.transform = "scale(0.9)";
      
      setTimeout(() => {
        card.style.display = "none";
      }, 300);
    }
  });

  // Show/hide no results message
  setTimeout(() => {
    if (visibleCount === 0 && noResults) {
      noResults.style.display = "flex";
      noResults.style.animation = "fadeInUp 0.5s ease";
    } else if (noResults) {
      noResults.style.display = "none";
    }
  }, 400);

  // Update filter counts only if not filtering
  if (!searchTerm) {
    updateFilterCounts(filterType);
  }
}

// Update filter counts
function updateFilterCounts(activeFilter = null) {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const standardCards = document.querySelectorAll(".standard-card");
  
  filterBtns.forEach((btn) => {
    const filterType = btn.getAttribute("data-filter");
    let count = 0;

    if (filterType === "todos") {
      count = standardCards.length;
    } else {
      standardCards.forEach((card) => {
        const category = card.getAttribute("data-category") || "otros";
        if (category === filterType) {
          count++;
        }
      });
    }

    const countElement = btn.querySelector(".filter-count");
    if (countElement) {
      countElement.textContent = count;
    }
  });
}

// Initialize standard cards with modal interactions
function initStandardCards() {
  const standardCards = document.querySelectorAll(".standard-card");
  
  standardCards.forEach((card) => {
    // Mark as visible initially
    card.setAttribute("data-visible", "true");
    
    card.addEventListener("click", function (e) {
      // Don't open modal if clicking on a link or button inside
      if (e.target.closest("a") || e.target.closest("button")) {
        return;
      }
      
      openStandardModal(this);
    });

    // Keep hover effects
    card.addEventListener("mouseenter", function() {
      this.style.transform = "translateY(-4px)";
    });

    card.addEventListener("mouseleave", function() {
      this.style.transform = "";
    });
  });
  
  // Initialize modal functionality
  initModal();
}

// Initialize modal functionality
function initModal() {
  const modalContainer = document.getElementById("modalContainer");
  // The new modal handles closing with an inline onclick on the close button
  // and a window.onclick for the overlay, so we don't need these listeners here.
  // Ensure modalContainer is hidden by default in CSS.
}

// Function to get modal image (returns placeholder or image if available)
function getModalImage(standardNumber) {
  // Lista de imágenes disponibles - agrega aquí las rutas de tus imágenes cuando las tengas
  const availableImages = {
    // Ejemplo: "1": "../img/estandar-1.png",
    // "2": "../img/estandar-2.png",
    // Agrega más según tengas imágenes
  };
  
  if (availableImages[standardNumber]) {
    return `<img src="${availableImages[standardNumber]}" alt="Ilustración Estándar ${standardNumber}" class="modal-illustration">`;
  }
  
  // Placeholder si no hay imagen
  return `
    <div class="modal-image-placeholder">
      <p>Espacio para ilustración</p>
      <small>Puedes agregar una imagen en: ../img/estandar-${standardNumber}.png</small>
    </div>
  `;
}

// Open modal with standard details
function openStandardModal(card) {
  const modalContainer = document.getElementById("modalContainer");
  const modalClose = document.querySelector(".modal-content .close-btn");

  if (!modalContainer || !modalClose) {
    return;
  }

  // Get card data
  const standardNumber = card.getAttribute("data-standard");
  const standardData = standardsData[standardNumber]; // Get data from the new object

  if (!standardData) {
    console.error("No data found for standard number:", standardNumber);
    return;
  }

  // Update modal content using the new IDs and data from standardsData
  const modalNumber = document.getElementById("modalNumber");
  if (modalNumber) modalNumber.textContent = standardNumber;

  const modalTitle = document.getElementById("modalTitle");
  if (modalTitle) modalTitle.innerHTML = standardData.title; // Use innerHTML as title might contain HTML tags

  const modalStandardDescription = document.getElementById("modalStandardDescription");
  if (modalStandardDescription) modalStandardDescription.textContent = standardData.standardDescription;

  const modalRiskDescription = document.getElementById("modalRiskDescription");
  if (modalRiskDescription) modalRiskDescription.textContent = standardData.riskDescription;

  // Populate indicators
  const modalIndicator1 = document.getElementById("modalIndicator1");
  const modalIndicator2 = document.getElementById("modalIndicator2"); // Assuming there's a second indicator element

  if (modalIndicator1 && standardData.indicators[0]) {
    modalIndicator1.innerHTML = `<strong>${standardData.indicators[0].split(' ')[0]}</strong> ${standardData.indicators[0].substring(standardData.indicators[0].indexOf(' ') + 1)}`;
  } else if (modalIndicator1) {
    modalIndicator1.innerHTML = ''; // Clear if no indicator
  }

  if (modalIndicator2 && standardData.indicators[1]) {
    modalIndicator2.innerHTML = `<strong>${standardData.indicators[1].split(' ')[0]}</strong> ${standardData.indicators[1].substring(standardData.indicators[1].indexOf(' ') + 1)}`;
  } else if (modalIndicator2) {
    modalIndicator2.innerHTML = ''; // Clear if no indicator
  }

  const modalCumpleStandardNumber = document.getElementById("modalCumpleStandardNumber");
  if (modalCumpleStandardNumber) modalCumpleStandardNumber.textContent = standardData.cumplimiento.replace(/ESTÁNDAR \d+!/, `ESTÁNDAR ${standardNumber}!`);

  const modalImage = document.getElementById("modalImage");
  if (modalImage) {
    modalImage.src = `../img/xd.jpeg`; // Changed to xd.jpeg
    modalImage.alt = `Personaje - Estándar ${standardNumber}`;
  }

  // Populate verification list dynamically
  const modalVerificacionList = document.getElementById("modalVerificacionList");
  if (modalVerificacionList) {
    modalVerificacionList.innerHTML = '';
    standardData.verifications.forEach((item) => {
      const listItem = document.createElement('li');
      // Check if the item already starts with a number (e.g., '1 Text', '2 Text')
      if (/^\d+\s/.test(item.trim())) {
        const parts = item.trim().match(/^(\d+)\s([\s\S]*)/);
        if (parts && parts.length === 3) {
          listItem.innerHTML = `<span>${parts[1]}</span> <p>${parts[2]}</p>`;
        } else {
          listItem.innerHTML = `<p>${item}</p>`; // Fallback for unexpected format
        }
      } else {
        // For items that are not pre-numbered, use the default index-based numbering
        const index = Array.from(modalVerificacionList.children).length + 1; // Get current list item count for numbering
        listItem.innerHTML = `<span>${index}</span> <p>${item}</p>`;
      }
      modalVerificacionList.appendChild(listItem);
    });
  }

  // Set data-phase attribute on modalHeader for styling
  const modalHeader = document.querySelector(".modal .encabezado");
  if (modalHeader) {
    let phase;
    const num = parseInt(standardNumber);
    if (num >= 1 && num <= 5) {
      phase = "blue";
    } else if (num >= 6 && num <= 9) {
      phase = "red";
    } else if (num >= 10 && num <= 15) {
      phase = "green";
    } else {
      phase = "default"; // Fallback or default color
    }
    modalHeader.setAttribute("data-phase", phase);
  }

  // Show modal
  modalContainer.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close modal
function closeModal() {
  const modalContainer = document.getElementById("modalContainer");
  if (modalContainer) {
    modalContainer.classList.remove("active"); // Remove class for active state
    document.body.style.overflow = "auto"; // Restore scrolling
  }
}

// Resource actions
function initResourceActions() {
  const resourceBtns = document.querySelectorAll(".resource-btn");
  
  resourceBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      
      const card = this.closest(".resource-card");
      const title = card.querySelector("h4")?.textContent || "Recurso";
      const btnText = this.querySelector("span")?.textContent || "";
      
      // Detectar tipo de archivo desde el texto del botón
      let fileType = null;
      let fileName = title;
      
      if (btnText.toLowerCase().includes("pdf")) {
        fileType = "PDF";
        fileName = `${title}.pdf`;
      } else if (btnText.toLowerCase().includes("excel")) {
        fileType = "Excel";
        fileName = `${title}.xlsx`;
      } else if (btnText.toLowerCase().includes("checklist")) {
        fileType = "PDF";
        fileName = `${title}.pdf`;
      }
      
      // Add ripple effect
      const ripple = document.createElement("span");
      ripple.style.position = "absolute";
      ripple.style.width = "0";
      ripple.style.height = "0";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255, 255, 255, 0.5)";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.left = "50%";
      ripple.style.top = "50%";
      ripple.style.animation = "ripple 0.6s ease-out";
      this.style.position = "relative";
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);

      // Mostrar notificación usando la función global unificada
      if (typeof showDownloadNotification === 'function') {
        showDownloadNotification(fileName, fileType);
      } else if (typeof showNotification === 'function') {
        showNotification(`Descargando: ${title}`, "success");
      }
    });
  });
}

// Add CSS animations dynamically
const style = document.createElement("style");
style.textContent = `
  @keyframes ripple {
    to {
      width: 200px;
      height: 200px;
      opacity: 0;
    }
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);