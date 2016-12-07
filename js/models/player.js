define([
    'jquery',
    'backbone'
], function($, Backbone) {
    var size = 15;
    var Player = Backbone.Model.extend({
        defaults: {
            x: 0,
            y: size - 1,
            direction: 'up'
        }
    });

    return new Player;
});