define([
    'jquery',
    'backbone',
    'settings'
], function(
    $,
    Backbone,
    Settings
) {
    var PlayerView = Backbone.View.extend({
        el: $('.js-player'),

        initialize: function() {
            this.render();
        },

        render: function() {
            this.renderPosition();
            this.renderDirection();
        },

        renderPosition: function() {
            this.el.style.left = (this.model.get('x') * Settings.CELL_SIZE) + 'px';
            this.el.style.top = (this.model.get('y') * Settings.CELL_SIZE) + 'px';
        },

        renderDirection: function() {
            var direction = this.model.get('direction')
            if (direction === 'left') {
                this.$el.addClass('player_left');
            }
            if (direction === 'right') {
                this.$el.removeClass('player_left');
            }
        }
    });

    return PlayerView;
});