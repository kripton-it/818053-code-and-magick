'use strict';

(function () {
  var SAVE_URL = 'https://js.dump.academy/code-and-magick';
  var LOAD_URL = 'https://js.dump.academy/code-and-magick/data';
  var SUCCESS_CODE = 200;
  var MAX_TIMEOUT = 10000;

  function createRequest(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = MAX_TIMEOUT;

    return xhr;
  }

  function backendSave(data, onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('POST', SAVE_URL);
    xhr.send(data);
  }

  function backendLoad(onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('GET', LOAD_URL);
    xhr.send();
  }

  window.backend = {
    load: backendLoad,
    save: backendSave
  };
})();
