'use strict';

// Делаем пины интерактивными
(function () {
  window.makePinsActive = function () {
    var mapElement = document.querySelector('.map');
    var mapPinsElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var adCloseElement = window.card.similarAdElement.querySelector('.popup__close');
    var noticeFormElement = document.querySelector('.notice__form');
    var mapPinMainElement = document.querySelector('.map__pin--main');

    mapPinMainElement.addEventListener('mouseup', function () {
      mapElement.classList.remove('map--faded');
      noticeFormElement.classList.remove('notice__form--disabled');
      for (var i = 0; i <= mapPinsElements.length - 1; i++) {
        mapPinsElements[i].classList.remove('hidden');
      }
    });

    for (var i = 0; i <= mapPinsElements.length - 1; i++) {
      mapPinsElements[i].addEventListener('click', function (evt) {
        if (evt.currentTarget !== mapPinMainElement) {
          window.showCard.showCard(evt);
        }
      });

      mapPinsElements[i].addEventListener('keydown', function (evt) {
        if (evt.currentTarget !== mapPinMainElement && evt.keyCode === window.data.ENTER_KEYCODE) {
          window.showCard.showCard(evt);
        }
      });
    }

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
