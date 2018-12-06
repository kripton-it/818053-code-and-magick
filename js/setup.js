'use strict';

// #12 Учебный проект: нас орда

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
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var setup = document.querySelector('.setup');
var wizardsContainer = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarWizards = document.querySelector('.setup-similar');

function getRandomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function getRandomElement(array) {
  var randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
}

function generateObject() {
  var object = {
    name: getRandomElement(NAMES) + ' ' + getRandomElement(SURNAMES),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS)
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

function renderWizards(data) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    var newWizard = createWizard(data[i]);
    fragment.appendChild(newWizard);
  }
  wizardsContainer.appendChild(fragment);
}

function createWizard(example) {
  var wizard = wizardTemplate.cloneNode(true);
  var wizardLabel = wizard.querySelector('.setup-similar-label');
  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  wizardLabel.textContent = example.name;
  wizardCoat.style.fill = example.coatColor;
  wizardEyes.style.fill = example.eyesColor;

  return wizard;
}

setup.classList.remove('hidden');
var data = generateData();
renderWizards(data);
similarWizards.classList.remove('hidden');

// #15 Учебный проект: одеть Надежду

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');

function openSetup() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', documentEscPressHandler);
}

function closeSetup() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', documentEscPressHandler);
}

function documentEscPressHandler(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetup();
  }
}

document.addEventListener('keydown', documentEscPressHandler);

setupOpen.addEventListener('click', function () {
  openSetup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
});

setupClose.addEventListener('click', function () {
  closeSetup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetup();
  }
});

userNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', documentEscPressHandler);
});

userNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', documentEscPressHandler);
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  evt.preventDefault();
  if (userNameInput.value.length < 2) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    userNameInput.setCustomValidity('');
  }
});

