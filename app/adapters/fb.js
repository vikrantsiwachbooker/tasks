import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    namespace:'users',
    host:"https://api.github.com"

});
