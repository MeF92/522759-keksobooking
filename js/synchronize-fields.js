'use strict';

// Создаём Функцию синхронизации полей
(function () {
  var synchronizeFields = function (field1, field2, data1, data2, action, twoWaySync) {
    field1.addEventListener('click', function (evt) {
      var index = data1.indexOf(evt.target.value);
      action(field2, data2[index]);
    });
    if (twoWaySync) {
      field2.addEventListener('click', function (evt) {
        var index = data2.indexOf(evt.target.value);
        action(field1, data1[index]);
      });
    }
  };
  window.synchronizeFields = {
    synchronizeFields: synchronizeFields
  };
})();
