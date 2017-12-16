'use strict';

// Синхронизируем поля формы
(function () {
  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');
  var timeInHours = ['12:00', '13:00', '14:00'];
  var timeOutHours = ['12:00', '13:00', '14:00'];

  var syncValues = function (element, value) {
    element.value = value;
  };
  window.synchronizeFields.synchronizeFields(timeInElement, timeOutElement, timeInHours, timeOutHours, syncValues, true);

  var apartmentTypeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');
  var apartmentTypes = ['flat', 'bungalo', 'house', 'palace'];
  var minPrices = ['1000', '0', '5000', '10000'];

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };
  window.synchronizeFields.synchronizeFields(apartmentTypeElement, priceElement, apartmentTypes, minPrices, syncValueWithMin, true);

  var numberOfRoomElement = document.querySelector('#room_number');
  var guestCapacityElement = document.querySelector('#capacity');
  var numberOfRooms = ['1', '2', '3', '100'];
  var numberOfGuests = ['1', '2', '3', '0'];

  window.synchronizeFields.synchronizeFields(numberOfRoomElement, guestCapacityElement, numberOfRooms, numberOfGuests, syncValues);
  // Отправка данных формы
  var noticeFormElement = document.querySelector('.notice__form');
  noticeFormElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(noticeFormElement), function () {
      noticeFormElement.reset();
    }, window.map.onError);
    evt.preventDefault();
  });
})();
