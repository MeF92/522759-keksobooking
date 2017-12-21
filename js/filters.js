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
      return advert.offer.price >= 10000 && advert.offer.price < 50000;
    }
    return advert.offer.price >= 50000;
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

  var onFilterChange = function (evt, key) {
    if (evt.target.value !== 'any') {
      filters[key] = evt.target.value;
    } else {
      filters[key] = null;
    }
    window.debounce(runFilters);
  };

  housingTypeElement.addEventListener('change', function (evt) {
    onFilterChange(evt, 'type');
  });

  housingPriceElement.addEventListener('change', function (evt) {
    onFilterChange(evt, 'price');
  });

  housingRoomsElement.addEventListener('change', function (evt) {
    onFilterChange(evt, 'rooms');
  });

  housingGuestsElement.addEventListener('change', function (evt) {
    onFilterChange(evt, 'guests');
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
