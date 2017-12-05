'use strict';

// Общие данные
(function () {
  window.data = {
    AD_TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    APARTMENT_TYPES: ['flat', 'house', 'bungalo'],
    CHECK_HOURS: ['12:00', '13:00', '14:00'],
    APARTMENT_FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    APARTMENT_TYPE_DISPLAY_NAME: {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дворец'
    },
    ROOMS_ENDING: [
      '',
      'комната',
      'комнаты',
      'комнаты',
      'комнаты',
      'комнат'
    ],
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
})();
