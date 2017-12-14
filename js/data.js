'use strict';

// Общие данные
(function () {
  window.data = {
    APARTMENT_TYPE_DISPLAY_NAME: {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дворец'
    },
    ROOMS_ENDING: [
      'комнат',
      'комната',
      'комнаты',
      'комнаты',
      'комнаты',
      'комнат'
    ],
    GUESTS_ENDING: [
      'гостей',
      'гостя',
      'гостей',
      'гостей',
      'гостей',
      'гостей',
      'гостей'
    ],
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };

  window.data.ROOMS_ENDING.length = 35;
  window.data.ROOMS_ENDING[35] = 'комнат';
  window.data.GUESTS_ENDING.length = 93;
  window.data.GUESTS_ENDING[93] = 'гостей';
})();
