/******/ (() => { // webpackBootstrap
// Подсветка активного пункта навигации
var currentPath = window.location.pathname;
document.querySelectorAll('.A_chip').forEach(function (chip) {
  var href = chip.getAttribute('href') || '';
  var isHome = (href === '/' || href === 'index.html') && (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('/KARAMBOL/'));
  var isOther = href !== '/' && href !== 'index.html' && currentPath.includes(href.replace('.html', ''));
  if (isHome || isOther) {
    chip.classList.add('A_chip--active');
  }
});
var burgerBtn = document.getElementById('burgerBtn');
var mobileMenu = document.getElementById('mobileMenu');
var menuOverlay = document.getElementById('menuOverlay');
if (burgerBtn && mobileMenu && menuOverlay) {
  var openMenu = function openMenu() {
    mobileMenu.classList.add('O_mobileMenuOpen');
    menuOverlay.classList.add('O_menuOverlayActive');
    burgerBtn.classList.add('A_burger--open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  var closeMenu = function closeMenu() {
    mobileMenu.classList.remove('O_mobileMenuOpen');
    menuOverlay.classList.remove('O_menuOverlayActive');
    burgerBtn.classList.remove('A_burger--open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  burgerBtn.addEventListener('click', function () {
    if (mobileMenu.classList.contains('O_mobileMenuOpen')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  menuOverlay.addEventListener('click', closeMenu);
  var menuCloseBtn = document.getElementById('menuCloseBtn');
  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', closeMenu);
  }
  mobileMenu.querySelectorAll('.A_mobileLink').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
}
/******/ })()
;