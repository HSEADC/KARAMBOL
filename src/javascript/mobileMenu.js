// Подсветка активного пункта навигации
const currentPath = window.location.pathname
document.querySelectorAll('.A_chip').forEach((chip) => {
  const href = chip.getAttribute('href') || ''
  const isHome = (href === '/' || href === 'index.html') &&
    (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('/KARAMBOL/'))
  const isOther = href !== '/' && href !== 'index.html' && currentPath.includes(href.replace('.html', ''))
  if (isHome || isOther) {
    chip.classList.add('A_chip--active')
  }
})

const burgerBtn = document.getElementById('burgerBtn')
const mobileMenu = document.getElementById('mobileMenu')
const menuOverlay = document.getElementById('menuOverlay')

burgerBtn.addEventListener('click', function () {
  mobileMenu.classList.toggle('O_mobileMenuOpen')
  menuOverlay.classList.toggle('O_menuOverlayActive')
  document.body.style.overflow = mobileMenu.classList.contains(
    'O_mobileMenuOpen'
  )
    ? 'hidden'
    : ''
})

menuOverlay.addEventListener('click', function () {
  mobileMenu.classList.remove('O_mobileMenuOpen')
  menuOverlay.classList.remove('O_menuOverlayActive')
  document.body.style.overflow = ''
})
