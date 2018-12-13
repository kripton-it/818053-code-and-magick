'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var wizardsContainer = document.querySelector('.setup-similar-list');
  var setupStartPosition = {
    x: setup.style.left,
    y: setup.style.top
  };
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');
  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var coatColorInput = setup.querySelector('input[name="coat-color"]');
  var eyesColorInput = setup.querySelector('input[name="eyes-color"]');
  var fireballColorInput = setup.querySelector('input[name="fireball-color"]');

  renderWizards(window.data.generate());

  document.addEventListener('keydown', documentEscPressHandler);

  setupOpen.addEventListener('click', function () {
    openSetup();
    document.addEventListener('keydown', documentEscPressHandler);
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.Code.ENTER) {
      openSetup();
      document.addEventListener('keydown', documentEscPressHandler);
    }
  });

  setupClose.addEventListener('click', function () {
    closeSetup();
    document.removeEventListener('keydown', documentEscPressHandler);
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.Code.ENTER) {
      closeSetup();
      document.removeEventListener('keydown', documentEscPressHandler);
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
    var errorMessage = userNameInput.value.length < 2 ? 'Имя должно состоять минимум из 2-х символов' : '';
    userNameInput.setCustomValidity(errorMessage);
  });

  wizardCoat.addEventListener('click', wizardCoatClickHandler);
  wizardEyes.addEventListener('click', wizardEyesClickHandler);
  wizardFireball.addEventListener('click', wizardFireballClickHandler);

  function renderWizards(data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var newWizard = window.similar.create(data[i]);
      fragment.appendChild(newWizard);
    }
    wizardsContainer.appendChild(fragment);
  }

  function openSetup() {
    setup.style.left = setupStartPosition.x;
    setup.style.top = setupStartPosition.y;
    setup.classList.remove('hidden');
  }

  function closeSetup() {
    setup.classList.add('hidden');
  }

  function documentEscPressHandler(evt) {
    if (evt.keyCode === window.utils.Code.ESC) {
      closeSetup();
      document.removeEventListener('keydown', documentEscPressHandler);
    }
  }

  function getNewColor(oldColor, colors) {
    var correctColors = colors.filter(function (color) {
      return color !== oldColor;
    });
    return window.utils.getRandomElement(correctColors);
  }

  function wizardCoatClickHandler() {
    var oldColor = wizardCoat.style.fill;
    var newColor = getNewColor(oldColor, window.utils.Colors.COAT);
    wizardCoat.style.fill = newColor;
    coatColorInput.value = newColor;
  }

  function wizardEyesClickHandler() {
    var oldColor = wizardEyes.style.fill;
    var newColor = getNewColor(oldColor, window.utils.Colors.EYES);
    wizardEyes.style.fill = newColor;
    eyesColorInput.value = newColor;
  }

  function wizardFireballClickHandler() {
    var oldColor = wizardFireball.style.backgroundColor;
    var newColor = getNewColor(oldColor, window.utils.Colors.FIREBALL);
    wizardFireball.style.backgroundColor = newColor;
    fireballColorInput.value = newColor;
  }
})();
