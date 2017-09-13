define('fb/services/fb', ['exports', 'ember-cli-facebook-js-sdk/services/fb'], function (exports, _fb) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _fb.default;
    }
  });
});