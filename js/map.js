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

  var similarAdsTemplateElement = document.querySelector('template').content.querySelector('.map__card');
  var similarAdElement = similarAdsTemplateElement.cloneNode(true);
  var renderAd = function (ad) {
    var popupFeaturesElement = similarAdElement.querySelector('.popup__features');
    popupFeaturesElement.innerHTML = '';

    similarAdElement.querySelector('h3').textContent = ad.offer.title;
    similarAdElement.querySelector('p small').textContent = ad.offer.address;
    similarAdElement.querySelector('.popup__price').innerHTML = ad.offer.price + '&#x20bd;/ночь';
    similarAdElement.querySelector('h4').textContent = data.APARTMENT_TYPE_DISPLAY_NAME[ad.offer.type];
    similarAdElement.querySelector('p:nth-of-type(3)').textContent = ad.offer.rooms + ' ' + data.ROOMS_ENDING[ad.offer.rooms] + ' для ' + ad.offer.guests + ' гостей';
    similarAdElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    for (var i = 0; i <= ad.offer.features.length - 1; i++) {
      var featuresListElement = document.createElement('li');
      featuresListElement.className = 'feature feature--' + ad.offer.features[i];
      popupFeaturesElement.appendChild(featuresListElement);
    }

    similarAdElement.querySelector('p:nth-of-type(5)').textContent = ad.offer.description;
    similarAdElement.querySelector('.popup__pictures li img').setAttribute('src', ad.author.avatar);
  };

  var mapElement = document.querySelector('.map');
  var mapFiltersContainerElement = document.querySelector('.map__filters-container');
  renderAd(adverts[0]);
  mapElement.insertBefore(similarAdElement, mapFiltersContainerElement);
  similarAdElement.classList.add('hidden');

  // Делаем пины интерактивными
  var mapPinsElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var adCloseElement = similarAdElement.querySelector('.popup__close');
  var noticeFormElement = document.querySelector('.notice__form');
  var currentActivePinElement = null;

  var onPinClick = function (evt) {
    if (currentActivePinElement) {
      currentActivePinElement.classList.remove('map__pin--active');
    }
    evt.currentTarget.classList.add('map__pin--active');
    renderAd(adverts[evt.currentTarget.getAttribute('ad-id')]);
    similarAdElement.classList.remove('hidden');
    currentActivePinElement = evt.currentTarget;
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

  for (var i = 0; i <= mapPinsElements.length - 1; i++) {
    mapPinsElements[i].addEventListener('click', function (evt) {
      if (evt.currentTarget !== mapPinMainElement) {
        onPinClick(evt);
      }
    });

    mapPinsElements[i].addEventListener('keydown', function (evt) {
      if (evt.currentTarget !== mapPinMainElement && evt.keyCode === data.ENTER_KEYCODE) {
        onPinClick(evt);
      }
    });
  }

  adCloseElement.addEventListener('click', function () {
    onClosingAd();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === data.ESC_KEYCODE) {
      onClosingAd();
    }
  });
})();
