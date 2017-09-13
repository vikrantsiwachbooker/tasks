define('fb/routes/fb', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function model() {
            //return this.store.findAll('course');
            //return this.store.findAll('users');
            return this.get('store').findAll('rental');
        }
    });
});