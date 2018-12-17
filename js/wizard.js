'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var similarWizards = document.querySelector('.setup-similar');
  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var coatColorInput = setup.querySelector('input[name="coat-color"]');
  var eyesColorInput = setup.querySelector('input[name="eyes-color"]');
  var fireballColorInput = setup.querySelector('input[name="fireball-color"]');

  setup.classList.remove('hidden');
  similarWizards.classList.remove('hidden');
  wizardCoat.addEventListener('click', wizardCoatClickHandler);
  wizardEyes.addEventListener('click', wizardEyesClickHandler);
  wizardFireball.addEventListener('click', wizardFireballClickHandler);

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
