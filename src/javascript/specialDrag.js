function initPolaroidDrag() {
  const arena = document.querySelector('.C_polaroidCollage')
  if (!arena) return

  const cards = arena.querySelectorAll('.W_happyContent, .W_happyContentWidth')
  let topZ = cards.length

  cards.forEach((card) => {
    let startX = 0
    let startY = 0
    let originLeft = 0
    let originTop = 0
    let overhangX = 0
    let overhangY = 0
    let dragging = false

    const onPointerDown = (e) => {
      originLeft = card.offsetLeft
      originTop = card.offsetTop

      const rect = card.getBoundingClientRect()
      overhangX = (rect.width - card.offsetWidth) / 2
      overhangY = (rect.height - card.offsetHeight) / 2

      card.style.left = `${originLeft}px`
      card.style.top = `${originTop}px`

      startX = e.clientX
      startY = e.clientY
      dragging = true

      card.setPointerCapture(e.pointerId)
      card.style.zIndex = ++topZ
      card.classList.add('is-dragging')
    }

    const onPointerMove = (e) => {
      if (!dragging) return

      let nextLeft = originLeft + (e.clientX - startX)
      let nextTop = originTop + (e.clientY - startY)

      const minLeft = overhangX
      const minTop = overhangY
      const maxLeft = arena.clientWidth - card.offsetWidth - overhangX
      const maxTop = arena.clientHeight - card.offsetHeight - overhangY
      nextLeft = Math.min(
        Math.max(nextLeft, minLeft),
        Math.max(maxLeft, minLeft)
      )
      nextTop = Math.min(Math.max(nextTop, minTop), Math.max(maxTop, minTop))

      card.style.left = `${nextLeft}px`
      card.style.top = `${nextTop}px`
    }

    const endDrag = (e) => {
      if (!dragging) return
      dragging = false
      if (card.hasPointerCapture(e.pointerId)) {
        card.releasePointerCapture(e.pointerId)
      }
      card.classList.remove('is-dragging')
    }

    card.addEventListener('pointerdown', onPointerDown)
    card.addEventListener('pointermove', onPointerMove)
    card.addEventListener('pointerup', endDrag)
    card.addEventListener('pointercancel', endDrag)
  })
}

document.addEventListener('DOMContentLoaded', initPolaroidDrag)
