'use strict';

// Делаем пины интерактивными
(function () {
  var adverts = [];
  var mapPinsContainerElement = document.querySelector('.map__pins');
  var mapPinMainElement = document.querySelector('.map__pin--main');

  var insertMapPins = function (ads) {
    var numberOfPins = ads.length > 5 ? 5 : ads.length;
    var fragmentElement = document.createDocumentFragment();
    for (var i = 0; i < numberOfPins; i++) {
      fragmentElement.appendChild(window.map.createMapPin(ads[i], i, ads));
    }
    mapPinsContainerElement.appendChild(fragmentElement);
  };

  var makePinsActive = function () {
    var mapElement = document.querySelector('.map');
    var adCloseElement = window.card.similarAdElement.querySelector('.popup__close');
    var noticeFormElement = document.querySelector('.notice__form');

    var onMouseUp = function () {
      mapElement.classList.remove('map--faded');
      noticeFormElement.classList.remove('notice__form--disabled');
      insertMapPins(adverts);
      mapPinMainElement.removeEventListener('mouseup', onMouseUp);
    };

    mapPinMainElement.addEventListener('mouseup', onMouseUp);

    adCloseElement.addEventListener('click', function () {
      window.card.hideCard();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        window.card.hideCard();
      }
    });
  };

  var onSuccess = function (advs) {
    adverts = advs;
    makePinsActive();
  };

  var onError = function (errorMessage) {
    mapPinMainElement.addEventListener('mouseup', function () {
      var errorMessageElement = document.createElement('div');
      errorMessageElement.style = 'z-index: 100; width: 1200px; position: absolute; left: 0; right: 0; margin: 0 auto; text-align: center; background-color: red;';
      errorMessageElement.textContent = errorMessage;
      document.body.insertBefore(errorMessageElement, document.body.firstChild);
    });
  };

  window.backend.load(onSuccess, onError);

  window.pin = {
    getAdverts: function () {
      return adverts;
    },
    insertMapPins: insertMapPins,
    onError: onError
  };
})();
