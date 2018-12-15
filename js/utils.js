'use strict';

(function () {
  var Code = {
    ESC: 27,
    ENTER: 13
  };
  var Colors = {
    COAT: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ],
    EYES: [
      'black',
      'red',
      'blue',
      'yellow',
      'green'
    ],
    FIREBALL: [
      '#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848'
    ]
  };


  function getRandomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  function getRandomElement(array) {
    var randomIndex = getRandomInteger(0, array.length - 1);
    return array[randomIndex];
  }

  function getMaxElement(arr) {
    if (arr.length === 0) {
      return null;
    }
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  }

  window.utils = {
    Code: Code,
    Colors: Colors,
    getRandomInteger: getRandomInteger,
    getRandomElement: getRandomElement,
    getMaxElement: getMaxElement
  };
})();
