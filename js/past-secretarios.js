function toggleView() {
  const gridView = document.getElementById('gridView')
  const timelineView = document.getElementById('timelineView')
  const button = document.querySelector('.btn-toggle')

  if (!gridView || !timelineView || !button) return

  const isGridHidden = gridView.style.display === 'none'

  gridView.style.display = isGridHidden ? 'block' : 'none'
  timelineView.style.display = isGridHidden ? 'none' : 'block'
  button.textContent = isGridHidden ? 'Ver en Línea de Tiempo' : 'Ver en Tarjetas'
}

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.secretario-card')

  cards.forEach((card, index) => {
    card.style.opacity = '0'
    card.style.transform = 'translateY(20px)'

    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
      card.style.opacity = '1'
      card.style.transform = 'translateY(0)'
    }, index * 200)
  })
})

