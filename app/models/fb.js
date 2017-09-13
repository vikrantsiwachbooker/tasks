import DS from 'ember-data';

export default DS.Model.extend({
    /*id:DS.attr("number"),
    login:DS.attr("string"),
    url:DS.attr("string"),
    avatar_url:DS.attr("string"),
    type:DS.attr("string")*/
    title: DS.attr(),
    owner: DS.attr(),
    city: DS.attr(),
    propertyType: DS.attr(),
    image: DS.attr(),
    bedrooms: DS.attr(),
    description: DS.attr()
});
