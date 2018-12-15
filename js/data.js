'use strict';

(function () {
  var NUMBER_OF_OBJECTS = 4;
  var NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  function generateObject() {
    var object = {
      name: window.utils.getRandomElement(NAMES) + ' ' + window.utils.getRandomElement(SURNAMES),
      coatColor: window.utils.getRandomElement(window.utils.Colors.COAT),
      eyesColor: window.utils.getRandomElement(window.utils.Colors.EYES)
    };
    return object;
  }

  function generateData() {
    var array = [];

    for (var i = 0; i < NUMBER_OF_OBJECTS; i++) {
      array[i] = generateObject();
    }
    return array;
  }

  window.data = {
    generate: generateData
  };
})();
