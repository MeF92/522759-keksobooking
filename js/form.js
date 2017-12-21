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

  // Загружаем аватар и фотографии жилья
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooserElement = document.querySelector('.notice__photo input[type=file]');
  var noticePreviewElement = document.querySelector('.notice__preview');
  noticePreviewElement.style.width = '130px';
  var avatarPreviewElement = document.querySelector('.notice__preview img');
  avatarPreviewElement.setAttribute('width', '100px');
  avatarPreviewElement.setAttribute('height', '96px');

  avatarChooserElement.addEventListener('change', function () {
    var file = avatarChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreviewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var photoChooserElement = document.querySelector('.form__photo-container input[type=file]');
  var photoPreviewElement = document.querySelector('.form__photo-container');

  var createImgElement = function (source) {
    var imgElement = document.createElement('img');
    imgElement.setAttribute('width', '70px');
    imgElement.setAttribute('height', '70px');
    imgElement.setAttribute('src', '' + source);
    imgElement.className = 'photo-img';

    return imgElement;
  };

  photoChooserElement.addEventListener('change', function () {
    var file = photoChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photoPreviewElement.appendChild(createImgElement(reader.result));
      });

      reader.readAsDataURL(file);
    }
  });

  // Отправляем данные формы
  var noticeFormElement = document.querySelector('.notice__form');
  noticeFormElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(noticeFormElement), function () {
      noticeFormElement.reset();
    }, window.pin.onError);
    evt.preventDefault();
  });
})();
