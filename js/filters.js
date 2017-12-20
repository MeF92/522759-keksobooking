'use strict';

// Настраиваем фильтрацию объявлений
(function () {
  var housingTypeElement = document.querySelector('#housing-type');
  var housingPriceElement = document.querySelector('#housing-price');
  var housingRoomsElement = document.querySelector('#housing-rooms');
  var housingGuestsElement = document.querySelector('#housing-guests');
  var housingFeaturesElement = document.querySelector('#housing-features');

  var filters = {
    type: null,
    price: null,
    rooms: null,
    guests: null,
    features: []
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

  var filterByFeatures = function (advert) {
    return filters.features.length === 0 || checkForSubset(advert.offer.features, filters.features);
  };

  var checkForSubset = function (master, slave) {
    return slave.every(function (feature) {
      return master.indexOf(feature) !== -1;
    });
  };

  var runFilters = function () {
    var filtredAds = window.pin.getAdverts()
        .filter(filterByType)
        .filter(filterByPrice)
        .filter(filterByRooms)
        .filter(filterByGuests)
        .filter(filterByFeatures);

    window.map.updatePins();
    window.pin.insertMapPins(filtredAds);
  };

  housingTypeElement.addEventListener('change', function (evt) {
    if (evt.target.value !== 'any') {
      filters.type = evt.target.value;
    } else {
      filters.type = null;
    }
    window.debounce(runFilters);
  });

  housingPriceElement.addEventListener('change', function (evt) {
    if (evt.target.value !== 'any') {
      filters.price = evt.target.value;
    } else {
      filters.price = null;
    }
    window.debounce(runFilters);
  });

  housingRoomsElement.addEventListener('change', function (evt) {
    if (evt.target.value !== 'any') {
      filters.rooms = evt.target.value;
    } else {
      filters.rooms = null;
    }
    window.debounce(runFilters);
  });

  housingGuestsElement.addEventListener('change', function (evt) {
    if (evt.target.value !== 'any') {
      filters.guests = evt.target.value;
    } else {
      filters.guests = null;
    }
    window.debounce(runFilters);
  });

  housingFeaturesElement.addEventListener('change', function (evt) {
    if (evt.target.checked) {
      filters.features.push(evt.target.value);
    } else {
      var index = filters.features.indexOf(evt.target.value);
      filters.features.splice(index, 1);
    }
    window.debounce(runFilters);
  });
})();
