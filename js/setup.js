'use strict';

(function () {
  var SIMILAR_WIZARDS_NUMBER = 4;
  var setup = document.querySelector('.setup');
  var wizardsContainer = document.querySelector('.setup-similar-list');
  var setupStartPosition = {
    x: setup.style.left,
    y: setup.style.top
  };
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');

  window.backend.load(function (array) {
    renderWizards(array);
  }, function (errorMessage) {
    errorHandler(errorMessage);
  });

  window.validation.setFormSubmitCallback(function (errorMessage) {
    errorHandler(errorMessage);
  });

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

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; padding: 20px; text-align: center; background-color: red;';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.top = '50%';
    node.style.transform = 'translateY(-50%)';
    node.style.right = 0;
    node.style.fontSize = '50px';

    node.textContent = errorMessage;
    document.body.appendChild(node);
    setTimeout(function () {
      node.remove();
    }, 5000);
  }

  function renderWizards(data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < SIMILAR_WIZARDS_NUMBER; i++) {
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
})();
