define([
    'jquery',
    'backbone',
    'models/maze'
], function($, Backbone, Maze) {
    var PlayerView = Backbone.View.extend({
        el: $('.js-player'),

        initialize: function() {
            this.render();
        },

        render: function() {
            var cellSize = Maze.get('cellSize');
            this.el.style.left = (this.model.get('x') * cellSize) + 'px';
            this.el.style.top = (this.model.get('y') * cellSize) + 'px';

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