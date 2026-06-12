/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

var texts = ['Статьи о взаимодействии животных с растениями', 'Список опасных растений для питомцев', 'Советы по безопасности домашних животных'];
var textIndex = 0;
var charIndex = 0;
var isDeleting = false;
var typingSpeed = 100;
function typeText() {
  var element = document.querySelector('.A_searchAnimation');
  if (!element) return;
  var currentText = texts[textIndex];
  if (isDeleting) {
    element.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    element.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }
  var delay = isDeleting ? 50 : typingSpeed;
  if (!isDeleting && charIndex === currentText.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    delay = 500;
  }
  setTimeout(typeText, delay);
}

// Генерация всплывающих пузырьков с иконками
function createBubble() {
  var section = document.querySelector('.O_mainSection') || document.querySelector('.SO_page404');
  if (!section) return;
  var icons = ['./images/animalIcon1.svg', './images/animalIcon2.svg', './images/animalIcon3.svg', './images/animalIcon4.svg'];
  var img = document.createElement('img');
  img.src = icons[Math.floor(Math.random() * icons.length)];
  img.classList.add('bubble-icon');

  // Рандомные параметры
  var isMobile = window.innerWidth <= 767;
  var size = isMobile ? 13.64 + Math.random() * 18.18 // мобилка: от 13.64vw до 31.82vw
  : 4.17 + Math.random() * 5.55; // десктоп: от 4.17vw до 9.72vw
  var leftPos = Math.random() * 100; // позиция по горизонтали 0-100%
  var duration = 10 + Math.random() * 3; // длительность анимации 10-13 секунд
  var floatX = isMobile ? (Math.random() - 0.5) * 45.45 // мобилка: от -22.73vw до 22.73vw
  : (Math.random() - 0.5) * 20.83; // десктоп: от -10.42vw до 10.42vw
  var floatRotate = (Math.random() - 0.5) * 360; // поворот от -180 до 180 градусов
  var delay = Math.random() * 2; // задержка старта 0-2 секунды

  img.style.width = "".concat(size, "vw");
  img.style.height = "".concat(size, "vw");
  img.style.left = "".concat(leftPos, "%");
  img.style.animationDuration = "".concat(duration, "s");
  img.style.animationDelay = "".concat(delay, "s");
  img.style.setProperty('--float-x', "".concat(floatX, "vw"));
  img.style.setProperty('--float-rotate', "".concat(floatRotate, "deg"));
  section.appendChild(img);

  // Удалить элемент после завершения анимации
  setTimeout(function () {
    img.remove();
  }, (duration + delay) * 1000);
}
function startBubbles() {
  // Создать начальный набор пузырьков с разными задержками
  for (var i = 0; i < 5; i++) {
    createBubble();
  }

  // Продолжать создавать новые пузырьки чаще
  setInterval(function () {
    createBubble();
  }, 900);
}
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(typeText, 1000);
  startBubbles();
});
/******/ })()
;