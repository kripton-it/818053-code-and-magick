'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarWizards = document.querySelector('.setup-similar');

  setup.classList.remove('hidden');
  similarWizards.classList.remove('hidden');

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

  window.similar = {
    create: createWizard
  };
})();
