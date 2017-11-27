'use strict';

var AD_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var APARTMENT_TYPES = ['flat', 'house', 'bungalo'];
var CHECK_HOURS = ['12:00', '13:00', '14:00'];
var APARTMENT_FEATURES = ['wifi', 'dishwater', 'parking', 'washer', 'elevator', 'conditioner'];

var mapElement = document.querySelector('.map');
mapElement.classList.remove('map--faded');

var mapFiltersContainerElement = document.querySelector('.map__filters-container');

var similarAdsTemplateElement = document.querySelector('template').content.querySelector('.map__card');

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
var createMapPinsFragmentElement = function (ads) {
  var fragmentElement = document.createDocumentFragment();
  var mapPinsContentElement;
  for (var i = 0; i <= ads.length - 1; i++) {
    mapPinsContentElement = '<button style="left:' + ads[i].location.x + 'px; top:' + ads[i].location.y + 'px;" class="map__pin">' +
      '<img src="' + ads[i].author.avatar + '" width="40" height="40" draggable="false">' +
      '</button>';
    fragmentElement.insertAdjacentHTML('beforeend', mapPinsContentElement);
  }
  mapPinsElement.appendChild(fragmentElement);
};

var renderAd = function (ad) {
  var similarAdElement = similarAdsTemplateElement.cloneNode(true);

  similarAdElement.querySelector('h3').textContent = ad.offer.title;
  similarAdElement.querySelector('p small').textContent = ad.offer.address;
  similarAdElement.querySelector('.popup__price').textContent = ad.offer.price + '&#x20bd;/ночь';
  similarAdElement.querySelector('h4').textContent = (ad.offer.type === 'flat') ? 'Квартира' : (ad.offer.type === 'house') ? 'Дом' : 'Бунгало';
  similarAdElement.querySelector('p:nth-of-type(3)').textContent = ad.offer.rooms + ' комнаты ' + 'для ' + ad.offer.guests + ' гостей';
  similarAdElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

  for (var i = 0; i <= ad.offer.features.length - 1; i++) {
    var featuresListElement = document.createElement('li');
    featuresListElement.className = 'feature feature--' + ad.offer.features.length[i];
    similarAdElement.querySelector('.popup__features').appendChild(featuresListElement);
  }

  similarAdElement.querySelector('p:nth-of-type(5)').textContent = ad.offer.description;
  similarAdElement.querySelector('.popup__pictures li img').setAttribute('src', ad.author.avatar);

  return similarAdElement;
};

mapElement.insertBefore(renderAd(), mapFiltersContainerElement);


