define('ember-get-config/index', ['exports', 'fb/config/environment'], function (exports, _fbConfigEnvironment) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _fbConfigEnvironment['default'];
    }
  });
});