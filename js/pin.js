'use strict';

// Делаем пины интерактивными
(function () {
  window.makePinsActive = function () {
    var mapElement = document.querySelector('.map');
    var adCloseElement = window.card.similarAdElement.querySelector('.popup__close');
    var noticeFormElement = document.querySelector('.notice__form');
    var mapPinMainElement = document.querySelector('.map__pin--main');

    var onMouseUp = function () {
      mapElement.classList.remove('map--faded');
      noticeFormElement.classList.remove('notice__form--disabled');
      window.insertMapPins(window.map.getAdverts());
      mapPinMainElement.removeEventListener('mouseup', onMouseUp);
    };

    mapPinMainElement.addEventListener('mouseup', onMouseUp);

    adCloseElement.addEventListener('click', function () {
      window.showCard.hideCard();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        window.showCard.hideCard();
      }
    });
  };
})();
