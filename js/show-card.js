'use strict';

// Показываем/Скрываем объявление
(function () {
  var card = window.card;
  var currentActivePinElement = null;

  var showCard = function (evt, arr) {
    if (currentActivePinElement) {
      currentActivePinElement.classList.remove('map__pin--active');
    }
    evt.currentTarget.classList.add('map__pin--active');
    card.renderAd(arr[evt.currentTarget.getAttribute('ad-id')]);
    card.similarAdElement.classList.remove('hidden');
    currentActivePinElement = evt.currentTarget;
  };

  var hideCard = function () {
    card.similarAdElement.classList.add('hidden');
    currentActivePinElement.classList.remove('map__pin--active');
  };

  window.showCard = {
    showCard: showCard,
    hideCard: hideCard
  };
})();
