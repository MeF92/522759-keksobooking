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
    GUESTS_ENDING: [],
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };

  window.data.ROOMS_ENDING.length = 35;
  window.data.ROOMS_ENDING[35] = 'комнат';

  var guestsEndingLength = 100;
  for (var i = 0; i < guestsEndingLength; i++) {
    if (i % 10 === 1 && i !== 11) {
      window.data.GUESTS_ENDING.push('гостя');
    } else {
      window.data.GUESTS_ENDING.push('гостей');
    }
  }
})();
