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
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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

  var adverts = createAds();

  var mapPinsContainerElement = document.querySelector('.map__pins');
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

  mapPinsContainerElement.appendChild(createFragmentElement(adverts));

  var similarAdsTemplateElement = document.querySelector('template').content.querySelector('.map__card');
  var similarAdElement = similarAdsTemplateElement.cloneNode(true);
  var renderAd = function (ad) {
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
  };

  renderAd(adverts[0]);
  mapElement.insertBefore(similarAdElement, mapFiltersContainerElement);
  similarAdElement.classList.add('hidden');

  var mapPinsElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var adCloseElement = similarAdElement.querySelector('.popup__close');
  var noticeFormElement = document.querySelector('.notice__form');
  var currentActivePinElement = null;

  var onPinClick = function (evt) {
    if (currentActivePinElement) {
      currentActivePinElement.classList.remove('map__pin--active');
    }
    evt.target.classList.add('map__pin--active');
    renderAd(adverts[evt.target.getAttribute('ad-id')]);
    similarAdElement.classList.remove('hidden');
    currentActivePinElement = evt.target;
  };

  var onClosingAd = function () {
    similarAdElement.classList.add('hidden');
    currentActivePinElement.classList.remove('map__pin--active');
  };

  mapPinMainElement.addEventListener('mouseup', function () {
    mapElement.classList.remove('map--faded');
    noticeFormElement.classList.remove('notice__form--disabled');
    for (var i = 0; i <= mapPinsElements.length - 1; i++) {
      mapPinsElements[i].classList.remove('hidden');
    }
  });

  mapPinsContainerElement.addEventListener('click', function (evt) {
    if (evt.target !== mapPinMainElement) {
      onPinClick(evt);
    }
  });

  mapPinsContainerElement.addEventListener('keydown', function (evt) {
    if (evt.target !== mapPinMainElement && evt.keyCode === ENTER_KEYCODE) {
      onPinClick(evt);
    }
  });

  adCloseElement.addEventListener('click', function () {
    onClosingAd();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onClosingAd();
    }
  });
})();

