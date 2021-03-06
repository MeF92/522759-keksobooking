'use strict';

// Создаём пины на карте
(function () {
  var TOP_LIMIT = 100;
  var BOTTOM_LIMIT = 650;
  var LEFT_LIMIT = 210;
  var RIGHT_LIMIT = 1370;

  var mapPinsContainerElement = document.querySelector('.map__pins');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var currentPins;

  var onPinClick = function (evt) {
    if (evt.currentTarget !== mapPinMainElement) {
      window.card.showCard(evt, currentPins);
    }
  };

  var onPinKeyDown = function (evt) {
    if (evt.currentTarget !== mapPinMainElement && evt.keyCode === window.data.ENTER_KEYCODE) {
      window.card.showCard(evt, currentPins);
    }
  };

  var createMapPin = function (ad, id, pins) {
    currentPins = pins;
    var mapPinsContentElement = document.createElement('button');
    var buttonWidth = 40;
    var buttonHeight = 40;
    mapPinsContentElement.style.left = (ad.location.x - buttonWidth / 2) + 'px';
    mapPinsContentElement.style.top = (ad.location.y - buttonHeight) + 'px';
    mapPinsContentElement.className = 'map__pin';
    mapPinsContentElement.setAttribute('ad-id', id);
    mapPinsContentElement.innerHTML = '<img src="' + ad.author.avatar + '" width="' + buttonWidth + '" height="' + buttonHeight + '" draggable="false">';

    mapPinsContentElement.addEventListener('click', onPinClick);

    mapPinsContentElement.addEventListener('keydown', onPinKeyDown);

    return mapPinsContentElement;
  };

  var updatePins = function () {
    var mapPinsElement = mapPinsContainerElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsElement.forEach(function (pinElement) {
      pinElement.removeEventListener('click', onPinClick);
      pinElement.removeEventListener('keydown', onPinKeyDown);
    });
    mapPinsContainerElement.innerHTML = '';
    mapPinsContainerElement.appendChild(mapPinMainElement);
  };

  // Добавляем возможность передвигать центральный пин
  var addressElement = document.querySelector('#address');
  mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      if (moveEvt.clientY >= TOP_LIMIT && moveEvt.clientY <= (BOTTOM_LIMIT - window.pageYOffset) && moveEvt.clientX >= LEFT_LIMIT && moveEvt.clientX <= RIGHT_LIMIT) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mapPinMainElement.style.top = (mapPinMainElement.offsetTop - shift.y) + 'px';
        mapPinMainElement.style.left = (mapPinMainElement.offsetLeft - shift.x) + 'px';
        addressElement.value = 'x: ' + (mapPinMainElement.offsetLeft - shift.x) + ', y: ' + (mapPinMainElement.offsetTop - shift.y);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    updatePins: updatePins,
    createMapPin: createMapPin
  };
})();
