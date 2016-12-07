define([
    'jquery',
    'backbone',
    'utils/utils'
], function($, Backbone, Utils) {
    var MazeView = Backbone.View.extend({
        el: $('.js-maze'),

        initialize: function() {
            var cellSize = this.model.get('cellSize');
            this.el.style.width = (this.model.get('width') * cellSize) + 'px';
            this.el.style.height = (this.model.get('height') * cellSize) + 'px';

            this.render();
        },

        render: function() {
            var map = this.model.get('map');
            var width = this.model.get('width');
            var height = this.model.get('height');
            var exit = this.model.get('exit');

            for (var y = 0; y < height; y++) {
                for (var x = 0; x < width; x++) {
                    var cell = document.createElement('div');
                    cell.setAttribute('data-coord', y + '-' + x);
                    if (map[y][x].type === 'wall' ) {
                        cell.className = 'maze__cell';
                    } else {
                        cell.className ='maze__cell maze__cell_way maze__cell_way_' + this.getWayType(y, x);
                    }
                    this.el.appendChild(cell);
                }
            }

            $('.maze__cell[data-coord="' + exit.join('-') + '"]').addClass('maze__cell_exit');
        },

        getWayType: function(y, x) {
            var map = this.model.get('map');
            var str = '';
            str += (Utils.isInScope(map, [x, y-1]) && map[y-1][x].type === 'way' ) ? '1' : '0';
            str += (Utils.isInScope(map, [x+1, y]) && map[y][x+1].type === 'way' ) ? '1' : '0';
            str += (Utils.isInScope(map, [x, y+1]) && map[y+1][x].type === 'way' ) ? '1' : '0';
            str += (Utils.isInScope(map, [x-1, y]) && map[y][x-1].type === 'way' ) ? '1' : '0';
            return str;
        },

        screenPosition: function(x, y) {
            var screensCount = this.model.get('width')/5;
            var offset = this.model.get('cellSize')*5;
            var screenX = Math.floor(x/5);
            var screenY = Math.floor(y/5);
            this.el.style.left = -(offset * screenX) + 'px'
            this.el.style.bottom = -(offset * (screensCount - screenY - 1)) + 'px'
        }
    });

    return MazeView;
});