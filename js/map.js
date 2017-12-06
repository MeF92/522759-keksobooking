'use strict';

// Работа с картой
(function () {
  var data = window.data;

  var createAds = function () {
    var ads = [];
    for (var i = 0; i < data.AD_TITLES.length; i++) {
      var coords = {
        x: data.getRandomInt(300, 900),
        y: data.getRandomInt(100, 500)
      };
      ads[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: data.AD_TITLES[i],
          address: coords.x + ', ' + coords.y,
          price: data.getRandomInt(1000, 1000000),
          type: data.APARTMENT_TYPES[data.getRandomInt(0, data.APARTMENT_TYPES.length - 1)],
          rooms: data.getRandomInt(1, 5),
          guests: data.getRandomInt(2, 7),
          checkin: data.CHECK_HOURS[data.getRandomInt(0, data.CHECK_HOURS.length - 1)],
          checkout: data.CHECK_HOURS[data.getRandomInt(0, data.CHECK_HOURS.length - 1)],
          features: data.APARTMENT_FEATURES.slice(0, data.getRandomInt(1, data.APARTMENT_FEATURES.length)),
          description: '',
          photos: []
        },
        location: coords
      };
    }
    return ads;
  };

  var adverts = createAds();

  var createMapPin = function (ad, id) {
    var mapPinsContentElement = document.createElement('button');
    var buttonWidth = 40;
    var buttonHeight = 40;
    mapPinsContentElement.style.left = (ad.location.x - buttonWidth / 2) + 'px';
    mapPinsContentElement.style.top = (ad.location.y - buttonHeight) + 'px';
    mapPinsContentElement.className = 'map__pin hidden';
    mapPinsContentElement.setAttribute('ad-id', id);
    mapPinsContentElement.innerHTML = '<img src="' + ad.author.avatar + '" width="' + buttonWidth + '" height="' + buttonHeight + '" draggable="false">';

    return mapPinsContentElement;
  };

  var createFragmentElement = function (ads) {
    var fragmentElement = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      fragmentElement.appendChild(createMapPin(ads[i], i));
    }
    return fragmentElement;
  };

  var mapPinsContainerElement = document.querySelector('.map__pins');
  mapPinsContainerElement.appendChild(createFragmentElement(adverts));

  window.map = {
    adverts: adverts
  };
})();
