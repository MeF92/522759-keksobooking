'use strict';

// Далем пины интерактивными и выводим соответствующие объявление
(function () {
  var card = window.card;
  var map = window.map;
  var mapPinsElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var adCloseElement = card.similarAdElement.querySelector('.popup__close');
  var noticeFormElement = document.querySelector('.notice__form');
  var currentActivePinElement = null;

  var onPinClick = function (evt) {
    if (currentActivePinElement) {
      currentActivePinElement.classList.remove('map__pin--active');
    }
    evt.currentTarget.classList.add('map__pin--active');
    card.renderAd(window.map.adverts[evt.currentTarget.getAttribute('ad-id')]);
    card.similarAdElement.classList.remove('hidden');
    currentActivePinElement = evt.currentTarget;
  };

  var onClosingAd = function () {
    card.similarAdElement.classList.add('hidden');
    currentActivePinElement.classList.remove('map__pin--active');
  };

  map.mapPinMainElement.addEventListener('mouseup', function () {
    card.mapElement.classList.remove('map--faded');
    noticeFormElement.classList.remove('notice__form--disabled');
    for (var i = 0; i <= mapPinsElements.length - 1; i++) {
      mapPinsElements[i].classList.remove('hidden');
    }
  });

  for (var i = 0; i <= mapPinsElements.length - 1; i++) {
    mapPinsElements[i].addEventListener('click', function (evt) {
      if (evt.currentTarget !== map.mapPinMainElement) {
        onPinClick(evt);
      }
    });

    mapPinsElements[i].addEventListener('keydown', function (evt) {
      if (evt.currentTarget !== map.mapPinMainElement && evt.keyCode === window.data.ENTER_KEYCODE) {
        onPinClick(evt);
      }
    });
  }

  adCloseElement.addEventListener('click', function () {
    onClosingAd();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      onClosingAd();
    }
  });
})();
