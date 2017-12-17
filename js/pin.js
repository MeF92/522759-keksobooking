'use strict';

// Делаем пины интерактивными
(function () {
  window.makePinsActive = function () {
    var mapElement = document.querySelector('.map');
    var adCloseElement = window.card.similarAdElement.querySelector('.popup__close');
    var noticeFormElement = document.querySelector('.notice__form');
    var mapPinMainElement = document.querySelector('.map__pin--main');

    mapPinMainElement.addEventListener('mouseup', function () {
      mapElement.classList.remove('map--faded');
      noticeFormElement.classList.remove('notice__form--disabled');
      window.insertMapPins(window.map.getAdverts());
    });

    adCloseElement.addEventListener('click', function () {
      window.showCard.hideCard();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        window.showCard.hideCard();
      }
    });

    var housingTypeElement = document.querySelector('#housing-type');

    housingTypeElement.addEventListener('change', function (evt) {
      if (evt.target.value === 'flat') {
        window.updatePins();
      }
    });
  };
})();
