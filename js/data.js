'use strict';

// Общие данные
(function () {
  var AD_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var APARTMENT_TYPES = ['flat', 'house', 'bungalo'];
  var CHECK_HOURS = ['12:00', '13:00', '14:00'];
  var APARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  window.data = {
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
    },

    createAds: function () {
      var ads = [];
      for (var i = 0; i < AD_TITLES.length; i++) {
        var coords = {
          x: window.data.getRandomInt(300, 900),
          y: window.data.getRandomInt(100, 500)
        };
        ads[i] = {
          author: {
            avatar: 'img/avatars/user0' + (i + 1) + '.png'
          },
          offer: {
            title: AD_TITLES[i],
            address: coords.x + ', ' + coords.y,
            price: window.data.getRandomInt(1000, 1000000),
            type: APARTMENT_TYPES[window.data.getRandomInt(0, APARTMENT_TYPES.length - 1)],
            rooms: window.data.getRandomInt(1, 5),
            guests: window.data.getRandomInt(2, 7),
            checkin: CHECK_HOURS[window.data.getRandomInt(0, CHECK_HOURS.length - 1)],
            checkout: CHECK_HOURS[window.data.getRandomInt(0, CHECK_HOURS.length - 1)],
            features: APARTMENT_FEATURES.slice(0, window.data.getRandomInt(1, APARTMENT_FEATURES.length)),
            description: '',
            photos: []
          },
          location: coords
        };
      }
      return ads;
    }
  };
})();
