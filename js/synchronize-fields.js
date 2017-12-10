'use strict';

// Функции синхронизации полей
(function () {
  var twoSideSynchronizeFields = function (field1, field2, data1, data2, action) {
    field1.addEventListener('click', function (evt) {
      var index = data1.indexOf(evt.target.value);
      action(field2, data2[index]);
    });
    field2.addEventListener('click', function (evt) {
      var index = data2.indexOf(evt.target.value);
      action(field1, data1[index]);
    });
  };

  var oneSideSynchronizeFields = function (field1, field2, data1, data2, action) {
    field1.addEventListener('click', function (evt) {
      var index = data1.indexOf(evt.target.value);
      action(field2, data2[index]);
    });
  };
  window.synchronizeFields = {
    twoSideSynchronizeFields: twoSideSynchronizeFields,
    oneSideSynchronizeFields: oneSideSynchronizeFields
  };
})();
