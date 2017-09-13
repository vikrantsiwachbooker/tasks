define('fb/adapters/fb', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.RESTAdapter.extend({
        namespace: 'users',
        host: "https://api.github.com"

    });
});