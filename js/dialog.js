'use strict';

(function () {
  var DRAG_LIMIT = 2;
  var setup = document.querySelector('.setup');
  var setupUpload = setup.querySelector('.upload');
  var inputFile = setupUpload.querySelector('input');
  var dragged = false;
  var startCoords = {};

  function inputFileClickHandler(evt) {
    evt.preventDefault();
    inputFile.removeEventListener('click', inputFileClickHandler);
  }

  function documentMouseUpHandler(evt) {
    evt.preventDefault();

    document.removeEventListener('mousemove', documentMouseMoveHandler);
    document.removeEventListener('mouseup', documentMouseUpHandler);
    if (dragged) {
      inputFile.addEventListener('click', inputFileClickHandler);
    }
  }

  function documentMouseMoveHandler(evt) {
    evt.preventDefault();

    var shift = {
      x: evt.clientX - startCoords.x,
      y: evt.clientY - startCoords.y
    };

    if ((shift.x ^ 2 + shift.y ^ 2) > (DRAG_LIMIT ^ 2)) {
      dragged = true;
    }

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    setup.style.top = (setup.offsetTop + shift.y) + 'px';
    setup.style.left = (setup.offsetLeft + shift.x) + 'px';
  }

  setupUpload.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    dragged = false;

    document.addEventListener('mousemove', documentMouseMoveHandler);
    document.addEventListener('mouseup', documentMouseUpHandler);
  });

  window.dialog = {

  };
})();
