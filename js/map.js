'use strict';

// Создаём пины на карте
(function () {
  var adverts = [];
  var mapPinsContainerElement = document.querySelector('.map__pins');

  var createMapPin = function (ad, id, currentPins) {
    var mapPinsContentElement = document.createElement('button');
    var buttonWidth = 40;
    var buttonHeight = 40;
    mapPinsContentElement.style.left = (ad.location.x - buttonWidth / 2) + 'px';
    mapPinsContentElement.style.top = (ad.location.y - buttonHeight) + 'px';
    mapPinsContentElement.className = 'map__pin';
    mapPinsContentElement.setAttribute('ad-id', id);
    mapPinsContentElement.innerHTML = '<img src="' + ad.author.avatar + '" width="' + buttonWidth + '" height="' + buttonHeight + '" draggable="false">';

    mapPinsContentElement.addEventListener('click', function (evt) {
      if (evt.currentTarget !== mapPinMainElement) {
        window.showCard.showCard(evt, currentPins);
      }
    });

    mapPinsContentElement.addEventListener('keydown', function (evt) {
      if (evt.currentTarget !== mapPinMainElement && evt.keyCode === window.data.ENTER_KEYCODE) {
        window.showCard.showCard(evt, currentPins);
      }
    });

    return mapPinsContentElement;
  };

  window.updatePins = function () {
    mapPinsContainerElement.innerHTML = '';
    mapPinsContainerElement.appendChild(mapPinMainElement);
    var sameTypeOfFlat = adverts.filter(function (it) {
      return it.offer.type === 'flat';
    });
    window.insertMapPins(sameTypeOfFlat);
  };

  window.insertMapPins = function (ads) {
    var numberOfPins = ads.length > 5 ? 5 : ads.length;
    var fragmentElement = document.createDocumentFragment();
    for (var i = 0; i < numberOfPins; i++) {
      fragmentElement.appendChild(createMapPin(ads[i], i, ads));
    }
    mapPinsContainerElement.appendChild(fragmentElement);
  };

  var onSuccess = function (advs) {
    adverts = advs;
    window.makePinsActive();
  };

  var onError = function (errorMessage) {
    mapPinMainElement.addEventListener('mouseup', function () {
      var nodeElement = document.createElement('div');
      nodeElement.style = 'z-index: 100; width: 1200px; position: absolute; left: 0; right: 0; margin: 0 auto; text-align: center; background-color: red;';
      nodeElement.textContent = errorMessage;
      document.body.insertBefore(nodeElement, document.body.firstChild);
    });
  };

  window.backend.load(onSuccess, onError);
  // Добавляем возможность передвигать центральный пин
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var addressElement = document.querySelector('#address');
  mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      if (moveEvt.clientY >= 100 && moveEvt.clientY <= (650 - window.pageYOffset) && moveEvt.clientX >= 210 && moveEvt.clientX <= 1370) {
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
    getAdverts: function () {
      return adverts;
    },
    onError: onError
  };
})();
