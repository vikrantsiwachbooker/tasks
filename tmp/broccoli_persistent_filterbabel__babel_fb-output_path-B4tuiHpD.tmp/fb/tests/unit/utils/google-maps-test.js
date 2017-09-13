define('fb/tests/unit/utils/google-maps-test', ['fb/utils/google-maps', 'qunit'], function (_googleMaps, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | google maps');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _googleMaps.default)();
    assert.ok(result);
  });
});