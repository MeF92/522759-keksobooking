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
  };

  var housingTypeElement = document.querySelector('#housing-type');
  var housingPriceElement = document.querySelector('#housing-price');
  var housingRoomsElement = document.querySelector('#housing-rooms');
  var housingGuestsElement = document.querySelector('#housing-guests');
  var housingFeaturesElement = document.querySelector('#housing-features');
  var featuresWifiElement = document.querySelector('#filter-wifi');
  var featuresDishwasherElement = document.querySelector('#filter-dishwasher');
  var featuresParkingElement = document.querySelector('#filter-parking');
  var featuresWasherElement = document.querySelector('#filter-washer');
  var featuresElevatorElement = document.querySelector('#filter-elevator');
  var featuresConditionerElement = document.querySelector('#filter-conditioner');

  var filterByWifi = function (advert) {
    return filters.wifi === null || advert.offer.features[0] === filters.wifi;
  };

  var filterByDishwasher = function (advert) {
    return filters.dishwasher === null || advert.offer.features[1] === filters.dishwasher;
  };

  var filterByParking = function (advert) {
    return filters.parking === null || advert.offer.features[2] === filters.parking;
  };

  var filterByWasher = function (advert) {
    return filters.washer === null || advert.offer.features[3] === filters.washer;
  };

  var filterByElevator = function (advert) {
    return filters.elevator === null || advert.offer.features[4] === filters.elevator;
  };

  var filterByConditioner = function (advert) {
    return filters.conditioner === null || advert.offer.features[5] === filters.conditioner;
  };

  var filterByType = function (advert) {
    return filters.type === null || advert.offer.type === filters.type;
  };

  var filterByPrice = function (advert) {
    if (filters.price === null) {
      return true;
    } else if (filters.price === 'low') {
      return advert.offer.price < 10000;
    } else if (filters.price === 'middle') {
      return advert.offer.price > 10000 && advert.offer.price < 50000;
    }
    return advert.offer.price > 50000;
  };

  var filterByRooms = function (advert) {
    return filters.rooms === null || advert.offer.rooms === +filters.rooms;
  };

  var filterByGuests = function (advert) {
    return filters.guests === null || advert.offer.guests === +filters.guests;
  };

  var filters = {
    type: null,
    price: null,
    rooms: null,
    guests: null,
    wifi: null,
    dishwasher: null,
    parking: null,
    washer: null,
    elevator: null,
    conditioner: null
  };

  var runFilters = function () {
    var filtredAds = adverts
        .filter(filterByType)
        .filter(filterByPrice)
        .filter(filterByRooms)
        .filter(filterByGuests)
        .filter(filterByWifi)
        .filter(filterByDishwasher)
        .filter(filterByParking)
        .filter(filterByWasher)
        .filter(filterByElevator)
        .filter(filterByConditioner);

    window.updatePins();
    window.insertMapPins(filtredAds);
  };

  housingTypeElement.addEventListener('change', function (evt) {
    if (evt.target.value !== 'any') {
      filters.type = evt.target.value;
    } else {
      filters.type = null;
    }
    runFilters();
  });

  housingPriceElement.addEventListener('change', function (evt) {
    if (evt.target.value !== 'any') {
      filters.price = evt.target.value;
    } else {
      filters.price = null;
    }
    runFilters();
  });

  housingRoomsElement.addEventListener('change', function (evt) {
    if (evt.target.value !== 'any') {
      filters.rooms = evt.target.value;
    } else {
      filters.rooms = null;
    }
    runFilters();
  });

  housingGuestsElement.addEventListener('change', function (evt) {
    if (evt.target.value !== 'any') {
      filters.guests = evt.target.value;
    } else {
      filters.guests = null;
    }
    runFilters();
  });

  featuresWifiElement.addEventListener('change', function (evt) {
    if (evt.target.checked) {
      filters.wifi = evt.target.value;
    } else {
      filters.wifi = null;
    }
    runFilters();
  });

  featuresDishwasherElement.addEventListener('change', function (evt) {
    if (evt.target.checked) {
      filters.dishwasher = evt.target.value;
    } else {
      filters.dishwasher = null;
    }
    runFilters();
  });

  featuresParkingElement.addEventListener('change', function (evt) {
    if (evt.target.checked) {
      filters.parking = evt.target.value;
    } else {
      filters.parking = null;
    }
    runFilters();
  });

  featuresWasherElement.addEventListener('change', function (evt) {
    if (evt.target.checked) {
      filters.washer = evt.target.value;
    } else {
      filters.washer = null;
    }
    runFilters();
  });

  featuresElevatorElement.addEventListener('change', function (evt) {
    if (evt.target.checked) {
      filters.elevator = evt.target.value;
    } else {
      filters.elevator = null;
    }
    runFilters();
  });

  featuresConditionerElement.addEventListener('change', function (evt) {
    if (evt.target.checked) {
      filters.conditioner = evt.target.value;
    } else {
      filters.conditioner = null;
    }
    runFilters();
  });

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
