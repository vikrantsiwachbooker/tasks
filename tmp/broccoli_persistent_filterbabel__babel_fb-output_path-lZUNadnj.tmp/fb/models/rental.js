define('fb/models/rental', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        title: _emberData.default.attr(),
        owner: _emberData.default.attr(),
        city: _emberData.default.attr(),
        propertyType: _emberData.default.attr(),
        image: _emberData.default.attr(),
        bedrooms: _emberData.default.attr(),
        description: _emberData.default.attr()
    });
});