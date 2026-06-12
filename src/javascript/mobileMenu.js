const burgerBtn = document.getElementById('burgerBtn')
const mobileMenu = document.getElementById('mobileMenu')
const menuOverlay = document.getElementById('menuOverlay')

if (burgerBtn && mobileMenu && menuOverlay) {
  const openMenu = () => {
    mobileMenu.classList.add('O_mobileMenuOpen')
    menuOverlay.classList.add('O_menuOverlayActive')
    burgerBtn.classList.add('A_burger--open')
    burgerBtn.setAttribute('aria-expanded', 'true')
    document.body.style.overflow = 'hidden'
  }

  const closeMenu = () => {
    mobileMenu.classList.remove('O_mobileMenuOpen')
    menuOverlay.classList.remove('O_menuOverlayActive')
    burgerBtn.classList.remove('A_burger--open')
    burgerBtn.setAttribute('aria-expanded', 'false')
    document.body.style.overflow = ''
  }

  burgerBtn.addEventListener('click', function () {
    if (mobileMenu.classList.contains('O_mobileMenuOpen')) {
      closeMenu()
    } else {
      openMenu()
    }
  })

  menuOverlay.addEventListener('click', closeMenu)

  const menuCloseBtn = document.getElementById('menuCloseBtn')
  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', closeMenu)
  }

  mobileMenu.querySelectorAll('.A_mobileLink').forEach((link) => {
    link.addEventListener('click', closeMenu)
  })
}
