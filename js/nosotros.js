// Hidratar dinámicamente la página Nosotros desde ../data/nosotros.json
document.addEventListener("DOMContentLoaded", async () => {
  const $ = (id) => document.getElementById(id)

  // Helpers
  const prefix = (p) => (p ? (p.startsWith("http") ? p : `../${p}`) : "")
  const el = (tag, attrs = {}, children = []) => {
    const node = document.createElement(tag)
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === "class") node.className = v
      else if (k === "html") node.innerHTML = v
      else if (k === "text") node.textContent = v
      else node.setAttribute(k, v)
    })
    children.forEach((c) => node.appendChild(c))
    return node
  }

  try {
    const res = await fetch("../data/nosotros.json", { cache: "no-store" })
    if (!res.ok) throw new Error("No se pudo cargar nosotros.json")
    const data = await res.json()

    // Hero
    $("heroTitle").textContent = data?.hero?.title || ""
    $("heroSubtitle").textContent = data?.hero?.subtitle || ""
    const ctasWrap = $("heroCtas")
    ctasWrap.innerHTML = ""
    ;(data?.hero?.ctas || []).forEach((c) => {
      const a = el("a", { class: `btn ${ctasWrap.children.length === 0 ? "btn-primary" : "btn-secondary"}`, href: c?.href || "#", text: c?.label || "Acción" })
      ctasWrap.appendChild(a)
    })

    // Intro
    $("introParrafo").textContent = data?.intro?.parrafo || ""
    const chips = $("introChips")
    chips.innerHTML = ""
    ;(data?.intro?.chips || []).forEach((txt) => chips.appendChild(el("span", { class: "chip", text: txt })))

    // Organización: Secretaría Técnica
    $("secretariaTexto").textContent = data?.organizacion?.secretaria_tecnica || ""

    // Organización: Miembros (grid y lista)
    const grid = $("miembrosGrid")
    const lista = $("miembrosLista")
    grid.innerHTML = ""
    lista.innerHTML = ""
    ;(data?.organizacion?.miembros || []).forEach((m) => {
      // Grid
      const a = el("a", {
        class: "miembro",
        href: m?.link || "#",
        target: m?.link ? "_blank" : "_self",
        rel: m?.link ? "noopener" : "",
        "aria-label": m?.nombre || "Miembro",
      })
      const img = el("img", { src: prefix(m?.logo), alt: `Logo ${m?.nombre || "Miembro"}`, loading: "lazy" })
      a.appendChild(img)
      grid.appendChild(a)
      // Lista
      lista.appendChild(el("li", { text: m?.nombre || "Miembro" }))
    })

    // Misión y Visión
    $("visionTexto").textContent = data?.mision_vision?.vision || ""
    $("misionTexto").textContent = data?.mision_vision?.mision || ""

    // Transparencia / Documentos
    $("docsUpdate").textContent = data?.transparencia?.ultima_actualizacion || ""
    const tbody = $("docsTbody")
    tbody.innerHTML = ""
    ;(data?.transparencia?.documentos || []).forEach((d) => {
      const tr = document.createElement("tr")
      const tdTitulo = el("td", { text: d?.titulo || "" })
      const tdTipo = el("td")
      tdTipo.appendChild(el("span", { class: "badge", text: d?.tipo || "" }))
      const tdAnio = el("td", { text: String(d?.anio || "") })
      const tdUpd = el("td", { text: data?.transparencia?.ultima_actualizacion || "" })
      const tdDl = el("td")
      if (d?.pdf) {
        tdDl.appendChild(el("a", { class: "btn-link", href: prefix(d.pdf), download: "", text: "Descargar" }))
      } else {
        tdDl.appendChild(el("span", { class: "btn-link", text: "Disponible pronto" }))
      }
      tr.append(tdTitulo, tdTipo, tdAnio, tdUpd, tdDl)
      tbody.appendChild(tr)
    })

    // Recursos destacados
    const recursosWrap = $("recursosGrid")
    recursosWrap.innerHTML = ""
    ;(data?.recursos || []).forEach((r) => {
      const card = el("a", { class: "recurso-card", href: r?.href || "#" })
      if (r?.qr) {
        const fig = el("figure")
        fig.appendChild(el("img", { src: prefix(r.qr), alt: `QR ${r?.titulo || "Recurso"}`, loading: "lazy" }))
        fig.appendChild(el("figcaption", { text: r?.desc || "" }))
        card.appendChild(fig)
      }
      const content = el("div", { class: "recurso-content" })
      content.appendChild(el("h3", { text: r?.titulo || "Recurso" }))
      content.appendChild(el("p", { text: r?.desc || "" }))
      card.appendChild(content)
      recursosWrap.appendChild(card)
    })

    // Equipo (opcional)
    const team = $("teamGrid")
    if (team) {
      team.innerHTML = ""
      ;(data?.equipo || []).slice(0, 6).forEach((p) => {
        const card = el("article", { class: "member-card" })
        const src = p?.foto ? prefix(p.foto) : ""
        if (src) card.appendChild(el("img", { class: "member-photo", src, alt: `Foto de ${p?.nombre || "Miembro"}`, loading: "lazy" }))
        card.appendChild(el("h3", { class: "member-name", text: p?.nombre || "" }))
        card.appendChild(el("p", { class: "member-role", text: p?.rol || "" }))
        if (p?.email) card.appendChild(el("a", { class: "member-email", href: `mailto:${p.email}`, text: p.email }))
        team.appendChild(card)
      })
    }

    // Contacto corto
    const contacto = data?.contacto || {}
    const piezas = [contacto.email, contacto.telefono, contacto.direccion].filter(Boolean)
    if (piezas.length > 0) {
      $("contactoTexto").textContent = piezas.join(" · ")
    } else {
      $("contactoTexto").textContent = "Información de contacto próximamente"
    }
    const contactoBtn = $("contactoBtn")
    if (contactoBtn && contacto?.link) contactoBtn.href = contacto.link
  } catch (err) {
    console.error(err)
  }
})
