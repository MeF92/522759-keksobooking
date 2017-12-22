'use strict';

// Синхронизируем поля формы
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');
  var timesInHours = ['12:00', '13:00', '14:00'];
  var timesOutHours = ['12:00', '13:00', '14:00'];

  var syncValues = function (element, value) {
    element.value = value;
  };
  window.synchronizeFields.synchronize(timeInElement, timeOutElement, timesInHours, timesOutHours, syncValues, true);

  var apartmentTypeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');
  var apartmentTypes = ['flat', 'bungalo', 'house', 'palace'];
  var minPrices = ['1000', '0', '5000', '10000'];

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };
  window.synchronizeFields.synchronize(apartmentTypeElement, priceElement, apartmentTypes, minPrices, syncValueWithMin);

  var numberOfRoomElement = document.querySelector('#room_number');
  var guestCapacityElement = document.querySelector('#capacity');
  var roomsNumbers = ['1', '2', '3', '100'];
  var guestsNumbers = ['1', '2', '3', '0'];

  window.synchronizeFields.synchronize(numberOfRoomElement, guestCapacityElement, roomsNumbers, guestsNumbers, syncValues);

  // Загружаем аватар и фотографии жилья
  var avatarChooserElement = document.querySelector('.notice__photo input[type=file]');
  var noticePreviewElement = document.querySelector('.notice__preview');
  noticePreviewElement.style.width = '130px';
  var avatarPreviewElement = document.querySelector('.notice__preview img');
  avatarPreviewElement.setAttribute('width', '100px');
  avatarPreviewElement.setAttribute('height', '96px');

  var onAvatarLoad = function (evt) {
    avatarPreviewElement.src = evt.target.result;
  };

  var onPhotoLoad = function (evt) {
    photoContainerElement.appendChild(createImgElement(evt.target.result));
  };

  var onImageUpdate = function (evt, action) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', action);

      reader.readAsDataURL(file);
    }
  };

  avatarChooserElement.addEventListener('change', function (evt) {
    onImageUpdate(evt, onAvatarLoad);
  });

  var photoChooserElement = document.querySelector('.form__photo-container input[type=file]');
  var photoPreviewElement = document.querySelector('.form__photo-container');
  var photoContainerElement = document.createElement('div');
  photoContainerElement.className = 'photo-container';
  photoPreviewElement.appendChild(photoContainerElement);

  var createImgElement = function (source) {
    var imgElement = document.createElement('img');
    imgElement.setAttribute('width', '70px');
    imgElement.setAttribute('height', '70px');
    imgElement.setAttribute('src', '' + source);
    imgElement.className = 'photo-img';

    return imgElement;
  };

  photoChooserElement.addEventListener('change', function (evt) {
    onImageUpdate(evt, onPhotoLoad);
  });

  // Отправляем данные формы
  var noticeFormElement = document.querySelector('.notice__form');
  noticeFormElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(noticeFormElement), function () {
      avatarPreviewElement.src = 'img/muffin.png';
      photoContainerElement.innerHTML = '';
      noticeFormElement.reset();
    }, window.pin.onError);
    evt.preventDefault();
  });
})();
