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
burgerBtn.addEventListener('click', function () {
  mobileMenu.classList.toggle('O_mobileMenuOpen');
  menuOverlay.classList.toggle('O_menuOverlayActive');
  document.body.style.overflow = mobileMenu.classList.contains('O_mobileMenuOpen') ? 'hidden' : '';
});
menuOverlay.addEventListener('click', function () {
  mobileMenu.classList.remove('O_mobileMenuOpen');
  menuOverlay.classList.remove('O_menuOverlayActive');
  document.body.style.overflow = '';
});
/******/ })()
;