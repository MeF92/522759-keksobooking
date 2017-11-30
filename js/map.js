'use strict';

(function () {
  var AD_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var APARTMENT_TYPES = ['flat', 'house', 'bungalo'];
  var CHECK_HOURS = ['12:00', '13:00', '14:00'];
  var APARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var APARTMENT_TYPE_DISPLAY_NAME = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дворец'
  };
  var ROOMS_ENDING = [
    '',
    'комната',
    'комнаты',
    'комнаты',
    'комнаты',
    'комнат'
  ];

  var mapElement = document.querySelector('.map');

  var mapFiltersContainerElement = document.querySelector('.map__filters-container');

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var createAds = function () {
    var ads = [];
    for (var i = 0; i < AD_TITLES.length; i++) {
      var coords = {
        x: getRandomInt(300, 900),
        y: getRandomInt(100, 500)
      };
      ads[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: AD_TITLES[i],
          address: coords.x + ', ' + coords.y,
          price: getRandomInt(1000, 1000000),
          type: APARTMENT_TYPES[getRandomInt(0, APARTMENT_TYPES.length - 1)],
          rooms: getRandomInt(1, 5),
          guests: getRandomInt(2, 7),
          checkin: CHECK_HOURS[getRandomInt(0, CHECK_HOURS.length - 1)],
          checkout: CHECK_HOURS[getRandomInt(0, CHECK_HOURS.length - 1)],
          features: APARTMENT_FEATURES.slice(0, getRandomInt(1, APARTMENT_FEATURES.length)),
          description: '',
          photos: []
        },
        location: coords
      };
    }
    return ads;
  };

  var mapPinsElement = document.querySelector('.map__pins');
  var createMapPin = function (ad) {
    var mapPinsContentElement = document.createElement('button');
    var buttonWidth = 40;
    var buttonHeight = 40;
    mapPinsContentElement.style.left = (ad.location.x - buttonWidth / 2) + 'px';
    mapPinsContentElement.style.top = (ad.location.y - buttonHeight) + 'px';
    mapPinsContentElement.className = 'map__pin hidden';
    mapPinsContentElement.innerHTML = '<img src="' + ad.author.avatar + '" width="' + buttonWidth + '" height="' + buttonHeight + '" draggable="false">';

    return mapPinsContentElement;
  };

  var createFragmentElement = function (ads) {
    var fragmentElement = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      fragmentElement.appendChild(createMapPin(ads[i]));
    }
    return fragmentElement;
  };

  mapPinsElement.appendChild(createFragmentElement(createAds()));

  var similarAdsTemplateElement = document.querySelector('template').content.querySelector('.map__card');
  similarAdsTemplateElement.classList.add('hidden');
  var renderAd = function (ad) {
    var similarAdElement = similarAdsTemplateElement.cloneNode(true);
    var popupFeaturesElement = similarAdElement.querySelector('.popup__features');
    popupFeaturesElement.innerHTML = '';

    similarAdElement.querySelector('h3').textContent = ad.offer.title;
    similarAdElement.querySelector('p small').textContent = ad.offer.address;
    similarAdElement.querySelector('.popup__price').innerHTML = ad.offer.price + '&#x20bd;/ночь';
    similarAdElement.querySelector('h4').textContent = APARTMENT_TYPE_DISPLAY_NAME[ad.offer.type];
    similarAdElement.querySelector('p:nth-of-type(3)').textContent = ad.offer.rooms + ' ' + ROOMS_ENDING[ad.offer.rooms] + ' для ' + ad.offer.guests + ' гостей';
    similarAdElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    for (var i = 0; i <= ad.offer.features.length - 1; i++) {
      var featuresListElement = document.createElement('li');
      featuresListElement.className = 'feature feature--' + ad.offer.features[i];
      popupFeaturesElement.appendChild(featuresListElement);
    }

    similarAdElement.querySelector('p:nth-of-type(5)').textContent = ad.offer.description;
    similarAdElement.querySelector('.popup__pictures li img').setAttribute('src', ad.author.avatar);

    return similarAdElement;
  };

  mapElement.insertBefore(renderAd(createAds()[0]), mapFiltersContainerElement);

  var test = createFragmentElement(createAds()).querySelectorAll('.map__pin');
  var adElement = mapElement.insertBefore(renderAd(createAds()[0]), mapFiltersContainerElement);
  var mapPinMain = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  mapPinMain.addEventListener('mouseup', function () {
    mapElement.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    test.classList.remove('hidden');
  });
})();

