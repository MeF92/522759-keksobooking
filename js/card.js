'use strict';

// Создаём и заполняем объявление
(function () {
  var similarAdsTemplateElement = document.querySelector('template').content.querySelector('.map__card');
  var similarAdElement = similarAdsTemplateElement.cloneNode(true);
  var renderAd = function (ad) {
    var popupFeaturesElement = similarAdElement.querySelector('.popup__features');
    var popupPicturesElement = similarAdElement.querySelector('.popup__pictures li img');
    popupFeaturesElement.innerHTML = '';

    similarAdElement.querySelector('.popup__avatar').setAttribute('src', ad.author.avatar);
    similarAdElement.querySelector('h3').textContent = ad.offer.title;
    similarAdElement.querySelector('p small').textContent = ad.offer.address;
    similarAdElement.querySelector('.popup__price').innerHTML = ad.offer.price + '&#x20bd;/ночь';
    similarAdElement.querySelector('h4').textContent = window.data.APARTMENT_TYPE_DISPLAY_NAME[ad.offer.type];
    similarAdElement.querySelector('p:nth-of-type(3)').textContent = ad.offer.rooms + ' ' + window.data.ROOMS_ENDINGS[ad.offer.rooms] + ' для ' + ad.offer.guests + ' ' + window.data.GUESTS_ENDINGS[ad.offer.guests];
    similarAdElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    for (var i = 0; i < ad.offer.features.length; i++) {
      var featuresListElement = document.createElement('li');
      featuresListElement.className = 'feature feature--' + ad.offer.features[i];
      popupFeaturesElement.appendChild(featuresListElement);
    }

    similarAdElement.querySelector('p:nth-of-type(5)').textContent = ad.offer.description;
    popupPicturesElement.style.width = '100px';
    popupPicturesElement.style.height = '70px';
    popupPicturesElement.setAttribute('src', ad.offer.photos[0]);
  };

  var mapElement = document.querySelector('.map');
  var mapFiltersContainerElement = document.querySelector('.map__filters-container');
  mapElement.insertBefore(similarAdElement, mapFiltersContainerElement);
  similarAdElement.classList.add('hidden');

  // Показываем/Скрываем объявление
  var currentActivePinElement = null;

  var showCard = function (evt, arr) {
    if (currentActivePinElement) {
      currentActivePinElement.classList.remove('map__pin--active');
    }
    evt.currentTarget.classList.add('map__pin--active');
    renderAd(arr[evt.currentTarget.getAttribute('ad-id')]);
    similarAdElement.classList.remove('hidden');
    currentActivePinElement = evt.currentTarget;
  };

  var hideCard = function () {
    similarAdElement.classList.add('hidden');
    currentActivePinElement.classList.remove('map__pin--active');
  };

  window.card = {
    showCard: showCard,
    hideCard: hideCard,
    similarAdElement: similarAdElement
  };
})();
