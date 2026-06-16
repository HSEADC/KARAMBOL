/******/ (() => { // webpackBootstrap
function initPolaroidDrag() {
  var arena = document.querySelector('.C_polaroidCollage');
  if (!arena) return;
  var cards = arena.querySelectorAll('.W_happyContent, .W_happyContentWidth');
  var topZ = cards.length;
  cards.forEach(function (card) {
    var startX = 0;
    var startY = 0;
    var originLeft = 0;
    var originTop = 0;
    var overhangX = 0;
    var overhangY = 0;
    var dragging = false;
    var onPointerDown = function onPointerDown(e) {
      originLeft = card.offsetLeft;
      originTop = card.offsetTop;
      var rect = card.getBoundingClientRect();
      overhangX = (rect.width - card.offsetWidth) / 2;
      overhangY = (rect.height - card.offsetHeight) / 2;
      card.style.left = "".concat(originLeft, "px");
      card.style.top = "".concat(originTop, "px");
      startX = e.clientX;
      startY = e.clientY;
      dragging = true;
      card.setPointerCapture(e.pointerId);
      card.style.zIndex = ++topZ;
      card.classList.add('is-dragging');
    };
    var onPointerMove = function onPointerMove(e) {
      if (!dragging) return;
      var nextLeft = originLeft + (e.clientX - startX);
      var nextTop = originTop + (e.clientY - startY);
      var minLeft = overhangX;
      var minTop = overhangY;
      var maxLeft = arena.clientWidth - card.offsetWidth - overhangX;
      var maxTop = arena.clientHeight - card.offsetHeight - overhangY;
      nextLeft = Math.min(Math.max(nextLeft, minLeft), Math.max(maxLeft, minLeft));
      nextTop = Math.min(Math.max(nextTop, minTop), Math.max(maxTop, minTop));
      card.style.left = "".concat(nextLeft, "px");
      card.style.top = "".concat(nextTop, "px");
    };
    var endDrag = function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      if (card.hasPointerCapture(e.pointerId)) {
        card.releasePointerCapture(e.pointerId);
      }
      card.classList.remove('is-dragging');
    };
    card.addEventListener('pointerdown', onPointerDown);
    card.addEventListener('pointermove', onPointerMove);
    card.addEventListener('pointerup', endDrag);
    card.addEventListener('pointercancel', endDrag);
  });
}
document.addEventListener('DOMContentLoaded', initPolaroidDrag);
/******/ })()
;