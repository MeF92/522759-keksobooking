'use strict';

// Синхронизация полей формы
(function () {
  var twoWaySync = true;

  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');
  var timeInHours = ['12:00', '13:00', '14:00'];
  var timeOutHours = ['12:00', '13:00', '14:00'];

  var syncValues = function (element, value) {
    element.value = value;
  };
  window.synchronizeFields.synchronizeFields(timeInElement, timeOutElement, timeInHours, timeOutHours, syncValues, twoWaySync);

  var apartmentTypeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');
  var apartmentTypes = ['flat', 'bungalo', 'house', 'palace'];
  var minPrices = ['1000', '0', '5000', '10000'];

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };
  window.synchronizeFields.synchronizeFields(apartmentTypeElement, priceElement, apartmentTypes, minPrices, syncValueWithMin, twoWaySync);

  var numberOfRoomElement = document.querySelector('#room_number');
  var guestCapacityElement = document.querySelector('#capacity');
  var numberOfRooms = ['1', '2', '3', '100'];
  var numberOfGuests = ['1', '2', '3', '0'];

  var syncRoomsWithGuests = function (element, value) {
    element.value = value;
  };
  window.synchronizeFields.synchronizeFields(numberOfRoomElement, guestCapacityElement, numberOfRooms, numberOfGuests, syncRoomsWithGuests);
})();
