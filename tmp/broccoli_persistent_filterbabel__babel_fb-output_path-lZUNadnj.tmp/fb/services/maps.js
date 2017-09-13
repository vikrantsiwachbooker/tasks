define('fb/services/maps', ['exports', 'fb/utils/google-maps'], function (exports, _googleMaps) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Service.extend({
    init: function init() {
      if (!this.get('cachedMaps')) {
        this.set('cachedMaps', Ember.Object.create());
      }
      if (!this.get('mapUtil')) {
        this.set('mapUtil', _googleMaps.default.create());
      }
    },
    getMapElement: function getMapElement(location) {
      var camelizedLocation = location.camelize();
      var element = this.get('cachedMaps.' + camelizedLocation);
      if (!element) {
        element = this.createMapElement();
        this.get('mapUtil').createMap(element, location);
        this.set('cachedMaps.' + camelizedLocation, element);
      }
      return element;
    },
    createMapElement: function createMapElement() {
      var element = document.createElement('div');
      element.className = 'map';
      return element;
    }
  });
});