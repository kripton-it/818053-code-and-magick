'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var userNameInput = setup.querySelector('.setup-user-name');
  var form = setup.querySelector('.setup-wizard-form');
  var formSubmitCallback = null;

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

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      // alert('Данные отправлены');
      setup.classList.add('hidden');
    }, function (errorMessage) {
      // alert('Данные не отправлены');
      formSubmitCallback(errorMessage);
    });
    evt.preventDefault();
  });

  function setFormSubmitCallback(callback) {
    formSubmitCallback = callback;
  }

  window.validation = {
    setFormSubmitCallback: setFormSubmitCallback
  };
})();