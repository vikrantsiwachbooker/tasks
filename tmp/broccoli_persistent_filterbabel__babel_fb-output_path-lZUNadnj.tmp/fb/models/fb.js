define('fb/models/fb', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        /*id:DS.attr("number"),
        login:DS.attr("string"),
        url:DS.attr("string"),
        avatar_url:DS.attr("string"),
        type:DS.attr("string")*/
        title: _emberData.default.attr(),
        owner: _emberData.default.attr(),
        city: _emberData.default.attr(),
        propertyType: _emberData.default.attr(),
        image: _emberData.default.attr(),
        bedrooms: _emberData.default.attr(),
        description: _emberData.default.attr()
    });
});