'use strict';

// Валидация формы
(function () {
  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');
  timeInElement.addEventListener('click', function (evt) {
    timeOutElement.value = evt.target.value;
  });
  timeOutElement.addEventListener('click', function (evt) {
    timeInElement.value = evt.target.value;
  });

  var apartmentTypeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');
  apartmentTypeElement.addEventListener('click', function (evt) {
    switch (evt.target.value) {
      case 'flat':
        priceElement.setAttribute('min', '1000');
        break;
      case 'bungalo':
        priceElement.setAttribute('min', '0');
        break;
      case 'house':
        priceElement.setAttribute('min', '5000');
        break;
      case 'palace':
        priceElement.setAttribute('min', '10000');
        break;
    }
  });

  var numberOfRoomElement = document.querySelector('#room_number');
  var guestCapacityElement = document.querySelector('#capacity');
  numberOfRoomElement.addEventListener('click', function (evt) {
    guestCapacityElement.value = (evt.target.value === '100') ? '0' : evt.target.value;
  });
})();
